import React, { useEffect, useRef, useState } from "react";
import { SketchPicker } from "react-color";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setOnLocalStorage } from "utils/localStorage";
import { STORAGE_INDEXES } from "app/constants";
import { updateTemplateAction } from "views/pages/Templates/TemplateRedux/actions/drawerAction";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import Select from "react-select";

function AudioSettings({ selectedBlockSettings, pageData, handleChangeMedia }) {
  console.log(selectedBlockSettings, "selectedBlockSettings");
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
  console.log(blockValues, "ssdsdsdssdsds");
  return (
    <div className="panel-wrap">
      <div className="setting-block border-bottom">
        <h6 className="fw-semibold mb-4">Audio</h6>
        <div className="sidebar__wrapper">
          <ul className="list">
            <li className="group-block">
              <ul className="list-style-none">
                <li>
                  <div className="upload-button">
                    <label className="upload-button__label form-label font-sm fw-medium d-flex align-items-center cursor-pointer">
                      {blockValues?.name || "Audio File"}
                    </label>
                    <div className="content upload align-items-center gap-1">
                      <div className="content_audio_icon">
                        <AudioFileIcon />
                      </div>

                      <button
                        className="button button-primary w-100 border-0"
                        onClick={() =>
                          handleChangeMedia("audio", blockValues?.id)
                        }
                      >
                        Change
                      </button>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="control-box">
                    <div className="content checkbox d-flex align-items-center gap-2">
                      <input
                        type="checkbox"
                        className="form-check-input theme-control shadow-none m-0"
                        onChange={handleCheckBlur}
                        checked={blockValues?.blur}
                      />
                      <label className="form-label font-sm fw-medium d-flex align-items-center cursor-pointer mb-0">
                        Loop
                      </label>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="control-box">
                    <div className="content checkbox d-flex align-items-center gap-2">
                      <input
                        type="checkbox"
                        className="form-check-input theme-control shadow-none m-0"
                        onChange={handleCheckBlur}
                        checked={blockValues?.blur}
                      />
                      <label className="form-label font-sm fw-medium d-flex align-items-center cursor-pointer mb-0">
                        Auto play
                      </label>
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

export default AudioSettings;
