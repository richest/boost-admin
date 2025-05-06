import React, { useEffect, useState } from "react";
import QuestionsScreen from "./SettingsComponent/QuestionsScreen";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { updateTemplateAction } from "views/pages/Templates/TemplateRedux/actions/drawerAction";
import { generateShortId } from "utils/helpers";
import Quests from "./SettingsComponent/Quests";
import ResultScreen from "./SettingsComponent/ResultScreen";

function TreasureHuntModal({
  selecteScreen,
  setSelectScreen,
  formData,
  handleChangeLogo,
  setIsOpenFormModal,
  selectedImage
}) {
  const questsLength = [
    {
      label: "1 quest(s)",
      value: "1",
    },
    {
      label: "4 quest(s)",
      value: "4",
    },
    {
      label: "6 quest(s)",
      value: "6",
    },
    {
      label: "9 quest(s)",
      value: "9",
    },
  ];
  const [treasurepairs, settreasuretiles] = useState({
    tileList: [],
  });

  const [treasurePlayground, settreasurePlayground] = useState({})
  const [errors, setErrors] = useState({
    header: false,
    buttonText: false,
    finalResultHeader: false,
    headerWordCount: false,
    buttonTextWordCount: false
  });
  const [finalResult, setfinalResult] = useState({})
  const [selectedImageType, setSelectedImageType] = useState({ type: "" });
  const [errorScreen, setErrorScreen] = useState(false);
  const [triggerNext, setTriggerNext] = useState(false);
  console.log(treasurePlayground, "treasurePlayground")
  const dispatch = useDispatch();
  const { templateDetails } = useSelector((state) => state.DrawerReducer);
  console.log(finalResult, "treasurePlaygroundtreasurePlayground")
  const handleSelectChange = (e) => {
    try {
      console.log("Select change triggered", e);

      const value = e?.value;
      let rows, cols;

      // Check if the value contains "x" (e.g., "2x2", "4x4")
      if (value.includes("x")) {
        [rows, cols] = value.split("x").map(Number);
      } else {
        // If it's a numeric value (e.g., "1", "4", "6", "9")
        switch (value) {
          case "1":
            rows = 1;
            cols = 1;
            break;
          case "4":
            rows = 2;
            cols = 2;
            break;
          case "6":
            rows = 2;
            cols = 3;
            break;
          case "9":
            rows = 3;
            cols = 3;
            break; // This was missing earlier, so ensure we correctly set rows and cols for "9"
          default:
            return; // If the value is unrecognized, do nothing
        }
      }

      // Ensure rows and cols are valid numbers
      if (isNaN(rows) || isNaN(cols)) return;

      const totalCards = rows * cols;  // Total number of cards based on layout
      const requiredPairs = totalCards;  // Total cards (since each card is a pair)

      // Update the layout state
      settreasurePlayground((prev) => ({
        ...prev,
        layout: {
          label: e.label,
          value: e.value,
          rows,
          cols,
        },
      }));

      // Build or trim the updated tile list based on total cards
      let updatedTileList = [...(treasurepairs?.tileList || [])];

      if (updatedTileList.length > requiredPairs) {
        updatedTileList = updatedTileList.slice(0, requiredPairs); // Trim extra pairs
      } else {
        // Add new pairs to meet the required number of pairs
        for (let i = updatedTileList.length; i < requiredPairs; i++) {
          updatedTileList.push({
            id: generateShortId(),
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

      // Update the tiles state with the new tile list
      settreasuretiles((prev) => ({
        ...prev,
        tileList: updatedTileList,
      }));

      // Log for debugging
      console.log("Updated layout:", { rows, cols });
      console.log("Updated tile list:", updatedTileList);

    } catch (error) {
      // Catch and log any errors
      console.error("Error in handleSelectChange:", error);
    }
  };


  console.log(treasurepairs, "treasurepairstreasurepairs")

  console.log(treasurePlayground, "treasurepairs")


  const handlehangepropertions = (e) => {
    // update local preview state
    settreasurePlayground((prev) => ({
      ...prev,
      cardProportions: e,
    }));
    console.log(memoryData, "sqsqsqsq")
    // update global template data

  };

  const handleShowQuestCover = (e) => {
    // ✅ update local playground state
    settreasurePlayground((prev) => ({
      ...prev,
      isShowQuestCover: e,
    }));
  };
  const handleSelectPosition = (e) => {
    console.log(e, "checkposition");
    settreasurePlayground((prev) => ({
      ...prev,
      coverPosition: e,
    }));
  };


  console.log(selecteScreen, "checkacrelkrnl");
  const validateForm = () => {
    const newErrors = {
      // header: !leadformModel.coverHeader?.trim(),
      // headerWordCount: !isValidWordCount(leadformModel.coverHeader),

      // buttonText: !leadformModel.buttonText, // check if buttonText is empty
      // buttonTextWordCount: !isValidWordCount(leadformModel.buttonText),

      finalResultHeader: !finalResult.header?.trim(),
      finalResultHeaderWordCount: !isValidWordCount(finalResult.header),
    };

    setErrors(newErrors);
    return !newErrors.header && !newErrors.buttonText && !newErrors.finalResultHeader &&
      !newErrors.headerWordCount && !newErrors.buttonTextWordCount && !newErrors.finalResultHeaderWordCount;
  };

  console.log(errors, "opwidopio")


  const isValidWordCount = (text) => {
    console.log(text, "09485");

    if (typeof text !== 'string') {
      return false;  // Return false if the text is not a string
    }

    const trimmedText = text.trim().replace(/\s+/g, ' ');

    // Split the text into an array of words
    const wordCount = trimmedText.split(' ').length;

    console.log(trimmedText, "trimmed text");  // Debug the trimmed text
    console.log(wordCount, "word count"); // Log the word count to verify

    return wordCount <= 20 && wordCount > 0;  // Ensure that word count is greater than 0
  };
  useEffect(() => {
    console.log(formData, "Form Data");

    if (formData?.struct?.playground) {
      settreasurePlayground(formData?.struct?.playground);
    }

    if (formData?.struct?.tiles) {
      console.log("IYIYYIY")
      settreasuretiles(formData?.struct?.tiles);
    }
    if (formData?.struct?.finalScreen) {
      setfinalResult(formData.struct.finalScreen); // ✅ probably intended
    }

  }, [formData]);  // Re-run when formData changes

  useEffect(() => {
    console.log(treasurePlayground, "Updated treasurePlayground");
  }, [treasurePlayground]);
  useEffect(() => {
    console.log("Updated treasuretiles:", treasurepairs);
  }, [treasurepairs]);
  // const handleSaveTreasureHunt = () => {
  //   console.log("object")
  // }
  console.log(selecteScreen, "sjkdopj")
  const handleNext = async () => {


    if (!validateForm()) {
      setErrorScreen(true);
      return;


    } else {

      setErrorScreen(false);
      setTriggerNext(false);
      if (selecteScreen == "start-screen") {
        setSelectScreen("quests");
      } else if (selecteScreen == "quests") {
        console.log("jsajasdjhjdh");
        setSelectScreen("treasureMap");
      }
    }

    console.log("Proceed to next step");
  };
  const handleSaveTreasureHunt = () => {

    console.log("Saving treasure hunt...");
    if (!validateForm()) {
      setErrorScreen(true);
      return;
    } else {
      console.log("in eklseeee")
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
                      ...treasurePlayground, // <-- merge updated playground
                    },
                    tiles: {
                      ...block.struct.tiles
                      ,
                      ...treasurepairs, // <-- merge updated tileList
                    },
                    // form: {
                    //   ...block.struct.form,
                    //   ...leadformModel,
                    // },
                    finalScreen: {
                      ...block.struct.final,
                      ...finalResult,
                    },
                  },
                }
                : block
            ),
          })),
        },
      };

      console.log("Dispatching updated data", updatedData);
      dispatch(updateTemplateAction(updatedData));
      setIsOpenFormModal(false);
    }
  };
  useEffect(() => {
    if (!treasurePlayground?.layout && questsLength?.[0]) {
      settreasurePlayground((prev) => ({
        ...prev,
        layout: {
          label: questsLength[0].label,
          value: questsLength[0].value,
          rows: 2, // or extract from value like "2x2"
          cols: 2,
        },
      }));
    }
  }, []);
  useEffect(() => {
    if (!selectedImage || !selectedImageType) return;

    const { type, questionID } = selectedImageType;

    if (type === "finalTreasureHunt") {
      console.log("jiowjhdfiwheufyuey");
      setfinalResult((prev) => ({
        ...prev,
        imageSrc: selectedImage
      }));
    }

    if (questionID) {
      settreasuretiles((prev) => {
        const updatedTileList = prev.tileList.map((tile) => {
          if (tile.id === questionID) {
            if (type === "questHeader") {
              console.log("RREREREREREREREEER");
              return { ...tile, headerImgSrc: selectedImage };
            } else if (type === "quest-overlay") {
              console.log("HIIIIIIIIIIIIIIIIIIIII*&u");
              return { ...tile, overlaySrc: selectedImage };
            }
          }
          return tile;
        });

        return { ...prev, tileList: updatedTileList };
      });
    }

    // setSelectedImageType(null);
  }, [selectedImage]);

  // useEffect(() => {
  //   if (selectedImage) {
  //     if (selectedImageType === "questHeader") {
  //       settreasuretiles((prev) => ({ ...prev, imageSrc: selectedImage }));
  //     } else if (selectedImageType === "final") {
  //       setfinalResult((prev) => ({ ...prev, imageSrc: selectedImage }));
  //     }

  //     setSelectedImageType(null);
  //   }
  // }, [selectedImage]);
  console.log(finalResult, "opwefoifwur932r78")
  useEffect(() => {
    if (!selectedImage || !selectedImageType) return;

    const { type, questionID } = selectedImageType;

    if (["first-image", "second-image", "first-audio", "second-audio"].includes(type)) {
      const imageField = type.startsWith("first") ? "firstImage" : "secondImage";
      const mediaType = type.endsWith("audio") ? "audio" : "image";

      setPairs((prev) => {
        const updatedPairList = prev.pairList.map((pair) => {
          if (pair.id === questionID) {
            return {
              ...pair,
              [imageField]: {
                ...pair[imageField],
                src: selectedImage,
                cardType: mediaType,
              },
            };
          }
          return pair;
        });

        return {
          ...prev,
          pairList: updatedPairList,
        };
      });

      // setSelectedImageType(null);
    }


  }, [selectedImage]);

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
              <p>PLayground</p>
            </div>
            <div
              className={`options-settings ${selecteScreen === "quests" ? "activeTab" : ""}`}
              role="button"
              onClick={() => {
                if (!validateForm()) {
                  setErrorScreen(true);
                  return;
                } else {
                  setSelectScreen("quests")
                }
              }


              }
            >
              <i class="fa-solid fa-circle-question"></i>
              <p>Quests</p>
            </div>
            <div
              className={`options-settings ${selecteScreen === "treasureMap" ? "activeTab" : ""}`}
              role="button"
              onClick={() => {
                if (!validateForm()) {
                  setErrorScreen(true);
                  return;
                } else {
                  setSelectScreen("treasureMap")
                }
              }


              }
            >
              <i class="fa-solid fa-square-poll-horizontal"></i>
              <p>Treasure map</p>
            </div>
          </div>
        </div>

        {selecteScreen === "start-screen" && (
          <>
            <div className="form-left border-end">
              <div className="fields-output">
                <label class="toggle-container mb-4">PlayGround</label>
                <div className={`formFieldsList`}>
                  <div className="additionalInfo">
                    <div className="fields_info">

                      <div className="mb-3">
                        <label htmlFor="" className="form-label font-sm fw-medium d-flex align-items-center cursor-pointer">Layout</label>
                        {console.log(treasurePlayground?.layout, "opioo")}
                        <Select
                          className="theme-select"
                          classNamePrefix="react-select"
                          defaultValue={
                            treasurePlayground?.layout
                              ? {
                                label:
                                  treasurePlayground.layout.label,
                                value:
                                  treasurePlayground.layout.value,
                              }
                              : null
                          }
                          options={questsLength}
                          onChange={(selected) =>
                            handleSelectChange(selected)
                          }
                          placeholder="Select input type"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="" className="form-label font-sm fw-medium d-flex align-items-center cursor-pointer">Card proportions</label>
                        <div className="d-flex align-items-start">
                          <button
                            className={`btn btn-propertion ${treasurePlayground?.cardProportions === "1/1" ? "selctedProp" : ""}`}
                            onClick={() => handlehangepropertions("1/1")}
                            style={{ height: 'unset', aspectRatio: '1/1' }}
                          >
                            1:1
                          </button>
                          <button
                            className={`btn btn-propertion ${treasurePlayground?.cardProportions === "5/4" ? "selctedProp" : ""}`}
                            onClick={() => handlehangepropertions("5/4")}
                            style={{ height: 'unset', aspectRatio: '5/4' }}
                          >
                            5:4
                          </button>
                          <button
                            className={`btn btn-propertion ${treasurePlayground?.cardProportions === "4/5" ? "selctedProp" : ""}`}
                            onClick={() => handlehangepropertions("4/5")}
                            style={{ height: 'unset', aspectRatio: '4/5' }}
                          >
                            4:5
                          </button>
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="d-flex align-items-center gap-2" role="button">
                          <input
                            id="showQuest"
                            type="checkbox"
                            defaultChecked={
                              treasurePlayground?.isShowQuestCover
                            }
                            onChange={(e) =>
                              handleShowQuestCover(e.target.checked)
                            }
                          />
                          <label htmlFor="showQuest" className="user-select-none form-label font-sm fw-medium d-flex align-items-center mb-0 cursor-pointer">
                            Show quest name on the cover
                          </label>
                        </div>
                      </div>

                      <div className="mb-4">
                        <label htmlFor="" className="form-label font-sm fw-medium d-flex align-items-center cursor-pointer">Text and button position</label>
                        <div className="d-flex align-items-center gap-3">
                          <div className="d-flex align-items-center gap-1">
                            <input
                              id="radio-center"
                              type="radio"
                              name="coverPosition"
                              defaultChecked={
                                treasurePlayground?.coverPosition ===
                                "center"
                              }
                              onChange={() => handleSelectPosition("center")}
                            />
                            <label htmlFor="radio-center form-label font-sm fw-medium d-flex align-items-center cursor-pointer mb-0">Center</label>
                          </div>
                          <div className="d-flex align-items-center gap-1">
                            <input
                              id="radio-bottom"
                              type="radio"
                              name="coverPosition"
                              defaultChecked={
                                treasurePlayground?.coverPosition ===
                                "bottom"
                              }
                              onChange={() => handleSelectPosition("bottom")}
                            />
                            <label htmlFor="radio-bottom form-label font-sm fw-medium d-flex align-items-center cursor-pointer mb-0">Bottom</label>
                          </div>
                        </div>
                      </div>
                      <label className="form-label font-sm w-100" role="button">
                        <p></p>

                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-right">
              <h5>Approximate preview</h5>
              <div className={`formPreview cover_modal p-0 bg-transparent shadow-none`}>
                <div className="treauseHunt ">
                  <div className="">
                    <div className="d-flex align-items-center justify-content-center">
                      <div className="w-100">
                        {console.log(treasurePlayground, treasurepairs, "11111111111111111")}
                        <div
                          className="treasure-hunt__tiles"
                          style={{
                            display: "grid",
                            gridTemplateColumns: `repeat(${treasurePlayground?.layout?.cols}, 1fr)`,
                            gridTemplateRows: `repeat(${treasurePlayground?.layout?.rows}, 1fr)`,
                            // gap: 15,
                          }}
                        >
                          {console.log(treasurepairs?.tileList, "sqqsqsqqqs0")}
                          {treasurepairs?.tileList?.map(
                            (item, index) => (
                              <div
                                key={`${item?.id}`}
                                className="treasure-hunt__tile-wrapper_wiheowibd"
                              >
                                <div className="outer-img">
                                  <img
                                    src={
                                      item.image ||
                                      "https://res.cloudinary.com/dwl5gzbuz/image/upload/v1738148606/project-thumb_laxubz.png"
                                    }
                                    alt="img"
                                    style={{
                                      aspectRatio: `${treasurePlayground?.cardProportions}`,
                                      objectFit: "cover",
                                    }}
                                  />

                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="#20a2b8"
                                  >
                                    <path d="M19 10H20C20.5523 10 21 10.4477 21 11V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V11C3 10.4477 3.44772 10 4 10H5V9C5 5.13401 8.13401 2 12 2C15.866 2 19 5.13401 19 9V10ZM17 10V9C17 6.23858 14.7614 4 12 4C9.23858 4 7 6.23858 7 9V10H17ZM11 14V18H13V14H11Z"></path>
                                  </svg>
                                  <div
                                    className={`middleContent  ${treasurePlayground?.coverPosition === "center" ? "justify-content-center" : "justify-content-end"} `}
                                  >
                                    {treasurePlayground
                                      ?.isShowQuestCover && <p>{item?.quest}</p>}
                                    <button onClick={() => handleOpenModal(item)}>
                                      Open
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {selecteScreen === "quests" && (
          <Quests
            setSelectedImageType={setSelectedImageType}
            settreasuretiles={settreasuretiles}
            treasurepairs={treasurepairs}
            formData={formData}
            questions={formData?.struct?.questions}
            handleChangeImage={handleChangeLogo}
          />
        )}
        {selecteScreen === "treasureMap" && (
          <ResultScreen
            setSelectedImageType={setSelectedImageType}
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

      </div>
      {console.log(selecteScreen, "44444444")}
      <ul className="Footer_footer__bMDNk">
        {selecteScreen !== "treasureMap" && (
          <li className="Footer_footerItem__yaFNE">
            <button className="button button-primary outline px-3" onClick={handleNext}>Next</button>
          </li>
        )}
        <li className="Footer_footerItem__yaFNE">
          <button
            onClick={() => {
              // Update state
              handleSaveTreasureHunt(); // Call the save function
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
      )}
    </>
  );
}

export default TreasureHuntModal;
