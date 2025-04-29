import React, { useEffect, useState } from "react";
import QuestionsScreen from "./SettingsComponent/QuestionsScreen";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { updateTemplateAction } from "views/pages/Templates/TemplateRedux/actions/drawerAction";
import { generateShortId } from "utils/helpers";
import Quests from "./SettingsComponent/Quests";
import ResultScreen from "./SettingsComponent/ResultScreen";
import CardsRank from "./SettingsComponent/CardsRank";
import RankBattlePreview from "views/pages/Templates/Preview/PreviewBlocks/RankBattle";
import PreviewSpintheWheel from "views/pages/Templates/Preview/PreviewBlocks/PreviewWheel";
import SectionsList from "./SettingsComponent/SectionsList";
import PreviewPuzzle from "views/pages/Templates/Preview/PreviewBlocks/Puzzle";
import PreviewSlidingPuzzle from "views/pages/Templates/Preview/PreviewBlocks/SlidingPuzzle";

function SlidingPuzzleModal({
  selecteScreen,
  setSelectScreen,
  formData,
  handleChangeLogo,
  setIsOpenFormModal
}) {
  const questsLength = [
    {
      label: "2x2",
      value: "4",
    },
    {
      label: "3X3",
      value: "9",
    },
    {
      label: "4X4",
      value: "16",
    },
  ];
  const options = [
    {
      label: "Number",
      value: "NUMBERS",
    },
    {
      label: "Image",
      value: "IMAGE",
    },
  ];
  const dispatch = useDispatch();
  const { templateDetails } = useSelector((state) => state.DrawerReducer);
  const [errorScreen, setErrorScreen] = useState(false);
  const [triggerNext, setTriggerNext] = useState(false);
  const [coverHeader, setCoverHeader] = useState("");
  const [coverButtonText, setCoverButtonText] = useState("");
  const [slidingpuzzle, setSlidingPuzzleData] = useState({})
  const [finalResult, setfinalResult] = useState({})
  const [errors, setErrors] = useState({
    header: false,
    buttonText: false,
    finalResultHeader: false,
    headerWordCount: false,
    buttonTextWordCount: false
  });
  const validateForm = () => {
    const newErrors = {
      header: !slidingpuzzle.coverHeader?.trim(),
      headerWordCount: !isValidWordCount(slidingpuzzle.coverHeader),

      buttonText: !slidingpuzzle.coverButtonText?.trim(),
      buttonTextWordCount: !isValidWordCount(slidingpuzzle.coverButtonText),

      finalResultHeader: !finalResult.header?.trim(),
      finalResultHeaderWordCount: !isValidWordCount(finalResult.header),
    };

    setErrors(newErrors);

    return !newErrors.header && !newErrors.buttonText && !newErrors.finalResultHeader &&
      !newErrors.headerWordCount && !newErrors.buttonTextWordCount && !newErrors.finalResultHeaderWordCount;
  };

  const isValidWordCount = (text) => {
    // Remove leading/trailing spaces and collapse multiple spaces between words
    const trimmedText = text.trim().replace(/\s+/g, ' ');

    // Check if the length of the trimmed text (after spaces are removed) has at least 3 words
    const wordCount = trimmedText.length;

    console.log(trimmedText, "trimmed text");  // Debug the trimmed text
    console.log(wordCount, "word count"); // Log the word count to verify

    // Check if the word count is at least 3
    return wordCount <= 20;
  };


  console.log(isValidWordCount, "ioioi")


  // const validateForm = () => {

  //   const newErrors = {
  //     header: !slidingpuzzle.coverHeader?.trim(),
  //     buttonText: !slidingpuzzle.coverButtonText?.trim(),
  //     finalResultHeader: !finalResult.header?.trim(),
  //   };
  //   console.log(slidingpuzzle.coverHeader,"akjhaj")
  //   setErrors(newErrors);
  //   return !newErrors.header && !newErrors.buttonText && !newErrors.finalResultHeader
  // };
  console.log(formData, "formDataformData")
  const handleSelectChange = (e) => {
    console.log(formData?.struct, "checkcardgherere");
    console.log(e, "checkvaluess");
    const updatedData = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        pages: templateDetails.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === formData?.id
              ? {
                ...block,
                struct: {
                  ...block.struct,
                  playground: {
                    ...block.struct.playground,
                    layout: {
                      ...block.struct.playground.layout,
                      label: e.label,
                      value: e.value,
                    },
                    tilesCount: e.value,
                  },
                },
              }
              : block
          ),
        })),
      },
    };


    dispatch(updateTemplateAction(updatedData));
  };

  console.log(slidingpuzzle, "slidingpuzzleslidingpuzzle")
  console.log(isValidWordCount("   Hello World   "), "Test 1"); // Should be true
  console.log(isValidWordCount("Hello World"), "Test 2"); // Should be true
  console.log(isValidWordCount("Hello"), "Test 3"); // Should be false (only one word)
  console.log(isValidWordCount("    "), "Test 4"); // Should be false (empty or just spaces)
  console.log(isValidWordCount("   wdwdw "), "Test 5"); // Should be true
  console.log(isValidWordCount("sqqsq"), "Test 6"); // Should be true

  // Helper function to check if text contains valid characters (no special characters, only letters and spaces)
  const isValidText = (text) => {
    const regex = /^[a-zA-Z\s]*$/; // This regex allows only letters and spaces
    return regex.test(text);
  };
  const handleSelectChangeLayout = (e) => {
    const updatedData = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        pages: templateDetails.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === formData?.id
              ? {
                ...block,
                struct: {
                  ...block.struct,
                  playground: {
                    ...block.struct.playground,
                    gameType: e.value,
                  },
                },
              }
              : block
          ),
        })),
      },
    };

    dispatch(updateTemplateAction(updatedData));
  };
  console.log(slidingpuzzle, "4535345")

  const handleIsShowCover = (e) => {
    const updatedData = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        pages: templateDetails.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === formData?.id
              ? {
                ...block,
                struct: {
                  ...block.struct,
                  playground: {
                    ...block.struct.playground,
                    isShowCover: e,
                  },
                },
              }
              : block
          ),
        })),
      },
    };
    dispatch(updateTemplateAction(updatedData));
  };

  const handleChangeheadertext = (e) => {
    console.log(e, "ikasasa")
    const value = e
    setErrors((prev) => {
      const updated = { ...prev, header: false };
      console.log("Updated Errors in handler:", updated);
      return updated;
    });
    setSlidingPuzzleData((prev) => ({
      ...prev,
      coverHeader: value
    }))
    validateForm();



  };
  console.log(errors, "sqqsq")
  const handleChangeheaderButtonText = (e) => {
    const value = e;

    // Update state for coverButtonText
    setSlidingPuzzleData((prev) => ({
      ...prev,
      coverButtonText: value,
    }));

    // Clear the errors for button text and word count in one update
    setErrors((prev) => ({
      ...prev,
      buttonText: false,
      buttonTextWordCount: false,
    }));

    // Re-run validation to check if button text is valid now
    validateForm();
  };

  console.log(errors, "object")
  console.log(formData?.struct?.playground, "checkformDataokornokt");
  const handleNext = async () => {


    if (!validateForm()) {
      setErrorScreen(true);
      return;


    } else {

      setErrorScreen(false);
      setTriggerNext(false);
      if (selecteScreen == "start-screen") {
        setSelectScreen("final-screen");
      }

    }

    console.log("Proceed to next step");
  };
  const handleSaveSlidingPuzzle = () => {
    console.log("object")
    if (!validateForm()) {
      setErrorScreen(true)
      return;
    } else {
      // 
      // const updatedData = {
      //   ...updatedtemplate,
      //   project_structure: {
      //     ...updatedtemplate.project_structure,
      //     pages: updatedtemplate.project_structure.pages.map((page) => ({
      //       ...page,
      //       blocks: page.blocks.map((block) =>
      //         block.id === formData?.id
      //           ? {
      //             ...block,
      //             struct: {
      //               ...block.struct,
      //               finalScreen: {
      //                 ...block.struct.finalScreen,
      //                 header: e,
      //               },
      //             },
      //           }
      //           : block
      //       ),
      //     })),
      //   },
      // };
      // setupdatedTemplate(updatedData)
      // dispatch(updateTemplateAction(updatedData));
      const updatedData = {
        ...templateDetails,
        project_structure: {
          ...templateDetails.project_structure,
          pages: templateDetails.project_structure.pages.map((page) => ({
            ...page,
            blocks: page.blocks.map((block) =>
              block.id === formData?.id
                ? {
                  ...block,
                  struct: {
                    ...block.struct,
                    playground: {
                      ...block.struct.playground,
                      ...slidingpuzzle
                    },
                    final: {
                      ...block.struct.final,
                      ...finalResult
                    },
                  },
                }
                : block
            ),
          })),
        },
      };
      console.log(updatedData, "updatedData")
      dispatch(updateTemplateAction(updatedData));
      setIsOpenFormModal(false)

    }
  }
  useEffect(() => {
    setSlidingPuzzleData(formData?.struct?.playground)
    setfinalResult(formData?.struct?.final)
  }, [formData])
  return (
    <>

      <div className="form-option-wrap">
        <div className="form-start">
          <div className="optionsEditScreen">
            <div
              className={`options-settings ${selecteScreen === "start-screen" ? "activeTab" : ""}`}
              role="button"
              onClick={() => {
                if (!validateForm()) {
                  setErrorScreen(true);
                  return;
                } else {
                  setSelectScreen("start-screen")
                }
              }}
            >
              <i class="fa-solid fa-desktop"></i>
              <p>Layout</p>
            </div>
            <div
              className={`options-settings ${selecteScreen === "final-screen" ? "activeTab" : ""}`}
              role="button"
              onClick={() => {
                if (!validateForm()) {
                  setErrorScreen(true);
                  return;
                } else {
                  setSelectScreen("final-screen")
                }
              }}
            >
              <i class="fa-solid fa-circle-question"></i>
              <p>Final screen</p>
            </div>
          </div>
        </div>

        {console.log(formData?.struct?.playground, "ioiioio")}
        {selecteScreen === "start-screen" && (
          <>
            <div className="form-left border-end">
              <div className="fields-output">
                <label class="toggle-container mb-4">Playground</label>
                <div className={`formFieldsList`}>
                  <div className="additionalInfo">
                    <div className="fields_info">
                      <div className="row g-3 mb-3">
                        <div className="col-md-6">
                          <div className="">
                            <label className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                              Game type
                            </label>
                            <Select
                              className="theme-select"
                              classNamePrefix="react-select"
                              defaultValue={
                                formData?.struct?.playground?.layout
                                  ? {
                                    label:
                                      formData?.struct?.playground?.gameType?.toLowerCase(),
                                    value:
                                      formData?.struct?.playground?.gameType,
                                  }
                                  : null
                              }
                              options={options}
                              onChange={(selected) =>
                                handleSelectChangeLayout(selected)
                              }
                              placeholder="Game type"
                            />
                          </div>
                        </div>
                        {formData?.struct?.playground?.gameType.toUpperCase() !== "NUMBERS" && <div className="col-md-6">
                          <div>
                            <label className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                              Image
                            </label>
                            <div className="d-flex align-items-start">
                              <div className="mb-3">
                                <div className="d-flex gap-2">
                                  {formData?.struct?.playground.image && (
                                    <img
                                      src={formData?.struct?.playground.image}
                                      alt="illustrationImage"
                                      className="image_illustrate"
                                      style={{
                                        height: 44,
                                        width: 44,
                                        borderRadius: 8,
                                        objectFit: "cover",
                                      }}
                                    />
                                  )}

                                  <button
                                    className="button button-primary border-0"
                                    onClick={() =>
                                      handleChangeLogo(
                                        "sliding-puzzle-image",
                                        formData?.id
                                      )
                                    }
                                  >
                                    {formData?.struct?.playground.image
                                      ? "Change"
                                      : "Upload"}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>}

                        <div className="col-md-6">
                          <label className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                            Layout
                          </label>
                          <Select
                            className="theme-select"
                            classNamePrefix="react-select"
                            defaultValue={
                              formData?.struct?.playground?.layout
                                ? {
                                  label:
                                    formData?.struct?.playground?.layout?.label,
                                  value:
                                    formData?.struct?.playground?.layout?.value,
                                }
                                : null
                            }
                            options={questsLength}
                            onChange={(selected) => handleSelectChange(selected)}
                            placeholder="no of cards"
                          />
                        </div>
                      </div>

                      <label className="mt-3 d-flex align-items-center gap-2 font-sm fw-medium mb-0">
                        <input
                          type="checkbox"
                          className="form-check-input theme-control m-0"
                          role="button"
                          onChange={(e) => handleIsShowCover(e.target.checked)}
                          defaultChecked={
                            formData?.struct?.playground?.isShowCover
                          }
                        />
                        <span className="d-flex align-items-center gap-2">
                          Show cover
                        </span>
                      </label>
                      {formData?.struct?.playground?.isShowCover && (
                        <div className="mt-3">
                          <div className="mb-3">
                            <label className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                              Header <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                              type="text"
                              className={`form-control theme-control ${errors.header || errors.headerWordCount ? 'is-invalid' : ''}`}
                              id="questName"
                              maxLength="60"
                              value={slidingpuzzle.coverHeader || ""}
                              onChange={(e) => handleChangeheadertext(e.target.value)}
                              required
                            />
                            {errors.header && (
                              <div className="invalid-feedback">Header is required.</div>
                            )}
                            {console.log(errors.headerWordCount, "vvvvv")}
                            {errors.headerWordCount && (
                              <div className="invalid-feedback">Must be No more than 20 characters .</div>
                            )}
                          </div>
                          {/* ${errors.buttonText || errors.buttonTextWordCount ? */}
                          <div className="">
                            <label className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                              Button text<span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                              type="text"
                              className={`form-control theme-control ${errors.buttonText || errors.buttonTextWordCount ? 'is-invalid' : ''}`}
                              id="buttonTextInput"
                              maxLength="60"
                              value={slidingpuzzle.coverButtonText || ""}
                              onChange={(e) => handleChangeheaderButtonText(e.target.value)}
                              required
                            />
                            {errors.buttonText && <div className="invalid-feedback">Button text is required.</div>}
                            {errors.buttonTextWordCount && <div className="invalid-feedback">Must be No more than 20 characters .</div>}


                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div className="form-right scrollable-div">
              <h5>Approximate preview</h5>
              <div className={`formPreview cover_modal rankPreview`}>
                <PreviewSlidingPuzzle data={formData} slidingpuzzle={slidingpuzzle} />
              </div>
            </div>

          </>
        )
        }
        {console.log(formData?.struct?.final, "formDataformData")}
        {
          selecteScreen === "final-screen" && (
            <ResultScreen
              finalResult={finalResult}
              setParentErros={setErrors}
              setfinalResult={setfinalResult}
              parenterror={errors}
              slidingpuzzle={slidingpuzzle}
              setErrorScreen={setErrorScreen}
              setTriggerNext={setTriggerNext}
              formData={formData}
              questions={formData?.struct?.questions}
              handleChangeImage={handleChangeLogo}
            />
          )
        }


      </div >

      <ul className="Footer_footer__bMDNk">

        {selecteScreen !== "final-screen" && (
          <li className="Footer_footerItem__yaFNE">
            <button className="button button-primary outline px-3" onClick={handleNext}>Next</button>
          </li>
        )}

        <li className="Footer_footerItem__yaFNE">
          <button
            onClick={handleSaveSlidingPuzzle}
            className="button button-primary px-3 text-decoration-none"
          >
            Save
          </button>
        </li>
      </ul>
      {/* if error is true then have to shiw this  */}


      {(errorScreen || triggerNext) && (
        <div className="StopPanel_modalStop__Msu+K">
          <div className="StopPanel_modalOverlay__1dGP2"></div>
          <div className="StopPanel_modalContent__8Epq4">
            <div className="StopPanel_note__c+Qou">
              <div className="StopPanel_imageBox__2Udoo">
                <img
                  className="StopPanel_image__2gtri"
                  src="https://account.interacty.me/static/media/girl.af105485362519d96dd6e5f1bc6da415.svg"
                  alt=""
                />
              </div>
              <div className="StopPanel_textBox__stxYL">
                <h4 className="StopPanel_textTitle__T8v5c">
                  Oh! Need more information
                </h4>
                <p className="StopPanel_textContent__2I+u6">
                  Please fill all required fields on this tab for the quiz to
                  work correctly.
                </p>
              </div>
            </div>
            <div className="StopPanel_buttons__cZz5n">
              <button
                onClick={() => {
                  setErrorScreen(false);
                  setTriggerNext(false);
                }}
                className="button button-primary px-3 text-decoration-none"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SlidingPuzzleModal;
