import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Map, List } from 'immutable';
import { oneLine } from 'common-tags';

import { getRemarkPlugins } from '../../../lib/registry';
import ValidationErrorTypes from '../../../constants/validationErrorTypes';
import { renderToString } from 'react-dom/server';
import {
  useEditor,
  EditorContent,
  BubbleMenu,
  FloatingMenu,
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

function truthy() {
  return { error: false };
}

function isEmpty(value) {
  return (
    value === null ||
    value === undefined ||
    (Object.prototype.hasOwnProperty.call(value, 'length') && value.length === 0) ||
    (value.constructor === Object && Object.keys(value).length === 0) ||
    (List.isList(value) && value.size === 0)
  );
}

export default function Widget(props) {
  let innerWrappedControl;

  let wrappedControlValid;

  /**
   * Get the `shouldComponentUpdate` method from the wrapped control, and
   * provide the control instance is the `this` binding.
   */

  let wrappedControlShouldComponentUpdate;

  const shouldComponentUpdate = (nextProps) => {
    /**
     * Allow widgets to provide their own `shouldComponentUpdate` method.
     */
    if (wrappedControlShouldComponentUpdate) {
      return wrappedControlShouldComponentUpdate(nextProps);
    }
    return (
      props.value !== nextProps.value ||
      props.classNameWrapper !== nextProps.classNameWrapper ||
      props.hasActiveStyle !== nextProps.hasActiveStyle
    );
  }

  const processInnerControlRef = ref => {
    if (!ref) return;

    /**
     * If the widget is a container that receives state updates from the store,
     * we'll need to get the ref of the actual control via the `react-redux`
     * `getWrappedInstance` method. Note that connected widgets must pass
     * `withRef: true` to `connect` in the options object.
     */
    innerWrappedControl = ref.getWrappedInstance ? ref.getWrappedInstance() : ref;

    wrappedControlValid = innerWrappedControl.isValid || truthy;

    /**
     * Get the `shouldComponentUpdate` method from the wrapped control, and
     * provide the control instance is the `this` binding.
     */
    const { shouldComponentUpdate: scu } = innerWrappedControl;
    wrappedControlShouldComponentUpdate = scu && scu.bind(innerWrappedControl);
  };

  const getValidateValue = () => {
    let value = innerWrappedControl?.getValidateValue?.() || props.value;
    // Convert list input widget value to string for validation test
    List.isList(value) && (value = value.join(','));
    return value;
  };

  const validate = (skipWrapped = false) => {
    const value = getValidateValue();
    const field = props.field;
    const errors = [];
    const validations = [validatePresence, validatePattern];
    if (field.get('meta')) {
      validations.push(props.validateMetaField);
    }
    validations.forEach(func => {
      const response = func(field, value, props.t);
      if (response.error) errors.push(response.error);
    });
    if (skipWrapped) {
      if (skipWrapped.error) errors.push(skipWrapped.error);
    } else {
      const wrappedError = validateWrappedControl(field);
      if (wrappedError.error) errors.push(wrappedError.error);
    }

    props.onValidate(errors);
  };

  const validatePresence = (field, value) => {
    const { t, parentIds } = props;
    const isRequired = field.get('required', true);
    if (isRequired && isEmpty(value)) {
      const error = {
        type: ValidationErrorTypes.PRESENCE,
        parentIds,
        message: t('editor.editorControlPane.widget.required', {
          fieldLabel: field.get('label', field.get('name')),
        }),
      };

      return { error };
    }
    return { error: false };
  };

  const validatePattern = (field, value) => {
    const { t, parentIds } = props;
    const pattern = field.get('pattern', false);

    if (isEmpty(value)) {
      return { error: false };
    }

    if (pattern && !RegExp(pattern.first()).test(value)) {
      const error = {
        type: ValidationErrorTypes.PATTERN,
        parentIds,
        message: t('editor.editorControlPane.widget.regexPattern', {
          fieldLabel: field.get('label', field.get('name')),
          pattern: pattern.last(),
        }),
      };

      return { error };
    }

    return { error: false };
  };

  const validateWrappedControl = field => {
    const { t, parentIds } = props;
    if (typeof wrappedControlValid !== 'function') {
      throw new Error(oneLine`
        wrappedControlValid is not a function. Are you sure widget
        "${field.get('widget')}" is registered?
      `);
    }

    const response = wrappedControlValid();
    if (typeof response === 'boolean') {
      const isValid = response;
      return { error: !isValid };
    } else if (Object.prototype.hasOwnProperty.call(response, 'error')) {
      return response;
    } else if (response instanceof Promise) {
      response.then(
        () => {
          validate({ error: false });
        },
        err => {
          const error = {
            type: ValidationErrorTypes.CUSTOM,
            message: `${field.get('label', field.get('name'))} - ${err}.`,
          };

          validate({ error });
        },
      );

      const error = {
        type: ValidationErrorTypes.CUSTOM,
        parentIds,
        message: t('editor.editorControlPane.widget.processing', {
          fieldLabel: field.get('label', field.get('name')),
        }),
      };

      return { error };
    }
    return { error: false };
  };

  /**
   * In case the `onChangeObject` function is frozen by a child widget implementation,
   * e.g. when debounced, always get the latest object value instead of using
   * `props.value` directly.
   */
  const getObjectValue = () => props.value || Map();

  /**
   * Change handler for fields that are nested within another field.
   */
  const onChangeObject = (field, newValue, newMetadata) => {
    const newObjectValue = getObjectValue().set(field.get('name'), newValue);
    return props.onChange(
      newObjectValue,
      newMetadata && { [props.field.get('name')]: newMetadata },
    );
  };

  const setInactiveStyle = () => {
    props.setInactiveStyle();
    if (props.field.has('pattern') && !isEmpty(getValidateValue())) {
      validate();
    }
  };
  const {
    controlComponent,
    entry,
    collection,
    config,
    field,
    value,
    mediaPaths,
    metadata,
    onChange,
    onValidateObject,
    onOpenMediaLibrary,
    onRemoveMediaControl,
    onPersistMedia,
    onClearMediaControl,
    onAddAsset,
    onRemoveInsertedMedia,
    getAsset,
    classNameWrapper,
    classNameWidget,
    classNameWidgetActive,
    classNameLabel,
    classNameLabelActive,
    setActiveStyle,
    hasActiveStyle,
    editorControl,
    uniqueFieldId,
    resolveWidget,
    widget,
    getEditorComponents,
    query,
    queryHits,
    clearSearch,
    clearFieldErrors,
    isFetching,
    loadEntry,
    fieldsErrors,
    controlRef,
    isEditorComponent,
    isNewEditorComponent,
    parentIds,
    t,
    isDisabled,
    isFieldDuplicate,
    isFieldHidden,
    obj
  } = props;

  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: `
    `,
    onUpdate({ editor }) {
      onChange()
    },

  })
  return (
    <>{editor && <BubbleMenu className="bubble-menu" tippyOptions={{ duration: 100 }} editor={editor}>
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
      {obj ? <>

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

        <EditorContent
          editor={editor}
          entry
          collection
          config
          field
          value
          mediaPaths
          metadata
          onChange
          onChangeObject={onChangeObject}
          onValidateObject
          onOpenMediaLibrary
          onClearMediaControl
          onRemoveMediaControl
          onPersistMedia
          onAddAsset
          onRemoveInsertedMedia
          getAsset
          forID={uniqueFieldId}
          ref={processInnerControlRef}
          validate={validate}
          classNameWrapper
          classNameWidget
          classNameWidgetActive
          classNameLabel
          classNameLabelActive
          setActiveStyle
          setInactiveStyle={() => setInactiveStyle()}
          hasActiveStyle
          editorControl
          resolveWidget
          widget
          getEditorComponents
          getRemarkPlugins
          query
          queryHits
          clearSearch
          clearFieldErrors
          isFetching
          loadEntry
          isEditorComponent
          isNewEditorComponent
          fieldsErrors
          controlRef
          parentIds
          t
          isDisabled
          isFieldDuplicate
          isFieldHidden />
      </> :
        <>
          {React.createElement(controlComponent, {
            entry,
            collection,
            config,
            field,
            value,
            mediaPaths,
            metadata,
            onChange,
            onChangeObject: onChangeObject,
            onValidateObject,
            onOpenMediaLibrary,
            onClearMediaControl,
            onRemoveMediaControl,
            onPersistMedia,
            onAddAsset,
            onRemoveInsertedMedia,
            getAsset,
            forID: uniqueFieldId,
            ref: processInnerControlRef,
            validate: validate,
            classNameWrapper,
            classNameWidget,
            classNameWidgetActive,
            classNameLabel,
            classNameLabelActive,
            setActiveStyle,
            setInactiveStyle: () => setInactiveStyle(),
            hasActiveStyle,
            editorControl,
            resolveWidget,
            widget,
            getEditorComponents,
            getRemarkPlugins,
            query,
            queryHits,
            clearSearch,
            clearFieldErrors,
            isFetching,
            loadEntry,
            isEditorComponent,
            isNewEditorComponent,
            fieldsErrors,
            controlRef,
            parentIds,
            t,
            isDisabled,
            isFieldDuplicate,
            isFieldHidden,
            // editor: editor
          })
          }
        </>
      }
    </>
  )
}
