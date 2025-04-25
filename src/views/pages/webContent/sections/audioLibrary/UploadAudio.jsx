import {
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { WEB_CONTENT } from "app/config/endpoints";
import { RESPONSE_CODE } from "app/constants";
import { deleteRequest, postRequest } from "app/httpClient/axiosClient";
import React, { useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { REQUEST_ACTION } from "redux/authenticate/actions";
import { ApiErrorMessage } from "utils/helpers/function/apiErrorResonse";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";

function UploadAudio(props) {
  const { updateContent, audio, setAudio, audioFiles } = props;

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const deleteAudio = async (id) => {
    setIsLoading(true);
    try {
      dispatch({ type: REQUEST_ACTION.PROCESSING });

      const {
        status,
        data: { message },
      } = await deleteRequest(`${WEB_CONTENT.DELETE_AUDIO}/${id}`);

      if (status === RESPONSE_CODE[200]) {
        setIsLoading(false);
        setAudio((prevAudio) => prevAudio.filter((audio) => audio.id !== id));

        dispatch({ type: REQUEST_ACTION.SUCCESS, payload: {} });
        toast.success(message || "Audio deleted successfully!");
      } else {
        dispatch({
          type: REQUEST_ACTION.FAILURE,
          payload: { message: ApiErrorMessage() },
        });
        toast.error("Failed to delete audio.");
        setIsLoading(false);
      }
    } catch (error) {
      dispatch({
        type: REQUEST_ACTION.FAILURE,
        payload: { message: ApiErrorMessage(error) },
      });
      toast.error("An error occurred while deleting audio.");
      setIsLoading(false);
    }
  };

  const uploadMedia = async (event) => {
    setIsLoading(true);
    if (!event.target.files || event.target.files.length === 0) {
      toast.error("No files selected!");
      return;
    }

    const files = Array.from(event.target.files);
    const newFiles = await Promise.all(
      files.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve({
              file,
              audioURL: URL.createObjectURL(file),
              binaryData: reader.result,
            });
          };
          reader.onerror = () => reject(reader.error);
          reader.readAsArrayBuffer(file);
        });
      })
    );

    const formData = new FormData();
    newFiles.forEach((newFile) => {
      formData.append("media_url", newFile.file);
    });

    try {
      dispatch({ type: REQUEST_ACTION.PROCESSING });
      const {
        status,
        data: { message, data },
      } = await postRequest(WEB_CONTENT.UPLOAD_AUDIO, formData);

      if (status === RESPONSE_CODE[200]) {
        setIsLoading(false);
        setAudio((prevAudio) => [...prevAudio, ...data]);
        dispatch({ type: REQUEST_ACTION.SUCCESS, payload: {} });
        toast.success(message || "Audio files uploaded successfully!");
      } else {
        dispatch({
          type: REQUEST_ACTION.FAILURE,
          payload: { message: ApiErrorMessage() },
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Upload Error:", error);
      dispatch({
        type: REQUEST_ACTION.FAILURE,
        payload: { message: ApiErrorMessage(error) },
      });
      toast.error("An error occurred while uploading audio files.");
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={updateContent}>
        <Box sx={{ marginTop: "20px" }}>
          {isLoading ? (
            <Grid container spacing={2}>
              {[...Array(3)].map((_, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Skeleton variant="rectangular" height={150} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Grid container spacing={2}>
              {audio.length > 0 &&audio.map((audioItem, index) => (
                <Grid item xs={12} sm={6} md={4} key={audioItem.id}>
                  <Card
                    sx={{
                      padding: "10px",
                      backgroundColor: "#f9f9f9",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      boxShadow: 2,
                    }}
                  >
                    <CardContent sx={{ textAlign: "center", width: "100%" }}>
                      <Typography variant="subtitle1">
                        Audio {index + 1}
                      </Typography>
                      <ReactAudioPlayer
                        src={audioItem.url}
                        controls
                        style={{ width: "100%", marginTop: "10px" }}
                      />
                    </CardContent>
                    <Tooltip title="Delete Audio" arrow>
                      <IconButton
                        onClick={() => deleteAudio(audioItem.id)}
                        sx={{
                          color: "red",
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Card>
                </Grid>
              ))}
              {audioFiles.length > 0 &&
                audioFiles.map((audioItem, index) => (
                  <Grid item xs={12} sm={6} md={4} key={audioItem.id}>
                    <Card
                      sx={{
                        padding: "10px",
                        backgroundColor: "#f9f9f9",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        boxShadow: 2,
                      }}
                    >
                      <CardContent sx={{ textAlign: "center", width: "100%" }}>
                        <Typography variant="subtitle1">
                          Audio {index + 1}
                        </Typography>
                        <ReactAudioPlayer
                          src={audioItem.url}
                          controls
                          style={{ width: "100%", marginTop: "10px" }}
                        />
                      </CardContent>
                      <Tooltip title="Delete Audio" arrow>
                        <IconButton
                          onClick={() => deleteAudio(audioItem.id)}
                          sx={{
                            color: "red",
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          )}
        </Box>

        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          my={2}
        >
          <Button
            variant="outlined"
            component="label"
            startIcon={<UploadFileIcon />}
          >
            Upload Audio Files
            <input
              type="file"
              accept="audio/*"
              multiple
              hidden
              onChange={uploadMedia}
            />
          </Button>
        </Stack>

        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          my={2}
        >
          <LoadingButton
            loading={isLoading ? true : false}
            size="medium"
            type="submit"
            loadingPosition="end"
            endIcon={<SendIcon />}
            variant="contained"
          >
            {isLoading ? "PLEASE WAIT..." : "SUBMIT"}
          </LoadingButton>
        </Stack>
      </form>
    </>
  );
}

export default UploadAudio;
