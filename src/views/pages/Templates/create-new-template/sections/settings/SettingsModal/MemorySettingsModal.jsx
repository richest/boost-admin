import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { updateTemplateAction } from "views/pages/Templates/TemplateRedux/actions/drawerAction";
import { generateShortId } from "utils/helpers";
import ResultScreen from "./SettingsComponent/ResultScreen";
import PreviewMemory from "views/pages/Templates/Preview/PreviewBlocks/Memory";
import Pairs from "./SettingsComponent/Pairs";

function MemoryModal({
  selecteScreen,
  setSelectScreen,
  formData,
  handleChangeLogo,
  selectedImage,
  setIsOpenFormModal
}) {
  console.log(selectedImage, "9889898989")
  console.log(formData, "checkfiormdqartasdvja")
  const questsLength = [
    {
      label: "2x2",
      value: "2x2",
    },
    {
      label: "4x4",
      value: "4x4",
    },
    {
      label: "4X2",
      value: "4x2",
    },
    {
      label: "6X4",
      value: "6x4",
    },
  ];

  const dispatch = useDispatch();
  const { templateDetails } = useSelector((state) => state.DrawerReducer);
  const [memoryData, setMemoryData] = useState({})
  const [pairs, setPairs] = useState({})
  const [StartImage, setstartImage] = useState({ imageSrc: formData?.struct?.playground?.cardBackImage })
  const [errors, setErrors] = useState({
    header: false,
    buttonText: false,
    finalResultHeader: false,
    headerWordCount: false,
    buttonTextWordCount: false
  });
  const [errorScreen, setErrorScreen] = useState(false);
  const [triggerNext, setTriggerNext] = useState(false);
  const [finalResult, setfinalResult] = useState({})
  // const handleSelectChange = (e) => {
  //   if (!e?.value || !e.value.includes("x")) return;

  //   const [rows, cols] = e.value.toLowerCase().split("x").map(Number);

  //   if (isNaN(rows) || isNaN(cols)) return;

  //   const totalCards = rows * cols;
  //   const requiredPairs = totalCards;

  //   // build or trim updated pair list
  //   let updatedTileList = [...(formData?.struct?.pairs?.pairList || [])];

  //   if (updatedTileList.length > requiredPairs) {
  //     updatedTileList = updatedTileList.slice(0, requiredPairs);
  //   } else {
  //     for (let i = updatedTileList.length; i < requiredPairs; i++) {
  //       updatedTileList.push({
  //         id: generateShortId(),
  //         description: "",
  //         firstImage: {
  //           src: "https://res.cloudinary.com/dwl5gzbuz/image/upload/v1739271156/Group_3_jl6d69.png",
  //           cardType: "image",
  //         },
  //         secondImage: {
  //           src: "https://res.cloudinary.com/dwl5gzbuz/image/upload/v1739271156/Group_3_jl6d69.png",
  //           cardType: "image",
  //         },
  //       });
  //     }
  //   }

  //   setMemoryData((prev) => ({
  //     ...prev,
  //     cardLayout: {
  //       ...prev?.cardLayout,
  //       label: e.label,
  //       value: e.value,
  //     },
  //   }));

  // };
  console.log(StartImage, "StartImage")
  console.log(errorScreen, "errorScreenu")
  const handleSelectChange = (e) => {
    if (!e?.value || !e.value.includes("x")) return;

    const [rows, cols] = e.value.toLowerCase().split("x").map(Number);

    if (isNaN(rows) || isNaN(cols)) return;

    const totalCards = rows * cols;  // Total number of cards based on layout
    const requiredPairs = totalCards / 2;  // Each pair will use 2 cards, so it's equal to total cards

    // Build or trim updated pair list
    let updatedTileList = [...(formData?.struct?.pairs?.pairList || [])];

    if (updatedTileList.length > requiredPairs) {
      updatedTileList = updatedTileList.slice(0, requiredPairs); // Trim extra pairs
    } else {
      // Add new pairs to meet the required number of pairs
      for (let i = updatedTileList.length; i < requiredPairs; i++) {
        updatedTileList.push({
          id: generateShortId(),  // Generate a new unique id
          description: "",
          firstImage: {
            src: "https://res.cloudinary.com/dwl5gzbuz/image/upload/v1739271156/Group_3_jl6d69.png",
            cardType: "image",
          },
          secondImage: {
            src: "https://res.cloudinary.com/dwl5gzbuz/image/upload/v1739271156/Group_3_jl6d69.png",
            cardType: "image",
          },
        });
      }
    }

    // Update the memory data state with the selected card layout
    setMemoryData((prev) => ({
      ...prev,
      cardLayout: {
        ...prev?.cardLayout,
        label: e.label,
        value: e.value,
      },
    }));

    // Also update the pair list state
    setPairs((prev) => ({
      ...prev,
      pairList: updatedTileList,
    }));
  };

  console.log(memoryData, "sqsqsqsq")
  console.log(pairs, "pairs")

  const handlehangepropertions = (e) => {
    // update local preview state
    setMemoryData((prev) => ({
      ...prev,
      cardProportions: e,
    }));
    console.log(memoryData, "sqsqsqsq")
    // update global template data

  };
  console.log(StartImage, "StartImage")
  const handleIsShowCover = (e) => {
    const newValue = e
    console.log(newValue, "wddwd")
    setMemoryData((prev) => ({
      ...prev,
      isShowCover: newValue
    }))
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
    //               playground: {
    //                 ...block.struct.playground,
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
  const isValidWordCount = (text) => {
    console.log(text, "09485");

    if (typeof text !== 'string') {
      return false;
    }

    const trimmedText = text.trim().replace(/\s+/g, ' ');

    const wordCount = trimmedText.split(' ').length;

    console.log(trimmedText, "trimmed text");
    console.log(wordCount, "word count");


    return wordCount <= 20 && wordCount > 0;
  };
  const validateForm = () => {
    const newErrors = {
      // header: !leadformModel.coverHeader?.trim(),
      // headerWordCount: !isValidWordCount(leadformModel.coverHeader),

      // buttonText: !leadformModel.buttonText, // check if buttonText is empty
      // buttonTextWordCount: !isValidWordCount(leadformModel.buttonText),

      finalResultHeader: !finalResult.header?.trim(),
      finalResultHeaderWordCount: !isValidWordCount(finalResult.header),
    };
    console.log(finalResult, "axaaxaaxaxaax33r3")
    setErrors(newErrors);

    return !newErrors.finalResultHeader && !newErrors?.buttonTextWordCount
  };
  console.log(selecteScreen, "qsqsq")
  const handleNext = async () => {


    if (!validateForm()) {
      setErrorScreen(true);
      return;


    } else {

      setErrorScreen(false);
      setTriggerNext(false);
      if (selecteScreen == "start-screen") {
        setSelectScreen("pairs");
      } else if (selecteScreen == "pairs") {
        console.log("jsajasdjhjdh");
        setSelectScreen("results");
      }
    }

    console.log("Proceed to next step");
  };
  const handleChangeheadertext = (e) => {
    const newvalue = e
    setMemoryData((prev) => ({
      ...prev,
      coverHeader: newvalue
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
    //               playground: {
    //                 ...block.struct.playground,
    //                 coverHeader: e,
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
  console.log(formData?.struct?.
    pairs
    , "chekcformDataokornot")

  useEffect(() => {
    setMemoryData(formData?.struct?.playground)
    setPairs(formData?.struct?.pairs)
    setfinalResult(formData?.struct?.finalScreen)
  }, [formData])

  useEffect(() => {
    if (selectedImage) {
      // setOpen(true);
      // setIsEditMedia(true);
      console.log(selectedImage, "selectedImage090");
      // When selectedImage changes, update the state to reflect the new image
      setstartImage((prev) => ({
        ...prev,
        imageSrc: selectedImage, // Set the selected image
      }));
    }
  }, [selectedImage]);
  console.log(finalResult, "memoryData")
  const handleSaveMemory = () => {
    if (!validateForm()) {
      setErrorScreen(true)
      return;
    } else {
      console.log(pairs, "cjhsdjcbkjsdjksdsds")
      const updatedData = {
        ...templateDetails,
        project_structure: {
          ...templateDetails.project_structure,
          pages: templateDetails.project_structure.pages.map((page) => ({
            ...page,
            blocks: page.blocks.map((block) => {
              if (block.id === formData.id) {
                return {
                  ...block,
                  struct: {
                    ...block.struct,
                    playground: memoryData,
                    pairs: {
                      ...block.struct.pairs,
                      pairList: pairs.pairList
                    },
                    finalScreen: finalResult,
                  },
                };
              }
              return block;
            }),
          })),
        },
      };

      console.log(updatedData, "checkokoritijknjnupdatedData")
      dispatch(updateTemplateAction(updatedData));
      setIsOpenFormModal(false)

    }

    console.log("Memory Data saved to Redux successfully 🚀");
  };
  console.log(pairs, "pairspairspairs")
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
              }


              }
            >
              <i class="fa-solid fa-desktop"></i>
              <p>Playground</p>
            </div>
            <div
              className={`options-settings ${selecteScreen === "pairs" ? "activeTab" : ""}`}
              role="button"
              onClick={() => {
                if (!validateForm()) {
                  setErrorScreen(true);
                  return;
                } else {
                  setSelectScreen("pairs")
                }

              }
              }
            >
              <i class="fa-solid fa-desktop"></i>
              <p>Pairs</p>
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

                            <Select
                              className="theme-select"
                              classNamePrefix="react-select"
                              // defaultValue={
                              //   formData?.struct?.playground?.cardLayout
                              //     ? {
                              //       label:
                              //         formData?.struct?.playground?.cardLayout
                              //           ?.label,
                              //       value:
                              //         formData?.struct?.playground?.cardLayout
                              //           ?.value,
                              //     }
                              //     : null
                              // }
                              value={
                                memoryData?.cardLayout
                                  ? {
                                    label:
                                      memoryData?.cardLayout
                                        ?.label,
                                    value:
                                      memoryData?.cardLayout
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
                              Playing card back
                            </label>
                            <div className="d-flex align-items-start">
                              <div className="mb-3">
                                <div className="d-flex gap-2">
                                  {StartImage?.imageSrc && (
                                    <img
                                      src={
                                        StartImage?.imageSrc
                                      }
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
                                        "playing-card-back",
                                        formData?.id
                                      )
                                    }
                                  >
                                    {StartImage?.imageSrc
                                      ? "Change"
                                      : "Upload"}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">Card proportions</label>
                          <div className="d-flex align-items-start">
                            <button
                              className={`btn btn-propertion ${memoryData?.cardProportions === "1/1" ? "selctedProp" : ""}`}
                              style={{ aspectRatio: '1/1', height: 'unset' }}
                              onClick={() => handlehangepropertions("1/1")}
                            >
                              1:1
                            </button>
                            <button
                              className={`btn btn-propertion ${memoryData?.cardProportions === "5/4" ? "selctedProp" : ""}`}
                              style={{ aspectRatio: '5/4', height: 'unset' }}
                              onClick={() => handlehangepropertions("5/4")}
                            >
                              5:4
                            </button>
                            <button
                              className={`btn btn-propertion ${memoryData?.cardProportions === "4/5" ? "selctedProp" : ""}`}
                              style={{ aspectRatio: '4/5', height: 'unset' }}
                              onClick={() => handlehangepropertions("4/5")}
                            >
                              4:5
                            </button>
                          </div>
                        </div>
                      </div>

                      <label className="mt-3 d-flex align-items-center gap-2 font-sm fw-medium mb-0">
                        <input
                          type="checkbox"
                          className="form-check-input theme-control m-0"
                          role="button"
                          onChange={(e) => handleIsShowCover(e.target.checked)}
                          checked={
                            memoryData?.isShowCover
                          }
                        />
                        <span className="d-flex align-items-center gap-2">
                          Show cover
                        </span>
                      </label>
                      {memoryData?.isShowCover && (
                        <div className="mt-3">
                          <div className="mb-3">
                            <label className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                              Header
                            </label>
                            <input
                              type="text"
                              class="form-control theme-control"
                              id="questName"
                              // maxlength="60"
                              value={
                                memoryData?.coverHeader
                              }
                              onChange={(e) =>
                                handleChangeheadertext(e.target.value)
                              }
                              required
                            />
                          </div>
                          <div className="">
                            <label className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                              Button text
                            </label>
                            <input
                              type="text"
                              class="form-control theme-control"
                              id="questName"
                              maxlength="60"
                              value={
                                memoryData?.coverButtonText
                              }
                              onChange={(e) =>
                                handleChangeheaderButtonText(e.target.value)
                              }
                              required
                            />
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
                <PreviewMemory data={formData} approxvalue={false} memoryData={memoryData}startImage = {StartImage?.imageSrc} />
              </div>
            </div>
          </>
        )}

        {selecteScreen === "pairs" && (
          <Pairs
            setPairs={setPairs}
            pairs={pairs}
            formData={formData}
            questions={formData?.struct?.questions}
            handleChangeLogo={handleChangeLogo}
          />
        )}

        {selecteScreen === "final-screen" && (
          <ResultScreen
            setParentErros={setErrors}
            finalResult={finalResult}
            setfinalResult={setfinalResult}
            setTriggerNext={setTriggerNext}
            setErrorScreen={setErrorScreen}
            parenterror={errors}
            formData={formData}
            questions={formData?.struct?.questions}
            handleChangeImage={handleChangeLogo}
          />
        )}
      </div>
      <ul className="Footer_footer__bMDNk">
        {selecteScreen !== "final-screen" && (
          <li className="Footer_footerItem__yaFNE">
            <button className="button button-primary outline px-3" onClick={handleNext}>Next</button>
          </li>
        )}
        <li className="Footer_footerItem__yaFNE">
          <button
            onClick={handleSaveMemory}
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
                  // setTriggerNext(false);
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

export default MemoryModal;
