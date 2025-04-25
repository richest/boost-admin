import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { REQUEST_ACTION } from "redux/authenticate/actions";
import { useNavigate } from "react-router-dom";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

// default constants
import { DEFAULT_CSS, RESPONSE_CODE, ROUTE_SLUGS } from "app/constants";
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
  MenuItem,
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
import { PRODUCTS } from "app/config/endpoints";
import { VALIDATION_MESSAGE } from "app/constants/regexRules";
import toast from "react-hot-toast";
// end of import react hook forms

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
    .test(
      "fileSize",
      "Icon's size cannot be more than 5 MB",
      (value, context) => {
        const { preSelectedImage } = context.options.context;
        if (preSelectedImage || value.length === 0) return true;
        return value[0]?.size <= 5242880;
      }
    )
    .test(
      "fileType",
      "Only *.jpeg, *.jpg, *.png types are allowed.",
      (value, context) => {
        const { preSelectedImage } = context.options.context;
        if (preSelectedImage || value.length === 0) return true;
        return ["image/jpeg", "image/png", "image/jpg"].includes(
          value[0]?.type
        );
      }
    ),
});

function EditProductForm({ productTypeList, productDetails }) {
  const dispatch = useDispatch();
  const { loader, message, messageType } = useSelector(
    (state) => state.request
  );

  const [isHovering, setIsHovering] = useState(false);
  const customization = useSelector((state) => state.customization);

  const [selectedImage, setSelectedImage] = useState(null);
  const [preSelectedImage, setPreSelectedImage] = useState(null);

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
    context: { preSelectedImage },
  });

  const [blogStatus, setBlogStatus] = useState(false);
  const [productType, setProductType] = useState();
  const [blogImageChanged, setBlogImageChanged] = useState(false);

  const { onChange, ...params } = register("icon");

  const updateProduct = async (data) => {
    if (preSelectedImage === null || data.icon?.length === 0) {
      toast.error("Icon is required");
    } else {
      let formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("product_type_id", productType);
      if (preSelectedImage) {
        formData.append("icon", preSelectedImage);
      } else if (data.icon.length > 0) {
        formData.append("icon", data.icon[0]);
      }

      try {
        dispatch({ type: REQUEST_ACTION.PROCESSING });
        const {
          status,
          data: { message },
        } = await putRequest(
          `${PRODUCTS.UPDATE}/${productDetails.id}`,
          formData
        );
        if (status === RESPONSE_CODE[200]) {
          dispatch({
            type: REQUEST_ACTION.SUCCESS,
            payload: { message: message },
          });
          navigate(ROUTE_SLUGS.PRODUCTS_LIST);
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
    }
  };

  const handleBlogStatus = async (event) => {
    setBlogStatus(event.target.checked);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    if (!loader) {
      setIsHovering(false);
    }
  };

  const handleRoleChange = (event) => {
    setProductType(event.target.value);
  };

  useEffect(() => {
    setPreSelectedImage(productDetails?.icon);
    setBlogStatus(productDetails?.status ? true : false);
  }, [productDetails]);

  useEffect(() => {
    if (productDetails) {
      reset({
        name: productDetails?.name || "",
        description: productDetails?.description || "",
        // product_type_id: productDetails.product_type?.id || "",
        icon: productDetails?.icon || null,
      });
      setProductType(productDetails?.product_type?.id || "");
    }
  }, [reset, productDetails]);

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
                  src={
                    preSelectedImage ||
                    (selectedImage && URL.createObjectURL(selectedImage))
                  }
                />

                {preSelectedImage ||
                (selectedImage !== null && selectedImage !== undefined) ? (
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
                        setPreSelectedImage(null);
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
                {!preSelectedImage && !selectedImage && (
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
            <form onSubmit={handleSubmit(updateProduct)} noValidate>
              <Grid container spacing={2} mb={3}>
                <Grid item md={6}>
                  <TextField
                    {...register("name")}
                    label="Name*"
                    disabled={loader}
                    error={!!errors.name}
                    helperText={errors.name ? errors.name.message : ""}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item md={6}>
                  <FormControl fullWidth error={!!errors.product_type_id}>
                    <InputLabel id="demo-simple-select-label">
                      Product Type
                    </InputLabel>
                    <Select
                      {...register("product_type_id")}
                      label="Product Type*"
                      value={String(productType)}
                      onChange={(event) => {
                        setProductType(event.target.value);
                      }}
                    >
                      {productTypeList?.length > 0 &&
                        productTypeList?.map((type, index) => (
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
                    {...register("description")} // Ensure this is correctly registered
                    fullWidth
                    multiline
                    error={!!errors.description}
                    helperText={
                      errors.description ? errors.description.message : ""
                    }
                    label="Description*"
                    rows={4}
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
}

export default EditProductForm;
