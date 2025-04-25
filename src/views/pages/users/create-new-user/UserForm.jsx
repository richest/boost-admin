import { Controller, useForm } from "react-hook-form";
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
} from "app/constants";
import { SECTOR, SUB_SECTOR, USERS } from "app/config/endpoints";
import { getRequest, postRequest } from "app/httpClient/axiosClient";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/system";
import SendIcon from "@mui/icons-material/Send";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import Iconify from "components/iconify";
import {
  Avatar,
  Card,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import "react-phone-input-2/lib/material.css";
import PhoneInput from "react-phone-input-2";
import toast from "react-hot-toast";

const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required(`First ${VALIDATION_MESSAGE.NAME.REQUIRED}`)
    .max(30, `First ${VALIDATION_MESSAGE.NAME.MAX_LENGTH}`),
  last_name: yup
    .string()
    .required(`Last ${VALIDATION_MESSAGE.NAME.REQUIRED}`)
    .max(30, `Last ${VALIDATION_MESSAGE.NAME.MAX_LENGTH}`),
  email: yup
    .string()
    .required(VALIDATION_MESSAGE.EMAIL.REQUIRED)
    .email(VALIDATION_MESSAGE.EMAIL.INVALID),
  age: yup.string().required("Age is required"),
  sector: yup.string().required("Sector is required"),
  profession: yup.string().required("Profession is required"),
  interest: yup.string().required("Interest is required"),
  password: yup
    .string()
    .required(VALIDATION_MESSAGE.PASSWORD.REQUIRED)
    .matches(VALIDATION_RULES.PASSWORD, VALIDATION_MESSAGE.PASSWORD.REGEX_RULES)
    .required(VALIDATION_MESSAGE.PASSWORD.REQUIRED),
  confirmPassword: yup
    .string()
    .required(VALIDATION_MESSAGE.CONFIRMED_PASSWORD.REQUIRED)
    .oneOf(
      [yup.ref("password")],
      VALIDATION_MESSAGE.CONFIRMED_PASSWORD.NOT_IDENTICAL
    ),
  yupprofileImage: yup
    .mixed()
    .test(
      "fileSize",
      "Profile picture sizie can not be more than 5 MB",
      (value) => {
        if (value.length === 0) return true;
        else return value.length && value[0].size <= 5242880;
      }
    )
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

const UserForm = () => {
  const dispatch = useDispatch();
  const { loader } = useSelector((state) => state.request);
  const naviage = useNavigate();
  const {
    register,
    setValue,
    handleSubmit,
    trigger,
    control,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(validationSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [sectorList, setSectorList] = useState([]);
  const [subSectorList, setSubSectorList] = useState([]);
  //   const classes = useStyles();
  const [isHovering, setIsHovering] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const { onChange, ...params } = register("yupprofileImage");

  const [user, setUser] = useState({
    firstName: "",
    last_name: "",
    email: "",
    age: "",
    interest: "",
    password: "",
    confirmPassword: "",
    sector: "",
    profession: "",
  });

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
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const creatNewUser = async (data) => {
    let formData = new FormData();
    const payloadData = {
      firstName: data.firstName,
      lastName: data.last_name,
      email: data.email,
      password: data.password,
      user_sector: user?.sector,
      user_profession: user?.profession,
      user_interest: data.interest,
      user_student_average_age: data.age,
    };

    Object.keys(payloadData).forEach(function (key) {
      formData.append(key, payloadData[key]);
    });

    if (data.yupprofileImage[0]) {
      formData.append("profile_picture", data.yupprofileImage[0]);
    }

    try {
      dispatch({ type: REQUEST_ACTION.PROCESSING });

      const {
        status,
        data: { message },
      } = await postRequest(USERS.CREATE, formData);
      if (status === RESPONSE_CODE[200]) {
        dispatch({
          type: REQUEST_ACTION.SUCCESS,
          payload: { message: message },
        });
        toast.success(message);
        naviage(ROUTE_SLUGS.USERS);
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
    getSectors(`${SECTOR.LIST}`);
  }, []);

  useEffect(() => {
    if (user.sector) {
      getTemplateCategory(`${SUB_SECTOR.LIST}?sector_id=${user.sector}`);
    }
  }, [user.sector]);

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
                  alt=""
                  sx={{
                    width: 120,
                    height: 120,
                    border: `2px dashed ${
                      errors.yupprofileImage ? "#ff4842" : "#3273ba"
                    }`,
                    color: `${errors.yupprofileImage ? "#ff4842" : "#fff"}`,
                  }}
                  color="danger"
                  src={selectedImage && URL.createObjectURL(selectedImage)}
                />

                {selectedImage !== null && selectedImage !== undefined ? (
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
                      onClick={() => {
                        setSelectedImage(null);
                        setIsHovering(false);
                        onChange({
                          target: { name: "yupprofileImage", value: [] },
                        });
                        trigger("yupprofileImage");
                      }}
                    />
                  </Tooltip>
                ) : (
                  ""
                )}
                {!selectedImage && (
                  <div
                    style={{ position: "absolute", top: "38%", right: "40%" }}
                  >
                    <label htmlFor="uploadFileInput">
                      <AddAPhotoIcon />
                    </label>
                  </div>
                )}

                <input
                  {...params}
                  type="file"
                  id="uploadFileInput"
                  accept="image/*"
                  name="yupprofileImage"
                  onChange={(event) => {
                    setSelectedImage(event.target.files[0]);
                    onChange(event);
                    trigger("yupprofileImage");
                  }}
                  style={{ display: "none" }}
                />
              </div>
              <Typography
                sx={{ px: 5, pt: 2, textAlign: "center", color: "#637381" }}
                variant="body2"
              >
                Allowed *.jpeg, *.jpg, *.png, *.gif max size of 3 MB
              </Typography>
              {errors.yupprofileImage && (
                <FormHelperText
                  sx={{ my: 2, px: 5, textAlign: "center" }}
                  error={true}
                >
                  {errors.yupprofileImage.message}
                </FormHelperText>
              )}
            </Grid>
          </Card>
        </Grid>
        <Grid item md={8}>
          <Card className="profile-right-section" sx={{ p: 3, boxShadow: 1 }}>
            <form onSubmit={handleSubmit(creatNewUser)} noValidate>
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
                    {...register("last_name")}
                    label="Last Name"
                    disabled={loader}
                    error={!!errors.last_name}
                    helperText={
                      errors.last_name ? errors.last_name.message : ""
                    }
                    name="last_name"
                    value={user.last_name}
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
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email ? errors.email.message : ""}
                    label="Email*"
                    name="email"
                    value={user.email}
                    onChange={handleInputChange}
                  />
                </Grid>

                <Grid item md={6}>
                  <TextField
                    fullWidth
                    disabled={loader}
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
                    control={control}
                    disabled={loader}
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
                    disabled={loader}
                    {...register("interest")}
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
              <Grid container spacing={2} mb={3}>
                <Grid item md={6}>
                  <TextField
                    {...register("password")}
                    label="Password*"
                    type={showPassword ? "text" : "password"}
                    disabled={loader}
                    error={!!errors.password}
                    helperText={errors.password ? errors.password.message : ""}
                    name="password"
                    autoComplete="true"
                    value={user.password}
                    variant="outlined"
                    onChange={handleInputChange}
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            <Iconify
                              icon={
                                showPassword
                                  ? "eva:eye-fill"
                                  : "eva:eye-off-fill"
                              }
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    {...register("confirmPassword")}
                    type={showConfirmPassword ? "text" : "password"}
                    label="Confirm password*"
                    disabled={loader}
                    error={!!errors.confirmPassword}
                    helperText={
                      errors.confirmPassword
                        ? errors.confirmPassword.message
                        : ""
                    }
                    name="confirmPassword"
                    autoComplete="true"
                    value={user.confirmPassword}
                    variant="outlined"
                    onChange={handleInputChange}
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            edge="end"
                          >
                            <Iconify
                              icon={
                                showConfirmPassword
                                  ? "eva:eye-fill"
                                  : "eva:eye-off-fill"
                              }
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
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

export default UserForm;
