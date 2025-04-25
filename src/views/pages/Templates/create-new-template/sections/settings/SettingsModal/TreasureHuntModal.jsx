import React from "react";
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

  const dispatch = useDispatch();
  const { templateDetails } = useSelector((state) => state.DrawerReducer);

  const handleSelectChange = (e) => {
    let cols, rows;
    let updatedTileList = [...(formData?.struct?.tiles?.tileList || [])];

    if (e.value === "1") {
      cols = 1;
      rows = 1;
    } else if (e.value === "4") {
      cols = 2;
      rows = 2;
    } else if (e.value === "6") {
      cols = 3;
      rows = 2;
    } else if (e.value === "9") {
      cols = 3;
      rows = 3;
    }

    const requiredLength = parseInt(e.value, 10);

    if (updatedTileList.length > requiredLength) {
      updatedTileList = updatedTileList.slice(0, requiredLength);
    } else {
      for (let i = updatedTileList.length; i < requiredLength; i++) {
        updatedTileList.push({
          id: generateShortId(),
          quest: `Quest ${i + 1}`,
          password: `Correct Answer ${i + 1}`,
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
                  tiles: {
                    ...block.struct.tiles,
                    tileList: updatedTileList, // Maintain old data while updating the list
                  },
                  playground: {
                    ...block.struct.playground,
                    layout: {
                      ...block.struct.playground.layout,
                      cols: cols,
                      rows: rows,
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
  const handleShowQuestCover = (e) => {
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
                    isShowQuestCover: e,
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

  const handleSelectPosition = (e) => {
    console.log(e, "checkposition");
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
                    coverPosition: e,
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
  console.log(selecteScreen, "checkacrelkrnl");
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
            <p>PLayground</p>
          </div>
          <div
            className={`options-settings ${selecteScreen === "quests" ? "activeTab" : ""}`}
            role="button"
            onClick={() => setSelectScreen("quests")}
          >
            <i class="fa-solid fa-circle-question"></i>
            <p>Quests</p>
          </div>
          <div
            className={`options-settings ${selecteScreen === "treasureMap" ? "activeTab" : ""}`}
            role="button"
            onClick={() => setSelectScreen("treasureMap")}
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
                      <Select
                      className="theme-select"
                          classNamePrefix="react-select"
                        defaultValue={
                          formData?.struct?.playground?.layout
                            ? {
                              label:
                                formData.struct.playground.layout.label,
                              value:
                                formData.struct.playground.layout.value,
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
                          className={`btn btn-propertion ${formData?.struct?.playground?.cardProportions === "1/1" ? "selctedProp" : ""}`}
                          onClick={() => handlehangepropertions("1/1")}
                          style={{ height: 'unset', aspectRatio: '1/1' }}
                        >
                          1:1
                        </button>
                        <button
                          className={`btn btn-propertion ${formData?.struct?.playground?.cardProportions === "5/4" ? "selctedProp" : ""}`}
                          onClick={() => handlehangepropertions("5/4")}
                          style={{ height: 'unset', aspectRatio: '5/4' }}
                        >
                          5:4
                        </button>
                        <button
                          className={`btn btn-propertion ${formData?.struct?.playground?.cardProportions === "4/5" ? "selctedProp" : ""}`}
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
                            formData?.struct?.playground?.isShowQuestCover
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
                              formData?.struct?.playground?.coverPosition ===
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
                              formData?.struct?.playground?.coverPosition ===
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
                      <div
                        className="treasure-hunt__tiles"
                        style={{
                          display: "grid",
                          gridTemplateColumns: `repeat(${formData?.struct?.playground?.layout?.cols}, 1fr)`,
                          gridTemplateRows: `repeat(${formData?.struct?.playground?.layout?.rows}, 1fr)`,
                          // gap: 15,
                        }}
                      >
                        {formData?.struct?.tiles?.tileList?.map(
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
                                    aspectRatio: `${formData?.struct?.playground?.cardProportions}`,
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
                                  className={`middleContent  ${formData?.struct?.playground?.coverPosition === "center" ? "justify-content-center" : "justify-content-end"} `}
                                >
                                  {formData?.struct?.playground
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
          formData={formData}
          questions={formData?.struct?.questions}
          handleChangeImage={handleChangeLogo}
        />
      )}
      {/* {selecteScreen === "treasureMap" && (
        <ResultScreen
          formData={formData}
          handleChangeImage={handleChangeLogo}
        />
      )} */}
    </div>
  );
}

export default TreasureHuntModal;
