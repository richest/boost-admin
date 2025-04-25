import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { VALIDATION_MESSAGE, VALIDATION_RULES } from "app/constants/regexRules";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { REQUEST_ACTION } from "redux/authenticate/actions";
import { ApiErrorMessage } from "utils/helpers/function/apiErrorResonse";
import {
  DEFAULT_CSS,
  DEFAULT_VALUE,
  RESPONSE_CODE,
  ROUTE_SLUGS,
  USER_ROLES,
} from "app/constants";
import { PRODUCTS, USERS } from "app/config/endpoints";
import { getRequest, postRequest } from "app/httpClient/axiosClient";
import { LoadingButton } from "@mui/lab";
import { Box, Stack } from "@mui/system";
import SendIcon from "@mui/icons-material/Send";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import Iconify from "components/iconify";
import {
  Avatar,
  Card,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { RESPONSE_MESSAGES } from "app/constants/localizedStrings";
import toast from "react-hot-toast";

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required(`${VALIDATION_MESSAGE.NAME.REQUIRED}`)
    .max(30, `${VALIDATION_MESSAGE.NAME.MAX_LENGTH}`),
  description: yup.string(),
  product_type_id: yup
    .string()
    .required(VALIDATION_MESSAGE.PRODUCT_TYPE.REQUIRED),
  icon: yup
    .mixed()
    .required(`Icon is required`)
    .test("fileSize", "Icon sizie can not be more than 5 MB", (value) => {
      if (value?.length === 0) return true;
      else return value?.length && value[0].size <= 5242880;
    })
    .test(
      "fileType",
      "Only *.jpeg, *.jpg, *.png type of images are allowed.",
      (value) => {
        if (value.length === 0) return true;
        else
          return (
            value.length &&
            ["image/jpeg", "image/png", "image/jpg"].includes(value[0].type)
          );
      }
    ),
});

const ProductForm = () => {
  const dispatch = useDispatch();
  const { loader } = useSelector((state) => state.request);
  const naviage = useNavigate();
  const {
    register,
    setValue,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(validationSchema),
  });
  const customization = useSelector((state) => state.customization);

  const [isHovering, setIsHovering] = useState(false);
  const [productList, setProductList] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [connectionError, setConnectionError] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const { onChange, ...params } = register("icon");
  const [isLoading, setLoading] = useState(false);

  const userRoles = [
    USER_ROLES.GUIDE.toUpperCase(),
    USER_ROLES.TRAVELLER.toUpperCase(),
  ];

  const [product, setProduct] = useState({
    name: "",
    description: "",
    product_type_id: "",
    status: "",
  });

  const handleRoleChange = (event) => {
    setProduct({ ...product, product_type_id: event.target.value });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    if (!loader) {
      setIsHovering(false);
    }
  };

  // handling input changes
  const handleInputChange = (event) => {
    setProduct({
      ...product,
      [event.target.name]: event.target.value,
    });
  };

  const createNewProduct = async (data) => {
    if (data.icon.length === 0) {
      toast.error("Icon is required");
    } else {
      let formData = new FormData();
      const payloadData = {
        product_type_id: data.product_type_id,
        name: data.name,
        description: data.description,
      };

      Object.keys(payloadData).forEach(function (key) {
        formData.append(key, payloadData[key]);
      });

      if (data.icon[0]) {
        formData.append("icon", data.icon[0]);
      }

      try {
        dispatch({ type: REQUEST_ACTION.PROCESSING });

        const {
          status,
          data: { message },
        } = await postRequest(PRODUCTS.CREATE, formData);

        if (status === RESPONSE_CODE[200]) {
          dispatch({
            type: REQUEST_ACTION.SUCCESS,
            payload: { message: message },
          });
          naviage(ROUTE_SLUGS.PRODUCTS_LIST);
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
  };

  const productListCallBack = () => {
    getProducts(`${PRODUCTS.LIST_TYPE}`);
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
    productListCallBack();
  }, [pageNo, rowsPerPage]);

  useEffect(() => {
    dispatch({ type: REQUEST_ACTION.INIT });
  }, []);

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        spacing={2}
        my={2}
      >
        <Grid item md={4}>
          <Card
            className="profile-left-section"
            sx={{
              px: 2,
              py: 3,
              overflow: "hidden",
              boxShadow: 1,
              background: customization.navType === "dark" ? "#103C65" : "#fff",
            }}
          >
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              position="relative"
              sx={{ marginTop: "20px" }}
            >
              <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Avatar
                  alt=""
                  sx={{
                    width: 120,
                    height: 120,
                    border: `2px dashed ${errors.icon ? "#ff4842" : "#3273ba"}`,
                    color: `${errors.icon ? "#ff4842" : "#fff"}`,
                  }}
                  color="danger"
                  src={selectedImage && URL.createObjectURL(selectedImage)}
                />

                {selectedImage !== null && selectedImage !== undefined ? (
                  <Tooltip placement="top" title="Click to remove icon">
                    <CancelTwoToneIcon
                      sx={{
                        color: DEFAULT_CSS.ERROR_MSG_COLOR,
                        background: "#fff",
                        borderRadius: "50%",
                        position: "absolute",
                        top: 0,
                        left: "55%",
                        cursor: "pointer",
                        fontSize: "18px",
                      }}
                      onClick={() => {
                        setSelectedImage(null);
                        setIsHovering(false);
                        onChange({
                          target: { name: "icon", value: [] },
                        });
                        trigger("icon");
                      }}
                    />
                  </Tooltip>
                ) : (
                  ""
                )}
                {!selectedImage && (
                  <div style={{ textAlign: "center" }}>
                    <label
                      className="uploadFileInput"
                      htmlFor="uploadFileInput"
                    >
                      <AddAPhotoIcon color="#fff" />
                    </label>
                  </div>
                )}

                <input
                  {...params}
                  type="file"
                  id="uploadFileInput"
                  accept="image/*"
                  name="icon"
                  onChange={(event) => {
                    setSelectedImage(event.target.files[0]);
                    onChange(event);
                    trigger("icon");
                  }}
                  style={{ display: "none" }}
                />
              </div>
              {errors.icon && (
                <FormHelperText
                  sx={{ my: 2, px: 5, textAlign: "center" }}
                  error={true}
                >
                  {errors.icon.message}
                </FormHelperText>
              )}
            </Grid>

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              justifyItems="center"
              width="100%"
              mb={2}
              style={{ textAlign: "center" }}
            >
              <FormHelperText
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  color: customization.navType === "dark" ? "#fff" : "#000",
                }}
              >
                Click to upload product icon
              </FormHelperText>
            </Stack>
          </Card>
        </Grid>
        <Grid item md={8}>
          <Card
            className="profile-right-section"
            sx={{
              p: 3,
              boxShadow: 1,
              background: customization.navType === "dark" ? "#103C65" : "#fff",
            }}
          >
            <form onSubmit={handleSubmit(createNewProduct)} noValidate>
              <Grid container spacing={2} mb={3}>
                <Grid item md={6}>
                  <TextField
                    {...register("name")}
                    label="Name*"
                    disabled={loader}
                    error={!!errors.name}
                    helperText={errors.name ? errors.name.message : ""}
                    name="name"
                    value={product.name}
                    variant="outlined"
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Grid>
                <Grid item md={6}>
                  <FormControl fullWidth error={!!errors.role}>
                    <InputLabel id="demo-simple-select-label">
                      Product Type
                    </InputLabel>
                    <Select
                      {...register("product_type_id")}
                      id="product_type_id"
                      value={product.product_type_id}
                      label="Product Type*"
                      onChange={handleRoleChange}
                    >
                      {productList.length > 0 &&
                        productList.map((type, index) => (
                          <MenuItem key={index} value={type.id}>
                            {type.name}
                          </MenuItem>
                        ))}
                    </Select>
                    {errors.product_type_id && (
                      <FormHelperText sx={{ ml: "15px" }} error={true}>
                        {errors.product_type_id.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={2} mb={3}>
                <Grid item md={12}>
                  <TextField
                    fullWidth
                    multiline
                    {...register("description")}
                    error={!!errors.description}
                    helperText={
                      errors.description ? errors.description.message : ""
                    }
                    label="Description*"
                    name="description"
                    value={product.description}
                    rows={4}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>

              <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                my={2}
              >
                <LoadingButton
                  loading={loader ? true : false}
                  size="medium"
                  type="submit"
                  loadingPosition="end"
                  endIcon={<SendIcon />}
                  variant="contained"
                >
                  {loader ? "PLEASE WAIT..." : "SUBMIT"}
                </LoadingButton>
              </Stack>
            </form>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default ProductForm;
