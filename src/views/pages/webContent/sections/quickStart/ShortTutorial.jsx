import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { WEB_CONTENT } from "app/config/endpoints";
import { REQUEST_ACTION } from "redux/authenticate/actions";
import { ApiErrorMessage } from "utils/helpers/function/apiErrorResonse";
import { RESPONSE_MESSAGES } from "app/constants/localizedStrings";
import { DEFAULT_VALUE, RESPONSE_CODE } from "app/constants";
import { getRequest, putRequest } from "app/httpClient/axiosClient";
import toast from "react-hot-toast";
import SendIcon from "@mui/icons-material/Send";
import { LoadingButton } from "@mui/lab";
import { Card, Grid, Stack, TextField } from "@mui/material";

const validationSchema = yup.object().shape({
  title: yup.string().trim().required(`Title is required.`),
  subtitle: yup.string().trim().required(`Subtitle is required.`),
  channelLink: yup.string().trim().required(`Channel url is required.`),
  videoLink: yup.string().trim().required(`Video url is required.`),
});

function ShortTutorial() {
  const dispatch = useDispatch();
  const { loader } = useSelector((state) => state.request);
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
      key: "QUICK_START",
      section: "TUTORIAL",
      value: JSON.stringify({
        title: data.title,
        subtitle: data.subtitle,
        channelLink: data.channelLink,
        videoLink: data.videoLink,
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
        const { title, subtitle, channelLink, videoLink } = parseValue;
        setValue("title", title);
        setValue("subtitle", subtitle);
        setValue("channelLink", channelLink);
        setValue("videoLink", videoLink);
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
    getWebContent(`${WEB_CONTENT.GET}?key=QUICK_START&section=TUTORIAL`);
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
              <Grid mb={4}>
                <TextField
                  {...register("subtitle")}
                  label="Subtitle*"
                  disabled={loader}
                  error={!!errors.subtitle}
                  helperText={errors.subtitle ? errors.subtitle.message : ""}
                  name="subtitle"
                  variant="outlined"
                  fullWidth
                />
              </Grid>

              <Grid mb={4}>
                <TextField
                  {...register("channelLink")}
                  label="Channel URL*"
                  disabled={loader}
                  error={!!errors.channelLink}
                  helperText={
                    errors.channelLink ? errors.channelLink.message : ""
                  }
                  name="channelLink"
                  variant="outlined"
                  fullWidth
                />
              </Grid>

              <Grid mb={4}>
                <TextField
                  {...register("videoLink")}
                  label="Video URL*"
                  disabled={loader}
                  error={!!errors.videoLink}
                  helperText={errors.videoLink ? errors.videoLink.message : ""}
                  name="videoLink"
                  variant="outlined"
                  fullWidth
                />
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
}

export default ShortTutorial;
