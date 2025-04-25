import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LeadForm from "../Form";

function QuizGamesPreview({ data }) {
  const { templateDetails } = useSelector((state) => state.DrawerReducer);
  console.log(data, "dffdfwuoewihwdkj98wewbewjkbwjbd");
  const COVER = data?.struct?.cover;
  let QUESTIONS = data.struct?.questions;
  const RESULT = data.struct?.results;
  const [startQuiz, setStartQuiz] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showAnswerIndex, setShowAnswerIndex] = useState(null);
  const [correctAnsCount, setCorrectAnsCount] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [resultIndex, setResultIndex] = useState(null);
  const [showLeadForm, setShowLeadForm] = useState(false);
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
    setShowLeadForm(false);
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
  const handleShowLeadForm = () => {
    setShowLeadForm(true);
  };
  const onSubmit = (e) => {
    handleShowResult();
  };

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    // Shuffle questions if shuffleQuestions is true
    if (data) {
      QUESTIONS = shuffleArray(QUESTIONS);
    }
    console.log(QUESTIONS, "QUESTIONSQUESTIONS");

    // Shuffle answers for each question if shuffleAnswers is true
    if (data) {
      QUESTIONS = QUESTIONS.map((question) => {
        const shuffledAnswers = shuffleArray(question.answers);
        return { ...question, answers: shuffledAnswers };
      });
    }
  }, [data]);
  console.log(correctAnsCount, "checkQUESTIONSQUESTIONSQUESTIONS");
  return (
    <div>
      <div className="game_mainParent">
        <div className="mb-4">
          {showLeadForm ? (
            <LeadForm data={data} onSubmit={onSubmit} />
          ) : (
            <div style={{padding: `${
              startQuiz
                ? showResult
                  ? RESULT[resultIndex]?.image
                    ? ""
                    : "0 20px"
                  : QUESTIONS[questionIndex]?.image
                    ? ""
                    : "0 20px"
                : COVER.image
                  ? ""
                  : "0 20px"
            }`}}>
              <div
                className={`trivia-quiz ${
                  startQuiz
                    ? showResult
                      ? RESULT[resultIndex]?.image
                        ? ""
                        : "no-image"
                      : QUESTIONS[questionIndex]?.image
                        ? ""
                        : "no-image"
                    : COVER.image
                      ? ""
                      : "no-image"
                }`}
              >
                <div
                  className={`trivia-gif`}
                  style={{
                    backgroundImage: startQuiz
                      ? showResult
                        ? `url(${RESULT[resultIndex]?.image})`
                        : QUESTIONS[questionIndex]?.image
                          ? `url(${QUESTIONS[questionIndex]?.image})`
                          : "none"
                      : `url(${COVER.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>

                {data?.struct?.progressBar && (
                  <>
                    {!showResult && startQuiz && (
                      <div className="showpaginationQuestions">
                        <p>
                          {questionIndex + 1}/ {data?.struct?.questions.length}
                        </p>
                      </div>
                    )}
                  </>
                )}

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
                    style={{ backgroundColor: data?.struct?.colorTheme }}
                    className="button-boost pulseAnimation_button"
                  >
                    {COVER?.buttonText}
                  </button>
                </div>
              )}

              {showResult && (
                <div className="trivia-content text-center">
                  {data?.struct?.showScores && (
                    <h2>
                      {correctAnsCount}/{QUESTIONS.length - 1 + 1}
                    </h2>
                  )}
                  <h3>{RESULT[resultIndex]?.header}</h3>
                  <p>{RESULT[resultIndex]?.description}</p>
                  <div className="LinksButton">
                    {RESULT[resultIndex]?.buttonLink && (
                      <>
                        {templateDetails?.project_structure?.app
                          ?.isOpenLinksInNewTab ? (
                          <Link
                            to={RESULT[resultIndex]?.buttonLink}
                            target="_blank"
                            className="button-boost"
                            style={{
                              backgroundColor: data?.struct?.colorTheme,
                            }}
                          >
                            {RESULT[resultIndex]?.buttonText}
                          </Link>
                        ) : (
                          <Link
                            to={RESULT[resultIndex]?.buttonLink}
                            style={{
                              backgroundColor: data?.struct?.colorTheme,
                            }}
                            className="button-boost "
                          >
                            {RESULT[resultIndex]?.buttonText}
                          </Link>
                        )}
                      </>
                    )}

                    {data?.struct?.callToActionEnabled && (
                      <>
                        {templateDetails?.project_structure?.app
                          ?.isOpenLinksInNewTab ? (
                          <Link
                            to={data?.struct?.callToActionLink}
                            target="_blank"
                            className="button-boost"
                            style={{
                              backgroundColor: data?.struct?.colorTheme,
                            }}
                          >
                            {data?.struct?.callToActionText}
                          </Link>
                        ) : (
                          <Link
                            to={data?.struct?.callToActionLink}
                            style={{
                              backgroundColor: data?.struct?.colorTheme,
                            }}
                            className="button-boost "
                          >
                            {data?.struct?.callToActionText}
                          </Link>
                        )}
                      </>
                    )}
                    {!data?.struct?.isHideRestartButton && (
                      <button
                        onClick={handleRestart}
                        style={{ backgroundColor: data?.struct?.colorTheme }}
                        className="button-boost "
                      >
                        Restart
                      </button>
                    )}
                  </div>
                </div>
              )}

              {!showResult && startQuiz && (
                <div className="py-4">
                  <div className="trivia-answers">
                    <ul>
                      {QUESTIONS[questionIndex]?.isText &&
                        QUESTIONS[questionIndex]?.answers?.map((item, i) => (
                          <li
                            key={item.id}
                            onClick={() => handleShowAnswer(item, i)}
                          >
                            <div className="d-flex align-items-center justify-content-between">
                              <div>
                                <p className="m-0">{item.text}</p>

                                {showAnswer && showAnswerIndex === i && (
                                  <p
                                    className={
                                      !data?.struct?.notMarkCorrectAnswers
                                        ? `${
                                            item.isCorrect
                                              ? "text-success"
                                              : "text-danger"
                                          }`
                                        : ""
                                    }
                                  >
                                    {item.description}
                                  </p>
                                )}
                              </div>

                              {!data?.struct?.notMarkCorrectAnswers && (
                                <>
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
                                </>
                              )}
                            </div>
                          </li>
                        ))}
                    </ul>

                    <div className="d-flex align-items-center gap-2 justify-content-center">
                      {!QUESTIONS[questionIndex]?.isText &&
                        QUESTIONS[questionIndex]?.answers?.map((item, i) => (
                          <div
                            key={item.id}
                            onClick={() => {
                              handleShowAnswer(item, i);
                              console.log("enterererere");
                            }}
                            className="d-flex align-items-center justify-content-between position-relative mb-4"
                          >
                            <div>
                              <div style={{ height: "200px", width: "200px" }}>
                                <img
                                  style={{
                                    height: "100%",
                                    width: "100%",
                                    objectFit: "cover",
                                  }}
                                  src={item?.image}
                                  alt={item.text}
                                />
                              </div>

                              {showAnswer && showAnswerIndex === i && (
                                <p
                                  className={
                                    !data?.struct?.notMarkCorrectAnswers
                                      ? `${
                                          item.isCorrect
                                            ? "text-success"
                                            : "text-danger"
                                        }`
                                      : ""
                                  }
                                >
                                  {item.description}
                                </p>
                              )}
                            </div>

                            {/* {showAnswer && showAnswerIndex === i && (
                              <p
                                className={
                                  !data?.struct?.notMarkCorrectAnswers
                                    ? `${
                                        item.isCorrect
                                          ? "text-success"
                                          : "text-danger"
                                      }`
                                    : ""
                                }
                              >
                                {item.description}
                              </p>
                            )} */}

                            {!data?.struct?.notMarkCorrectAnswers && (
                              <>
                                {showAnswer && showAnswerIndex === i && (
                                  <div className="decide-icon">
                                    {item.isCorrect ? (
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        height={18}
                                        width={18}
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
                              </>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="text-center">
                    {showAnswer && questionIndex < QUESTIONS.length - 1 && (
                      <button
                        onClick={handleNextQuestion}
                        style={{ backgroundColor: data?.struct?.colorTheme }}
                        className=" button-boost "
                      >
                        Next
                      </button>
                    )}

                    {showAnswer && questionIndex === QUESTIONS.length - 1 && (
                      <>
                        {data?.struct?.isShowLeadForm ? (
                          <button
                            onClick={handleShowLeadForm}
                            className="button-boost  "
                            style={{
                              backgroundColor: data?.struct?.colorTheme,
                            }}
                          >
                            Next
                          </button>
                        ) : (
                          <button
                            onClick={handleShowResult}
                            className="button-boost  "
                            style={{
                              backgroundColor: data?.struct?.colorTheme,
                            }}
                          >
                            See result
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuizGamesPreview;
