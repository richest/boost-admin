import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function TreasureHuntPrevieww({
  data,
  isSelected,
  handleSelectBlock,
  handleDeleteBlock,
  handleEditModal,
}) {
  const { templateDetails } = useSelector((state) => state.DrawerReducer);
  console.log(
    templateDetails?.project_structure?.app?.maxWidth,
    "checkquizdsdsdsdsddatatatat"
  );

  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState({});
  const [answerValue, setAnswerValue] = useState("");
  const [correctAnswerIds, setCorrectAnswerIds] = useState([]);
  const [wrongAns, setWrongAns] = useState(false);
  const value = data?.struct?.playground?.cardProportions;

  const [value1, value2] = value?.split("/");
  const handleOpenModal = (item) => {
    setShowQuestionModal(true);
    setSelectedQuestion(item);
    console.log(item, "checkdkdksdksndjklhbdkbd");
  };

  const handleCloseModal = () => {
    setShowQuestionModal(false);
    setAnswerValue("");
  };

  const handleUnlock = () => {
    if (answerValue !== "") {
      if (answerValue === selectedQuestion?.password) {
        setCorrectAnswerIds((prev) => [...prev, selectedQuestion?.id]);
        setShowQuestionModal(false);
        setAnswerValue("");
      }
      if (answerValue !== selectedQuestion?.password) {
        setWrongAns(true);
      }
    }
  };

  useEffect(() => {
    setWrongAns(false);
  }, [answerValue]);

  console.log(
    templateDetails?.project_structure?.pages[0]?.blocks[3]?.struct?.tiles
      ?.tileList.length === 6
      ? 2
      : data?.struct?.playground?.layout?.rows,
    "valyuesadsa"
  );
  return (
    <div
      style={{ fontSize: "unset" }}
      className={isSelected ? "block-builder selected" : "block-builder"}
    >
      <div className=" game_mainParent">
        <div className="treauseHunt ">
          <div className="">
            <div className="d-flex align-items-center justify-content-center">
              <div className="w-100">
                <div
                  className="treasure-hunt__tiles"
                  style={{
                    display: "flex",
                    // gridTemplateColumns: `repeat(${data?.struct?.playground?.layout?.cols}, 1fr)`,
                    // gridTemplateRows: `repeat(${data?.struct?.playground?.layout?.rows}, 1fr)`,
                    // gap: 2,
                  }}
                >
                  {correctAnswerIds.length ===
                  data?.struct?.tiles?.tileList?.length ? (
                    <div className="col-12">
                      <img
                        className="h-100 w-100"
                        src={data?.struct?.finalScreen?.imageSrc}
                        alt="img"
                      />
                      <div className="result__screen_Text">
                        <h2 className="text-center">
                          {data?.struct?.finalScreen?.header}
                        </h2>
                        <p> {data?.struct?.finalScreen?.description}</p>
                      </div>
                    </div>
                  ) : (
                    data?.struct?.tiles?.tileList?.map((item, index) =>
                      correctAnswerIds.includes(item?.id) ? (
                        <div
                          key={`${item?.id}`}
                          style={{
                            padding: 4,
                            width: `${templateDetails?.project_structure?.app?.maxWidth / data?.struct?.playground?.layout?.cols}px`,
                            height: `${(value2 * templateDetails?.project_structure?.app?.maxWidth) / value1 / (templateDetails?.project_structure?.pages[0]?.blocks[3]?.struct?.tiles?.tileList.length === 6 ? 3 : data?.struct?.playground?.layout?.rows)}px`,
                            // aspectRatio: `${data?.struct?.playground?.cardProportions}`,
                          }}
                        >
                          <div
                            className="grid-piece"
                            style={{
                              backgroundImage: `url(${data?.struct?.finalScreen?.imageSrc})`,

                              backgroundSize: `${((value2 * templateDetails?.project_structure?.app?.maxWidth) / value1 / 2) * 3}px ${(value2 * templateDetails?.project_structure?.app?.maxWidth) / value1}px`,
                              height: "100% !important",
                              backgroundPosition: `${(index % 3) * 50}% ${
                                Math.floor(index / 3) * 50
                              }%`,
                              height: "100%",
                            }}
                          />
                        </div>
                      ) : (
                        <div
                          key={`${item?.id}`}
                          className="treasure-hunt__tile-wrapper_wiheowibd hunt__view"
                          style={{
                            padding: 4,
                            width: `${templateDetails?.project_structure?.app?.maxWidth / data?.struct?.playground?.layout?.cols}px`,
                            height: `${(value2 * templateDetails?.project_structure?.app?.maxWidth) / value1 / (templateDetails?.project_structure?.pages[0]?.blocks[3]?.struct?.tiles?.tileList.length === 6 ? 3 : data?.struct?.playground?.layout?.rows)}px`,
                          }}
                        >
                          <div className="outer-img">
                            <img
                              src={
                                item.image ||
                                "https://res.cloudinary.com/dwl5gzbuz/image/upload/v1738148606/project-thumb_laxubz.png"
                              }
                              alt="img"
                              style={{
                                // width: `100%`,
                                aspectRatio: `${data?.struct?.playground?.cardProportions}`,
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
                              className={`middleContent text-center align-items-center  ${data?.struct?.playground?.coverPosition === "center" ? "justify-content-center" : "justify-content-end"} `}
                            >
                              {data?.struct?.playground?.isShowQuestCover && (
                                <p className="h3">{item?.quest}</p>
                              )}
                              <button
                                data-bs-toggle="modal"
                                data-bs-target="#QuesModal"
                                onClick={() => handleOpenModal(item)}
                              >
                                Open
                              </button>
                            </div>
                          </div>
                        </div>
                      )
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
          <div
            className={`modal fade  position-absolute ${showQuestionModal ? "show" : ""}`}
            tabIndex="-1"
            id="QuesModal"
            style={{
              display: `${showQuestionModal ? "block" : "none"}`,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
            role="dialog"
          >
            <div className="modal-dialog modal-md question-modal-body modal-dialog-centered">
              <div className="modal-content rounded-lg overflow-hidden">
                <div
                  className="d-flex justify-content-between p-4 question-modal-head"
                  style={{
                    backgroundImage: `url(${selectedQuestion.overlaySrc || "https://res.cloudinary.com/dwl5gzbuz/image/upload/v1738148606/project-thumb_laxubz.png"})`,
                  }}
                >
                  <h5 className="modal-title">{""}</h5>
                  <button
                    type="button"
                    className="btn-close modal-close-btn"
                    onClick={handleCloseModal}
                  ></button>
                </div>
                <div className="modal-body text-center pt-5">
                  <div className="lock_icon">
                    <svg
                      width="44"
                      height="44"
                      viewBox="0 0 44 44"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="22" cy="22" r="22" fill="white"></circle>
                      <path
                        d="M29.2861 15.937H28.0514V13.3836C28.0514 9.85985 25.2856 7 21.8778 7C18.4699 7 15.7042 9.85985 15.7042 13.3836V15.937H14.4694C13.1112 15.937 12 17.0861 12 18.4905V31.2577C12 32.6621 13.1112 33.8111 14.4694 33.8111H29.2861C30.6443 33.8111 31.7555 32.6621 31.7555 31.2577V18.4905C31.7555 17.0861 30.6443 15.937 29.2861 15.937ZM21.8778 27.4275C20.5196 27.4275 19.4083 26.2785 19.4083 24.8741C19.4083 23.4697 20.5196 22.3206 21.8778 22.3206C23.236 22.3206 24.3472 23.4697 24.3472 24.8741C24.3472 26.2785 23.236 27.4275 21.8778 27.4275ZM25.7054 15.937H18.0501V13.3836C18.0501 11.2004 19.7664 9.42577 21.8778 9.42577C23.9891 9.42577 25.7054 11.2004 25.7054 13.3836V15.937Z"
                        fill={data?.struct?.colorTheme}
                      ></path>
                    </svg>
                  </div>
                  <h2>{selectedQuestion.quest}</h2>
                  <p>{selectedQuestion?.questDescription}</p>
                </div>
                <div className="pt-4" style={{ backgroundColor: "#eef1f9" }}>
                  <p className="text-center m-0">
                    Enter an answer or a secret word
                  </p>
                  <div className="row py-3 px-4">
                    <div className="col-9">
                      <input
                        className="answer-input"
                        type="text"
                        style={{
                          border: `1px solid ${data?.struct?.colorTheme}`,
                        }}
                        value={answerValue}
                        onChange={(e) => setAnswerValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleUnlock();
                          }
                        }}
                      />
                    </div>
                    <div className="col-3">
                      <button
                        disabled={answerValue === ""}
                        style={{
                          backgroundColor: data?.struct?.colorTheme,
                        }}
                        className={`unlock-btn ${
                          answerValue === "" ? "opacity-75" : ""
                        } ${wrongAns ? "shake-btn" : ""}`}
                        onClick={handleUnlock}
                      >
                        Unlock
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TreasureHuntPrevieww;
