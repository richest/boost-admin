import React, { useEffect, useState } from "react";

function TreasureHunt({
  data,
  isSelected,
  isFirst,
  isLast,
  handleSelectBlock,
  handleDeleteBlock,
  handleEditModal,
  setShowTemplatePreview,
  handleMoveDown,
  handleMoveUp,
  cloneblock,
  handleAddBlockFromBlock,
}) {
  console.log(data, "checkquizdatatatat");

  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState({});
  const [answerValue, setAnswerValue] = useState("");
  const [correctAnswerIds, setCorrectAnswerIds] = useState([]);
  const [wrongAns, setWrongAns] = useState(false);

  const handleOpenModal = (item) => {
    setShowQuestionModal(true);
    setSelectedQuestion(item);
  };

  const handleCloseModal = () => {
    setShowQuestionModal(false);
    setAnswerValue("");
  };

  const handleUnlock = () => {
    if (answerValue !== "") {
      if (answerValue === selectedQuestion?.answer) {
        setCorrectAnswerIds((prev) => [...prev, selectedQuestion?.id]);
        setShowQuestionModal(false);
        setAnswerValue("");
      }
      if (answerValue !== selectedQuestion?.answer) {
        setWrongAns(true);
      }
    }
  };

  useEffect(() => {
    setWrongAns(false);
  }, [answerValue]);

  return (
    <div
      style={{ fontSize: "unset" }}
      className={isSelected ? "block-builder selected" : "block-builder"}
      onClick={() => handleSelectBlock("treasure-hunt", data)}
    >
      <button
        className="plus-selected"
        onClick={() => handleAddBlockFromBlock(data.id)}
      >
        <i className="fa-solid fa-plus"></i>
      </button>
      <div className=" game_mainParent">
        <div className="editButton">
          <button
            className="button-boost"
            onClick={() => handleEditModal("quiz", data?.id)}
          >
            Edit
          </button>
        </div>
        <div className="preview-alert">
          You can try the game in action in the{" "}
          <span type="button" onClick={() => setShowTemplatePreview("preview")}>
            <i class="fa-regular fa-eye"></i> Preview mode
          </span>
        </div>

        <div className="treauseHunt disabled-panel">
          <div className="">
            <div className="d-flex align-items-center justify-content-center">
              <div className="w-100">
                <div
                  className="treasure-hunt__tiles"
                  style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${data?.struct?.playground?.layout?.cols}, 1fr)`,
                    gridTemplateRows: `repeat(${data?.struct?.playground?.layout?.rows}, 1fr)`,
                  }}
                >
                  {data?.struct?.tiles?.tileList?.map((item, index) => (
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
                          className={`middleContent  ${data?.struct?.playground?.coverPosition === "center" ? "align-items-center justify-content-center" : "align-items-center justify-content-end"} `}
                        >
                          {data?.struct?.playground?.isShowQuestCover && (
                            <p>{item?.quest}</p>
                          )}
                          <button onClick={() => handleOpenModal(item)}>
                            Open
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {showQuestionModal && (
            <div
              className="modal fade show"
              tabIndex="-1"
              style={{
                display: "block",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
              role="dialog"
            >
              <div className="modal-dialog modal-md">
                <div className="modal-content">
                  <div className="d-flex justify-content-between p-4 question-modal-head">
                    <h5 className="modal-title">{""}</h5>
                    <button
                      type="button"
                      className="btn-close modal-close-btn"
                      onClick={handleCloseModal}
                    ></button>
                  </div>
                  <div className="modal-body text-center">
                    <h4>{selectedQuestion?.ques}</h4>
                    <p>{selectedQuestion?.question}</p>
                  </div>
                  <div className="pt-4">
                    <p className="text-center m-0">
                      Enter an answer or a secret word
                    </p>
                    <div className="row py-3 px-4">
                      <div className="col-9">
                        <input
                          className="answer-input"
                          type="text"
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
          )}
        </div>
      </div>
      <ul
        className={`${isSelected ? "inlineControls selected-controls" : "inlineControls"}  `}
      >
       {!isFirst && (<li
          className="Inline_control__list"
          title="Move up"
          role="button"
          onClick={() => handleMoveUp(data.id)}
        >
          <i className="fa-solid fa-arrow-up"></i>
        </li>)}
        {!isLast && (<li
          className="Inline_control__list"
          title="Move down"
          role="button"
          onClick={() => handleMoveDown(data.id)}
        >
          <i className="fa-solid fa-arrow-down"></i>
        </li>)}
        <li
          className="Inline_control__list"
          title="Clone"
          role="button"
          onClick={() => cloneblock(data.id)}
        >
          <i className="fa-solid fa-copy"></i>
        </li>
        <li
          className="Inline_control__list"
          title="Remove"
          data-test="delete-block"
          role="button"
          onClick={() => handleDeleteBlock(data?.id)}
        >
          <i className="fa-solid fa-trash"></i>
        </li>
      </ul>
    </div>
  );
}

export default TreasureHunt;
