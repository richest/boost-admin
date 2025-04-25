import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
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
import SendIcon from "@mui/icons-material/Send";
import { Box } from "@mui/system";
import { DEFAULT_CSS, DEFAULT_VALUE, RESPONSE_CODE } from "app/constants";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import UploadImage from "views/pages/webContent/UploadImage";
import { WEB_CONTENT } from "app/config/endpoints";
import { REQUEST_ACTION } from "redux/authenticate/actions";
import { ApiErrorMessage } from "utils/helpers/function/apiErrorResonse";
import { RESPONSE_MESSAGES } from "app/constants/localizedStrings";
import { getRequest, putRequest } from "app/httpClient/axiosClient";
import toast from "react-hot-toast";

const validationSchema = yup.object().shape({
  titleOne: yup.string().trim().required(`Title is required.`),
  titleTwo: yup.string().trim().required(`Title is required.`),
  subtitleOne: yup.string().trim().required(`Subtitle is required.`),
  subtitleTwo: yup.string().trim().required(`Subtitle is required.`),
  introImageOne: yup
    .mixed()
    .test("required", "Image is required.", (value) => value.length > 0)
    .test("fileSize", "Image's sizie can not be more than 5 MB", (value) => {
      return value.length && value[0].size <= 5242880;
    })
    .test(
      "fileType",
      "Only *.jpeg, *.jpg, *.png type of images are allowed.",
      (value) => {
        return (
          value.length &&
          ["image/jpeg", "image/png", "image/jpg"].includes(value[0].type)
        );
      }
    ),
  introImageTwo: yup
    .mixed()
    .test("required", "Image is required.", (value) => value.length > 0)
    .test("fileSize", "Image's sizie can not be more than 5 MB", (value) => {
      return value.length && value[0].size <= 5242880;
    })
    .test(
      "fileType",
      "Only *.jpeg, *.jpg, *.png type of images are allowed.",
      (value) => {
        return (
          value.length &&
          ["image/jpeg", "image/png", "image/jpg"].includes(value[0].type)
        );
      }
    ),
});

const WebProductTeacherBusiness = ({ name }) => {
  const dispatch = useDispatch();
  const { loader } = useSelector((state) => state.request);
  const [content, setContent] = useState({});
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

  const [imageObj1, setImageObj1] = useState({});
  const [imageObj2, setImageObj2] = useState({});
  const { onChange, ...params } = register("introImage");

  const updateContent = async (data) => {
    let payload = {
      key: name,
      section: "TEACHER_BUSINESS",
      value: JSON.stringify({
        titleOne: data.titleOne,
        titleTwo: data.titleTwo,
        subtitleOne: data.subtitleOne,
        subtitleTwo: data.subtitleTwo,
        introImageOne: imageObj1,
        introImageTwo: imageObj2,
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
          titleOne,
          titleTwo,
          subtitleOne,
          subtitleTwo,
          introImageOne,
          introImageTwo,
        } = parseValue;
        setImageObj1(introImageOne);
        setImageObj2(introImageTwo);
        setValue("titleOne", titleOne);
        setValue("titleTwo", titleTwo);
        setValue("subtitleOne", subtitleOne);
        setValue("subtitleTwo", subtitleTwo);
        setValue(
          "introImageOne",
          introImageOne?.uploaded_images?.upload_image_url
            ? [{ size: 100, type: "image/jpg" }]
            : {}
        );
        setValue(
          "introImageTwo",
          introImageTwo?.uploaded_images?.upload_image_url
            ? [{ size: 100, type: "image/jpg" }]
            : {}
        );
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
    getWebContent(`${WEB_CONTENT.GET}?key=${name}&section=TEACHER_BUSINESS`);
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
            <form onSubmit={handleSubmit(updateContent)} noValidate>
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
                    <Typography variant="h5">For Teachers</Typography>
                  </Box>
                  <Grid mb={4}>
                    <TextField
                      {...register("titleOne")}
                      label="Title*"
                      disabled={loader}
                      error={!!errors.titleOne}
                      helperText={
                        errors.titleOne ? errors.titleOne.message : ""
                      }
                      name="titleOne"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid mb={4}>
                    <TextField
                      {...register("subtitleOne")}
                      label="Subtitle*"
                      disabled={loader}
                      error={!!errors.subtitleOne}
                      helperText={
                        errors.subtitleOne ? errors.subtitleOne.message : ""
                      }
                      name="subtitleOne"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>

                  <UploadImage
                    setValue={setValue}
                    imageObj={imageObj1}
                    setImageObj={setImageObj1}
                    errors={errors}
                    register={register}
                    trigger={trigger}
                    name={"introImageOne"}
                    loader={loader}
                  />
                </Grid>
                <Grid item md={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h5">For Business</Typography>
                  </Box>
                  <Grid mb={4}>
                    <TextField
                      {...register("titleTwo")}
                      label="Title*"
                      disabled={loader}
                      error={!!errors.titleTwo}
                      helperText={
                        errors.titleTwo ? errors.titleTwo.message : ""
                      }
                      name="titleTwo"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid mb={4}>
                    <TextField
                      {...register("subtitleTwo")}
                      label="Subtitle*"
                      disabled={loader}
                      error={!!errors.subtitleTwo}
                      helperText={
                        errors.subtitleTwo ? errors.subtitleTwo.message : ""
                      }
                      name="subtitleTwo"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <UploadImage
                    setValue={setValue}
                    imageObj={imageObj2}
                    setImageObj={setImageObj2}
                    errors={errors}
                    register={register}
                    trigger={trigger}
                    name={"introImageTwo"}
                    loader={loader}
                  />
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

export default WebProductTeacherBusiness;
