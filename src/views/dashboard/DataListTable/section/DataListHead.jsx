import { useState } from "react";
import PropTypes from "prop-types";
// @mui
import {
  Box,
  TableRow,
  TableCell,
  TableHead,
  TableSortLabel,
} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { PAYMENT_BEHAVIOUR_TYPE } from "app/constants";

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

DataListHead.propTypes = {
  order: PropTypes.oneOf(["asc", "desc"]),
  orderBy: PropTypes.string,
  rowCount: PropTypes.number,
  headLabel: PropTypes.array,
  numSelected: PropTypes.number,
  onRequestSort: PropTypes.func,
  onSelectAllClick: PropTypes.func,
};

export default function DataListHead({
  order,
  orderBy,
  rowCount,
  headLabel,
  numSelected,
  onRequestSort,
  onSelectAllClick,
  onUserTypeSelection,
  handleSerchInputChange,
  searchText,
  handleClearSearchInput,
  paymentTypeSelection,
}) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  const [value, setValue] = useState(
    !paymentTypeSelection ? 0 : paymentTypeSelection + 1
  );
  // const { role_list } = useSelector(state => state.auth)[STORAGE_INDEXES.APP_SETTINGS]
  const paymentStatus = PAYMENT_BEHAVIOUR_TYPE.FILTER;
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
      {/* <TableRow className="user-roles-row">
        <TableCell colSpan={8} sx={{ p: 1 }}>
          <Tabs
            className="user-roloe-tabs"
            value={value}
            onChange={handleChange}
            aria-label="Users roles"
          >
            <Tab
              onClick={(event) => onUserTypeSelection(event, "")}
              label="All"
              {...a11yProps(0)}
            />
            {paymentStatus.map((roles) => {
              const { name, value } = roles;
              return (
                <Tab
                  label={name}
                  onClick={(event) => onUserTypeSelection(event, value)}
                  key={`tab-${value}`}
                  {...a11yProps(0)}
                />
              );
            })}
          </Tabs>
        </TableCell>
      </TableRow> */}
      <TableRow key="user-table-heading-row">
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
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box sx={{ ...visuallyHidden }}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
