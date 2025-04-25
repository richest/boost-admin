import PropTypes from 'prop-types';
// @mui
import { Box, TableRow, TableCell, TableHead, TableSortLabel, FormControl, OutlinedInput, InputAdornment, Button } from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import SearchIcon from '@mui/icons-material/Search';
import { DEFAULT_CSS } from 'app/constants';
import { useSelector } from 'react-redux';
// ----------------------------------------------------------------------

const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)',
};

EnqueryListHead.propTypes = {
  order: PropTypes.oneOf(['asc', 'desc']),
  orderBy: PropTypes.string,
  rowCount: PropTypes.number,
  headLabel: PropTypes.array,
  numSelected: PropTypes.number,
  onRequestSort: PropTypes.func,
  onSelectAllClick: PropTypes.func,
};

export default function EnqueryListHead({
  order,
  orderBy,
  rowCount,
  headLabel,
  numSelected,
  onRequestSort,
  onSelectAllClick,
  handleSerchInputChange,
  searchText,
  handleClearSearchInput,
}) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };


  const customization = useSelector((state) => state.customization);

  return (
    <TableHead>
      <TableRow>
        <TableCell component="td" colSpan={10} sx={{ p: 1 }}>
          <FormControl fullWidth variant="outlined">
            <OutlinedInput
              onChange={handleSerchInputChange}
              value={searchText}
              sx={{ maxHeight: '40px' }}
              className={
                customization?.navType === "dark" ? "dark_tableHead" : ""
              }
              placeholder="Search name or email..."
              id="outlined-adornment-weight"
              startAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
              endAdornment={searchText.length > 0 ?
                <InputAdornment position="end">
                  <Button onClick={handleClearSearchInput} sx={{ color: DEFAULT_CSS.ERROR_MSG_COLOR }} startIcon={<DeleteRoundedIcon />}>clear</Button>
                </InputAdornment>
                : false
              }
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                'aria-label': 'weight',
              }} />
          </FormControl>
        </TableCell>
      </TableRow>
      <TableRow key='user-table-heading-row'>
        {/* <TableCell key="user-table-heading-rowfsf" padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell> */}
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ py: 1.5, textTransform: headCell.textTransform }}
          >
            <TableSortLabel
              hideSortIcon
              // active={orderBy === headCell.id}
              // direction={orderBy === headCell.id ? order : 'asc'}
              // onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {/* {orderBy === headCell.id ? (
                <Box sx={{ ...visuallyHidden }}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</Box>
              ) : null} */}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}