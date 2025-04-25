import React, { useEffect, useRef, useState } from "react";
import "./memory.css";
import moment from "moment";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

function FindOnePair({
  data,
  isSelected,
  handleSelectBlock,
  handleDeleteBlock,
  handleEditModal,
  setShowTemplatePreview,
  cloneblock,
  handleMoveDown,
  handleMoveUp,
  handleAddBlockFromBlock,
}) {
  const bestResults = [
    {
      name: "John Brown",
      time: "00:24s",
    },
    {
      name: "John Red",
      time: "00:32s",
    },
    {
      name: "John White",
      time: "00:39s",
    },
    {
      name: "John Black",
      time: "00:48s",
    },
    {
      name: "John Yellow",
      time: "00:53s",
    },
  ];

  const topBannerText = data?.struct;
  const pairsData = data?.struct;

  const Schema = Yup.object().shape({
    email:
      topBannerText?.isShowRatingEmail && topBannerText?.isEnableRating
        ? Yup.string().required("This field is required")
        : Yup.string(),
    code:
      topBannerText?.passwordList?.length > 0
        ? Yup.string().required("This field is required")
        : Yup.string(),
    nickname: topBannerText?.isEnableRating
      ? Yup.string().required("This field is required")
      : Yup.string(),
    legalStatement:
      topBannerText?.legalStatement !== "" && topBannerText?.isEnableRating
        ? Yup.boolean().required("This field is required")
        : Yup.boolean(),
  });

  const timesUpData = data?.struct?.timeIsUpScreen;
  const timeType = data?.struct?.timerType;
  const starsTimeArray = topBannerText?.starsTimeList
    .split(",")
    .map((item) => item.trim());
  const sliceCount = pairsData?.playground?.cardLayout?.value === "4x3" ? 6 : 4;
  const pairList = pairsData?.pairs?.pairList.slice(0, sliceCount);

  const [shuffledList, setShuffledList] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [startGame, setStartGame] = useState(false);
  const [matched, setMatched] = useState([]);
  const [gameWon, setGameWon] = useState(false);
  const [actionCount, setActionCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(topBannerText?.countdownTime);
  const [gameOver, setGameOver] = useState(false);
  const [showCorrectCards, setShowCorrectCards] = useState(false);
  const [matchedData, setMatchedData] = useState({});
  const [timeTaken, setTimeTaken] = useState(0);
  const [showStartBtn, setShowStartBtn] = useState(false);
  const [codeErrorShow, setCodeErrorShow] = useState(false);

  const formattedTimeTaken = moment.utc(timeTaken * 1000).format("mm:ss");
  const formattedTimeLeft = moment.utc(timeLeft * 1000).format("mm:ss");

  const formOptions = { resolver: yupResolver(Schema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const decodeHtmlEntities = (text) => {
    return text
      ?.replace(/U\+60;/g, "<")
      .replace(/U\+62;/g, ">")
      .replace(/U\+34;/g, '"')
      .replace(/U\+47;/g, "/")
      .replace(/\\uD83D\\uDC47/g, "👇")
      .replace(/U\+10;/g, "\n");
  };

  const decodedHtmlWin = decodeHtmlEntities(matchedData?.description);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleFlip = (index) => {
    setStartGame(true);
    if (flipped.length === 2 || matched.includes(shuffledList[index].id))
      return;
    setFlipped([...flipped, index]);
  };

  const handleNext = () => {
    setGameWon(true);
    setShowCorrectCards(false);
  };

  const onSubmit = (data) => {
    if (topBannerText?.passwordList.length > 0) {
      if (topBannerText?.passwordList?.some((item) => item === data.code)) {
        setShowStartBtn(true);
        reset();
      } else {
        setCodeErrorShow(true);
      }
    } else {
      setShowStartBtn(true);
      reset();
    }
  };

  const handleRestart = () => {
    reset();
    setGameOver(false);
    setGameWon(false);
    setStartGame(false);
    setShowStartBtn(false);
    setCodeErrorShow(false);
    setFlipped([]);
    setMatched([]);
    setActionCount(0);
    setTimeLeft(topBannerText?.countdownTime);
    setTimeTaken(0);
    setMatchedData({});
  };

  const handleRestartForm = () => {
    setShowStartBtn(false);
    setCodeErrorShow(false);
  };

  const handleStartGame = () => {
    setStartGame(true);
    setShowStartBtn(false);
  };

  const first = pairList?.map((item) => ({
    firstImage: item.firstImage,
    id: item.id,
  }));
  const second = pairList?.map((item) => ({
    firstImage: item.secondImage,
    id: item.id,
  }));
  const handleShuffleCards = () => {
    setShuffledList(shuffleArray([...first, ...second]));
  };
  useEffect(() => {
    handleShuffleCards();
  }, []);

  useEffect(() => {
    if (flipped.length === 2) {
      setActionCount((prev) => prev + 1);
      const [firstIndex, secondIndex] = flipped;
      if (shuffledList[firstIndex].id === shuffledList[secondIndex].id) {
        setMatched(shuffledList[firstIndex].id);
        setTimeout(() => {
          if (pairsData?.pairs?.isShowFeedback) {
            setShowCorrectCards(true);
          } else {
            setGameWon(true);
          }
          setStartGame(false);
        }, 1000);
      }
      setTimeout(() => setFlipped([]), 1000);
    }
  }, [flipped]);

  useEffect(() => {
    const data = pairList.find((item) => item.id === matched);
    setMatchedData(data);
  }, [matched]);

  useEffect(() => {
    let interval;

    if (startGame) {
      interval = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        setTimeTaken((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [startGame]);

  useEffect(() => {
    if (timeType?.value === "countdown" && topBannerText?.enableTimer) {
      if (timeLeft === 0) {
        setGameOver(true);
      }
    }
  }, [timeLeft, timeType]);

  return (
    <div
      style={{ fontSize: "unset" }}
      className={isSelected ? "block-builder selected" : "block-builder"}
      onClick={() => handleSelectBlock("findPair", data)}
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
            onClick={() => handleEditModal("findPair", data?.id)}
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
        <div className="disabled-panel">
          <>
            <div className="container my-4 overflow-hidden h-100 w-100">
              {!gameWon && !gameOver && (
                <>
                  {topBannerText?.enableTimer && (
                    <div className="find-one-pair-actions">
                      <div className="d-flex justify-content-between">
                        <p className="m-0">
                          Number of actions : <span>{actionCount}</span>
                        </p>
                        <p className="m-0">
                          {timeType?.value === "countdown"
                            ? formattedTimeLeft
                            : formattedTimeTaken}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="fine-one-pair-playground pt-4">
                    <div className="find-one-pair-game">
                      <div className="row g-2">
                        {shuffledList.map((item, i) => (
                          <div key={i} className="col-3">
                            <div
                              className={`pair-card ${
                                flipped.includes(i) || matched.includes(item.id)
                                  ? "flipped"
                                  : ""
                              }`}
                              style={{
                                aspectRatio: data?.struct?.playground?.cardProportions ?? '1/1'
                              }}
                            >
                              <div
                                onClick={() => handleFlip(i)}
                                className="find-one-pair-game-outerImg"
                              >
                                <img
                                  src={pairsData?.playground?.cardBackImage}
                                  alt="card back"
                                />
                              </div>
                              <div className="find-one-pair-game-InnerImg">
                                {flipped.includes(i) ||
                                matched.includes(item.id) ? (
                                  <img
                                    src={item.firstImage?.src}
                                    alt="pair item"
                                  />
                                ) : null}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {(gameWon || gameOver) && (
                <>
                  <div className="fine-one-pair-finalScreen pt-4">
                    <div className="fine-one-pair-finalScreen-img">
                      {gameOver ? (
                        <img src={timesUpData?.imageSrc} alt="imagesss" />
                      ) : (
                        <img
                          src={pairsData?.finalScreen?.imageSrc}
                          alt="imagesss"
                        />
                      )}
                    </div>
                    <div className="finalScreenBlock">
                      {gameWon && topBannerText?.enableTimer && (
                        <div className="fine-one-pair-finalScreen-result">
                          {topBannerText?.enableStars &&
                            starsTimeArray.map((item, i) =>
                              item > timeTaken ? (
                                <FaStar key={i} />
                              ) : (
                                <CiStar key={i} />
                              )
                            )}
                          <p className="m-0">
                            Your result:{" "}
                            {timeType?.value === "countdown"
                              ? formattedTimeLeft
                              : formattedTimeTaken}
                            s
                          </p>
                        </div>
                      )}
                      <div className="fine-one-pair-finalScreen-text">
                        <h5>
                          {gameOver
                            ? timesUpData?.header
                            : pairsData?.finalScreen?.header}
                        </h5>
                        <p>
                          {gameOver
                            ? timesUpData?.description
                            : pairsData?.finalScreen?.description}
                        </p>
                        {!gameOver && topBannerText?.isActionButton && (
                          <a
                            href={topBannerText?.actionButtonLink}
                            style={{
                              backgroundColor: `${topBannerText?.colorTheme}`,
                            }}
                            onClick={handleRestart}
                            className="btn btn-outline-dark"
                          >
                            {topBannerText?.actionButtonText}
                          </a>
                        )}

                        {!topBannerText?.isHideRestartButton && (
                          <button
                            onClick={handleRestart}
                            className="btn btn-outline-dark"
                          >
                            Restart
                          </button>
                        )}
                      </div>
                    </div>

                    {topBannerText?.isShowLeadForm && <p>LeadForm</p>}
                  </div>
                  {(topBannerText?.isShowRatingEmail ||
                    topBannerText?.isEnableRating) &&
                    !topBannerText?.isHideLeaderboard &&
                    (gameOver || gameWon) && (
                      <>
                        <div className="fine-one-pair-finalScreen-bestResult mt-4">
                          <p className="p-4">Best results:</p>
                          <ol>
                            {bestResults?.map((item, i) => (
                              <li key={i}>
                                <div className="d-flex justify-content-between p-4">
                                  <p>{item.name}</p>
                                  <p>{item.time}</p>
                                </div>
                              </li>
                            ))}
                          </ol>
                        </div>
                        <div className="fine-one-pair-finalScreen-bestResult my-4">
                          <div className="d-flex justify-content-between p-4">
                            <p>You</p>
                            <p>{formattedTimeTaken}s</p>
                          </div>
                        </div>
                      </>
                    )}
                </>
              )}
            </div>

            {pairsData?.pairs?.isShowFeedback && showCorrectCards && (
              <div
                className="modal fade show d-block"
                tabIndex="-1"
                style={{
                  display: "topBannerText",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
                role="dialog"
              >
                <div className="modal-dialog modal-md">
                  <div className="modal-content p-4">
                    <div className="d-flex justify-content-center py-2">
                      <div className="find-one-pair-game-win-images">
                        <img src={matchedData?.firstImage?.src} alt="imgaess" />
                      </div>
                      <div className="find-one-pair-game-win-images">
                        <img
                          src={matchedData?.secondImage?.src}
                          alt="imgaess"
                        />
                      </div>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: decodedHtmlWin }} />
                    <button
                      onClick={handleNext}
                      className="btn btn-outline-dark mt-2"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}

            {(topBannerText?.passwordList?.length > 0 ||
              topBannerText?.isEnableRating) &&
              !codeErrorShow &&
              !showStartBtn &&
              !startGame &&
              !gameWon &&
              !showCorrectCards && (
                <div
                  className="modal fade show d-block"
                  tabIndex="-1"
                  style={{
                    display: "topBannerText",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                  }}
                  role="dialog"
                >
                  <div className="modal-dialog modal-md">
                    <div className="modal-content p-4">
                      <div className="modal-body">
                        <h3 className="mb-4">Sign in to play</h3>
                      </div>
                      <div className="pt-2">
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <div className="row py-3">
                            {topBannerText?.passwordList?.length > 0 && (
                              <div className="col-12 mb-2">
                                <lable className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                                  Your code
                                </lable>
                                <input
                                  style={{ border: `1px solid gray` }}
                                  className="form-control theme-control"
                                  type="text"
                                  {...register("code")}
                                />
                                {errors.code && (
                                  <p className="text-danger">
                                    {errors?.code?.message}
                                  </p>
                                )}
                              </div>
                            )}
                            {topBannerText?.isEnableRating && (
                              <div className="col-12 mb-2">
                                <lable className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                                  Nickname
                                </lable>
                                <input
                                  style={{ border: `1px solid gray` }}
                                  className="form-control theme-control"
                                  type="text"
                                  {...register("nickname")}
                                />
                                {errors.nickname && (
                                  <p className="text-danger">
                                    {errors.nickname.message}
                                  </p>
                                )}
                              </div>
                            )}
                            {topBannerText?.isShowRatingEmail &&
                              topBannerText?.isEnableRating && (
                                <div className="col-12 mb-2">
                                  <lable className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                                    Email
                                  </lable>
                                  <input
                                    style={{ border: `1px solid gray` }}
                                    className="form-control theme-control"
                                    type="email"
                                    {...register("email")}
                                  />
                                  {errors.email && (
                                    <p className="text-danger">
                                      {errors?.email.message}
                                    </p>
                                  )}
                                </div>
                              )}
                            {topBannerText?.legalStatement !== "" &&
                              topBannerText?.isEnableRating && (
                                <div className="col-12 mb-2">
                                  <input
                                    type="checkbox"
                                    className="form-check-input theme-control shadow-none m-0"
                                    {...register("legalStatement")}
                                  />
                                  <label className="ps-2">
                                    {topBannerText?.legalStatement}
                                  </label>
                                </div>
                              )}
                            <div className="d-flex justify-content-end pt-2">
                              <button
                                type="submit"
                                className="button button-primary border-0"
                              >
                                Start
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            {showStartBtn && (
              <div
                className="modal fade show d-block"
                tabIndex="-1"
                style={{
                  display: "topBannerText",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
                role="dialog"
              >
                <div className="modal-dialog modal-sm">
                  <div className="modal-content p-4">
                    <div className="modal-body text-center">
                      <h4>
                        {topBannerText?.struct?.playground?.coverHeader
                          ? topBannerText?.struct?.playground?.coverHeader
                          : ""}
                      </h4>
                      <button
                        onClick={handleStartGame}
                        className="btn btn-primary"
                        style={{
                          backgroundColor: `${topBannerText?.colorTheme}`,
                          color: "#000",
                        }}
                      >
                        {topBannerText?.struct?.playground?.coverButtonText
                          ? topBannerText?.struct?.playground?.coverButtonText
                          : "Start"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {codeErrorShow && (
              <div
                className="modal fade show d-block"
                tabIndex="-1"
                style={{
                  display: "topBannerText",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
                role="dialog"
              >
                <div className="modal-dialog modal-sm">
                  <div className="modal-content p-4">
                    <div className="modal-body text-center">
                      <h4>Access is closed</h4>
                      <p>The code is entered incorrectly or has expired.</p>
                      <button
                        onClick={handleRestartForm}
                        className="btn btn-primary"
                        style={{
                          backgroundColor: `${topBannerText?.colorTheme}`,
                        }}
                      >
                        Restart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
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

export default FindOnePair;
