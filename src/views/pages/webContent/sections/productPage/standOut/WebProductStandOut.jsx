import { useEffect, useState } from "react";
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
import SendIcon from "@mui/icons-material/Send";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Box } from "@mui/system";
import { WEB_CONTENT } from "app/config/endpoints";
import { REQUEST_ACTION } from "redux/authenticate/actions";
import { ApiErrorMessage } from "utils/helpers/function/apiErrorResonse";
import { RESPONSE_MESSAGES } from "app/constants/localizedStrings";
import { DEFAULT_CSS, DEFAULT_VALUE, RESPONSE_CODE } from "app/constants";
import {
  getRequest,
  postRequest,
  putRequest,
} from "app/httpClient/axiosClient";
import toast from "react-hot-toast";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Icon } from "@iconify/react";

// Validation schema
const validationSchema = yup.object().shape({
  title: yup.string().trim().required("Title is required."),
  subtitle: yup.string().trim().required("Subtitle is required."),
  sections: yup.array().of(
    yup.object().shape({
      subtitle: yup.string().trim().required("Subtitle is required."),
      description: yup.string().trim().required("Description is required."),
      introImage: yup
        .mixed()
        .nullable()
        .test(
          "fileType",
          "Only *.jpeg, *.jpg, *.png type of images are allowed.",
          (value) => {
            if (value && value.uploaded_images) return true;
            return value
              ? ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
              : true;
          }
        )
        .test("fileSize", "Image's size cannot be more than 5 MB", (value) => {
          if (value && value.uploaded_images) return true;
          return value ? value.size <= 5242880 : true;
        }),
    })
  ),
});

const WebProductStandOut = ({ name }) => {
  const dispatch = useDispatch();
  const { loader } = useSelector((state) => state.request);

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
      sections: [
        {
          subtitle: "",
          description: "",
          introImage: null,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections",
  });

  const [imageObj, setImageObj] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const deleteImage = async (id, index) => {
    const payload = { upload_image_response_id: id };
    try {
      dispatch({ type: REQUEST_ACTION.PROCESSING });
      const {
        status,
        data: { message },
      } = await postRequest(WEB_CONTENT.DELETE_IMAGE, payload);
      if (status === RESPONSE_CODE[200]) {
        setImageObj((prev) => {
          const updatedImages = [...prev];
          updatedImages[index] = null; // Clear the image for the current section
          return updatedImages;
        });
        setValue(`sections[${index}].introImage`, null); // Clear the icon value in the form state
        dispatch({ type: REQUEST_ACTION.SUCCESS, payload: {} });
        toast.success(message); // Show success toast
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

  const uploadImage = async (event, index) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("upload_image", file);

    try {
      dispatch({ type: REQUEST_ACTION.PROCESSING });
      const {
        status,
        data: { message, data },
      } = await postRequest(WEB_CONTENT.UPLOAD_IMAGE, formData);

      if (status === RESPONSE_CODE[200]) {
        setImageObj((prev) => {
          const updatedImages = [...prev];
          updatedImages[index] = { ...data, size: file.size };
          return updatedImages;
        });

        setValue(`sections[${index}].introImage`, { ...data, size: file.size }); // Update form state with uploaded image
        await trigger(`sections[${index}].introImage`); // Validate the updated field
        dispatch({ type: REQUEST_ACTION.SUCCESS, payload: {} });
        toast.success(message);
      } else {
        throw new Error(ApiErrorMessage());
      }
    } catch (error) {
      dispatch({
        type: REQUEST_ACTION.FAILURE,
        payload: { message: ApiErrorMessage(error) },
      });
    }
  };

  const updateContent = async (data) => {
    let payload = {
      key: name,
      section: "STAND_OUT",
      value: JSON.stringify({
        title: data.title,
        subtitle: data.subtitle,
        sections: data.sections,
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
        const { title, subtitle, sections } = parseValue;
        setValue("title", title);
        setValue("sections", sections);
        setValue("subtitle", subtitle);
        setImageObj(sections.map((sec) => sec.introImage || null));
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
    getWebContent(`${WEB_CONTENT.GET}?key=${name}&section=STAND_OUT`);
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
                  helperText={errors.title?.message}
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
                  helperText={errors.subtitle?.message}
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
                {fields.map((item, index) => (
                  <Grid item md={6} key={item.id}>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="h5">{`Section ${index + 1}`}</Typography>
                    </Box>
                    <Grid mb={4}>
                      <TextField
                        {...register(`sections[${index}].subtitle`)}
                        label="Section Title*"
                        disabled={loader}
                        error={!!errors?.sections?.[index]?.subtitle}
                        helperText={
                          errors?.sections?.[index]?.subtitle?.message
                        }
                        name={`sections[${index}].subtitle`}
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid mb={4}>
                      <div
                        className={
                          errors?.sections?.[index]?.description
                            ? "errorCkEditor description_div"
                            : "description_div"
                        }
                      >
                        <CKEditor
                          editor={ClassicEditor}
                          data={item.description}
                          onChange={(event, editor) => {
                            setValue(
                              `sections[${index}].description`,
                              editor.getData()
                            );
                            trigger(`sections[${index}].description`);
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
                      {errors?.sections?.[index]?.description && (
                        <FormHelperText error>
                          {errors.sections[index].description.message}
                        </FormHelperText>
                      )}
                    </Grid>

                    <Grid position="relative" mb={2}>
                      {imageObj[index]?.uploaded_images?.upload_image_url ? (
                        <>
                          <Tooltip
                            title="Click to remove image"
                            placement="top"
                          >
                            <CancelTwoToneIcon
                              sx={{
                                color: DEFAULT_CSS.ERROR_MSG_COLOR,
                                position: "absolute",
                                top: -5,
                                right: -5,
                                cursor: "pointer",
                                fontSize: "18px",
                                zIndex: 99,
                                background: "white",
                                borderRadius: "50%",
                              }}
                              onClick={() => {
                                if (
                                  imageObj[index]?.uploaded_images
                                    ?.upload_image_response_id
                                ) {
                                  deleteImage(
                                    imageObj[index].uploaded_images
                                      .upload_image_response_id,
                                    index
                                  );
                                }
                                trigger(`sections[${index}].introImage`);
                              }}
                            />
                          </Tooltip>
                          <Avatar
                            sx={{
                              width: "auto",
                              height: "10em",
                              border: `2.5px dashed ${
                                errors[`sections[${index}].introImage`]
                                  ? "#ff4842"
                                  : "#20A2B8"
                              }`,
                              color: `${errors[`sections[${index}].introImage`] ? "#ff4842" : "#fff"}`,
                              cursor: "pointer",
                              backgroundColor: "#e6ecec",
                            }}
                            variant="rounded"
                            src={
                              imageObj[index].uploaded_images.upload_image_url
                            }
                            className="create-blog-image"
                          />
                        </>
                      ) : (
                        <label htmlFor={`icon-upload-${index}`}>
                          {loader ? (
                            <Skeleton
                              variant="rectangular"
                              width="100%"
                              height="10em"
                            />
                          ) : (
                            <Avatar
                              sx={{
                                width: "auto",
                                height: "10em",
                                border: `2.5px dashed ${
                                  errors[`sections[${index}].introImage`]
                                    ? "#ff4842"
                                    : "#20A2B8"
                                }`,
                                color: `${errors[`sections[${index}].introImage`] ? "#ff4842" : "#fff"}`,
                                cursor: "pointer",
                                backgroundColor: "#e6ecec",
                              }}
                              variant="rounded"
                            >
                              <Stack
                                container
                                alignItems="center"
                                justifyContent="center"
                              >
                                <AddPhotoAlternateIcon
                                  sx={{
                                    fontSize: "3em",
                                    color: `${
                                      errors[`sections[${index}].introImage`]
                                        ? "#ff4842"
                                        : DEFAULT_CSS.PRIMARY_COLOR
                                    }`,
                                  }}
                                />
                                <Typography
                                  color={DEFAULT_CSS.PRIMARY_COLOR}
                                  variant="h4"
                                >
                                  Upload file
                                </Typography>
                                <FormHelperText error={false}>
                                  Allowed *.jpeg, *.jpg, *.png max size of 5 MB.
                                </FormHelperText>
                              </Stack>
                            </Avatar>
                          )}

                          <input
                            accept="image/*"
                            id={`icon-upload-${index}`}
                            type="file"
                            style={{ display: "none" }}
                            onChange={(e) => {
                              uploadImage(e, index);
                              trigger(`sections[${index}].introImage`);
                            }}
                          />
                        </label>
                      )}

                      {errors[`sections[${index}].introImage`] && (
                        <FormHelperText error={true}>
                          {errors[`sections[${index}].introImage`].message ||
                            ""}
                        </FormHelperText>
                      )}
                    </Grid>

                    {errors?.sections?.[index]?.introImage && (
                      <FormHelperText error>
                        {errors.sections[index].introImage.message}
                      </FormHelperText>
                    )}
                    {fields.length > 1 && (
                      <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        // spacing={2}
                        mt={2}
                      >
                        <Button
                          type="button"
                          onClick={() => {
                            remove(index);
                            setImageObj((prev) => {
                              const updatedImages = [...prev];
                              updatedImages[index] = null;
                              return updatedImages;
                            });
                          }}
                          color="error"
                        >
                          Remove Section
                        </Button>
                      </Grid>
                    )}
                  </Grid>
                ))}
              </Grid>

              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                // spacing={2}
                mt={2}
              >
                <Button
                  type="button"
                  onClick={() =>
                    append({ subtitle: "", description: "", introImage: null })
                  }
                >
                  <Icon icon="basil:add-outline" width="32" height="32" />
                </Button>
              </Grid>

              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                my={2}
              >
                <LoadingButton
                  loading={loader}
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

export default WebProductStandOut;
