import React from 'react';
import PropTypes from 'prop-types';
import { WidgetPreviewContainer } from 'netlify-cms-ui-default';

function StringPreview({ value, field }) {
  return <WidgetPreviewContainer
    style={{ borderStyle: field?.get('name') === window?.previewStyle?.name && field?.get('label') === window?.previewStyle?.label ? 'dotted' : 'none' }}
  >{value}</WidgetPreviewContainer>;
}

StringPreview.propTypes = {
  value: PropTypes.node,
};

export default StringPreview;
