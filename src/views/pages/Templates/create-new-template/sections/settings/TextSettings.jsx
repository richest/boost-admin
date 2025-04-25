import React, { useEffect, useRef, useState } from "react";
import { SketchPicker } from "react-color";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setOnLocalStorage } from "utils/localStorage";
import { STORAGE_INDEXES } from "app/constants";
import { updateTemplateAction } from "views/pages/Templates/TemplateRedux/actions/drawerAction";

function TextSettings({ selectedBlockSettings, pageData }) {
  const { isTransparentBackground, wP_bg, id } = selectedBlockSettings;
  const [checked, setChecked] = useState(isTransparentBackground);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [color, setColor] = useState(wP_bg);
  const { templateDetails } = useSelector((state) => state.DrawerReducer);
  const colorPickerRef = useRef(null);
  const dispatch = useDispatch();

  const handleChecked = (e, id) => {
    setChecked(e.target.checked);
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

  const handleChangeColor = (color, id) => {
    setColor(color.hex);
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

  const handleChangeColorInput = (color, id) => {
    setColor(color);
    const _data = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        pages: templateDetails.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === id ? { ...block, wP_bg: color } : block
          ),
        })),
      },
    };
    dispatch(updateTemplateAction(_data));
  };

  useEffect(() => {
    if (selectedBlockSettings) {
      setChecked(isTransparentBackground);
    }
  }, [selectedBlockSettings]);

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
        <h6 className="fw-semibold mb-4">Text {id}</h6>

        <label
          htmlFor="background"
          className="d-flex align-items-center gap-2 font-sm fw-medium mb-3 user-select-none cursor-pointer"
        >
          <input
            type="checkbox"
            id="background"
            onChange={(e) => handleChecked(e, id)}
            className="form-check-input theme-control shadow-none m-0"
            checked={checked}
          />
          <span className="d-flex align-items-center gap-2">
            Transparent background
          </span>
        </label>

        {!checked && (
          <div className="">
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
                  style={{ backgroundColor: `${color}` }}
                  role="button"
                  onClick={() => setShowColorPicker(!showColorPicker)}
                ></div>
                <input
                  className="colorInput form-control theme-control"
                  type="text"
                  value={color}
                  onChange={(e) => handleChangeColorInput(e.target.value, id)}
                />
              </div>

              {showColorPicker && (
                <SketchPicker
                  color={color}
                  onChange={(color) => handleChangeColor(color, id)}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TextSettings;
