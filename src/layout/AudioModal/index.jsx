import React, { useEffect, useRef, useState } from "react";
import CustomModal from "components/Models";
import {
  Tabs,
  Tab,
  Box,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { drawerAction } from "views/pages/Templates/TemplateRedux/actions/drawerAction";
import MyLibrary from "./modules/MyAudioLibrary";
import { MEDIA_LIBRARY } from "app/config/endpoints";
import "nprogress/nprogress.css";
import toast from "react-hot-toast";
import { RESPONSE_CODE } from "app/constants";
import AudioLibrary from "./modules/AudioLibrary";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { WaveSurfer } from "wavesurfer-react";
import { getRequest, postRequest } from "app/httpClient/axiosClient";

function TabPanel(props) {
  
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function AudioModal({
  handleAddItem,
  setOpen,
  open,
  setSelectedImage,
  selectedImage,
  handleSelectMedia,
  selectedAudioFile,
  setSelectedAudioFIle,
  setSelectedAudioProperties
}) {
  const [audioFile, setAudioFile] = useState(null);
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);

  const [tabValue, setTabValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [activeImage, setActiveImage] = useState(null);
  const [audioCategories, setAudioCategories] = useState({});
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({
    unit: "%",
    width: 30,
    aspect: 16 / 9,
    x: 10,
    y: 10,
  });
  const recorderControls = useAudioRecorder();

  const [croppedImageUrl, setCroppedImageUrl] = useState(null);
  const [data, setdata] = useState([]);
  const [audioList, setAudioList] = useState([]);
  const [pixibyImages, setpixbyImages] = useState([]);
  const [page, setPage] = useState(6);
  const [searchText, setSearchText] = useState("");
  const [recordModal, setRecordModal] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleStopRecording = (audioBlob) => {
    setAudioFile(audioBlob);
    // Generate a URL from the blob and pass it to the waveform
    const audioUrl = URL.createObjectURL(audioBlob);
    if (wavesurfer.current) {
      wavesurfer.current.load(audioUrl);
    }
  };

  // const handleUpload = async () => {
  //   if (audioFile) {
  //     const formData = new FormData();
  //     formData.append('audio', audioFile, 'audio.wav');

  //     try {
  //       const response = await fetch('/upload', {
  //         method: 'POST',
  //         body: formData,
  //       });
  //       if (response.ok) {
  //         alert('Audio uploaded successfully');
  //       } else {
  //         alert('Failed to upload audio');
  //       }
  //     } catch (error) {
  //       console.error('Error uploading audio:', error);
  //       alert('Error uploading audio');
  //     }
  //   }
  // };

  const { element } = useSelector((state) => state.DrawerReducer);
  const dispatch = useDispatch();

  const mediaImages = async () => {
    setIsLoading(true);
    try {
      const response = await getRequest(
        `${MEDIA_LIBRARY.MEDIA_LIST}?type=audio`
      );
      const {
        status,
        data: {
          data: { mediaDetails },
        },
      } = response;

      if (status === 200) {
        setdata(mediaDetails.rows);
      }
    } catch (error) {
      toast.error(`${error.response.data.message}`);
    }
    setIsLoading(false);
  };

  const getAudioCategoryList = async () => {
    setIsLoading(true);
    try {
      const response = await getRequest(
        `${MEDIA_LIBRARY.MEDIA_LIST_AUDIO_CATEGORY}&section=CATEGORY`
      );
      const {
        status,
        data: { data },
      } = response;

      if (status === 200) {
        setAudioCategories(JSON.parse(data?.value));
      }
    } catch (error) {
      toast.error(`${error.response.data.message}`);
    }
    setIsLoading(false);
  };

  const getAudioList = async () => {
    setIsLoading(true);
    try {
      const response = await getRequest(
        `${MEDIA_LIBRARY.MEDIA_LIST_AUDIO_CATEGORY}&section=${selectedCategory}`
      );
      const {
        status,
        data: { data },
      } = response;
      console.log(data, "checkAudioList");
      if (status === 200) {
        setAudioList(JSON.parse(data?.value));
      }
    } catch (error) {
      toast.error(`${error.response.data.message}`);
    }
    setIsLoading(false);
  };

  const pixbyData = async () => {
    setIsLoading(true);
    try {
      const response = await getRequest(MEDIA_LIBRARY.PIXBY_LIST);
      const {
        status,
        data: {
          data: { images },
        },
      } = response;
      if (status === 200) {
        setpixbyImages(images);
      }
    } catch (error) { }
    setIsLoading(false);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(drawerAction(""));
  };

  useEffect(() => {
    if (open) {
      mediaImages();
      getAudioCategoryList();
      pixbyData();
    }
  }, [element, open]);

  useEffect(() => {
    getAudioList();
  }, [selectedCategory, open]);

  const handlecheckMedia = (id) => {
    setActiveImage((prev) => (prev === id ? null : id));
  };

  const handleAudioUpload = async (e) => {
    setIsLoading(true);
    console.log(e.target.files[0]);
    const files = e.target.files;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("media_url", files[i]);
    }
    if (e.target.files) {
      try {
        const response = await postRequest(
          MEDIA_LIBRARY.CREATE_MEDIA,
          formData
        );
        const { status } = response;
        const { success } = response.data;

        if (success && status === RESPONSE_CODE[200]) {
          alert("success");
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }
  };


  const addAudioElement = async (blob) => {
    setIsLoading(true);
    const myFile = new File([blob], `voice.mp3`, {
      type: blob.type.split(";")[0],
    });
    console.log(myFile, "myfileeee");
    setAudioFile(myFile);
    const files = myFile;
    const formData = new FormData();
    formData.append("media_url", myFile);
    try {
      const response = await postRequest(MEDIA_LIBRARY.CREATE_MEDIA, formData);
      const { status } = response;
      const { success } = response.data;

      if (success && status === RESPONSE_CODE[200]) {
        alert("success");
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  console.log(audioList, "audioCategoriesaudioCategories");
  return (
    <div>
      <CustomModal open={open} handleClose={handleClose}>
        <Grid container spacing={2} className="modal-grid">
          <Grid item xs={3} className="pt-0 mt-3" sx={{ borderRight: '1px solid rgba(0, 0, 0, 0.12)' }}>
            <div className="d-flex flex-column justify-content-between h-100">
              <Tabs
                orientation="vertical"
                value={tabValue}
                onChange={handleTabChange}
                aria-label="Library Tabs"
              >
                <Tab label="Audio Library" className="text-start align-items-start"/>
                <Tab label="Free boost library" className="text-start align-items-start"/>
              </Tabs>
              <div className="" style={{ marginTop: "20px", paddingInline: "16px", paddingBottom: '16px' }}>
                <Box sx={{}}>
                  <label
                    htmlFor="uploadImage"
                    color="primary"
                    className="upload-label-modal w-100"
                  >
                    {/* <Button variant="contained" color="primary"> */}
                    Upload audio
                    {/* </Button> */}
                  </label>
                  <input
                    type="file"
                    onChange={handleAudioUpload}
                    multiple
                    id="uploadImage"
                    style={{ display: "none" }}
                  />
                </Box>
                <Box sx={{ marginTop: "10px" }}>
                  <label
                    color="primary"
                    className="upload-label-modal record_button w-100"
                    onClick={() => setRecordModal(true)}
                  >
                    {/* <Button variant="contained" color="primary"> */}
                    Record Voice
                    {/* </Button> */}
                  </label>
                </Box>
              </div>
            </div>
          </Grid>
          <Grid item xs={9} className="ps-0 pt-0 mt-3">
            <TabPanel value={tabValue} index={0}>
              <MyLibrary
                isLoading={isLoading}
                data={data}
                handleSearch={handleSearch}
                activeImage={activeImage}
                handlecheckMedia={handlecheckMedia}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                handleSelectMedia={handleSelectMedia}
                selectedAudioFile={selectedAudioFile}
                setSelectedAudioFIle={setSelectedAudioFIle}

              />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <AudioLibrary
                data={audioCategories?.categories}
                handleSearch={handleSearch}
                handleSelectMedia={handleSelectMedia}
                activeImage={activeImage}
                handlecheckMedia={handlecheckMedia}
                setSelectedCategory={setSelectedCategory}
                audioList={audioList?.audioFiles}
                selectedAudioFile={selectedAudioFile}
                setSelectedAudioFIle={setSelectedAudioFIle}

              />
            </TabPanel>

            {selectedImage && (
              <div className="next_cover">
              <Button
                className="button button-primary  px-3 text-right"
                variant="contained"
                color="primary"
                onClick={() => handleAddItem()}
              >
                Next
              </Button>
              </div>
            )}
          </Grid>
        </Grid>
      </CustomModal>

      <CustomModal
        open={recordModal}
        width={350}
        handleClose={() => setRecordModal(false)}
      >
        <div className="modal_recorder">
          <AudioRecorder
            onRecordingComplete={addAudioElement}
            recorderControls={recorderControls}
            audioTrackConstraints={{
              noiseSuppression: true,
              echoCancellation: true,
            }}
          />
          <p>Click to start recording</p>
        </div>
        {audioFile && (
          <WaveSurfer
            audioFile={audioFile}
            ref={waveformRef}
            options={{
              waveColor: "#4E9F3D",
              progressColor: "#2C7A32",
              height: 150,
            }}
          />
        )}
      </CustomModal>
    </div>
  );
}

export default AudioModal;
