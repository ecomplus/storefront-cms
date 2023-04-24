import React from 'react';

import type { MdH4Element, MdValue } from '@staticcms/markdown';
import type { PlateRenderElementProps } from '@udecode/plate';
import type { FC } from 'react';

const Heading4: FC<PlateRenderElementProps<MdValue, MdH4Element>> = ({
  attributes,
  children,
  nodeProps,
}) => {
  return (
    <h4
      {...attributes}
      {...nodeProps}
      className="
        leading-[1.25em]
        font-bold
        my-[1.33em]
      "
    >
      {children}
    </h4>
  );
};

export default Heading4;
