import { Grid, Pagination, Stack } from "@mui/material";
import {
  DEFAULT_APP_TITLE,
  DEFAULT_VALUE,
  RESPONSE_CODE,
  ROUTE_SLUGS,
} from "app/constants";
import PageContainer from "components/admin-ui/container";
import AppHelmet from "components/admin-ui/helmet";
import { Link } from "react-router-dom";
import WebBreadCrumbs from "../WebBreadCrumb";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSearchDebounce from "utils/hooks/textDebounce";
import { PRODUCTS } from "app/config/endpoints";
import { USERS_PRM } from "app/constants/paginations";
import { FILTER_OPTIONS, REQUEST_ACTION } from "redux/authenticate/actions";
import { getRequest } from "app/httpClient/axiosClient";
import { RESPONSE_MESSAGES } from "app/constants/localizedStrings";
import { ApiErrorMessage } from "utils/helpers/function/apiErrorResonse";
import WebContentListCard from "components/common/cards/WebContentListCard";

const ProductPage = () => {
  const dispatch = useDispatch();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const [srNo, setSrNo] = useState(1);
  const [totalUsersCount, setProductCount] = useState(0);
  const [productList, setProductList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchTextDebounce, setSearchTextDebounce] = useSearchDebounce();

  const handleChangePage = (event, newPage) => {
    setPageNo(newPage);
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

  const productListCallBack = () => {
    getProducts(
      `${PRODUCTS.LIST}?${USERS_PRM.PAGE_NO.KEY}=${pageNo}&${USERS_PRM.ROWS_PER_PAGE.KEY}=${rowsPerPage}&${USERS_PRM.SEARCH_TEXT.KEY}=${searchText}`
    );
  };

  useEffect(() => {
    productListCallBack();
  }, [pageNo, rowsPerPage, searchTextDebounce]);

  return (
    <>
      <AppHelmet title={DEFAULT_APP_TITLE.WEB_CONTENT} />

      <PageContainer
        className="page-container users-page"
        heading="Web Content"
      >
        <WebBreadCrumbs
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
            <Link
              style={{
                color: "rgb(99, 115, 129)",
                textDecoration: "none",
              }}
              to={ROUTE_SLUGS.WEB_CONTENT}
            >
              Web-content
            </Link>,

            "Products-list",
          ]}
        />
        <Grid container spacing={3} sx={{ pt: 2 }}>
          {productList?.map((product, i) => (
            <Grid key={i} item xs={12} sm={4} md={3} lg={2.4}>
              <WebContentListCard title={product.name} icon={product.icon} />
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
    </>
  );
};

export default ProductPage;
