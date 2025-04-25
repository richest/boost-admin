import React from "react";
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
}) {
  const dispatch = useDispatch();
  const { templateDetails } = useSelector((state) => state.DrawerReducer);

  const handleheaderText = (e) => {
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
    dispatch(updateTemplateAction(updatedData));
  };

  const handleDescriptionText = (e) => {
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
    dispatch(updateTemplateAction(updatedData));
  };

  const handleDButtonText = (e) => {
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
    dispatch(updateTemplateAction(updatedData));
  };

  const handleAddImageDisclimar = (e) => {
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
    dispatch(updateTemplateAction(updatedData));
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

  const handleShowStartScreen = (e) => {
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
    dispatch(updateTemplateAction(updatedData));
  };

  return (
    <div className="form-option-wrap">
      <div className="form-start">
        <div className="optionsEditScreen">
          <div
            className={`options-settings ${selecteScreen === "start-screen" ? "activeTab" : ""}`}
            role="button"
            onClick={() => setSelectScreen("start-screen")}
          >
            <i class="fa-solid fa-desktop"></i>
            <p>Start Screen</p>
          </div>
          <div
            className={`options-settings ${selecteScreen === "questions" ? "activeTab" : ""}`}
            role="button"
            onClick={() => setSelectScreen("questions")}
          >
            <i class="fa-solid fa-circle-question"></i>
            <p>Questions</p>
          </div>
          <div
            className={`options-settings ${selecteScreen === "results" ? "activeTab" : ""}`}
            role="button"
            onClick={() => setSelectScreen("results")}
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
                    defaultChecked={formData?.struct?.cover?.isShowCover}
                    onChange={(e) => handleShowStartScreen(e.target.checked)}
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
                        Header
                      </label>
                      <input
                        className=" form-control theme-control"
                        type="text"
                        defaultValue={formData?.struct?.cover?.header}
                        onChange={(e) => handleheaderText(e.target.value)}
                      />
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
                        defaultValue={formData?.struct?.cover?.description}
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
                          Button text
                        </label>
                        <input
                          className="form-control theme-control"
                          defaultValue={formData?.struct?.cover?.buttonText}
                          onChange={(e) => handleDButtonText(e.target.value)}
                        />
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
                        defaultValue={formData?.struct?.cover?.imageDisclaimer}
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
        <PersonalityQuestionScreen
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
          formData={formData}
          handleChangeImage={handleChangeLogo}
        />
      )}
    </div>
  );
}

export default PersonalitySettingModal;
