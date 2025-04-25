import React, { useEffect, useRef, useState } from "react";
import { SketchPicker } from "react-color";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setOnLocalStorage } from "utils/localStorage";
import { STORAGE_INDEXES } from "app/constants";
import { updateTemplateAction } from "views/pages/Templates/TemplateRedux/actions/drawerAction";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import Select from "react-select";

function HoroscopeSettings({
  handleChangeMedia,
  data,
  selectedBlockSettings,
  pageData,
  type,
  handleChangePositionTextImage,
  handleOpenFormFields,
  setIsOpenLinkModal,
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

  console.log(blockValues, "blockValuesblockValuesblockValues");

  return (
    <div className="panel-wrap">
      <div className="setting-block border-bottom">
        <h6 className="fw-semibold mb-4">Horoscope</h6>
        <div className="">
          <label
            className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer"
            role="button"
          >
            Color theme
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
      </div>
      <div className="setting-block border-bottom">
        <label className="d-flex align-items-center gap-2 font-sm fw-medium mb-0">
          <input
            type="checkbox"
            className="form-check-input theme-control m-0"
            role="button"
            onChange={(e) => handleTransParentBackground(e.target.checked)}
            defaultChecked={blockValues?.struct?.isTransparentBackground}
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
          <div className="mt-3">
            <div className="upload-button">
              <label className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                Background image
              </label>
              <div className="content upload">
                {blockValues?.struct?.backgroundImage && (
                  <img
                    className="upload-button__img-preview"
                    src={blockValues?.struct?.backgroundImage}
                    alt="background"
                    style={{
                      height: 44,
                      width: 44,
                      borderRadius: 8,
                      objectFit: "cover",
                    }}
                  />
                )}

                <button
                  className="button button-primary border-0 sm w-100"
                  onClick={() =>
                    handleChangeMedia(
                      "horoscope-image-settings",
                      blockValues?.id
                    )
                  }
                >
                  Upload
                </button>
                {blockValues?.struct?.backgroundImage && (
                  <button
                    onClick={() => handleDeleteBgImage()}
                    className="button button-secondary px-3 border-0"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="setting-block border-bottom">
        <label
          className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer mb-0"
          role="button"
        >
          <input
            type="checkbox"
            id="restartbutton"
            className="form-check-input theme-control shadow-none m-0"
            onChange={(e) => handleHideRestartButton(e.target.checked)}
            defaultChecked={blockValues?.struct?.isHideRestartButton}
          />
          Hide back button
        </label>
      </div>
      <div className="setting-block border-bottom">
        <label
          className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer mb-0"
          role="button"
        >
          <input
            type="checkbox"
            id="redirectresultscreen"
            className="form-check-input theme-control shadow-none m-0"
            onChange={(e) => handleRedirectEnabled(e.target.checked)}
            defaultChecked={blockValues?.struct?.isRedirectEnabled}
          />
          Redirect from result screen
        </label>

        {blockValues?.struct?.isRedirectEnabled && (
          <>
            <div className="my-3">
              <label
                className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer"
                role="button"
              >
                Redirect to (link)
              </label>
              <input
                className="colorInput form-control theme-control"
                type="text"
                defaultValue={blockValues?.struct?.redirectTargetLink}
                onChange={(e) => handleChangeLink(e.target.value)}
              />
            </div>
            <div className="">
              <label
                className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer"
                role="button"
              >
                Seconds before redirect
              </label>
              <input
                className="colorInput form-control theme-control"
                type="number"
                defaultValue={blockValues?.struct?.callToActionLink}
                onChange={(e) => handleChangeRedirectTimeout(e.target.value)}
              />
            </div>
          </>
        )}
      </div>

      <div className="setting-block border-bottom">
        <label
          className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer mb-0"
          role="button"
        >
          <input
            type="checkbox"
            id="showleadform"
            className="form-check-input theme-control shadow-none m-0"
            onChange={(e) => handleShowLeadForm(e.target.checked)}
            defaultChecked={blockValues?.struct?.isShowLeadForm}
          />
          Show lead form
        </label>

        {blockValues?.struct?.isShowLeadForm && (
          <>
            <button
              onClick={() => handleOpenFormFields(id)}
              className="button button-primary outline px-3 py-2 font-sm mt-2 mb-2"
            >
              Customize
            </button>
            <div className="">
              <label
                className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer"
                role="button"
              >
                Background color
              </label>
              <div ref={colorPickerRefForm}>
                <div className="d-flex align-items-center">
                  <div
                    className="color-picker-color"
                    style={{
                      backgroundColor: `${blockValues?.struct?.leadFormBackgroundColor}`,
                    }}
                    role="button"
                    onClick={() => setShowColorPickerForm(!showColorPickerForm)}
                  ></div>
                  <input
                    className="colorInput form-control theme-control"
                    type="text"
                    defaultValue={blockValues?.struct?.leadFormBackgroundColor}
                    onChange={(e) => handleChangeColorInputForm(e.target.value)}
                  />
                </div>
                {showColorPickerForm && (
                  <SketchPicker
                    color={blockValues?.struct?.leadFormBackgroundColor}
                    onChange={(color) =>
                      handleChangeColorInputFormColorPicker(color)
                    }
                  />
                )}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="setting-block border-bottom">
        <label
          className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer mb-0"
          role="button"
        >
          <input
            type="checkbox"
            id="calltoactionbutton"
            className="form-check-input theme-control shadow-none m-0"
            onChange={(e) => handleCallToActionButton(e.target.checked)}
            defaultChecked={blockValues?.struct?.callToActionEnabled}
          />
          Call to action button
        </label>

        {blockValues?.struct?.callToActionEnabled && (
          <>
            <div className="my-3">
              <label
                className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer"
                role="button"
              >
                Button Text
              </label>
              <input
                className="colorInput form-control theme-control"
                type="text"
                defaultValue={blockValues?.struct?.callToActionText}
                onChange={(e) => handleChangeCallToActionText(e.target.value)}
              />
            </div>
            <div className="">
              <label
                className="form-label font-sm fw-medium d-flex align-items-center justify-content-between gap-2 cursor-pointer"
                role="button"
              >
                Link
                <button
                  className="btn "
                  style={{ color: "#20a2b8" }}
                  onClick={() => handleOpenLinkModal(id, "callToAction")}
                >
                  Internal Page
                </button>
              </label>
              <input
                type="text"
                className="colorInput form-control theme-control"
                defaultValue={blockValues?.struct?.callToActionLink}
                onChange={(e) => handleChangeCalltoActionLink(e.target.value)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default HoroscopeSettings;
