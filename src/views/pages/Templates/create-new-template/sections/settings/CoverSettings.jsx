import React, { useEffect, useRef, useState } from "react";
import { SketchPicker } from "react-color";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setOnLocalStorage } from "utils/localStorage";
import { STORAGE_INDEXES } from "app/constants";
import { updateTemplateAction } from "views/pages/Templates/TemplateRedux/actions/drawerAction";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import Select from "react-select";

function CoverSettings({
  handleChangeMedia,
  data,
  selectedBlockSettings,
  pageData,
}) {
  console.log(data, "dshsvsdkjskjfdvskjfvskfvskkkfsf");
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
            block.id === id ? { ...block, logotypePosition: position } : block
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
            block.id === id ? { ...block, buttonBackgroundColor: color } : block
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

  const handleChangePositionButton = (position) => {
    const _data = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        pages: templateDetails.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === id ? { ...block, buttonPosition: position } : block
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

  return (
    <div className="panel-wrap">
      <div className="setting-block border-bottom">
        <h6 className="fw-semibold mb-4">Cover</h6>
        <div className="control-box">
          <label className="form-label font-sm fw-medium d-flex align-items-center cursor-pointer">
            Image size
          </label>
          <Select
            className="theme-select"
            classNamePrefix="react-select"
            options={options}
            // defaultValue={defaultSelectedValue}
            onChange={(select) => handleSelectChange(select)}
          />
        </div>
      </div>
      <div className="setting-block border-bottom">
        <div className="upload-button">
          <label className="upload-button__label form-label font-sm fw-medium d-flex align-items-center cursor-pointer mb-0">
            Image
          </label>
          <div className="content upload">
            <img
              className="upload-button__img-preview"
              style={{ height: 44, width: 44, borderRadius: 8 }}
              src={blockValues?.imageUrl}
            />
            <button
              className="button button-primary w-100 border-0"
              onClick={() => handleChangeMedia("cover", id)}
            >
              Change
            </button>
          </div>
        </div>
      </div>
      <div className="setting-block border-bottom">
        <label className="form-label font-sm fw-medium d-flex align-items-center cursor-pointer">
          Darken background, %
        </label>
        <input
          className="text form-control theme-control"
          type="number"
          onChange={(e) => handleChangeDarkBackground(e.target.value)}
          defaultValue={blockValues?.darkenBackground}
          min="0"
          max="100"
        />
      </div>
      <div className="setting-block border-bottom">
        <label className="form-label font-sm fw-medium d-flex align-items-center cursor-pointer gap-2 mb-0">
          <input
            type="checkbox"
            className="form-check-input theme-control shadow-none m-0"
            onChange={handeCheckLogoType}
            defaultChecked={!blockValues?.isShowLogotype}
          />
          Logo
        </label>
        {blockValues?.isShowLogotype && (
          <>
            <div className="my-3">
              <div className="upload-button">
                <label className="upload-button__label form-label font-sm fw-medium d-flex align-items-center cursor-pointer">
                  Logo
                </label>
                <div className="content upload">
                  <img
                    className="upload-button__img-preview"
                    style={{ height: 44, width: 44, borderRadius: 8 }}
                    src={blockValues?.logotypeUrl}
                  />
                  <button
                    className="button button-primary border-0 w-100"
                    onClick={() => handleChangeMedia("logo", id, "cover")}
                  >
                    Change
                  </button>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label font-sm fw-medium d-flex align-items-center cursor-pointer">
                Scale, %
              </label>
              <input
                className="text form-control theme-control"
                type="number"
                onChange={(e) => handleLogoWidth(e.target.value)}
                defaultValue={blockValues?.logotypeScale}
                min="0"
                max="100"
              />
            </div>
            <div>
              <label className="form-label font-sm fw-medium d-flex align-items-center cursor-pointer">
                Position
              </label>
              <div className="d-flex align-items-center gap-3">
                <div className="radio-option is-checked d-flex align-items-center gap-1">
                  <input
                    type="radio"
                    id="left"
                    name="alignment"
                    onChange={() => handleChangePosition("left")}
                    checked={blockValues?.logotypePosition === "left"}
                  />
                  <label
                    htmlFor="left"
                    className="form-label font-sm fw-medium d-flex align-items-center cursor-pointer mb-0"
                  >
                    Left
                  </label>
                </div>
                <div className="radio-option d-flex align-items-center gap-1">
                  <input
                    type="radio"
                    name="alignment"
                    id="center"
                    onChange={() => handleChangePosition("center")}
                    checked={blockValues?.logotypePosition === "center"}
                  />
                  <label
                    htmlFor="center"
                    className="form-label font-sm fw-medium d-flex align-items-center cursor-pointer mb-0"
                  >
                    Center
                  </label>
                </div>
                <div className="radio-option d-flex align-items-center gap-1">
                  <input
                    type="radio"
                    name="alignment"
                    id="right"
                    onChange={() => handleChangePosition("right")}
                    checked={blockValues?.logotypePosition === "right"}
                  />
                  <label
                    htmlFor="right"
                    className="form-label font-sm fw-medium d-flex align-items-center cursor-pointer mb-0"
                  >
                    Right
                  </label>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="setting-block border-bottom">
        <div className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer mb-0">
          <input
            type="checkbox"
            id="showButton"
            className="form-check-input theme-control shadow-none m-0"
            onChange={(e) => handleShowButton(e.target.checked)}
            defaultChecked={!data?.isShowButton}
          />
          Button
        </div>
        {blockValues?.isShowButton && (
          <>
            <div className="my-3">
              <label className="label form-label font-sm fw-medium d-flex align-items-center cursor-pointer">
                Link
              </label>
              <input
                className="text form-control theme-control"
                type="text"
                defaultValue={blockValues?.buttonUrl}
                onChange={(e) => handeAddLink(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label class="form-label font-sm fw-medium d-flex align-items-center cursor-pointer">
                Background color
              </label>
              <div ref={colorPickerRef}>
                <div className="d-flex align-items-center">
                  <div
                    className="color-picker-color"
                    style={{
                      backgroundColor: `${blockValues?.buttonBackgroundColor}`,
                    }}
                    role="button"
                    onClick={() => setShowColorPicker(!showColorPicker)}
                  ></div>
                  <input
                    className="colorInput form-control theme-control w-100"
                    type="text"
                    defaultValue={blockValues?.buttonBackgroundColor}
                    onChange={(e) => handleChangeColorInput(e.target.value)}
                  />
                </div>

                {showColorPicker && (
                  <SketchPicker
                    color={data?.buttonBackgroundColor}
                    onChange={(color) =>
                      handleChangeColorInputPicker(color.hex)
                    }
                  />
                )}
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label font-sm fw-medium d-flex align-items-center cursor-pointer">
                Border radius, px
              </label>
              <input
                className="text theme-control form-control"
                type="text"
                onChange={(e) => handleChangeBorderRadius(e.target.value)}
                defaultValue={blockValues?.buttonBorderRadius}
              />
            </div>
            <div>
              <label className="label form-label font-sm fw-medium d-flex align-items-center cursor-pointer">
                Position
              </label>
              <div className="d-flex align-items-center gap-3">
                <div className="radio-option is-checked d-flex align-items-center gap-1">
                  <input
                    type="radio"
                    id="leftbutton"
                    name="alignment"
                    onChange={() => handleChangePositionButton("left")}
                    defaultChecked={blockValues?.buttonPosition === "left"}
                  />
                  <label
                    htmlFor="leftbutton"
                    className="user-select-none form-label font-sm fw-medium d-flex align-items-center cursor-pointer mb-0"
                  >
                    Left
                  </label>
                </div>
                <div className="radio-option d-flex align-items-center gap-1">
                  <input
                    type="radio"
                    name="alignment"
                    id="centerbutton"
                    onChange={() => handleChangePositionButton("center")}
                    defaultChecked={blockValues?.buttonPosition === "center"}
                  />
                  <label
                    htmlFor="centerbutton"
                    className="user-select-none form-label font-sm fw-medium d-flex align-items-center cursor-pointer mb-0"
                  >
                    Center
                  </label>
                </div>
                <div className="radio-option d-flex align-items-center gap-1">
                  <input
                    type="radio"
                    name="alignment"
                    id="rightbutton"
                    onChange={() => handleChangePositionButton("right")}
                    defaultChecked={blockValues?.buttonPosition === "right"}
                  />
                  <label
                    htmlFor="rightbutton"
                    className="user-select-none form-label font-sm fw-medium d-flex align-items-center cursor-pointer mb-0"
                  >
                    Right
                  </label>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CoverSettings;
