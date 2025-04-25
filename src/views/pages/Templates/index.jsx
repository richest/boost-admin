import { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import {
  DEFAULT_APP_TITLE,
  DEFAULT_VALUE,
  RESPONSE_CODE,
  ROUTE_SLUGS,
} from "app/constants";
import PageBreadcrumbs from "components/admin-ui/breadcrumbs";
import PageContainer from "components/admin-ui/container";
import AppHelmet from "components/admin-ui/helmet";
import { Link, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { FILTER_OPTIONS, REQUEST_ACTION } from "redux/authenticate/actions";
import { ApiErrorMessage } from "utils/helpers/function/apiErrorResonse";
import { RESPONSE_MESSAGES } from "app/constants/localizedStrings";
import { deleteRequest, getRequest } from "app/httpClient/axiosClient";
import { COMMON_PAGINATION } from "app/constants/paginations";
import { PRODUCTS, TEMPLATES } from "app/config/endpoints";
import useSearchDebounce from "utils/hooks/textDebounce";
import ActionDialog from "./dialogs";
import toast from "react-hot-toast";
import TemplateCard from "./sections/TemplateCard";
import SpinTheWheel from "components/Games/SpinTheWheel";

const Templates = () => {
  const { user: userFilterOption } = useSelector(
    (state) => state.filterOptions
  );


  const dispatch = useDispatch();
  const [open, setOpen] = useState(null);
  const [openUndo, setOpenUndo] = useState(null);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [rowsPerPage, setRowsPerPage] = useState(
    userFilterOption.number_of_rows
  );
  const [pageNo, setPageNo] = useState(userFilterOption.page_no);
  const [srNo, setSrNo] = useState(userFilterOption.srNo);
  const [totalUsersCount, setProductCount] = useState(0);
  const [templateList, setTemplateList] = useState([]);
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

  const [anchorEl, setAnchorEl] = useState({});

  // const handlePopoverOpen = (event, id) => {
  //   setAnchorEl(event.currentTarget);
  //   setHoveredUserId(id);
  // };

  // const handlePopoverClose = () => {
  //   setAnchorEl(null);
  // };

  const handlePopoverOpen = (event, id) => {
    setAnchorEl((prev) => ({
      ...prev,
      [id]: event.currentTarget,
    }));
    setHoveredUserId(id);
  };
  const handlePopoverClose = (id) => {
    setAnchorEl((prev) => ({
      ...prev,
      [id]: null,
    }));
  };

  console.log("anchoel", anchorEl);

  const handleOpenMenu = (id) => {
    const userObj = templateList.find((user) => user.id === id);
    // setOpen(event.currentTarget);
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

  const deleteProduct = async () => {
    try {
      dispatch({ type: REQUEST_ACTION.PROCESSING });
      const {
        status,
        data: { message },
      } = await deleteRequest(`${TEMPLATES.DELETE}/${hoveredUserId}`);

      if (status === RESPONSE_CODE[200]) {
        dispatch({
          type: REQUEST_ACTION.SUCCESS,
          payload: { message: message },
        });
        toast.success(message);
        productListCallBack();
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
      toast.error(`${error.response.data.message}`);
      handleCloseMenu();
      handleActionDialog(false);
    }
  };

  const productListCallBack = () => {
    const _pageNo = 1;
    // const _pageNo = pageNo + 1;
    const roleId = !userTypeSelection ? "" : userTypeSelection;
    getProducts(
      `${TEMPLATES.LIST}?${COMMON_PAGINATION.PAGE_NO.KEY}=${_pageNo}&${COMMON_PAGINATION.ROWS_PER_PAGE.KEY}=${rowsPerPage}`,
      pageNo,
      roleId
    );
  };

  async function getProducts(url, pageNo, roleId) {
    setLoading(true);
    dispatch({ type: REQUEST_ACTION.INIT_LOADER, payload: { loader: true } });
    let _errorMessage;
    const LOCALE = DEFAULT_VALUE.LOCALE;
    try {
      const response = await getRequest(url);
      const { status } = response;
      const {
        data: { templateDetails, totalCounts },
        success,
      } = response.data;
      if (success && status === RESPONSE_CODE[200]) {
        setTemplateList(templateDetails.rows);
        setLoading(false);
        setConnectionError(false);
        setProductCount(totalCounts);
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
  const deleteDialog = () => {
    setActionDialog(true);
  };
  useEffect(() => {
    productListCallBack();
  }, [pageNo, rowsPerPage, userTypeSelection, searchTextDebounce]);

  return (
    <>
      <AppHelmet title={DEFAULT_APP_TITLE.TEMPLATES} />
      <PageContainer className="page-container users-page" heading="Templates">
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

                "Templates",
              ]}
            />
          </Grid>
          <Grid item mr={1}>
            <Link className="" to={ROUTE_SLUGS.SELECT_PRODUCT}>
              <Button
                sx={{ borderRadius: "2pt" }}
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
              >
                NEW TEMPLATE
              </Button>
            </Link>
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ pt: 2 }}>
          {!templateList.length && (
            <p className="text-center">No Template Found</p>
          )}
          {templateList.map((product) => (
            <Grid key={product.id} item xs={12} sm={6} md={2}>
              <TemplateCard
                data={product}
                path={ROUTE_SLUGS.HEADER_FOOTER}
                color="primary"
                title={product.name}
                icon={product.icon}
                id={product.id}
                uniqueId={product?.unique_id}
                handleOpenMenu={handleOpenMenu}
                handlePopoverOpen={handlePopoverOpen}
                handlePopoverClose={handlePopoverClose}
                handleDelete={deleteDialog}
                anchorEl={anchorEl}
              />
            </Grid>
          ))}
        </Grid>
      </PageContainer>

      {actionDialog && (
        <ActionDialog
          cancelAction={handleCloseMenu}
          deleteAction={deleteProduct}
          id={hoveredUserId}
          setIsOpen={setActionDialog}
          isOpen={actionDialog}
        />
      )}
    </>
  );
};

export default Templates;
