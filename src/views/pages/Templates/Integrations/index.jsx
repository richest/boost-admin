import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import EMAILICON from "../../../../assets/images/integration-email-img.png";
import GOOGLE from "../../../../assets/images/integration-google-img.png";
import MAILCHIM from "../../../../assets/images/integration-mailchimp-img.png";
import WEBHOOKS from "../../../../assets/images/integration-web-img.png";
import GOOGLETAG from "../../../../assets/images/integration-tag-img.png";
import LEADFORMPREVIEW from "../../../../assets/images/email-int.png";
import MAILCHIM1 from "../../../../assets/images/mailchim1.png";
import MAILCHIM2 from "../../../../assets/images/mailchim2.png";
import MAILCHIM3 from "../../../../assets/images/mailchim3.png";

import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import { postRequest } from "app/httpClient/axiosClient";

function Integrations() {
  const { templateDetails } = useSelector((state) => state.DrawerReducer);
  console.log(templateDetails?.project_structure?.pages, "checkdesign");
  const [showData, setShowData] = useState("");
  const [description, setDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  console.log(showModal, "cehckmodalpopoooy");
  const handleShowData = (type) => {
    setShowData(type);
    setShowModal(true);
  };
  const popupRef = useRef(null);
  const fileInputRef = useRef(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Example: Uploading to Cloudinary or your own API
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_upload_preset"); // for Cloudinary

    try {
      const res = await postRequest(MEDIA_LIBRARY.CREATE_MEDIA, formData);
      setUploadedImage(res.data.secure_url); // Save uploaded image URL
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  const handleDelete = () => {
    setUploadedImage(null); // Just clear it from UI
    // Optional: call API to delete image from server
  };
  return (
    <div className="dash-center overflow-auto">
      <div className="tab-box" id="tab-2">
        <div className="editor-dash d-block integration">

          <div className="container">
            <h3 className="fw-medium text-center mb-md-5 mb-4">
              Add integrations or <span className="primary-text">skip</span>{" "}
              this step
            </h3>
            <div className="row justify-content-center g-4">

              {/* Top large image display */}
              <div className="col-12 mb-4">
                <img
                  src="https://res.cloudinary.com/dwl5gzbuz/image/upload/v1738148606/project-thumb_laxubz.png"
                  alt="question-image"
                  className="img-fluid large-top-image"
                />

              </div>

              {/* First card */}
              <div className="col-lg-4 col-md-6">
                <div className="text-center inte-card font-sm" role="button">
                  {uploadedImage && (
                    <img
                      src={uploadedImage}
                      alt="Uploaded"
                      className="img-fluid large-top-image mb-3"
                    />
                  )}

                  <div className="upload-container">
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    <div className="d-flex align-items-start justify-content-center">
                      <button
                        className="button button-primary border-0 me-2 font-sm"
                        onClick={handleUploadClick}
                      >
                        Upload
                      </button>
                      <button
                        className="button button-secondary px-3 border-0 font-sm"
                        onClick={handleDelete}
                        disabled={!uploadedImage}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Second card with editor */}
              <div className="col-lg-4 col-md-6">
                <div className="text-center inte-card font-sm">
                  <ReactQuill
                    value={description}
                    onChange={setDescription}
                    placeholder="Enter description here..."
                    theme="snow"
                  />
                </div>
              </div>

            </div>

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
