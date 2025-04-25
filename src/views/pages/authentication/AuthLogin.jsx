import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// material-ui
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";

// third party
import * as yup from "yup";

// project imports
import AnimateButton from "ui-component/extended/AnimateButton";

// assets
import { VALIDATION_MESSAGE } from "app/constants/regexRules";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Alert, TextField } from "@mui/material";
import { login } from "redux/authenticate/actions";
import Iconify from "components/iconify";
import { Link } from "react-router-dom";
import { ROUTE_SLUGS } from "app/constants";
import { LoadingButton } from "@mui/lab";

// ============================|| FIREBASE - LOGIN ||============================ //

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email(VALIDATION_MESSAGE.EMAIL.INVALID)
    .required(VALIDATION_MESSAGE.EMAIL.REQUIRED),
  password: yup.string().required(VALIDATION_MESSAGE.PASSWORD.REQUIRED),
});

const AuthLogin = ({ ...others }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { loader, errorMessage } = useSelector((state) => state.auth || {});
  const device_token = useSelector((state) => state.device_token);

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(validationSchema),
  });

  const formSubmit = (data) => {
    dispatch(login(data.email, data.password, device_token, true, false));
  };

  return (
    <>
      <Stack spacing={3}>
        {errorMessage?.auth !== null && errorMessage !== undefined ? (
          <Stack sx={{ width: "100%" }} spacing={2} style={{marginBottom:"15px"}}>
            <Alert
              sx={{ mb: 4, px: 2, py: 0 }}
              variant="outlined"
              severity="error"
            >
              <strong>{errorMessage?.auth}</strong>
            </Alert>
          </Stack>
        ) : (
          ""
        )}
      </Stack>
      <form onSubmit={handleSubmit(formSubmit)} noValidate>
        <Stack spacing={3}>
          <TextField
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ""}
            name="email"
            label="Email"
          />

          <TextField
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ""}
            name="password"
            label="Password"
            autoComplete="true"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    <Iconify
                      icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ my: 2 }}
        >
          <Link
            to={ROUTE_SLUGS.FORGOT_PASS}
            variant="subtitle2"
            underline="hover"
          >
            Forgot password?
          </Link>
        </Stack>

        <Box sx={{ mt: 2 }}>
          <LoadingButton
            fullWidth
            loading={loader ? true : false}
            disabled={loader}
            size="large"
            type="submit"
            variant="contained"
            color="primary"
          >
            {loader ? "Please Wait..." : "Login"}
          </LoadingButton>
        </Box>
      </form>
    </>
  );
};

export default AuthLogin;
