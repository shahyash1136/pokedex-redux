// DataGrid.tsx
import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface Column {
  key: string;
  label: string;
}

interface DataGridProps {
  columns: Column[];
  onSort: (columnKey: string, direction: 'asc' | 'desc') => void;
}

const DataGrid: React.FC<DataGridProps> = ({ columns, onSort }) => {
  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [menuColumn, setMenuColumn] = useState<string>('');

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (action: string) => {
    switch (action) {
      case 'asc':
        onSort(menuColumn, 'asc');
        break;
      case 'desc':
        onSort(menuColumn, 'desc');
        break;
      case 'unsort':
        onSort('', 'asc');
        break;
      default:
        break;
    }

    handleCloseMenu();
  };

  const getMenuItems = () => {
    const menuItems: JSX.Element[] = [];

    if (sortColumn === menuColumn) {
      // If the selected column is already sorted, show options based on the current sorting direction
      if (sortDirection === 'asc') {
        menuItems.push(
          <MenuItem key="desc" onClick={() => handleMenuItemClick('desc')}>
            Sort by Descending
          </MenuItem>,
          <MenuItem key="unsort" onClick={() => handleMenuItemClick('unsort')}>
            Unsort
          </MenuItem>
        );
      } else {
        menuItems.push(
          <MenuItem key="asc" onClick={() => handleMenuItemClick('asc')}>
            Sort by Ascending
          </MenuItem>,
          <MenuItem key="unsort" onClick={() => handleMenuItemClick('unsort')}>
            Unsort
          </MenuItem>
        );
      }
    } else {
      // If the selected column is not sorted, show default options
      menuItems.push(
        <MenuItem key="asc" onClick={() => handleMenuItemClick('asc')}>
          Sort by Ascending
        </MenuItem>,
        <MenuItem key="desc" onClick={() => handleMenuItemClick('desc')}>
          Sort by Descending
        </MenuItem>
      );
    }

    return menuItems;
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <TableCell key={column.key}>
              <div onClick={() => onSort(column.key, sortColumn === column.key ? sortDirection : 'asc')}>
                {column.label}
                {sortColumn === column.key && (
                  <span>{sortDirection === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}</span>
                )}
              </div>
              <div
                role="tooltip"
                className="menu-trigger"
                onClick={(e) => {
                  setMenuColumn(column.key);
                  setAnchorEl(e.currentTarget);
                }}
              >
                <IconButton size="small">
                  <MoreVertIcon />
                </IconButton>
              </div>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>

      {/* Menu */}
      {anchorEl && (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          {getMenuItems()}
        </Menu>
      )}
    </Table>
  );
};

export default DataGrid;
