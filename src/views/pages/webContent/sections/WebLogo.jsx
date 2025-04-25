import { LoadingButton } from "@mui/lab";
import { Card, Grid, Stack } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import UploadImage from "../UploadImage";
import { useNavigate } from "react-router-dom";
import { REQUEST_ACTION } from "redux/authenticate/actions";
import { getRequest, putRequest } from "app/httpClient/axiosClient";
import { WEB_CONTENT } from "app/config/endpoints";
import { DEFAULT_VALUE, RESPONSE_CODE } from "app/constants";
import { ApiErrorMessage } from "utils/helpers/function/apiErrorResonse";
import { RESPONSE_MESSAGES } from "app/constants/localizedStrings";
import toast from "react-hot-toast";

const validationSchema = yup.object().shape({
  header: yup
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
  footer: yup
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

const HeaderFooterLogo = () => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [connectionError, setConnectionError] = useState(false);
  const { loader, message, messageType } = useSelector(
    (state) => state.request
  );
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
  const [imageObj1, setImageObj1] = useState({});
  const [imageObj2, setImageObj2] = useState({});
  const updateContent = async (data) => {
    let payload = {
      key: "HEADER_FOOTER",
      section: "LOGO",
      value: JSON.stringify({
        header: imageObj1,
        footer: imageObj2,
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
        getContent();
        dispatch({
          type: REQUEST_ACTION.SUCCESS,
          payload: { message: message },
        });
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
  async function getWebContent(url) {
    dispatch({ type: REQUEST_ACTION.INIT_LOADER, payload: { loader: true } });
    let _errorMessage;
    const LOCALE = DEFAULT_VALUE.LOCALE;
    try {
      const response = await getRequest(url);
      const { status } = response;
      const { data, success } = response.data;
      if (success && status === RESPONSE_CODE[200]) {
        const parseValue = JSON.parse(data.value);
        const { header, footer } = parseValue;
        setImageObj1(header);
        setImageObj2(footer);
        setValue(
          "header",
          header?.uploaded_images?.upload_image_url
            ? [{ size: 100, type: "image/jpg" }]
            : {}
        );
        setValue(
          "footer",
          footer?.uploaded_images?.upload_image_url
            ? [{ size: 100, type: "image/jpg" }]
            : {}
        );
      } else {
        setErrorMessage(RESPONSE_MESSAGES[LOCALE].FETCHING_USERS_LIST);
      }
    } catch (error) {
      _errorMessage = ApiErrorMessage(error);
      setConnectionError(true);
      setErrorMessage(_errorMessage);
      setLoading(false);
    }
    dispatch({ type: REQUEST_ACTION.INIT_LOADER, payload: { loader: false } });
  }
  const getContent = () => {
    getWebContent(`${WEB_CONTENT.GET}?key=HEADER_FOOTER&section=LOGO`);
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
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                spacing={2}
              >
                <Grid item md={6}>
                  <h3
                    style={{
                      margin: "0",
                      fontWeight: "500",
                      marginBottom: "20px",
                    }}
                  >
                    Header Logo
                  </h3>
                  <UploadImage
                    setValue={setValue}
                    imageObj={imageObj1}
                    setImageObj={setImageObj1}
                    errors={errors}
                    register={register}
                    trigger={trigger}
                    name={"header"}
                    loader={loader}
                  />
                </Grid>
                <Grid item md={6}>
                  <h3
                    style={{
                      margin: "0",
                      fontWeight: "500",
                      marginBottom: "20px",
                    }}
                  >
                    Footer Logo
                  </h3>
                  <UploadImage
                    setValue={setValue}
                    imageObj={imageObj2}
                    setImageObj={setImageObj2}
                    errors={errors}
                    register={register}
                    trigger={trigger}
                    name={"footer"}
                    loader={loader}
                  />
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

export default HeaderFooterLogo;
