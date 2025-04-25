import React, { useEffect, useRef, useState } from "react";
import { SketchPicker } from "react-color";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setOnLocalStorage } from "utils/localStorage";
import { STORAGE_INDEXES } from "app/constants";
import { updateTemplateAction } from "views/pages/Templates/TemplateRedux/actions/drawerAction";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import Select from "react-select";

function ThenNowSettings({
  handleChangeMedia,
  data,
  selectedBlockSettings,
  pageData,
  type,
  handleChangePositionTextImage,
  handleOpenFormFields,
}) {
  console.log(selectedBlockSettings, "dshsvdkjskjfdvskjfvskfvskkkfsf");
  const { id } = selectedBlockSettings;

  const [blockValues, setBlockValues] = useState({});
  const [defaultSelectedValue, setDefaultSelectedValue] = useState({});
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showColorPickerForm, setShowColorPickerForm] = useState(false);

  const { templateDetails } = useSelector((state) => state.DrawerReducer);
  const colorPickerRef = useRef(null);
  const colorPickerRefForm = useRef(null);
  const dispatch = useDispatch();
  const options = [
    { value: "1/1", label: "1:1" },
    { value: "5/4", label: "5.4" },
    { value: "4/3", label: "4:3" },
    { value: "3/2", label: "3:2" },
    { value: "16/9", label: "16:9" },
  ];

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
        colorPickerRefForm.current &&
        !colorPickerRefForm.current.contains(event.target)
      ) {
        setShowColorPickerForm(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectChange = (e) => {
    const updatedData = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        pages: templateDetails.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === id
              ? {
                  ...block,
                  imageProportions: {
                    ...block.imageProportions,
                    value: e.value,
                    label: e.label,
                  },
                }
              : block
          ),
        })),
      },
    };
    dispatch(updateTemplateAction(updatedData));
  };

  const handleDeletImage = (type) => {
    if (type === "left") {
      const _data = {
        ...templateDetails,
        project_structure: {
          ...templateDetails.project_structure,
          pages: templateDetails.project_structure.pages.map((page) => ({
            ...page,
            blocks: page.blocks.map((block) =>
              block.id === id ? { ...block, leftSrc: "" } : block
            ),
          })),
        },
      };
      dispatch(updateTemplateAction(_data));
    }

    if (type === "right") {
      const _data = {
        ...templateDetails,
        project_structure: {
          ...templateDetails.project_structure,
          pages: templateDetails.project_structure.pages.map((page) => ({
            ...page,
            blocks: page.blocks.map((block) =>
              block.id === id ? { ...block, rightSrc: "" } : block
            ),
          })),
        },
      };
      dispatch(updateTemplateAction(_data));
    }
  };

  console.log(blockValues, "checkblocvsdsdsds");
  return (
    <div className="panel-wrap">
      <div className="setting-block border-bottom">
        <h6 className="fw-semibold mb-4">Then & Now</h6>
        <div className="sidebar__wrapper">
          <ul className="list">
            <li className="group-block">
              <ul className="list-style-none">
                <li>
                  <label
                    className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer"
                    role="button"
                  >
                    Image proportions
                  </label>
                  <div ref={colorPickerRef}>
                    <div className="">
                      <Select
                        options={options}
                        className="theme-select"
                        classNamePrefix="react-select"
                        value={
                          blockValues?.imageProportions &&
                          blockValues?.imageProportions
                        }
                        onChange={(select) => handleSelectChange(select)}
                      />
                    </div>
                  </div>
                </li>

                <li>
                  <label
                    className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer"
                    role="button"
                  >
                    Left image
                  </label>
                  <div className="content upload d-flex align-items-center gap-2">
                    <img
                      className="upload-button__img-preview m-0"
                      src={
                        blockValues?.leftSrc ||
                        "https://res.cloudinary.com/dwl5gzbuz/image/upload/v1739271156/Group_3_jl6d69.png"
                      }
                      style={{
                        height: 44,
                        width: 44,
                        borderRadius: 8,
                        objectFit: "cover",
                      }}
                    />
                    <button
                      className="button button-primary border-0 w-100"
                      onClick={() => handleChangeMedia("thennow-left", id)}
                    >
                      {blockValues?.leftSrc ? "Change" : "Upload"}
                    </button>
                    {/* {blockValues?.leftSrc && (
                      <button
                        type="button"
                        className="button button-secondary px-3 border-0 text-muted"
                        onClick={() => handleDeletImage("left")}
                      >
                        <i class="fa-solid fa-trash"></i>
                      </button>
                    )} */}
                  </div>
                </li>
                <li> 
                  <label
                    className="w-100 form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer"
                    role="button"
                  >
                    Right image
                  </label>
                  <div className="content upload d-flex align-items-center gap-2">
                    <img
                      className="upload-button__img-preview m-0"
                      src={
                        blockValues?.rightSrc ||
                        "https://res.cloudinary.com/dwl5gzbuz/image/upload/v1739271147/Group_1_pqlyak.png"
                      }
                      style={{
                        height: 44,
                        width: 44,
                        borderRadius: 8,
                        objectFit: "cover",
                      }}
                    />
                    <button
                      className="button button-primary border-0 w-100"
                      onClick={() => handleChangeMedia("thennow-right", id)}
                    >
                      {blockValues?.rightSrc ? "Change" : "Upload"}
                    </button>
                   
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

export default ThenNowSettings;
