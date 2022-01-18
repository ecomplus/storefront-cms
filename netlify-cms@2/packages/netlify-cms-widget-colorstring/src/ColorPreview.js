import React from 'react';
import PropTypes from 'prop-types';
import { WidgetPreviewContainer } from 'netlify-cms-ui-default';

function ColorPreview({ value, field }) {
  return <WidgetPreviewContainer style={{ borderStyle: field?.get('name') === window?.storefrontCmsFocusField?.name && field?.get('label') === window?.storefrontCmsFocusField?.label ? 'dotted' : 'none' }}>{value}</WidgetPreviewContainer>;
}

ColorPreview.propTypes = {
  value: PropTypes.node,
};

export default ColorPreview;
