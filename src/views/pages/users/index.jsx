import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Grid,
  MenuItem,
  Popover,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
} from "@mui/material";
import {
  DEFAULT_APP_TITLE,
  DEFAULT_VALUE,
  RESPONSE_CODE,
  ROUTE_SLUGS,
  USER_STATUS,
} from "app/constants";
import PageBreadcrumbs from "components/admin-ui/breadcrumbs";
import PageContainer from "components/admin-ui/container";
import AppHelmet from "components/admin-ui/helmet";
import { Link, useNavigate } from "react-router-dom";
import { gridSpacing } from "redux/customization/constant";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TextErrorMessage from "components/admin-ui/textErrorMessage";
import Scrollbar from "components/scrollbar/Scrollbar";
import UserListHead from "./sections/UserListHead";
import { USER_TABLE_HEAD } from "app/constants/tableHeadings";
import { useDispatch, useSelector } from "react-redux";
import { FILTER_OPTIONS, REQUEST_ACTION } from "redux/authenticate/actions";
import { ApiErrorMessage } from "utils/helpers/function/apiErrorResonse";
import { RESPONSE_MESSAGES } from "app/constants/localizedStrings";
import {
  deleteRequest,
  getRequest,
  patchRequest,
  putRequest,
} from "app/httpClient/axiosClient";
import { USERS_PRM } from "app/constants/paginations";
import { USERS } from "app/config/endpoints";
import useSearchDebounce from "utils/hooks/textDebounce";
import UserListRow from "./sections/UserListRow";
import Iconify from "components/iconify";
import ActionDiaog from "./dialogs";
import ActionUndo from "./dialogs/undoUser";
import { color } from "@mui/system";

const Users = () => {
  const { user: userFilterOption } = useSelector(
    (state) => state.filterOptions
  );
  const customization = useSelector((state) => state.customization);

  const dispatch = useDispatch();
  const [open, setOpen] = useState(null);
  const [openUndo, setOpenUndo] = useState(null);
  // ACS, DESC
  const [order, setOrder] = useState("ACS");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [rowsPerPage, setRowsPerPage] = useState(
    userFilterOption.number_of_rows
  );
  // const [order, setOrder] = useState('asc');
  // const [orderBy, setOrderBy] = useState('userName');

  // const handleRequestSort = (event, property) => {
  //   const isAsc = orderBy === property && order === 'asc';
  //   setOrder(isAsc ? 'desc' : 'asc');
  //   setOrderBy(property);
  // };
  const [pageNo, setPageNo] = useState(userFilterOption.page_no);
  const [srNo, setSrNo] = useState(userFilterOption.srNo);
  const [totalUsersCount, setTotalUsersCount] = useState(0);
  const [userList, setUserList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userTypeSelection, setUserTypeSelection] = useState(
    userFilterOption.role_id
  );
  const [hoveredUserId, setHoveredUserId] = useState(null);
  const [hoveredUserObj, setHoveredUserObj] = useState({});
  const [searchText, setSearchText] = useState("");
  const [searchTextDebounce, setSearchTextDebounce] = useSearchDebounce();
  const [actionDialog, setActionDialog] = useState(false);
  const [actionUndo, setActionUndo] = useState(false);

  const navigate = useNavigate();
  let USERLIST = [];

  // for further usage
  // const [page, setPage] = useState(0);
  // const [filterName, setFilterName] = useState('');
  //   const theme = useTheme();

  const handleOpenMenu = (event, id) => {
    const userObj = userList.find((user) => user.id === id);
    setOpen(event.currentTarget);
    setHoveredUserId(id);
    setHoveredUserObj(userObj);
  };
  const handleActionDialog = (status) => {
    setActionDialog(status);
  };
  const handleActionUndo = (status) => {
    setActionUndo(status);
  };

  const handleCloseMenu = () => {
    setOpen(null);
    setOpenUndo(null);
    setHoveredUserId(null);
  };

  const handleANavigation = (slug) => {
    navigate(slug);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "ASC";
    setOrder(isAsc ? "DESC" : "ASC"); // Toggle order
    setOrderBy(property);
  };
  
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPageNo(newPage);
    setSrNo(rowsPerPage * newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageNo(0);
    setRowsPerPage(parseInt(event.target.value, 10));
    setSrNo(1);
  };

  const handleUserTypeSelection = (event, roleId = null) => {
    setPageNo(0);
    setUserTypeSelection(roleId !== null ? roleId : null);
    setSrNo(1);
  };

  const handleSerchInputChange = (event) => {
    const value = event.target.value === undefined ? "" : event.target.value;
    setSearchText(value);
    setSearchTextDebounce(value);
  };

  const deleteUser = async () => {
    try {
      dispatch({ type: REQUEST_ACTION.PROCESSING });
      // const payloadData = {
      //   user_id: hoveredUserId,
      // };
      const {
        status,
        data: { message },
      } = await deleteRequest(`${USERS.DELETE_USER}/${hoveredUserId}`);

      if (status === RESPONSE_CODE[200]) {
        dispatch({
          type: REQUEST_ACTION.SUCCESS,
          payload: { message: message },
        });
        userListCallBack();
      } else {
        dispatch({
          type: REQUEST_ACTION.FAILURE,
          payload: { message: ApiErrorMessage() },
        });
      }

      handleCloseMenu();
      handleActionDialog(false);
    } catch (error) {
      dispatch({
        type: REQUEST_ACTION.FAILURE,
        payload: { message: ApiErrorMessage(error) },
      });
      handleCloseMenu();
      handleActionDialog(false);
    }
  };
  const undoUser = async () => {
    try {
      dispatch({ type: REQUEST_ACTION.PROCESSING });
      const {
        status,
        data: { message },
      } = await patchRequest(
        `${USERS.UNDO_DELETE_USER}?id=${hoveredUserId}`,
        {}
      );

      if (status === RESPONSE_CODE[200]) {
        dispatch({
          type: REQUEST_ACTION.SUCCESS,
          payload: { message: message },
        });
        userListCallBack();
      } else {
        dispatch({
          type: REQUEST_ACTION.FAILURE,
          payload: { message: ApiErrorMessage() },
        });
      }

      handleCloseMenu();
      handleActionUndo(false);
    } catch (error) {
      dispatch({
        type: REQUEST_ACTION.FAILURE,
        payload: { message: ApiErrorMessage(error) },
      });
      handleCloseMenu();
      handleActionUndo(false);
    }
  };

  const userListCallBack = () => {
    const _pageNo = pageNo + 1;
    const roleId = !userTypeSelection ? "" : userTypeSelection;
    getUsers(
      `${USERS.LIST}?${USERS_PRM.PAGE_NO.KEY}=${_pageNo}&${USERS_PRM.ROWS_PER_PAGE.KEY}=${rowsPerPage}&${USERS_PRM.SEARCH_TEXT.KEY}=${searchText}&${`sort`}=${orderBy}:${order}`,
      pageNo,
      roleId
    );
  };
  console.log(order, orderBy, "sdaojsaojsa")
  async function getUsers(url, pageNo, roleId) {
    setLoading(true);
    dispatch({ type: REQUEST_ACTION.INIT_LOADER, payload: { loader: true } });
    let _errorMessage;
    const LOCALE = DEFAULT_VALUE.LOCALE;
    try {
      const response = await getRequest(url);
      const { status } = response;
      const {
        data: { userList, TotalCounts },
        success,
      } = response.data;
      if (success && status === RESPONSE_CODE[200]) {
        setUserList(userList);
        setLoading(false);
        setConnectionError(false);
        setTotalUsersCount(TotalCounts);
        dispatch({
          type: REQUEST_ACTION.INIT_LOADER,
          payload: { loader: false },
        });

        dispatch({
          type: FILTER_OPTIONS.USERS,
          payload: {
            key: "user",
            value: {
              role_id: roleId,
              page_no: pageNo,
              number_of_rows: rowsPerPage,
              search_text: searchText,
              srNo: srNo,
            },
          },
        });
      } else {
        setErrorMessage(RESPONSE_MESSAGES[LOCALE].FETCHING_USERS_LIST);
        dispatch({
          type: REQUEST_ACTION.FAILURE,
          payload: { message: ApiErrorMessage() },
        });
      }
    } catch (error) {
      _errorMessage = ApiErrorMessage(error);
      setConnectionError(true);
      setErrorMessage(_errorMessage);
      setLoading(false);
      dispatch({
        type: REQUEST_ACTION.FAILURE,
        payload: { message: _errorMessage },
      });
    }
  }

  useEffect(() => {
    userListCallBack();
  }, [pageNo, rowsPerPage, userTypeSelection, searchTextDebounce, orderBy, order]);

  return (
    <>
      <AppHelmet title={DEFAULT_APP_TITLE.USERS} />

      <PageContainer className="page-container users-page" heading="Users">
        <Grid
          container
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={2}
        >
          <Grid item>
            <PageBreadcrumbs
              breadcrumbs={[
                <Link
                  style={{
                    color: "rgb(99, 115, 129)",
                    textDecoration: "none",
                  }}
                  to={ROUTE_SLUGS.DASHBOARD}
                >
                  dashboard
                </Link>,

                "Users",
              ]}
            />
          </Grid>
          <Grid item mr={1}>
            <Link className="" to={ROUTE_SLUGS.USER_CREATE}>
              <Button
                sx={{ borderRadius: "2pt" }}
                variant="contained"
                color="primary"
                endIcon={<PersonAddIcon />}
              >
                NEW USER
              </Button>
            </Link>
          </Grid>
        </Grid>

        <TextErrorMessage message={errorMessage} />

        <Card
          sx={{ mt: 4, boxShadow: 3 }}
          className={customization?.navType === "dark" ? "dark_card" : ""}
        >
          <Scrollbar>
            <TableContainer>
              <Table className="list-table">
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={USER_TABLE_HEAD}
                  rowCount={0}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                  onUserTypeSelection={handleUserTypeSelection}
                  handleSerchInputChange={handleSerchInputChange}
                  searchText={searchText}
                  userTypeSelection={userTypeSelection}
                  handleClearSearchInput={handleSerchInputChange}
                />
                <TableBody>
                  <UserListRow
                    loading={isLoading}
                    connectionError={connectionError}
                    errorMessage={errorMessage}
                    userList={userList}
                    selected={selected}
                    handleOpenMenu={handleOpenMenu}
                    srNo={srNo}
                  />
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={USERS_PRM.ROWS_PER_PAGE_OPTIONS}
              component="div"
              className={
                customization?.navType === "dark" ? "dark_pagination" : ""
              }
              count={totalUsersCount}
              rowsPerPage={rowsPerPage}
              page={pageNo}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Scrollbar>
        </Card>
      </PageContainer>
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            "& .MuiMenuItem-root": {
              // px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem
          onClick={() =>
            hoveredUserId ? handleANavigation(`${hoveredUserId}`) : false
          }
        >
          <Iconify
            icon={"material-symbols:supervised-user-circle"}
            sx={{ mr: 2, color: "primary" }}
          />
          View
        </MenuItem>
        {Object.keys(hoveredUserObj).length > 0 && (
          <MenuItem
            onClick={() =>
              hoveredUserObj.status === 3
                ? handleActionUndo(true)
                : handleActionDialog(true)
            }
            sx={{ color: "error.main" }}
          >
            {hoveredUserObj.status === 3 ? (
              <>
                <Iconify icon={"iconoir:undo-circle"} sx={{ mr: 2 }} />
                Undo
              </>
            ) : (
              <>
                <Iconify
                  color="red"
                  icon={"eva:trash-2-outline"}
                  sx={{ mr: 2 }}
                />
                Delete
              </>
            )}
          </MenuItem>
        )}
      </Popover>
      {actionDialog && (
        <ActionDiaog
          cancelAction={handleCloseMenu}
          deleteAction={deleteUser}
          id={hoveredUserId}
          setIsOpen={setActionDialog}
          isOpen={actionDialog}
        />
      )}
      {actionUndo && (
        <ActionUndo
          cancelAction={handleCloseMenu}
          undoAction={undoUser}
          id={hoveredUserId}
          setIsOpen={setActionUndo}
          isOpen={actionUndo}
        />
      )}
    </>
  );
};

export default Users;
