import React, { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";
import Select from "react-select";
import { SketchPicker } from "react-color";
import "bootstrap/dist/css/bootstrap.min.css";
function BlockSettings({
  data,
  handleChangeMedia,
  handleSelectChange,
  handeCheckLogoType,
  handleChangeDarkBackground,
  handleLogoWidth,
  handleChangePosition,
  handleShowButton,
  handeAddLink,
  handleChangeColorInput,
  handleChangeColorInputPicker,
  handleChangeBorderRadius,
  handleChangePositionButton,
  type,
  handleChangeColorTextImage,
  handleCheckedTextImage,
  handleChangeColorInputTextImage,
  handleChangePositionButtonTextImage
}) {
  const options = [
    { value: "1:1", label: "1:1" },
    { value: "5.4", label: "5.4" },
    { value: "4:3", label: "4:3" },
    { value: "3:2", label: "3:2" },
    { value: "16:9", label: "16:9" },
  ];

  const [showColorPicker, setShowColorPicker] = useState(false);
  const colorPickerRef = useRef(null);

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
  console.log(data, "checkdataimage")
  return (
    <div className="dash-right">
      <div className="toggle-panel toggle-settings" role="button">
        Toggle Settings
      </div>

      {type === "COVER" && (
        <div className="panel-wrap">
          <div className="setting-block border-bottom">
            <h6 className="fw-semibold mb-4">Cover</h6>
            <div className="sidebar__wrapper">
              <ul className="list">
                <li className="group-block">
                  <p className="group-label"></p>
                  <ul className="list-style-none">
                    <li>
                      <div className="control-box">
                        <p className="label">Image size</p>
                        <div className="content select">
                          <Select
                            options={options}
                            // defaultValue={defaultSelectedValue}
                            onChange={(select) => handleSelectChange(select)}
                          />
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="upload-button">
                        <p className="upload-button__label">Image</p>
                        <div className="content upload">
                          <img
                            className="upload-button__img-preview"
                            src={data?.imageUrl}
                          />
                          <button
                            className="upload-btn"
                            onClick={() => handleChangeMedia("image")}
                          >
                            Change
                          </button>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="control-box">
                        <div className="control-box">
                          <p className="label">Darken background, %</p>
                          <div className="content input">
                            <input
                              className="text"
                              type="number"
                              onChange={(e) =>
                                handleChangeDarkBackground(e.target.value)
                              }
                              defaultValue={data?.darkenBackground}
                              min="0"
                              max="100"
                            />
                          </div>
                        </div>
                      </div>
                    </li>

                    <li>
                      <div className="upload-button">
                        <div className="control-box">
                          <div className="content checkbox">
                            <input
                              type="checkbox"
                              className="form-check-input theme-control shadow-none m-0"
                              onChange={handeCheckLogoType}
                              defaultChecked={!data?.isShowLogotype}
                            />
                            <p>Logo</p>
                          </div>
                        </div>
                      </div>
                    </li>
                    <>
                      {data?.isShowLogotype && (
                        <>
                          <li>
                            <div className="upload-button">
                              <p className="upload-button__label">Logo</p>
                              <div className="content upload">
                                <img
                                  className="upload-button__img-preview"
                                  src={data?.logotypeUrl}
                                />
                                <button
                                  className="upload-btn"
                                  onClick={() => handleChangeMedia("logo")}
                                >
                                  Change
                                </button>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="control-box">
                              <div className="control-box">
                                <p className="label">Scale, %</p>
                                <div className="content input">
                                  <input
                                    className="text"
                                    type="number"
                                    onChange={(e) =>
                                      handleLogoWidth(e.target.value)
                                    }
                                    defaultValue={data?.logotypeScale}
                                    min="0"
                                    max="100"
                                  />
                                </div>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="control-box">
                              <p className="label">Position</p>
                              <div
                                className="content radio"
                                style={{ flexDirection: "row" }}
                              >
                                <div className="radio-option is-checked">
                                  <input
                                    type="radio"
                                    id="left"
                                    name="alignment"
                                    onChange={() =>
                                      handleChangePosition("left")
                                    }
                                    defaultChecked={
                                      data?.logotypePosition === "left"
                                    }
                                  />
                                  <label htmlFor="left">Left</label>
                                </div>
                                <div className="radio-option">
                                  <input
                                    type="radio"
                                    name="alignment"
                                    id="center"
                                    onChange={() =>
                                      handleChangePosition("center")
                                    }
                                    defaultChecked={
                                      data?.logotypePosition === "center"
                                    }
                                  />
                                  <label htmlFor="center">Center</label>
                                </div>
                                <div className="radio-option">
                                  <input
                                    type="radio"
                                    name="alignment"
                                    id="right"
                                    onChange={() =>
                                      handleChangePosition("right")
                                    }
                                    defaultChecked={
                                      data?.logotypePosition === "right"
                                    }
                                  />
                                  <label htmlFor="right">Right</label>
                                </div>
                              </div>
                            </div>
                          </li>
                        </>
                      )}
                    </>

                    {/* Button Settings */}

                    <li>
                      <div className="upload-button">
                        <div className="control-box">
                          <div className="content checkbox">
                            <input
                              type="checkbox"
                              className="form-check-input theme-control shadow-none m-0"
                              onChange={(e) =>
                                handleShowButton(e.target.checked)
                              }
                              defaultChecked={!data?.isShowButton}
                            />
                            <p>Button</p>
                          </div>
                        </div>
                      </div>
                    </li>

                    {data?.isShowButton && (
                      <>
                        <li>
                          <div className="control-box">
                            <div className="control-box">
                              <p className="label">Link</p>
                              <div className="content input">
                                <input
                                  className="text"
                                  type="text"
                                  onChange={(e) => handeAddLink(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        </li>

                        <li>
                          <label
                            className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer"
                            role="button"
                          >Background color</label>
                          <div>
                            <div className="d-flex align-items-center">
                              <div
                                className="color-picker-color"
                                style={{
                                  backgroundColor: `${data?.buttonBackgroundColor}`,
                                }}
                                role="button"
                                onClick={() =>
                                  setShowColorPicker(!showColorPicker)
                                }
                              ></div>
                              <input
                                className="colorInput"
                                type="text"
                                // value={color}
                                defaultValue={data?.buttonBackgroundColor}
                                onChange={(e) =>
                                  handleChangeColorInput(e.target.value)
                                }
                              />
                            </div>

                            {showColorPicker && (
                              <SketchPicker
                                color={data?.buttonBackgroundColor}
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
                              <p className="label">Border radius, px</p>
                              <div className="content input">
                                <input
                                  className="text"
                                  type="text"
                                  onChange={(e) =>
                                    handleChangeBorderRadius(e.target.value)
                                  }
                                  defaultValue={data?.buttonBorderRadius}
                                />
                              </div>
                            </div>
                          </div>
                        </li>

                        <li>
                          <div className="control-box">
                            <p className="label">Position</p>
                            <div
                              className="content radio"
                              style={{ flexDirection: "row" }}
                            >
                              <div className="radio-option is-checked">
                                <input
                                  type="radio"
                                  id="leftbutton"
                                  name="alignment"
                                  onChange={() =>
                                    handleChangePositionButton("left")
                                  }
                                  defaultChecked={
                                    data?.buttonPosition === "left"
                                  }
                                />
                                <label htmlFor="leftbutton">Left</label>
                              </div>
                              <div className="radio-option">
                                <input
                                  type="radio"
                                  name="alignment"
                                  id="centerbutton"
                                  onChange={() =>
                                    handleChangePositionButton("center")
                                  }
                                  defaultChecked={
                                    data?.buttonPosition === "center"
                                  }
                                />
                                <label htmlFor="centerbutton">Center</label>
                              </div>
                              <div className="radio-option">
                                <input
                                  type="radio"
                                  name="alignment"
                                  id="rightbutton"
                                  onChange={() =>
                                    handleChangePositionButton("right")
                                  }
                                  defaultChecked={
                                    data?.buttonPosition === "right"
                                  }
                                />
                                <label htmlFor="rightbutton">Right</label>
                              </div>
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
      )}

      {type === "TEXT-IMAGE" && (
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
                        defaultChecked={!data?.isTransparentBackground}
                      />
                      <span className="d-flex align-items-center gap-2">
                        Transparent background
                      </span>
                    </label>

                    {!data?.isTransparentBackground && (
                      <>
                        <label
                          className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer"
                          role="button"
                        >
                          Background color
                        </label>
                        <div ref={colorPickerRef}>
                          <div className="d-flex align-items-center">
                            <div
                              className="color-picker-color"
                              style={{
                                backgroundColor: `${data?.backgroundColor}`,
                              }}
                              role="button"
                              onClick={() =>
                                setShowColorPicker(!showColorPicker)
                              }
                            ></div>
                            <input
                              className="colorInput form-control theme-control"
                              type="text"
                              defaultValue={data?.backgroundColor}
                              onChange={(e) =>
                                handleChangeColorInputTextImage(
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          {showColorPicker && (
                            <SketchPicker
                              color={data?.backgroundColor}
                              onChange={(color) =>
                                handleChangeColorTextImage(color)
                              }
                            />
                          )}
                        </div>
                      </>
                    )}

                    <li>
                      <div className="upload-button">
                        <p className="upload-button__label">Image</p>
                        <div className="content upload">
                          <img
                            className="upload-button__img-preview"
                            src={data?.imageUrl}
                          />
                          <button
                            className="upload-btn"
                            onClick={() => handleChangeMedia("image")}
                          >
                            Change
                          </button>
                        </div>
                      </div>
                    </li>

                    <li>
                      <div className="control-box">
                        <p className="label">Position</p>
                        <div
                          className="content radio"
                          style={{ flexDirection: "row" }}
                        >
                          <div className="radio-option is-checked">
                            <input
                              type="radio"
                              id="leftbutton"
                              name="alignment"
                              onChange={() =>
                                handleChangePositionButtonTextImage("left")
                              }
                              defaultChecked={data?.buttonPosition === "left"}
                            />
                            <label htmlFor="leftbutton">Left</label>
                          </div>
                          <div className="radio-option">
                            <input
                              type="radio"
                              name="alignment"
                              id="rightBtn"
                              onChange={() =>
                                handleChangePositionButtonTextImage("right")
                              }
                              defaultChecked={data?.buttonPosition === "right"}
                            />
                            <label htmlFor="rightBtn">right</label>
                          </div>
                        </div>
                      </div>
                    </li>

                    {/* Button Settings */}

                    <li>
                      <div className="upload-button">
                        <div className="control-box">
                          <div className="content checkbox">
                            <input
                              type="checkbox"
                              id="showButton"
                              className="form-check-input theme-control shadow-none m-0"
                              onChange={(e) =>
                                handleShowButton(e.target.checked)
                              }
                              defaultChecked={data?.isShowButton}
                            />
                            <label htmlFor="showButton" role="button">Button</label>
                          </div>
                        </div>
                      </div>
                    </li>

                    {data?.isShowButton && (
                      <>
                        <li>
                          <div className="control-box">
                            <div className="control-box">
                              <p className="label">Link</p>
                              <div className="content input">
                                <input
                                  className="text"
                                  type="text"
                                  onChange={(e) => handeAddLink(e.target.value)}
                                  defaultValue={data?.buttonUrl}
                                />
                              </div>
                            </div>
                          </div>
                        </li>

                        <li>
                          <label
                            className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer"
                            role="button"
                          >
                            <div>
                              <p>Background color</p>
                              <div>
                                <div className="d-flex align-items-center">
                                  <div
                                    className="color-picker-color"
                                    style={{
                                      backgroundColor: `${data?.buttonBackgroundColor}`,
                                    }}
                                    role="button"
                                    onClick={() =>
                                      setShowColorPicker(!showColorPicker)
                                    }
                                  ></div>
                                  <input
                                    className="colorInput"
                                    type="text"
                                    defaultValue={data?.buttonBackgroundColor}
                                    onChange={(e) =>
                                      handleChangeColorInput(e.target.value)
                                    }
                                  />
                                </div>

                                {showColorPicker && (
                                  <SketchPicker
                                    color={data?.buttonBackgroundColor}
                                    onChange={(color) =>
                                      handleChangeColorInputPicker(color)
                                    }
                                  />
                                )}
                              </div>
                            </div>
                          </label>
                        </li>
                        <li>
                          <div className="control-box">
                            <div className="control-box">
                              <p className="label">Border radius, px</p>
                              <div className="content input">
                                <input
                                  className="text"
                                  type="text"
                                  onChange={(e) =>
                                    handleChangeBorderRadius(e.target.value)
                                  }
                                  defaultValue={data?.buttonBorderRadius}
                                />
                              </div>
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
      )}
    </div>
  );
}

export default BlockSettings;
