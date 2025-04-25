import React from "react";
import "./cover.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function PreviewCover({ data }) {
  const { templateDetails } = useSelector((state) => state.DrawerReducer);
  console.log(data, "coverDatatatatatatatatatat");
  let minHeight;
  if (data?.imageProportions === "1:1") {
    minHeight = "800px";
  } else if (data?.imageProportions === "5:4") {
    minHeight = "640px";
  } else if (data?.imageProportions === "4:3") {
    minHeight = "600px";
  } else if (data?.imageProportions === "3:2") {
    minHeight = "533.333px";
  } else if (data?.imageProportions === "16:9") {
    minHeight = "450px";
  } else {
    minHeight = "450px";
  }

  return (
    <div>
      <div className="main-block block-7 ">
        <div
          className="cover_background-image_derw21"
          style={{
            backgroundImage: `url(${data?.imageUrl})`,
            "--overlayColor": `rgba(0,0,0,${data?.darkenBackground / 100})`,
          }}
        ></div>

        <div
          className="conver-content_ddetw1"
          style={{
            minHeight: `${minHeight}`,
            justifyContent: `${"space-between"}`,
          }}
        >
          <div
            className="cover-content-logo_qwasf"
            style={{ textAlign: `${data?.logotypePosition}` }}
          >
            {data?.isShowLogotype && (
              <img
                src={data?.logotypeUrl}
                alt="logo"
                style={{ width: `${data?.logotypeScale}%` }}
              />
            )}
          </div>

          <div>
            <p className="">
              <div>
                <div
                  className="ql-editor"
                  style={{ padding: "0" }}
                  dangerouslySetInnerHTML={{ __html: data?.text }}
                ></div>
              </div>
            </p>
            {data?.isShowButton && (
              <div
                className=""
                style={{ textAlign: `${data?.buttonPosition}` }}
              >
                {templateDetails?.project_structure?.app
                  ?.isOpenLinksInNewTab ? (
                  <Link to={data?.buttonUrl} target="_blank">
                    <div style={{ display: `inline-block` }}>
                      <div
                        className="button_button_mainproperty_wewew"
                        style={{
                          borderRadius: `${data?.buttonBorderRadius}px`,
                          backgroundColor: `${data?.buttonBackgroundColor}`,
                          padding: "0",
                        }}
                      >
                        <div>
                          <div
                            className="ql-editor"
                            dangerouslySetInnerHTML={{
                              __html: data?.buttonText,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <Link to={data?.buttonUrl}>
                    <div style={{ display: `inline-block` }}>
                      <div
                        className="button_button_mainproperty_wewew"
                        style={{
                          borderRadius: `${data?.buttonBorderRadius}px`,
                          backgroundColor: `${data?.buttonBackgroundColor}`,
                          padding: "0",
                        }}
                      >
                        <div>
                          <div
                            className="ql-editor"
                            dangerouslySetInnerHTML={{
                              __html: data?.buttonText,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewCover;
