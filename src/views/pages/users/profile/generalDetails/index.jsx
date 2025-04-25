import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Grid,
  Box,
  Card,
  Stack,
  IconButton,
  Typography,
  Avatar,
  CircularProgress,
  TextField,
  FormHelperText,
  MenuItem,
  Select,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import Tooltip from "@mui/material/Tooltip";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { VALIDATION_MESSAGE } from "app/constants/regexRules";
import {
  DEFAULT_CSS,
  DEFAULT_VALUE,
  RESPONSE_CODE,
  USER_STATUS,
} from "app/constants";
import { REQUEST_ACTION } from "redux/authenticate/actions";
import {
  deleteRequest,
  getRequest,
  putRequest,
} from "app/httpClient/axiosClient";
import { SECTOR, SUB_SECTOR, USERS } from "app/config/endpoints";
import { ApiErrorMessage } from "utils/helpers/function/apiErrorResonse";
import Label from "components/label";
import toast from "react-hot-toast";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Icon } from "@iconify/react";
import AntSwitch from "components/admin-ui/switch/antSwitch";

const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required(`First ${VALIDATION_MESSAGE.NAME.REQUIRED}`)
    .max(30, `First ${VALIDATION_MESSAGE.NAME.MAX_LENGTH}`),
  lastName: yup
    .string()
    .required(`Last ${VALIDATION_MESSAGE.NAME.REQUIRED}`)
    .max(30, `Last ${VALIDATION_MESSAGE.NAME.MAX_LENGTH}`),
  age: yup.string().required("Age is required"),
  sector: yup.string().required("Sector is required"),
  profession: yup.string().required("Profession is required"),
  interest: yup.string().required("Interest is required"),
});

function GeneralDetails(props) {
  const dispatch = useDispatch();
  const { loader, message, messageType } = useSelector(
    (state) => state.request
  );

  const [isHovering, setIsHovering] = useState(false);
  const [sectorList, setSectorList] = useState([]);
  const [subSectorList, setSubSectorList] = useState([]);
  const profileImgRef = useRef();

  const {
    user: _user,
    user: { user_profile_detail },
    user: { users_detail },
    getUserDetails,
  } = props;

  const [isUserSuspended, setUserSuspended] = useState(
    _user.status === 1 ? true : false
  );

  const [profileImage, setProfileImage] = useState(
    user_profile_detail?.profile_picture || null
  );

  const [user, setUser] = useState({
    id: _user.id,
    firstName: user_profile_detail?.firstName || "",
    lastName: user_profile_detail?.lastName || "",
    email: _user?.email,
    age: users_detail?.user_student_average_age || "",
    interest: users_detail?.user_interest || "",
    sector: users_detail?.user_sector || "",
    profession: users_detail?.user_profession || "",
  });

  console.log("users--->>>", _user)

  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(validationSchema),
  });

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    if (!loader) {
      setIsHovering(false);
    }
  };

  const uploadImage = async (e) => {
    let formData = new FormData();
    const _FILE = e.target.files[0];
    formData.append("profile_image", _FILE);
    formData.append("user_id", _user.id);
    dispatch({ type: REQUEST_ACTION.PROCESSING });

    try {
      dispatch({ type: REQUEST_ACTION.PROCESSING });
      const {
        status,
        data: {
          message,
          data: { image_url },
        },
      } = await putRequest(USERS.UPDATE_USER_PROFILE_IMAGE, formData);
      if (status === RESPONSE_CODE[200]) {
        setProfileImage(image_url);
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
    setIsHovering(false);
    document.getElementById("uploadFileInput").value = "";
  };

  const removeProfileImage = async (e) => {
    try {
      dispatch({ type: REQUEST_ACTION.PROCESSING });
      const {
        status,
        data: { message },
      } = await deleteRequest(USERS.REMOVE_USER_PROFILE_IMAGE, {
        user_id: _user.id,
      });
      if (status === RESPONSE_CODE[200]) {
        dispatch({
          type: REQUEST_ACTION.SUCCESS,
          payload: { message: message },
        });
        toast.success(message);
        setProfileImage(null);
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
    setIsHovering(false);
  };

  const handleInputChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const submiGeneralDetails = async (data) => {
    const payloadData = {
      user_id: user.id,
      firstName: data.firstName,
      lastName: data.lastName,
      user_sector: data.sector,
      user_profession: data.profession,
      user_interest: data.interest,
      user_student_average_age: data.age,
    };
    try {
      dispatch({ type: REQUEST_ACTION.PROCESSING });
      const {
        status,
        data: { message },
      } = await putRequest(USERS.UPDATE_USER_DETAILS, payloadData);
      if (status === RESPONSE_CODE[200]) {
        dispatch({
          type: REQUEST_ACTION.SUCCESS,
          payload: { message: message },
        });
        toast.success(message);
        window.scrollTo(0, 0);
        getUserDetails(user.id);
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
      toast.error(error);
    }
  };

  const handleUserSuspend = async (event) => {
    const userStatus = isUserSuspended ? 2 : 1;
    let _errorMessage;

    console.log("userStatus", userStatus)

    try {
      dispatch({ type: REQUEST_ACTION.PROCESSING });
      const payloadData = { user_id: _user.id, status_id: userStatus };
      const {
        status,
        data: { message },
      } = await putRequest(USERS.UPDATE_STATUS, payloadData);
      if (status === RESPONSE_CODE[200]) {
        dispatch({
          type: REQUEST_ACTION.SUCCESS,
          payload: { message: message },
        });
        setUserSuspended(userStatus === 1 ? true : false);
        toast.success(message)
      } else {
        dispatch({
          type: REQUEST_ACTION.FAILURE,
          payload: { message: ApiErrorMessage() },
        });
      }
    } catch (error) {
      _errorMessage = ApiErrorMessage(error);
      dispatch({
        type: REQUEST_ACTION.FAILURE,
        payload: { message: _errorMessage },
      });
    }
  };

  async function getSectors(url) {
    // setLoading(true);
    dispatch({ type: REQUEST_ACTION.INIT_LOADER, payload: { loader: true } });
    let _errorMessage;
    const LOCALE = DEFAULT_VALUE.LOCALE;
    try {
      const response = await getRequest(url);
      const { status } = response;
      const {
        data: { sectorsDetails },
        success,
      } = response.data;
      if (success && status === RESPONSE_CODE[200]) {
        setSectorList(sectorsDetails.rows);
        dispatch({
          type: REQUEST_ACTION.INIT_LOADER,
          payload: { loader: false },
        });
      } else {
        dispatch({
          type: REQUEST_ACTION.FAILURE,
          payload: { message: ApiErrorMessage() },
        });
      }
    } catch (error) {
      _errorMessage = ApiErrorMessage(error);
      dispatch({
        type: REQUEST_ACTION.FAILURE,
        payload: { message: _errorMessage },
      });
    }
  }

  async function getTemplateCategory(url) {
    // setLoading(true);
    dispatch({ type: REQUEST_ACTION.INIT_LOADER, payload: { loader: true } });
    let _errorMessage;
    const LOCALE = DEFAULT_VALUE.LOCALE;
    try {
      const response = await getRequest(url);
      const { status } = response;
      const {
        data: { sectorsDetails },
        success,
      } = response.data;
      if (success && status === RESPONSE_CODE[200]) {
        setSubSectorList(sectorsDetails.rows);
        dispatch({
          type: REQUEST_ACTION.INIT_LOADER,
          payload: { loader: false },
        });
      } else {
        dispatch({
          type: REQUEST_ACTION.FAILURE,
          payload: { message: ApiErrorMessage() },
        });
      }
    } catch (error) {
      _errorMessage = ApiErrorMessage(error);
      dispatch({
        type: REQUEST_ACTION.FAILURE,
        payload: { message: _errorMessage },
      });
    }
  }

  useEffect(() => {
    if (user.sector) {
      getTemplateCategory(`${SUB_SECTOR.LIST}?sector_id=${user.sector}`);
    }
  }, [user.sector]);

  useEffect(() => {
    getSectors(`${SECTOR.LIST}`);
  }, []);

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        spacing={2}
      >
        <Grid item md={4}>
          <Card
            className="profile-left-section"
            sx={{ px: 2, py: 3, overflow: "hidden", boxShadow: 1 }}
          >
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              sx={{ marginTop: "20px" }}
            >
              <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ position: "relative" }}
              >
                <Avatar
                  alt={user.name}
                  sx={{
                    width: 120,
                    height: 120,
                    border:
                      user_profile_detail?.profile_picture === null
                        ? "2px dashed #3273ba"
                        : "none",
                  }}
                  src={profileImage}
                />
                {profileImage !== null && profileImage !== undefined ? (
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
                      onClick={removeProfileImage}
                    />
                  </Tooltip>
                ) : (
                  ""
                )}
                {!profileImage && (
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
                  id="uploadFileInput"
                  accept="image/*"
                  onChange={uploadImage}
                  style={{ display: "none" }}
                />
              </div>
              <Typography
                sx={{ px: 5, pt: 2, textAlign: "center", color: "#637381" }}
                variant="body2"
              >
                Allowed *.jpeg, *.jpg, *.png, *.gif max size of 3 MB
              </Typography>
              {/* <Box
                sx={{ display: "flex", alignItems: "center", my: "10px" }}
                color={DEFAULT_CSS.DARK_BG}
              >
                <Typography variant="h5">
                  {user.lastName
                    ? `${user.firstName} ${user.lastName}`
                    : user.firstName}
                </Typography>
                {_user?.isVerified === 1 ? "active" : "inactive"}
                <Typography sx={{ display: "flex", ml: "5px" }} variant="span">
                  {_user?.isVerified === 1 && (
                    <Icon
                      icon="fontisto:radio-btn-active"
                      style={{ color: DEFAULT_CSS.SUCCESS_COLOR }}
                      width="22"
                      height="22"
                    />
                  )}
                  {_user?.isVerified === 2 && (
                    <Icon
                      icon="fontisto:radio-btn-active"
                      style={{ color: DEFAULT_CSS.ERROR_MSG_COLOR }}
                      width="22"
                      height="22"
                    />
                  )}
                </Typography>
              </Box> */}
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                my={2}
              >
                <Box>
                  <Typography variant="body1">Active</Typography>
                  <FormHelperText>Apply actions.</FormHelperText>
                </Box>
                <Box>
                  <AntSwitch
                    onChange={(event) => handleUserSuspend(event)}
                    checked={isUserSuspended}
                    sx={{ variant: "success" }}
                  />
                </Box>
              </Stack>
            </Grid>
          </Card>
        </Grid>
        <Grid item md={8}>
          <Card className="profile-right-section" sx={{ p: 3, boxShadow: 1 }}>
            <form onSubmit={handleSubmit(submiGeneralDetails)} noValidate>
              <Grid container spacing={2} mb={3}>
                <Grid item md={6}>
                  <TextField
                    {...register("firstName")}
                    label="First Name*"
                    disabled={loader}
                    error={!!errors.firstName}
                    helperText={
                      errors.firstName ? errors.firstName.message : ""
                    }
                    name="firstName"
                    value={user.firstName}
                    variant="outlined"
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    {...register("lastName")}
                    label="Last Name*"
                    disabled={loader}
                    error={!!errors.lastName}
                    helperText={errors.lastName ? errors.lastName.message : ""}
                    name="lastName"
                    value={user.lastName}
                    variant="outlined"
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} mb={3}>
                <Grid item md={6}>
                  <TextField
                    fullWidth
                    label="Email*"
                    name="Email"
                    defaultValue={user.email}
                    disabled
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    disabled={loader}
                    fullWidth
                    {...register("age")}
                    error={!!errors.age}
                    helperText={errors.age ? errors.age.message : ""}
                    label="Age*"
                    name="age"
                    value={user.age}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item md={6}>
                  <Controller
                    name="sector"
                    disabled={loader}
                    control={control}
                    defaultValue={user.sector}
                    render={({ field }) => (
                      <>
                        <Select
                          {...field}
                          label="Sector*"
                          fullWidth
                          error={!!errors.sector}
                          onChange={(e) => {
                            field.onChange(e);
                            handleInputChange(e);
                          }}
                        >
                          {sectorList.length > 0 &&
                            sectorList.map((item) => (
                              <MenuItem key={item.id} value={item.id}>
                                {item.name}
                              </MenuItem>
                            ))}
                        </Select>
                        {errors.sector && (
                          <FormHelperText sx={{ color: "#f44336" }}>
                            {errors.sector.message}
                          </FormHelperText>
                        )}
                      </>
                    )}
                  />
                </Grid>
                <Grid item md={6}>
                  <Controller
                    name="profession"
                    disabled={loader}
                    control={control}
                    defaultValue={user.profession}
                    render={({ field }) => (
                      <>
                        <Select
                          {...field}
                          label="Profession*"
                          fullWidth
                          error={!!errors.profession}
                          onChange={(e) => {
                            field.onChange(e);
                            handleInputChange(e);
                          }}
                        >
                          {subSectorList.length > 0 &&
                            subSectorList.map((item) => (
                              <MenuItem key={item.id} value={item.id}>
                                {item.name}
                              </MenuItem>
                            ))}
                        </Select>
                        {errors.profession && (
                          <FormHelperText sx={{ color: "#f44336" }}>
                            {errors.profession.message}
                          </FormHelperText>
                        )}
                      </>
                    )}
                  />
                </Grid>
                <Grid item md={12}>
                  <TextField
                    fullWidth
                    {...register("interest")}
                    disabled={loader}
                    error={!!errors.interest}
                    helperText={errors.interest ? errors.interest.message : ""}
                    label="Interest*"
                    name="interest"
                    value={user.interest}
                    onChange={handleInputChange}
                    multiline
                    rows={3}
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
                  {loader ? "Please Wait..." : "save changes"}
                </LoadingButton>
              </Stack>
            </form>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default GeneralDetails;
