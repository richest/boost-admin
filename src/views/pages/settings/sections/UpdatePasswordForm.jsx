import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SendIcon from "@mui/icons-material/Send";
import { VALIDATION_MESSAGE, VALIDATION_RULES } from "app/constants/regexRules";
import { useDispatch, useSelector } from "react-redux";
import { DEFAULT_VALUE, RESPONSE_CODE } from "app/constants";
import { REQUEST_ACTION } from "redux/authenticate/actions";
import { putRequest } from "app/httpClient/axiosClient";
import { AUTH } from "app/config/endpoints";
import { RESPONSE_MESSAGES } from "app/constants/localizedStrings";
import { ApiErrorMessage } from "utils/helpers/function/apiErrorResonse";
import { IconButton, InputAdornment, Stack, TextField } from "@mui/material";
import TextErrorMessage from "components/admin-ui/textErrorMessage";
import Iconify from "components/iconify";
import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/system";
import toast from "react-hot-toast";

const validationSchema = yup.object().shape({
  password: yup
    .string()
    .required(VALIDATION_MESSAGE.PASSWORD.REQUIRED)
    .matches(
      VALIDATION_RULES.PASSWORD,
      VALIDATION_MESSAGE.PASSWORD.REGEX_RULES
    ),
  oldpassword: yup
    .string()
    .required(VALIDATION_MESSAGE.OLD_PASSWORD.REQUIRED)
    .matches(
      VALIDATION_RULES.PASSWORD,
      VALIDATION_MESSAGE.PASSWORD.REGEX_RULES.replace(
        "Password",
        "Old password"
      )
    ),
  confirmPassword: yup
    .string()
    .required(VALIDATION_MESSAGE.CONFIRMED_PASSWORD.REQUIRED)
    .oneOf(
      [yup.ref("password")],
      VALIDATION_MESSAGE.CONFIRMED_PASSWORD.NOT_IDENTICAL
    ),
});

function UpdatePasswordForm(props) {
  const customization = useSelector((state) => state.customization);
  const { loader, message, messageType } = useSelector(
    (state) => state.request
  );
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [showOldPassword, setOldShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { register, handleSubmit, reset, formState } = useForm({
    mode: "onTouched",
    resolver: yupResolver(validationSchema),
  });

  const { errors } = formState;
  const formSubmit = async (data) => {
    const LOCALE = DEFAULT_VALUE.LOCALE;
    dispatch({ type: REQUEST_ACTION.INIT_LOADER, payload: { loader: true } });
    try {
      const response = await putRequest(AUTH.UPDATE_PASSWORD, {
        old_password: data.oldpassword,
        new_password: data.password,
      });

      const { status, data: { message } } = response;

      if (status === RESPONSE_CODE[200]) {
        reset();
        props.cancel();
        dispatch({
          type: REQUEST_ACTION.SUCCESS,
          payload: { message: RESPONSE_MESSAGES[LOCALE].RESET_PASS_SUCCESS },
        });
        toast.success(message)
      } else {
        dispatch({
          type: REQUEST_ACTION.FAILURE,
          payload: { message: RESPONSE_MESSAGES[LOCALE].RESET_PASS_FAILED },
        });
        toast.error(message)
      }
    } catch (error) {
      dispatch({
        type: REQUEST_ACTION.FAILURE,
        payload: { message: ApiErrorMessage(error) },
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(formSubmit)} noValidate>
        <Stack>
          <TextErrorMessage message={errorMessage} />
          <Stack 
               >
            <TextField
              sx={{ my: 1 }}
              {...register("oldpassword")}
              name="oldpassword"
              label="Old password"
              type={showOldPassword ? "text" : "password"}
              error={!!errors.oldpassword}
              helperText={errors.oldpassword ? errors.oldpassword.message : ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" >
                    <IconButton 
                      onClick={() => setOldShowPassword(!showOldPassword)}
                      edge="end"
                    >
                      <Iconify
                        icon={
                          showOldPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              sx={{ my: 1 }}
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
              sx={{ my: 1 }}
              {...register("confirmPassword")}
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              label="Confirm password"
              autoComplete="true"
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
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="flex-end"
            sx={{ my: 3 }}
          >
            <LoadingButton
              size="medium"
              disabled={loader}
              type="button"
              variant="outlined"
              onClick={loader ? () => false : props.cancel}
            >
              {" "}
              Cancel
            </LoadingButton>

            <LoadingButton
              size="medium"
              type="submit"
              variant="contained"
              loadingPosition="end"
              endIcon={<SendIcon />}
              loading={loader}
            >
              <span>Reset password</span>
            </LoadingButton>
          </Stack>
        </Stack>
      </form>
    </>
  );
}

export default UpdatePasswordForm;
