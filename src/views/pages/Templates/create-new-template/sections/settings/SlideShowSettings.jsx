import React, { useEffect, useRef, useState } from "react";
import { SketchPicker } from "react-color";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setOnLocalStorage } from "utils/localStorage";
import { STORAGE_INDEXES } from "app/constants";
import { updateTemplateAction } from "views/pages/Templates/TemplateRedux/actions/drawerAction";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import Select from "react-select";

function SlideShowSettings({
  handleChangeMedia,
  data,
  selectedBlockSettings,
  pageData,
  type,
  handleChangePositionTextImage,
  handleOpenFormFields,
  handleOpenLinkModal,
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
    { value: "1:1", label: "1:1" },
    { value: "5.4", label: "5.4" },
    { value: "4:3", label: "4:3" },
    { value: "3:2", label: "3:2" },
    { value: "16:9", label: "16:9" },
  ];

  const handleChangeColorInputTextImage = (e) => {
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
                  struct: { ...block.struct, colorTheme: e },
                }
              : block
          ),
        })),
      },
    };

    dispatch(updateTemplateAction(updatedData));
  };
  const handleDeleteBgImage = () => {
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
                  struct: { ...block.struct, backgroundImage: "" },
                }
              : block
          ),
        })),
      },
    };

    dispatch(updateTemplateAction(updatedData));
  };
  const handleChangeColorTextImage = (color) => {
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
                  struct: { ...block.struct, colorTheme: color.hex },
                }
              : block
          ),
        })),
      },
    };

    dispatch(updateTemplateAction(updatedData));
  };

  const handleChangeColorInputText = (color) => {
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
                  struct: { ...block.struct, textColor: color },
                }
              : block
          ),
        })),
      },
    };

    dispatch(updateTemplateAction(updatedData));
  };
  const handleChangeColorInputTextPicker = (color) => {
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
                  struct: { ...block.struct, textColor: color.hex },
                }
              : block
          ),
        })),
      },
    };

    dispatch(updateTemplateAction(updatedData));
  };
  const handleTransParentBackground = (e) => {
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
                  struct: { ...block.struct, isTransparentBackground: e },
                }
              : block
          ),
        })),
      },
    };

    dispatch(updateTemplateAction(updatedData));
  };

  const handleShowProgressBar = (e) => {
    const updatedData = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        pages: templateDetails.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === id
              ? { ...block, struct: { ...block.struct, progressBar: e } }
              : block
          ),
        })),
      },
    };

    dispatch(updateTemplateAction(updatedData));
  };

  const handleSuffleQuestion = (e) => {
    const shuffleArray = (array) => {
      return array.sort(() => Math.random() - 0.5);
    };

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
                  struct: {
                    ...block.struct,
                    shuffleQuestions: e,
                    questions: shuffleArray([...block.struct.questions]),
                  },
                }
              : block
          ),
        })),
      },
    };

    dispatch(updateTemplateAction(updatedData));
  };

  const handleDoNotMarkQuestion = (e) => {
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
                  struct: { ...block.struct, notMarkCorrectAnswers: e },
                }
              : block
          ),
        })),
      },
    };

    dispatch(updateTemplateAction(updatedData));
  };

  const handleHideRestartButton = (e) => {
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
                  struct: { ...block.struct, isHideRestartButton: e },
                }
              : block
          ),
        })),
      },
    };

    dispatch(updateTemplateAction(updatedData));
  };

  const handleShowLeadForm = (e) => {
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
                  struct: { ...block.struct, isShowLeadForm: e },
                }
              : block
          ),
        })),
      },
    };

    dispatch(updateTemplateAction(updatedData));
  };
  const handleRedirectEnabled = (e) => {
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
                  struct: { ...block.struct, isRedirectEnabled: e },
                }
              : block
          ),
        })),
      },
    };

    dispatch(updateTemplateAction(updatedData));
  };

  const handleCallToActionButton = (e) => {
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
                  struct: { ...block.struct, callToActionEnabled: e },
                }
              : block
          ),
        })),
      },
    };

    dispatch(updateTemplateAction(updatedData));
  };

  const handleChangeLink = (e) => {
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
                  struct: { ...block.struct, redirectTargetLink: e },
                }
              : block
          ),
        })),
      },
    };

    dispatch(updateTemplateAction(updatedData));
  };

  const handleChangeRedirectTimeout = (e) => {
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
                  struct: { ...block.struct, redirectTimeout: e },
                }
              : block
          ),
        })),
      },
    };

    dispatch(updateTemplateAction(updatedData));
  };

  const handleChangeCallToActionText = (e) => {
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
                  struct: { ...block.struct, callToActionText: e },
                }
              : block
          ),
        })),
      },
    };

    dispatch(updateTemplateAction(updatedData));
  };

  const handleChangeColorInputForm = (e) => {
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
                  struct: { ...block.struct, leadFormBackgroundColor: e },
                }
              : block
          ),
        })),
      },
    };
    dispatch(updateTemplateAction(updatedData));
  };

  const handleChangeColorInputFormColorPicker = (color) => {
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
                  struct: { ...block.struct, leadFormBackgroundColor: color },
                }
              : block
          ),
        })),
      },
    };
    dispatch(updateTemplateAction(updatedData));
  };

  const handleChangeCalltoActionLink = (e) => {
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
                  struct: { ...block.struct, callToActionLink: e },
                }
              : block
          ),
        })),
      },
    };
    dispatch(updateTemplateAction(updatedData));
  };
  const handleShuffleButton = (e) => {
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
                  struct: { ...block.struct, shuffleCards: e },
                }
              : block
          ),
        })),
      },
    };
    dispatch(updateTemplateAction(updatedData));
  };

  useEffect(() => {
    if (pageData) {
      const block = pageData.blocks.find((block) => block.id === id);
      console.log(block, "checkzBLock");
      setBlockValues(block);
    }
  }, [pageData, templateDetails, blockValues]);

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

  console.log(blockValues, "blockValuesbddlockValuesblockValues");

  return (
    <div className="panel-wrap">
      <div className="setting-block border-bottom">
        <h6 className="fw-semibold mb-4">Slideshow</h6>
        <div className="setting-block border-bottom">
          <label className="d-flex align-items-center gap-2 font-sm fw-medium mb-0">
            <input
              type="checkbox"
              className="form-check-input theme-control m-0"
              role="button"
              onChange={(e) => handleTransParentBackground(e.target.checked)}
              checked={blockValues?.struct?.isTransparentBackground}
            />
            <span className="d-flex align-items-center gap-2">
              Transparent background
              {/* <i
              className="fa-light fa-circle-question muted-text"
              role="button"
            ></i> */}
            </span>
          </label>

          {!blockValues?.struct?.isTransparentBackground && (
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
                    style={{
                      backgroundColor: `${blockValues?.struct?.colorTheme}`,
                    }}
                    role="button"
                    onClick={() => setShowColorPicker(!showColorPicker)}
                  ></div>
                  <input
                    className="colorInput form-control theme-control"
                    type="text"
                    defaultValue={blockValues?.struct?.colorTheme}
                    onChange={(e) =>
                      handleChangeColorInputTextImage(e.target.value)
                    }
                  />
                </div>
                {showColorPicker && (
                  <SketchPicker
                    color={blockValues?.struct?.colorTheme}
                    onChange={(color) => handleChangeColorTextImage(color)}
                  />
                )}
              </div>
            </div>
          )}
        </div>
        <div className="">
          <label
            className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer"
            role="button"
          >
            Text color
          </label>
          <div ref={colorPickerRef}>
            <div className="d-flex align-items-center">
              <div
                className="color-picker-color"
                style={{
                  backgroundColor: `${blockValues?.struct?.textColor}`,
                }}
                role="button"
                onClick={() => setShowColorPickerForm(!showColorPickerForm)}
              ></div>
              <input
                className="colorInput form-control theme-control"
                type="text"
                defaultValue={blockValues?.struct?.textColor}
                onChange={(e) =>
                  handleChangeColorInputText(e.target.value)
                }
              />
            </div>
            {showColorPickerForm && (
              <SketchPicker
                color={blockValues?.struct?.textColor}
                onChange={(color) => handleChangeColorInputTextPicker(color)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SlideShowSettings;
