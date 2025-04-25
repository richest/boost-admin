import React, { useEffect, useRef, useState } from "react";
import { SketchPicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { updateTemplateAction } from "views/pages/Templates/TemplateRedux/actions/drawerAction";

function QuizSettings({
  selectedBlockSettings,
  pageData,
  handleOpenFormFields,
}) {
  console.log(selectedBlockSettings, "dshsvdkjskjfdvskjfvskfvskkkfsf");
  const { id } = selectedBlockSettings;

  const [blockValues, setBlockValues] = useState({});
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showColorPickerForm, setShowColorPickerForm] = useState(false);

  const { templateDetails } = useSelector((state) => state.DrawerReducer);
  const colorPickerRef = useRef(null);
  const colorPickerRefForm = useRef(null);
  const dispatch = useDispatch();

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
                  },
                }
              : block
          ),
        })),
      },
    };

    dispatch(updateTemplateAction(updatedData));
  };
  const handleShowScores = (e) => {
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
                    showScores: e,
                  },
                }
              : block
          ),
        })),
      },
    };

    dispatch(updateTemplateAction(updatedData));
  };

  const handleSuffleAnswers = (e) => {
    // const shuffleArray = (array) => {
    //   return array.sort(() => Math.random() - 0.5);
    // };

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
                    shuffleAnswers: e,
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
    console.log(e, "cjheckvalueewewe");
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

  console.log(blockValues, "blockValuesblockValtrtrtruesblockValues");

  return (
    <div className="panel-wrap">
      {blockValues && (
        <div className="setting-block border-bottom">
          <h6 className="fw-semibold mb-4">Quiz settings</h6>
          <div className="sidebar__wrapper">
            <ul className="list">
              <li className="group-block">
                <ul className="list-style-none">
                  <li>
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
                          onChange={(color) =>
                            handleChangeColorTextImage(color)
                          }
                        />
                      )}
                    </div>
                  </li>
                  <li>
                    <label
                      htmlFor="progressButton"
                      role="button"
                      className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer mb-0"
                    >
                      <input
                        type="checkbox"
                        id="progressButton"
                        className="form-check-input theme-control shadow-none m-0"
                        onChange={(e) =>
                          handleShowProgressBar(e.target.checked)
                        }
                        defaultChecked={blockValues?.struct?.progressBar}
                      />
                      Progress bar
                    </label>
                  </li>
                  <li>
                    <label
                      className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer"
                      role="button"
                    >
                      <input
                        type="checkbox"
                        id="showScores"
                        className="form-check-input theme-control shadow-none m-0"
                        onChange={(e) => handleShowScores(e.target.checked)}
                        defaultChecked={blockValues?.struct?.showScores}
                      />
                      Show score on final screen
                    </label>
                  </li>
                  <li>
                    <label
                      className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer"
                      role="button"
                    >
                      <input
                        type="checkbox"
                        id="shuffleQuestions"
                        className="form-check-input theme-control shadow-none m-0"
                        onChange={(e) => handleSuffleQuestion(e.target.checked)}
                        defaultChecked={blockValues?.struct?.shuffleQuestions}
                      />
                      Shuffle questions
                    </label>
                  </li>
                  <li>
                    <label
                      className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer"
                      role="button"
                    >
                      <input
                        type="checkbox"
                        id="shuffleQuestions"
                        className="form-check-input theme-control shadow-none m-0"
                        onChange={(e) => handleSuffleAnswers(e.target.checked)}
                        defaultChecked={blockValues?.struct?.shuffleAnswers}
                      />
                      Shuffle Answers
                    </label>
                  </li>
                  <li>
                    <label
                      className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer"
                      role="button"
                    >
                      <input
                        type="checkbox"
                        id="markcorrect"
                        className="form-check-input theme-control shadow-none m-0"
                        onChange={(e) =>
                          handleDoNotMarkQuestion(e.target.checked)
                        }
                        defaultChecked={
                          blockValues?.struct?.notMarkCorrectAnswers
                        }
                      />
                      Do not mark correct answers
                    </label>
                  </li>
                  <li>
                    <label
                      className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer"
                      role="button"
                    >
                      <input
                        type="checkbox"
                        id="restartbutton"
                        className="form-check-input theme-control shadow-none m-0"
                        onChange={(e) =>
                          handleHideRestartButton(e.target.checked)
                        }
                        defaultChecked={
                          blockValues?.struct?.isHideRestartButton
                        }
                      />
                      Hide restart button
                    </label>
                  </li>
                  <li>
                    <label
                      className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer"
                      role="button"
                    >
                      <input
                        type="checkbox"
                        id="redirectresultscreen"
                        className="form-check-input theme-control shadow-none m-0"
                        onChange={(e) =>
                          handleRedirectEnabled(e.target.checked)
                        }
                        defaultChecked={blockValues?.struct?.isRedirectEnabled}
                      />
                      Redirect from result screen
                    </label>
                  </li>

                  {blockValues?.struct?.isRedirectEnabled && (
                    <li>
                      <div className="mb-3">
                        <label className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                          Redirect to (link)
                        </label>
                        <input
                          className="colorInput form-control theme-control"
                          type="text"
                          defaultValue={blockValues?.struct?.redirectTargetLink}
                          onChange={(e) => handleChangeLink(e.target.value)}
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                          Seconds before redirect
                        </label>
                        <input
                          className="colorInput form-control theme-control"
                          type="number"
                          defaultValue={blockValues?.struct?.callToActionLink}
                          onChange={(e) =>
                            handleChangeRedirectTimeout(e.target.value)
                          }
                        />
                      </div>
                    </li>
                  )}
                  <li>
                    <label
                      className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer"
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
                  </li>

                  {blockValues?.struct?.isShowLeadForm && (
                    <li>
                      <button
                        onClick={() => handleOpenFormFields(id)}
                        className="button py-2 px-3 button-primary outline mb-3"
                      >
                        Customize
                      </button>
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
                            onClick={() =>
                              setShowColorPickerForm(!showColorPickerForm)
                            }
                          ></div>
                          <input
                            className="colorInput form-control theme-control"
                            type="text"
                            defaultValue={
                              blockValues?.struct?.leadFormBackgroundColor
                            }
                            onChange={(e) =>
                              handleChangeColorInputForm(e.target.value)
                            }
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
                    </li>
                  )}

                  <li>
                    <label
                      className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer"
                      role="button"
                    >
                      <input
                        type="checkbox"
                        id="calltoactionbutton"
                        className="form-check-input theme-control shadow-none m-0"
                        checked={blockValues?.struct?.callToActionEnabled}
                        onChange={(e) =>
                          handleCallToActionButton(e.target.checked)
                        }
                      />
                      Call to action button
                    </label>
                  </li>
                  {console.log(
                    blockValues?.struct?.callToActionEnabled,
                    "ojojjojo"
                  )}
                  {blockValues?.struct?.callToActionEnabled && (
                    <>
                      <li>
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
                          onChange={(e) =>
                            handleChangeCallToActionText(e.target.value)
                          }
                        />
                      </li>
                      <li>
                        <label
                          className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer"
                          role="button"
                        >
                          Link
                        </label>
                        <input
                          type="text"
                          className="colorInput form-control theme-control"
                          defaultValue={blockValues?.struct?.callToActionLink}
                          onChange={(e) =>
                            handleChangeCalltoActionLink(e.target.value)
                          }
                        />
                      </li>
                    </>
                  )}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizSettings;
