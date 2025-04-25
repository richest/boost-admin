import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { REQUEST_ACTION } from "src/redux/authenticate/actions";
import { useNavigate } from "react-router-dom";

// app components
import AppHelmet from "components/admin-ui/helmet";
import PageContainer from "components/admin-ui/container";
import PageBreadcrumbs from "components/admin-ui/breadcrumbs";
// ----- end of app components

// defalut constants
import {
  DEFAULT_APP_TITLE,
  RESPONSE_CODE,
  ROUTE_SLUGS,
  DEFAULT_VALUE,
} from "app/constants";
import { BLOGS, POSTS, PRODUCTS } from "app/config/endpoints";
import { ApiErrorMessage } from "utils/helpers/function/apiErrorResonse";

// ----- end of default constants

// @mui components
import Grid from "@mui/material/Grid";

import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// ----- end of @mui components

import { getRequest } from "app/httpClient/axiosClient";
// import EditProductForm from "./editForm";
import { REQUEST_ACTION } from "redux/authenticate/actions";
import EditProductForm from "./editForm";
import { RESPONSE_MESSAGES } from "app/constants/localizedStrings";

function EditProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [productDetails, setProductDetails] = useState();

  const [productList, setProductList] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const productListCallBack = () => {
    getProducts(`${PRODUCTS.LIST_TYPE}`);
    getProductDetails(id)
  };


  async function getProducts(url) {
    setLoading(true);
    dispatch({ type: REQUEST_ACTION.INIT_LOADER, payload: { loader: true } });
    let _errorMessage;
    const LOCALE = DEFAULT_VALUE.LOCALE;
    try {
      const response = await getRequest(url);
      const { status } = response;
      const {
        data: { productsDetails },
        success,
      } = response.data;
      if (success && status === RESPONSE_CODE[200]) {
        setProductList(productsDetails.rows);
        setLoading(false);
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
      // setConnectionError(true);
      setErrorMessage(_errorMessage);
      setLoading(false);
      dispatch({
        type: REQUEST_ACTION.FAILURE,
        payload: { message: _errorMessage },
      });
    }
  }

  async function getProductDetails(productid) {
    const LOCALE = DEFAULT_VALUE.LOCALE;
    dispatch({ type: REQUEST_ACTION.PROCESSING });

    try {
      const response = await getRequest(`${PRODUCTS.GET_PRODUCT}/${productid}`);
      const { status } = response;
      const { data, success } = response.data;

      if (success && status === RESPONSE_CODE[200]) {
        dispatch({ type: REQUEST_ACTION.SUCCESS, payload: { message: "" } });
        setProductDetails(data.productDetails);
      } else {
        dispatch({
          type: REQUEST_ACTION.FAILURE,
          payload: { message: ApiErrorMessage() },
        });
      }
    } catch (error) {
      dispatch({
        type: REQUEST_ACTION.FAILURE,
        payload: { message: ApiErrorMessage(error) },
      });
    }
  }

  useEffect(() => {
    productListCallBack();
  }, [pageNo, rowsPerPage]);

  useEffect(() => {
    // reset(productDetails);
    setSelectedImage(productDetails?.icon);
    // setBlogStatus(productDetails?.status ? true : false);
  }, [productDetails]);

  return (
    <>
      <AppHelmet title={DEFAULT_APP_TITLE.EDIT_PRODUCT} />
      <PageContainer
        className="page-container users-page"
        heading="Edit product"
      >
        <Grid
          container
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={2}
        >
          <Grid item>
            <PageBreadcrumbs breadcrumbs={["dashborad", "product", "edit"]} />
          </Grid>
          <Grid item mr={1}>
            <Link className="h-link" to={ROUTE_SLUGS.PRODUCTS_LIST}>
              <Button
                sx={{ borderRadius: "2pt" }}
                variant="contained"
                color="info"
                startIcon={<ArrowBackIcon />}
              >
                Back
              </Button>
            </Link>
          </Grid>
        </Grid>
        <EditProductForm
          productDetails={productDetails}
          productTypeList={productList}
        />
      </PageContainer>
    </>
  );
}

export default EditProduct;
