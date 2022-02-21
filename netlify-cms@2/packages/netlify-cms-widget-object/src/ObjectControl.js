import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { ClassNames } from '@emotion/core';
import { List, Map } from 'immutable';
import { colors, lengths, ObjectWidgetTopBar } from 'netlify-cms-ui-default';
import { stringTemplate } from 'netlify-cms-lib-widgets';

const styleStrings = {
  nestedObjectControl: `
    padding: 6px 14px 14px;
    border-top: 0;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  `,
  objectWidgetTopBarContainer: `
    padding: ${lengths.objectWidgetTopBarContainerPadding};
  `,
  collapsedObjectControl: `
    display: none;
  `,
};

export default function ObjectControl(props) {

  // let componentValidate = {};
  const { field, forID, classNameWrapper, forList, hasError, t } = props;
  // const collapsed = forList ? props.collapsed : collapsed;
  const multiFields = field.get('fields');
  const singleField = field.get('field');
  const [collapsed, setCollapsed] = useState(props.field.get('collapsed', false))

  /*
   * Always update so that each nested widget has the option to update. This is
   * required because ControlHOC provides a default `shouldComponentUpdate`
   * which only updates if the value changes, but every widget must be allowed
   * to override 
   */
  const shouldComponentUpdate = () => {
    return true;
  }

  const validate = () => {
    const { field } = props;
    let fields = field.get('field') || field.get('fields');
    fields = List.isList(fields) ? fields : List([fields]);
    fields.forEach(field => {
      if (field.get('widget') === 'hidden') return;
      // setComponentValidate({...componentValidate, [field.get('name')]: field.get('name')})
      // this.componentValidate[field.get('name')]();
    });
  };

  const controlFor = (field, key) => {
    const {
      value,
      onChangeObject,
      onValidateObject,
      clearFieldErrors,
      metadata,
      fieldsErrors,
      editorControl: EditorControl,
      controlRef,
      parentIds,
      isFieldDuplicate,
      isFieldHidden,
    } = props;

    if (field.get('widget') === 'hidden') {
      return null;
    }
    const fieldName = field.get('name');
    const fieldValue = value && Map.isMap(value) ? value.get(fieldName) : value;
    const isDuplicate = isFieldDuplicate && isFieldDuplicate(field);
    const isHidden = isFieldHidden && isFieldHidden(field);

    return (
      <EditorControl
        obj={true}
        key={key}
        field={field}
        value={fieldValue}
        onChange={onChangeObject}
        clearFieldErrors={clearFieldErrors}
        fieldsMetaData={metadata}
        fieldsErrors={fieldsErrors}
        onValidate={onValidateObject}
        processControlRef={controlRef && controlRef.bind(this)}
        controlRef={controlRef}
        parentIds={parentIds}
        isDisabled={isDuplicate}
        isHidden={isHidden}
        isFieldDuplicate={isFieldDuplicate}
        isFieldHidden={isFieldHidden} s
      />
    );
  }

  const handleCollapseToggle = () => {
    setCollapsed(!collapsed);
  };

  const renderFields = (multiFields, singleField) => {
    if (multiFields) {
      return multiFields.map((f, idx) => controlFor(f, idx));
    }
    return controlFor(singleField);
  };

  const objectLabel = () => {
    const { value, field } = props;
    const label = field.get('label', field.get('name'));
    const summary = field.get('summary');
    return summary ? stringTemplate.compileStringTemplate(summary, null, '', value) : label;
  };

  return <>
    {multiFields || singleField ? <ClassNames>
      {({ css, cx }) => (
        <div
          id={forID}
          className={cx(
            classNameWrapper,
            css`
                  ${styleStrings.objectWidgetTopBarContainer}
                `,
            {
              [css`
                    ${styleStrings.nestedObjectControl}
                  `]: forList,
            },
            {
              [css`
                    border-color: ${colors.textFieldBorder};
                  `]: forList ? !hasError : false,
            },
          )}
        >
          {forList ? null : (
            <ObjectWidgetTopBar
              collapsed={collapsed}
              onCollapseToggle={handleCollapseToggle}
              heading={collapsed && objectLabel()}
              t={t}
            />
          )}
          <div
            className={cx({
              [css`
                    ${styleStrings.collapsedObjectControl}
                  `]: collapsed,
            })}
          >
            {renderFields(multiFields, singleField)}
          </div>
        </div>
      )}
    </ClassNames>
      : <h3>No field(s) defined for this widget</h3>}
  </>
}
