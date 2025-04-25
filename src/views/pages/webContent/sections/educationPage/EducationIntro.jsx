import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Avatar,
  Card,
  FormHelperText,
  Grid,
  Tooltip,
  TextField,
  Typography,
  Stack,
  Skeleton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { LoadingButton } from "@mui/lab";
import { WEB_CONTENT } from "app/config/endpoints";
import { REQUEST_ACTION } from "redux/authenticate/actions";
import { ApiErrorMessage } from "utils/helpers/function/apiErrorResonse";
import { RESPONSE_CODE } from "app/constants";
import {
  getRequest,
  postRequest,
  putRequest,
} from "app/httpClient/axiosClient";
import toast from "react-hot-toast";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SendIcon from "@mui/icons-material/Send";
import { Box } from "@mui/system";

const validationSchema = yup.object().shape({
  title: yup.string().trim().required(`Title is required.`),
  subtitle: yup.string().trim().required(`Subtitle is required.`),
  description: yup.string().trim().required(`Description is required.`),
  introImage: yup.array().of(
    yup
      .mixed()
      .test(
        "required",
        "Image is required.",
        (value) => value && value.length > 0
      )
      .test("fileSize", "Image's size cannot be more than 5 MB", (value) => {
        return value && value[0].size <= 5242880;
      })
      .test(
        "fileType",
        "Only *.jpeg, *.jpg, *.png type of images are allowed.",
        (value) => {
          return (
            value &&
            ["image/jpeg", "image/png", "image/jpg"].includes(value[0].type)
          );
        }
      )
  ),
});

const EducationIntro = () => {
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

  // Initialize imageObj as an empty array
  const [imageObj, setImageObj] = useState([]);
  const [content, setContent] = useState("");

  const dispatch = useDispatch();
  const { loader } = useSelector((state) => state.request);

  const deleteImage = async (id) => {
    const payload = {
      upload_image_response_id: id,
    };
    try {
      dispatch({ type: REQUEST_ACTION.PROCESSING });
      const {
        status,
        data: { message },
      } = await postRequest(WEB_CONTENT.DELETE_IMAGE, payload);

      if (status === RESPONSE_CODE[200]) {
        setImageObj((prev) =>
          prev.filter(
            (image) => image.uploaded_images?.upload_image_response_id !== id
          )
        );
        dispatch({ type: REQUEST_ACTION.SUCCESS });
        toast.success(message);
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

  const uploadImage = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) {
      return;
    }
    if (imageObj.length > 0) {
      await deleteImage(imageObj[0].uploaded_images?.upload_image_response_id);
    }

    const promises = files.map(async (file) => {
      const formData = new FormData();
      formData.append("upload_image", file);

      try {
        dispatch({ type: REQUEST_ACTION.PROCESSING });
        const {
          status,
          data: { message, data },
        } = await postRequest(WEB_CONTENT.UPLOAD_IMAGE, formData);

        if (status === RESPONSE_CODE[200]) {
          setImageObj((prev) => [...prev, data]);
          dispatch({ type: REQUEST_ACTION.SUCCESS });
          toast.success(message);
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
    });
    await Promise.all(promises);
  };

  const updateContent = async (data) => {
    const payload = {
      key: "EDUCATION_PAGE",
      section: "INTRO",
      value: JSON.stringify({
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
        introImage: imageObj,
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

  const getContent = async () => {
    try {
      dispatch({ type: REQUEST_ACTION.INIT_LOADER, payload: { loader: true } });
      const response = await getRequest(
        `${WEB_CONTENT.GET}?key=EDUCATION_PAGE&section=INTRO`
      );
      const { status, data } = response;

      if (status === RESPONSE_CODE[200]) {
        const parseValue = JSON?.parse(data?.data.value);
        const { description, title, subtitle, introImage } = parseValue;
        setImageObj(introImage || []);
        setValue("title", title);
        setValue("subtitle", subtitle);
        setValue("description", description);
        setContent(description);
      }
    } catch (error) {
      console.error("Error fetching content:", error);
    } finally {
      dispatch({
        type: REQUEST_ACTION.INIT_LOADER,
        payload: { loader: false },
      });
    }
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
                    disabled={loader}
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
                  {errors.description && (
                    <FormHelperText error>
                      {errors.description.message}
                    </FormHelperText>
                  )}
                </div>
              </Grid>

              <Grid container spacing={2}>
                {imageObj?.map((image) => (
                  <Grid
                    item
                    key={image.uploaded_images?.upload_image_response_id}
                    xs={12}
                    sm={6}
                    md={4}
                    position="relative"
                  >
                    {loader ? (
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height="15em"
                      />
                    ) : (
                      <img
                        src={image?.uploaded_images?.upload_image_url}
                        alt="Uploaded"
                        style={{
                          width: "100%",
                          height: "15em",
                          objectFit: "cover",
                          borderRadius: "4px",
                        }}
                      />
                    )}
                    <CancelTwoToneIcon
                      onClick={() =>
                        deleteImage(
                          image.uploaded_images?.upload_image_response_id
                        )
                      }
                      sx={{
                        position: "absolute",
                        top: 5,
                        right: -5,
                        cursor: "pointer",
                        color: "red",
                        background: "#fff",
                        borderRadius: "50%",
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                my={2}
              >
                <Box>
                  <Typography variant="h5" color="text.primary">
                    Upload Image(Image Slider)
                  </Typography>
                  <label
                    htmlFor="file-upload"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      paddingTop: "10px",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      id="file-upload"
                      type="file"
                      multiple
                      onChange={uploadImage}
                      accept="image/jpeg,image/png,image/jpg"
                      style={{ display: "none" }}
                    />
                    <Tooltip title="Add Images">
                      <Avatar
                        sx={{ bgcolor: "#E5E8E8", width: 60, height: 60 }}
                      >
                        <AddPhotoAlternateIcon sx={{ color: "#20a2b8" }} />
                      </Avatar>
                    </Tooltip>
                  </label>
                </Box>
              </Stack>
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

export default EducationIntro;
