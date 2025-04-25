import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { REQUEST_ACTION } from "redux/authenticate/actions";
import { useNavigate } from "react-router-dom";

// default constants
import { DEFAULT_CSS, RESPONSE_CODE, ROUTE_SLUGS } from "app/constants";
import { BLOGS, COMMON_ENDPOINTS } from "app/config/endpoints";
import { ApiErrorMessage } from "utils/helpers/function/apiErrorResonse";
// ----- end of default constants

// @mui components
import {
  Grid,
  Box,
  Card,
  Stack,
  Typography,
  Avatar,
  TextField,
  FormHelperText,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import Tooltip from "@mui/material/Tooltip";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
// ----- end of @mui components

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

//app components
import AntSwitch from "components/admin-ui/switch/antSwitch";
// ----- end of app components

import { putRequest } from "app/httpClient/axiosClient";

// react hook forms
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { seoFriendlyUrl } from "utils/helpers/function";
import { PRODUCTS } from "app/config/endpoints";
// end of import react hook forms

const validationSchema = yup.object().shape({
  name: yup.string().trim().required(`Name is required.`),
  name: yup.string().trim().required(`Name is required.`),
  description: yup.string(),
  icon: yup
    .mixed()
    .test("fileSize", "icon's size can not be more than 5 MB", (value) => {
      if (value.length === 0) return true;
      return value.length && value[0].size <= 5242880;
    })
    .test(
      "fileType",
      "Only *.jpeg, *.jpg, *.png type of images are allowed.",
      (value) => {
        if (value.length === 0) return true;
        return (
          value.length &&
          ["image/jpeg", "image/png", "image/jpg"].includes(value[0].type)
        );
      }
    ),
});

function EditProductForm({ productTypeList }) {
  const dispatch = useDispatch();
  const { loader, message, messageType } = useSelector(
    (state) => state.request
  );
  const [productDetails, setProductDetails] = useState();

  const navigate = useNavigate();
  const {
    register,
    setValue,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: productDetails?.name || "",
      description: productDetails?.description || "",
    },
  });

  const [blogStatus, setBlogStatus] = useState(false);
  const [blogImageChanged, setBlogImageChanged] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    product_type_id: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const { onChange, ...params } = register("icon");
  const handleChangeType = (event) => {
    setProduct({ ...product, product_type_id: event.target.value });
  };
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

  const updateProduct = async (data) => {
    let formData = new FormData();
    formData.append("name", data.title);
    formData.append("description", data.description);
    formData.append("status", blogStatus ? 1 : 0);
    if (data.icon.length > 0) {
      formData.append("icon", data.icon[0]);
    }

    try {
      dispatch({ type: REQUEST_ACTION.PROCESSING });
      const {
        status,
        data: { message },
      } = await putRequest(`${PRODUCTS.UPDATE}/${productDetails.id}`, formData);
      if (status === RESPONSE_CODE[200]) {
        dispatch({
          type: REQUEST_ACTION.SUCCESS,
          payload: { message: message },
        });
        navigate(ROUTE_SLUGS.BLOGS);
      } else {
        dispatch({
          type: REQUEST_ACTION.FAILURE,
          payload: { message: ApiErrorMessage() },
        });
      }
      window.scrollTo(0, 0);
    } catch (error) {
      dispatch({
        type: REQUEST_ACTION.FAILURE,
        payload: { message: ApiErrorMessage(error) },
      });
    }
  };

  const handleBlogStatus = async (event) => {
    setBlogStatus(event.target.checked);
  };

  useEffect(() => {
    getProductDetails(productDetails.id);
  }, [productDetails.id]);
  useEffect(() => {
    setSelectedImage(productDetails?.icon);
    setBlogStatus(productDetails?.status ? true : false);
  }, [productDetails]);

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
        my={2}
      >
        <Grid item md={12}>
          <Card className="profile-right-section" sx={{ p: 3 }}>
            <form onSubmit={handleSubmit(updateProduct)} noValidate>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={2}
                my={2}
              >
                <Grid item md={6}>
                  <TextField
                    {...register("name")}
                    InputLabelProps={{ shrink: true }}
                    label="Name*"
                    disabled={loader}
                    error={!!errors.name}
                    helperText={errors.name ? errors.name.message : ""}
                    name="name"
                    variant="outlined"
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
                      value={productTypeList.product_type_id}
                      label="Product Type*"
                      onChange={handleChangeType}
                    >
                      {productTypeList.length > 0 &&
                        productTypeList.map((type, index) => (
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

                <Grid item md={6}>
                  <TextField
                    {...register("location")}
                    InputLabelProps={{ shrink: true }}
                    label="Location*"
                    disabled={loader}
                    error={!!errors.location}
                    helperText={errors.location ? errors.location.message : ""}
                    name="title"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>

              <Grid position="relative" mb={4}>
                {selectedImage !== null && selectedImage !== undefined ? (
                  <Tooltip
                    placement="top"
                    title="Click to remove profile picture"
                  >
                    <CancelTwoToneIcon
                      sx={{
                        color: DEFAULT_CSS.ERROR_MSG_COLOR,
                        position: "absolute",
                        top: 5,
                        right: 5,
                        zIndex: 9999,
                        cursor: "pointer",
                        fontSize: 18,
                      }}
                    />
                  </Tooltip>
                ) : (
                  ""
                )}
                <label
                  htmlFor={`${
                    selectedImage || loader ? null : "uploadFileInput"
                  }`}
                >
                  <Avatar
                    sx={{
                      width: "auto",
                      height: "10em",
                      border: `${
                        selectedImage
                          ? null
                          : `2.5px dashed ${
                              errors.blogProfileImage ? "#ff4842" : "#3273ba"
                            }`
                      }`,
                      color: `${errors.blogProfileImage ? "#ff4842" : "#fff"}`,
                      cursor: `${selectedImage ? null : "pointer"}`,
                      backgroundColor: `${selectedImage ? null : "#d5e8f0"}`,
                    }}
                    variant="rounded"
                    src={
                      blogImageChanged
                        ? selectedImage && URL.createObjectURL(selectedImage)
                        : selectedImage
                    }
                    className="create-blog-image"
                  >
                    <Stack
                      container
                      alignItems="center"
                      justifyContent="center"
                    >
                      <AddPhotoAlternateIcon
                        sx={{
                          fontSize: "3em",
                          color: `${
                            errors.blogProfileImage
                              ? "#ff4842"
                              : DEFAULT_CSS.PRIMARY_COLOR
                          }`,
                        }}
                      />
                      <Typography
                        color={DEFAULT_CSS.PRIMARY_COLOR}
                        variant="h4"
                      >
                        Upload file
                      </Typography>
                      <FormHelperText error={selectedImage ? true : false}>
                        Allowed *.jpeg, *.jpg, *.png max size of 5 MB.
                      </FormHelperText>
                    </Stack>
                  </Avatar>
                  <input
                    {...params}
                    type="file"
                    id="uploadFileInput"
                    accept="image/*"
                    name="blogProfileImage"
                    onChange={(event) => {
                      setSelectedImage(event.target.files[0]);
                      setBlogImageChanged(true);
                      onChange(event);
                      trigger("blogProfileImage");
                      setValue("imageUpdateCase", "true");
                      trigger("imageUpdateCase");
                    }}
                    style={{ display: "none" }}
                  />
                </label>
                <input {...register("imageUpdateCase")} type="hidden" />
                {errors.imageUpdateCase && (
                  <FormHelperText error={true}>
                    {errors.imageUpdateCase.message}
                  </FormHelperText>
                )}
                {errors.blogProfileImage && (
                  <FormHelperText error={true}>
                    {errors.blogProfileImage.message}
                  </FormHelperText>
                )}
              </Grid>
              <Grid mb={4}>
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  mb={2}
                  spacing={4}
                >
                  <Box>
                    <Typography variant="body1">Published</Typography>
                  </Box>
                  <Box>
                    <AntSwitch
              
Editor

        disabled={loader}
                      onChange={(event) => handleBlogStatus(event)}
                      checked={blogStatus}
                    />
                  </Box>
                </Stack>
              </Grid>
              <Stack
                direction="row"
                justifyContent="flex-start"
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
}

export default EditProductForm;
