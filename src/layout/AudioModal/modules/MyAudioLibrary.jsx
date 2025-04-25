import React, { useEffect, useState } from "react";
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
import AudioFileIcon from "@mui/icons-material/AudioFile";
import AudioImage from "../../../assets/images/icons/audioIcon.svg";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

function MyLibrary({
  isLoading,
  data,
  handlecheckMedia,
  activeImage,
  handleSearch,
  handleSelectMedia,
  selectedAudioFile,
  setSelectedAudioFIle,
}) {
  const [audio, setAudio] = useState(null); // Track the current audio object
  const [isPlaying, setIsPlaying] = useState(false); // Track play/pause state
  const [selectedMediaId, setSelectedMediaId] = useState(null);

  const handleAudioPlayPause = (media_url, id) => {
    if (selectedMediaId === id) {
      if (isPlaying && audio) {
        audio.pause();
        setIsPlaying(false);
      } else {
        const newAudio = new Audio(media_url);
        newAudio.play();
        newAudio.onended = () => setIsPlaying(false);
        setAudio(newAudio);
        setIsPlaying(true);
      }
    } else {
      if (audio) {
        audio.pause();
      }
      const newAudio = new Audio(media_url);
      newAudio.play();
      newAudio.onended = () => setIsPlaying(false);
      setAudio(newAudio);
      setIsPlaying(true);
      setSelectedMediaId(id);
    }
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        alignItems="center"
        className="modal-grid-wrap"
      >
        <Grid item xs={12} md={12}>
          <Typography variant="h6">My library</Typography>
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

      <Grid container spacing={2} style={{ marginTop: "20px" }}>
        {!data.length && <p>No Data found</p>}

        {data.map(({ media_url, id, name }) => (
          <Grid key={id} item xs={12} sm={6} md={4}>
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
                    htmlFor={`selected-media?id=${id}`}
                    className={`media-selected ${activeImage === id ? "checked-label" : ""} audio_container`}
                  >
                    <div
                      // className={activeImage === id ? "checked-label" : ""}
                      onClick={() => {
                        setSelectedAudioFIle({
                          ...selectedAudioFile,
                          url: media_url,
                          name: name,
                        });
                      }}
                      role="button"
                    >
                      <button
                        className="play_button"
                        onClick={() => handleAudioPlayPause(media_url, id)}
                      >
                        {selectedMediaId === id && isPlaying ? (
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
                        onChange={() => handlecheckMedia(id)}
                        id={`selected-media?id=${id}`}
                        type="checkbox"
                        style={{ display: "none" }}
                        checked={activeImage === id}
                      />
                    </div>
                  </label>

                  <CardContent className="p-0 pt-2">
                    <Typography variant="body2" color="textSecondary">
                      {name}
                    </Typography>
                  </CardContent>
                </>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default MyLibrary;
