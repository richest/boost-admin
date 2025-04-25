import React, { useEffect, useRef, useState } from "react";
import { SketchPicker } from "react-color";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setOnLocalStorage } from "utils/localStorage";
import { STORAGE_INDEXES } from "app/constants";
import { updateTemplateAction } from "views/pages/Templates/TemplateRedux/actions/drawerAction";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import Select from "react-select";

function TextImageSettings({
  handleChangeMedia,
  data,
  selectedBlockSettings,
  pageData,
}) {
  console.log(selectedBlockSettings, "dshsvdkjskjfdvskjfvskfvskkkfsf");
  const { id, imageUrl } = selectedBlockSettings;

  const [blockValues, setBlockValues] = useState({});
  const [defaultSelectedValue, setDefaultSelectedValue] = useState({});
  const [showColorPicker, setShowColorPicker] = useState(false);

  const { templateDetails } = useSelector((state) => state.DrawerReducer);
  const colorPickerRef = useRef(null);
  const dispatch = useDispatch();
  const options = [
    { value: "1:1", label: "1:1" },
    { value: "5.4", label: "5.4" },
    { value: "4:3", label: "4:3" },
    { value: "3:2", label: "3:2" },
    { value: "16:9", label: "16:9" },
  ];

  const handleSelectChange = (select) => {
    console.log(select, "checkselect");
    const _data = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        pages: templateDetails.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === id
              ? { ...block, imageProportions: select.value }
              : block
          ),
        })),
      },
    };
    dispatch(updateTemplateAction(_data));
  };

  const handleCheckedTextImage = (e) => {
    const _data = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        pages: templateDetails.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === id
              ? { ...block, isTransparentBackground: e.target.checked }
              : block
          ),
        })),
      },
    };
    dispatch(updateTemplateAction(_data));
  };

  const handleChangeColorInputTextImage = (e) => {
    const _data = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        pages: templateDetails.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === id ? { ...block, backgroundColor: e } : block
          ),
        })),
      },
    };
    dispatch(updateTemplateAction(_data));
  };

  const handleChangeColorTextImage = (color) => {
    const _data = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        pages: templateDetails.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === id ? { ...block, backgroundColor: color.hex } : block
          ),
        })),
      },
    };
    dispatch(updateTemplateAction(_data));
  };

  const handleChangeDarkBackground = (e) => {
    const _data = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        pages: templateDetails.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === id ? { ...block, darkenBackground: e } : block
          ),
        })),
      },
    };
    dispatch(updateTemplateAction(_data));
  };

  const handleChangeColorInput = (e) => {
    const _data = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        pages: templateDetails.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === id ? { ...block, buttonBackgroundColor: e } : block
          ),
        })),
      },
    };
    dispatch(updateTemplateAction(_data));
  };

  const handeCheckLogoType = (e) => {
    const _data = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        pages: templateDetails.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === id
              ? { ...block, isShowLogotype: e.target.checked }
              : block
          ),
        })),
      },
    };
    dispatch(updateTemplateAction(_data));
  };

  const handleLogoWidth = (e) => {
    const _data = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        pages: templateDetails.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === id ? { ...block, logotypeScale: e } : block
          ),
        })),
      },
    };
    dispatch(updateTemplateAction(_data));
  };

  const handleChangePosition = (position) => {
    const _data = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        pages: templateDetails.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === id ? { ...block, textPosition: position } : block
          ),
        })),
      },
    };
    dispatch(updateTemplateAction(_data));
  };

  const handleShowButton = (e) => {
    const _data = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        pages: templateDetails.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === id ? { ...block, isShowButton: e } : block
          ),
        })),
      },
    };
    dispatch(updateTemplateAction(_data));
  };

  const handeAddLink = (e) => {
    const _data = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        pages: templateDetails.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === id ? { ...block, buttonUrl: e } : block
          ),
        })),
      },
    };
    dispatch(updateTemplateAction(_data));
  };

  const handleChangeColorInputPicker = (color) => {
    const _data = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        pages: templateDetails.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === id ? { ...block, buttonBackgroundColor: color.hex } : block
          ),
        })),
      },
    };
    dispatch(updateTemplateAction(_data));
  };

  const handleChangeBorderRadius = (e) => {
    const _data = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        pages: templateDetails.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === id ? { ...block, buttonBorderRadius: e } : block
          ),
        })),
      },
    };
    dispatch(updateTemplateAction(_data));
  };


  useEffect(() => {
    if (pageData) {
      const block = pageData.blocks.find((block) => block.id === id);
      console.log(block, "checkzBLock");
      setBlockValues(block);
    }
  }, [pageData, templateDetails]);

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

  console.log(blockValues, "blockValuesblockValuesblockValues")

  return (
    <div className="panel-wrap">
      <div className="setting-block border-bottom">
        <h6 className="fw-semibold mb-4">Text and image</h6>
        <div className="sidebar__wrapper">
          <ul className="list">
            <li className="group-block">
              <ul className="list-style-none">
                <label
                  htmlFor="background"
                  className="d-flex align-items-center gap-2 font-sm fw-medium mb-3 user-select-none cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="background"
                    onChange={(e) => handleCheckedTextImage(e)}
                    className="form-check-input theme-control shadow-none m-0"
                    checked={!blockValues?.isTransparentBackground}
                  />
                  <span className="d-flex align-items-center gap-2">
                    Transparent background
                  </span>
                </label>

                {!blockValues?.isTransparentBackground && (
                  <div className="mb-3">
                    <label className="form-label font-sm fw-medium d-flex align-items-center cursor-pointer">Background color</label>
                    <div ref={colorPickerRef}>
                      <div className="d-flex align-items-center">
                        <div
                          className="color-picker-color"
                          style={{
                            backgroundColor: `${blockValues?.backgroundColor}`,
                          }}
                          role="button"
                          onClick={() => setShowColorPicker(!showColorPicker)}
                        ></div>
                        <input
                          className="colorInput theme-control form-control w-100"
                          type="text"
                          defaultValue={blockValues?.backgroundColor}
                          onChange={(e) =>
                            handleChangeColorInputTextImage(e.target.value)
                          }
                        />
                      </div>
                      {showColorPicker && (
                        <SketchPicker
                          color={blockValues?.backgroundColor}
                          onChange={(color) =>
                            handleChangeColorTextImage(color)
                          }
                        />
                      )}
                    </div>
                  </div>
                )}

                <li>
                  <div className="upload-button">
                    <label className="upload-button__label form-label font-sm fw-medium d-flex align-items-center cursor-pointer">Image</label>
                    <div className="content upload">
                      <img
                        className="upload-button__img-preview"
                        style={{
                          height: 44,
                          width: 44,
                          borderRadius: 8
                        }}
                        src={blockValues?.imageUrl}
                      />
                      <button
                        className="button button-primary border-0 w-100"
                        onClick={() => handleChangeMedia("text-image", id)}
                      >
                        Change
                      </button>
                    </div>
                  </div>
                </li>

                <li>
                  <div className="control-box">
                    <label className="label form-label font-sm fw-medium d-flex align-items-center cursor-pointer">Text position</label>
                    <div className="content radio" style={{ flexDirection: "row" }}>
                      <div className="radio-option is-checked d-flex align-items-center gap-1">
                        <input
                          type="radio"
                          id="leftbutton"
                          name="alignment"
                          onChange={() => handleChangePosition("left")}
                          checked={
                            blockValues?.buttonPosition === "left"
                          }
                        />
                        <label htmlFor="leftbutton" className="form-label font-sm fw-medium d-flex align-items-center cursor-pointer mb-0">Left</label>
                      </div>
                      <div className="radio-option d-flex align-items-center gap-1">
                        <input
                          type="radio"
                          name="alignment"
                          id="rightBtn"
                          onChange={() => handleChangePosition("right")}
                          checked={
                            blockValues?.buttonPosition === "right"
                          }
                        />
                        <label htmlFor="rightBtn" className="form-label font-sm fw-medium d-flex align-items-center cursor-pointer mb-0">right</label>
                      </div>
                    </div>
                  </div>
                </li>

                {/* Button Settings */}

                <li>
                  <div className="upload-button">
                    <div className="control-box">
                      <div className="content checkbox d-flex align-items-center gap-2">
                        <input
                          type="checkbox"
                          id="showButton"
                          className="form-check-input theme-control shadow-none m-0"
                          onChange={(e) => handleShowButton(e.target.checked)}
                          checked={blockValues?.isShowButton}
                        />
                        <label htmlFor="showButton" className="form-label font-sm fw-medium d-flex align-items-center cursor-pointer mb-0" role="button">
                          Button
                        </label>
                      </div>
                    </div>
                  </div>
                </li>

                {blockValues?.isShowButton && (
                  <>
                    <li>
                      <div className="control-box">
                        <div className="control-box">
                          <label className="label form-label font-sm fw-medium d-flex align-items-center cursor-pointer">Link</label>
                          <input
                            className="text form-control theme-control"
                            type="text"
                            onChange={(e) => handeAddLink(e.target.value)}
                            defaultValue={blockValues?.buttonUrl}
                          />
                        </div>
                      </div>
                    </li>

                    <li>
                      <p className="form-label font-sm fw-medium d-flex align-items-center cursor-pointer">Background color</p>
                      <div>
                        <div className="d-flex align-items-center">
                          <div
                            className="color-picker-color"
                            style={{
                              backgroundColor: `${blockValues?.buttonBackgroundColor}`,
                            }}
                            role="button"
                            onClick={() =>
                              setShowColorPicker(!showColorPicker)
                            }
                          ></div>
                          <input
                            className="colorInput form-control theme-control"
                            type="text"
                            defaultValue={
                              blockValues?.buttonBackgroundColor
                            }
                            onChange={(e) =>
                              handleChangeColorInput(e.target.value)
                            }
                          />
                        </div>

                        {showColorPicker && (
                          <SketchPicker
                            color={blockValues?.buttonBackgroundColor}
                            onChange={(color) =>
                              handleChangeColorInputPicker(color)
                            }
                          />
                        )}
                      </div>
                    </li>
                    <li>
                      <div className="control-box">
                        <div className="control-box">
                          <label className="label form-label font-sm fw-medium d-flex align-items-center cursor-pointer">Border radius, px</label>
                          <input
                            className="text form-control theme-control"
                            type="text"
                            onChange={(e) =>
                              handleChangeBorderRadius(e.target.value)
                            }
                            defaultValue={blockValues?.buttonBorderRadius}
                          />
                        </div>
                      </div>
                    </li>
                  </>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TextImageSettings;
