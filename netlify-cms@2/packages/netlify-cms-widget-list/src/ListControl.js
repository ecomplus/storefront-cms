import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from '@emotion/styled';
import { css, ClassNames } from '@emotion/core';
import { List, Map, fromJS } from 'immutable';
import { partial, isEmpty, uniqueId } from 'lodash';
import uuid from 'uuid/v4';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import NetlifyCmsWidgetObject from 'netlify-cms-widget-object';
import {
  ListItemTopBar,
  ObjectWidgetTopBar,
  colors,
  lengths,
  FieldLabel,
} from 'netlify-cms-ui-default';
import { stringTemplate, validations } from 'netlify-cms-lib-widgets';
import { Icon } from 'netlify-cms-ui-default';
import {
  TYPES_KEY,
  getTypedFieldForValue,
  resolveFieldKeyType,
  getErrorMessageForTypedFieldAndValue,
} from './typedListHelpers';
import {
  useEditor,
  EditorContent,
  BubbleMenu,
  FloatingMenu,
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { renderToString } from 'react-dom/server';

const ObjectControl = NetlifyCmsWidgetObject.controlComponent;

const ListItem = styled.div();

const SortableListItem = SortableElement(ListItem);

const StyledListItemTopBar = styled(ListItemTopBar)`
  background-color: ${colors.textFieldBorder};
`;

const IconEdit = styled(Icon)`
  margin-right: 12px;
  margin-top: 2px;
`;

const NestedObjectLabel = styled.div`
  display: ${props => (props.collapsed ? 'block' : 'none')};
  border-top: 0;
  color: ${props => (props.error ? colors.errorText : 'inherit')};
  background-color: ${colors.textFieldBorder};
  padding: 13px;
  border-radius: 0 0 ${lengths.borderRadius} ${lengths.borderRadius};
`;

const NestedObjectLabelV2 = styled.div`
  display: ${props => (props.collapsed ? 'flex' : 'none')};
  border-top: 0;
  color: ${props => (props.error ? colors.errorText : 'inherit')};
  background-color: ${colors.textFieldBorder};
  border-radius: 0 0 ${lengths.borderRadius} ${lengths.borderRadius};
  width: 100%;
  cursor: pointer;
  justify-content: center;
  align-items: center;
`;

const styleStrings = {
  collapsedObjectControl: `
    display: none;
  `,
  objectWidgetTopBarContainer: `
    padding: ${lengths.objectWidgetTopBarContainerPadding};
  `,
};

const styles = {
  listControlItem: css`
    margin-top: 10px;
  `,
  listControlItemCollapsed: css`
    padding-bottom: 0;
  `,
};

const SortableList = SortableContainer(({ items, renderItem }) => {
  return <div>{items.map(renderItem)}</div>;
});

const valueTypes = {
  SINGLE: 'SINGLE',
  MULTIPLE: 'MULTIPLE',
  MIXED: 'MIXED',
};

function handleSummary(summary, entry, label, item) {
  const data = stringTemplate.addFileTemplateFields(
    entry.get('path'),
    item.set('fields.label', label),
  );
  return stringTemplate.compileStringTemplate(summary, null, '', data);
}

function validateItem(field, item) {
  if (!Map.isMap(item)) {
    console.warn(
      `'${field.get('name')}' field item value value should be a map but is a '${typeof item}'`,
    );
    return false;
  }

  return true;
}
function LabelComponent({ field, isActive, hasErrors, uniqueFieldId, isFieldOptional, t }) {
  const label = `${field.get('label', field.get('name'))}`;
  return (
    <FieldLabel isActive={isActive} hasErrors={hasErrors} htmlFor={uniqueFieldId}>
      {label} {`${isFieldOptional ? ` (${t('editor.editorControl.field.optional')})` : ''}`}
    </FieldLabel>
  );
}
const valueToString = value => {
  let stringValue;
  if (List.isList(value) || Array.isArray(value)) {
    stringValue = value.join(',');
  } else {
    console.warn(
      `Expected List value to be an array but received '${value}' with type of '${typeof value}'. Please check the value provided to the '${value}' field`,
    );
    stringValue = String(value);
  }
  return stringValue.replace(/,([^\s]|$)/g, ', $1');
};
export default function ListControl(props) {
  let validations = [];

  const [listCollapsed, setListCollapsed] = useState(props.field.get('collapsed', true))
  const [itemsCollapsed, setItemsCollapsed] = useState((props.value && Array(props.value.size).fill(listCollapsed)) || [])
  const [keys, setKeys] = useState((props.value && Array.from({ length: props.value.size }, () => uuid())) || [])
  const [itemOpen, setItemOpen] = useState(null)
  const [value, setValue] = useState(valueToString(props.value))

  const getValueType = () => {
    const { field } = props;
    if (field.get('fields')) {
      return valueTypes.MULTIPLE;
    } else if (field.get('field')) {
      return valueTypes.SINGLE;
    } else if (field.get(TYPES_KEY)) {
      return valueTypes.MIXED;
    } else {
      return null;
    }
  };

  let uniqueFieldId = uniqueId(`${props.field.get('name')}-field-`);
  /**
   * Always update so that each nested widget has the option to update. This is
   * required because ControlHOC provides a default `shouldComponentUpdate`
   * which only updates if the value changes, but every widget must be allowed
   * to override 
   */
  function shouldComponentUpdate() {
    return true;
  }

  const handleChange = e => {
    const { onChange } = props;
    const oldValue = value;
    const newValue = e.target.value.trim();
    const listValue = newValue ? newValue.split(',') : [];
    if (newValue.match(/,$/) && oldValue.match(/, $/)) {
      listValue.pop();
    }

    const parsedValue = valueToString(listValue);
    setValue(parsedValue);
    onChange(List(listValue.map(val => val.trim())));
  };

  const handleFocus = () => {
    props.setActiveStyle();
  };

  const handleBlur = e => {
    const listValue = e.target.value
      .split(',')
      .map(el => el.trim())
      .filter(el => el);
    setValue(valueToString(listValue));
    props.setInactiveStyle();
  };

  const handleAdd = (e = null) => {
    if (e) e?.preventDefault()
    const { field } = props;
    const parsedValue =
      getValueType() === valueTypes.SINGLE
        ? singleDefault()
        : fromJS(multipleDefault(field.get('fields')));
    addItem(parsedValue);
  };

  const singleDefault = () => {
    const { field } = props;

    return field.getIn(['field', 'default'], null);
  };

  const multipleDefault = fields => {
    return getFieldsDefault(fields);
  };

  const handleAddType = (type, typeKey) => {
    const parsedValue = fromJS(mixedDefault(typeKey, type));
    addItem(parsedValue);
  };

  const mixedDefault = (typeKey, type) => {
    const { field } = props;

    const selectedType = field.get(TYPES_KEY).find(f => f.get('name') === type);
    const fields = selectedType.get('fields') || [selectedType.get('field')];

    return getFieldsDefault(fields, { [typeKey]: type });
  };

  const getFieldsDefault = (fields, initialValue = {}) => {
    return fields.reduce((acc, item) => {
      const subfields = item.get('field') || item.get('fields');
      const object = item.get('widget') == 'object';
      const name = item.get('name');
      const defaultValue = item.get('default', null);

      if (List.isList(subfields) && object) {
        const subDefaultValue = getFieldsDefault(subfields);
        !isEmpty(subDefaultValue) && (acc[name] = subDefaultValue);
        return acc;
      }

      if (Map.isMap(subfields) && object) {
        const subDefaultValue = getFieldsDefault([subfields]);
        !isEmpty(subDefaultValue) && (acc[name] = subDefaultValue);
        return acc;
      }

      if (defaultValue !== null) {
        acc[name] = defaultValue;
      }

      return acc;
    }, initialValue);
  };

  const addItem = parsedValue => {

    const { value, onChange, field } = props;
    const addToTop = field.get('add_to_top', false);

    const itemKey = uuid();
    setItemsCollapsed(addToTop ? [true, ...itemsCollapsed] : [...itemsCollapsed, true])
    setKeys(addToTop ? [itemKey, ...keys] : [...keys, itemKey])

    const listValue = value || List();
    if (addToTop) {
      onChange(listValue.unshift(parsedValue));
    } else {
      onChange(listValue.push(parsedValue));
    }
  };

  const processControlRef = ref => {
    if (!ref) return;
    const { validate, props: { validationKey: key } } = ref;
    validations.push({ key, validate });
  };

  const validate = () => {
    if (getValueType()) {
      validations.forEach(item => {
        item.validate();
      });
    } else {
      validate();
    }
    props.onValidateObject(props.forID, validateSize());
  };

  const validateSize = () => {
    const { field, value, t } = props;
    const min = field.get('min');
    const max = field.get('max');
    const required = field.get('required', true);

    if (!required && !value?.size) {
      return [];
    }

    const error = validations.validateMinMax(
      t,
      field.get('label', field.get('name')),
      value,
      min,
      max,
    );

    return error ? [error] : [];
  };

  /**
   * In case the `onChangeObject` function is frozen by a child widget implementation,
   * e.g. when debounced, always get the latest object value instead of using
   * `props.value` directly.
   */
  let getObjectValue = idx => props.value.get(idx) || Map();

  function handleChangeFor(index) {
    return (f, newValue, newMetadata) => {
      const { value, metadata, onChange, field } = props;
      const collectionName = field.get('name');
      const listFieldObjectWidget = field.getIn(['field', 'widget']) === 'object';
      const withNameKey =
        getValueType() !== valueTypes.SINGLE ||
        (getValueType() === valueTypes.SINGLE && listFieldObjectWidget);
      const newObjectValue = withNameKey
        ? getObjectValue(index).set(f.get('name'), newValue)
        : newValue;
      const parsedMetadata = {
        [collectionName]: Object.assign(metadata ? metadata.toJS() : {}, newMetadata || {}),
      };
      onChange(value.set(index, newObjectValue), parsedMetadata);
    };
  }

  const handleRemove = (index, event) => {
    event.preventDefault();
    const { value, metadata, onChange, field, clearFieldErrors } = props;
    const collectionName = field.get('name');
    const isSingleField = getValueType() === valueTypes.SINGLE;

    const metadataRemovePath = isSingleField ? value.get(index) : value.get(index).valueSeq();
    const parsedMetadata =
      metadata && !metadata.isEmpty()
        ? { [collectionName]: metadata.removeIn(metadataRemovePath) }
        : metadata;

    itemsCollapsed.splice(index, 1);
    // clear validations
    validations = [];
    setItemsCollapsed([...itemsCollapsed])
    setKeys(Array.from({ length: value.size - 1 }, () => uuid()))

    onChange(value.remove(index), parsedMetadata);
    clearFieldErrors();
  };

  const handleItemCollapseToggle = (index, item, event) => {
    event.preventDefault();
    const newItemsCollapsed = itemsCollapsed.map((collapsed, itemIndex) => {
      if (index === itemIndex) {
        return !collapsed;
      }
      return collapsed;
    });
    setItemsCollapsed(newItemsCollapsed)
    setItemOpen(objectLabel(item))

  };

  const handleCollapseAllToggle = e => {
    e.preventDefault();
    const { value, field } = props;
    const minimizeCollapsedItems = field.get('minimize_collapsed', false);
    const listCollapsedByDefault = field.get('collapsed', true);
    const allItemsCollapsed = itemsCollapsed.every(val => val === true);

    if (minimizeCollapsedItems) {
      let updatedItemsCollapsed = itemsCollapsed;
      // Only allow collapsing all items in this mode but not opening all at once
      if (!listCollapsed || !listCollapsedByDefault) updatedItemsCollapsed = Array(value.size).fill(!listCollapsed);
      setListCollapsed(!listCollapsed); setItemsCollapsed(updatedItemsCollapsed); setItemOpen(null);
    } else setItemsCollapsed(Array(value.size).fill(!allItemsCollapsed)); setItemOpen(null);
  };

  function objectLabel(item) {
    const { field, entry, t } = props;
    const valueType = getValueType();
    switch (valueType) {
      case valueTypes.MIXED: {
        if (!validateItem(field, item)) {
          return;
        }
        const itemType = getTypedFieldForValue(field, item);
        const label = itemType.get('label', itemType.get('name'));
        // each type can have its own summary, but default to the list summary if exists
        const summary = itemType.get('summary', field.get('summary'));
        const labelReturn = summary ? handleSummary(summary, entry, label, item) : label;
        return labelReturn;
      }
      case valueTypes.SINGLE: {
        const singleField = field.get('field');
        const label = singleField.get('label', singleField.get('name'));
        const summary = field.get('summary');
        const data = fromJS({ [singleField.get('name')]: item });
        const labelReturn = summary ? handleSummary(summary, entry, label, data) : label;
        return labelReturn;
      }
      case valueTypes.MULTIPLE: {
        if (!validateItem(field, item)) {
          return;
        }
        const multiFields = field.get('fields');
        const labelField = multiFields && multiFields.first();
        const value = item.get(labelField.get('name'));
        const summary = field.get('summary');
        const labelReturn = summary ? handleSummary(summary, entry, value, item) : value;
        return (labelReturn || t('editor.editorWidgets.list.edit')).toString();
      }
    }
    return '';
  }

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const { value, clearFieldErrors } = props;

    // Update value
    const item = value.get(oldIndex);
    const newValue = value.delete(oldIndex).insert(newIndex, item);
    props.onChange(newValue);

    // Update collapsing
    const collapsed = itemsCollapsed[oldIndex];
    itemsCollapsed.splice(oldIndex, 1);
    const updatedItemsCollapsed = [...itemsCollapsed];
    updatedItemsCollapsed.splice(newIndex, 0, collapsed);

    // Reset item to ensure updated state
    const updatedKeys = keys.map((key, keyIndex) => {
      if (keyIndex === oldIndex || keyIndex === newIndex) {
        return uuid();
      }
      return key;
    });
    setItemsCollapsed(updatedItemsCollapsed); setKeys(updatedKeys)
    //clear error fields and remove old validations
    clearFieldErrors();
    validations = validations.filter(item => updatedKeys.includes(item.key));
  };

  const hasError = index => {
    const { fieldsErrors } = props;
    if (fieldsErrors && fieldsErrors.size > 0) {
      return Object.values(fieldsErrors.toJS()).some(arr =>
        arr.some(err => err.parentIds && err.parentIds.includes(keys[index])),
      );
    }
  };

  // eslint-disable-next-line react/display-name
  const renderItem = (item, index) => {
    const {
      classNameWrapper,
      editorControl,
      onValidateObject,
      metadata,
      clearFieldErrors,
      fieldsErrors,
      controlRef,
      resolveWidget,
      parentIds,
      forID,
      t,
      value
    } = props;
    const collapsed = itemsCollapsed[index];
    const key = keys[index];
    let field = props.field;
    const hasAError = hasError(index);
    const isVariableTypesList = getValueType() === valueTypes.MIXED;
    if (isVariableTypesList) {
      field = getTypedFieldForValue(field, item);
      if (!field) {
        return renderErroneousTypedItem(index, item);
      }
    }

    const indexItemsCollapsed = itemsCollapsed.some((i) => i == false) ? itemsCollapsed.indexOf(false) : index

    return (
      indexItemsCollapsed == index
        ? <SortableListItem
          css={[styles.listControlItem, collapsed && styles.listControlItemCollapsed]}
          index={index}
          key={key}
        >
          <StyledListItemTopBar
            collapsed={collapsed}
            onRemove={partial(handleRemove, index)}
            dragHandleHOC={SortableHandle}
            data-testid={`styled-list-item-top-bar-${key}`}
            item={<NestedObjectLabelV2 collapsed={collapsed} error={hasAError} onClick={(e) => handleItemCollapseToggle(index, item, e)}>
              <IconEdit type="write" size="small" />
              {objectLabel(item).length > 30 ? `${objectLabel(item).substr(0, 30)}..` : objectLabel(item)}
            </NestedObjectLabelV2>}
          />

          <ClassNames>
            {({ css, cx }) => (<>
              <ObjectControl
                classNameWrapper={cx(classNameWrapper, {
                  [css`
                  ${styleStrings.collapsedObjectControl};
                `]: collapsed,
                })}
                value={item}
                field={field}
                onChangeObject={handleChangeFor(index)}
                editorControl={editorControl}
                resolveWidget={resolveWidget}
                metadata={metadata}
                forList
                onValidateObject={onValidateObject}
                clearFieldErrors={clearFieldErrors}
                fieldsErrors={fieldsErrors}
                ref={processControlRef}
                controlRef={controlRef}
                validationKey={key}
                collapsed={collapsed}
                data-testid={`object-control-${key}`}
                hasError={hasAError}
                parentIds={[...parentIds, forID, key]}
              /></>
            )}
          </ClassNames>
        </SortableListItem>
        : null
    );
  };

  function renderErroneousTypedItem(index, item) {
    const field = props.field;
    const errorMessage = getErrorMessageForTypedFieldAndValue(field, item);
    const key = `item-${index}`;
    return (
      <SortableListItem
        css={[styles.listControlItem, styles.listControlItemCollapsed]}
        index={index}
        key={key}
      >
        <StyledListItemTopBar
          onCollapseToggle={null}
          onRemove={partial(handleRemove, index, key)}
          dragHandleHOC={SortableHandle}
        />
        <NestedObjectLabel collapsed={true} error={true}>
          {errorMessage}
        </NestedObjectLabel>
      </SortableListItem>
    );
  }

  function renderListControl() {
    const { value, forID, field, classNameWrapper, t } = props;
    const items = value || List();
    const label = field.get('label', field.get('name'));
    const labelSingular = field.get('label_singular') || field.get('label', field.get('name'));
    const listLabel = items.size === 1 ? labelSingular.toLowerCase() : label.toLowerCase();
    const minimizeCollapsedItems = field.get('minimize_collapsed', false);
    const allItemsCollapsed = itemsCollapsed.every(val => val === true);
    const selfCollapsed = allItemsCollapsed && (listCollapsed || !minimizeCollapsedItems);




  // const editor = useEditor({
  //   extensions: [
  //     StarterKit,
  //   ],
  //   content: `
    
  //   `,
  // })
    return (
      <ClassNames>
        {({ cx, css }) => (
          itemsCollapsed.some((e) => e == false) ?
            <div>
  
              <ObjectWidgetTopBar
                allowAdd={field.get('allow_add', true)}
                onAdd={handleAdd}
                types={field.get(TYPES_KEY, null)}
                onAddType={type => handleAddType(type, resolveFieldKeyType(field))}
                heading={`${items.size} ${listLabel}`}
                label={labelSingular.toLowerCase()}
                onCollapseToggle={handleCollapseAllToggle}
                collapsed={selfCollapsed}
                t={t}
                collapsedItem={itemOpen || null}
                itemsCollapsed={() => setItemsCollapsed(itemsCollapsed.map(() => true))}
              />
              {(!selfCollapsed || !minimizeCollapsedItems) && (
                <SortableList
                  items={items}
                  renderItem={renderItem}
                  onSortEnd={onSortEnd}
                  useDragHandle
                  lockAxis="y"
                />
              )}
            </div>
            :
            <div
              id={forID}
              className={cx(
                classNameWrapper,
                css`
                ${styleStrings.objectWidgetTopBarContainer}
              `,
              )}
            > 
              <ObjectWidgetTopBar
                allowAdd={field.get('allow_add', true)}
                onAdd={handleAdd}
                types={field.get(TYPES_KEY, null)}
                onAddType={type => handleAddType(type, resolveFieldKeyType(field))}
                heading={`${items.size} ${listLabel}`}
                label={labelSingular.toLowerCase()}
                onCollapseToggle={handleCollapseAllToggle}
                collapsed={selfCollapsed}
                t={t}
                collapsedItem={''}
              />
                 {/* <>
      {editor && <BubbleMenu className="bubble-menu" tippyOptions={{ duration: 100 }} editor={editor}>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'is-active' : ''}
        >
          Strike
        </button>
      </BubbleMenu>}

      {editor && <FloatingMenu className="floating-menu" tippyOptions={{ duration: 100 }} editor={editor}>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          Bullet List
        </button>
      </FloatingMenu>}

      <EditorContent editor={editor} />
    </> */}
              {(!selfCollapsed || !minimizeCollapsedItems) && (
                <SortableList
                  items={items}
                  renderItem={renderItem}
                  onSortEnd={onSortEnd}
                  useDragHandle
                  lockAxis="y"
                />
              )}
            </div>
        )}
      </ClassNames>
    );
  }

  function renderInput() {
    const { forID, classNameWrapper } = props;
    return (
      <input
        type="text"
        id={forID}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={classNameWrapper}
      />
    );
  }


  return getValueType() !== null ? renderListControl() : renderInput()

}
