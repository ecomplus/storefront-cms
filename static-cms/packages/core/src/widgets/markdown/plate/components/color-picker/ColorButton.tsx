import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Check as CheckIcon } from '@styled-icons/material/Check';
import React, { useCallback } from 'react';

import classNames from '@staticcms/core/lib/util/classNames.util';

import type { FC } from 'react';

export type ColorButtonProps = {
  name: string;
  value: string;
  isBrightColor: boolean;
  isSelected: boolean;
  updateColor: (color: string) => void;
};

const ColorButton: FC<ColorButtonProps> = ({
  name,
  value,
  isBrightColor,
  isSelected,
  updateColor,
}) => {
  const handleOnClick = useCallback(() => {
    updateColor(value);
  }, [updateColor, value]);

  return (
    <Tooltip title={name} disableInteractive>
      <IconButton onClick={handleOnClick} sx={{ p: 0 }}>
        <Avatar
          alt={name}
          sx={{
            background: value,
            width: 32,
            height: 32,
            border: isBrightColor ? '1px solid rgba(209,213,219, 1)' : 'transparent',
          }}
        >
          {isSelected ? (
            <CheckIcon
              className={classNames('h-5 w-5', isBrightColor ? 'text-black' : 'text-white')}
            />
          ) : (
            <>&nbsp;</>
          )}
        </Avatar>
      </IconButton>
    </Tooltip>
  );
};

export default ColorButton;
