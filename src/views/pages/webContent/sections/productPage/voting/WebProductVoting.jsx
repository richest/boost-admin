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
import { DEFAULT_CSS, DEFAULT_VALUE, RESPONSE_CODE } from "app/constants";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SendIcon from "@mui/icons-material/Send";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { WEB_CONTENT } from "app/config/endpoints";
import { REQUEST_ACTION } from "redux/authenticate/actions";
import { ApiErrorMessage } from "utils/helpers/function/apiErrorResonse";
import { RESPONSE_MESSAGES } from "app/constants/localizedStrings";
import { getRequest, putRequest } from "app/httpClient/axiosClient";
import toast from "react-hot-toast";
import UploadImage from "views/pages/webContent/UploadImage";

const validationSchema = yup.object().shape({
  title: yup.string().trim().required(`Title is required.`),
  description: yup.string().trim().required(`Description is required.`),
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

const WebProductVoting = ({ name }) => {
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
  const { onChange, ...params } = register("introImage");

  const updateContent = async (data) => {
    let payload = {
      key: name,
      section: "VOTING",
      value: JSON.stringify({
        title: data.title,
        description: data.description,
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
        const { title, description, introImage } = parseValue;
        setImageObj1(introImage);
        setValue("title", title);
        setValue("description", description);
        setContent(description);
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
    getWebContent(`${WEB_CONTENT.GET}?key=${name}&section=VOTING`);
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
                    data={content || ""}
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

export default WebProductVoting;
