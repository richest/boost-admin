import { useState } from "react";
import PropTypes from "prop-types";
// @mui
import {
  Box,
  TableRow,
  TableCell,
  TableHead,
  TableSortLabel,
  FormControl,
  OutlinedInput,
  InputAdornment,
  Button,
} from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import SearchIcon from "@mui/icons-material/Search";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useSelector } from "react-redux";
import { DEFAULT_CSS, STORAGE_INDEXES } from "app/constants";
// ----------------------------------------------------------------------

const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: "1px",
  height: "1px",
  overflow: "hidden",
  position: "absolute",
  whiteSpace: "nowrap",
  clip: "rect(0 0 0 0)",
};

TemplateListHead.propTypes = {
  order: PropTypes.oneOf(["asc", "desc"]),
  orderBy: PropTypes.string,
  rowCount: PropTypes.number,
  headLabel: PropTypes.array,
  numSelected: PropTypes.number,
  onRequestSort: PropTypes.func,
  onSelectAllClick: PropTypes.func,
};

export default function TemplateListHead({
  order,
  orderBy,
  rowCount,
  headLabel,
  numSelected,
  onRequestSort,
  onSelectAllClick,
  onUserTypeSelection,
  userTypeSelection,
  handleSerchInputChange,
  searchText,
  handleClearSearchInput,
}) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const [value, setValue] = useState(
    !userTypeSelection ? 0 : userTypeSelection - 1
  );
  const { role_list } = useSelector((state) => state.auth)[
    STORAGE_INDEXES.APP_SETTINGS
  ];

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <TableHead>
      <TableRow className="user-roles-row">
        {/* <TableCell colSpan={7} sx={{ p: 1 }}>
          <Tabs
            className="user-roloe-tabs"
            value={value}
            onChange={handleChange}
            aria-label="Users roles"
          >
            <Tab
              className="user-role-options"
              onClick={(event) => onUserTypeSelection(event)}
              label="All"
              {...a11yProps(0)}
            />
            {role_list.length ? role_list?.map((roles) => {
              const { name, id } = roles;
              return (
                <Tab
                  className="user-role-options"
                  label={name}
                  onClick={(event) => onUserTypeSelection(event, id)}
                  key={`tab-${id}`}
                  {...a11yProps(0)}
                />
              );
            }): "No Data Found"}
          </Tabs>
        </TableCell> */}
      </TableRow>
      <TableRow className="user-roles-row">
        <TableCell component="td" colSpan={7} sx={{ p: 1 }}>
          <FormControl fullWidth variant="outlined">
            <OutlinedInput
              onChange={handleSerchInputChange}
              value={searchText}
              sx={{ maxHeight: "40px" }}
              placeholder="Search name or email..."
              id="outlined-adornment-weight"
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
              endAdornment={
                searchText.length > 0 ? (
                  <InputAdornment position="end">
                    <Button
                      onClick={handleClearSearchInput}
                      sx={{ color: DEFAULT_CSS.ERROR_MSG_COLOR }}
                      startIcon={<DeleteRoundedIcon />}
                    >
                      clear
                    </Button>
                  </InputAdornment>
                ) : (
                  false
                )
              }
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                "aria-label": "weight",
              }}
            />
          </FormControl>
        </TableCell>
      </TableRow>
      <TableRow key="user-table-heading-row">
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
