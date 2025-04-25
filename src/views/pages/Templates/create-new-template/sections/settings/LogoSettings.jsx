import React, { useEffect, useRef, useState } from "react";
import { SketchPicker } from "react-color";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setOnLocalStorage } from "utils/localStorage";
import { STORAGE_INDEXES } from "app/constants";
import { updateTemplateAction } from "views/pages/Templates/TemplateRedux/actions/drawerAction";
import Select from "react-select";

function LogoSettings({ selectedBlockSettings, pageData, handleChangeMedia }) {
  console.log(selectedBlockSettings, "checkblockSetings");
  const { url, blur, width, id, position, imageSize } = selectedBlockSettings;

  const [blockValues, setBlockValues] = useState({});
  const [defaultSelectedValue, setDefaultSelectedValue] = useState({});
  const [paddingValues, setPaddingValues] = useState({
    top: blockValues?.top,
    left: blockValues?.left,
    bottom: blockValues?.bottom,
    right: blockValues?.right,
  });

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
    console.log(position, "checkvsndjadajdad");
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

  const handlePadding = (e, type) => {
    console.log(e, type, "checktypoeof rthisss");
    let timeout;

    if (type === "top") {
      setPaddingValues({ ...paddingValues, top: e });

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const _data = {
          ...templateDetails,
          project_structure: {
            ...templateDetails.project_structure,
            pages: templateDetails.project_structure.pages.map((page) => ({
              ...page,
              blocks: page.blocks.map((block) =>
                block.id === id ? { ...block, top: e } : block
              ),
            })),
          },
        };
        dispatch(updateTemplateAction(_data));
      }, 500);
    }
    if (type === "left") {
      setPaddingValues({ ...paddingValues, left: e });
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const _data = {
          ...templateDetails,
          project_structure: {
            ...templateDetails.project_structure,
            pages: templateDetails.project_structure.pages.map((page) => ({
              ...page,
              blocks: page.blocks.map((block) =>
                block.id === id ? { ...block, left: e } : block
              ),
            })),
          },
        };
        dispatch(updateTemplateAction(_data));
      }, 500);
    }
    if (type === "bottom") {
      setPaddingValues({ ...paddingValues, bottom: e });
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const _data = {
          ...templateDetails,
          project_structure: {
            ...templateDetails.project_structure,
            pages: templateDetails.project_structure.pages.map((page) => ({
              ...page,
              blocks: page.blocks.map((block) =>
                block.id === id ? { ...block, bottom: e } : block
              ),
            })),
          },
        };
        dispatch(updateTemplateAction(_data));
      }, 500);
    }
    if (type === "right") {
      setPaddingValues({ ...paddingValues, right: e });
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const _data = {
          ...templateDetails,
          project_structure: {
            ...templateDetails.project_structure,
            pages: templateDetails.project_structure.pages.map((page) => ({
              ...page,
              blocks: page.blocks.map((block) =>
                block.id === id ? { ...block, right: e } : block
              ),
            })),
          },
        };
        dispatch(updateTemplateAction(_data));
      }, 500);
    }
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
    console.log(_data, "widthData");
    dispatch(updateTemplateAction(_data));
  };

  const handleAddLink = (e) => {
    const _data = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        pages: templateDetails.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === id ? { ...block, link: e } : block
          ),
        })),
      },
    };
    console.log(_data, "widthData");
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
  console.log(blockValues, "blockValuesdddblockValues");
  return (
    <div className="panel-wrap">
      <div className="setting-block border-bottom">
        <h6 className="fw-semibold mb-4">Logo</h6>
        <div className="sidebar__wrapper">
          <ul className="list">
            <li className="group-block">
              <ul className="list-style-none">
                <li>
                  <div className="upload-button">
                    <label className="upload-button__label form-label font-sm fw-medium d-flex align-items-center gap-2">Image</label>
                    <div className="content upload">
                      <img className="upload-button__img-preview" style={{ height: 44, width: 44, borderRadius: 8 }} src={url} />
                      <button
                        className="button button-primary border-0 w-100"
                        onClick={() => handleChangeMedia("logo", id)}
                      >
                        Change
                      </button>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="control-box">
                    <label className="label form-label font-sm fw-medium d-flex align-items-center gap-2">Scale (%)</label>
                    <div className="content select">
                      <div className="control-box">
                          <input
                            className="text form-control theme-control"
                            type="number"
                            onChange={(e) => handleWidthInput(e.target.value)}
                            defaultValue={blockValues?.width}
                            min="0"
                            maxLength="100"
                            max={100}
                          />
                      </div>
                    </div>
                  </div>
                </li>

                <li>
                  <div className="control-box">
                    <p className="label">Padding</p>
                    <div className="content select">
                      <div className="control-box">
                        <div className="d-flex gap-2 align-items-cen">
                          <input
                            className="text form-control theme-control"
                            type="number"
                            onChange={(e) =>
                              handlePadding(e.target.value, "top")
                            }
                            defaultValue={blockValues?.top}
                            min="0"
                            max="100"
                          />
                          <input
                            className="text form-control theme-control"
                            type="number"
                            onChange={(e) =>
                              handlePadding(e.target.value, "right")
                            }
                            defaultValue={blockValues?.right}
                            min="0"
                            max="100"
                          />{" "}
                          <input
                            className="text form-control theme-control"
                            type="number"
                            onChange={(e) =>
                              handlePadding(e.target.value, "bottom")
                            }
                            defaultValue={blockValues?.bottom}
                            min="0"
                            max="100"
                          />{" "}
                          <input
                            className="text form-control theme-control"
                            type="number"
                            onChange={(e) =>
                              handlePadding(e.target.value, "left")
                            }
                            defaultValue={blockValues?.left}
                            min="0"
                            max="100"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                <li>
                  <div className="control-box">
                    <label className="label form-label font-sm fw-medium d-flex align-items-center cursor-pointer">Position</label>
                    <div className="content radio" style={{ flexDirection: "row" }}>
                      <div className="radio-option is-checked d-flex align-items-center gap-1">
                        <input
                          type="radio"
                          id="left"
                          name="alignment"
                          defaultChecked={
                            blockValues?.position?.value === "left"
                          }
                          onChange={(e) => handleChangeRadio("left")}
                        />
                        <label htmlFor="left" className="form-label font-sm fw-medium d-flex align-items-center cursor-pointer mb-0">Left</label>
                      </div>
                      <div className="radio-option d-flex align-items-center gap-1">
                        <input
                          type="radio"
                          name="alignment"
                          id="center"
                          defaultChecked={
                            blockValues?.position?.value === "center"
                          }
                          onChange={() => handleChangeRadio("center")}
                        />
                        <label htmlFor="center" className="form-label font-sm fw-medium d-flex align-items-center cursor-pointer mb-0">Center</label>
                      </div>
                      <div className="radio-option d-flex align-items-center gap-1">
                        <input
                          type="radio"
                          name="alignment"
                          id="right"
                          defaultChecked={
                            blockValues?.position?.value === "right"
                          }
                          onChange={() => handleChangeRadio("right")}
                        />
                        <label htmlFor="right" className="form-label font-sm fw-medium d-flex align-items-center cursor-pointer mb-0">Right</label>
                      </div>
                    </div>
                  </div>
                </li>

                <li>
                  <div className="control-box">
                    <label className="form-label font-sm fw-medium d-flex align-items-center cursor-pointer">Link</label>
                    <div className="content select">
                      <div className="control-box">
                        <input
                          className="text theme-control form-control"
                          type="text"
                          onChange={(e) => handleAddLink(e.target.value)}
                          defaultValue={blockValues?.link}

                        />
                      </div>
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

export default LogoSettings;
