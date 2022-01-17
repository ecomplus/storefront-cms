import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { isString } from 'lodash';
import { WidgetPreviewContainer } from 'netlify-cms-ui-default';

function toValue(value, field) {
  if (isString(value)) {
    return value;
  }
  if (Map.isMap(value)) {
    return value.get(field.getIn(['keys', 'code'], 'code'), '');
  }
  return '';
}

function CodePreview(props) {
  return (
    <WidgetPreviewContainer
      style={{
        borderStyle:
          props?.field.get('name') === window?.previewStyle?.name && props?.field.get('label') === window?.previewStyle?.label
            ? 'dotted' : 'none'
      }}>
      <pre>
        <code>{toValue(props.value, props.field)}</code>
      </pre>
    </WidgetPreviewContainer>
  );
}

CodePreview.propTypes = {
  value: PropTypes.node,
};

export default CodePreview;
