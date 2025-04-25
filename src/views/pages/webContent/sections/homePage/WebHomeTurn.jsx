import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  FormHelperText,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import { Box } from "@mui/system";
import { REQUEST_ACTION } from "redux/authenticate/actions";
import { getRequest, putRequest } from "app/httpClient/axiosClient";
import { WEB_CONTENT } from "app/config/endpoints";
import { DEFAULT_VALUE, RESPONSE_CODE } from "app/constants";
import toast from "react-hot-toast";
import { ApiErrorMessage } from "utils/helpers/function/apiErrorResonse";
import { RESPONSE_MESSAGES } from "app/constants/localizedStrings";

const validationSchema = yup.object().shape({
  title: yup.string().trim().required(`Title is required.`),
  subtitle: yup.string().trim().required(`Subtitle is required.`),
  reviewDescription: yup.string().trim().required(`Description is required.`),
  forbesDescription: yup.string().trim().required(`Description is required.`),
  financeDescription: yup.string().trim().required(`Description is required.`),
});

const WebHomeTurn = () => {
  const dispatch = useDispatch();
  const { loader } = useSelector((state) => state.request);
  const [content1, setContent1] = useState({});
  const [content2, setContent2] = useState({});
  const [content3, setContent3] = useState({});
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
      section: "TURN",
      value: JSON.stringify({
        title: data.title,
        subtitle: data.subtitle,
        reviewDescription: data.reviewDescription,
        forbesDescription: data.forbesDescription,
        financeDescription: data.financeDescription,
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
          subtitle,
          reviewDescription,
          forbesDescription,
          financeDescription,
        } = parseValue;
        setValue("title", title);
        setValue("subtitle", subtitle);
        setValue("reviewDescription", reviewDescription);
        setValue("forbesDescription", forbesDescription);
        setValue("financeDescription", financeDescription);
        setContent1(reviewDescription);
        setContent2(forbesDescription);
        setContent3(financeDescription);
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
    getWebContent(`${WEB_CONTENT.GET}?key=HOME_PAGE&section=TURN`);
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

              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={2}
                my={2}
              >
                <Grid item md={4}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h5">Review Section</Typography>
                  </Box>
                  <Grid mb={4}>
                    <div
                      className={
                        errors.reviewDescription
                          ? "errorCkEditor description_div"
                          : "description_div"
                      }
                    >
                      <CKEditor
                        name="reviewDescription"
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
                        data={content1}
                        onChange={(event, editor) => {
                          setValue("reviewDescription", editor.getData());
                          trigger("reviewDescription");
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
                    {errors.reviewDescription ? (
                      <FormHelperText error>
                        {errors.reviewDescription.message}
                      </FormHelperText>
                    ) : (
                      ""
                    )}
                  </Grid>
                </Grid>
                <Grid item md={4}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h5">Forbes Section</Typography>
                  </Box>
                  <Grid mb={4}>
                    <div
                      className={
                        errors.forbesDescription
                          ? "errorCkEditor description_div"
                          : "description_div"
                      }
                    >
                      <CKEditor
                        name="forbesDescription"
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
                        data={content2}
                        onChange={(event, editor) => {
                          setValue("forbesDescription", editor.getData());
                          trigger("forbesDescription");
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
                    {errors.forbesDescription ? (
                      <FormHelperText error>
                        {errors.forbesDescription.message}
                      </FormHelperText>
                    ) : (
                      ""
                    )}
                  </Grid>
                </Grid>
                <Grid item md={4}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h5">Finance Section</Typography>
                  </Box>
                  <Grid mb={4}>
                    <div
                      className={
                        errors.financeDescription
                          ? "errorCkEditor description_div"
                          : "description_div"
                      }
                    >
                      <CKEditor
                        name="financeDescription"
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
                        data={content3}
                        onChange={(event, editor) => {
                          setValue("financeDescription", editor.getData());
                          trigger("financeDescription");
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
                    {errors.financeDescription ? (
                      <FormHelperText error>
                        {errors.financeDescription.message}
                      </FormHelperText>
                    ) : (
                      ""
                    )}
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

export default WebHomeTurn;
