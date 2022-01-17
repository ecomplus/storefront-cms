import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { List } from 'immutable';
import { WidgetPreviewContainer } from 'netlify-cms-ui-default';

const StyledImage = styled(({ src }) => <img src={src || ''} role="presentation" />)`
  display: block;
  max-width: 100%;
  height: auto;
`;

function StyledImageAsset({ getAsset, value, field }) {
  return <StyledImage style={{ borderStyle: field?.get('name') === window?.previewStyle?.name && field?.get('label') === window?.previewStyle?.label ? 'dotted' : 'none' }} src={getAsset(value, field)} />;
}

function ImagePreviewContent(props) {
  const { value, getAsset, field } = props;
  if (Array.isArray(value) || List.isList(value)) {
    return value.map(val => (
      <StyledImageAsset key={val} value={val} getAsset={getAsset} field={field} />
    ));
  }
  return <StyledImageAsset {...props} />;
}

function ImagePreview(props) {
  return (
    <WidgetPreviewContainer style={{ borderStyle: props?.field?.get('name') === window?.previewStyle?.name && props?.field?.get('label') === window?.previewStyle?.label ? 'dotted' : 'none' }}>
      {props.value ? <ImagePreviewContent {...props} /> : null}
    </WidgetPreviewContainer>
  );
}

ImagePreview.propTypes = {
  getAsset: PropTypes.func.isRequired,
  value: PropTypes.node,
};

export default ImagePreview;
