import React from 'react';
import PropTypes from 'prop-types';
import { WidgetPreviewContainer } from 'netlify-cms-ui-default';

function DatePreview({ value, field }) {
  return <WidgetPreviewContainer style={{ borderStyle: field?.get('name') === window?.storefrontCmsFocusField?.name && field?.get('label') === window?.storefrontCmsFocusField?.label ? 'dotted' : 'none' }}>{value ? value.toString() : null}</WidgetPreviewContainer>;
}

DatePreview.propTypes = {
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export default DatePreview;
