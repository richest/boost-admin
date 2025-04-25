import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  FormHelperText,
  Grid,
  Skeleton,
  Stack,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import SendIcon from "@mui/icons-material/Send";
import { REQUEST_ACTION } from "redux/authenticate/actions";
import { getRequest, putRequest } from "app/httpClient/axiosClient";
import { WEB_CONTENT } from "app/config/endpoints";
import { DEFAULT_VALUE, RESPONSE_CODE } from "app/constants";
import { ApiErrorMessage } from "utils/helpers/function/apiErrorResonse";
import { RESPONSE_MESSAGES } from "app/constants/localizedStrings";
import { useNavigate } from "react-router-dom";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import toast from "react-hot-toast";

const validationSchema = yup.object().shape({
  copyright: yup.string().trim().required(`Copyright is required.`),
  descriptionOne: yup.string().trim().required(`Description is required.`),
  descriptionTwo: yup.string().trim().required(`Description is required.`),
});
const WebFooterCopyright = () => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [connectionError, setConnectionError] = useState(false);
  const { loader, message, messageType } = useSelector(
    (state) => state.request
  );
  const [contentOne, setContentOne] = useState({});
  const [contentTwo, setContentTwo] = useState({});
  const naviage = useNavigate();
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
      key: "HEADER_FOOTER",
      section: "CONTENT",
      value: JSON.stringify({
        copyright: data.copyright,
        descriptionOne: data.descriptionOne,
        descriptionTwo: data.descriptionTwo,
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
    NProgress.start();
    dispatch({ type: REQUEST_ACTION.INIT_LOADER, payload: { loader: true } });
    let _errorMessage;
    const LOCALE = DEFAULT_VALUE.LOCALE;
    try {
      const response = await getRequest(url);
      const { status } = response;
      const { data, success } = response.data;
      if (success && status === RESPONSE_CODE[200]) {
        const parseValue = JSON.parse(data?.value);
        const { descriptionOne, descriptionTwo, copyright } = parseValue;
        setContentOne(descriptionOne);
        setContentTwo(descriptionTwo);
        setValue("copyright", copyright);
        setValue("descriptionOne", descriptionOne);
        setValue("descriptionTwo", descriptionTwo);
      } else {
        setErrorMessage(RESPONSE_MESSAGES[LOCALE].FETCHING_USERS_LIST);
      }
      NProgress.done();
    } catch (error) {
      NProgress.done();

      _errorMessage = ApiErrorMessage(error);
      setConnectionError(true);
      setErrorMessage(_errorMessage);
      setLoading(false);
    }
    dispatch({ type: REQUEST_ACTION.INIT_LOADER, payload: { loader: false } });
    NProgress.done();

  }
  const getContent = () => {
    getWebContent(`${WEB_CONTENT.GET}?key=HEADER_FOOTER&section=CONTENT`);
  };

  useEffect(() => {
    getContent();
  }, []);

  useEffect(() => {
    if (loader) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [loader]);

  return (
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
          <h3 style={{ margin: "0", fontWeight: "500", marginBottom: "20px" }}>
            Footer copyright & descriptions
          </h3>
          <form onSubmit={handleSubmit(updateContent)} noValidate>
            <Grid mb={4}>
              {loader ? (
                <Skeleton height={60} />
              ) : (
                <TextField
                  {...register("copyright")}
                  label="Copyright*"
                  disabled={loader}
                  error={!!errors.copyright}
                  helperText={errors.copyright ? errors.copyright.message : ""}
                  name="copyright"
                  variant="outlined"
                  fullWidth
                />
              )}
            </Grid>
            <Grid mb={4}>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                spacing={2}
              >
                <Grid item md={6}>
                  {loader ? (
                    <Skeleton variant="rectangular" width="100%" height={290} />
                  ) : (
                    <>
                      <div
                        className={
                          errors.descriptionOne
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
                          data={contentOne}
                          onChange={(event, editor) => {
                            setValue("descriptionOne", editor.getData());
                            trigger("descriptionOne");
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
                      {errors.descriptionOne ? (
                        <FormHelperText error>
                          {errors.descriptionOne.message}
                        </FormHelperText>
                      ) : (
                        ""
                      )}
                    </>
                  )}
                </Grid>
                <Grid item md={6}>
                  {loader ? (
                    <Skeleton variant="rectangular" width="100%" height={290} />
                  ) : (
                    <>
                      <div
                        className={
                          errors?.descriptiontwo
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
                          data={contentTwo}
                          onChange={(event, editor) => {
                            setValue("descriptionTwo", editor.getData());
                            trigger("descriptionTwo");
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
                      {errors.descriptionTwo ? (
                        <FormHelperText error>
                          {errors.descriptionTwo.message}
                        </FormHelperText>
                      ) : (
                        ""
                      )}
                    </>
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
  );
};

export default WebFooterCopyright;
