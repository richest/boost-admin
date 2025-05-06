import React, { useEffect, useRef, useState } from "react";
import ResultScreen from "./SettingsComponent/ResultScreen";
import QuestionsScreen from "./SettingsComponent/QuestionsScreen";
import { useDispatch, useSelector } from "react-redux";
import { updateTemplateAction } from "views/pages/Templates/TemplateRedux/actions/drawerAction";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { CloseFullscreen } from "@mui/icons-material";
const validationSchema = yup.object().shape({
  isShowCover: yup.boolean(),
  header: yup
    .string()
    .required("Header is required")
    .min(1, "Header must be at least 3 characters long")
    .max(400, "Header must be at most 100 characters long"),
  description: yup
    .string()
    .max(500, "Description must be at most 500 characters long"),
  buttonText: yup.string().max(20, "Text must be at most 20 characters long"),
  imageDisclaimer: yup.string(),
});

function QuizSettingsModal({
  selecteScreen,
  setSelectScreen,
  formData,
  handleChangeLogo,
  setIsOpenFormModal,
  isEditMediaTypeDetails,
  updateParentState,

}) {
  console.log(formData, "formDataformData");
  const dispatch = useDispatch();
  const { templateDetails } = useSelector((state) => state.DrawerReducer);
  console.log(templateDetails, "templateDetailstemplateDetails")
  console.log(templateDetails, "templateDetails");
  const [errorScreen, setErrorScreen] = useState(false);
  const [templateData, setTemplateData] = useState(templateDetails || {});
  const [IsSaveClicked, setIsSaveClicked] = useState(false);
  const [selectedImageType, setSelectedImageType] = useState({});
  console.log(templateData, "templateDatatemplateData")
  const methods = useForm({
    resolver: yupResolver(validationSchema),

    defaultValues: {
      isShowCover: formData?.struct.cover?.isShowCover ?? false,
      header: formData?.struct.cover.header ?? "",
      description: formData?.struct.cover.description ?? "",
      buttonText: formData?.struct.cover.buttonText ?? "",
      imageDisclaimer: formData?.struct.cover.imageDisclaimer ?? "",
    },
  });
  console.log(formData?.struct.cover?.isShowCover, "kjjjk")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
  const handleheaderText = (e) => {
    console.log(e, "dsdsds");
    const updatedData = {
      ...templateData,
      project_structure: {
        ...templateData.project_structure,
        pages: templateData.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === formData?.id
              ? {
                ...block,
                struct: {
                  ...block.struct,
                  cover: {
                    ...block.struct.cover,
                    header: e,
                  },
                },
              }
              : block
          ),
        })),
      },
    };

    setTemplateData(updatedData);
  };
  console.log(
    templateData?.project_structure?.pages[0].blocks[0].struct?.cover?.header,
    "4242424242"
  );

  console.log(errors, "wdojwojdo");
  const handleDescriptionText = (e) => {
    const updatedData = {
      ...templateData,
      project_structure: {
        ...templateData.project_structure,
        pages: templateData.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === formData?.id
              ? {
                ...block,
                struct: {
                  ...block.struct,
                  cover: {
                    ...block.struct.cover,
                    description: e,
                  },
                },
              }
              : block
          ),
        })),
      },
    };
    setTemplateData(updatedData);
    // dispatch(updateTemplateAction(updatedData));
  };

  const handleDButtonText = (e) => {
    const updatedData = {
      ...templateData,
      project_structure: {
        ...templateData.project_structure,
        pages: templateData.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === formData?.id
              ? {
                ...block,
                struct: {
                  ...block.struct,
                  cover: {
                    ...block.struct.cover,
                    buttonText: e,
                  },
                },
              }
              : block
          ),
        })),
      },
    };
    setTemplateData(updatedData);
  };

  const handleAddImageDisclimar = (e) => {
    const updatedData = {
      ...templateData,
      project_structure: {
        ...templateData.project_structure,
        pages: templateData.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === formData?.id
              ? {
                ...block,
                struct: {
                  ...block.struct,
                  cover: {
                    ...block.struct.cover,
                    imageDisclaimer: e,
                  },
                },
              }
              : block
          ),
        })),
      },
    };
    setTemplateData(updatedData);
    // dispatch(updateTemplateAction(updatedData));
  };

  const handleChangeAdditionalText = (e) => {
    const updatedData = {
      ...templateData,
      project_structure: {
        ...templateData.project_structure,
        pages: templateData.project_structure.pages.map((page) => ({
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

  const handleDeleteItem = (id) => {
    setNewFieldsArray((prevFieldsArray) =>
      prevFieldsArray.filter((item) => item.id !== id)
    );

    const updatedData = {
      ...templateData,
      project_structure: {
        ...templateData.project_structure,
        pages: templateData.project_structure.pages.map((page) => ({
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
                      fields: block.struct.leadFormStruct.form.fields.filter(
                        (field) => field.id !== id
                      ),
                    },
                  },
                },
              }
              : block
          ),
        })),
      },
    };

    // dispatch(updateTemplateAction(updatedData));
  };
  console.log(templateData, "templateDatatemplateDatatemplateDatasd");
  const handleShowStartScreen = (e) => {
    console.log(e, "iooioii");
    const updatedData = {
      ...templateData,
      project_structure: {
        ...templateData.project_structure,
        pages: templateData.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === formData?.id
              ? {
                ...block,
                struct: {
                  ...block.struct,
                  cover: {
                    ...block.struct.cover,
                    isShowCover: e,
                  },
                },
              }
              : block
          ),
        })),
      },
    };
    setTemplateData(updatedData);
  };

  const handleSave = () => {
    console.log("object");
  };
  const formRef = useRef();

  const handleSaveQuestion = () => {
    console.log("TRIGGERED");
    // submitmainScreen
    if (formRef.current) {
      console.log("dkojwodjwdojw")
      console.log("formRef:", formRef.current); // Debugging
      // quiz one
      if (typeof formRef.current.submitForm === "function") {
        alert("submit");
        formRef.current.submitForm(); // ✅ Calls the submitForm method correctly
      } else {
        console.log("submitForm is not a function"); // Debugging
      }
      if (typeof formRef.current.submitmainScreen === "function") {
        console.log("4564567546");
        formRef.current.submitmainScreen(); // ✅ Calls the submitForm method correctly
      } else {
        console.log("submitForm is not a function"); // Debugging
      }
      // result
      if (typeof formRef.current.submitFormQuizResult === "function") {
        console.log("32332");
        formRef.current.submitFormQuizResult(); // ✅ Calls the submitFormQuizResult method correctly
      } else {
        console.log("submitFormQuizResult is not a function"); // Debugging
      }
    } else {
      console.log("formRef.current is null or undefined");
    }
  };

  const [triggerNext, setTriggerNext] = useState(false);
  console.log(triggerNext, "ioiooiio");

  const handleNext = async () => {
    console.log(Object.keys(errors).length > 0, "CALLEDDDD");

    await methods.trigger();
    let hasFormErrors = await formRef.current?.hasErrors();
    console.log(hasFormErrors, "223323232");
    if (selecteScreen == "questions" && formRef.current) {
      console.log("REACHEDDD");

      hasFormErrors = await formRef.current.hasErrors();
      console.log(hasFormErrors, "jkjkjkjkjj");
    } else if (selecteScreen == "results" && formRef.current) {
      hasFormErrors = await formRef.current.hasErrors();
      console.log("inRESULTTT");
    }
    if (hasFormErrors) {
      console.log("Form has errors", errors);
      setErrorScreen(true); // Show error message
      setTriggerNext(true); // Disable the "next" button or show the error state
    } else {
      // No errors, proceed to the next screen
      setErrorScreen(false); // Hide error message
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
  console.log(formData, "qspiqpsiqpsqp8989")
  console.log(templateData, "ioioiooioi")
  useEffect(() => {
    if (formRef) {
      formRef.current = {
        submitmainScreen: handleSubmit((data) => {
          console.log(data, "axaxax")
          const updatedData = {
            ...templateData,
            project_structure: {
              ...templateData.project_structure,
              pages: templateData.project_structure.pages.map((page) => ({
                ...page,
                blocks: page.blocks.map((block) =>
                  block.id === formData?.id
                    ? {
                      ...block,
                      struct: {
                        ...block.struct,
                        cover: {
                          ...block.struct.cover,
                          image: formData?.struct?.cover?.image
                        },
                      },
                    }
                    : block
                ),
              })),
            },
          };

          console.log("ioweur903r793027r9329", updatedData)
          console.log(templateData, "ssssasasasas", formData);
          // dispatch(updateTemplateAction(updatedData));
          dispatch(updateTemplateAction(updatedData));
          setIsOpenFormModal(false);
        }),
        hasErrors: () => Object.keys(errors).length > 0, // Checks for errors
      };
    }
  }, [formRef, handleSubmit, errors, templateData, formData]);
  useEffect(() => {
    if (selecteScreen === "start-screen" && Object.keys(errors).length > 0) {
      setErrorScreen(true);
      setTriggerNext(true);
    } else {
      setErrorScreen(false);
      setTriggerNext(false);
    }
  }, [errors, selecteScreen]);
  console.log(selecteScreen, "selecteScreenselecteScreen");

  useEffect(() => {
    if (templateData?.project_structure) {
      methods.reset({
        isShowCover:
          formData?.struct.cover?.isShowCover || false,
        header:
          formData?.struct.cover?.header || "",
        description:
          formData?.struct.cover?.description || "",
        buttonText:
          formData?.struct.cover?.buttonText || "",
        imageDisclaimer:
          formData?.struct.cover?.imageDisclaimer || "",
      });
    }
  }, [methods]);

  return (
    <>
      <div className="form-option-wrap">
        <div className="form-start">
          <div className="optionsEditScreen">
            <div
              className={`options-settings ${selecteScreen === "start-screen" ? "activeTab" : ""}`}
              role="button"
              onClick={() => {
                if (formRef.current?.hasErrors()) {
                  setErrorScreen(true);
                  setTriggerNext(true);
                } else {
                  setSelectScreen("start-screen");
                }
              }}
            >
              <i class="fa-solid fa-desktop"></i>
              <p>Start Screen</p>
            </div>
            <div
              className={`options-settings ${selecteScreen === "questions" ? "activeTab" : ""}`}
              role="button"
              onClick={() => {
                if (formRef.current?.hasErrors()) {
                  setErrorScreen(true);
                  setTriggerNext(true);
                } else {
                  setSelectScreen("questions");
                }
              }}
            >
              <i class="fa-solid fa-circle-question"></i>
              <p>Questions</p>
            </div>
            <div
              className={`options-settings ${selecteScreen === "results" ? "activeTab" : ""}`}
              role="button"
              onClick={() => {
                if (formRef.current?.hasErrors()) {
                  setErrorScreen(true); // Show the error screen if there are validation errors
                  setTriggerNext(true); // Trigger the "next" logic based on the errors
                } else {
                  setSelectScreen("results"); // Only change the screen if there are no errors
                }
              }}
            >
              <i class="fa-solid fa-square-poll-horizontal"></i>
              <p>Results</p>
            </div>
          </div>
        </div>
        {/* Start Screen */}
        {selecteScreen === "start-screen" && (
          <>
            {/* main SCRENN */}
            <FormProvider {...methods}>
              <div className="form-left">
                <div className="fields-output">
                  <label class="toggle-container d-flex align-items-center mb-4">
                    Start screen
                    <label class="toggle-switch">
                      <input
                        {...register("isShowCover")}
                        type="checkbox"
                        defaultChecked={formData?.struct?.cover?.isShowCover}
                        onChange={(e) =>
                          handleShowStartScreen(e.target.checked)
                        }
                      />
                      <span class="slider"></span>
                    </label>
                  </label>

                  <div
                    className={`formFieldsList ${formData?.struct?.cover?.isShowCover ? "showCover" : "hideCover"}`}
                  >
                    <div className="additionalInfo">
                      <div className="fields_info">
                        <div className="mb-3">
                          <label
                            className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer"
                            role="button"
                          >
                            Header <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            {...register("header", {
                              required: "Header is required",
                              minLength: 1,
                              maxLength: 2,
                            })}
                            className=" form-control theme-control"
                            type="text"
                            defaultValue={
                              templateData?.project_structure?.pages[0]
                                .blocks[0].struct?.cover?.header
                            }
                            onChange={(e) => handleheaderText(e.target.value)}
                          />
                          {errors.header && (
                            <p style={{ color: "red" }} className="error">
                              {errors.header.message}
                            </p>
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
                            {...register("description", { maxLength: 500 })}
                            className="form-control theme-control"
                            defaultValue={formData?.struct?.cover?.description}
                            onChange={(e) =>
                              handleDescriptionText(e.target.value)
                            }
                          />
                          {errors.description && (
                            <p style={{ color: "red" }} className="error">
                              {errors.description.message}
                            </p>
                          )}
                        </div>

                        <div className="d-flex w-100 gap-3 mb-3" role="button">
                          <div>
                            <label class="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                              Cover
                            </label>
                            <div className="coverchangeImage">
                              <img
                                src={formData?.struct?.cover?.image}
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
                              Button text<span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                              {...register("buttonText")}
                              className="form-control theme-control"
                              defaultValue={formData?.struct?.cover?.buttonText}
                              onChange={(e) =>
                                handleDButtonText(e.target.value)
                              }
                            />
                            {errors.buttonText && (
                              <p style={{ color: "red" }} className="error">
                                {errors.buttonText.message}
                              </p>
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
                            {...register("imageDisclaimer")}
                            className="form-control theme-control"
                            defaultValue={
                              formData?.struct?.cover?.imageDisclaimer
                            }
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
            </FormProvider>
            {/* main SCRENN */}
            <div className="form-right border-start py-4">
              {console.log(formData?.struct?.cover?.image, "piooioio")}
              <h5>Approximate preview</h5>
              <div
                className={`formPreview cover_modal ${formData?.struct?.cover?.isShowCover ? "showCover" : "hideCover"}`}
              >
                {formData?.struct?.cover?.image && (
                  <img
                    src={formData?.struct?.cover?.image}
                    alt="logo"
                    className="coverImage"
                  />
                )}

                {formData?.struct?.cover?.header && (
                  <h4 className="text-center pt-2">
                    {formData?.struct?.cover?.header}
                  </h4>
                )}

                {formData?.struct?.cover?.description && (
                  <p className="text-center">
                    {formData?.struct?.cover?.description}
                  </p>
                )}

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
                        {formData?.struct?.cover?.buttonText || "Start"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {selecteScreen === "questions" && (
          <QuestionsScreen
            isEditMediaTypeDetails={isEditMediaTypeDetails}
            updateParentState={updateParentState}
            setIsOpenFormModal={setIsOpenFormModal}
            selecteScreen={selecteScreen}
            setTriggerNext={setTriggerNext}
            // handleNext={handleNext}
            setErrorScreen={setErrorScreen}
            formRef={formRef}
            handleSaveQuestion={handleSaveQuestion}
            formData={formData}
            questions={formData?.struct}
            handleChangeImage={handleChangeLogo}
          />
        )}
        {selecteScreen === "results" && (
          <ResultScreen
            setIsOpenFormModal={setIsOpenFormModal}
            setTriggerNext={setTriggerNext}
            setErrorScreen={setErrorScreen}
            formRef={formRef}
            handleSaveQuestion={handleSaveQuestion}
            formData={formData}
            handleChangeImage={handleChangeLogo}
          />
        )}
      </div>
      <ul className="Footer_footer__bMDNk">
        {selecteScreen !== "results" && (
          <li className="Footer_footerItem__yaFNE">
            <button className="button button-primary outline px-3" onClick={handleNext}>Next</button>
          </li>
        )}
        <li className="Footer_footerItem__yaFNE">
          <button
            onClick={() => {
              setIsSaveClicked(true); // Update state
              handleSaveQuestion(); // Call the save function
            }}
            className="button button-primary px-3 text-decoration-none"
          >
            Save
          </button>
        </li>
      </ul>
      {/* if error is true then have to shiw this  */}
      {console.log(triggerNext, "triggerNext", errorScreen, "errorScreen")}
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

export default QuizSettingsModal;

//
//
//
//
//
// UPDATED oNE
// import React, { useEffect, useRef, useState } from "react";
// import ResultScreen from "./SettingsComponent/ResultScreen";
// import QuestionsScreen from "./SettingsComponent/QuestionsScreen";
// import { useDispatch, useSelector } from "react-redux";
// import { updateTemplateAction } from "views/pages/Templates/TemplateRedux/actions/drawerAction";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { FormProvider, useForm } from "react-hook-form";
// import { CloseFullscreen } from "@mui/icons-material";
// const validationSchema = yup.object().shape({
//   isShowCover: yup.boolean(),
//   header: yup
//     .string()
//     .required("Header is required")
//     .min(1, "Header must be at least 3 characters long")
//     .max(400, "Header must be at most 100 characters long"),
//   description: yup
//     .string()
//     .max(500, "Description must be at most 500 characters long"),
//   buttonText: yup.string().max(20, "Text must be at most 20 characters long").required("Button Text is required"),
//   imageDisclaimer: yup.string(),
// });
// function QuizSettingsModal({
//   selecteScreen,
//   setSelectScreen,
//   formData,
//   handleChangeLogo,
//   setIsOpenFormModal
// }) {
//   console.log(formData, "formDataformData")
//   const dispatch = useDispatch();
//   const { templateDetails } = useSelector((state) => state.DrawerReducer);
//   console.log(templateDetails, "templateData")
//   const [errorScreen, setErrorScreen] = useState(false);
//   const [templateData, setTemplateData] = useState(templateDetails || {});
//   const [IsSaveClicked, setIsSaveClicked] = useState(false)
//   console.log(templateData, "templateDatatemplateDatatemplateData")
//   // const handleheaderText = (e) => {
//   //   console.log(e, "dsdsds")
//   //   const updatedData = {
//   //     ...templateDetails,
//   //     project_structure: {
//   //       ...templateDetails.project_structure,
//   //       pages: templateDetails.project_structure.pages.map((page) => ({
//   //         ...page,
//   //         blocks: page.blocks.map((block) =>
//   //           block.id === formData?.id
//   //             ? {
//   //               ...block,
//   //               struct: {
//   //                 ...block.struct,
//   //                 cover: {
//   //                   ...block.struct.cover,
//   //                   header: e,
//   //                 },
//   //               },
//   //             }
//   //             : block
//   //         ),
//   //       })),
//   //     },
//   //   };

//   //   setTemplateData(updatedData)
//   // };

//   const handleheaderText = (value) => {
//     console.log(value, "wwdwdwd")
//     setTemplateData((prev) => ({
//       ...prev,
//       project_structure: {
//         ...prev.project_structure,
//         pages: prev.project_structure.pages.map((page) => ({
//           ...page,
//           blocks: page.blocks.map((block) =>
//             block.id === formData?.id
//               ? {
//                 ...block,
//                 struct: {
//                   ...block.struct,
//                   cover: {
//                     ...block.struct.cover,
//                     header: value, // Updating header text dynamically
//                   },
//                 },
//               }
//               : block
//           ),
//         })),
//       },
//     }));
//   };

//   console.log(templateData?.project_structure?.pages[0].blocks[0].struct?.cover?.header, "4242424242")
//   const methods = useForm({
//     resolver: yupResolver(validationSchema),
//     defaultValues: {
//       isShowCover: templateData?.project_structure?.pages[0]?.blocks[0]?.struct?.cover?.isShowCover || false,
//       header: templateData?.project_structure?.pages[0]?.blocks[0]?.struct?.cover?.header || "",
//       description: templateData?.project_structure?.pages[0]?.blocks[0]?.struct?.cover?.description || "",
//       buttonText: templateData?.project_structure?.pages[0]?.blocks[0]?.struct?.cover?.buttonText || "",
//       imageDisclaimer: templateData?.project_structure?.pages[0]?.blocks[0]?.struct?.cover?.imageDisclaimer || "",
//     },
//   });
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = methods;
//   console.log(errors, "wdojwojdo");
//   const handleDescriptionText = (e) => {
//     console.log(e, "dffefe")
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
//                   cover: {
//                     ...block.struct.cover,
//                     description: e,
//                   },
//                 },
//               }
//               : block
//           ),
//         })),
//       },
//     };

//     setTemplateData(updatedData)
//     // dispatch(updateTemplateAction(updatedData));
//   };

//   const handleDButtonText = (e) => {
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
//                   cover: {
//                     ...block.struct.cover,
//                     buttonText: e,
//                   },
//                 },
//               }
//               : block
//           ),
//         })),
//       },
//     };
//     setTemplateData(updatedData)
//   };

//   const handleAddImageDisclimar = (e) => {
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
//                   cover: {
//                     ...block.struct.cover,
//                     imageDisclaimer: e,
//                   },
//                 },
//               }
//               : block
//           ),
//         })),
//       },
//     };
//     setTemplateData(updatedData)
//     // dispatch(updateTemplateAction(updatedData));
//   };

//   const handleChangeAdditionalText = (e) => {
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
//                       addtionalText: e,
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

//   const handleShowStartScreen = (e) => {
//     console.log(e, "iooioii")
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
//                   cover: {
//                     ...block.struct.cover,
//                     isShowCover: e,
//                   },
//                 },
//               }
//               : block
//           ),
//         })),
//       },
//     };
//     setTemplateData(updatedData)

//   };

//   const handleSave = () => {
//     console.log("object");
//   };
//   const formRef = useRef();
//   const handleSaveQuestion = () => {
//     console.log("TRIGGERED");
//     // submitmainScreen
//     if (formRef.current) {
//       console.log("formRef:", formRef.current); // Debugging
//       // quiz one
//       if (typeof formRef.current.submitForm === "function") {
//         console.log("IKOIOIIOOIOI");
//         formRef.current.submitForm(); // ✅ Calls the submitForm method correctly
//       } else {
//         console.log("submitForm is not a function"); // Debugging
//       }
//       if (typeof formRef.current.submitmainScreen === "function") {
//         console.log("4564567546");
//         formRef.current.submitmainScreen(); // ✅ Calls the submitForm method correctly
//       } else {
//         console.log("submitForm is not a function"); // Debugging
//       }
//       // result
//       if (typeof formRef.current.submitFormQuizResult === "function") {
//         console.log("32332");
//         formRef.current.submitFormQuizResult(); // ✅ Calls the submitFormQuizResult method correctly
//       } else {
//         console.log("submitFormQuizResult is not a function"); // Debugging
//       }
//     } else {
//       console.log("formRef.current is null or undefined");
//     }
//   };

//   const [triggerNext, setTriggerNext] = useState(false);
//   console.log(triggerNext, "ioiooiio");

//   const handleNext = async () => {

//     console.log(Object.keys(errors).length > 0, "CALLEDDDD")

//     await methods.trigger()
//     let hasFormErrors = await formRef.current?.hasErrors()
//     console.log(hasFormErrors, "jkjhijijj")
//     if (selecteScreen == 'questions' && formRef.current) {
//       console.log("REACHEDDD")

//       hasFormErrors = await formRef.current.hasErrors();
//     } else if (selecteScreen == 'results' && formRef.current) {
//       hasFormErrors = await formRef.current.hasErrors();
//     }
//     if (hasFormErrors) {
//       console.log("Form has errors", errors);
//       setErrorScreen(true);  // Show error message
//       setTriggerNext(true);  // Disable the "next" button or show the error state
//     } else {
//       // No errors, proceed to the next screen
//       setErrorScreen(false);  // Hide error message
//       setTriggerNext(false);
//       if (selecteScreen == "start-screen") {
//         setSelectScreen("questions");
//       } else if (selecteScreen == "questions") {

//         console.log("jsajasdjhjdh")
//         setSelectScreen("results");
//       }
//     }
//     // if (selecteScreen === "questions") {
//     //   await formRef.current.submitForm(); // Validate quiz form
//     //   // } else if (selecteScreen === "results") {
//     //   //   await formRef.current.submitFormResults(); // Validate results form
//     // } else if (selecteScreen === "start-screen") {
//     //   setSelectScreen("questions")
//     // }
//     // if (formRef.current?.hasErrors()) {
//     //   console.log(formRef.current?.hasErrors(), "formRef")
//     //   setErrorScreen(true);
//     //   setTriggerNext(true);
//     // } else {
//     //   setErrorScreen(false);
//     //   setTriggerNext(false);

//     // setSelectScreen("results")
//     console.log("Proceed to next step");
//     // }
//     ; // Wait for React state update before checking errors
//   };

//   useEffect(() => {
//     if (formRef) {
//       formRef.current = {
//         submitmainScreen: handleSubmit((data) => {
//           console.log("Form Data:", data);
//           console.log("Latest Template Data:", templateData);

//           dispatch(updateTemplateAction(templateData)); // Ensures updated state
//           setIsOpenFormModal(false);
//         }),
//         hasErrors: () => Object.keys(errors).length > 0, // Checks for errors
//       };
//     }
//   }, [formRef, handleSubmit, errors, templateData]); // Added `templateData` dependency

//   useEffect(() => {
//     if (selecteScreen === "start-screen" && Object.keys(errors).length > 0) {
//       setErrorScreen(true);
//       setTriggerNext(true);
//     } else {
//       setErrorScreen(false);
//       setTriggerNext(false);
//     }
//   }, [errors, selecteScreen]);
//   console.log(selecteScreen, "selecteScreenselecteScreen");

//   console.log(templateData?.project_structure?.pages?.[0]?.blocks?.[0]?.struct?.cover?.description, "scscsc")
//   // useEffect(() => {
//   //   if (templateData?.project_structure) {
//   //     methods.reset({
//   //       isShowCover: templateData?.project_structure?.pages?.[0]?.blocks?.[0]?.struct?.cover?.isShowCover || false,
//   //       header: templateData?.project_structure?.pages?.[0]?.blocks?.[0]?.struct?.cover?.header || "",
//   //       description: templateData?.project_structure?.pages?.[0]?.blocks?.[0]?.struct?.cover?.description || "",
//   //       buttonText: templateData?.project_structure?.pages?.[0]?.blocks?.[0]?.struct?.cover?.buttonText || "",
//   //       imageDisclaimer: templateData?.project_structure?.pages?.[0]?.blocks?.[0]?.struct?.cover?.imageDisclaimer || "",
//   //     });
//   //   }
//   // }, []);
//   useEffect(() => {
//     methods.setValue("header", templateData?.project_structure?.pages[0]?.blocks[0]?.struct?.cover?.header || "");
//     methods.setValue("description", templateData?.project_structure?.pages[0]?.blocks[0]?.struct?.cover?.description || "");
//     methods.setValue("buttonText", templateData?.project_structure?.pages[0]?.blocks[0]?.struct?.cover?.buttonText || "");
//     methods.setValue("imageDisclaimer", templateData?.project_structure?.pages[0]?.blocks[0]?.struct?.cover?.imageDisclaimer || "");
//     methods.setValue("isShowCover", templateData?.project_structure?.pages[0]?.blocks[0]?.struct?.cover?.isShowCover || false);
//   }, [templateDetails]);
//   const latestTemplateDataRef = useRef(templateData);

//   useEffect(() => {
//     latestTemplateDataRef.current = templateData; // Always updates to the latest value
//   }, [templateData]);
//   return (
//     <>
//       <div className="form-option-wrap">
//         <div className="form-start">
//           <div className="optionsEditScreen">
//             <div
//               className={`options-settings ${selecteScreen === "start-screen" ? "activeTab" : ""}`}
//               role="button"
//               onClick={() => {
//                 if (formRef.current?.hasErrors()) {
//                   setErrorScreen(true);
//                   setTriggerNext(true);
//                 } else {
//                   setSelectScreen("start-screen");
//                 }
//               }}
//             >
//               <i class="fa-solid fa-desktop"></i>
//               <p>Start Screen</p>
//             </div>
//             <div
//               className={`options-settings ${selecteScreen === "questions" ? "activeTab" : ""}`}
//               role="button"
//               onClick={() => {
//                 if (formRef.current?.hasErrors()) {
//                   setErrorScreen(true);
//                   setTriggerNext(true);
//                 } else {
//                   setSelectScreen("questions");
//                 }
//               }}
//             >
//               <i class="fa-solid fa-circle-question"></i>
//               <p>Questions</p>
//             </div>
//             <div
//               className={`options-settings ${selecteScreen === "results" ? "activeTab" : ""}`}
//               role="button"
//               onClick={() => {
//                 if (formRef.current?.hasErrors()) {
//                   setErrorScreen(true); // Show the error screen if there are validation errors
//                   setTriggerNext(true); // Trigger the "next" logic based on the errors
//                 } else {
//                   setSelectScreen("results"); // Only change the screen if there are no errors
//                 }
//               }}
//             >
//               <i class="fa-solid fa-square-poll-horizontal"></i>
//               <p>Results</p>
//             </div>
//           </div>
//         </div>
//         {/* Start Screen */}
//         {selecteScreen === "start-screen" && (
//           <>
//             {/* main SCRENN */}
//             <FormProvider {...methods}>
//               <div className="form-left">
//                 <div className="fields-output">
//                   <label class="toggle-container d-flex align-items-center mb-4">
//                     Start screen
//                     <label class="toggle-switch">
//                       <input
//                         {...register("isShowCover")}
//                         type="checkbox"
//                         defaultChecked={formData?.struct?.cover?.isShowCover}
//                         onChange={(e) =>
//                           handleShowStartScreen(e.target.checked)
//                         }
//                       />
//                       <span class="slider"></span>
//                     </label>
//                   </label>

//                   <div
//                     className={`formFieldsList ${formData?.struct?.cover?.isShowCover ? "showCover" : "hideCover"}`}
//                   >
//                     <div className="additionalInfo">
//                       <div className="fields_info">
//                         <div className="mb-3">
//                           <label
//                             className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer"
//                             role="button"
//                           >
//                             Header <span style={{ color: "red" }}>*</span>
//                           </label>
//                           <input
//                             {...register("header", {
//                               required: "Header is required",
//                               minLength: 1,
//                               maxLength: 2,
//                             })}
//                             className="form-control theme-control"
//                             type="text"
//                             defaultValue={templateData?.project_structure?.pages[0]?.blocks[0]?.struct?.cover?.header || ""}
//                             onChange={(e) => handleheaderText(e.target.value)}
//                           />
//                           {errors.header && (
//                             <p style={{ color: "red" }} className="error">
//                               {errors.header.message}
//                             </p>
//                           )}

//                         </div>

//                         <div className="mb-3">
//                           <label
//                             className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer"
//                             role="button"
//                           >
//                             Description
//                           </label>
//                           <textarea
//                             {...register("description", { maxLength: 500 })}
//                             className="form-control theme-control"
//                             defaultValue={formData?.struct?.cover?.description}
//                             onChange={(e) =>
//                               handleDescriptionText(e.target.value)
//                             }
//                           />
//                           {errors.description && (
//                             <p style={{ color: "red" }} className="error">
//                               {errors.description.message}
//                             </p>
//                           )}
//                         </div>

//                         <div className="d-flex w-100 gap-3 mb-3" role="button">
//                           <div>
//                             <label class="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
//                               Cover
//                             </label>
//                             <div className="coverchangeImage">
//                               <img
//                                 src={formData?.struct?.cover?.image}
//                                 alt="cover"
//                               />
//                               <button
//                                 className="button button-primary border-0 font-sm"
//                                 onClick={() =>
//                                   handleChangeLogo("quiz-cover", formData?.id)
//                                 }
//                               >
//                                 Change
//                               </button>
//                             </div>
//                           </div>

//                           <div className="w-100">
//                             <label className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
//                               Button text<span style={{ color: "red" }}>*</span>
//                             </label>
//                             <input
//                               {...register("buttonText")}
//                               className="form-control theme-control"
//                               defaultValue={formData?.struct?.cover?.buttonText}
//                               onChange={(e) =>
//                                 handleDButtonText(e.target.value)
//                               }
//                             />
//                             {errors.buttonText && (
//                               <p style={{ color: "red" }} className="error">
//                                 {errors.buttonText.message}
//                               </p>
//                             )}
//                           </div>
//                         </div>

//                         <div className="">
//                           <label
//                             className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer"
//                             role="button"
//                           >
//                             Image disclaimer
//                           </label>
//                           <input
//                             {...register("imageDisclaimer")}
//                             className="form-control theme-control"
//                             defaultValue={
//                               formData?.struct?.cover?.imageDisclaimer
//                             }
//                             onChange={(e) =>
//                               handleAddImageDisclimar(e.target.value)
//                             }
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </FormProvider>
//             {/* main SCRENN */}
//             <div className="form-right border-start py-4">
//               <h5>Approximate preview</h5>
//               <div
//                 className={`formPreview cover_modal ${formData?.struct?.cover?.isShowCover ? "showCover" : "hideCover"}`}
//               >
//                 {formData?.struct?.cover?.image && (
//                   <img
//                     src={formData?.struct?.cover?.image}
//                     alt="logo"
//                     className="coverImage"
//                   />
//                 )}

//                 {formData?.struct?.cover?.header && (
//                   <h4 className="text-center pt-2">
//                     {formData?.struct?.cover?.header}
//                   </h4>
//                 )}

//                 {formData?.struct?.cover?.description && (
//                   <p className="text-center">
//                     {formData?.struct?.cover?.description}
//                   </p>
//                 )}

//                 <div className="submitpreview">
//                   {formData?.struct?.cover?.buttonText && (
//                     <div className="text-center m-2">
//                       <button
//                         className="btn py-2"
//                         style={{
//                           backgroundColor: `${formData?.struct?.colorTheme}`,
//                           color: "#fff",
//                         }}
//                       >
//                         {formData?.struct?.cover?.buttonText || "Start"}
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </>
//         )}

//         {selecteScreen === "questions" && (
//           <QuestionsScreen
//             setIsOpenFormModal={setIsOpenFormModal}
//             selecteScreen={selecteScreen}
//             setTriggerNext={setTriggerNext}
//             // handleNext={handleNext}
//             setErrorScreen={setErrorScreen}
//             formRef={formRef}
//             handleSaveQuestion={handleSaveQuestion}
//             formData={formData}
//             questions={formData?.struct}
//             handleChangeImage={handleChangeLogo}
//           />
//         )}
//         {selecteScreen === "results" && (
//           <ResultScreen
//             setIsOpenFormModal={setIsOpenFormModal}
//             setTriggerNext={setTriggerNext}
//             setErrorScreen={setErrorScreen}
//             formRef={formRef}
//             handleSaveQuestion={handleSaveQuestion}
//             formData={formData}
//             handleChangeImage={handleChangeLogo}
//           />
//         )}
//       </div>
//       <ul className="Footer_footer__bMDNk">
//         {selecteScreen !== "results" && (
//           <li className="Footer_footerItem__yaFNE">
//             <button onClick={handleNext}>Next</button>
//           </li>
//         )}
//         <li className="Footer_footerItem__yaFNE">
//           <button
//             onClick={() => {
//               setIsSaveClicked(true); // Update state
//               handleSaveQuestion(); // Call the save function
//             }}
//             className="button button-primary px-3 text-decoration-none"
//           >
//             Save
//           </button>
//         </li>
//       </ul>
//       {/* if error is true then have to shiw this  */}
//       {console.log(triggerNext, "triggerNext", errorScreen, "errorScreen")}
//       {(errorScreen || triggerNext) && (
//         <div className="StopPanel_modalStop__Msu+K">
//           <div className="StopPanel_modalOverlay__1dGP2"></div>
//           <div className="StopPanel_modalContent__8Epq4">
//             <div className="StopPanel_note__c+Qou">
//               <div className="StopPanel_imageBox__2Udoo">
//                 <img
//                   className="StopPanel_image__2gtri"
//                   src="https://account.interacty.me/static/media/girl.af105485362519d96dd6e5f1bc6da415.svg"
//                   alt=""
//                 />
//               </div>
//               <div className="StopPanel_textBox__stxYL">
//                 <h4 className="StopPanel_textTitle__T8v5c">
//                   Oh! Need more information
//                 </h4>
//                 <p className="StopPanel_textContent__2I+u6">
//                   Please fill all required fields on this tab for the quiz to
//                   work correctly.
//                 </p>
//               </div>
//             </div>
//             <div className="StopPanel_buttons__cZz5n">
//               <button
//                 onClick={() => {
//                   setErrorScreen(false);
//                   setTriggerNext(false);
//                 }}
//                 className="button button-primary px-3 text-decoration-none"
//               >
//                 Back
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default QuizSettingsModal;

