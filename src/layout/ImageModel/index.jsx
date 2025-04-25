import React, { useEffect, useRef, useState } from "react";
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
import MyLibrary from "./modules/MyLibrary";
import { getMediaImagesAction } from "./imagesRedux/actions/imagesAction";
import { getMediaImages } from "./imagesRedux/SagaImageFunctions";
import { MEDIA_LIBRARY } from "app/config/endpoints";
import actions from "redux/authenticate/actions";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import UnsplashImages from "./modules/UnsplashImages";
import toast from "react-hot-toast";
import PixbyImages from "./modules/PixbyImages";
import { RESPONSE_CODE } from "app/constants";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Cropper from "react-easy-crop";
import { getRequest } from "app/httpClient/axiosClient";

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

function ImageModal({
  handleAddItem,
  setOpen,
  open,
  setSelectedImage,
  selectedImage,
  handleSelectMedia,
}) {
  const [image, setImage] = useState(null);
  const imgRef = useRef(null);
  const canvasRef = useRef(null);
  // Handle file or URL
  const handleLoad = (img) => {
    imgRef.current = img;
    setImage(img);
  };
  console.log(selectedImage, "wdwdwdwdw")
  const [tabValue, setTabValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [activeImage, setActiveImage] = useState(null);
  const [src, setSrc] = useState(null);
  const [completedCrop, setCompletedCrop] = useState();
  const [crop, setCrop] = useState({
    unit: "%", // Can be 'px' or '%'
    x: 25,
    y: 25,
    width: 50,
    height: 50,
  });
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState(4 / 5);
  const [scale, setScale] = useState(1);

  const [zoom, setZoom] = useState(1);
  const [shape, setShape] = useState("rectangle");
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
    } catch (error) { }
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

  const getCroppedImage = () => {
    if (!completedCrop || !imgRef.current || !canvasRef.current) return;

    const image = imgRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set canvas size
    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;

    // Draw the cropped image
    ctx.drawImage(
      image,
      completedCrop.x * (image.naturalWidth / image.width),
      completedCrop.y * (image.naturalHeight / image.height),
      completedCrop.width * (image.naturalWidth / image.width),
      completedCrop.height * (image.naturalHeight / image.height),
      0,
      0,
      completedCrop.width,
      completedCrop.height
    );

    // Convert canvas to Blob (binary data)
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, "image/png");
    });
  };

  const handleImageUpload = async (e) => {
    setIsLoading(true);
    console.log(selectedImage, "herereseleced");

    const croppedBlob = await getCroppedImage();

    // Create the cropped image file
    const binaryFile = new File([croppedBlob], "cropped-image.png", {
      type: croppedBlob?.type,
      lastModified: Date.now(),
    });

    // Check if the event contains files from the file input
    let formData = new FormData();

    // Case 1: File(s) from file input
    if (e?.target?.files && e?.target?.files?.length > 0) {
      const files = e.target.files;

      // Append all selected files (including the cropped image if necessary)
      for (let i = 0; i < files.length; i++) {
        formData.append("media_url", files[i]);
      }

      // Optionally, append the cropped image as well if needed
      formData.append("media_url", binaryFile);
    }
    // Case 2: URL (direct image URL passed)
    else if (e) {
      formData.append("media_url", e); // e is the URL passed directly
    }

    try {
      // Make the request with the form data
      const response = await postRequest(MEDIA_LIBRARY.CREATE_MEDIA, formData);
      const { status } = response;
      const { success } = response.data;

      if (success && status === RESPONSE_CODE[200]) {
        if (e?.target?.files) {
          toast.success("Media Uploaded");
          console.log(response.data, "checkresponsedatata");
        } else {
          toast.success("Media Uploaded from URL");
        }

        // Optionally reset selected image if needed
        setSelectedImage(response.data.data); // Assuming response contains the media data
        handleAddItem();
        setShape("rectangle");
        handleClose();
        setOpenCropModal(false);
      }
    } catch (error) {
      console.log(error, "checkrrrororo");
      toast.error("Error uploading media");
    }

    setIsLoading(false);
  };

  return (
    <div>
      <CustomModal open={open} handleClose={handleClose}>
        <Grid container spacing={2} className="modal-grid">
          <Grid
            item
            xs={3}
            className="pt-0 mt-3"
            sx={{ borderRight: "1px solid rgba(0, 0, 0, 0.12)" }}
          >
            <div className="d-flex flex-column justify-content-between h-100">
              <Tabs
                orientation="vertical"
                value={tabValue}
                onChange={handleTabChange}
                aria-label="Library Tabs"
              >
                <Tab
                  label="My Library"
                  className="text-start align-items-start"
                />
                <Tab label="Free Photos by Unsplash" className="text-start" />
                <Tab
                  label="Free Illustrations by Pixabay"
                  className="text-start"
                />
              </Tabs>
              <Box
                sx={{
                  marginTop: "20px",
                  paddingInline: "16px",
                  paddingBottom: "16px",
                }}
              >
                <label
                  htmlFor="uploadImage"
                  color="primary"
                  className="upload-label-modal w-100"
                >
                  {/* <Button variant="contained" color="primary"> */}
                  Upload image
                  {/* </Button> */}
                </label>
                <input
                  type="file"
                  onChange={handleImageUpload}
                  // multiple
                  id="uploadImage"
                  style={{ display: "none" }}
                />
              </Box>
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
              />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <UnsplashImages
                data={unsplashImages}
                handleSearch={handleSearch}
                handleSelectMedia={handleSelectMedia}
                activeImage={activeImage}
                handlecheckMedia={handlecheckMedia}
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
              <div className="next_cover">
                <Button
                  className="button button-primary px-4 text-right"
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    if (tabValue === 1 || tabValue === 2) {
                      handleImageUpload(selectedImage);
                    } else {
                      console.log("23444444444444444444444444444444")
                      handleAddItem();
                    }
                  }}
                >
                  Next
                </Button>
              </div>
            )}
          </Grid>
        </Grid>
      </CustomModal>

      <CustomModal open={cropModal}>
        <button className="btn" onClick={() => setOpenCropModal(false)}>
          X
        </button>

        <div className="croppermodal">
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            minHeight={100}
            circularCrop={shape === "circle" ? true : false}
          >
            <img
              ref={imgRef}
              alt="Crop me"
              crossOrigin="anonymous"
              src={selectedImage}
            />
          </ReactCrop>

          <div className="button_cropper">
            <label>Shape:</label>
            <button onClick={() => setShape("rectangle")}>Rectangle</button>
            <button onClick={() => setShape("circle")}>Circle</button>
            <button
              onClick={() => {
                if (tabValue === 1 || tabValue === 2) {
                  handleImageUpload();
                } else {
                  handleAddItem();
                }
              }}
            >
              Place image
            </button>
          </div>
        </div>

        <canvas ref={canvasRef} style={{ display: "none" }} />
        {/* <canvas ref={canvasRef}  /> */}
      </CustomModal>
    </div>
  );
}

export default ImageModal;
