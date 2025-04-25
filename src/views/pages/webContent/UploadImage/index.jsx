import {
  Avatar,
  FormHelperText,
  Grid,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { DEFAULT_CSS, RESPONSE_CODE } from "app/constants";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { REQUEST_ACTION } from "redux/authenticate/actions";
import { ApiErrorMessage } from "utils/helpers/function/apiErrorResonse";
import { postRequest } from "app/httpClient/axiosClient";
import { WEB_CONTENT } from "app/config/endpoints";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const UploadImage = (props) => {
  const {
    imageObj,
    setImageObj,
    errors,
    register,
    name,
    setValue,
    trigger,
    loader,
  } = props;
  const dispatch = useDispatch();
  const naviage = useNavigate();
  const { onChange, ...params } = register(name);
  const deleteImage = async (id) => {
    const payload = {
      upload_image_response_id: id,
    };
    try {
      dispatch({ type: REQUEST_ACTION.PROCESSING });
      const {
        status,
        data: { message, data },
      } = await postRequest(WEB_CONTENT.DELETE_IMAGE, payload);
      if (status === RESPONSE_CODE[200]) {
        setImageObj({});
        setValue(name, {});
        dispatch({ type: REQUEST_ACTION.SUCCESS, payload: {} });
      } else {
        dispatch({
          type: REQUEST_ACTION.FAILURE,
          payload: { message: ApiErrorMessage() },
        });
      }
      toast.success(message);
    } catch (error) {
      dispatch({
        type: REQUEST_ACTION.FAILURE,
        payload: { message: ApiErrorMessage(error) },
      });
    }
  };
  const uploadImage = async (event) => {
    if (!event.target.files[0]) {
      return;
    }
    if (imageObj?.uploaded_images?.upload_image_response_id) {
      deleteImage(imageObj?.uploaded_images?.upload_image_response_id);
    }
    let image = event.target.files[0];
    const formData = new FormData();
    formData.append("upload_image", image);
    try {
      dispatch({ type: REQUEST_ACTION.PROCESSING });
      const {
        status,
        data: { message, data },
      } = await postRequest(WEB_CONTENT.UPLOAD_IMAGE, formData);
      if (status === RESPONSE_CODE[200]) {
        setImageObj(data);
        dispatch({ type: REQUEST_ACTION.SUCCESS, payload: {} });
      } else {
        dispatch({
          type: REQUEST_ACTION.FAILURE,
          payload: { message: ApiErrorMessage() },
        });
      }
      toast.success(message);
    } catch (error) {
      dispatch({
        type: REQUEST_ACTION.FAILURE,
        payload: { message: ApiErrorMessage(error) },
      });
    }
  };
  return (
    <>
      <Grid position="relative" mb={4}>
        {imageObj?.uploaded_images?.upload_image_url !== null &&
        imageObj?.uploaded_images?.upload_image_url !== undefined ? (
          <Tooltip placement="top" title="Click to remove image">
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
                if (imageObj?.uploaded_images?.upload_image_response_id) {
                  deleteImage(
                    imageObj?.uploaded_images?.upload_image_response_id
                  );
                }
                // setIsHovering(false);
                onChange({ target: { name: name, value: [] } });
                trigger(name);
              }}
            />
          </Tooltip>
        ) : (
          ""
        )}
        <label
          htmlFor={`${imageObj?.uploaded_images?.upload_image_url ? null : name}`}
        >
          {loader ? (
            <Skeleton variant="rectangular" width="100%" height="10em" />
          ) : (
            <Avatar
              sx={{
                width: "auto",
                height: "10em",
                border: `${imageObj?.uploaded_images?.upload_image_url ? null : `2.5px dashed ${errors[name] ? "#ff4842" : "#20A2B8"}`}`,
                color: `${errors[name] ? "#ff4842" : "#fff"}`,
                cursor: `${imageObj?.uploaded_images?.upload_image_url ? null : "pointer"}`,
                backgroundColor: `${imageObj?.uploaded_images?.upload_image_url ? "#e6ecec" : "#e6ecec"}`,
              }}
              variant="rounded"
              src={imageObj?.uploaded_images?.upload_image_url}
              className="create-blog-image"
            >
              <Stack container alignItems="center" justifyContent="center">
                <AddPhotoAlternateIcon
                  sx={{
                    fontSize: "3em",
                    color: `${errors[name] ? "#ff4842" : DEFAULT_CSS.PRIMARY_COLOR}`,
                  }}
                />
                <Typography color={DEFAULT_CSS.PRIMARY_COLOR} variant="h4">
                  Upload file
                </Typography>
                <FormHelperText
                  error={
                    imageObj?.uploaded_images?.upload_image_url ? true : false
                  }
                >
                  Allowed *.jpeg, *.jpg, *.png max size of 5 MB.
                </FormHelperText>
              </Stack>
            </Avatar>
          )}

          <input
            {...params}
            type="file"
            id={name}
            accept="image/*"
            name={name}
            onChange={(event) => {
              uploadImage(event);
              onChange(event);
              trigger(name);
            }}
            style={{ display: "none" }}
          />
        </label>

        {errors[name] && (
          <FormHelperText error={true}>{errors[name].message}</FormHelperText>
        )}
      </Grid>
    </>
  );
};

export default UploadImage;
