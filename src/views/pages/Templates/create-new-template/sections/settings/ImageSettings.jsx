import React, { useEffect, useRef, useState } from "react";
import { SketchPicker } from "react-color";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setOnLocalStorage } from "utils/localStorage";
import { STORAGE_INDEXES } from "app/constants";
import { updateTemplateAction } from "views/pages/Templates/TemplateRedux/actions/drawerAction";
import Select from "react-select";

function ImageSettings({ selectedBlockSettings, pageData, handleChangeMedia }) {
  console.log(selectedBlockSettings, "selectedBlockSettingsselectedBlockSettings")
  const { url, blur, width, id, position, imageSize } = selectedBlockSettings;

  const [blockValues, setBlockValues] = useState({});
  const [defaultSelectedValue, setDefaultSelectedValue] = useState({});
  const [showColorPicker, setShowColorPicker] = useState(false);

  const { templateDetails } = useSelector((state) => state.DrawerReducer);
  const colorPickerRef = useRef(null);
  const dispatch = useDispatch();

  const options = [
    { value: "original", label: "Original" },
    { value: "custom", label: "Custom" },
  ];

  const [checked, setChecked] = useState(blur);

  const handleSelectChange = (select, id) => {
    const _data = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        pages: templateDetails.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === id ? { ...block, imageSize: select } : block
          ),
        })),
      },
    };
    dispatch(updateTemplateAction(_data));
  };

  const handleCheckBlur = (e) => {
    const _data = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        pages: templateDetails.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === id ? { ...block, blur: e.target.checked } : block
          ),
        })),
      },
    };
    dispatch(updateTemplateAction(_data));
  };

  const handleChangeRadio = (value) => {
    const position = {
      label: value?.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
      value: value,
    };
    const _data = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        pages: templateDetails.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === id ? { ...block, position: position } : block
          ),
        })),
      },
    };
    dispatch(updateTemplateAction(_data));
  };

  const handleWidthInput = (width) => {
    const _data = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        pages: templateDetails.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === id ? { ...block, width: width } : block
          ),
        })),
      },
    };
    dispatch(updateTemplateAction(_data));
  };

  useEffect(() => {
    if (selectedBlockSettings) {
      setChecked(blur);
    }
  }, [selectedBlockSettings]);

  useEffect(() => {
    if (pageData) {
      const block = pageData.blocks.find((block) => block.id === id);
      console.log(block, "checkzBLock");
      setBlockValues(block);
    }

    setDefaultSelectedValue({
      label: blockValues?.imageSize?.label,
      value: blockValues?.imageSize?.value,
    });
  }, [pageData, templateDetails]);

  return (
    <div className="panel-wrap">
      <div className="setting-block border-bottom">
        <h6 className="fw-semibold mb-4">Image</h6>
        <div className="sidebar__wrapper">
          <ul className="list">
            <li className="group-block pb-0 mb-0">
              <p className="group-label"></p>
              <ul className="list-style-none">
                <li>
                  <div className="upload-button">
                    <label className="upload-button__label form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">Image</label>
                    <div className="content upload d-flex align-items-cente">
                      <img className="upload-button__img-preview" style={{ height: 44, width: 44, borderRadius: 8 }} src={url} />
                      <button
                        className="button button-primary border-0 w-100" style={{ maxHeight: 42 }}
                        onClick={() => handleChangeMedia("image", id)}
                      >
                        Change
                      </button>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="control-box">
                    <label className="label form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">Image size</label>
                    <div className="content select">
                      <Select
                        options={options}
                        defaultValue={defaultSelectedValue}
                        onChange={(select) => handleSelectChange(select, id)}
                      />
                    </div>
                  </div>
                </li>
                {blockValues?.imageSize?.value === "custom" && (
                  <>
                    <li>
                      <div className="control-box">
                        <label className="label form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">Width relative to the project (%)</label>
                        <input
                          className="text form-control theme-control"
                          type="number"
                          onChange={(e) => handleWidthInput(e.target.value)}
                          defaultValue={blockValues?.width}
                          min="0"
                          max="100"
                        />
                        {/* <div className="content input">
                        </div> */}
                      </div>
                    </li>
                    <li>
                      <div className="control-box">
                        <label className="label form-label font-sm fw-medium d-flex align-items-center gap-2">Position</label>
                        <div
                          className="content radio"
                          style={{ flexDirection: "row" }}
                        >
                          <div className="radio-option is-checked d-flex align-items-center gap-1">
                            <input
                              type="radio"
                              id="left"
                              name="alignment"
                              onChange={(e) => handleChangeRadio("left")}
                              defaultChecked={
                                blockValues?.position?.value === "left"
                              }
                            />
                            <label htmlFor="left" className="form-label font-sm fw-medium d-flex align-items-center cursor-pointer mb-0">Left</label>
                          </div>
                          <div className="radio-option d-flex align-items-center gap-1">
                            <input
                              type="radio"
                              name="alignment"
                              id="center"
                              onChange={() => handleChangeRadio("center")}
                              defaultChecked={
                                blockValues?.position?.value === "center"
                              }
                            />
                            <label htmlFor="center" className="form-label font-sm fw-medium d-flex align-items-center cursor-pointer mb-0">Center</label>
                          </div>
                          <div className="radio-option d-flex align-items-center gap-1">
                            <input
                              type="radio"
                              name="alignment"
                              id="right"
                              onChange={() => handleChangeRadio("right")}
                              defaultChecked={
                                blockValues?.position?.value === "right"
                              }
                            />
                            <label htmlFor="right" className="form-label font-sm fw-medium d-flex align-items-center cursor-pointer mb-0">Right</label>
                          </div>
                        </div>
                      </div>
                    </li>
                  </>
                )}
              </ul>
            </li>
            <li className="group-block">
              <label className="group-label form-label font-sm fw-medium d-flex align-items-center gap-2">Effects</label>
              <ul>
                <li>
                  <div className="control-box">
                    <div className="content checkbox d-flex align-items-center gap-2">
                      <input
                        type="checkbox"
                        className="form-check-input theme-control shadow-none m-0"
                        onChange={handleCheckBlur}
                        checked={blockValues?.blur}
                      />
                      <p className="mb-0">Interactive blur</p>
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

export default ImageSettings;
