import React, { useState } from "react";

function QuizGames({
  data,
  isSelected,
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
  const COVER = data?.struct?.cover;
  const QUESTIONS = data.struct?.questions;
  const RESULT = data.struct?.results;
  const [startQuiz, setStartQuiz] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showAnswerIndex, setShowAnswerIndex] = useState(null);
  const [correctAnsCount, setCorrectAnsCount] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [resultIndex, setResultIndex] = useState(null);

  const handleStartQuiz = () => {
    setStartQuiz(true);
  };

  const handleNextQuestion = () => {
    if (questionIndex < QUESTIONS?.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setShowAnswer(false);
    }
  };

  const handleShowAnswer = (item, i) => {
    setShowAnswer(true);
    if (!showAnswer) {
      setShowAnswerIndex(i);
      if (item.isCorrect) {
        setCorrectAnsCount(correctAnsCount + 1);
      }
    }
  };

  const handleShowResult = () => {
    setShowResult(true);
    if (correctAnsCount === 0 || correctAnsCount === 1) {
      setResultIndex(0);
    } else {
      setResultIndex(correctAnsCount - 1);
    }
  };

  const handleRestart = () => {
    setStartQuiz(false);
    setShowAnswer(false);
    setShowResult(false);
    setQuestionIndex(0);
    setShowAnswerIndex(null);
    setCorrectAnsCount(0);
    setResultIndex(null);
  };

  return (
    <div
      style={{ fontSize: "unset" }}
      className={isSelected ? "block-builder selected" : "block-builder"}
      onClick={() => handleSelectBlock("quiz", data)}
    >
      <button
        className="plus-selected"
        onClick={() => handleAddBlockFromBlock(data.id)}
      >
        <i className="fa-solid fa-plus"></i>
      </button>
      <div className="game_mainParent">
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
        <div className=" disabled-panel">
          <div className="trivia-quiz">
            <div className="trivia-gif">
              {!startQuiz ? (
                COVER?.image ? (
                  <img src={COVER.image} alt="gif" />
                ) : null
              ) : showResult ? (
                RESULT[resultIndex]?.image ? (
                  <img src={RESULT[resultIndex].image} alt="gif" />
                ) : null
              ) : QUESTIONS[questionIndex]?.image ? (
                <img src={QUESTIONS[questionIndex].image} alt="gif" />
              ) : null}
            </div>
            {!showResult && startQuiz && (
              <div className="trivia-question">
                <h3>{QUESTIONS[questionIndex]?.text}</h3>
              </div>
            )}
          </div>
          {!startQuiz && (
            <div className="trivia-content text-center">
              <h3>{COVER?.header}</h3>
              <p>{COVER?.description}</p>
              <button
                onClick={handleStartQuiz}
                className="button-boost pulseAnimation_button"
              >
                {COVER?.buttonText}
              </button>
            </div>
          )}

          {showResult && (
            <div className="trivia-content text-center">
              <h2>
                {correctAnsCount}/{QUESTIONS.length - 1 + 1}
              </h2>
              <h3>{RESULT[resultIndex]?.header}</h3>
              <p>{RESULT[resultIndex]?.description}</p>
              <button onClick={handleRestart} className="button-boost ">
                Restart
              </button>
            </div>
          )}

          {!showResult && startQuiz && (
            <div className="py-4">
              <div className="trivia-answers">
                <ul>
                  {QUESTIONS[questionIndex]?.answers?.map((item, i) => (
                    <li key={item.id} onClick={() => handleShowAnswer(item, i)}>
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          {item.image ? (
                            <img src={item.image} />
                          ) : (
                            <p className="m-0">{item.text}</p>
                          )}
                          {showAnswer && showAnswerIndex === i && (
                            <p
                              className={`${
                                item.isCorrect ? "text-success" : "text-danger"
                              }`}
                            >
                              {item.description}
                            </p>
                          )}
                        </div>
                        {showAnswer && showAnswerIndex === i && (
                          <div>
                            {item.isCorrect ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="rgba(30,118,72,1)"
                              >
                                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM17.4571 9.45711L11 15.9142L6.79289 11.7071L8.20711 10.2929L11 13.0858L16.0429 8.04289L17.4571 9.45711Z"></path>
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="rgba(184,36,36,1)"
                              >
                                <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"></path>
                              </svg>
                            )}
                          </div>
                        )}
                        {showAnswer &&
                          showAnswerIndex !== i &&
                          item.isCorrect && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="rgba(30,118,72,1)"
                            >
                              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM17.4571 9.45711L11 15.9142L6.79289 11.7071L8.20711 10.2929L11 13.0858L16.0429 8.04289L17.4571 9.45711Z"></path>
                            </svg>
                          )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-center">
                {showAnswer && questionIndex < QUESTIONS.length - 1 && (
                  <button
                    onClick={handleNextQuestion}
                    className=" button-boost "
                  >
                    Next
                  </button>
                )}

                {showAnswer && questionIndex === QUESTIONS.length - 1 && (
                  <button onClick={handleShowResult} className="button-boost  ">
                    See result
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <ul
        className={`${isSelected ? "inlineControls selected-controls" : "inlineControls"}  `}
      >
        <li
          className="Inline_control__list"
          title="Move up"
          role="button"
          onClick={() => handleMoveUp(data.id)}
        >
          <i className="fa-solid fa-arrow-up"></i>
        </li>
        <li
          className="Inline_control__list"
          title="Move down"
          role="button"
          onClick={() => handleMoveDown(data.id)}
        >
          <i className="fa-solid fa-arrow-down"></i>
        </li>
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

export default QuizGames;
