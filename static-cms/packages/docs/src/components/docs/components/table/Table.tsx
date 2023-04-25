import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';

import type { ReactNode } from 'react';

const StyledTableContainer = styled(TableContainer)(
  ({ theme }) => `
    margin-bottom: 16px;

    & td {
      color: ${theme.palette.text.secondary};
    }

    & td:nth-of-type(2):not(:last-of-type) {
      color:
        ${theme.palette.mode === 'light' ? '#751365' : '#ffb6ec'};
    }

    & thead tr th,
    & thead tr td {
      white-space: nowrap;
    }

    & tbody tr td {
      white-space: nowrap;
    }

    & tbody tr td:last-of-type {
      white-space: normal;
    }

    .non-props-table + & tbody tr td {
      white-space: normal;
    }

    & tbody tr td:last-of-type {
      min-width: 200px;
    }

    .non-props-table + & tbody tr td:last-of-type {
      min-width: unset;
    }
  `,
);

interface DocsTableProps {
  children?: ReactNode | ReactNode[];
}

const DocsTable = ({ children = [] }: DocsTableProps) => {
  return (
    <StyledTableContainer>
      <Table sx={{ width: '100%' }} aria-label="doc table">
        {children}
      </Table>
    </StyledTableContainer>
  );
};

export default DocsTable;
