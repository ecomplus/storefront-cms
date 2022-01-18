import PropTypes from 'prop-types';
import React from 'react';
import { List } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { WidgetPreviewContainer } from 'netlify-cms-ui-default';

function ListPreview({ values }) {
  return (
    <ul>
      {values.map((value, idx) => (
        <li key={idx}>{value}</li>
      ))}
    </ul>
  );
}

function SelectPreview(props) {
  return (
    <WidgetPreviewContainer style={{ borderStyle: props?.field?.get('name') === window?.storefrontCmsFocusField?.name && props?.field?.get('label') === window?.storefrontCmsFocusField?.label ? 'dotted' : 'none' }}>
      {props.value && (List.isList(props.value) ? <ListPreview values={props.value} /> : props.value)}
      {!props.value && null}
    </WidgetPreviewContainer>
  );
}

SelectPreview.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, ImmutablePropTypes.list]),
};

export default SelectPreview;
