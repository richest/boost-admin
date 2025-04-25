import React, { useEffect, useRef, useState } from "react";
import PageContainer from "components/admin-ui/container";
import AppHelmet from "components/admin-ui/helmet";
import {
  DEFAULT_APP_TITLE,
  DEFAULT_CSS,
  DEFAULT_VALUE,
  RESPONSE_CODE,
  ROUTE_SLUGS,
  STORAGE_INDEXES,
} from "app/constants";
import PageBreadcrumbs from "components/admin-ui/breadcrumbs";
import { Link } from "react-router-dom";
import {
  Avatar,
  Card,
  CircularProgress,
  FormHelperText,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import actions, { REQUEST_ACTION } from "redux/authenticate/actions";
import { ApiErrorMessage } from "utils/helpers/function/apiErrorResonse";
import { RESPONSE_MESSAGES } from "app/constants/localizedStrings";
import { deleteRequest, putRequest } from "app/httpClient/axiosClient";
import { AUTH, USERS } from "app/config/endpoints";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { VALIDATION_MESSAGE, VALIDATION_RULES } from "app/constants/regexRules";

import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import SendIcon from "@mui/icons-material/Send";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import UpdatePasswordForm from "./sections/UpdatePasswordForm";
import toast from "react-hot-toast";

const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .matches(VALIDATION_RULES.NAME, VALIDATION_MESSAGE.NAME.REGEX_RULES)
    .max(30, VALIDATION_MESSAGE.NAME.MAX_LENGTH),
  lastName: yup
    .string()
    .required("Last name is required")
    .max(30, VALIDATION_MESSAGE.NAME.MAX_LENGTH),

  // phone: yup.string().required(VALIDATION_MESSAGE.REQUIRED.MESSAGE),
});

function Settings() {
  const dispatch = useDispatch();
  const customization = useSelector((state) => state.customization);
  const { loader } = useSelector((state) => state.request);
  const _AUTH_USER = useSelector((state) => state.auth);
  const name = _AUTH_USER[STORAGE_INDEXES.NAME];
  const adminEmail = _AUTH_USER[STORAGE_INDEXES.EMAIL];
  const adminProfilePicture = _AUTH_USER[STORAGE_INDEXES.PROFILE_PICTURE];
  const [updatePassMode, setUpdatePassMode] = useState(false);
  const profileImgRef = useRef();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      firstName: _AUTH_USER[STORAGE_INDEXES.FIRST_NAME],
      lastName: _AUTH_USER[STORAGE_INDEXES.LAST_NAME],
    },
  });
  const [contactDetails, setContatDetails] = useState({
    phone: _AUTH_USER.phone || "",
    isoCode:
      _AUTH_USER.country_code_iso?.toLowerCase() || DEFAULT_VALUE.COUNTRY_ISO,
    dialCode: _AUTH_USER.country_code || DEFAULT_VALUE.COUNTRY_DIAL_CODE,
  });

  const handleUpdatePasswordMode = () => {
    setUpdatePassMode(!updatePassMode);
  };

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    if (!loader) {
      setIsHovering(false);
    }
  };

  const formSubmit = async (data) => {
    const LOCALE = DEFAULT_VALUE.LOCALE;
    const payload = {
      ...data,
      // country_code: `+${contactDetails.dialCode}`,
      // country_code_iso: contactDetails.isoCode,
    };
    dispatch({ type: REQUEST_ACTION.INIT_LOADER, payload: { loader: true } });
    try {
      const response = await putRequest(AUTH.UPDATE_PROFILE, payload);
      const { status } = response;
      const { success, message } = response.data;
      if (status === RESPONSE_CODE[200] && success) {
        let updatedData = {
          ..._AUTH_USER,
          [STORAGE_INDEXES.FIRST_NAME]: data.firstName,
          [STORAGE_INDEXES.LAST_NAME]: data.lastName,
          // [STORAGE_INDEXES.PHONE]: data.phone,
          // [STORAGE_INDEXES.COUNTRY_DIAL_CODE]: contactDetails.dialCode,
          // [STORAGE_INDEXES.COUNTRY_ISO]: contactDetails.isoCode,
        };
        dispatch({
          type: actions.UPDATE_PROFILE,
          payload: updatedData,
          index: actions.UPDATE_PROFILE,
        });
        dispatch({
          type: REQUEST_ACTION.SUCCESS,
          payload: { message: message },
        });
        toast.success(message);
      } else {
        dispatch({
          type: REQUEST_ACTION.FAILURE,
          payload: { message: RESPONSE_MESSAGES[LOCALE].PROFILE_UPLOAD_FAILED },
        });
        toast.error(message);
      }
    } catch (error) {
      dispatch({
        type: REQUEST_ACTION.FAILURE,
        payload: { message: ApiErrorMessage(error) },
      });
      toast.error(error);
    }
  };

  const removeProfilePic = async () => {
    let _errorMessage;
    try {
      dispatch({ type: REQUEST_ACTION.INIT_LOADER, payload: { loader: true } });
      const {
        status,
        data: { message },
      } = await deleteRequest(USERS.REMOVE_USER_PROFILE_IMAGE, {
        user_id: _AUTH_USER.id,
      });
      if (status === RESPONSE_CODE[200]) {
        let updatedData = {
          ..._AUTH_USER,
          [STORAGE_INDEXES.PROFILE_PICTURE]: null,
        };
        dispatch({
          type: actions.UPDATE_PROFILE,
          payload: updatedData,
          index: actions.UPDATE_PROFILE,
        });
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
      _errorMessage = ApiErrorMessage(error);
      dispatch({
        type: REQUEST_ACTION.FAILURE,
        payload: { message: _errorMessage },
      });
    }
  };

  const uploadImage = async (e) => {
    let formData = new FormData();
    const _FILE = e.target.files[0];
    formData.append("profile_image", _FILE);
    formData.append("user_id", _AUTH_USER.id);
    const LOCALE = DEFAULT_VALUE.LOCALE;
    dispatch({ type: REQUEST_ACTION.INIT_LOADER, payload: { loader: true } });
    try {
      const response = await putRequest(
        USERS.UPDATE_USER_PROFILE_IMAGE,
        formData
      );
      const { status } = response;
      const {
        success,
        message,
        data: { image_url },
      } = response.data;

      if (status === RESPONSE_CODE[200] && success) {
        let updatedData = {
          ..._AUTH_USER,
          [STORAGE_INDEXES.PROFILE_PICTURE]: image_url,
        };
        dispatch({
          type: actions.UPDATE_PROFILE,
          payload: updatedData,
          index: actions.UPDATE_PROFILE,
        });
        dispatch({
          type: REQUEST_ACTION.SUCCESS,
          payload: { message: message },
        });
        setIsHovering(false);
        toast.success(message);
      } else {
        dispatch({
          type: REQUEST_ACTION.FAILURE,
          payload: { message: RESPONSE_MESSAGES[LOCALE].PROFILE_UPLOAD_FAILED },
        });
        setIsHovering(false);
        toast.error(message);
      }
    } catch (error) {
      setIsHovering(false);
      dispatch({
        type: REQUEST_ACTION.FAILURE,
        payload: { message: ApiErrorMessage(error) },
      });
    }
  };

  useEffect(() => {
    dispatch({ type: REQUEST_ACTION.INIT });
  }, []);

  return (
    <>
      <AppHelmet title={DEFAULT_APP_TITLE.SETTING} />
      <PageContainer
        className="page-container users-page"
        heading={DEFAULT_APP_TITLE.SETTING}
      >
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

            "Account settings",
          ]}
        />

        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={2}
        >
          <Grid item md={4}>
            <Card
              className={`${customization?.navType === "dark" ? "dark_card" : ""} profile-left-section`}
              sx={{ px: 4, py: 6, overflow: "hidden", boxShadow: 1 }}
            >
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <div
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  style={{ position: "relative" }}
                >
                  <Avatar
                    alt={name}
                    sx={{
                      width: 120,
                      height: 120,
                      border:
                        adminProfilePicture === null
                          ? "2px dashed #3273ba"
                          : "none",
                    }}
                    src={adminProfilePicture}
                  />

                  {adminProfilePicture !== null ? (
                    <Tooltip
                      placement="top"
                      title="Click to remove profile picture"
                    >
                      <CancelTwoToneIcon
                        sx={{
                          color: DEFAULT_CSS.ERROR_MSG_COLOR,
                          position: "absolute",
                          top: 0,
                          right: "20px",
                          cursor: "pointer",
                          fontSize: "18px",
                          background: "#fff",
                          borderRadius: "50%",
                        }}
                        onClick={removeProfilePic}
                      />
                    </Tooltip>
                  ) : (
                    ""
                  )}
                  {!adminProfilePicture && (
                    <div
                      style={{ position: "absolute", top: "33%", right: "33%" }}
                    >
                      <IconButton
                        onClick={() =>
                          loader ? false : profileImgRef.current.click()
                        }
                      >
                        {loader ? <CircularProgress /> : <AddAPhotoIcon />}
                      </IconButton>
                    </div>
                  )}

                  <input
                    ref={profileImgRef}
                    type="file"
                    accept="image/*"
                    onChange={uploadImage}
                    style={{ display: "none" }}
                  />
                </div>
                <Typography
                  sx={{ px: 5, py: 1, textAlign: "center", color: "#637381" }}
                  variant="body2"
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif max size of 3 MB
                </Typography>
              </Grid>
            </Card>
          </Grid>
          <Grid item md={8}>
            <Card
              className={`${customization?.navType === "dark" ? "dark_card" : ""} profile-right-section`}
              sx={{ px: 4, py: 5, overflow: "hidden", boxShadow: 1 }}
            >
              {!updatePassMode ? (
                <form onSubmit={handleSubmit(formSubmit)} noValidate>
                  <Grid container spacing={3} mb={3}>
                    <Grid item md={12}>
                      <TextField
                        label="Email"
                        name="Email"
                        value={adminEmail}
                        disabled
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={6}>
                      <TextField
                        {...register("firstName")}
                        error={!!errors.firstName}
                        label="First Name"
                        helperText={
                          errors.firstName ? errors.firstName.message : ""
                        }
                        name="firstName"
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={6}>
                      {" "}
                      <TextField
                        {...register("lastName")}
                        error={!!errors.lastName}
                        label="Last Name"
                        helperText={
                          errors.lastName ? errors.lastName.message : ""
                        }
                        name="lastName"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ mt: 3 }}
                  >
                    <LoadingButton
                      loading={loader ? true : false}
                      size="medium"
                      type="button"
                      variant="outlined"
                      onClick={handleUpdatePasswordMode}
                    >
                      Update password
                    </LoadingButton>
                    <LoadingButton
                      loading={loader ? true : false}
                      size="medium"
                      type="submit"
                      loadingPosition="end"
                      endIcon={<SendIcon />}
                      variant="contained"
                    >
                      {loader ? "Please Wait..." : "save changes"}
                    </LoadingButton>
                  </Stack>
                </form>
              ) : (
                <Grid item md={12}>
                  <UpdatePasswordForm cancel={handleUpdatePasswordMode} />
                </Grid>
              )}
            </Card>
          </Grid>
        </Grid>
      </PageContainer>
    </>
  );
}

export default Settings;
