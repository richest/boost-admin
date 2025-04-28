import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EMAILICON from "../../../../assets/images/integration-email-img.png";
import GOOGLE from "../../../../assets/images/integration-google-img.png";
import MAILCHIM from "../../../../assets/images/integration-mailchimp-img.png";
import WEBHOOKS from "../../../../assets/images/integration-web-img.png";
import GOOGLETAG from "../../../../assets/images/integration-tag-img.png";
import LEADFORMPREVIEW from "../../../../assets/images/email-int.png";
import MAILCHIM1 from "../../../../assets/images/mailchim1.png";
import MAILCHIM2 from "../../../../assets/images/mailchim2.png";
import MAILCHIM3 from "../../../../assets/images/mailchim3.png";
import { Card, CardContent, CardMedia, Button, Box, IconButton, Grid, CircularProgress } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadIcon from "@mui/icons-material/CloudUpload";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import SaveIcon from "@mui/icons-material/Save";
import { postRequest, putRequest } from "app/httpClient/axiosClient";
import { IMAGE_UPLOAD, MEDIA_LIBRARY, TEMPLATES } from "app/config/endpoints";
import { getTemplateDetailsAction } from "../TemplateRedux/actions/drawerAction";

function Integrations() {
  const { templateDetails } = useSelector((state) => state.DrawerReducer);
  console.log(templateDetails, "dddddddd");
  const [showData, setShowData] = useState("");
  const [description, setDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch()
  console.log(showModal, "cehckmodalpopoooy");
  const handleShowData = (type) => {
    setShowData(type);
    setShowModal(true);
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const popupRef = useRef(null);
  const fileInputRef = useRef(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setSelectedFile(file); // store the file
    setPreviewUrl(URL.createObjectURL(file)); // for preview
  };
  const quillStyles = {
    height: "285px",
    marginBottom: "16px",
  };
  useEffect(() => {
    dispatch(getTemplateDetailsAction(templateDetails?.unique_id));
  }, []);

  const handleDelete = () => {
    console.log("click");
    setUploadedImage(null);
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const [loading, setloading] = useState(false)
  const handleSave = async () => {


    const formData = new FormData();
    formData.append("preview_image", selectedFile);
    formData.append("description", description);

    try {
      setloading(true);
      const res = await putRequest(`${TEMPLATES.UPLOADIMAGE}/${templateDetails?.unique_id}`, formData);
      // console.log(res, "resres");
      // setUploadedImage(res.data.secure_url); // Save uploaded image URL
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setloading(false);
    }
  };
  console.log(templateDetails, "dwopqh")
  useEffect(() => {
    setPreviewUrl(templateDetails?.preview_image)
    setDescription(templateDetails?.description)
  }, [templateDetails])
  return (
    <div className="dash-center overflow-auto">
      <div className="tab-box" id="tab-2">
        <div className="editor-dash d-block integration">
          <div className="container">
            <h3 className="fw-medium text-center mb-md-5 mb-4">
              Edit or view{" "}
              template details
            </h3>
            <Grid container spacing={4} justifyContent="center">
              {/* Upload Image Card */}
              <Grid item xs={12} md={6} lg={4}>
                <Card variant="outlined" sx={{ textAlign: "center", p: 2 }}>
                  <CardContent>
                    {/* If there's an uploaded image, show it */}
                    {(uploadedImage || previewUrl) ? (
                      <CardMedia
                        component="img"
                        image={uploadedImage ? uploadedImage : previewUrl ? previewUrl : `https://res.cloudinary.com/dwl5gzbuz/image/upload/v1739271156/Group_3_jl6d69.png`}
                        alt="Image"
                        sx={{ maxHeight: 250, objectFit: "contain", mb: 2 }}
                      />
                    ) : (
                      // If neither uploadedImage nor previewUrl exist, show default image
                      <CardMedia
                        component="img"
                        image={`https://res.cloudinary.com/dwl5gzbuz/image/upload/v1739271156/Group_3_jl6d69.png`}
                        alt="Default"
                        sx={{ maxHeight: 250, objectFit: "contain", mb: 2 }}
                      />
                    )}

                    {console.log(previewUrl, "previewUrl")}
                    {console.log(uploadedImage, "uploadedImage")}

                    {/* Input for uploading a new image */}
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      accept="image/*"
                      onChange={handleFileChange}
                    />

                    {/* Upload and delete buttons */}
                    <Box display="flex" justifyContent="center" gap={2} mt={2}>
                      <Button
                        variant="contained"
                        startIcon={<UploadIcon />}
                        onClick={handleUploadClick}
                        size="small"
                      >
                        Upload
                      </Button>

                      {/* <IconButton
                        color="error"
                        onClick={handleDelete}
                        disabled={!previewUrl && !uploadedImage}
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton> */}
                    </Box>
                  </CardContent>
                </Card>

              </Grid>


              <Grid item xs={12} md={6} lg={8}>
                <Card variant="outlined" sx={{ p: 2 }}>
                  <CardContent>
                    <Box sx={quillStyles}>
                      <ReactQuill
                        value={description}
                        onChange={setDescription}
                        placeholder="Enter description here..."
                        theme="snow"
                        style={{ height: "200px" }}
                      />
                    </Box>

                  </CardContent>
                </Card>
                <Box textAlign="right" mt={4}>
                  <Button
                    // variant="contained"
                    // color="success"
                    startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
                    // startIcon={<SaveIcon />}
                    onClick={handleSave}
                    className="button button-primary"
                    disabled={!description && !selectedFile}
                  >
                    {loading ? 'Saving...' : 'Save'}
                  </Button>
                </Box>
              </Grid>
            </Grid>

          </div>
        </div>

        <div
          ref={popupRef}
          className={`integration-popup ${showModal ? "active" : ""}`}
        >
          {showData === "email_notify" && (
            <div>
              <h3 className="fw-medium mb-lg-5 mb-4">Email notifications</h3>
              <img src={LEADFORMPREVIEW} className="w-100 mb-4" alt="" />
              <p>
                If you want to receive notifications about new leads, please
                enter your email in the field below.
              </p>
              <div className="mb-3">
                <label
                  for="email"
                  className="form-label fw-medium muted-text font-sm"
                >
                  Email address
                </label>
                <input type="text" className="form-control theme-control" />
              </div>
              <div className="button-group gap-2 justify-content-end">
                <a
                  href="javascript:void(0)"
                  className="button button-primary sm"
                >
                  Save
                </a>
                <button
                  className="button button-primary outline sm"
                  onClick={() => setShowModal(false)}
                >
                  Disable
                </button>
              </div>
            </div>
          )}
          {showData === "GOOGLE_ANLYTICS" && (
            <div>
              <h3 className="fw-medium mb-lg-5 mb-4">Google Analytics</h3>

              <div className="mb-3">
                <label
                  for="email"
                  className="form-label fw-medium muted-text font-sm"
                >
                  ID
                </label>
                <input type="text" className="form-control theme-control" />
              </div>
              <div className="mb-3">
                <h4>How to set up a quiz funnel in Google Analytics:</h4>
                <ol class=" list-group-numbered">
                  <li class="list-group-item">
                    Follow this{" "}
                    <Link
                      to={
                        "https://analytics.google.com/analytics/web/provision/#/provision"
                      }
                      target="_blank"
                    >
                      link
                    </Link>{" "}
                  </li>
                  <li class="list-group-item">
                    Select a project and click Create. A composite goal will be
                    created automatically.
                  </li>
                  <li class="list-group-item">
                    You can edit the target to fit your needs, remove
                    unnecessary steps
                  </li>
                  <li class="list-group-item">
                    Publish your project after the change
                  </li>
                </ol>
              </div>
              <div className="button-group gap-2 justify-content-end">
                <button className="button button-primary sm">Save</button>
                <button
                  className="button button-primary outline sm"
                  onClick={() => setShowModal(false)}
                >
                  Disable
                </button>
              </div>
            </div>
          )}
          {showData === "mail_chim" && (
            <div>
              <h3 className="fw-medium mb-lg-5 mb-4">
                Collecting leads with Mailchimp
              </h3>
              <p>
                To transfer data to your Mailchimp account, follow these steps
              </p>
              <div className="mb-3">
                <ol class=" list-group-numbered">
                  <li class="list-group-item">
                    Follow this{" "}
                    <Link
                      to={
                        "https://analytics.google.com/analytics/web/provision/#/provision"
                      }
                      target="_blank"
                    >
                      link
                    </Link>{" "}
                  </li>
                  <li class="list-group-item">
                    Select a project and click Create. A composite goal will be
                    created automatically.
                    <img src={MAILCHIM1} className="w-100 mb-4" alt="" />
                  </li>
                  <li class="list-group-item">
                    You can edit the target to fit your needs, remove
                    unnecessary steps
                  </li>
                  <li class="list-group-item">
                    Publish your project after the change
                    <img src={MAILCHIM2} className="w-100 mb-4" alt="" />
                  </li>
                  <li class="list-group-item">
                    Publish your project after the change
                    <img src={MAILCHIM3} className="w-100 mb-4" alt="" />
                    <p>
                      Everything is ready for data collection! For more
                      information click{" "}
                      <Link
                        to={
                          "https://help.interacty.me/content/how-to-collecting-leads-with-mailchimp"
                        }
                        target="_blank"
                      >
                        here
                      </Link>
                    </p>
                  </li>
                </ol>
              </div>
              <div className="button-group gap-2 justify-content-end">
                <a
                  href="javascript:void(0)"
                  className="button button-primary sm"
                >
                  Save
                </a>
                <button
                  className="button button-primary outline sm"
                  onClick={() => setShowModal(false)}
                >
                  Disable
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="overlay" role="button"></div>
      </div>
    </div>
  );
}

export default Integrations;
