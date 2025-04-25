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
import { DEFAULT_CSS, DEFAULT_VALUE, RESPONSE_CODE } from "app/constants";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { LoadingButton } from "@mui/lab";
import Iconify from "components/iconify";
import { REQUEST_ACTION } from "redux/authenticate/actions";
import { getRequest, postRequest } from "app/httpClient/axiosClient";
import { ApiErrorMessage } from "utils/helpers/function/apiErrorResonse";
import { TEMPLATES_CATEGORY } from "app/config/endpoints";
import toast from "react-hot-toast";
import { RESPONSE_MESSAGES } from "app/constants/localizedStrings";

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required(`${VALIDATION_MESSAGE.NAME.REQUIRED}`)
    .max(30, `${VALIDATION_MESSAGE.NAME.MAX_LENGTH}`),
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

const AddTemplateCatagory = ({
  openAddModal,
  setOpenAddModal,
  categoryListCallBack,
}) => {
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
  const { onChange, ...params } = register("icon");
  const customization = useSelector((state) => state.customization);
  const buttonRef = React.useRef(null);
  const { loader, message, messageType } = useSelector(
    (state) => state.request
  );
  const dispatch = useDispatch();

  const [isHovering, setIsHovering] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    if (!loader) {
      setIsHovering(false);
    }
  };

  const createCategory = async (data) => {
    if (data.icon?.length === 0) {
      toast.error("Icon is required");
    } else {
      let formData = new FormData();
      const payloadData = {
        name: data.name,
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
        } = await postRequest(TEMPLATES_CATEGORY.CREATE, formData);

        if (status === RESPONSE_CODE[200]) {
          dispatch({
            type: REQUEST_ACTION.SUCCESS,
            payload: { message: message },
          });
          toast.success(message);
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
      setOpenAddModal(false);
      categoryListCallBack();
    }
  };

  return (
    <>
      <Popover
        open={openAddModal}
        anchorEl={buttonRef.current}
        onClose={() => {
          setOpenAddModal(false);
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
              Create new template gallery category
            </Typography>
            <Iconify
              sx={{ cursor: "pointer" }}
              onClick={() => setOpenAddModal(false)}
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
                  Click to upload icon
                </FormHelperText>
              </Stack>
            </Grid>
            <Grid item md={12}>
              <form onSubmit={handleSubmit(createCategory)} noValidate>
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
                    {loader ? "PLEASE WAIT..." : "CREATE"}
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

export default AddTemplateCatagory;
