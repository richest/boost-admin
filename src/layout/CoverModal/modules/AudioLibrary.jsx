import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import CheckIcon from "@mui/icons-material/Check";
import AudioImage from "../../../assets/images/icons/audioIcon.svg";
import FolderIcon from "@mui/icons-material/Folder";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
function AudioLibrary({
  isLoading,
  data,
  handleSearch,
  handleSelectMedia,
  handlecheckMedia,
  activeImage,
  setSelectedCategory,
  audioList,
  selectedAudioFile,
  setSelectedAudioFIle,
}) {
  console.log(audioList, data, "cdchbdbdkbfdfdfdfd");
  const [audio, setAudio] = useState(null); // Track the current audio object
  const [isPlaying, setIsPlaying] = useState(false); // Track play/pause state
  const [selectedMediaId, setSelectedMediaId] = useState(null);

  const handleAudioPlayPause = (media_url, id) => {
    if (selectedMediaId === id) {
      // If the same media is selected, toggle play/pause
      if (isPlaying && audio) {
        // Pause the audio if it's already playing
        audio.pause();
        setIsPlaying(false);
      } else {
        // If audio is paused, play the new audio
        const newAudio = new Audio(media_url);
        newAudio.play();
        newAudio.onended = () => setIsPlaying(false); // Reset state when audio ends
        setAudio(newAudio); // Set the new audio object to state
        setIsPlaying(true); // Mark as playing
      }
    } else {
      // If a different media is selected, stop the current audio and play the new one
      if (audio) {
        audio.pause();
      }
      const newAudio = new Audio(media_url);
      newAudio.play();
      newAudio.onended = () => setIsPlaying(false); // Reset state when audio ends
      setAudio(newAudio); // Set the new audio object to state
      setIsPlaying(true); // Mark as playing
      setSelectedMediaId(id); // Set the currently selected media id
    }
  };

  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={12}>
          <Typography variant="h6">Free boost library</Typography>
        </Grid>
        <Grid item xs={12} md={12}>
          <ZoomOutIcon />
          <TextField
            placeholder="Search"
            variant="outlined"
            fullWidth
            onChange={(e) => handleSearch(e)}
          />
        </Grid>
      </Grid>

      <button className="btn" onClick={() => setSelectedCategory("")}>
        <ArrowBackIcon />
      </button>
      <Grid container spacing={2} style={{ marginTop: "20px" }}>
        {audioList?.length ? (
          <>
            {audioList?.map((audio) => (
              <Grid key={audio?.id} item xs={12} sm={6} md={4}>
                <Card>
                  {isLoading ? (
                    <Skeleton
                      variant="circular"
                      animation="wave"
                      width={210}
                      height={118}
                    />
                  ) : (
                    <>
                      <label
                        htmlFor={`selected-media?id=${audio?.id}`}
                        className={`media-selected ${activeImage === audio?.id ? "checked-label" : ""} audio_container`}
                      >
                        <div
                          // className={activeImage === id ? "checked-label" : ""}
                          onClick={() => {
                            setSelectedAudioFIle({
                              ...selectedAudioFile,
                              url: audio?.url,
                              name: audio?.name,
                            });
                            // setSelectedCategory(
                            //   title?.replace(/[\s/]+/g, "-").toLowerCase()
                            // );
                          }}
                          role="button"
                        >
                          <div
                            // className={activeImage === id ? "checked-label" : ""}
                            onClick={() => {
                              // setSelectedAudioFIle({
                              //   ...selectedAudioFile,
                              //   url: media_url,
                              //   name: title,
                              // });
                              setSelectedCategory(
                                audio?.name
                                  ?.replace(/[\s/]+/g, "-")
                                  .toLowerCase()
                              );
                            }}
                            role="button"
                          >
                            <button
                              className="play_button"
                              onClick={() =>
                                handleAudioPlayPause(audio?.url, audio?.id)
                              }
                            >
                              {selectedMediaId === audio?.id && isPlaying ? (
                                <PauseIcon />
                              ) : (
                                <PlayArrowIcon />
                              )}
                            </button>
                            <div className="check-icon">
                              <CheckIcon color="#fff" />
                            </div>
                            <img src={AudioImage} alt="icon" />
                            <input
                              onChange={() => handlecheckMedia(audio?.id)}
                              id={`selected-media?id=${audio?.id}`}
                              type="checkbox"
                              style={{ display: "none" }}
                              checked={activeImage === audio?.id}
                            />
                          </div>
                        </div>
                      </label>

                      <CardContent>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          className="text-center"
                        >
                          {audio?.name || "Audio File"}
                        </Typography>
                      </CardContent>
                    </>
                  )}
                </Card>
              </Grid>
            ))}
          </>
        ) : (
          <>
            {!data?.length && <p>No Data found</p>}
            {data?.map(({ title }, index) => (
              <Grid key={index} item xs={12} sm={6} md={4}>
                <Card>
                  {isLoading ? (
                    <Skeleton
                      variant="circular"
                      animation="wave"
                      width={210}
                      height={118}
                    />
                  ) : (
                    <>
                      <label
                        htmlFor={`selected-media?id=${index}`}
                        className={`media-selected ${activeImage === index ? "checked-label" : ""} audio_container`}
                      >
                        <div
                          // className={activeImage === id ? "checked-label" : ""}
                          onClick={() => {
                            // setSelectedImage({
                            //   ...selectedImage,
                            //   url: media_url,
                            //   name: title,
                            // });
                            setSelectedCategory(
                              title?.replace(/[\s/]+/g, "-").toLowerCase()
                            );
                          }}
                          role="button"
                        >
                          <FolderIcon className="icon_folder" />
                          <input
                            onChange={() => handlecheckMedia(index)}
                            id={`selected-media?id=${index}`}
                            type="checkbox"
                            style={{ display: "none" }}
                            checked={activeImage === index}
                          />
                        </div>
                      </label>

                      <CardContent>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          className="text-center"
                        >
                          {title}
                        </Typography>
                      </CardContent>
                    </>
                  )}
                </Card>
              </Grid>
            ))}
          </>
        )}
      </Grid>
    </>
  );
}

export default AudioLibrary;
