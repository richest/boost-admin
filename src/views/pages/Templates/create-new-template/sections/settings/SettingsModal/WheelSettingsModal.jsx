import React, { useEffect, useRef, useState } from "react";
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
import { useForm, FormProvider } from "react-hook-form";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
export const playgroundSchema = yup.object().shape({
  animationDuration: yup
    .number()
    .typeError("Animation duration must be a number")
    .required("Animation duration is required")
    .positive("Must be greater than 0"),
  sectionsCount: yup
    .number()
    .typeError("Select number of sectors")
    .required("Number of sectors is required"),
  isShowCover: yup.boolean(),

  coverHeader: yup.string().when("isShowCover", {
    is: true,
    then: () => yup.string().required("Cover header is required"),
    otherwise: () => yup.string().nullable(),
  }),

  coverButtonText: yup.string().when("isShowCover", {
    is: true,
    then: () => yup.string().required("Cover button text is required"),
    otherwise: () => yup.string().nullable(),
  }),



});

function WheeleModal({
  setIsOpenFormModal,
  selecteScreen,
  setSelectScreen,
  formData,
  handleChangeLogo,
}) {
  const methods = useForm({
    resolver: yupResolver(playgroundSchema),
    mode: "onSubmit",
    defaultValues: {
      animationDuration: formData?.struct?.playground?.animationDuration || "",
      sectionsCount: formData?.struct?.playground?.sectionsCount || "",
      sectionType: formData?.struct?.playground?.sectionType || "",
      spinImageUrl: formData?.struct?.playground?.spinImageUrl || "",
      isShowCover: formData?.struct?.playground?.isShowCover || false,
      coverHeader: formData?.struct?.playground?.coverHeader || "",
      coverButtonText: formData?.struct?.playground?.coverButtonText || "",
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
    trigger,
  } = methods;
  console.log(errors, "errorserrors")
  const onSubmit = async (data) => {

    if (formSubmitFnRef.current) {
      console.log("TRIHGGEGEEGE")
      formSubmitFnRef.current();

      // formSubmitFnRef.current.hasErrors = () => Object.keys(errors).length > 0;
      // setErrorScreen(true)
    }


    console.log("TERIGGERED", data)
    const isValid = await trigger();
    console.log(isValid, "ISDVAVAVA")
    if (!isValid) {

      setErrorScreen(true)
      console.warn("Parent form has errors");
      return;
    }

    // 🔽 Call child's validation now
    // const isChildValid = await childRef.current?.validateChildForm(); // ← we’ll define this

    // if (!isChildValid) {
    //   console.warn("Child form has errors");
    //   return;
    // }

    const allValues = getValues();
    // setIsOpenFormModal(false);
    console.log("✅ Final values to save:", allValues);

    // Proceed with save API or function
  };
  console.log(errors, "ikoiooio")


  const [leading, setLeading] = useState({
    left: false,
    right: false,
  });
  const [errorScreen, setErrorScreen] = useState(false);
  const [votes, setVotes] = useState({
    left: 0,
    right: 0,
  });
  const [showTag, setShowTag] = useState(false);
  console.log(errorScreen, "errorScreen")
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
  console.log(errorScreen, "errorScreenerrorScreen")

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
      label: "2",
      value: "2",
    },
    {
      label: "3",
      value: "3",
    },
    {
      label: "4",
      value: "4",
    },
    {
      label: "5",
      value: "5",
    },
    {
      label: "6",
      value: "6",
    },
    {
      label: "7",
      value: "7",
    },
    {
      label: "8",
      value: "8",
    },
    {
      label: "9",
      value: "9",
    },
    {
      label: "10",
      value: "10",
    },
    {
      label: "11",
      value: "11",
    },
    {
      label: "12",
      value: "12",
    },
  ];

  const dispatch = useDispatch();
  const { templateDetails } = useSelector((state) => state.DrawerReducer);
  const formSubmitFnRef = useRef(null);
  const handleSelectChange = (e) => {
    console.log(formData?.struct, "checkcardgherere");
    let updatedTileList = [...(formData?.struct?.sections || [])];

    const requiredLength = parseInt(e.value, 10);

    if (updatedTileList.length > requiredLength) {
      updatedTileList = updatedTileList.slice(0, requiredLength);
    } else {
      for (let i = updatedTileList.length; i < requiredLength; i++) {
        updatedTileList.push({
          id: generateShortId(),
          imageUrl:
            "https://res.cloudinary.com/dwl5gzbuz/image/upload/v1739271156/Group_3_jl6d69.png",
          probabilityOfWinning: "NORMAL",
          resultButtonLink: "",
          resultButtonText: "",
          resultDescription: `Result ${i + 1}`,
          resultHeader: "Congratulations!",
          resultImageDisclaimer: "",
          resultImageUrl:
            "https://res.cloudinary.com/dwl5gzbuz/image/upload/v1739271156/Group_3_jl6d69.png",
          text: `Section ${i + 1}`,
        });
      }
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
                  sections: updatedTileList,
                  playground: {
                    ...block.struct.playground,
                    sectionsCount: updatedTileList?.length,
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
  const handleChangeTextImage = (e) => {
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
                    sectionType: e,
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

  const handleDeleteImage = (e) => {
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
                    spinImageUrl: "",
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
  const handlehangepropertions = (prop) => {
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
                    cardProportions: prop,
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

  const handleAnimationTimer = (e) => {
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
                    animationDuration: e,
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
                    coverHeader: e,
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

  const handleChangeheaderButtonText = (e) => {
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
                    coverButtonText: e,
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
  console.log(formData?.struct, "cehchccchformdTAaa");

  const handleNext = async () => {
    // Trigger validation for the entire form
    const isValid = await trigger();  // This will trigger validation of all fields

    if (isValid) {
      // No errors, proceed to the next screen
      setSelectScreen("quests");
      console.log("No errors, proceeding to next step.");
    } else {
      // There are errors, set error screen flag
      setErrorScreen(true);
      console.log("There are errors, cannot proceed.");
    }
  };

  console.log("wdwd234234")
  useEffect(() => {
    console.log(errors, "Form validation errors");
    if (Object.keys(errors).length > 0) {
      setErrorScreen(true);
    } else {
      // setErrorScreen(false);
    }
  }, [errors]);
  // useEffect(() => {
  //   console.log("Checking for errors...");
  //   const hasAnyError = Object.keys(errors).length > 0;
  //   console.log(hasAnyError, "hasAnyErrorhasAnyError")
  //   setErrorScreen(hasAnyError);
  // }, [errors]);
  return (
    <>
      {console.log(selecteScreen,)}
      <div className="form-option-wrap">
        <div className="form-start">
          <div className="optionsEditScreen">
            <div
              className={`options-settings ${selecteScreen === "start-screen" ? "activeTab" : ""}`}
              role="button"
              onClick={() => {
                if (Object.keys(errors).length > 0) {
                  setErrorScreen(true)
                } else {
                  setSelectScreen("start-screen")
                  setErrorScreen(false)
                }
              }
              }
            >
              <i class="fa-solid fa-desktop"></i>
              <p>Layout</p>
            </div>
            <div
              className={`options-settings ${selecteScreen === "quests" ? "activeTab" : ""}`}
              role="button"
              onClick={() => {
                if (Object.keys(errors).length > 0) {
                  setErrorScreen(true)
                } else {
                  setSelectScreen("quests")
                  setErrorScreen(false)
                }
              }
              }

            >
              <i class="fa-solid fa-circle-question"></i>
              <p>Sectors</p>
            </div>
          </div>
        </div>

        {selecteScreen === "start-screen" && (
          <>
            <div className="form-left border-end">
              <div className="fields-output">
                <label class="toggle-container mb-4">Layout</label>
                {/* hihihihihi */}
                <div className={`formFieldsList`}>
                  <div className="additionalInfo">
                    <FormProvider {...methods}>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="fields_info">
                          <div className="row g-3 mb-3">
                            <div className="col-md-6">
                              <div className="">
                                <label className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                                  Number of sectors
                                </label>
                                {/* <Select
                              className="theme-select"
                              classNamePrefix="react-select"
                              defaultValue={
                                formData?.struct?.playground?.sectionsCount
                                  ? {
                                    label:
                                      formData?.struct?.playground
                                        ?.sectionsCount,
                                    value:
                                      formData?.struct?.playground
                                        ?.sectionsCount,
                                  }
                                  : null
                              }
                              options={questsLength}
                              onChange={(selected) =>
                                handleSelectChange(selected)
                              }
                              placeholder="no of cards"
                            /> */}
                                <Select
                                  className="theme-select"
                                  classNamePrefix="react-select"
                                  value={watch("sectionsCount") ? { label: watch("sectionsCount"), value: watch("sectionsCount") } : null}
                                  options={questsLength}
                                  onChange={(selected) => {
                                    handleSelectChange(selected)
                                    setValue("sectionsCount", selected.value)
                                  }



                                  }
                                  placeholder="no of cards"
                                />
                                {errors.sectionsCount && <p className="text-danger">{errors.sectionsCount.message}</p>}
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="cardTypesection">
                                <label className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                                  Sector type
                                </label>
                                <div className="button___cardTYPE d-flex gap-2">
                                  <button
                                    className={`btn selectypebutton w-100 ${formData?.struct?.playground.sectionType === "IMAGE" ? "selected primary-text" : ""}`}
                                    onClick={() => handleChangeTextImage("IMAGE")}
                                  >
                                    <i class="fa-solid fa-image"></i> Image
                                  </button>
                                  <button
                                    className={`btn selectypebutton w-100 ${formData?.struct?.playground.sectionType === "TEXT" ? "selected primary-text" : ""}`}
                                    onClick={() => handleChangeTextImage("TEXT")}
                                  >
                                    <i class="fa-solid fa-pen-to-square"></i> Text
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <label className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                              Center pin image
                            </label>
                            <div className="d-flex align-items-start">
                              <div className="mb-3">
                                <div className="d-flex gap-2">
                                  {formData?.struct?.playground.spinImageUrl && (
                                    <img
                                      src={formData?.struct?.playground.spinImageUrl}
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
                                        "spin-wheel-middle",
                                        formData?.id
                                      )
                                    }
                                  >
                                    {formData?.struct?.playground.spinImageUrl
                                      ? "Change"
                                      : "Upload"}
                                  </button>
                                  {formData?.struct?.playground.spinImageUrl && (
                                    <button
                                      className="button button-secondary px-3 border-0 text-muted"
                                      onClick={() => handleDeleteImage(formData.id)}
                                    >
                                      <i class="fa-solid fa-trash"></i>
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="">
                            <label className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                              Animation time (sec)
                            </label>
                            {/* <input
                          type="number"
                          class="form-control theme-control"
                          id="questName"
                          maxlength="60"
                          defaultValue={
                            formData?.struct?.playground?.animationDuration
                          }
                          onChange={(e) => handleAnimationTimer(e.target.value)}
                          required
                        /> */}
                            <input
                              type="number"
                              className="form-control theme-control"
                              {...register("animationDuration")}
                              onChange={(e) => handleAnimationTimer(e.target.value)}
                              placeholder="Enter time"
                              maxLength="60"
                            />
                            {errors.animationDuration && <p className="text-danger">{errors.animationDuration.message}</p>}
                          </div>

                          <label className="mt-3 d-flex align-items-center gap-2 font-sm fw-medium mb-0">
                            <input
                              type="checkbox"
                              className="form-check-input theme-control m-0"
                              role="button"
                              {...register("isShowCover")}
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
                                  Header
                                </label>
                                <input
                                  type="text"
                                  class="form-control theme-control"
                                  id="questName"
                                  {...register("coverHeader")}
                                  maxlength="60"
                                  defaultValue={
                                    formData?.struct?.playground?.coverHeader
                                  }
                                  onChange={(e) =>
                                    handleChangeheadertext(e.target.value)
                                  }
                                  required
                                />
                                {errors.coverHeader && <p className="text-danger">{errors.coverHeader.message}</p>}
                              </div>
                              <div className="">
                                <label className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                                  Button text
                                </label>
                                <input
                                  {...register("coverButtonText")}
                                  type="text"
                                  class="form-control theme-control"
                                  id="questName"
                                  maxlength="60"
                                  defaultValue={
                                    formData?.struct?.playground?.coverButtonText
                                  }
                                  onChange={(e) =>
                                    handleChangeheaderButtonText(e.target.value)
                                  }
                                  required
                                />
                                {errors.coverButtonText && <p className="text-danger">{errors.coverButtonText.message}</p>}
                              </div>
                            </div>
                          )}
                        </div>
                      </form>
                    </FormProvider>
                  </div>

                </div>
              </div>
            </div>
            <div className="form-right scrollable-div">
              <h5>Approximate preview</h5>
              <div className={`formPreview cover_modal rankPreview`}>
                <PreviewSpintheWheel data={formData} />

              </div>
            </div>
          </>
        )}
        {console.log(selecteScreen, "selecteScreen")}
        {selecteScreen === "quests" && (
          <SectionsList
            setIsOpenFormModal={setIsOpenFormModal}
            setErrorScreen={setErrorScreen}
            setSubmitFn={(fn) => (formSubmitFnRef.current = fn)}
            // handleNext={(fn) => (handleNext.current = fn)}
            formData={formData}
            questions={formData?.struct?.questions}
            handleChangeImage={handleChangeLogo}
          />
        )}
      </div>

      <ul className="Footer_footer__bMDNk">
        {selecteScreen !== "results" && (
          <li className="Footer_footerItem__yaFNE">
            {selecteScreen !== "quests" && <button className="button button-primary outline px-3" onClick={handleNext}>Next</button>}
          </li>
        )}
        <li className="Footer_footerItem__yaFNE">
          <button
            type="submit"
            onClick={() => handleSubmit(onSubmit)()}
            className="button button-primary px-3 text-decoration-none"
          >
            Save
          </button>
        </li>
      </ul>
      {errorScreen && <div className="StopPanel_modalStop__Msu+K">
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
      </div>}
    </>
  );
}

export default WheeleModal;
