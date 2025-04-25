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
  const handleSaveMatchUp = () => {
    if (!validateForm()) {
      console.log("oioiooiooi")
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
                  // finalScreen

                  struct: {
                    ...block.struct,
                    pairs: pairData,
                  },
                  struct: {
                    ...block.struct,
                    finalScreen: finalResult,
                  },
                }
                : block
            ),
          })),
        },
      };
      dispatch(updateTemplateAction(updatedData));
      setIsOpenFormModal(false)
    }

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
              onClick={() => setSelectScreen("start-screen")}
            >
              <i class="fa-solid fa-desktop"></i>
              <p>Pairs</p>
            </div>
            <div
              className={`options-settings ${selecteScreen === "final-screen" ? "activeTab" : ""}`}
              role="button"
              onClick={() => setSelectScreen("final-screen")}
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

        <li className="Footer_footerItem__yaFNE">
          <button
            onClick={handleSaveMatchUp}
            className="button button-primary px-3 text-decoration-none"
          >
            Save
          </button>
        </li>
      </ul>

    </>
  );
}

export default MatchUpModal;
