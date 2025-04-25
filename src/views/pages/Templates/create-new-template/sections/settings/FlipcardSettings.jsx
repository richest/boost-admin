import React, { useEffect, useRef, useState } from "react";
import { SketchPicker } from "react-color";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setOnLocalStorage } from "utils/localStorage";
import { STORAGE_INDEXES } from "app/constants";
import { updateTemplateAction } from "views/pages/Templates/TemplateRedux/actions/drawerAction";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import Select from "react-select";

function FlipcardSettings({
  handleChangeMedia,
  data,
  selectedBlockSettings,
  pageData,
}) {
  console.log(selectedBlockSettings, "dshsvdkjskjfdvskjfvskfvskkkfsf");
  const { id, imageUrl } = selectedBlockSettings;

  const [blockValues, setBlockValues] = useState({});
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showColorPickerBack, setShowColorPickerback] = useState(false);

  const { templateDetails } = useSelector((state) => state.DrawerReducer);
  const colorPickerRef = useRef(null);
  const colorPickerRefback = useRef(null);
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
            block.id === id ? { ...block, imageProportions: select } : block
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
            block.id === id ? { ...block, frontColor: e } : block
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
            block.id === id ? { ...block, frontColor: color } : block
          ),
        })),
      },
    };
    dispatch(updateTemplateAction(_data));
  };
  const handleChangeColorInputBack = (e) => {
    const _data = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        pages: templateDetails.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === id ? { ...block, backColor: e } : block
          ),
        })),
      },
    };
    dispatch(updateTemplateAction(_data));
  };

  const handleChangeColorInputPickerBack = (color) => {
    const _data = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        pages: templateDetails.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === id ? { ...block, backColor: color } : block
          ),
        })),
      },
    };
    dispatch(updateTemplateAction(_data));
  };
  const handleDeleteImage = (type) => {
    if (type === "front") {
      const _data = {
        ...templateDetails,
        project_structure: {
          ...templateDetails.project_structure,
          pages: templateDetails.project_structure.pages.map((page) => ({
            ...page,
            blocks: page.blocks.map((block) =>
              block.id === id ? { ...block, frontSrc: "" } : block
            ),
          })),
        },
      };
      dispatch(updateTemplateAction(_data));
    }
    if (type === "back") {
      const _data = {
        ...templateDetails,
        project_structure: {
          ...templateDetails.project_structure,
          pages: templateDetails.project_structure.pages.map((page) => ({
            ...page,
            blocks: page.blocks.map((block) =>
              block.id === id ? { ...block, backSrc: "" } : block
            ),
          })),
        },
      };
      dispatch(updateTemplateAction(_data));
    }
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        colorPickerRefback.current &&
        !colorPickerRefback.current.contains(event.target)
      ) {
        setShowColorPickerback(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  console.log(blockValues?.imageProportions, "checkblockValues");
  return (
    <div className="panel-wrap">
      <div className="setting-block border-bottom">
        <h6 className="fw-semibold mb-4">Flip Card</h6>
        <div className="sidebar__wrapper">
          <ul className="list">
            <li className="group-block">
              <ul className="list-style-none">
                <li>
                  <div className="control-box">
                    <label className="form-label font-sm fw-medium d-flex align-items-center gap-1 cursor-pointer">
                      Image proportions
                    </label>
                    <Select
                      className="theme-select"
                      classNamePrefix="react-select"
                      options={options}
                      value={
                        blockValues?.imageProportions &&
                        blockValues?.imageProportions
                      }
                      onChange={(select) => handleSelectChange(select)}
                    />
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div className="setting-block border-bottom">
        <div className="upload-button mb-3">
          <label className="form-label font-sm fw-medium d-flex align-items-center gap-1 cursor-pointer">
            Front Image
          </label>
          <div className="content upload d-flex align-items-center gap-2">
            {blockValues?.frontSrc && (
              <img
                className="m-0 upload-button__img-preview"
                src={blockValues?.frontSrc}
                alt="front"
                style={{
                  height: 44,
                  width: 44,
                  borderRadius: 8,
                }}
              />
            )}

            <button
              className="button button-primary border-0 w-100"
              onClick={() => handleChangeMedia("flip-front", id)}
            >
              {blockValues?.frontSrc ? "Upload" : "Change"}
            </button>
            {blockValues?.frontSrc && (
              <button
                className="button button-secondary px-3 border-0 text-muted"
                onClick={() => handleDeleteImage("front")}
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            )}
          </div>
        </div>
        <div className="upload-button">
          <label className="form-label font-sm fw-medium d-flex align-items-center gap-1 cursor-pointer">
            Back Image
          </label>
          <div className="content upload d-flex align-items-center gap-2">
            {blockValues?.backSrc && (
              <img
                className="upload-button__img-preview m-0"
                src={blockValues?.backSrc}
                alt="front"
                style={{
                  height: 44,
                  width: 44,
                  borderRadius: 8,
                }}
              />
            )}

            <button
              className="button button-primary border-0 w-100"
              onClick={() => handleChangeMedia("flip-back", id)}
            >
              {blockValues?.backSrc ? "Upload" : "Change"}
            </button>
            {blockValues?.backSrc && (
              <button
                className="button button-secondary px-3 border-0 text-muted"
                onClick={() => handleDeleteImage("back")}
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="setting-block border-bottom">
        <div className="mb-3">
          <label
            className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer"
            role="button"
          >
            Front color
          </label>
          <div ref={colorPickerRef}>
            <div className="d-flex align-items-center">
              <div
                className="color-picker-color"
                style={{
                  backgroundColor: `${blockValues?.frontColor}`,
                }}
                role="button"
                onClick={() => setShowColorPicker(!showColorPicker)}
              ></div>
              <input
                className="colorInput form-control theme-control"
                type="text"
                defaultValue={blockValues?.frontColor}
                onChange={(e) => handleChangeColorInput(e.target.value)}
              />
            </div>

            {showColorPicker && (
              <SketchPicker
                color={blockValues?.frontColor}
                onChange={(color) => handleChangeColorInputPicker(color.hex)}
              />
            )}
          </div>
        </div>
        <div className="">
          <label
            className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer"
            role="button"
          >
            Back color
          </label>
          <div ref={colorPickerRefback}>
            <div className="d-flex align-items-center">
              <div
                className="color-picker-color"
                style={{
                  backgroundColor: `${blockValues?.backColor}`,
                }}
                role="button"
                onClick={() => setShowColorPickerback(!showColorPicker)}
              ></div>
              <input
                className="colorInput form-control theme-control"
                type="text"
                defaultValue={blockValues?.backColor}
                onChange={(e) => handleChangeColorInputBack(e.target.value)}
              />
            </div>

            {showColorPickerBack && (
              <SketchPicker
                color={blockValues?.backColor}
                onChange={(color) =>
                  handleChangeColorInputPickerBack(color.hex)
                }
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlipcardSettings;
