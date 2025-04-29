import React, { useEffect, useState } from "react";
import ResultScreen from "./SettingsComponent/ResultScreen";
import QuestionsScreen from "./SettingsComponent/QuestionsScreen";
import { useDispatch, useSelector } from "react-redux";
import { updateTemplateAction } from "views/pages/Templates/TemplateRedux/actions/drawerAction";
import PersonalityQuestionScreen from "./SettingsComponent/PersonalityQuestionScreen";

function PersonalitySettingModal({
  selecteScreen,
  setSelectScreen,
  formData,
  handleChangeLogo,
  setIsOpenFormModal
}) {
  const dispatch = useDispatch();
  const { templateDetails } = useSelector((state) => state.DrawerReducer);
  const [errors, setErrors] = useState({
    header: false,
    buttonText: false,
    finalResultHeader: false,
    headerWordCount: false,
    buttonTextWordCount: false
  });
  const [personalityquiz, setPersonalityQuiz] = useState({}); // if it's a single object (cover)
  const [personalityquizquestion, setPersonalityQuizQuestion] = useState([]); // should be array of questions
  const [finalResult, setfinalResult] = useState([]); // should be array of results

  const [errorScreen, setErrorScreen] = useState(false);
  const [triggerNext, setTriggerNext] = useState(false);

  const handleheaderText = (e) => {
    setPersonalityQuiz((prev) => ({
      ...prev,
      header: e
    }))
    // const updatedData = {
    //   ...templateDetails,
    //   project_structure: {
    //     ...templateDetails.project_structure,
    //     pages: templateDetails.project_structure.pages.map((page) => ({
    //       ...page,
    //       blocks: page.blocks.map((block) =>
    //         block.id === formData?.id
    //           ? {
    //             ...block,
    //             struct: {
    //               ...block.struct,
    //               cover: {
    //                 ...block.struct.cover,
    //                 header: e,
    //               },
    //             },
    //           }
    //           : block
    //       ),
    //     })),
    //   },
    // };
    // dispatch(updateTemplateAction(updatedData));
  };
  console.log(personalityquiz, "personalityquizpersonalityquiz")
  const handleDescriptionText = (e) => {
    setPersonalityQuiz((prev) => ({
      ...prev,
      description: e
    }))
    // const updatedData = {
    //   ...templateDetails,
    //   project_structure: {
    //     ...templateDetails.project_structure,
    //     pages: templateDetails.project_structure.pages.map((page) => ({
    //       ...page,
    //       blocks: page.blocks.map((block) =>
    //         block.id === formData?.id
    //           ? {
    //             ...block,
    //             struct: {
    //               ...block.struct,
    //               cover: {
    //                 ...block.struct.cover,
    //                 description: e,
    //               },
    //             },
    //           }
    //           : block
    //       ),
    //     })),
    //   },
    // };
    // dispatch(updateTemplateAction(updatedData));
  };

  const handleDButtonText = (e) => {
    setPersonalityQuiz((prev) => ({
      ...prev,
      buttonText: e
    }))
    // const updatedData = {
    //   ...templateDetails,
    //   project_structure: {
    //     ...templateDetails.project_structure,
    //     pages: templateDetails.project_structure.pages.map((page) => ({
    //       ...page,
    //       blocks: page.blocks.map((block) =>
    //         block.id === formData?.id
    //           ? {
    //             ...block,
    //             struct: {
    //               ...block.struct,
    //               cover: {
    //                 ...block.struct.cover,
    //                 buttonText: e,
    //               },
    //             },
    //           }
    //           : block
    //       ),
    //     })),
    //   },
    // };
    // dispatch(updateTemplateAction(updatedData));
  };

  const handleAddImageDisclimar = (e) => {
    setPersonalityQuiz((prev) => ({
      ...prev,
      imageDisclaimer: e
    }))
    // const updatedData = {
    //   ...templateDetails,
    //   project_structure: {
    //     ...templateDetails.project_structure,
    //     pages: templateDetails.project_structure.pages.map((page) => ({
    //       ...page,
    //       blocks: page.blocks.map((block) =>
    //         block.id === formData?.id
    //           ? {
    //             ...block,
    //             struct: {
    //               ...block.struct,
    //               cover: {
    //                 ...block.struct.cover,
    //                 imageDisclaimer: e,
    //               },
    //             },
    //           }
    //           : block
    //       ),
    //     })),
    //   },
    // };
    // dispatch(updateTemplateAction(updatedData));
  };

  const handleChangeAdditionalText = (e) => {
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
                  leadFormStruct: {
                    ...block.struct.leadFormStruct,
                    form: {
                      ...block.struct.leadFormStruct.form,
                      addtionalText: e,
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

  //   const handleDeleteItem = (id) => {
  //     setNewFieldsArray((prevFieldsArray) =>
  //       prevFieldsArray.filter((item) => item.id !== id)
  //     );

  //     const updatedData = {
  //       ...templateDetails,
  //       project_structure: {
  //         ...templateDetails.project_structure,
  //         pages: templateDetails.project_structure.pages.map((page) => ({
  //           ...page,
  //           blocks: page.blocks.map((block) =>
  //             block.id === formData?.id
  //               ? {
  //                 ...block,
  //                 struct: {
  //                   ...block.struct,
  //                   leadFormStruct: {
  //                     ...block.struct.leadFormStruct,
  //                     form: {
  //                       ...block.struct.leadFormStruct.form,
  //                       fields: block.struct.leadFormStruct.form.fields.filter(
  //                         (field) => field.id !== id
  //                       ),
  //                     },
  //                   },
  //                 },
  //               }
  //               : block
  //           ),
  //         })),
  //       },
  //     };

  //     dispatch(updateTemplateAction(updatedData));
  //   };
  const isValidWordCount = (text) => {
    console.log(text, "09485");

    // Ensure text is a valid string before calling trim
    if (typeof text !== 'string') {
      return false;  // Return false if the text is not a string
    }

    // Remove leading/trailing spaces and collapse multiple spaces between words
    const trimmedText = text.trim().replace(/\s+/g, ' ');

    // Split the text into an array of words
    const wordCount = trimmedText.split(' ').length;

    console.log(trimmedText, "trimmed text");  // Debug the trimmed text
    console.log(wordCount, "word count"); // Log the word count to verify

    // Return true if the word count is less than or equal to 20
    return wordCount <= 20 && wordCount > 0;  // Ensure that word count is greater than 0
  };
  const validateForm = () => {
    const questionErrors = personalityquizquestion.map((question) => {
      const errors = {};

      // Validate question text
      if (!question.text?.trim()) {
        errors.text = "Question text is required";
      }

      // Validate answers
      const answerErrors = question.answers?.map((answer) => {
        const answerError = {};
        if (!answer.text?.trim()) {
          answerError.text = "Answer text is required";
        }
        return answerError;
      }) || [];

      errors.answers = answerErrors;

      return errors;
    });

    const hasQuestionError = questionErrors.some((q) => {
      return q.text || q.answers?.some((a) => a.text);
    });

    // Final result validation
    const finalResultErrors = finalResult.map((res) => {
      const resErrors = {};
      if (!res.header?.trim()) {
        resErrors.header = "Header can't be empty";
      } else if (!isValidWordCount(res.header)) {
        resErrors.header = "Header exceeds allowed word count";
      }
      return resErrors;
    });

    const hasFinalError = finalResultErrors.some((r) => Object.keys(r).length > 0);

    // Validate Header for personalityquiz
    const personalityQuizErrors = {};
    if (!personalityquiz?.header?.trim()) {
      personalityQuizErrors.header = "Header is required";
    }

    // Validate Button Text for personalityquiz
    if (!personalityquiz?.buttonText?.trim()) {
      personalityQuizErrors.buttonText = "Button text is required";
    }

    // Final validation object
    const newErrors = {
      questions: questionErrors,
      results: finalResultErrors,
      personalityquiz: personalityQuizErrors,
    };

    setErrors(newErrors);

    return !hasQuestionError && !hasFinalError && !personalityQuizErrors.header && !personalityQuizErrors.buttonText;
  };
  const handleNext = async () => {


    if (!validateForm()) {
      setErrorScreen(true);
      return;


    } else {

      setErrorScreen(false);
      setTriggerNext(false);
      if (selecteScreen == "start-screen") {
        setSelectScreen("questions");
      } else if (selecteScreen == "questions") {
        console.log("jsajasdjhjdh");
        setSelectScreen("results");
      }
    }

    console.log("Proceed to next step");
  };

  // const validateForm = () => {
  //   const resultErrors = finalResult.map((res) => {
  //     const errors = {};
  //     if (!res.header?.trim()) {
  //       errors.header = "Header can't be empty";
  //     } else if (!isValidWordCount(res.header)) {
  //       errors.header = "Header exceeds allowed word count";
  //     }
  //     return errors;
  //   });

  //   const hasErrors = resultErrors.some((err) => Object.keys(err).length > 0);

  //   setErrors({ results: resultErrors });

  //   return !hasErrors;
  // };
  console.log(errors, "sopaispa")

  const handleShowStartScreen = (e) => {
    setPersonalityQuiz((prev) => ({
      ...prev,
      isShowCover: e

    }))

    console.log(personalityquiz, "PEPPPEPPPE")
    // const updatedData = {
    //   ...templateDetails,
    //   project_structure: {
    //     ...templateDetails.project_structure,
    //     pages: templateDetails.project_structure.pages.map((page) => ({
    //       ...page,
    //       blocks: page.blocks.map((block) =>
    //         block.id === formData?.id
    //           ? {
    //             ...block,
    //             struct: {
    //               ...block.struct,
    //               cover: {
    //                 ...block.struct.cover,
    //                 isShowCover: e,
    //               },
    //             },
    //           }
    //           : block
    //       ),
    //     })),
    //   },
    // };
    // dispatch(updateTemplateAction(updatedData));
  };
  const handleSavePersonalityQuiz = () => {
    console.log("Saving PersonalityQuiz...");

    if (!validateForm()) {
      setErrorScreen(true);
      return;
    }

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
                  cover: personalityquiz,
                  questions: personalityquizquestion,
                  results: finalResult,
                },
              }
              : block
          ),
        })),
      },
    };

    console.log("Dispatching updated data", updatedData);
    dispatch(updateTemplateAction(updatedData));
    setIsOpenFormModal(false); // ✅ Close modal
  };
  console.log(errors, "6565", finalResult)
  console.log(formData, "asapasas")
  // sjdcvsdhvih
  useEffect(() => {
    setPersonalityQuiz(formData?.struct?.cover)
    setPersonalityQuizQuestion(formData?.struct?.questions
    )
    setfinalResult(formData?.struct?.results
    )
  }, [formData])
  return (
    <> <div className="form-option-wrap">
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
                setErrorScreen(false)
                setSelectScreen("start-screen")
              }
            }}
          >
            <i class="fa-solid fa-desktop"></i>
            <p>Start Screen</p>
          </div>
          <div
            className={`options-settings ${selecteScreen === "questions" ? "activeTab" : ""}`}
            role="button"
            // onClick={() => setSelectScreen("questions")}
            onClick={() => {
              if (!validateForm()) {
                setErrorScreen(true);
                return;
              } else {
                setErrorScreen(false)
                setSelectScreen("questions")
              }
            }}
          >
            <i class="fa-solid fa-circle-question"></i>
            <p>Questions</p>
          </div>
          <div
            className={`options-settings ${selecteScreen === "results" ? "activeTab" : ""}`}
            role="button"
            // onClick={() => setSelectScreen("results")}
            onClick={() => {
              if (!validateForm()) {
                setErrorScreen(true);
                return;
              } else {
                setErrorScreen(false)
                setSelectScreen("results")
              }
            }}
          >
            <i class="fa-solid fa-square-poll-horizontal"></i>
            <p>Results</p>
          </div>
        </div>
      </div>

      {selecteScreen === "start-screen" && (
        <>
          <div className="form-left">
            <div className="fields-output">
              <label class="toggle-container d-flex align-items-center mb-4">
                Start screen
                <label class="toggle-switch">
                  <input
                    type="checkbox"
                    checked={personalityquiz?.isShowCover}
                    onChange={(e) => handleShowStartScreen(e.target.checked)}
                  />
                  <span class="slider"></span>
                </label>
              </label>

              <div
                className={`formFieldsList ${personalityquiz?.isShowCover ? "showCover" : "hideCover"}`}
              >
                <div className="additionalInfo">
                  <div className="fields_info">
                    <div className="mb-3">
                      <label
                        className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer"
                        role="button"
                      >
                        Header<span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control theme-control"
                        type="text"
                        value={personalityquiz?.header}
                        onChange={(e) => handleheaderText(e.target.value)}
                      />
                      {errors?.personalityquiz?.header && (
                        <p className="text-danger font-sm mt-1">{errors.personalityquiz.header}</p>
                      )}
                    </div>

                    <div className="mb-3">
                      <label
                        className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer"
                        role="button"
                      >
                        Description
                      </label>
                      <textarea
                        className="form-control theme-control"
                        value={personalityquiz?.description}
                        onChange={(e) => handleDescriptionText(e.target.value)}
                      />
                    </div>

                    <div className="d-flex w-100 gap-3 mb-3" role="button">
                      <div>
                        <label class="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                          Cover
                        </label>
                        <div className="coverchangeImage">
                          <img
                            src={personalityquiz?.image}
                            alt="cover"
                          />
                          <button
                            className="button button-primary border-0 font-sm"
                            onClick={() =>
                              handleChangeLogo("quiz-cover", formData?.id)
                            }
                          >
                            Change
                          </button>
                        </div>
                      </div>

                      <div className="w-100">
                        <label className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                          Button text <span className="text-danger">*</span>
                        </label>
                        <input
                          className="form-control theme-control"
                          value={personalityquiz.buttonText}
                          onChange={(e) => handleDButtonText(e.target.value)}
                        />
                        {errors?.personalityquiz?.buttonText && (
                          <p className="text-danger font-sm mt-1">{errors.personalityquiz.buttonText}</p>
                        )}
                      </div>

                    </div>

                    <div className="">
                      <label
                        className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer"
                        role="button"
                      >
                        Image disclaimer
                      </label>
                      <input
                        className="form-control theme-control"
                        value={personalityquiz?.imageDisclaimer}
                        onChange={(e) =>
                          handleAddImageDisclimar(e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="form-right border-start py-4">
            <h5>Approximate preview</h5>
            <div
              className={`formPreview cover_modal ${personalityquiz.isShowCover ? "showCover" : "hideCover"}`}
            >
              {formData?.struct?.cover.image && (
                <img
                  src={formData?.struct?.cover?.image}
                  alt="logo"
                  className="coverImage"
                />
              )}

              {personalityquiz?.header && (
                <h4 className="text-center pt-2">
                  {personalityquiz?.header}
                </h4>
              )}

              {personalityquiz?.description && (
                <p className="text-center">
                  {personalityquiz?.description}
                </p>
              )}
              {console.log(formData, "sddsds")}
              <div className="submitpreview">
                {formData?.struct?.cover?.buttonText && (
                  <div className="text-center m-2">
                    <button
                      className="btn py-2"
                      style={{
                        backgroundColor: `${formData?.struct?.colorTheme}`,
                        color: "#fff",
                      }}
                    >
                      {personalityquiz.buttonText || "Start"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {selecteScreen === "questions" && (
        <PersonalityQuestionScreen
          errors={errors}
          setPersonalityQuizQuestion={setPersonalityQuizQuestion}
          personalityquizquestion={personalityquizquestion}
          formData={formData}
          questions={formData?.struct?.questions}
          handleChangeImage={handleChangeLogo}
        />
        // <QuestionsScreen
        //   formData={formData}
        //   questions={formData?.struct?.questions}
        //   handleChangeImage={handleChangeLogo}
        // />
      )}
      {selecteScreen === "results" && (
        <ResultScreen

          personalityquizquestion={personalityquizquestion}
          setParentErros={setErrors}
          finalResult={finalResult}
          setfinalResult={setfinalResult}
          setTriggerNext={setTriggerNext}
          setErrorScreen={setErrorScreen}
          parenterror={errors}
          formData={formData}
          handleChangeImage={handleChangeLogo}
        />
      )}
    </div> <ul className="Footer_footer__bMDNk">
        {selecteScreen !== "results" && (
          <li className="Footer_footerItem__yaFNE">
            <button className="button button-primary outline px-3" onClick={handleNext}>Next</button>
          </li>
        )}
        <li className="Footer_footerItem__yaFNE">
          <button
            onClick={() => {
              // Update state
              handleSavePersonalityQuiz(); // Call the save function
            }}
            className="button button-primary px-3 text-decoration-none"
          >
            Save
          </button>
        </li>
      </ul>
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
      )}</>
  );
}

export default PersonalitySettingModal;
