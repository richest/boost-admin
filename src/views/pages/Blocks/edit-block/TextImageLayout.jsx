import React from "react";
import TextEditor from "components/Text-editor";
function TextImageLayout({ data }) {
  console.log(data, "checkdatatextimage");
  return (
    <div className={"block-builder"}>
      <div
        className={`main-block block-8 ${data?.textPosition === "left" && "text-right-left"}`}
        style={{
          backgroundColor: `${data?.isTransparentBackground ? "transparent" : data?.backgroundColor}`,
          flexDirection: `${data?.textPosition === "left" ? "row-reverse" : "row"} `
        }}
      >
        <img src={data?.imageUrl} className="image-text_ewe21" />
        <div className="textImage-content_jsbf3">
          <p className="TextAndImage_contentText__YN2O8">
            <div>
              <TextEditor text={data?.text} />
            </div>
          </p>
          {data?.isShowButton && (
            <div className="TextAndImage_Button__osWetw">
              <div
                className="Button_button__QOWDSA"
                style={{
                  backgroundColor: `${data?.buttonBackgroundColor}`,
                  borderRadius: `${data?.buttonBorderRadius}`,
                }}
              >
                <div>
                  <TextEditor text={data?.buttonText} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TextImageLayout;
