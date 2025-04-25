import { useEffect, useState, useCallback } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Button,
  Card,
  FormHelperText,
  Grid,
  Skeleton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { DEFAULT_CSS, RESPONSE_CODE } from "app/constants";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import SendIcon from "@mui/icons-material/Send";
import { WEB_CONTENT } from "app/config/endpoints";
import { REQUEST_ACTION } from "redux/authenticate/actions";
import { ApiErrorMessage } from "utils/helpers/function/apiErrorResonse";
import toast from "react-hot-toast";
import {
  getRequest,
  putRequest,
} from "app/httpClient/axiosClient";
import { RESPONSE_MESSAGES } from "app/constants/localizedStrings";
import { Box } from "@mui/system";
import { Icon } from "@iconify/react";

const validationSchema = yup.object().shape({
  section: yup.array().of(
    yup.object().shape({
      title: yup.string().trim().required("Title is required."),
    })
  ),
});

const HelpCenterTrending = () => {
  const dispatch = useDispatch();
  const { loader } = useSelector((state) => state.request);
  const [errorMessage, setErrorMessage] = useState("");

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
    defaultValues: {
      section: [
        {
          title: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "section",
  });

  const updateContent = async (data) => {
    const payload = {
      key: "HELP_CENTER",
      section: "TRENDING",
      value: JSON.stringify({
        section: data.section,
      }),
      status: 1,
    };

    try {
      dispatch({ type: REQUEST_ACTION.PROCESSING });
      const {
        status,
        data: { message },
      } = await putRequest(WEB_CONTENT.UPDATE, payload);
      if (status === RESPONSE_CODE[200]) {
        dispatch({
          type: REQUEST_ACTION.SUCCESS,
          payload: { message: message },
        });
        toast.success(message);
        getContent();
      } else {
        throw new Error(ApiErrorMessage());
      }
    } catch (error) {
      dispatch({
        type: REQUEST_ACTION.FAILURE,
        payload: { message: error.message },
      });
    }
  };

  const getWebContent = async (url) => {
    dispatch({ type: REQUEST_ACTION.INIT_LOADER, payload: { loader: true } });
    try {
      const response = await getRequest(url);
      const { statusCode, data, success } = response.data;
      if (success && statusCode === RESPONSE_CODE[200]) {
        const parseValue = JSON.parse(data?.value);
        const { section } = parseValue;
        setValue("section", section);
      } else {
        throw new Error(RESPONSE_MESSAGES.DEFAULT.FETCHING_USERS_LIST);
      }
    } catch (error) {
      setErrorMessage(ApiErrorMessage(error));
    } finally {
      dispatch({
        type: REQUEST_ACTION.INIT_LOADER,
        payload: { loader: false },
      });
    }
  };

  const getContent = useCallback(() => {
    getWebContent(`${WEB_CONTENT.GET}?key=HELP_CENTER&section=TRENDING`);
  }, []);

  useEffect(() => {
    getContent();
  }, [getContent]);

  return (
    <>
      <Grid container spacing={2} my={2}>
        <Grid item md={12}>
          <Card className="profile-right-section" sx={{ p: 3 }}>
            <form onSubmit={handleSubmit(updateContent)} noValidate>
              <Grid container spacing={2} my={2}>
                {fields.map((field, index) => (
                  <Grid item md={6} key={field.id}>
                    <Typography pb={2} variant="h5">
                      Article {index + 1}
                    </Typography>
                    <Box
                      sx={{
                        border: "1px solid #bfc0c2",
                        borderRadius: "12px",
                        padding: "15px 10px",
                        position: "relative",
                      }}
                    >
                      {fields.length > 1 && (
                        <Tooltip placement="top" title="Click to remove card">
                          <CancelTwoToneIcon
                            sx={{
                              color: DEFAULT_CSS.ERROR_MSG_COLOR,
                              position: "absolute",
                              right: "-5px",
                              top: "-5px",
                              zIndex: "99",
                              cursor: "pointer",
                              fontSize: "18px",
                              background: "#fff",
                              borderRadius: "50%",
                            }}
                            onClick={() => {
                              remove(index);
                            }}
                          />
                        </Tooltip>
                      )}
                      <Grid mb={2}>
                        <TextField
                          {...register(`section[${index}].title`)}
                          label="Title*"
                          disabled={loader}
                          error={!!errors?.section?.[index]?.title}
                          helperText={
                            errors?.section?.[index]?.title?.message || ""
                          }
                          variant="outlined"
                          fullWidth
                        />
                      </Grid>
                    </Box>
                  </Grid>
                ))}
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  mt={2}
                >
                  <Button
                    onClick={() =>
                      append({ title: "", subtitle: "", icon: null })
                    }
                    type="button"
                  >
                    <Icon icon="basil:add-outline" width="32" height="32" />
                  </Button>
                </Grid>
              </Grid>

              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                mt={2}
              >
                <LoadingButton
                  type="submit"
                  variant="contained"
                  endIcon={<SendIcon />}
                  loading={loader}
                  sx={{ mt: 2 }}
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

export default HelpCenterTrending;
