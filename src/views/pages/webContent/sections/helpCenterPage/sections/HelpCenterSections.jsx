import { useEffect, useState, useCallback } from "react";
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
import { DEFAULT_CSS, RESPONSE_CODE, ROUTE_SLUGS } from "app/constants";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SendIcon from "@mui/icons-material/Send";
import { WEB_CONTENT } from "app/config/endpoints";
import { REQUEST_ACTION } from "redux/authenticate/actions";
import { ApiErrorMessage } from "utils/helpers/function/apiErrorResonse";
import toast from "react-hot-toast";
import {
  getRequest,
  postRequest,
  putRequest,
} from "app/httpClient/axiosClient";
import { RESPONSE_MESSAGES } from "app/constants/localizedStrings";
import { Box } from "@mui/system";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const validationSchema = yup.object().shape({
  section: yup.array().of(
    yup.object().shape({
      title: yup.string().trim().required("Title is required."),
      subtitle: yup.string().trim().required("Subtitle is required."),
      icon: yup
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

const HelpCenterSections = () => {
  const dispatch = useDispatch();
  const { loader } = useSelector((state) => state.request);
  const [errorMessage, setErrorMessage] = useState("");

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
      section: [
        {
          title: "",
          subtitle: "",
          icon: null,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "section",
  });

  const [imageObj, setImageObj] = useState([]);

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
        setValue(`section[${index}].icon`, null); // Clear the icon value in the form state
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

        setValue(`section[${index}].icon`, { ...data, size: file.size }); // Update form state with uploaded image
        await trigger(`section[${index}].icon`); // Validate the updated field
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
    const payload = {
      key: "HELP_CENTER",
      section: "SECTION",
      value: JSON.stringify(
        {
          section: data.section,
        }
        // data.section.map((sec, index) => ({
        //   title: sec.title,
        //   subtitle: sec.subtitle,
        //   icon: imageObj[index], // Ensure the icon info is pulled from imageObj
        // }))
      ),
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
        toast.success(message); // Show success toast
        getContent();
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

  const getWebContent = async (url) => {
    dispatch({ type: REQUEST_ACTION.INIT_LOADER, payload: { loader: true } });
    try {
      const response = await getRequest(url);
      const { statusCode, data, success } = response.data;
      if (success && statusCode === RESPONSE_CODE[200]) {
        const parseValue = JSON.parse(data?.value);
        const { section } = parseValue;
        setImageObj(section.map((sec) => sec.icon || null));
        setValue("section", section);
      } else {
        throw new Error(RESPONSE_MESSAGES.DEFAULT.FETCHING_USERS_LIST);
      }
    } catch (error) {
      setErrorMessage(ApiErrorMessage(error));
    } finally {
      dispatch({
        type: REQUEST_ACTION.INIT_LOADER,
        payload: { loader: false },
      });
    }
  };

  const getContent = useCallback(() => {
    getWebContent(`${WEB_CONTENT.GET}?key=HELP_CENTER&section=SECTION`);
  }, []);

  useEffect(() => {
    getContent();
  }, [getContent]);

  return (
    <>
      <Grid container spacing={2} my={2}>
        <Grid item md={12}>
          <Card className="profile-right-section" sx={{ p: 3 }}>
            <form onSubmit={handleSubmit(updateContent)} noValidate>
              <Grid container spacing={2} my={2}>
                {fields.map((field, index) => (
                  <Grid item md={4} key={field.id}>
                    <Link
                      state={{ name: field?.title }}
                      to={`${ROUTE_SLUGS.HELP_CENTER}/${field?.title?.replace(/[\s/&]+/g, "-").toLowerCase()}`}
                      style={{
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        paddingBottom: "10px",
                      }}
                    >
                      <Typography variant="h5">
                        {field?.title ? field?.title : `Section ${index + 1}`}
                      </Typography>
                      <Icon
                        icon="gg:arrow-right"
                        width="28"
                        height="28"
                        color="#121926"
                      />
                    </Link>
                    <Box
                      sx={{
                        border: "1px solid #bfc0c2",
                        borderRadius: "12px",
                        padding: "15px 10px",
                        position: "relative",
                      }}
                    >
                      {fields.length > 1 && (
                        <Tooltip placement="top" title="Click to remove card">
                          <CancelTwoToneIcon
                            sx={{
                              color: DEFAULT_CSS.ERROR_MSG_COLOR,
                              position: "absolute",
                              right: "-5px",
                              top: "-5px",
                              zIndex: "99",
                              cursor: "pointer",
                              fontSize: "18px",
                              background: "#fff",
                              borderRadius: "50%",
                            }}
                            onClick={() => {
                              remove(index);
                              setImageObj((prev) => {
                                const updatedImages = [...prev];
                                updatedImages[index] = null;
                                return updatedImages;
                              });
                            }}
                          />
                        </Tooltip>
                      )}
                      <Grid mb={2}>
                        <TextField
                          {...register(`section[${index}].title`)}
                          label="Title*"
                          disabled={loader}
                          error={!!errors?.section?.[index]?.title}
                          helperText={
                            errors?.section?.[index]?.title?.message || ""
                          }
                          variant="outlined"
                          fullWidth
                        />
                      </Grid>
                      <Grid mb={2}>
                        <TextField
                          {...register(`section[${index}].subtitle`)}
                          label="Subtitle*"
                          disabled={loader}
                          error={!!errors?.section?.[index]?.subtitle}
                          helperText={
                            errors?.section?.[index]?.subtitle?.message || ""
                          }
                          variant="outlined"
                          fullWidth
                        />
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
                                  trigger(`section[${index}].icon`);
                                }}
                              />
                            </Tooltip>
                            <Avatar
                              sx={{
                                width: "auto",
                                height: "10em",
                                border: `2.5px dashed ${
                                  errors[`section[${index}].icon`]
                                    ? "#ff4842"
                                    : "#20A2B8"
                                }`,
                                color: `${errors[`section[${index}].icon`] ? "#ff4842" : "#fff"}`,
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
                                    errors[`section[${index}].icon`]
                                      ? "#ff4842"
                                      : "#20A2B8"
                                  }`,
                                  color: `${errors[`section[${index}].icon`] ? "#ff4842" : "#fff"}`,
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
                                        errors[`section[${index}].icon`]
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
                                    Allowed *.jpeg, *.jpg, *.png max size of 5
                                    MB.
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
                                trigger(`section[${index}].icon`);
                              }}
                            />
                          </label>
                        )}

                        {errors[`section[${index}].icon`] && (
                          <FormHelperText error={true}>
                            {errors[`section[${index}].icon`].message || ""}
                          </FormHelperText>
                        )}
                      </Grid>
                    </Box>
                  </Grid>
                ))}
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  // spacing={2}
                  mt={2}
                >
                  <Button
                    onClick={() =>
                      append({ title: "", subtitle: "", icon: null })
                    }
                    type="button"
                  >
                    <Icon icon="basil:add-outline" width="32" height="32" />
                  </Button>
                </Grid>
              </Grid>

              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                mt={2}
              >
                <LoadingButton
                  type="submit"
                  variant="contained"
                  endIcon={<SendIcon />}
                  loading={loader}
                  sx={{ mt: 2 }}
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

export default HelpCenterSections;
