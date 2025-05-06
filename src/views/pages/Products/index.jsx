import { useEffect, useState } from "react";
import { Button, Grid, Pagination, Stack } from "@mui/material";
import {
  DEFAULT_APP_TITLE,
  DEFAULT_VALUE,
  RESPONSE_CODE,
  ROUTE_SLUGS,
} from "app/constants";
import PageBreadcrumbs from "components/admin-ui/breadcrumbs";
import PageContainer from "components/admin-ui/container";
import AppHelmet from "components/admin-ui/helmet";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import { FILTER_OPTIONS, REQUEST_ACTION } from "redux/authenticate/actions";
import { ApiErrorMessage } from "utils/helpers/function/apiErrorResonse";
import { RESPONSE_MESSAGES } from "app/constants/localizedStrings";
import { deleteRequest, getRequest } from "app/httpClient/axiosClient";
import { USERS_PRM } from "app/constants/paginations";
import { PRODUCTS } from "app/config/endpoints";
import useSearchDebounce from "utils/hooks/textDebounce";
import ProductCard from "./sections/ProductCard";
import ActionDialog from "./dialogs";
import toast from "react-hot-toast";

const Products = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(null);
  const [openUndo, setOpenUndo] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const [srNo, setSrNo] = useState(1);
  const [totalUsersCount, setProductCount] = useState(0);
  const [productList, setProductList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [hoveredUserId, setHoveredUserId] = useState(null);
  const [hoveredUserObj, setHoveredUserObj] = useState({});
  const [searchText, setSearchText] = useState("");
  const [searchTextDebounce, setSearchTextDebounce] = useSearchDebounce();
  const [actionDialog, setActionDialog] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setHoveredUserId(id);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleOpenMenu = (id) => {
    const userObj = productList.find((user) => user.id === id);
    // setOpen(event.currentTarget);
    setHoveredUserId(id);
    setHoveredUserObj(userObj);
  };

  const handleActionDialog = (status) => {
    setActionDialog(status);
  };

  const handleCloseMenu = () => {
    setOpen(null);
    setOpenUndo(null);
    setHoveredUserId(null);
  };

  const handleChangePage = (event, newPage) => {
    console.log("newPage", newPage);
    setPageNo(newPage);
  };

  const handleSerchInputChange = (event) => {
    const value = event.target.value === undefined ? "" : event.target.value;
    setSearchText(value);
    setSearchTextDebounce(value);
  };

  const deleteProduct = async () => {
    try {
      dispatch({ type: REQUEST_ACTION.PROCESSING });
      const {
        status,
        data: { message },
      } = await deleteRequest(`${PRODUCTS.DELETE}/${hoveredUserId}`);

      if (status === RESPONSE_CODE[200]) {
        dispatch({
          type: REQUEST_ACTION.SUCCESS,
          payload: { message: message },
        });
        toast.success("Product deleted successful.");
        getProducts(
          `${PRODUCTS.LIST}?${USERS_PRM.PAGE_NO.KEY}=${pageNo}&${USERS_PRM.ROWS_PER_PAGE.KEY}=${10}`
        );
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
    getProducts(
      `${PRODUCTS.LIST}?${USERS_PRM.PAGE_NO.KEY}=${pageNo}&${USERS_PRM.ROWS_PER_PAGE.KEY}=${rowsPerPage}&${USERS_PRM.SEARCH_TEXT.KEY}=${searchText}`
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
        data: { productsDetails, totalCounts },
        success,
      } = response.data;
      if (success && status === RESPONSE_CODE[200]) {
        setProductList(productsDetails.rows);
        setLoading(false);
        setConnectionError(false);
        setProductCount(totalCounts);
        dispatch({
          type: REQUEST_ACTION.INIT_LOADER,
          payload: { loader: false },
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
  }, [pageNo, rowsPerPage, searchTextDebounce]);

  return (
    <>
      <AppHelmet title={DEFAULT_APP_TITLE.PRODUCTS} />
      <PageContainer className="page-container users-page" heading="Products">
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

                "Products",
              ]}
            />
          </Grid>
          <Grid item mr={1}>
            <Link className="" to={ROUTE_SLUGS.PRODUCTS_CREATE}>
              <Button
                sx={{ borderRadius: "2pt" }}
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
              >
                NEW PRODUCT
              </Button>
            </Link>
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ pt: 2 }}>
          {productList.map((product) => (
            <Grid key={product.id} item xs={12} sm={4} md={3} lg={2.4}>
              <ProductCard
                path={ROUTE_SLUGS.HEADER_FOOTER}
                color="primary"
                title={product.name}
                icon={product.icon}
                id={product?.id}
                hoveredUserId={hoveredUserId}
                handleOpenMenu={handleOpenMenu}
                handlePopoverOpen={handlePopoverOpen}
                handlePopoverClose={handlePopoverClose}
                handleDelete={deleteDialog}
                anchorEl={anchorEl}
              />
            </Grid>
          ))}
        </Grid>

        {productList?.length > 0 && (
          <Stack spacing={3} sx={{ mt: 2 }}>
            <Pagination
              style={{ display: "flex", justifyContent: "center" }}
              count={Math.ceil(totalUsersCount / rowsPerPage)}
              page={pageNo}
              onChange={handleChangePage}
              color="primary"
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        )}
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

export default Products;
