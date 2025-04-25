import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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
import { useSelector } from "react-redux";
import { DEFAULT_CSS } from "app/constants";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SendIcon from "@mui/icons-material/Send";
import { LoadingButton } from "@mui/lab";

const validationSchema = yup.object().shape({
  title: yup.string().trim().required(`Title is required.`),
  subtitle: yup.string().trim().required(`Subtitle is required.`),
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

const EducationTemplates = () => {
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
  const [selectedImage, setSelectedImage] = useState(null);
  const [content, setContent] = useState({});
  const [imageObj, setImageObj] = useState({});
  const { onChange, ...params } = register("introImage");

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
              

              <Grid mb={4}>
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
                                name: "introImage",
                                value: [],
                              },
                            });
                            trigger("introImage");
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
                          border: `${selectedImage ? null : `2.5px dashed ${errors.introImage ? "#ff4842" : "#20A2B8"}`}`,
                          color: `${errors.introImage ? "#ff4842" : "#fff"}`,
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
                              color: `${errors.introImage ? "#ff4842" : DEFAULT_CSS.PRIMARY_COLOR}`,
                            }}
                          />
                          <Typography
                            color={DEFAULT_CSS.PRIMARY_COLOR}
                            variant="h4"
                          >
                            Upload file
                          </Typography>
                          <FormHelperText error={selectedImage ? true : false}>
                            Allowed *.jpeg, *.jpg, *.png max size of 5 MB.
                          </FormHelperText>
                        </Stack>
                      </Avatar>
                      <input
                        {...params}
                        type="file"
                        id="uploadFileInput"
                        accept="image/*"
                        name="introImage"
                        onChange={(event) => {
                          uploadImage(event);
                          onChange(event);
                          trigger("introImage");
                        }}
                        style={{ display: "none" }}
                      />
                    </label>

                    {errors.introImage && (
                      <FormHelperText error={true}>
                        {errors.introImage.message}
                      </FormHelperText>
                    )}
                  </Grid>
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
    </>
  );
};

export default EducationTemplates;
