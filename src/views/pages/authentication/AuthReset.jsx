import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import Iconify from "components/iconify";
import { Stack } from "immutable";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { VALIDATION_MESSAGE, VALIDATION_RULES } from "app/constants/regexRules";
import { useState } from "react";
import {
  AUTH_ROUTE_SLUGS,
  DEFAULT_VALUE,
  RESPONSE_CODE,
  ROUTE_SLUGS,
} from "app/constants";
import { postRequest } from "app/httpClient/axiosClient";
import { AUTH } from "app/config/endpoints";
import { RESPONSE_MESSAGES } from "app/constants/localizedStrings";
import { ApiErrorMessage } from "utils/helpers/function/apiErrorResonse";
import { Box } from "@mui/system";
import AnimateButton from "ui-component/extended/AnimateButton";

const validationSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .matches(
      VALIDATION_RULES.PASSWORD,
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character"
    ),
  confirmPassword: yup
    .string()
    .required(VALIDATION_MESSAGE.CONFIRMED_PASSWORD.REQUIRED)
    .oneOf(
      [yup.ref("password")],
      VALIDATION_MESSAGE.CONFIRMED_PASSWORD.NOT_IDENTICAL
    ),
});

const AuthReset = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const { register, handleSubmit, reset, formState } = useForm({
    mode: "onTouched",
    resolver: yupResolver(validationSchema),
  });

  const { errors } = formState;
  const formSubmit = async (data) => {
    setErrorMessage("");
    setLoading(true);
    try {
      const LOCALE = DEFAULT_VALUE.LOCALE;
      const response = await postRequest(AUTH.RESET_PASSWORD, {
        password: data.password,
        token: token,
      });
      const { status } = response;
      const { success } = response.data;

      if (success && status === RESPONSE_CODE[200]) {
        setLoading(false);
        setSuccessMessage("Your password has updated!");
        reset();
        setTimeout(() => {
          navigate(ROUTE_SLUGS.LOGIN);
        }, 2000);
      } else {
        setErrorMessage(RESPONSE_MESSAGES[LOCALE].ERROR_MESSAGE);
        setLoading(false);
      }
    } catch (error) {
      const errorMessage = ApiErrorMessage(error);
      setErrorMessage(errorMessage);
      setLoading(false);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(formSubmit)} noValidate>
        <Box spacing={3}>
          {errorMessage !== "" ? (
            <Box sx={{ width: "100%" }} spacing={2}>
              <Alert sx={{ px: 2, py: 0 }} variant="outlined" severity="error">
                <strong>{errorMessage}</strong>
              </Alert>
            </Box>
          ) : (
            ""
          )}
          {successMessage !== "" ? (
            <Box sx={{ width: "100%" }} spacing={2}>
              <Alert
                sx={{ px: 2, py: 0 }}
                variant="outlined"
                severity="success"
              >
                <strong>{successMessage}</strong>
              </Alert>
            </Box>
          ) : (
            <>
              <Box>
                <TextField
                  sx={{ my: 1, width: "100%" }}
                  {...register("password")}
                  name="password"
                  autoComplete="true"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ""}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          <Iconify
                            icon={
                              showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                            }
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  sx={{ my: 1, width: "100%" }}
                  {...register("confirmPassword")}
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  autoComplete="true"
                  label="Confirm password"
                  error={!!errors.confirmPassword}
                  helperText={
                    errors.confirmPassword ? errors.confirmPassword.message : ""
                  }
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
              </Box>
              <Box sx={{ mt: 2 }}>
                <LoadingButton
                  fullWidth
                  loading={loading ? true : false}
                  disabled={loading}
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  {loading ? "Please Wait..." : "Submit"}
                </LoadingButton>
              </Box>
            </>
          )}
        </Box>
      </form>

      <Box align="center" justifyContent="space-between" sx={{ my: 1 }}>
        <Link to="/login" variant="subtitle1" underline="hover" align="center">
          Back to Log In
        </Link>
      </Box>
    </>
  );
};

export default AuthReset;
