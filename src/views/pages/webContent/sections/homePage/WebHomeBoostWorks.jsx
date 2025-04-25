import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Card,
  FormHelperText,
  Grid,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { DEFAULT_CSS, DEFAULT_VALUE, RESPONSE_CODE } from "app/constants";
import { LoadingButton } from "@mui/lab";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SendIcon from "@mui/icons-material/Send";
import { Box } from "@mui/system";
import { WEB_CONTENT } from "app/config/endpoints";
import { REQUEST_ACTION } from "redux/authenticate/actions";
import { ApiErrorMessage } from "utils/helpers/function/apiErrorResonse";
import { RESPONSE_MESSAGES } from "app/constants/localizedStrings";
import { getRequest, putRequest } from "app/httpClient/axiosClient";
import toast from "react-hot-toast";

const validationSchema = yup.object().shape({
  title: yup.string().trim().required(`Title is required.`),

  createTitle: yup.string().trim().required(`Title is required.`),
  createDescription: yup.string().trim().required(`Description is required.`),

  shareTitle: yup.string().trim().required(`Title is required.`),
  shareDescription: yup.string().trim().required(`Description is required.`),

  playTitle: yup.string().trim().required(`Title is required.`),
  playDescription: yup.string().trim().required(`Description is required.`),

  collectTitle: yup.string().trim().required(`Title is required.`),
  collectDescription: yup.string().trim().required(`Description is required.`),
});

const WebHomeBoostWorks = () => {
  const { loader } = useSelector((state) => state.request);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
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

  const updateContent = async (data) => {
    let payload = {
      key: "HOME_PAGE",
      section: "WORKS",
      value: JSON.stringify({
        title: data.title,

        createTitle: data.createTitle,
        createDescription: data.createDescription,

        shareTitle: data.shareTitle,
        shareDescription: data.shareDescription,

        playTitle: data.playTitle,
        playDescription: data.playDescription,

        collectTitle: data.collectTitle,
        collectDescription: data.collectDescription,
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
        dispatch({
          type: REQUEST_ACTION.FAILURE,
          payload: { message: ApiErrorMessage() },
        });
      }
    } catch (error) {
      dispatch({
        type: REQUEST_ACTION.FAILURE,
        payload: { message: ApiErrorMessage(error) },
      });
    }
  };

  async function getWebContent(url) {
    // NProgress.start();
    dispatch({ type: REQUEST_ACTION.INIT_LOADER, payload: { loader: true } });
    let _errorMessage;
    const LOCALE = DEFAULT_VALUE.LOCALE;
    try {
      const response = await getRequest(url);
      const { status } = response;
      const { data, success } = response.data;
      if (success && status === RESPONSE_CODE[200]) {
        const parseValue = JSON.parse(data?.value);
        const {
          title,
          
        createTitle,
        createDescription,

        shareTitle,
        shareDescription,

        playTitle,
        playDescription,

        collectTitle,
        collectDescription,
        } = parseValue;
        

        setValue("title", title);
        setValue("createTitle", createTitle);
        setValue("createDescription", createDescription);
        setValue("shareTitle", shareTitle);
        setValue("shareDescription", shareDescription);
        setValue("playTitle", playTitle);
        setValue("playDescription", playDescription);
        setValue("collectTitle", collectTitle);
        setValue("collectDescription", collectDescription);
      } else {
        setErrorMessage(RESPONSE_MESSAGES[LOCALE].FETCHING_USERS_LIST);
      }
      // NProgress.done();
    } catch (error) {
      // NProgress.done();

      _errorMessage = ApiErrorMessage(error);
    }
    dispatch({ type: REQUEST_ACTION.INIT_LOADER, payload: { loader: false } });
    // NProgress.done();
  }
  const getContent = () => {
    getWebContent(`${WEB_CONTENT.GET}?key=HOME_PAGE&section=WORKS`);
  };

  useEffect(() => {
    getContent();
  }, []);

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
        my={2}
      >
        <Grid item md={12}>
          <Card className="profile-right-section" sx={{ p: 3 }}>
            {/* <h3
              style={{ margin: "0", fontWeight: "500", marginBottom: "20px" }}
            >
              Home Introduction
            </h3> */}
            <form onSubmit={handleSubmit(updateContent)} noValidate>
              <Grid mb={4}>
                <TextField
                  {...register("title")}
                  label="Title*"
                  disabled={loader}
                  error={!!errors.title}
                  helperText={errors.title ? errors.title.message : ""}
                  name="title"
                  variant="outlined"
                  fullWidth
                />
              </Grid>

              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={2}
                my={2}
              >
                <Grid item md={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h5">Create Section</Typography>
                  </Box>
                  <Grid mb={4}>
                    <TextField
                      {...register("createTitle")}
                      label="Title*"
                      disabled={loader}
                      error={!!errors.createTitle}
                      helperText={
                        errors.createTitle ? errors.createTitle.message : ""
                      }
                      name="createTitle"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid mb={4}>
                    <TextField
                      {...register("createDescription")}
                      label="Description*"
                      disabled={loader}
                      error={!!errors.createDescription}
                      helperText={
                        errors.createDescription
                          ? errors.createDescription.message
                          : ""
                      }
                      name="createDescription"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Grid item md={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h5">Share Section</Typography>
                  </Box>
                  <Grid mb={4}>
                    <TextField
                      {...register("shareTitle")}
                      label="Title*"
                      disabled={loader}
                      error={!!errors.shareTitle}
                      helperText={
                        errors.shareTitle ? errors.shareTitle.message : ""
                      }
                      name="shareTitle"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid mb={4}>
                    <TextField
                      {...register("shareDescription")}
                      label="Description*"
                      disabled={loader}
                      error={!!errors.shareDescription}
                      helperText={
                        errors.shareDescription
                          ? errors.shareDescription.message
                          : ""
                      }
                      name="shareDescription"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                </Grid>

                <Grid item md={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h5">Play Section</Typography>
                  </Box>
                  <Grid mb={4}>
                    <TextField
                      {...register("playTitle")}
                      label="Title*"
                      disabled={loader}
                      error={!!errors.playTitle}
                      helperText={
                        errors.playTitle ? errors.playTitle.message : ""
                      }
                      name="playTitle"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid mb={4}>
                    <TextField
                      {...register("playDescription")}
                      label="Description*"
                      disabled={loader}
                      error={!!errors.playDescription}
                      helperText={
                        errors.playDescription
                          ? errors.playDescription.message
                          : ""
                      }
                      name="playDescription"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                </Grid>

                <Grid item md={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h5">Collect Result Section</Typography>
                  </Box>
                  <Grid mb={4}>
                    <TextField
                      {...register("collectTitle")}
                      label="Title*"
                      disabled={loader}
                      error={!!errors.collectTitle}
                      helperText={
                        errors.collectTitle ? errors.collectTitle.message : ""
                      }
                      name="collectTitle"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid mb={4}>
                    <TextField
                      {...register("collectDescription")}
                      label="Description*"
                      disabled={loader}
                      error={!!errors.collectDescription}
                      helperText={
                        errors.collectDescription
                          ? errors.collectDescription.message
                          : ""
                      }
                      name="collectDescription"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Stack
                direction="row"
                justifyContent="center"
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

export default WebHomeBoostWorks;
