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

function RankBattleModal({
  selecteScreen,
  setSelectScreen,
  formData,
  handleChangeLogo,
}) {
  const [leading, setLeading] = useState({
    left: false,
    right: false,
  });
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
      label: "2",
      value: 2,
    },
    {
      label: "3",
      value: 3,
    },
    {
      label: "4",
      value: 4,
    },
  ];

  const dispatch = useDispatch();
  const { templateDetails } = useSelector((state) => state.DrawerReducer);

  const handleSelectChange = (e) => {
    let updatedTileList = [...(formData?.struct?.cards || [])];

    const requiredLength = parseInt(e.value, 10);

    if (updatedTileList.length > requiredLength) {
      updatedTileList = updatedTileList.slice(0, requiredLength);
    } else {
      for (let i = updatedTileList.length; i < requiredLength; i++) {
        updatedTileList.push({
          id: generateShortId(),
          imageUrl: "",
          description: "",
          text: `Card ${i + 1}`,
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
                  cards: updatedTileList,
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
                    cardType: e,
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

  console.log(formData?.struct, "cehchccchformdTAaa");
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
            <p>Layout</p>
          </div>
          <div
            className={`options-settings ${selecteScreen === "quests" ? "activeTab" : ""}`}
            role="button"
            onClick={() => setSelectScreen("quests")}
          >
            <i class="fa-solid fa-circle-question"></i>
            <p>Cards</p>
          </div>
        </div>
      </div>

      {selecteScreen === "start-screen" && (
        <>
          <div className="form-left border-end">
            <div className="fields-output">
              <label class="toggle-container mb-4">Layout</label>
              <div className={`formFieldsList`}>
                <div className="additionalInfo">
                  <div className="fields_info">
                    <div className="row g-3 mb-3">
                      <div className="col-md-6">
                        <div className="">
                          <label className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">No of cards</label>
                          {console.log(formData
                            , "ioioii")}
                          <Select
                            defaultValue={
                              formData?.struct?.playground?.cardsCount
                                ? questsLength.find(
                                  (opt) =>
                                    opt.value === formData?.struct?.playground?.cardsCount
                                )
                                : null
                            }
                            className="theme-select"
                            classNamePrefix="react-select"
                            options={questsLength}
                            onChange={(selected) =>
                              handleSelectChange(selected)
                            }
                            placeholder="no of cards"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="cardTypesection">
                          <label className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">Card type</label>
                          <div className="button___cardTYPE d-flex gap-2">
                            <button
                              className={`btn selectypebutton w-100 ${formData?.struct?.playground.cardType === "IMAGE" ? "selected primary-text" : ""}`}
                              onClick={() => handleChangeTextImage("IMAGE")}
                            >
                              <i class="fa-solid fa-image"></i> Image
                            </button>
                            <button
                              className={`btn selectypebutton w-100 ${formData?.struct?.playground.cardType === "TEXT" ? "selected primary-text" : ""}`}
                              onClick={() => handleChangeTextImage("TEXT")}
                            >
                              <i class="fa-solid fa-pen-to-square"></i> Text
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">Card proportions</label>
                      <div className="d-flex align-items-start">
                        <button
                          className={`btn btn-propertion ${formData?.struct?.playground?.cardProportions === "1/1" ? "selctedProp" : ""}`}
                          style={{ aspectRatio: '1/1', height: 'unset' }}
                          onClick={() => handlehangepropertions("1/1")}
                        >
                          1:1
                        </button>
                        <button
                          className={`btn btn-propertion ${formData?.struct?.playground?.cardProportions === "5/4" ? "selctedProp" : ""}`}
                          style={{ aspectRatio: '5/4', height: 'unset' }}
                          onClick={() => handlehangepropertions("5/4")}
                        >
                          5:4
                        </button>
                        <button
                          className={`btn btn-propertion ${formData?.struct?.playground?.cardProportions === "4/5" ? "selctedProp" : ""}`}
                          style={{ aspectRatio: '4/5', height: 'unset' }}
                          onClick={() => handlehangepropertions("4/5")}
                        >
                          4:5
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="form-right scrollable-div">
            <h5>Approximate preview</h5>
            <div className={`formPreview cover_modal rankPreview`}>
              <RankBattlePreview data={formData} />
            </div>
          </div>
        </>
      )}

      {selecteScreen === "quests" && (
        <CardsRank
          formData={formData}
          questions={formData?.struct?.questions}
          handleChangeImage={handleChangeLogo}
        />
      )}
    </div>
  );
}

export default RankBattleModal;
