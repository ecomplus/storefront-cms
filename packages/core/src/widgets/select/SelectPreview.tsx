import React from 'react';

import type { SelectField, WidgetPreviewProps } from '@staticcms/core/interface';
import type { FC } from 'react';

interface ListPreviewProps {
  values: (string | number)[];
}

const ListPreview = ({ values }: ListPreviewProps) => {
  return (
    <ul>
      {values.map((value, idx) => (
        <li key={idx}>{value}</li>
      ))}
    </ul>
  );
};

const SelectPreview: FC<WidgetPreviewProps<string | number | (string | number)[], SelectField>> = ({
  value,
}) => {
  if (!value) {
    return <div />;
  }

  return (
    <div>
      {typeof value === 'string' || typeof value === 'number' ? (
        value
      ) : (
        <ListPreview values={value} />
      )}
    </div>
  );
};

export default SelectPreview;
