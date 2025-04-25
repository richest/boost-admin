import React from "react";
import "./layout.css";
import TextEditor from "components/Text-editor";
import CoverPreview from "components/PreviewBlocks/Cover";
function CoverLayout({
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
    <>
      <div className={isSelected ? "block-builder selected" : "block-builder"}>
        <button className="plus-selected">
          <i className="fa-solid fa-plus"></i>
        </button>

        <div className="main-block block-7 ">
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
              <p className="cover-content-mainText_qwqwwqwq">
                <div>
                  <TextEditor
                    text={data?.text}
                    handleSave={handleSave}
                    handleChange={handleChangeText}
                  />
                </div>
              </p>
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
                      <div>
                        <TextEditor
                          text={data?.buttonText}
                          handleSave={handleSaveButtonText}
                          handleChange={handleChangeTextButton}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div></div>
          </div>
        </div>

        <ul
          className={`${isSelected ? "inlineControls selected-controls" : "inlineControls"}  `}
        >
          <li className="Inline_control__list" title="Move up">
            <i className="fa-solid fa-arrow-up"></i>
          </li>
          <li className="Inline_control__list" title="Move down">
            <i className="fa-solid fa-arrow-down"></i>
          </li>
          <li className="Inline_control__list" title="Clone">
            <i className="fa-solid fa-copy"></i>
          </li>
          <li
            className="Inline_control__list"
            title="Remove"
            data-test="delete-block"
          >
            <i className="fa-solid fa-trash"></i>
          </li>
        </ul>
      </div>
      <CoverPreview
        isSelected={isSelected}
        data={data}
        handleSave={handleSave}
        handleChangeText={handleChangeText}
        handleSaveButtonText={handleSaveButtonText}
        handleChangeTextButton={handleChangeTextButton}
        text={text}
        hiddenRef={hiddenRef}
      />
    </>
  );
}

export default CoverLayout;
