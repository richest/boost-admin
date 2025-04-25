import React, { useEffect, useState } from "react";
import CustomModal from "components/Models";
import {
  Tabs,
  Tab,
  Box,
  Button,
  Grid,
  Typography,
  Skeleton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { drawerAction } from "views/pages/Templates/TemplateRedux/actions/drawerAction";
import { getRequest, postRequest } from "app/httpClient/axiosClient";
import { MEDIA_LIBRARY } from "app/config/endpoints";
import actions from "redux/authenticate/actions";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import toast from "react-hot-toast";
import { RESPONSE_CODE } from "app/constants";
import ReactCrop from "react-image-crop";
import UnsplashImages from "layout/ImageModel/modules/UnsplashImages";
import PixbyImages from "layout/AudioModal/modules/PixbyImages";
import MyLibrary from "layout/ImageModel/modules/MyLibrary";

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

function ImageModalEdit({
  handleAddItem,
  setOpen,
  open,
  setSelectedImage,
  selectedImage,
  handleSelectMedia,
}) {
  const [tabValue, setTabValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [activeImage, setActiveImage] = useState(null);
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({
    unit: "%",
    width: 30,
    aspect: 16 / 9,
    x: 10,
    y: 10,
  });

  const [croppedImageUrl, setCroppedImageUrl] = useState(null);
  const [data, setdata] = useState([]);
  const [unsplashImages, setUnsplashImages] = useState([]);
  const [pixibyImages, setpixbyImages] = useState([]);

  const [page, setPage] = useState(6);
  const [searchText, setSearchText] = useState("");
  const [cropModal, setOpenCropModal] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const { element } = useSelector((state) => state.DrawerReducer);
  const dispatch = useDispatch();

  const mediaImages = async () => {
    setIsLoading(true);
    try {
      const response = await getRequest(
        `${MEDIA_LIBRARY.MEDIA_LIST}?type=image`
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

  const unSplashData = async () => {
    setIsLoading(true);
    try {
      const response = await getRequest(
        `${import.meta.env.VITE_APP_UNSPLASH_URL}?per_page=${page}&query=${searchText || "random"}&client_id=${import.meta.env.VITE_APP_UNSPLASH_API_ACCESS_KEY}`
      );
      const { status, data } = response;
      if (status === 200) {
        setUnsplashImages(data);
      }
    } catch (error) {}
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
    } catch (error) {}
    setIsLoading(false);
  };

  useEffect(() => {
    if (element === "image" || element === "logo" || element === "audio") {
      setOpen(true);
      mediaImages();
      unSplashData();
      pixbyData();
    } else {
      dispatch(drawerAction(""));
      setOpen(false);
    }
  }, [element]);

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
      unSplashData();
      pixbyData();
    }
  }, [element, open]);

  useEffect(() => {
    unSplashData();
  }, [searchText]);

  const handlecheckMedia = (id) => {
    setActiveImage((prev) => (prev === id ? null : id));
  };

  const handleImageUpload = async (e) => {
    setIsLoading(true);
    console.log(e.target.files[0]);
    const files = e.target.files;
    const formData = new FormData();

    // for (let i = 0; i < files.length; i++) {
    //   formData.append("media_url", files[i]);
    // }
    // if (e.target.files) {
    //   try {
    //     const response = await postRequest(
    //       MEDIA_LIBRARY.CREATE_MEDIA,
    //       formData
    //     );
    //     const { status } = response;
    //     const { success } = response.data;

    //     if (success && status === RESPONSE_CODE[200]) {
    //       toast.success("Media uploaded");
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    //   setIsLoading(false);
    // }
  };

  const onImageLoaded = () => {
    // Handle image load event
  };

  const onCropComplete = (crop) => {
    if (selectedImage && crop.width && crop.height) {
      const canvas = document.createElement("canvas");
      const image = new Image();
      image.src = selectedImage;
      image.onload = () => {
        const ctx = canvas.getContext("2d");
        canvas.width = crop.width;
        canvas.height = crop.height;
        ctx.drawImage(
          image,
          crop.x,
          crop.y,
          crop.width,
          crop.height,
          0,
          0,
          crop.width,
          crop.height
        );
        const croppedUrl = canvas.toDataURL();
        setCroppedImageUrl(croppedUrl); // Set cropped image URL
      };
    }
  };

  return (
    <div>
      <CustomModal open={open} handleClose={handleClose}>
        <Grid container spacing={2} className="modal-grid">
          <Grid item xs={3}>
            <Tabs
              orientation="vertical"
              value={tabValue}
              onChange={handleTabChange}
              aria-label="Library Tabs"
              sx={{ borderRight: 1, borderColor: "divider" }}
            >
              <Tab label="My Library" />
              <Tab label="Free Photos by Unsplash" />
              <Tab label="Free Illustrations by Pixabay" />
            </Tabs>
            <Box sx={{ marginTop: "20px", marginLeft: "10px" }}>
              <label
                htmlFor="uploadImage"
                color="primary"
                className="upload-label-modal"
              >
                {/* <Button variant="contained" color="primary"> */}
                Upload image
                {/* </Button> */}
              </label>
              <input
                type="file"
                onChange={handleImageUpload}
                multiple
                id="uploadImage"
                style={{ display: "none" }}
              />
            </Box>
          </Grid>
          <Grid item xs={9}>
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
              />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <UnsplashImages
                data={unsplashImages}
                handleSearch={handleSearch}
                handleSelectMedia={handleSelectMedia}
                activeImage={activeImage}
                handlecheckMedia={handlecheckMedia}
                handleImageUpload={handleImageUpload}
              />
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <Typography>
                <PixbyImages
                  data={pixibyImages}
                  handleSearch={handleSearch}
                  handleSelectMedia={handleSelectMedia}
                  activeImage={activeImage}
                  handlecheckMedia={handlecheckMedia}
                  handleImageUpload={handleImageUpload}

                />
              </Typography>
            </TabPanel>
            {selectedImage && (
              <Button
                className="button button-primary  px-3 text-right"
                variant="contained"
                color="primary"
                onClick={() => handleAddItem()}
              >
                Next
              </Button>
            )}
          </Grid>
        </Grid>
      </CustomModal>

      <CustomModal open={cropModal}>
        <button className="btn" onClick={() => setOpenCropModal(false)}>
          X
        </button>
        <ReactCrop
          src={selectedImage}
          crop={crop}
          onChange={(newCrop) => setCrop(newCrop)}
          onComplete={onCropComplete}
          onImageLoaded={onImageLoaded}
        />
      </CustomModal>
    </div>
  );
}

export default ImageModalEdit;
