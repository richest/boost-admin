import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from "react-redux";
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
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Box } from "@mui/system";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { DEFAULT_CSS } from "app/constants";

const validationSchema = yup.object().shape({
  title: yup.string().trim().required(`Title is required.`),
  subtitle: yup.string().trim().required(`Subtitle is required.`),
  subtitleOne: yup.string().trim().required(`Title is required.`),
  subtitleTwo: yup.string().trim().required(`Title is required.`),
  subtitleThree: yup.string().trim().required(`Title is required.`),
  subtitleFour: yup.string().trim().required(`Title is required.`),
  subtitleFive: yup.string().trim().required(`Title is required.`),
  subtitleSix: yup.string().trim().required(`Title is required.`),
  subtitleSeven: yup.string().trim().required(`Title is required.`),
  descriptionOne: yup.string().trim().required(`Description is required.`),
  descriptionTwo: yup.string().trim().required(`Description is required.`),
  descriptionThree: yup.string().trim().required(`Description is required.`),
  descriptionFour: yup.string().trim().required(`Description is required.`),
  descriptionFive: yup.string().trim().required(`Description is required.`),
  descriptionSix: yup.string().trim().required(`Description is required.`),
  descriptionSeven: yup.string().trim().required(`Description is required.`),

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
  introImageThree: yup
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
  introImageFour: yup
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
  introImageFive: yup
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
  introImageSix: yup
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
  introImageSeven: yup
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

const WebProductChoose = () => {
  const { loader } = useSelector((state) => state.request);

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
  const [content, setContent] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageObj, setImageObj] = useState({});
  const { onChange, ...params } = register(
    "introImageOne",
    "introImageTwo",
    "introImageThree",
    "introImageFour",
    "introImageFive",
    "introImageSix",
    "introImageSeven"
  );

  const deleteImage = () => {
  };

  const uploadImage = async () => {
  };

  const updateContent = async () => {
  };
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
          <Card className="profile-right-section" hidden={loader} sx={{ p: 3 }}>
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
                    <Typography variant="h5">Section 1</Typography>
                  </Box>
                  <Grid mb={4}>
                    <TextField
                      {...register("subtitleOne")}
                      label="Title*"
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
                  <Grid mb={4}>
                    <div
                      className={
                        errors.descriptionOne
                          ? "errorCkEditor description_div"
                          : "description_div"
                      }
                    >
                      <CKEditor
                        name="descriptionOne"
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
                  </Grid>
                  {!loader && (
                    <Grid position="relative" mb={4}>
                      {selectedImage !== null && selectedImage !== undefined ? (
                        <Tooltip
                          placement="top"
                          title="Click to remove profile picture"
                        >
                          <CancelTwoToneIcon
                            sx={{
                              color: DEFAULT_CSS.ERROR_MSG_COLOR,
                              position: "absolute",
                              right: "5px",
                              top: "5px",
                              zIndex: "9999",
                              cursor: "pointer",
                              fontSize: "18px",
                            }}
                            onClick={() => {
                              setSelectedImage(null);
                              onChange({
                                target: {
                                  name: "introImageOne",
                                  value: [],
                                },
                              });
                              trigger("introImageOne");
                            }}
                          />
                        </Tooltip>
                      ) : (
                        ""
                      )}
                      <label
                        htmlFor={`${selectedImage ? null : "uploadFileInput"}`}
                      >
                        <Avatar
                          sx={{
                            width: "auto",
                            height: "10em",
                            border: `${selectedImage ? null : `2.5px dashed ${errors.introImageOne ? "#ff4842" : "#20A2B8"}`}`,
                            color: `${errors.introImageOne ? "#ff4842" : "#fff"}`,
                            cursor: `${selectedImage ? null : "pointer"}`,
                            backgroundColor: `${selectedImage ? null : "#e6ecec"}`,
                          }}
                          variant="rounded"
                          src={
                            selectedImage
                              ? URL.createObjectURL(selectedImage)
                              : imageObj?.upload_image_url
                          }
                          className="create-blog-image"
                        >
                          <Stack
                            container
                            alignItems="center"
                            justifyContent="center"
                          >
                            <AddPhotoAlternateIcon
                              sx={{
                                fontSize: "3em",
                                color: `${errors.introImageOne ? "#ff4842" : DEFAULT_CSS.PRIMARY_COLOR}`,
                              }}
                            />
                            <Typography
                              color={DEFAULT_CSS.PRIMARY_COLOR}
                              variant="h4"
                            >
                              Upload file
                            </Typography>
                            <FormHelperText
                              error={selectedImage ? true : false}
                            >
                              Allowed *.jpeg, *.jpg, *.png max size of 5 MB.
                            </FormHelperText>
                          </Stack>
                        </Avatar>
                        <input
                          {...params}
                          type="file"
                          id="uploadFileInput"
                          accept="image/*"
                          name="introImageOne"
                          onChange={(event) => {
                            uploadImage(event);
                            onChange(event);
                            trigger("introImageOne");
                          }}
                          style={{ display: "none" }}
                        />
                      </label>

                      {errors.introImageOne && (
                        <FormHelperText error={true}>
                          {errors.introImageOne.message}
                        </FormHelperText>
                      )}
                    </Grid>
                  )}
                </Grid>
                <Grid item md={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h5">Section 2</Typography>
                  </Box>
                  <Grid mb={4}>
                    <TextField
                      {...register("subtitleTwo")}
                      label="Title*"
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
                  <Grid mb={4}>
                    <div
                      className={
                        errors.descriptionTwo
                          ? "errorCkEditor description_div"
                          : "description_div"
                      }
                    >
                      <CKEditor
                        name="descriptionTwo"
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
                  </Grid>
                  {!loader && (
                    <Grid position="relative" mb={4}>
                      {selectedImage !== null && selectedImage !== undefined ? (
                        <Tooltip
                          placement="top"
                          title="Click to remove profile picture"
                        >
                          <CancelTwoToneIcon
                            sx={{
                              color: DEFAULT_CSS.ERROR_MSG_COLOR,
                              position: "absolute",
                              right: "5px",
                              top: "5px",
                              zIndex: "9999",
                              cursor: "pointer",
                              fontSize: "18px",
                            }}
                            onClick={() => {
                              setSelectedImage(null);
                              onChange({
                                target: {
                                  name: "introImageTwo",
                                  value: [],
                                },
                              });
                              trigger("introImageTwo");
                            }}
                          />
                        </Tooltip>
                      ) : (
                        ""
                      )}
                      <label
                        htmlFor={`${selectedImage ? null : "uploadFileInput"}`}
                      >
                        <Avatar
                          sx={{
                            width: "auto",
                            height: "10em",
                            border: `${selectedImage ? null : `2.5px dashed ${errors.introImageTwo ? "#ff4842" : "#20A2B8"}`}`,
                            color: `${errors.introImageTwo ? "#ff4842" : "#fff"}`,
                            cursor: `${selectedImage ? null : "pointer"}`,
                            backgroundColor: `${selectedImage ? null : "#e6ecec"}`,
                          }}
                          variant="rounded"
                          src={
                            selectedImage
                              ? URL.createObjectURL(selectedImage)
                              : imageObj?.upload_image_url
                          }
                          className="create-blog-image"
                        >
                          <Stack
                            container
                            alignItems="center"
                            justifyContent="center"
                          >
                            <AddPhotoAlternateIcon
                              sx={{
                                fontSize: "3em",
                                color: `${errors.introImageTwo ? "#ff4842" : DEFAULT_CSS.PRIMARY_COLOR}`,
                              }}
                            />
                            <Typography
                              color={DEFAULT_CSS.PRIMARY_COLOR}
                              variant="h4"
                            >
                              Upload file
                            </Typography>
                            <FormHelperText
                              error={selectedImage ? true : false}
                            >
                              Allowed *.jpeg, *.jpg, *.png max size of 5 MB.
                            </FormHelperText>
                          </Stack>
                        </Avatar>
                        <input
                          {...params}
                          type="file"
                          id="uploadFileInput"
                          accept="image/*"
                          name="introImageTwo"
                          onChange={(event) => {
                            uploadImage(event);
                            onChange(event);
                            trigger("introImageTwo");
                          }}
                          style={{ display: "none" }}
                        />
                      </label>

                      {errors.introImageTwo && (
                        <FormHelperText error={true}>
                          {errors.introImageTwo.message}
                        </FormHelperText>
                      )}
                    </Grid>
                  )}
                </Grid>
                <Grid item md={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h5">Section 3</Typography>
                  </Box>
                  <Grid mb={4}>
                    <TextField
                      {...register("subtitleThree")}
                      label="Title*"
                      disabled={loader}
                      error={!!errors.subtitleThree}
                      helperText={
                        errors.subtitleThree ? errors.subtitleThree.message : ""
                      }
                      name="subtitleThree"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid mb={4}>
                    <div
                      className={
                        errors.descriptionThree
                          ? "errorCkEditor description_div"
                          : "description_div"
                      }
                    >
                      <CKEditor
                        name="descriptionThree"
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
                          setValue("descriptionThree", editor.getData());
                          trigger("descriptionThree");
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
                    {errors.descriptionThree ? (
                      <FormHelperText error>
                        {errors.descriptionThree.message}
                      </FormHelperText>
                    ) : (
                      ""
                    )}
                  </Grid>
                  {!loader && (
                    <Grid position="relative" mb={4}>
                      {selectedImage !== null && selectedImage !== undefined ? (
                        <Tooltip
                          placement="top"
                          title="Click to remove profile picture"
                        >
                          <CancelTwoToneIcon
                            sx={{
                              color: DEFAULT_CSS.ERROR_MSG_COLOR,
                              position: "absolute",
                              right: "5px",
                              top: "5px",
                              zIndex: "9999",
                              cursor: "pointer",
                              fontSize: "18px",
                            }}
                            onClick={() => {
                              setSelectedImage(null);
                              onChange({
                                target: {
                                  name: "introImageThree",
                                  value: [],
                                },
                              });
                              trigger("introImageThree");
                            }}
                          />
                        </Tooltip>
                      ) : (
                        ""
                      )}
                      <label
                        htmlFor={`${selectedImage ? null : "uploadFileInput"}`}
                      >
                        <Avatar
                          sx={{
                            width: "auto",
                            height: "10em",
                            border: `${selectedImage ? null : `2.5px dashed ${errors.introImageThree ? "#ff4842" : "#20A2B8"}`}`,
                            color: `${errors.introImageThree ? "#ff4842" : "#fff"}`,
                            cursor: `${selectedImage ? null : "pointer"}`,
                            backgroundColor: `${selectedImage ? null : "#e6ecec"}`,
                          }}
                          variant="rounded"
                          src={
                            selectedImage
                              ? URL.createObjectURL(selectedImage)
                              : imageObj?.upload_image_url
                          }
                          className="create-blog-image"
                        >
                          <Stack
                            container
                            alignItems="center"
                            justifyContent="center"
                          >
                            <AddPhotoAlternateIcon
                              sx={{
                                fontSize: "3em",
                                color: `${errors.introImageThree ? "#ff4842" : DEFAULT_CSS.PRIMARY_COLOR}`,
                              }}
                            />
                            <Typography
                              color={DEFAULT_CSS.PRIMARY_COLOR}
                              variant="h4"
                            >
                              Upload file
                            </Typography>
                            <FormHelperText
                              error={selectedImage ? true : false}
                            >
                              Allowed *.jpeg, *.jpg, *.png max size of 5 MB.
                            </FormHelperText>
                          </Stack>
                        </Avatar>
                        <input
                          {...params}
                          type="file"
                          id="uploadFileInput"
                          accept="image/*"
                          name="introImageThree"
                          onChange={(event) => {
                            uploadImage(event);
                            onChange(event);
                            trigger("introImageThree");
                          }}
                          style={{ display: "none" }}
                        />
                      </label>

                      {errors.introImageThree && (
                        <FormHelperText error={true}>
                          {errors.introImageThree.message}
                        </FormHelperText>
                      )}
                    </Grid>
                  )}
                </Grid>
                <Grid item md={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h5">Section 4</Typography>
                  </Box>
                  <Grid mb={4}>
                    <TextField
                      {...register("subtitleFour")}
                      label="Title*"
                      disabled={loader}
                      error={!!errors.subtitleFour}
                      helperText={
                        errors.subtitleFour ? errors.subtitleFour.message : ""
                      }
                      name="subtitleFour"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid mb={4}>
                    <div
                      className={
                        errors.descriptionFour
                          ? "errorCkEditor description_div"
                          : "description_div"
                      }
                    >
                      <CKEditor
                        name="descriptionFour"
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
                          setValue("descriptionFour", editor.getData());
                          trigger("descriptionFour");
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
                    {errors.descriptionFour ? (
                      <FormHelperText error>
                        {errors.descriptionFour.message}
                      </FormHelperText>
                    ) : (
                      ""
                    )}
                  </Grid>
                  {!loader && (
                    <Grid position="relative" mb={4}>
                      {selectedImage !== null && selectedImage !== undefined ? (
                        <Tooltip
                          placement="top"
                          title="Click to remove profile picture"
                        >
                          <CancelTwoToneIcon
                            sx={{
                              color: DEFAULT_CSS.ERROR_MSG_COLOR,
                              position: "absolute",
                              right: "5px",
                              top: "5px",
                              zIndex: "9999",
                              cursor: "pointer",
                              fontSize: "18px",
                            }}
                            onClick={() => {
                              setSelectedImage(null);
                              onChange({
                                target: {
                                  name: "introImageFour",
                                  value: [],
                                },
                              });
                              trigger("introImageFour");
                            }}
                          />
                        </Tooltip>
                      ) : (
                        ""
                      )}
                      <label
                        htmlFor={`${selectedImage ? null : "uploadFileInput"}`}
                      >
                        <Avatar
                          sx={{
                            width: "auto",
                            height: "10em",
                            border: `${selectedImage ? null : `2.5px dashed ${errors.introImageFour ? "#ff4842" : "#20A2B8"}`}`,
                            color: `${errors.introImageFour ? "#ff4842" : "#fff"}`,
                            cursor: `${selectedImage ? null : "pointer"}`,
                            backgroundColor: `${selectedImage ? null : "#e6ecec"}`,
                          }}
                          variant="rounded"
                          src={
                            selectedImage
                              ? URL.createObjectURL(selectedImage)
                              : imageObj?.upload_image_url
                          }
                          className="create-blog-image"
                        >
                          <Stack
                            container
                            alignItems="center"
                            justifyContent="center"
                          >
                            <AddPhotoAlternateIcon
                              sx={{
                                fontSize: "3em",
                                color: `${errors.introImageFour ? "#ff4842" : DEFAULT_CSS.PRIMARY_COLOR}`,
                              }}
                            />
                            <Typography
                              color={DEFAULT_CSS.PRIMARY_COLOR}
                              variant="h4"
                            >
                              Upload file
                            </Typography>
                            <FormHelperText
                              error={selectedImage ? true : false}
                            >
                              Allowed *.jpeg, *.jpg, *.png max size of 5 MB.
                            </FormHelperText>
                          </Stack>
                        </Avatar>
                        <input
                          {...params}
                          type="file"
                          id="uploadFileInput"
                          accept="image/*"
                          name="introImageFour"
                          onChange={(event) => {
                            uploadImage(event);
                            onChange(event);
                            trigger("introImageFour");
                          }}
                          style={{ display: "none" }}
                        />
                      </label>

                      {errors.introImageFour && (
                        <FormHelperText error={true}>
                          {errors.introImageFour.message}
                        </FormHelperText>
                      )}
                    </Grid>
                  )}
                </Grid>
                <Grid item md={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h5">Section 5</Typography>
                  </Box>
                  <Grid mb={4}>
                    <TextField
                      {...register("subtitleFive")}
                      label="Title*"
                      disabled={loader}
                      error={!!errors.subtitleFive}
                      helperText={
                        errors.subtitleFive ? errors.subtitleFive.message : ""
                      }
                      name="subtitleFive"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid mb={4}>
                    <div
                      className={
                        errors.descriptionFive
                          ? "errorCkEditor description_div"
                          : "description_div"
                      }
                    >
                      <CKEditor
                        name="descriptionFive"
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
                          setValue("descriptionFive", editor.getData());
                          trigger("descriptionFive");
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
                    {errors.descriptionFive ? (
                      <FormHelperText error>
                        {errors.descriptionFive.message}
                      </FormHelperText>
                    ) : (
                      ""
                    )}
                  </Grid>
                  {!loader && (
                    <Grid position="relative" mb={4}>
                      {selectedImage !== null && selectedImage !== undefined ? (
                        <Tooltip
                          placement="top"
                          title="Click to remove profile picture"
                        >
                          <CancelTwoToneIcon
                            sx={{
                              color: DEFAULT_CSS.ERROR_MSG_COLOR,
                              position: "absolute",
                              right: "5px",
                              top: "5px",
                              zIndex: "9999",
                              cursor: "pointer",
                              fontSize: "18px",
                            }}
                            onClick={() => {
                              setSelectedImage(null);
                              onChange({
                                target: {
                                  name: "introImageFive",
                                  value: [],
                                },
                              });
                              trigger("introImageFive");
                            }}
                          />
                        </Tooltip>
                      ) : (
                        ""
                      )}
                      <label
                        htmlFor={`${selectedImage ? null : "uploadFileInput"}`}
                      >
                        <Avatar
                          sx={{
                            width: "auto",
                            height: "10em",
                            border: `${selectedImage ? null : `2.5px dashed ${errors.introImageFive ? "#ff4842" : "#20A2B8"}`}`,
                            color: `${errors.introImageFive ? "#ff4842" : "#fff"}`,
                            cursor: `${selectedImage ? null : "pointer"}`,
                            backgroundColor: `${selectedImage ? null : "#e6ecec"}`,
                          }}
                          variant="rounded"
                          src={
                            selectedImage
                              ? URL.createObjectURL(selectedImage)
                              : imageObj?.upload_image_url
                          }
                          className="create-blog-image"
                        >
                          <Stack
                            container
                            alignItems="center"
                            justifyContent="center"
                          >
                            <AddPhotoAlternateIcon
                              sx={{
                                fontSize: "3em",
                                color: `${errors.introImageFive ? "#ff4842" : DEFAULT_CSS.PRIMARY_COLOR}`,
                              }}
                            />
                            <Typography
                              color={DEFAULT_CSS.PRIMARY_COLOR}
                              variant="h4"
                            >
                              Upload file
                            </Typography>
                            <FormHelperText
                              error={selectedImage ? true : false}
                            >
                              Allowed *.jpeg, *.jpg, *.png max size of 5 MB.
                            </FormHelperText>
                          </Stack>
                        </Avatar>
                        <input
                          {...params}
                          type="file"
                          id="uploadFileInput"
                          accept="image/*"
                          name="introImageFive"
                          onChange={(event) => {
                            uploadImage(event);
                            onChange(event);
                            trigger("introImageFive");
                          }}
                          style={{ display: "none" }}
                        />
                      </label>

                      {errors.introImageFive && (
                        <FormHelperText error={true}>
                          {errors.introImageFive.message}
                        </FormHelperText>
                      )}
                    </Grid>
                  )}
                </Grid>

                <Grid item md={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h5">Section 6</Typography>
                  </Box>
                  <Grid mb={4}>
                    <TextField
                      {...register("subtitleSix")}
                      label="Title*"
                      disabled={loader}
                      error={!!errors.subtitleSix}
                      helperText={
                        errors.subtitleSix ? errors.subtitleSix.message : ""
                      }
                      name="subtitleSix"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid mb={4}>
                    <div
                      className={
                        errors.descriptionSix
                          ? "errorCkEditor description_div"
                          : "description_div"
                      }
                    >
                      <CKEditor
                        name="descriptionSix"
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
                          setValue("descriptionSix", editor.getData());
                          trigger("descriptionSix");
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
                    {errors.descriptionSix ? (
                      <FormHelperText error>
                        {errors.descriptionSix.message}
                      </FormHelperText>
                    ) : (
                      ""
                    )}
                  </Grid>
                  {!loader && (
                    <Grid position="relative" mb={4}>
                      {selectedImage !== null && selectedImage !== undefined ? (
                        <Tooltip
                          placement="top"
                          title="Click to remove profile picture"
                        >
                          <CancelTwoToneIcon
                            sx={{
                              color: DEFAULT_CSS.ERROR_MSG_COLOR,
                              position: "absolute",
                              right: "5px",
                              top: "5px",
                              zIndex: "9999",
                              cursor: "pointer",
                              fontSize: "18px",
                            }}
                            onClick={() => {
                              setSelectedImage(null);
                              onChange({
                                target: {
                                  name: "introImageSix",
                                  value: [],
                                },
                              });
                              trigger("introImageSix");
                            }}
                          />
                        </Tooltip>
                      ) : (
                        ""
                      )}
                      <label
                        htmlFor={`${selectedImage ? null : "uploadFileInput"}`}
                      >
                        <Avatar
                          sx={{
                            width: "auto",
                            height: "10em",
                            border: `${selectedImage ? null : `2.5px dashed ${errors.introImageSix ? "#ff4842" : "#20A2B8"}`}`,
                            color: `${errors.introImageSix ? "#ff4842" : "#fff"}`,
                            cursor: `${selectedImage ? null : "pointer"}`,
                            backgroundColor: `${selectedImage ? null : "#e6ecec"}`,
                          }}
                          variant="rounded"
                          src={
                            selectedImage
                              ? URL.createObjectURL(selectedImage)
                              : imageObj?.upload_image_url
                          }
                          className="create-blog-image"
                        >
                          <Stack
                            container
                            alignItems="center"
                            justifyContent="center"
                          >
                            <AddPhotoAlternateIcon
                              sx={{
                                fontSize: "3em",
                                color: `${errors.introImageSix ? "#ff4842" : DEFAULT_CSS.PRIMARY_COLOR}`,
                              }}
                            />
                            <Typography
                              color={DEFAULT_CSS.PRIMARY_COLOR}
                              variant="h4"
                            >
                              Upload file
                            </Typography>
                            <FormHelperText
                              error={selectedImage ? true : false}
                            >
                              Allowed *.jpeg, *.jpg, *.png max size of 5 MB.
                            </FormHelperText>
                          </Stack>
                        </Avatar>
                        <input
                          {...params}
                          type="file"
                          id="uploadFileInput"
                          accept="image/*"
                          name="introImageSix"
                          onChange={(event) => {
                            uploadImage(event);
                            onChange(event);
                            trigger("introImageSix");
                          }}
                          style={{ display: "none" }}
                        />
                      </label>

                      {errors.introImageSix && (
                        <FormHelperText error={true}>
                          {errors.introImageSix.message}
                        </FormHelperText>
                      )}
                    </Grid>
                  )}
                </Grid>

                <Grid item md={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h5">Section 7</Typography>
                  </Box>
                  <Grid mb={4}>
                    <TextField
                      {...register("subtitleSeven")}
                      label="Title*"
                      disabled={loader}
                      error={!!errors.subtitleSeven}
                      helperText={
                        errors.subtitleSeven ? errors.subtitleSeven.message : ""
                      }
                      name="subtitleSeven"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid mb={4}>
                    <div
                      className={
                        errors.descriptionSeven
                          ? "errorCkEditor description_div"
                          : "description_div"
                      }
                    >
                      <CKEditor
                        name="descriptionSeven"
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
                          setValue("descriptionSeven", editor.getData());
                          trigger("descriptionSeven");
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
                    {errors.descriptionSeven ? (
                      <FormHelperText error>
                        {errors.descriptionSeven.message}
                      </FormHelperText>
                    ) : (
                      ""
                    )}
                  </Grid>
                  {!loader && (
                    <Grid position="relative" mb={4}>
                      {selectedImage !== null && selectedImage !== undefined ? (
                        <Tooltip
                          placement="top"
                          title="Click to remove profile picture"
                        >
                          <CancelTwoToneIcon
                            sx={{
                              color: DEFAULT_CSS.ERROR_MSG_COLOR,
                              position: "absolute",
                              right: "5px",
                              top: "5px",
                              zIndex: "9999",
                              cursor: "pointer",
                              fontSize: "18px",
                            }}
                            onClick={() => {
                              setSelectedImage(null);
                              onChange({
                                target: {
                                  name: "introImageSeven",
                                  value: [],
                                },
                              });
                              trigger("introImageSeven");
                            }}
                          />
                        </Tooltip>
                      ) : (
                        ""
                      )}
                      <label
                        htmlFor={`${selectedImage ? null : "uploadFileInput"}`}
                      >
                        <Avatar
                          sx={{
                            width: "auto",
                            height: "10em",
                            border: `${selectedImage ? null : `2.5px dashed ${errors.introImageSeven ? "#ff4842" : "#20A2B8"}`}`,
                            color: `${errors.introImageSeven ? "#ff4842" : "#fff"}`,
                            cursor: `${selectedImage ? null : "pointer"}`,
                            backgroundColor: `${selectedImage ? null : "#e6ecec"}`,
                          }}
                          variant="rounded"
                          src={
                            selectedImage
                              ? URL.createObjectURL(selectedImage)
                              : imageObj?.upload_image_url
                          }
                          className="create-blog-image"
                        >
                          <Stack
                            container
                            alignItems="center"
                            justifyContent="center"
                          >
                            <AddPhotoAlternateIcon
                              sx={{
                                fontSize: "3em",
                                color: `${errors.introImageSeven ? "#ff4842" : DEFAULT_CSS.PRIMARY_COLOR}`,
                              }}
                            />
                            <Typography
                              color={DEFAULT_CSS.PRIMARY_COLOR}
                              variant="h4"
                            >
                              Upload file
                            </Typography>
                            <FormHelperText
                              error={selectedImage ? true : false}
                            >
                              Allowed *.jpeg, *.jpg, *.png max size of 5 MB.
                            </FormHelperText>
                          </Stack>
                        </Avatar>
                        <input
                          {...params}
                          type="file"
                          id="uploadFileInput"
                          accept="image/*"
                          name="introImageSeven"
                          onChange={(event) => {
                            uploadImage(event);
                            onChange(event);
                            trigger("introImageSeven");
                          }}
                          style={{ display: "none" }}
                        />
                      </label>

                      {errors.introImageSeven && (
                        <FormHelperText error={true}>
                          {errors.introImageSeven.message}
                        </FormHelperText>
                      )}
                    </Grid>
                  )}
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

export default WebProductChoose;
