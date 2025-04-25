import React, { useEffect, useRef, useState } from "react";
import { SketchPicker } from "react-color";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setOnLocalStorage } from "utils/localStorage";
import { STORAGE_INDEXES } from "app/constants";
import { updateTemplateAction } from "views/pages/Templates/TemplateRedux/actions/drawerAction";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import Select from "react-select";

function TimelineSettings({
  handleChangeMedia,
  data,
  selectedBlockSettings,
  pageData,
  type,
  handleChangePositionTextImage,
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
            block.id === id ? { ...block, wP_bg: e } : block
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
            block.id === id ? { ...block, wP_bg: color.hex } : block
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

  console.log(blockValues, "blockValuetimsblockValuesblockValues");

  return (
    <div className="panel-wrap">
      <div className="setting-block border-bottom">
        <h6 className="fw-semibold mb-4">TimeLine Settings</h6>
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
                    checked={blockValues?.isTransparentBackground}
                  />
                  <span className="d-flex align-items-center gap-2">
                    Transparent background
                  </span>
                </label>

                {!blockValues?.isTransparentBackground && (
                  <div className="mb-3">
                    <label className="form-label font-sm fw-medium d-flex align-items-center cursor-pointer">
                      Background color
                    </label>
                    <div ref={colorPickerRef}>
                      <div className="d-flex align-items-center">
                        <div
                          className="color-picker-color"
                          style={{
                            backgroundColor: `${blockValues?.wP_bg}`,
                          }}
                          role="button"
                          onClick={() => setShowColorPicker(!showColorPicker)}
                        ></div>
                        <input
                          className="colorInput theme-control form-control w-100"
                          type="text"
                          defaultValue={blockValues?.wP_bg}
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
                    <label className="upload-button__label form-label font-sm fw-medium d-flex align-items-center cursor-pointer">
                      Image
                    </label>
                    <div className="content upload">
                      {blockValues?.imageUrl && (
                        <img
                          className="upload-button__img-preview"
                          style={{
                            height: 44,
                            width: 44,
                            borderRadius: 8,
                          }}
                          src={blockValues?.imageUrl}
                        />
                      )}

                      <button
                        className="button button-primary border-0 w-100"
                        onClick={() => handleChangeMedia("timeline-image", id)}
                      >
                        {blockValues?.imageUrl ? "Change" : "Upload"}
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TimelineSettings;
