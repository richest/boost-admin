import React from "react";
import "./cover.css";
import parse from "html-react-parser";
import "react-quill/dist/quill.snow.css";
import TextEditor from "components/Text-editor";
function CoverPreview({
  isSelected,
  data,
  handleSave,
  handleChangeText,
  handleSaveButtonText,
  handleChangeTextButton,
  text,
  hiddenRef,
}) {
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

  console.log(text, "chjecktexthjeoghththht");

  return (
    <div className=" block-7 preview-Cover">
      <div
        ref={hiddenRef}
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
          style={{ textAlign: `${data?.logotypePosition || "left"}` }}
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
          <div
            className="ql-editor"
            dangerouslySetInnerHTML={{ __html: data?.text }}
          ></div>

          {data?.isShowButton && (
            <div
              className="conver-button-main_piewew"
              style={{ textAlign: `${data?.buttonPosition}` }}
            >
              <div style={{ display: `inline-block` }}>
                <div
                  className="button_button_mainproperty_wewew"
                  style={{
                    borderRadius: `${data?.buttonBorderRadius}px`,
                    backgroundColor: `${data?.buttonBackgroundColor}`,
                  }}
                >
                  <div
                    className="ql-editor"
                    dangerouslySetInnerHTML={{ __html: data?.buttonText }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default CoverPreview;
