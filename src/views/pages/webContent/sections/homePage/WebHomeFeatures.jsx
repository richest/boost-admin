import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Button,
  Card,
  FormHelperText,
  Grid,
  IconButton,
  Skeleton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { DEFAULT_CSS, DEFAULT_VALUE, RESPONSE_CODE } from "app/constants";
import { LoadingButton } from "@mui/lab";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SendIcon from "@mui/icons-material/Send";
import { Box } from "@mui/system";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Icon } from "@iconify/react";
import UploadImage from "../../UploadImage";
import { WEB_CONTENT } from "app/config/endpoints";
import { REQUEST_ACTION } from "redux/authenticate/actions";
import { RESPONSE_MESSAGES } from "app/constants/localizedStrings";
import {
  getRequest,
  postRequest,
  putRequest,
} from "app/httpClient/axiosClient";
import { ApiErrorMessage } from "utils/helpers/function/apiErrorResonse";
import toast from "react-hot-toast";

const validationSchema = yup.object().shape({
  title: yup.string().trim().required(`Title is required.`),
  subtitle: yup.string().trim().required(`Subtitle is required.`),
  sectionOneTitle: yup.string().trim().required(`Title is required.`),
  sectionTwoTitle: yup.string().trim().required(`Title is required.`),

  leftCards: yup.array().of(
    yup.object().shape({
      heading: yup.string().trim().required("Subtitle is required."),
      para: yup.string().trim().required("Description is required."),
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
  rightCards: yup.array().of(
    yup.object().shape({
      heading: yup.string().trim().required("Subtitle is required."),
      para: yup.string().trim().required("Description is required."),
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
    .test("required", "Image is required.", (value) => value?.length > 0)
    .test("fileSize", "Image's sizie can not be more than 5 MB", (value) => {
      return value?.length && value[0].size <= 5242880;
    })
    .test(
      "fileType",
      "Only *.jpeg, *.jpg, *.png type of images are allowed.",
      (value) => {
        return (
          value?.length &&
          ["image/jpeg", "image/png", "image/jpg"].includes(value[0].type)
        );
      }
    ),
  sectionTwoIntroImage: yup
    .mixed()
    .test("required", "Image is required.", (value) => value?.length > 0)
    .test("fileSize", "Image's sizie can not be more than 5 MB", (value) => {
      return value?.length && value[0].size <= 5242880;
    })
    .test(
      "fileType",
      "Only *.jpeg, *.jpg, *.png type of images are allowed.",
      (value) => {
        return (
          value?.length &&
          ["image/jpeg", "image/png", "image/jpg"].includes(value[0].type)
        );
      }
    ),
});

const WebHomeFeatures = () => {
  const { loader } = useSelector((state) => state.request);

  const {
    control,
    register,
    setValue,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      leftCards: [{ heading: "", para: "", icon: null }],
      rightCards: [{ heading: "", para: "", icon: null }],
    },
  });
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);
  const [contentOne, setContentOne] = useState({});
  const [contentTwo, setContentTwo] = useState({});
  const [imageObj1, setImageObj1] = useState({});
  const [imageObj2, setImageObj2] = useState({});
  const [imageObjRight, setImageObjRight] = useState([]);
  const [imageObjLeft, setImageObjLeft] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [connectionError, setConnectionError] = useState(false);
  const { onChange, ...params } = register(
    "sectionOneIntroImage",
    "sectionTwoIntroImage"
  );

  const {
    fields: leftFields,
    append: appendLeft,
    remove: removeLeft,
  } = useFieldArray({
    control,
    name: "leftCards",
  });

  const {
    fields: rightFields,
    append: appendRight,
    remove: removeRight,
  } = useFieldArray({
    control,
    name: "rightCards",
  });

  const deleteImageLeft = async (id, index) => {
    const payload = { upload_image_response_id: id };
    try {
      dispatch({ type: REQUEST_ACTION.PROCESSING });
      const {
        status,
        data: { message },
      } = await postRequest(WEB_CONTENT.DELETE_IMAGE, payload);
      if (status === RESPONSE_CODE[200]) {
        setImageObjLeft((prev) => {
          const updatedImages = [...prev];
          updatedImages[index] = null;
          return updatedImages;
        });
        setValue(`leftCards[${index}].icon`, null);
        dispatch({ type: REQUEST_ACTION.SUCCESS, payload: {} });
        toast.success(message);
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

  const deleteImageRight = async (id, index) => {
    const payload = { upload_image_response_id: id };
    try {
      dispatch({ type: REQUEST_ACTION.PROCESSING });
      const {
        status,
        data: { message },
      } = await postRequest(WEB_CONTENT.DELETE_IMAGE, payload);
      if (status === RESPONSE_CODE[200]) {
        setImageObjRight((prev) => {
          const updatedImages = [...prev];
          updatedImages[index] = null;
          return updatedImages;
        });
        setValue(`rightCards[${index}].icon`, null);

        dispatch({ type: REQUEST_ACTION.SUCCESS, payload: {} });
        toast.success(message);
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

  const uploadImageLeft = async (event, index) => {
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
        setImageObjLeft((prev) => {
          const updatedImages = [...prev];
          updatedImages[index] = { ...data, size: file.size };
          return updatedImages;
        });
        setValue(`leftCards[${index}].icon`, { ...data, size: file.size });
        await trigger(`leftCards[${index}].icon`);

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

  const uploadImageRight = async (event, index) => {
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
        setImageObjRight((prev) => {
          const updatedImages = [...prev];
          updatedImages[index] = { ...data, size: file.size };
          return updatedImages;
        });
        setValue(`rightCards[${index}].icon`, { ...data, size: file.size });
        await trigger(`rightCards[${index}].icon`);

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
      key: "HOME_PAGE",
      section: "FEATURES",
      value: JSON.stringify({
        title: data.title,
        subtitle: data.subtitle,

        sectionOneTitle: data.sectionOneTitle,
        sectionOneDescription: data.sectionOneDescription,
        sectionOneIntroImage: imageObj1,

        sectionTwoTitle: data.sectionTwoTitle,
        sectionTwoDescription: data.sectionTwoDescription,
        sectionTwoIntroImage: imageObj2,

        leftCards: data.leftCards,
        rightCards: data.rightCards,
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
          sectionTwoTitle,
          sectionOneIntroImage,
          sectionTwoIntroImage,
          leftCards,
          rightCards,
        } = parseValue;
        setContentOne(sectionOneDescription);
        setContentTwo(sectionTwoDescription);
        setImageObj1(sectionOneIntroImage);
        setImageObj2(sectionTwoIntroImage);
        setValue("title", title);
        setValue("subtitle", subtitle);
        setValue("sectionOneTitle", sectionOneTitle);
        setValue("sectionTwoTitle", sectionTwoTitle);
        setValue("sectionOneDescription", sectionOneDescription);
        setValue("sectionTwoDescription", sectionTwoDescription);
        setValue("leftCards", leftCards);
        setValue("rightCards", rightCards);
        setImageObjLeft(leftCards.map((sec) => sec.icon || null));
        setImageObjRight(rightCards.map((sec) => sec.icon || null));
        setValue(
          "sectionOneIntroImage",
          sectionOneIntroImage?.uploaded_images?.upload_image_url
            ? [{ size: 100, type: "image/jpg" }]
            : {}
        );
        setValue(
          "sectionTwoIntroImage",
          sectionTwoIntroImage?.uploaded_images?.upload_image_url
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
    getWebContent(`${WEB_CONTENT.GET}?key=HOME_PAGE&section=FEATURES`);
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
                    <Typography variant="h5">Education Section</Typography>
                  </Box>

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

                  {leftFields.map((item, index) => (
                    <Card
                      sx={{
                        p: 2,
                        mb: 1,
                        border: "1px solid #c6c6c6",
                        position: "relative",
                      }}
                      key={item.id}
                    >
                      {leftFields.length > 1 && (
                        <Tooltip placement="top" title="Click to remove card">
                          <CancelTwoToneIcon
                            sx={{
                              color: DEFAULT_CSS.ERROR_MSG_COLOR,
                              position: "absolute",
                              right: 0,
                              top: 0,
                              zIndex: "9999",
                              cursor: "pointer",
                              fontSize: "18px",
                            }}
                            onClick={() => removeLeft(index)}
                          />
                        </Tooltip>
                      )}
                      <Grid position="relative" mb={2}>
                        {imageObjLeft[index]?.uploaded_images
                          ?.upload_image_url ? (
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
                                    imageObjLeft[index]?.uploaded_images
                                      ?.upload_image_response_id
                                  ) {
                                    deleteImageLeft(
                                      imageObjLeft[index].uploaded_images
                                        .upload_image_response_id,
                                      index
                                    );
                                  }
                                  trigger(`leftCards[${index}].icon`);
                                }}
                              />
                            </Tooltip>
                            <Avatar
                              sx={{
                                width: "auto",
                                height: "10em",
                                border: `2.5px dashed ${
                                  errors[`leftCards[${index}].icon`]
                                    ? "#ff4842"
                                    : "#20A2B8"
                                }`,
                                color: `${errors[`leftCards[${index}].icon`] ? "#ff4842" : "#fff"}`,
                                cursor: "pointer",
                                backgroundColor: "#e6ecec",
                              }}
                              variant="rounded"
                              src={
                                imageObjLeft[index].uploaded_images
                                  .upload_image_url
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
                                    errors[`leftCards[${index}].icon`]
                                      ? "#ff4842"
                                      : "#20A2B8"
                                  }`,
                                  color: `${errors[`leftCards[${index}].icon`] ? "#ff4842" : "#fff"}`,
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
                                        errors[`leftCards[${index}].icon`]
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
                              name={`icon-upload-${index}`}
                              style={{ display: "none" }}
                              onChange={(e) => {
                                onChange(e);
                                uploadImageLeft(e, index);
                                trigger(`leftCards[${index}].icon`);
                              }}
                            />
                          </label>
                        )}

                        {errors[`leftCards[${index}].icon`] && (
                          <FormHelperText error={true}>
                            {errors[`leftCards[${index}].icon`].message || ""}
                          </FormHelperText>
                        )}
                      </Grid>

                      {errors?.leftCards?.[index]?.icon && (
                        <FormHelperText error>
                          {errors.leftCards[index].icon.message}
                        </FormHelperText>
                      )}
                      <Grid mb={4}>
                        <Controller
                          name={`leftCards.${index}.heading`}
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Subtitle*"
                              variant="outlined"
                              fullWidth
                              error={!!errors.leftCards?.[index]?.heading}
                              helperText={
                                errors.leftCards?.[index]?.heading?.message
                              }
                            />
                          )}
                        />
                      </Grid>
                      <Grid mb={4}>
                        <Controller
                          name={`leftCards.${index}.para`}
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Description*"
                              variant="outlined"
                              fullWidth
                              error={!!errors.leftCards?.[index]?.para}
                              helperText={
                                errors.leftCards?.[index]?.para?.message
                              }
                            />
                          )}
                        />
                      </Grid>
                    </Card>
                  ))}

                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                    my={2}
                  >
                    <Button
                      type="button"
                      onClick={() =>
                        appendLeft({ heading: "", para: "", icon: null })
                      }
                    >
                      <Icon icon="basil:add-outline" width="32" height="32" />
                    </Button>
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
                </Grid>
                <Grid item md={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h5">Business Section</Typography>
                  </Box>

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

                  {rightFields.map((item, index) => (
                    <Card
                      sx={{
                        p: 2,
                        mb: 1,
                        border: "1px solid #c6c6c6",
                        position: "relative",
                      }}
                      key={item.id}
                    >
                      {rightFields.length > 1 && (
                        <Tooltip placement="top" title="Click to remove card">
                          <CancelTwoToneIcon
                            sx={{
                              color: DEFAULT_CSS.ERROR_MSG_COLOR,
                              position: "absolute",
                              right: 0,
                              top: 0,
                              zIndex: "9999",
                              cursor: "pointer",
                              fontSize: "18px",
                            }}
                            onClick={() => removeRight(index)}
                          />
                        </Tooltip>
                      )}
                      <Grid position="relative" mb={2}>
                        {imageObjRight[index]?.uploaded_images
                          ?.upload_image_url ? (
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
                                    imageObjRight[index]?.uploaded_images
                                      ?.upload_image_response_id
                                  ) {
                                    deleteImageRight(
                                      imageObjRight[index].uploaded_images
                                        .upload_image_response_id,
                                      index
                                    );
                                  }
                                  trigger(`rightCards[${index}].icon`);
                                }}
                              />
                            </Tooltip>
                            <Avatar
                              sx={{
                                width: "auto",
                                height: "10em",
                                border: `2.5px dashed ${
                                  errors[`rightCards[${index}].icon`]
                                    ? "#ff4842"
                                    : "#20A2B8"
                                }`,
                                color: `${errors[`rightCards[${index}].icon`] ? "#ff4842" : "#fff"}`,
                                cursor: "pointer",
                                backgroundColor: "#e6ecec",
                              }}
                              variant="rounded"
                              src={
                                imageObjRight[index].uploaded_images
                                  .upload_image_url
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
                                    errors[`rightCards[${index}].icon`]
                                      ? "#ff4842"
                                      : "#20A2B8"
                                  }`,
                                  color: `${errors[`rightCards[${index}].icon`] ? "#ff4842" : "#fff"}`,
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
                                        errors[`rightCards[${index}].icon`]
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
                              name={`icon-upload-${index}`}
                              style={{ display: "none" }}
                              onChange={(e) => {
                                uploadImageRight(e, index);
                                onChange(e);
                                trigger(`rightCards[${index}].icon`);
                              }}
                            />
                          </label>
                        )}

                        {errors[`rightCards[${index}].icon`] && (
                          <FormHelperText error={true}>
                            {errors[`rightCards[${index}].icon`].message || ""}
                          </FormHelperText>
                        )}
                      </Grid>

                      {errors?.rightCards?.[index]?.icon && (
                        <FormHelperText error>
                          {errors.rightCards[index].icon.message}
                        </FormHelperText>
                      )}
                      <Grid mb={4}>
                        <Controller
                          name={`rightCards.${index}.heading`}
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Subtitle*"
                              variant="outlined"
                              fullWidth
                              error={!!errors.rightCards?.[index]?.heading}
                              helperText={
                                errors.rightCards?.[index]?.heading?.message
                              }
                            />
                          )}
                        />
                      </Grid>
                      <Grid mb={4}>
                        <Controller
                          name={`rightCards.${index}.para`}
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Description*"
                              variant="outlined"
                              fullWidth
                              error={!!errors.rightCards?.[index]?.para}
                              helperText={
                                errors.rightCards?.[index]?.para?.message
                              }
                            />
                          )}
                        />
                      </Grid>
                    </Card>
                  ))}

                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                    my={2}
                  >
                    <Button
                      type="button"
                      onClick={() =>
                        appendRight({ heading: "", para: "", icon: null })
                      }
                    >
                      <Icon icon="basil:add-outline" width="32" height="32" />
                    </Button>
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

export default WebHomeFeatures;
