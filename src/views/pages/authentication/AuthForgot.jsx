import { useState } from "react";

// material-ui
import Box from "@mui/material/Box";

// third party

// project imports
import AnimateButton from "ui-component/extended/AnimateButton";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Alert, Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { RESPONSE_CODE, ROUTE_SLUGS } from "app/constants";
import { postRequest } from "app/httpClient/axiosClient";
import { AUTH } from "app/config/endpoints";
import { LoadingButton } from "@mui/lab";

// ============================|| FIREBASE - LOGIN ||============================ //

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email is required"),
});

const AuthForgot = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { register, handleSubmit, reset, formState } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const { errors } = formState;

  const formSubmit = async (data, e) => {
    setErrorMessage("");
    setLoading(true);
    try {
      const response = await postRequest(AUTH.FORGOT_PASSWORD, data);
      setLoading(false);
      setSuccessMessage(
        "The password reset link has been sent to your registered email address"
      );
      reset();
    } catch (error) {
      if (error.response.status === RESPONSE_CODE["400"]) {
        const { message } = error.response.data;
        setErrorMessage(message);
        setLoading(false);
      }
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
            ""
          )}
          <TextField
            sx={{ my: 1, width: "100%" }}
            {...register("email")}
            variant="outlined"
            type="email"
            name="email"
            label="Email address"
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ""}
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
      </form>

      <Box align="center" justifyContent="space-between" sx={{ my: 1 }}>
        <Link
          to={ROUTE_SLUGS.LOGIN}
          variant="subtitle1"
          underline="hover"
          align="center"
        >
          Back to Log In
        </Link>
      </Box>
    </>
  );
};

export default AuthForgot;
