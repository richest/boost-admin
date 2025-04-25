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

function Integrations() {
  const { templateDetails } = useSelector((state) => state.DrawerReducer);
  console.log(templateDetails?.project_structure?.pages, "checkdesign");
  const [showData, setShowData] = useState("");
  const [showModal, setShowModal] = useState(false);
  console.log(showModal, "cehckmodalpopoooy");
  const handleShowData = (type) => {
    setShowData(type);
    setShowModal(true);
  };
  const popupRef = useRef(null);

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
              <div className="col-lg-4 col-md-6">
                <div
                  className="text-center inte-card font-sm"
                  role="button"
                  onClick={() => handleShowData("email_notify")}
                >
                  <div className="cl-toggle-switch text-center">
                    <label className="cl-switch">
                      <input
                        type="checkbox"
                        // onChange={() => handleShowData("email_notify")}
                      />
                      <span></span>
                    </label>
                  </div>
                  <img src={EMAILICON} className="mb-2" alt="" />
                  <p className="mb-0">
                    Receive in the mail all the necessary information about the
                    activities in your projects
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div
                  className="text-center inte-card font-sm"
                  onClick={() => handleShowData("GOOGLE_ANLYTICS")}
                >
                  <div className="cl-toggle-switch text-center">
                    <label className="cl-switch">
                      <input type="checkbox" />
                      <span></span>
                    </label>
                  </div>
                  <img src={GOOGLE} className="mb-2" alt="" />
                  <p className="mb-0">
                    Connect Google Analytics ID to collect statistics
                  </p>
                </div>
              </div>

              <div className="col-lg-4 col-md-6">
                <div
                  className="text-center inte-card font-sm"
                  onClick={() => handleShowData("mail_chim")}
                >
                  <div className="cl-toggle-switch text-center">
                    <label className="cl-switch">
                      <input type="checkbox" />
                      <span></span>
                    </label>
                  </div>
                  <img src={MAILCHIM} className="mb-2" alt="" />
                  <p className="mb-0">
                    Bring your audience data, marketing channels, and insights
                    together
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="text-center inte-card font-sm">
                  <div className="cl-toggle-switch text-center">
                    <label className="cl-switch">
                      <input type="checkbox" />
                      <span></span>
                    </label>
                  </div>
                  <img src={GOOGLETAG} className="mb-2" alt="" />
                  <p className="mb-0">
                    Connect Google Tag Manager ID to collect statistics
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="text-center inte-card font-sm">
                  <div className="cl-toggle-switch text-center">
                    <label className="cl-switch">
                      <input type="checkbox" />
                      <span></span>
                    </label>
                  </div>
                  <img src={WEBHOOKS} className="mb-2" alt="" />
                  <p className="mb-0">
                    Use Webhooks to send Interacty data to a compatible web app
                    or URL
                  </p>
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
