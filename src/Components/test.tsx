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





import { filterData, FilterOperator } from './yourFileContainingFilterData';

type TestData = {
  id: number;
  name: string;
  age: number;
};

const mockData: TestData[] = [
  { id: 1, name: 'John', age: 25 },
  { id: 2, name: 'Alice', age: 30 },
  { id: 3, name: 'Bob', age: 20 },
];

describe('filterData', () => {
  it('should filter data based on "contains" operator', () => {
    const result = filterData(mockData, 'name', 'contains', 'li');
    expect(result).toEqual([{ id: 2, name: 'Alice', age: 30 }]);
  });

  it('should filter data based on "equals" operator', () => {
    const result = filterData(mockData, 'age', 'equals', '25');
    expect(result).toEqual([{ id: 1, name: 'John', age: 25 }]);
  });

  it('should filter data based on "startsWith" operator', () => {
    const result = filterData(mockData, 'name', 'startsWith', 'A');
    expect(result).toEqual([{ id: 2, name: 'Alice', age: 30 }]);
  });

  it('should filter data based on "endsWith" operator', () => {
    const result = filterData(mockData, 'name', 'endsWith', 'hn');
    expect(result).toEqual([{ id: 1, name: 'John', age: 25 }]);
  });

  it('should handle "isEmpty" operator', () => {
    const result = filterData(mockData, 'name', 'isEmpty', '');
    expect(result).toEqual([{ id: 3, name: 'Bob', age: 20 }]);
  });

  it('should handle "isNotEmpty" operator', () => {
    const result = filterData(mockData, 'name', 'isNotEmpty', '');
    expect(result).toEqual([{ id: 1, name: 'John', age: 25 }, { id: 2, name: 'Alice', age: 30 }]);
  });

  it('should handle "=" operator', () => {
    const result = filterData(mockData, 'age', '=', '25');
    expect(result).toEqual([{ id: 1, name: 'John', age: 25 }]);
  });

  it('should handle "!=" operator', () => {
    const result = filterData(mockData, 'age', '!=', '25');
    expect(result).toEqual([{ id: 2, name: 'Alice', age: 30 }, { id: 3, name: 'Bob', age: 20 }]);
  });

  it('should handle ">" operator', () => {
    const result = filterData(mockData, 'age', '>', '25');
    expect(result).toEqual([{ id: 2, name: 'Alice', age: 30 }]);
  });

  it('should handle ">=" operator', () => {
    const result = filterData(mockData, 'age', '>=', '25');
    expect(result).toEqual([{ id: 1, name: 'John', age: 25 }, { id: 2, name: 'Alice', age: 30 }]);
  });

  it('should handle "<" operator', () => {
    const result = filterData(mockData, 'age', '<', '30');
    expect(result).toEqual([{ id: 1, name: 'John', age: 25 }, { id: 3, name: 'Bob', age: 20 }]);
  });

  it('should handle "<=" operator', () => {
    const result = filterData(mockData, 'age', '<=', '25');
    expect(result).toEqual([{ id: 1, name: 'John', age: 25 }, { id: 3, name: 'Bob', age: 20 }]);
  });

  it('should handle unknown operator and return the entire array', () => {
    const result = filterData(mockData, 'name', 'unknownOperator' as FilterOperator, 'someValue');
    expect(result).toEqual(mockData);
  });
});


Certainly! To make the date picker component more reusable, you can create a new component called `ReusableDatePicker` that accepts props for customization. Here's the refactored code:

```jsx
import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker, DateValidationError } from '@mui/x-date-picker';
import { useAppSelector, useAppDispatch } from '@store/store';
import { selectedDateValue, setDateError } from '@store/features/global/globalSlice';
import config from '@common/config';
import { getdefaultDates } from '@/common/';

interface ReusableDatePickerProps {
  label: string;
  value: Dayjs | null;
  onChange: (newValue: Dayjs | null) => void;
  minDate: Dayjs;
  maxDate: Dayjs;
  error: DateValidationError | 'emptyDate' | null;
  onError: (newError: DateValidationError | 'emptyDate' | null) => void;
}

const ReusableDatePicker: React.FC<ReusableDatePickerProps> = ({
  label,
  value,
  onChange,
  minDate,
  maxDate,
  error,
  onError,
}) => {
  const isWeekend = (value: Dayjs) => {
    const day = value.day();
    return day === 0 || day === 6;
  };

  const errorMessage = React.useMemo(() => {
    switch (error) {
      case 'maxDate':
        return `${label} cannot be greater than or equal to ${label === 'Date 1' ? 'Date 2' : 'Date 1'}`;
      case 'minDate':
        return `Cannot select past dates for ${label}`;
      case 'emptyDate':
        return `${label} cannot be empty`;
      case 'invalidDate':
        return 'Invalid date';
      case 'shouldDisableDate':
        return 'Weekend date cannot be selected';
      case 'disableFuture':
        return `Cannot select future dates for ${label}`;
      default:
        return '';
    }
  }, [error, label]);

  return (
    <DatePicker
      disableFuture={true}
      label={label}
      sx={{ width: '100%' }}
      value={value}
      shouldDisableDate={isWeekend}
      onChange={onChange}
      minDate={minDate}
      maxDate={maxDate}
      onerror={onError}
      showDaysOutsideCurrentMonth={true}
      slotProps={{
        textField: {
          helperText: errorMessage,
        },
      }}
      openTo="day"
      views={['year', 'month', 'day']}
    />
  );
};

const Dates = () => {
  const { date } = useAppSelector((state) => state.global);
  const dispatch = useAppDispatch();

  const [valueOne, setValueOne] = React.useState<Dayjs | null>(dayjs(date.one));
  const [valueTwo, setValueTwo] = React.useState<Dayjs | null>(dayjs(date.two));
  const [valueOneError, setValueOneError] = React.useState<DateValidationError | 'emptyDate' | null>(null);
  const [valueTwoError, setValueTwoError] = React.useState<DateValidationError | 'emptyDate' | null>(null);

  useEffect(() => {
    if (valueOne === null) {
      setValueOneError('emptyDate');
    }
    if (valueTwoError === null) {
      setValueTwoError('emptyDate');
    }
  }, [valueOne, valueTwo]);

  const dateChangeHandler = (label: string, newValue: Dayjs | null, otherValue: Dayjs) => {
    const isValid =
      newValue === null ||
      newValue.day() === 0 ||
      newValue.day() === 6 ||
      newValue >= otherValue ||
      newValue.isValid() ||
      newValue < dayjs(getdefaultDates()[`date_${label.toLowerCase()}`]).subtract(180, 'days');

    if (label === 'One') {
      setValueOne(newValue);
    } else {
      setValueTwo(newValue);
    }

    dispatch(
      selectedDateValue({
        one: label === 'One' ? newValue?.format(config.date_format) : valueOne?.format(config.date_format),
        two: label === 'Two' ? newValue?.format(config.date_format) : valueTwo?.format(config.date_format),
      })
    );

    dispatch(setDateError(!isValid));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <ReusableDatePicker
          label="Date 1"
          value={valueOne}
          onChange={(newValue) => dateChangeHandler('One', newValue, valueTwo)}
          minDate={dayjs(getdefaultDates().date_one).subtract(180, 'days')}
          maxDate={dayjs(valueTwo).subtract(1, 'day')}
          error={valueOneError}
          onError={(newError) => setValueOneError(newError)}
        />
      </Grid>
      <Grid item xs={6}>
        <ReusableDatePicker
          label="Date 2"
          value={valueTwo}
          onChange={(newValue) => dateChangeHandler('Two', newValue, valueOne)}
          minDate={dayjs(getdefaultDates().date_two).subtract(180, 'days')}
          maxDate={dayjs(getdefaultDates().date_two)}
          error={valueTwoError}
          onError={(newError) => setValueTwoError(newError)}
        />
      </Grid>
    </Grid>
  );
};

export default Dates;
/////////////////////////////////////////////
import { useState, useMemo } from 'react';

type Direction = 'asc' | 'desc';
type FilterOperator = 'contains'; // Add more filter operators as needed

interface SortingAndFilteringState<T> {
  columnKey: keyof T;
  direction: Direction;
  filterValue: string;
  filterColumnKey: keyof T;
  filterOperator: FilterOperator;
}

interface SortingAndFilteringActions<T> {
  onRequestSort: (colKey: keyof T, dir: Direction) => void;
  onRequestFilter: (colKey: keyof T, operator: FilterOperator, filterVal: string) => void;
}

export function useSortingAndFiltering<T>(): [SortingAndFilteringState<T>, SortingAndFilteringActions<T>] {
  const [state, setState] = useState<SortingAndFilteringState<T>>({
    columnKey: '',
    direction: 'asc',
    filterValue: '',
    filterColumnKey: '',
    filterOperator: 'contains',
  });

  const onRequestSort = (colKey: keyof T, dir: Direction) => {
    setState((prev) => ({ ...prev, columnKey: colKey, direction: dir }));
  };

  const onRequestFilter = (colKey: keyof T, operator: FilterOperator, filterVal: string) => {
    setState((prev) => ({
      ...prev,
      filterOperator: operator,
      filterColumnKey: colKey,
      filterValue: filterVal,
    }));
  };

  const visibleRows = useMemo(() => {
    if (data) {
      if (state.filterValue === '' && state.filterColumnKey === '' && state.filterOperator === 'contains') {
        return stableSort(data, state.direction, state.columnKey);
      } else {
        return stableFilter(
          stableSort(data, state.direction, state.columnKey),
          state.filterColumnKey,
          state.filterOperator,
          state.filterValue
        );
      }
    }
  }, [data, state.filterValue, state.direction, state.columnKey, state.filterColumnKey, state.filterOperator]);

  return [{ ...state }, { onRequestSort, onRequestFilter }];
}
const YourComponent = () => {
  const [{ columnKey, direction, filterValue, filterColumnKey, filterOperator }, { onRequestSort, onRequestFilter }] =
    useSortingAndFiltering<YourDataType>();

  // Rest of your component code
};











