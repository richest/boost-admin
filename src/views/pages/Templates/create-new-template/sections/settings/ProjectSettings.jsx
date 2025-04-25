import React, { useEffect, useRef, useState } from "react";
import { SketchPicker } from "react-color";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setOnLocalStorage } from "utils/localStorage";
import { STORAGE_INDEXES } from "app/constants";
import { updateTemplateAction } from "views/pages/Templates/TemplateRedux/actions/drawerAction";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import Select from "react-select";

function ProjectSettings({
  handleChangeMedia,
  data,
  selectedBlockSettings,
  pageData,
}) {
  console.log(selectedBlockSettings, "dshsvdkjskjfdvskjfvskfvskkkfsf");
  //   const { id, imageUrl } = selectedBlockSettings;

  const [showColorPicker, setShowColorPicker] = useState(false);

  const { templateDetails } = useSelector((state) => state.DrawerReducer);
  console.log(templateDetails, "TEMPPPPPP");
  const [maxwidthValue, setMaxWidthValue] = useState(
    templateDetails?.project_structure?.app?.maxWidth || ""
  );

  console.log(
    templateDetails,
    "templateDetailstemplateDetailstemplateDetailstemplateDetailstemplateDetailstemplateDetails"
  );

  const colorPickerRef = useRef(null);
  const dispatch = useDispatch();
  const options = [
    { value: "1:1", label: "1:1" },
    { value: "5.4", label: "5.4" },
    { value: "4:3", label: "4:3" },
    { value: "3:2", label: "3:2" },
    { value: "16:9", label: "16:9" },
  ];

  const handleMaxWidth = (target) => {
    const { value: e } = target;
    const newObject = {
      ...templateDetails.project_structure.app,
      maxWidth: e,
    };

    const _data = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        app: newObject,
      },
    };
    dispatch(updateTemplateAction(_data));
  };
  const handleMaxWidthOnBlur = (target) => {
    const { value: e } = target;
    let newObject;
    if (e < 350) {
      newObject = {
        ...templateDetails.project_structure.app,
        maxWidth: 350,
      };

      target.value = 350;
    } else if (e > 4320) {
      newObject = {
        ...templateDetails.project_structure.app,
        maxWidth: 4320,
      };

      target.value = 4320;
    } else {
      newObject = {
        ...templateDetails.project_structure.app,
        maxWidth: e,
      };
    }
    const _data = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        app: newObject,
      },
    };
    dispatch(updateTemplateAction(_data));
  };
  const handleTransParentBackground = (e) => {
    const newObject = {
      ...templateDetails.project_structure.app,
      isTransparentBackground: e,
    };
    const _data = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        app: newObject,
      },
    };
    dispatch(updateTemplateAction(_data));
  };

  const handleChangeColorInput = (e) => {
    const newObject = {
      ...templateDetails.project_structure.app,
      colorTheme: e,
    };
    const _data = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        app: newObject,
      },
    };
    dispatch(updateTemplateAction(_data));
  };

  const handleChangeColorInputPicker = (color) => {
    const newObject = {
      ...templateDetails.project_structure.app,
      colorTheme: color,
    };
    const _data = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        app: newObject,
      },
    };
    dispatch(updateTemplateAction(_data));
  };
  const handleDeleteBgImage = () => {
    const newObject = {
      ...templateDetails.project_structure.app,
      backgroundImage: "",
    };
    const _data = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        app: newObject,
      },
    };
    dispatch(updateTemplateAction(_data));
  };

  const handleOpenLinksNewTab = (e) => {
    const newObject = {
      ...templateDetails.project_structure.app,
      isOpenLinksInNewTab: e,
    };
    const _data = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        app: newObject,
      },
    };
    dispatch(updateTemplateAction(_data));
  };

  const handleShowNavigation = (e)=> {
    const newObject = {
      ...templateDetails.project_structure.app,
      isPresentationMode: e,
    };
    const _data = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        app: newObject,
      },
    };
    dispatch(updateTemplateAction(_data));
  }
  // useEffect(() => {
  //   if (pageData) {
  //     const block = pageData.blocks.find((block) => block.id === id);
  //     console.log(block, "checkzBLock");
  //     setBlockValues(block);
  //   }
  // }, [pageData, templateDetails]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target)
      ) {
        setShowColorPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="panel-wrap">
      <div className="setting-block border-bottom">
        <h6 className="fw-semibold">Project settings</h6>
        <label className="d-flex align-items-center gap-2 font-sm fw-medium">
          <input
            type="checkbox"
            className="form-check-input theme-control"
            role="button"
            onChange={(e) => handleShowNavigation(e.target.checked)}
            checked={
              templateDetails?.project_structure?.app?.isPresentationMode
            }
          />
          Show page navigation
        </label>
      </div>
      <div className="setting-block border-bottom">
        <label className="form-label font-sm fw-medium d-flex align-items-center gap-2">
          Max width
          {/* <i
            className="fa-light fa-circle-question muted-text"
            role="button"
          ></i> */}
        </label>
        <input
          type="text"
          onInput={(e) => {
            if (e.target.value < 350) {
              setMaxWidthValue(350);
            } else {
              setMaxWidthValue(e.target.value);
            }
          }}
          className="form-control theme-control input-md"
          onChange={(e) => handleMaxWidth(e.target)}
          onBlur={(e) => handleMaxWidthOnBlur(e.target)}
          defaultValue={maxwidthValue}
        />
      </div>
      <div className="setting-block border-bottom">
        <label className="d-flex align-items-center gap-2 font-sm fw-medium mb-3">
          <input
            type="checkbox"
            className="form-check-input theme-control"
            role="button"
            onChange={(e) => handleTransParentBackground(e.target.checked)}
            checked={
              templateDetails?.project_structure?.app?.isTransparentBackground
            }
          />
          <span className="d-flex align-items-center gap-2">
            Transparent background
            {/* <i
              className="fa-light fa-circle-question muted-text"
              role="button"
            ></i> */}
          </span>
        </label>

        {!templateDetails?.project_structure?.app?.isTransparentBackground && (
          <>
            <div>
              <label className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                Background color
              </label>
              <div ref={colorPickerRef}>
                <div className="d-flex align-items-center">
                  <div
                    className="color-picker-color"
                    style={{
                      backgroundColor: `${templateDetails?.project_structure?.app?.colorTheme}`,
                    }}
                    role="button"
                    onClick={() => setShowColorPicker(!showColorPicker)}
                  ></div>
                  <input
                    className="colorInput form-control theme-control"
                    type="text"
                    defaultValue={
                      templateDetails?.project_structure?.app?.colorTheme
                    }
                    onChange={(e) => handleChangeColorInput(e.target.value)}
                  />
                </div>

                {showColorPicker && (
                  <SketchPicker
                    color={templateDetails?.project_structure?.app?.colorTheme}
                    onChange={(color) =>
                      handleChangeColorInputPicker(color.hex)
                    }
                  />
                )}
              </div>
            </div>
            <div className="upload-button mt-3">
              <label className="upload-button__label form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                Image
              </label>
              <div className="content upload">
                {templateDetails?.project_structure?.app?.backgroundImage && (
                  <img
                    className="upload-button__img-preview"
                    src={
                      templateDetails?.project_structure?.app?.backgroundImage
                    }
                  />
                )}

                <button
                  className="button button-primary border-0 w-100"
                  onClick={() => handleChangeMedia("project")}
                >
                  Upload
                </button>
                {templateDetails?.project_structure?.app?.backgroundImage && (
                  <button
                    onClick={() => handleDeleteBgImage()}
                    className="button ml-2"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      <div className="setting-block border-bottom">
        <label className="d-flex align-items-center gap-2 font-sm fw-medium">
          <input
            type="checkbox"
            className="form-check-input theme-control"
            role="button"
            onChange={(e) => handleOpenLinksNewTab(e.target.checked)}
            defaultValue={
              templateDetails?.project_structure?.app?.isOpenLinksInNewTab
            }
          />
          <span className="d-flex align-items-center gap-2">
            Open external link in new tab
            {/* <i
              className="fa-light fa-circle-question muted-text"
              role="button"
            ></i> */}
          </span>
        </label>
      </div>
      {/* <div className="setting-block border-bottom">
        <span className="d-flex align-items-center gap-2 font-sm fw-medium">
          Custom transition
          <i
            className="fa-light fa-circle-question muted-text"
            role="button"
          ></i>
        </span>
      </div> */}
      {/* <div className="setting-block border-bottom">
        <label className="form-label font-sm fw-medium d-flex align-items-center gap-2">
          Custom styles
          <i
            className="fa-light fa-circle-question muted-text"
            role="button"
          ></i>
        </label>
        <textarea
          name=""
          id=""
          rows="4"
          className="form-control theme-control"
          placeholder="Use style to fine-tune your projects design"
        ></textarea>
      </div> */}
    </div>
  );
}

export default ProjectSettings;
