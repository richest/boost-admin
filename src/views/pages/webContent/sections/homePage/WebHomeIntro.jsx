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
import { REQUEST_ACTION } from "redux/authenticate/actions";
import {
  getRequest,
  postRequest,
  putRequest,
} from "app/httpClient/axiosClient";
import { WEB_CONTENT } from "app/config/endpoints";
import toast from "react-hot-toast";
import { ApiErrorMessage } from "utils/helpers/function/apiErrorResonse";
import { RESPONSE_MESSAGES } from "app/constants/localizedStrings";
import UploadImage from "../../UploadImage";

const validationSchema = yup.object().shape({
  title: yup.string().trim().required(`Title is required.`),
  subtitle: yup.string().trim().required(`Subtitle is required.`),
  sectionOneTitle: yup.string().trim().required(`Title is required.`),
  sectionOneSubtitle: yup.string().trim().required(`Subtitle is required.`),
  sectionTwoTitle: yup.string().trim().required(`Title is required.`),
  sectionTwoSubTitle: yup.string().trim().required(`Subtitle is required.`),
  mechanics: yup.string().trim().required(`This field is required.`),
  contentCreators: yup.string().trim().required(`This field is required.`),
  countriesCount: yup.string().trim().required(`This field is required.`),

  sectionOneDescription: yup
    .string()
    .trim()
    .required(`Description is required.`),
  sectionTwoDescription: yup
    .string()
    .trim()
    .required(`Description is required.`),
  sectionOneIntroImage: yup
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
  sectionTwoIntroImage: yup
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

const WebHomeIntro = () => {
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
  const { onChange, ...params } = register(
    "sectionOneIntroImage",
    "sectionTwoIntroImage"
  );

  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [connectionError, setConnectionError] = useState(false);
  const { loader, message, messageType } = useSelector(
    (state) => state.request
  );
  const [contentOne, setContentOne] = useState({});
  const [contentTwo, setContentTwo] = useState({});

  const updateContent = async (data) => {
    let payload = {
      key: "HOME_PAGE",
      section: "INTRO",
      value: JSON.stringify({
        title: data.title,
        subtitle: data.subtitle,
        sectionOneTitle: data.sectionOneTitle,
        sectionOneSubtitle: data.sectionOneSubtitle,
        sectionOneDescription: data.sectionOneDescription,
        sectionTwoTitle: data.sectionTwoTitle,
        sectionTwoSubTitle: data.sectionTwoSubTitle,
        sectionTwoDescription: data.sectionTwoDescription,
        sectionOneImg: imageObj1,
        sectionTwoImg: imageObj2,
        mechanics: data.mechanics,
        contentCreators: data.contentCreators,
        countriesCount: data.countriesCount,
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
          sectionOneDescription,
          sectionTwoDescription,
          title,
          subtitle,
          sectionOneTitle,
          sectionOneSubtitle,
          sectionTwoTitle,
          sectionTwoSubTitle,
          sectionOneImg,
          sectionTwoImg,
          mechanics,
          contentCreators,
          countriesCount,
        } = parseValue;
        setContentOne(sectionOneDescription);
        setContentTwo(sectionTwoDescription);
        setImageObj1(sectionOneImg);
        setImageObj2(sectionTwoImg);
        setValue("title", title);
        setValue("subtitle", subtitle);
        setValue("sectionOneSubtitle", sectionOneSubtitle);
        setValue("sectionOneTitle", sectionOneTitle);
        setValue("sectionTwoSubTitle", sectionTwoSubTitle);
        setValue("mechanics", mechanics);
        setValue("contentCreators", contentCreators);
        setValue("countriesCount", countriesCount);
        setValue("sectionTwoTitle", sectionTwoTitle);
        setValue("sectionOneDescription", sectionOneDescription);
        setValue("sectionTwoDescription", sectionTwoDescription);
        setValue(
          "sectionOneIntroImage",
          sectionOneImg?.uploaded_images?.upload_image_url
            ? [{ size: 100, type: "image/jpg" }]
            : {}
        );
        setValue(
          "sectionTwoIntroImage",
          sectionTwoImg?.uploaded_images?.upload_image_url
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
      setConnectionError(true);
      setErrorMessage(_errorMessage);
      setLoading(false);
    }
    dispatch({ type: REQUEST_ACTION.INIT_LOADER, payload: { loader: false } });
    // NProgress.done();
  }
  const getContent = () => {
    getWebContent(`${WEB_CONTENT.GET}?key=HOME_PAGE&section=INTRO`);
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
            <h3
              style={{ margin: "0", fontWeight: "500", marginBottom: "20px" }}
            >
              Home Introduction
            </h3>
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

              <Grid mb={3}>
                <TextField
                  {...register("mechanics")}
                  label="Mechanics*"
                  disabled={loader}
                  error={!!errors.mechanics}
                  helperText={errors.mechanics ? errors.mechanics.message : ""}
                  name="mechanics"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid mb={3}>
                <TextField
                  {...register("contentCreators")}
                  label="Total content creators"
                  disabled={loader}
                  error={!!errors.contentCreators}
                  helperText={
                    errors.contentCreators ? errors.contentCreators.message : ""
                  }
                  name="contentCreators"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid mb={3}>
                <TextField
                  {...register("countriesCount")}
                  label="Total countries*"
                  disabled={loader}
                  error={!!errors.countriesCount}
                  helperText={
                    errors.countriesCount ? errors.countriesCount.message : ""
                  }
                  name="countriesCount"
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
                    <Typography variant="h5">Learning Section</Typography>
                  </Box>
                  <Grid mb={4}>
                    <TextField
                      {...register("sectionOneTitle")}
                      label="Title*"
                      disabled={loader}
                      error={!!errors.sectionOneTitle}
                      helperText={
                        errors.sectionOneTitle
                          ? errors.sectionOneTitle.message
                          : ""
                      }
                      name="sectionOneTitle"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid mb={4}>
                    <TextField
                      {...register("sectionOneSubtitle")}
                      label="Subtitle*"
                      disabled={loader}
                      error={!!errors.sectionOneSubtitle}
                      helperText={
                        errors.sectionOneSubtitle
                          ? errors.sectionOneSubtitle.message
                          : ""
                      }
                      name="sectionOneSubtitle"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid mb={4}>
                    <div
                      className={
                        errors.sectionOneDescription
                          ? "errorCkEditor description_div"
                          : "description_div"
                      }
                    >
                      <CKEditor
                        name="sectionOneDescription"
                        style={{
                          position: "relative",
                          zIndex: "20",
                        }}
                        config={{
                          placeholder: "Description*",
                          toolbar: {
                            items: [
                              "heading",
                              "|",
                              "bold",
                              "italic",
                              "link",
                              "bulletedList",
                              "numberedList",
                              "|",
                              "blockQuote",
                              "insertTable",
                              "|",
                              "undo",
                              "redo",
                            ],
                          },
                        }}
                        editor={ClassicEditor}
                        data={contentOne}
                        onChange={(event, editor) => {
                          setValue("sectionOneDescription", editor.getData());
                          trigger("sectionOneDescription");
                        }}
                        onReady={(editor) => {
                          editor.editing.view.change((writer) => {
                            writer.setStyle(
                              "height",
                              "100%",
                              editor.editing.view.document.getRoot()
                            );
                          });
                        }}
                      />
                    </div>
                    {errors.sectionOneDescription ? (
                      <FormHelperText error>
                        {errors.sectionOneDescription.message}
                      </FormHelperText>
                    ) : (
                      ""
                    )}
                  </Grid>

                  <UploadImage
                    setValue={setValue}
                    imageObj={imageObj1}
                    setImageObj={setImageObj1}
                    errors={errors}
                    register={register}
                    trigger={trigger}
                    name={"sectionOneIntroImage"}
                    loader={loader}
                  />
                </Grid>
                <Grid item md={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h5">Gamify Section</Typography>
                  </Box>
                  <Grid mb={4}>
                    <TextField
                      {...register("sectionTwoTitle")}
                      label="Title*"
                      disabled={loader}
                      error={!!errors.sectionTwoTitle}
                      helperText={
                        errors.sectionTwoTitle
                          ? errors.sectionTwoTitle.message
                          : ""
                      }
                      name="sectionTwoTitle"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid mb={4}>
                    <TextField
                      {...register("sectionTwoSubTitle")}
                      label="Subtitle*"
                      disabled={loader}
                      error={!!errors.sectionTwoSubTitle}
                      helperText={
                        errors.sectionTwoSubTitle
                          ? errors.sectionTwoSubTitle.message
                          : ""
                      }
                      name="sectionTwoSubTitle"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid mb={4}>
                    <div
                      className={
                        errors.sectionTwoDescription
                          ? "errorCkEditor description_div"
                          : "description_div"
                      }
                    >
                      <CKEditor
                        name="sectionTwoDescription"
                        style={{
                          position: "relative",
                          zIndex: "20",
                        }}
                        config={{
                          placeholder: "Description*",
                          toolbar: {
                            items: [
                              "heading",
                              "|",
                              "bold",
                              "italic",
                              "link",
                              "bulletedList",
                              "numberedList",
                              "|",
                              "blockQuote",
                              "insertTable",
                              "|",
                              "undo",
                              "redo",
                            ],
                          },
                        }}
                        editor={ClassicEditor}
                        data={contentTwo}
                        onChange={(event, editor) => {
                          setValue("sectionTwoDescription", editor.getData());
                          trigger("sectionTwoDescription");
                        }}
                        onReady={(editor) => {
                          editor.editing.view.change((writer) => {
                            writer.setStyle(
                              "height",
                              "100%",
                              editor.editing.view.document.getRoot()
                            );
                          });
                        }}
                      />
                    </div>
                    {errors.sectionTwoDescription ? (
                      <FormHelperText error>
                        {errors.sectionTwoDescription.message}
                      </FormHelperText>
                    ) : (
                      ""
                    )}
                  </Grid>

                  <UploadImage
                    setValue={setValue}
                    imageObj={imageObj2}
                    setImageObj={setImageObj2}
                    errors={errors}
                    register={register}
                    trigger={trigger}
                    name={"sectionTwoIntroImage"}
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

export default WebHomeIntro;
