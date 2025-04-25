import { Card, FormHelperText, Grid, Stack, TextField } from "@mui/material";
import {
  DEFAULT_APP_TITLE,
  DEFAULT_VALUE,
  RESPONSE_CODE,
  ROUTE_SLUGS,
} from "app/constants";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import WebBreadCrumbs from "../WebBreadCrumb";
import PageContainer from "components/admin-ui/container";
import AppHelmet from "components/admin-ui/helmet";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { WEB_CONTENT } from "app/config/endpoints";
import { REQUEST_ACTION } from "redux/authenticate/actions";
import { ApiErrorMessage } from "utils/helpers/function/apiErrorResonse";
import { RESPONSE_MESSAGES } from "app/constants/localizedStrings";
import { getRequest, putRequest } from "app/httpClient/axiosClient";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import UploadImage from "../UploadImage";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";

const validationSchema = yup.object().shape({
  title: yup.string().trim().required(`Title is required.`),
  description: yup.string().trim().required(`Description is required.`),
  missionTitle: yup.string().trim().required(`Title is required.`),
  missionDescription: yup.string().trim().required(`Description is required.`),
  introImage: yup
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

const AboutPage = () => {
  const dispatch = useDispatch();
  const { loader } = useSelector((state) => state.request);
  const [content, setContent] = useState({});
  const [contentMission, setContentMission] = useState({});
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
  const { onChange, ...params } = register("introImage");

  const updateContent = async (data) => {
    let payload = {
      key: "ABOUT_PAGE",
      section: "INTRO",
      value: JSON.stringify({
        title: data.title,
        description: data.description,
        missionTitle: data.missionTitle,
        missionDescription: data.missionDescription,
        introImage: imageObj1,
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
          description,
          introImage,
          missionTitle,
          missionDescription,
        } = parseValue;
        setImageObj1(introImage);
        setValue("title", title);
        setValue("description", description);
        setValue("missionTitle", missionTitle);
        setValue("missionDescription", missionDescription);
        setContent(description);
        setContentMission(missionDescription);
        setValue(
          "introImage",
          introImage?.uploaded_images?.upload_image_url
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
    getWebContent(`${WEB_CONTENT.GET}?key=ABOUT_PAGE&section=INTRO`);
  };

  useEffect(() => {
    getContent();
  }, []);

  return (
    <>
      <AppHelmet title={DEFAULT_APP_TITLE.WEB_CONTENT} />
      <PageContainer
        className="page-container users-page"
        heading={DEFAULT_APP_TITLE.WEB_CONTENT}
      >
        <WebBreadCrumbs
          breadcrumbs={[
            <Link
              style={{
                color: "rgb(99, 115, 129)",
                textDecoration: "none",
              }}
              to={ROUTE_SLUGS.DASHBOARD}
            >
              dashboard
            </Link>,
            <Link
              style={{
                color: "rgb(99, 115, 129)",
                textDecoration: "none",
              }}
              to={ROUTE_SLUGS.WEB_CONTENT}
            >
              {DEFAULT_APP_TITLE.WEB_CONTENT}
            </Link>,
            "About-Page",
          ]}
        />
        <Card sx={{ mt: 4, boxShadow: 3 }}>
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
                  style={{
                    margin: "0",
                    fontWeight: "500",
                    marginBottom: "20px",
                  }}
                >
                  About Page
                </h3>
                <form onSubmit={handleSubmit(updateContent)} noValidate>
                  <Grid mb={4}>
                    <UploadImage
                      setValue={setValue}
                      imageObj={imageObj1}
                      setImageObj={setImageObj1}
                      errors={errors}
                      register={register}
                      trigger={trigger}
                      name={"introImage"}
                      loader={loader}
                    />
                  </Grid>
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
                    <div
                      className={
                        errors.description
                          ? "errorCkEditor description_div"
                          : "description_div"
                      }
                    >
                      <CKEditor
                        name="description"
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
                        data={content}
                        onChange={(event, editor) => {
                          setValue("description", editor.getData());
                          trigger("description");
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
                    {errors.description ? (
                      <FormHelperText error>
                        {errors.description.message}
                      </FormHelperText>
                    ) : (
                      ""
                    )}
                  </Grid>

                  <Grid mb={4}>
                    <TextField
                      {...register("missionTitle")}
                      label="Title*"
                      disabled={loader}
                      error={!!errors.missionTitle}
                      helperText={
                        errors.missionTitle ? errors.missionTitle.message : ""
                      }
                      name="missionTitle"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid mb={4}>
                    <div
                      className={
                        errors.missionDescription
                          ? "errorCkEditor description_div"
                          : "description_div"
                      }
                    >
                      <CKEditor
                        name="missionDescription"
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
                        data={contentMission}
                        onChange={(event, editor) => {
                          setValue("missionDescription", editor.getData());
                          trigger("missionDescription");
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
                    {errors.missionDescription ? (
                      <FormHelperText error>
                        {errors.missionDescription.message}
                      </FormHelperText>
                    ) : (
                      ""
                    )}
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
        </Card>
      </PageContainer>
    </>
  );
};

export default AboutPage;
