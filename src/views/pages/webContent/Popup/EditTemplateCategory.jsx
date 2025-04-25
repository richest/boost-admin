import React, { useEffect, useState } from "react";
import {
  Popover,
  TextField,
  Box,
  Typography,
  Grid,
  FormHelperText,
  Stack,
  Avatar,
  Tooltip,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { VALIDATION_MESSAGE } from "app/constants/regexRules";
import { useDispatch, useSelector } from "react-redux";
import { DEFAULT_CSS, RESPONSE_CODE } from "app/constants";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { LoadingButton } from "@mui/lab";
import Iconify from "components/iconify";
import { REQUEST_ACTION } from "redux/authenticate/actions";
import { putRequest } from "app/httpClient/axiosClient";
import { ApiErrorMessage } from "utils/helpers/function/apiErrorResonse";
import { TEMPLATES_CATEGORY } from "app/config/endpoints";
import toast from "react-hot-toast";

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required(`${VALIDATION_MESSAGE.NAME.REQUIRED}`)
    .max(30, `${VALIDATION_MESSAGE.NAME.MAX_LENGTH}`),
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

const EditTemplateCatagory = ({
  openEditModal,
  setOpenEditModal,
  categoryData,
  categoryListCallBack,
}) => {
  const customization = useSelector((state) => state.customization);
  const buttonRef = React.useRef(null);
  const { loader, message, messageType } = useSelector(
    (state) => state.request
  );
  const dispatch = useDispatch();

  const [isHovering, setIsHovering] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [preSelectedImage, setPreSelectedImage] = useState(null);
  const {
    register,
    setValue,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(validationSchema),
    context: { preSelectedImage },
  });
  const { onChange, ...params } = register("icon");

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    if (!loader) {
      setIsHovering(false);
    }
  };

  const editCategory = async (data) => {
    if (preSelectedImage === null || data.icon?.length === 0) {
      toast.error("Icon is required");
    }
    let formData = new FormData();
    const payloadData = {
      name: data.name,
    };

    Object.keys(payloadData).forEach(function (key) {
      formData.append(key, payloadData[key]);
    });

    if (preSelectedImage) {
      formData.append("icon", preSelectedImage);
    } else {
      formData.append("icon", data.icon[0]);
    }

    try {
      dispatch({ type: REQUEST_ACTION.PROCESSING });

      const {
        status,
        data: { message },
      } = await putRequest(
        `${TEMPLATES_CATEGORY.UPDATE}/${categoryData?.id}`,
        formData
      );
      if (status === RESPONSE_CODE[200]) {
        dispatch({
          type: REQUEST_ACTION.SUCCESS,
          payload: { message: message },
        });
        toast.success(message);
        setOpenEditModal(false);
        categoryListCallBack();
      } else {
        dispatch({
          type: REQUEST_ACTION.FAILURE,
          payload: { message: ApiErrorMessage() },
        });
        toast.error(message);
      }
    } catch (error) {
      dispatch({
        type: REQUEST_ACTION.FAILURE,
        payload: { message: ApiErrorMessage(error) },
      });
    }
  };

  useEffect(() => {
    if (categoryData) {
      setValue("name", categoryData?.name);
      setValue("icon", categoryData?.icon);
      setPreSelectedImage(categoryData?.icon);
    }
  }, [categoryData, setValue]);

  return (
    <>
      <Popover
        open={openEditModal}
        anchorEl={buttonRef.current}
        onClose={() => {
          setOpenEditModal(false);
        }}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      >
        <Box
          sx={{
            padding: 2,
            width: 300,
            background: customization.navType === "dark" ? "#103C65" : "#fff",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h4" gutterBottom pb={4}>
              Edit template gallery category
            </Typography>
            <Iconify
              sx={{ cursor: "pointer" }}
              onClick={() => setOpenEditModal(false)}
              icon="maki:cross"
              width={20}
              height={20}
            />
          </Box>
          <Grid container spacing={2} mb={3}>
            <Grid item md={12}>
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
                      border: `2px dashed ${errors.icon ? "#ff4842" : "#20a2b8"}`,
                      color: `${errors.icon ? "#ff4842" : "#fff"}`,
                      background: "#20a2b896",
                    }}
                    color="danger"
                    src={
                      preSelectedImage
                        ? preSelectedImage
                        : selectedImage && URL.createObjectURL(selectedImage)
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
                  Click to upload icon
                </FormHelperText>
              </Stack>
            </Grid>
            <Grid item md={12}>
              <form onSubmit={handleSubmit(editCategory)} noValidate>
                <TextField
                  {...register("name")}
                  label="Name*"
                  // disabled={loader}
                  error={!!errors.name}
                  helperText={errors.name ? errors.name.message : ""}
                  variant="outlined"
                  fullWidth
                />

                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  mt={2}
                >
                  <LoadingButton
                    loading={loader ? true : false}
                    size="medium"
                    type="submit"
                    loadingPosition="end"
                    variant="contained"
                  >
                    {loader ? "PLEASE WAIT..." : "UPDATE"}
                  </LoadingButton>
                </Stack>
              </form>
            </Grid>
          </Grid>
        </Box>
      </Popover>
    </>
  );
};

export default EditTemplateCatagory;
