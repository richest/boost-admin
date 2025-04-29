import React, { useEffect, useState } from "react";
import ResultScreen from "./SettingsComponent/ResultScreen";
import MatchUpPairs from "./SettingsComponent/MatchUpPairs";
import { updateTemplateAction } from "views/pages/Templates/TemplateRedux/actions/drawerAction";
import { useDispatch, useSelector } from "react-redux";

function MatchUpModal({
  selecteScreen,
  setSelectScreen,
  formData,
  handleChangeLogo, setIsOpenFormModal, onRegisterSlideImageCallback }) {
  const { templateDetails } = useSelector((state) => state.DrawerReducer);
  const [pairData, setPairData] = useState({
    isLargeCards: false,
    pairList: [],
  })
  const [finalResult, setfinalResult] = useState({})
  const [errorScreen, setErrorScreen] = useState(false);
  const [triggerNext, setTriggerNext] = useState(false);
  const [errors, setErrors] = useState({

    finalResultHeader: false,

  });
  console.log(errors, "errorserrors")
  const dispatch = useDispatch();
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
  console.log(finalResult, "finalResultfinalResult")
  const validateForm = () => {
    const newErrors = {
      // header: !leadformModel.coverHeader?.trim(),
      // headerWordCount: !isValidWordCount(leadformModel.coverHeader),

      // buttonText: !leadformModel.buttonText, // check if buttonText is empty
      // buttonTextWordCount: !isValidWordCount(leadformModel.buttonText),

      finalResultHeader: !finalResult.header?.trim(),
      // finalResultHeaderWordCount: !isValidWordCount(finalResult.headerText),
    };

    setErrors(newErrors);

    return !newErrors.finalResultHeader;
  };

  console.log(formData, "formData")

  console.log(errors, "sSSSSS")
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
      
      // else if (selecteScreen == "quests")
      //    {
      //   console.log("jsajasdjhjdh");
      //   setSelectScreen("treasureMap");
      // }
    }

    console.log("Proceed to next step");
  };
  const handleSaveMatchUp = () => {
    if (!validateForm()) {
      setErrorScreen(true)
      console.log("Validation failed");
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
                  pairs: pairData, // ✅ updated pair list
                  finalScreen: finalResult, // ✅ final result screen
                },
              }
              : block
          ),
        })),
      },
    };

    console.log(updatedData, "✅ Updated data with pairData and finalResult");
    dispatch(updateTemplateAction(updatedData));
    setIsOpenFormModal(false);
  };

  const handleMatchImageChange = (image, slideId) => {
    console.log(image, "slideId", slideId)
    setfinalResult((prev) => ({
      ...prev,
      imageSrc: image
    }));
  };
  const handleDeleteImageResultForm = (image, slideId) => {
    console.log(image, "slideId", slideId)
    setfinalResult((prev) => ({
      ...prev,
      imageSrc: ""
    }));
  };


  console.log(formData?.struct?.finalScreen
    , "oioioioio")
  useEffect(() => {
    if (formData) {

      setfinalResult(formData?.struct?.finalScreen
      )

    }
  }, [formData]);
  useEffect(() => {
    if (onRegisterSlideImageCallback) {
      onRegisterSlideImageCallback(handleMatchImageChange);
    }
  }, []);
  useEffect(() => {
    if (formData?.struct?.pairs) {
      setPairData(formData.struct.pairs);
    }
  }, [formData]);
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
              <p>`Final` screen</p>
            </div>
          </div>
        </div>

        {selecteScreen === "start-screen" && (
          <MatchUpPairs
            setPairData={setPairData}
            pairData={pairData}
            selecteScreen={selecteScreen}
            formData={formData}
            questions={formData?.struct?.questions}
            handleChangeLogo={handleChangeLogo}
          />
        )}
        {selecteScreen === "final-screen" && (
          <ResultScreen
            handleDeleteImageResultForm={handleDeleteImageResultForm}
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
            onClick={handleSaveMatchUp}
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

export default MatchUpModal;
