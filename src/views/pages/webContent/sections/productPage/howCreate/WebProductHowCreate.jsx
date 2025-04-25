import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
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
import { Icon } from "@iconify/react";
import { REQUEST_ACTION } from "redux/authenticate/actions";
import { getRequest, putRequest } from "app/httpClient/axiosClient";
import { WEB_CONTENT } from "app/config/endpoints";
import toast from "react-hot-toast";
import { ApiErrorMessage } from "utils/helpers/function/apiErrorResonse";
import { RESPONSE_MESSAGES } from "app/constants/localizedStrings";
import UploadImage from "views/pages/webContent/UploadImage";

const validationSchema = yup.object().shape({
  mainTitle: yup.string().trim().required(`Title is required.`),
  subtitle: yup.string().trim().required(`Subtitle is required.`),
  title: yup.string().trim().required(`Title is required.`),
  description: yup.string().trim().required(`Description is required.`),
  cards: yup.array().of(
    yup.object().shape({
      heading: yup.string().trim().required("Subtitle is required."),
      para: yup.string().trim().required("Description is required."),
    })
  ),
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

const WebProductHowCreate = ({ name }) => {
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
      cards: [{ heading: "", para: "" }],
    },
  });
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [content, setContent] = useState({});
  const [imageObj1, setImageObj1] = useState({});
  const { onChange, ...params } = register("introImage");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "cards",
  });

  const updateContent = async (data) => {
    let payload = {
      key: name,
      section: "HOW_CREATE",
      value: JSON.stringify({
        mainTitle: data.mainTitle,
        subtitle: data.subtitle,
        title: data.title,
        description: data.description,
        introImage: imageObj1,
        cards: data.cards,
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
        const { mainTitle, subtitle, title, description, introImage, cards } =
          parseValue;
        setImageObj1(introImage);
        setValue("mainTitle", mainTitle);
        setValue("subtitle", subtitle);
        setValue("title", title);
        setValue("description", description);
        setValue("cards", cards);
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
    getWebContent(`${WEB_CONTENT.GET}?key=${name}&section=HOW_CREATE`);
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
                  {...register("mainTitle")}
                  label="Main Title*"
                  disabled={loader}
                  error={!!errors.mainTitle}
                  helperText={errors.mainTitle ? errors.mainTitle.message : ""}
                  name="mainTitle"
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

              <Typography variant="h5" sx={{ pb: 3 }}>
                Steps
              </Typography>

              {fields.map((item, index) => (
                <Card
                  sx={{
                    p: 2,
                    mb: 1,
                    border: "1px solid #c6c6c6",
                    position: "relative",
                  }}
                  key={item.id}
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
                        onClick={() => remove(index)}
                      />
                    </Tooltip>
                  )}
                  <Grid mb={4}>
                    <Controller
                      name={`cards.${index}.heading`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Subtitle*"
                          variant="outlined"
                          fullWidth
                          error={!!errors.cards?.[index]?.heading}
                          helperText={errors.cards?.[index]?.heading?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid mb={4}>
                    <Controller
                      name={`cards.${index}.para`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Description*"
                          variant="outlined"
                          fullWidth
                          error={!!errors.cards?.[index]?.para}
                          helperText={errors.cards?.[index]?.para?.message}
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
                  onClick={() => append({ heading: "", para: "" })}
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

export default WebProductHowCreate;
