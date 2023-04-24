import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

import type { ReactNode } from 'react';

interface TableBodyCellProps {
  children?: ReactNode;
}

const TableBodyCell = ({ children }: TableBodyCellProps) => {
  return (
    <TableCell
      scope="row"
      sx={{
        padding: '16px 12px',
        '&:first-of-type, &:first-of-type': {
          paddingLeft: 0,
        },
        '&:last-of-type, &:last-of-type': {
          paddingRight: 0,
        },
      }}
    >
      <Typography
        component="span"
        sx={{
          fontSize: '13px',
          fontFamily: 'Consolas, Menlo, Monaco, Andale Mono, Ubuntu Mono, monospace',
        }}
      >
        {children}
      </Typography>
    </TableCell>
  );
};

export default TableBodyCell;
