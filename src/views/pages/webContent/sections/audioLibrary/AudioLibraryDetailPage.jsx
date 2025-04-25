import React, { useEffect, useState } from "react";
import AppHelmet from "components/admin-ui/helmet";
import {
  DEFAULT_APP_TITLE,
  RESPONSE_CODE,
  ROUTE_SLUGS,
} from "app/constants";
import PageContainer from "components/admin-ui/container";
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
import PageBreadcrumbs from "components/admin-ui/breadcrumbs";
import { Link, useLocation } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { WEB_CONTENT } from "app/config/endpoints";
import { REQUEST_ACTION } from "redux/authenticate/actions";
import { ApiErrorMessage } from "utils/helpers/function/apiErrorResonse";
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "app/httpClient/axiosClient";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { LoadingButton } from "@mui/lab";
import ReactAudioPlayer from "react-audio-player";
import { Box } from "@mui/system";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";

function AudioLibraryDetailPage() {
  const location = useLocation();
  const audioSection = location?.state?.category;
  const dispatch = useDispatch();
  const [audio, setAudio] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const deleteAudio = async (id) => {
    setIsLoading(true);
    try {
      dispatch({ type: REQUEST_ACTION.PROCESSING });
      const {
        status,
        data,
      } = await deleteRequest(`${WEB_CONTENT.DELETE_AUDIO}/${id}`);

      if (status === RESPONSE_CODE[200]) {
        dispatch({
          type: REQUEST_ACTION.SUCCESS,
          payload: { message: data.message },
        });
        toast.success(data.message);
        const updatedAudio = audio.filter((audio) => audio.id !== id);
        setAudio(updatedAudio);

        const payload = {
          key: "AUDIO_LIBRARY",
          section: audioSection,
          value: JSON.stringify({ audioFiles: updatedAudio }),
          status: 1,
        };

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
        } else {
          dispatch({ type: REQUEST_ACTION.FAILURE });
          toast.error("Failed to update content after deletion.");
        }
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
    } finally {
      setIsLoading(false);
    }
  };

  const uploadMedia = async (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      toast.error("No files selected!");
      return;
    }

    const files = Array.from(event.target.files);
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("media_url", file);
    });

    setIsLoading(true);
    try {
      dispatch({ type: REQUEST_ACTION.PROCESSING });

      const {
        status,
        data: { message, data },
      } = await postRequest(WEB_CONTENT.UPLOAD_AUDIO, formData);

      if (status === RESPONSE_CODE[200]) {
        setAudio((prevAudio) => [...prevAudio, ...data]);
        dispatch({
          type: REQUEST_ACTION.SUCCESS,
          payload: { message: message },
        });
        toast.success(message);
      } else {
        dispatch({ type: REQUEST_ACTION.FAILURE });
        toast.error("Failed to upload audio files.");
      }
    } catch (error) {
      dispatch({
        type: REQUEST_ACTION.FAILURE,
        payload: { message: ApiErrorMessage(error) },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateContent = async (event) => {
    event.preventDefault();
    if (audio.length === 0) {
      toast.error("No files selected.");
      return;
    }

    const payload = {
      key: "AUDIO_LIBRARY",
      section: audioSection,
      value: JSON.stringify({ audioFiles: audio }),
      status: 1,
    };

    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  const getContent = async () => {
    setIsLoading(true);
    try {
      const { status, data } = await getRequest(
        `${WEB_CONTENT.GET}?key=AUDIO_LIBRARY&section=${audioSection}`
      );

      if (status === RESPONSE_CODE[200]) {
        const parsedValue = JSON.parse(data?.data?.value || "{}");
        setAudio(parsedValue.audioFiles || []);
      } else {
        toast.error("Failed to fetch audio library.");
      }
    } catch (error) {
      toast.error("An error occurred while fetching audio library.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getContent();
  }, []);

  return (
    <>
      <AppHelmet title={DEFAULT_APP_TITLE.AUDIO_LIBRARY} />
      <PageContainer className="page-container users-page" heading="Add Audio">
        <Grid
          container
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={2}
        >
          <Grid item>
            <PageBreadcrumbs
              breadcrumbs={[
                <Link
                  style={{ color: "rgb(99, 115, 129)", textDecoration: "none" }}
                  to={ROUTE_SLUGS.DASHBOARD}
                >
                  dashboard
                </Link>,
                <Link
                  style={{
                    color: "rgb(99, 115, 129)",
                    textDecoration: "none",
                  }}
                  to={ROUTE_SLUGS.WEB_CONTENT}
                >
                  web content
                </Link>,
                <Link
                  style={{ color: "rgb(99, 115, 129)", textDecoration: "none" }}
                  to={ROUTE_SLUGS.AUDIO_LIBRARY}
                >
                  {DEFAULT_APP_TITLE.AUDIO_LIBRARY}
                </Link>,
                location?.state?.category,
              ]}
            />
          </Grid>
          <Grid item mr={1}>
            <Link className="h-link" to={ROUTE_SLUGS.AUDIO_LIBRARY}>
              <Button
                sx={{ borderRadius: "2pt" }}
                variant="contained"
                color="primary"
                startIcon={<ArrowBackIcon />}
              >
                Back
              </Button>
            </Link>
          </Grid>
        </Grid>

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
                {audio.length > 0 &&
                  audio.map((audioItem, index) => (
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
                        <CardContent
                          sx={{ textAlign: "center", width: "100%" }}
                        >
                          <Typography variant="subtitle1">
                            {audioItem.name || "Audio File"}
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
      </PageContainer>
    </>
  );
}

export default AudioLibraryDetailPage;
