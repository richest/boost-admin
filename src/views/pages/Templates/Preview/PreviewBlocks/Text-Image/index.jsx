import React from "react";
import "./text-image.css";
import TextEditor from "components/Text-editor";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function PreviewTextImage({ data }) {
  const { templateDetails } = useSelector((state) => state.DrawerReducer);
 
  return (
    <div>
      <div
        className={`main-block block-8 ${data?.textPosition === "left" && "text-right-left"}`}
        style={{
          backgroundColor: `${data?.isTransparentBackground ? "transparent" : data?.backgroundColor}`,
          flexDirection: `${data?.textPosition === "left" ? "row-reverse" : "row"} `,
        }}
      >
        <img src={data?.imageUrl} className="image-text_ewe21" />
        <div className="textImage-content_jsbf3">
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
            <div className="TextAndImage_Button__osWetw">
              {templateDetails?.project_structure?.app?.isOpenLinksInNewTab ? (
                <Link to={data?.buttonUrl} target="_blank">
                  <div
                    className="Button_button__QOWDSA"
                    style={{
                      borderRadius: `${data?.buttonBorderRadius}px`,
                      backgroundColor: `${data?.buttonBackgroundColor}`,
                    }}
                  >
                    <div>
                      <div
                        className="ql-editor"
                        style={{ padding: "0" }}
                        dangerouslySetInnerHTML={{ __html: data?.buttonText }}
                      ></div>
                    </div>
                  </div>
                </Link>
              ) : (
                <Link to={data?.buttonUrl}>
                  <div
                    className="Button_button__QOWDSA"
                    style={{
                      borderRadius: `${data?.buttonBorderRadius}px`,

                      backgroundColor: `${data?.buttonBackgroundColor}`,
                    }}
                  >
                    <div>
                      <div
                        className="ql-editor"
                        style={{ padding: "0" }}
                        dangerouslySetInnerHTML={{ __html: data?.buttonText }}
                      ></div>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PreviewTextImage;
