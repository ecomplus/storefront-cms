import React from 'react';

import type { MdH3Element, MdValue } from '@staticcms/markdown';
import type { PlateRenderElementProps } from '@udecode/plate';
import type { FC } from 'react';

const Heading3: FC<PlateRenderElementProps<MdValue, MdH3Element>> = ({
  attributes,
  children,
  nodeProps,
}) => {
  return (
    <h3
      {...attributes}
      {...nodeProps}
      className="
        text-[1.17em]
        leading-[1.25em]
        font-bold
        my-[1em]
      "
    >
      {children}
    </h3>
  );
};

export default Heading3;
