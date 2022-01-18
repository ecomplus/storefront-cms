import React from 'react';
import PropTypes from 'prop-types';
import { WidgetPreviewContainer } from 'netlify-cms-ui-default';

function ObjectPreview({ field }) {
  return (
    <WidgetPreviewContainer
      style={{ borderStyle: field?.get('name') === window?.storefrontCmsFocusField?.name && field?.get('label') === window?.storefrontCmsFocusField?.label ? 'dotted' : 'none' }}
    >
      {(field && field.get('fields')) || field.get('field') || null}
    </WidgetPreviewContainer>
  );
}

ObjectPreview.propTypes = {
  field: PropTypes.node,
};

export default ObjectPreview;
