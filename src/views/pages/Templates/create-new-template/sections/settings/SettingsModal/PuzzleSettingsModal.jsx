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
import Puzzle from "components/Games/Puzzle";

function PuzzleModal({
  selecteScreen,
  setSelectScreen,
  formData,
  handleChangeLogo,
  setIsOpenFormModal,
  setcloserror,
  selectedImage
}) {
  const [leading, setLeading] = useState({
    left: false,
    right: false,
  });
  console.log(selecteScreen, "selecteScreen")
  const [puzzle, setPuzzleData] = useState({})
  const [selectedImageType, setSelectedImageType] = useState(null);
  const [errors, setErrors] = useState({
    header: false,
    buttonText: false,
    finalResultHeader: false,
    headerWordCount: false,
    buttonTextWordCount: false
  });
  console.log(selectedImageType, "puzzlepuzzlepuzzlepuzzlepuzzlepuzzlepuzzle")
  const [votes, setVotes] = useState({
    left: 0,
    right: 0,
  });
  const [showTag, setShowTag] = useState(false);

  const handleVote = (data) => {
    if (data.text === "Card 1") {
      setVotes((prev) => ({
        ...prev,
        left: prev.left + 1,
      }));
    }

    if (data.text === "Card 2") {
      setVotes((prev) => ({
        ...prev,
        right: prev.right + 1,
      }));
    }
  };

  useEffect(() => {
    if (votes.left > votes.right) {
      setLeading({ left: true, right: false });
      setShowTag(true);
    } else if (votes.left < votes.right) {
      setLeading({ left: false, right: true });
      setShowTag(true);
    } else if (votes.left === votes.right) {
      setLeading({ left: false, right: false });
      setShowTag(false);
    }
  }, [votes]);
  const questsLength = [
    {
      label: "2x2",
      value: "2",
    },
    {
      label: "4X4",
      value: "4",
    },
    {
      label: "6X6",
      value: "6",
    },
  ];

  const dispatch = useDispatch();
  const { templateDetails } = useSelector((state) => state.DrawerReducer);
  const [errorScreen, setErrorScreen] = useState(false);
  const [triggerNext, setTriggerNext] = useState(false);
  const [finalResult, setfinalResult] = useState({})

  console.log(finalResult, "finalResultfinalResult")
  const handleSelectChange = (e) => {
    console.log(formData?.struct, "checkcardgherere");

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

  // const handleChangeheadertext = (e) => {
  //   const updatedData = {
  //     ...templateDetails,
  //     project_structure: {
  //       ...templateDetails.project_structure,
  //       pages: templateDetails.project_structure.pages.map((page) => ({
  //         ...page,
  //         blocks: page.blocks.map((block) =>
  //           block.id === formData?.id
  //             ? {
  //               ...block,
  //               struct: {
  //                 ...block.struct,
  //                 playground: {
  //                   ...block.struct.playground,
  //                   coverHeader: e,
  //                 },
  //               },
  //             }
  //             : block
  //         ),
  //       })),
  //     },
  //   };
  //   dispatch(updateTemplateAction(updatedData));
  // };
  const handleChangeheadertext = (e) => {
    console.log(e, "ikasasa")
    const value = e
    setErrors((prev) => {
      const updated = { ...prev, header: false };
      console.log("Updated Errors in handler:", updated);
      return updated;
    });
    setPuzzleData((prev) => ({
      ...prev,
      coverHeader: value
    }))
    console.log(value, "kjjiiji")
    validateForm();
  };
  const handleChangeheaderButtonText = (e) => {
    const value = e;

    // Update state for coverButtonText
    setPuzzleData((prev) => ({
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

  const validateForm = () => {
    const newErrors = {
      header: !puzzle.coverHeader?.trim(),
      headerWordCount: !isValidWordCount(puzzle.coverHeader),

      buttonText: !puzzle.coverButtonText?.trim(),
      buttonTextWordCount: !isValidWordCount(puzzle.coverButtonText),

      finalResultHeader: !finalResult.header?.trim(),
      // finalResultHeaderWordCount: !isValidWordCount(finalResult.header),
    };

    setErrors(newErrors);

    return !newErrors.header && !newErrors.buttonText && !newErrors.finalResultHeader &&
      !newErrors.headerWordCount && !newErrors.buttonTextWordCount && !newErrors.finalResultHeaderWordCount;
  };
  console.log(errors, "sasasassas")
  const isValidWordCount = (text) => {
    // Remove leading/trailing spaces and collapse multiple spaces between words
    const trimmedText = text.trim().replace(/\s+/g, ' ');

    // Check if the length of the trimmed text (after spaces are removed) has at least 3 words
    const wordCount = trimmedText.length;

    console.log(trimmedText, "trimmed text");  // Debug the trimmed text
    console.log(wordCount, "word count"); // Log the word count to verify

    // Check if the word count is at least 3
    return wordCount <= 30;
  };
  const handleNext = async () => {


    if (!validateForm()) {
      setcloserror(true)
      setErrorScreen(true);
      return;


    } else {

      setErrorScreen(false);
      setTriggerNext(false);
      // if (selecteScreen == "start-screen") {
      //   setSelectScreen("questions");
      // } else if (selecteScreen == "questions") {
      //   console.log("jsajasdjhjdh");
      //   setSelectScreen("results");
      // }
    }

    console.log("Proceed to next step");
  };
  const handleSavepuzzle = () => {
    console.log("object")
    if (!validateForm()) {
      setcloserror(true)
      setErrorScreen(true)
      return;
    } else {

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
                      ...puzzle
                    },
                    finalScreen: {
                      ...block.struct.finalScreen,
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
  console.log(selecteScreen, "cehchccchformdTAaa");
  useEffect(() => {
    setPuzzleData(formData?.struct?.playground)
    setfinalResult(formData?.struct?.finalScreen)
  }, [formData])
  console.log(puzzle?.image, "dssds")

  useEffect(() => {
    if (selectedImage) {
      console.log(selectedImageType, "selectedImageType")
      console.log(selectedImage, "selectedImage090");
      // have to chnage state acc to data state 
      if (selectedImageType === "puzzleStart") {
        setPuzzleData((prev) => ({
          ...prev,
          image: selectedImage,
        }));

      } else if (selectedImageType === "puzzleFinal") {
        console.log("CAMEMEMEMEMEEME")
        setfinalResult((prev) => ({
          ...prev,
          imageSrc: selectedImage
        }))
        console.log(selectedImageType, "90weqr8r39")
      }
    }
  }, [selectedImage, selectedImageType]);
  console.log(selectedImageType, "qwdwdo0o0eojhdjhqjdhdjhqjhdhd0eod99")
  console.log(finalResult, "pqwwdjwq9d")
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
                  setcloserror(true)
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
              }


              }
            >
              <i class="fa-solid fa-circle-question"></i>
              <p>Final screen</p>
            </div>
          </div>
        </div>

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
                              Layout
                            </label>
                            <Select
                              className="theme-select"
                              classNamePrefix="react-select"
                              defaultValue={
                                formData?.struct?.playground?.layout
                                  ? {
                                    label:
                                      formData?.struct?.playground?.layout
                                        ?.label,
                                    value:
                                      formData?.struct?.playground?.layout
                                        ?.value,
                                  }
                                  : null
                              }
                              options={questsLength}
                              onChange={(selected) =>
                                handleSelectChange(selected)
                              }
                              placeholder="no of cards"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div>
                            <label className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                              Image
                            </label>
                            <div className="d-flex align-items-start">
                              <div className="mb-3">
                                <div className="d-flex gap-2">
                                  {puzzle?.image && (
                                    <img
                                      src={puzzle?.image}
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
                                    onClick={() => {
                                      setSelectedImageType("puzzleStart");
                                      handleChangeLogo(
                                        "puzzle-image",
                                        formData?.id
                                      )
                                    }
                                    }
                                  >
                                    {puzzle?.image
                                      ? "Change"
                                      : "Upload"}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
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
                          {/* <div className="mb-3">
                            <label className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                              Header <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                              type="text"
                              class="form-control theme-control"
                              id="questName"
                              maxlength="60"
                              defaultValue={
                                formData?.struct?.playground?.coverHeader
                              }
                              onChange={(e) =>
                                handleChangeheadertext(e.target.value)
                              }
                              required
                            />
                          </div> */}
                          <div className="mb-3">
                            <label className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                              Header <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                              type="text"
                              className={`form-control theme-control ${errors.header || errors.headerWordCount ? 'is-invalid' : ''}`}
                              id="questName"
                              maxLength="60"
                              value={puzzle.coverHeader || ""}
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
                          <div className="">
                            <label className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                              Button text<span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                              type="text"
                              className={`form-control theme-control ${errors.buttonText || errors.buttonTextWordCount ? 'is-invalid' : ''}`}
                              id="buttonTextInput"
                              maxLength="60"
                              value={puzzle.coverButtonText || ""}
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
                <Puzzle approxValue={true} data={formData} finalResult={finalResult} puzzle={puzzle} />
              </div>
            </div>
          </>
        )}

        {selecteScreen === "final-screen" && (
          <ResultScreen
            setSelectedImageType={setSelectedImageType}
            setParentErros={setErrors}
            finalResult={finalResult}
            parenterror={errors}
            setfinalResult={setfinalResult}
            setTriggerNext={setTriggerNext}
            setErrorScreen={setErrorScreen}
            formData={formData}
            questions={formData?.struct?.questions}
            handleChangeImage={handleChangeLogo}
          />
        )}
      </div >
      <ul className="Footer_footer__bMDNk">
        {selecteScreen !== "final-screen" && (
          <li className="Footer_footerItem__yaFNE">
            <button className="button button-primary outline px-3" onClick={handleNext}>Next</button>
          </li>
        )
        }

        <li className="Footer_footerItem__yaFNE">
          <button
            onClick={handleSavepuzzle}
            className="button button-primary px-3 text-decoration-none"
          >
            Save
          </button>
        </li>
      </ul>
      {
        (errorScreen || triggerNext) && (
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
                    // setTriggerNext(false);
                  }}
                  className="button button-primary px-3 text-decoration-none"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        )
      }
    </>
  );
}

export default PuzzleModal;
