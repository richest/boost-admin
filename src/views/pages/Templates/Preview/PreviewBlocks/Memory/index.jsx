import React, { useEffect, useRef, useState } from "react";
import "./memory.css";
import moment from "moment";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import LeadForm from "../Form";

function PreviewMemory({ data, approxvalue, memoryData }) {
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
  console.log(memoryData, "memoryData")
  // return
  // if (!data || !memoryData || !data.struct) {
  //   return <div>Loading game...</div>; // or a spinner
  // }
  const mainData = data;
  const pairs = mainData?.struct?.pairs;
  const finalScreen = mainData?.struct?.finalScreen;
  const isMemoryDataValid = memoryData && Object.keys(memoryData).length > 0;

  const playground = isMemoryDataValid
    ? memoryData
    : mainData?.struct?.playground;
  // const playground = memoryData;
  // memoryData
  console.log(mainData?.struct?.playground, memoryData, "wdhiwhdihw")
  const starsTimeArray = mainData?.struct?.starsTimeList
    ?.split(",")
    .map((item) => item.trim());

  const Schema = Yup.object().shape({
    email:
      mainData?.struct?.isShowRatingEmail && mainData?.struct?.isEnableRating
        ? Yup.string().required("This field is required")
        : Yup.string(),
    code:
      mainData?.struct?.passwordList?.length > 0
        ? Yup.string().required("This field is required")
        : Yup.string(),
    nickname: mainData?.struct?.isEnableRating
      ? Yup.string().required("This field is required")
      : Yup.string(),
    legalStatement:
      mainData?.struct?.legalStatement !== "" &&
        mainData?.struct?.isEnableRating
        ? Yup.boolean().required("This field is required")
        : Yup.boolean(),
  });

  const [shuffledList, setShuffledList] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [startGame, setStartGame] = useState(false);
  const [matched, setMatched] = useState([]);
  const [gameWon, setGameWon] = useState(false);
  const [nextFlip, setNextFlip] = useState(false);
  const [actionCount, setActionCount] = useState(0);
  const [matchedData, setMatchedData] = useState({});
  const [timeTaken, setTimeTaken] = useState(0);
  const [timeLeft, setTimeLeft] = useState(mainData?.struct?.countdownTime);
  const [memorizeTime, setMemorizeTime] = useState(
    mainData?.struct?.showToMemorizeTime
  );
  const [gameOver, setGameOver] = useState(false);
  const [showMemorize, setShowMemorize] = useState(false);
  const [playingId, setPlayingId] = useState(null);
  const [cardLayout, setCardLayout] = useState(null);
  const [codeErrorShow, setCodeErrorShow] = useState(false);
  const [showInputModal, setShowInputModal] = useState(true);
  const [showStartBtn, setShowStartBtn] = useState(true);
  const audioRefs = useRef({});
  const [showLeadForm, setShowLeadForm] = useState(
    mainData?.struct?.isShowLeadForm
  );
  const totalCards = playground?.cardLayout?.value
    ? Number(playground.cardLayout.value.split("x")[0]) *
    Number(playground.cardLayout.value.split("x")[1])
    : 0;
  console.log(totalCards, "playground", totalCards)
  const totalPairs = totalCards / 2;
  const pairList = pairs?.pairList.slice(0, totalPairs);
  console.log(pairList, "sqqs")
  const formattedTimeTaken = moment.utc(timeTaken * 1000).format("mm:ss");
  const formattedTimeLeft = moment.utc(timeLeft * 1000).format("mm:ss");
  const formattedMemorizeTime = moment.utc(memorizeTime * 1000).format("mm:ss");

  const formOptions = { resolver: yupResolver(Schema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const decodeHtmlEntities = (text) => {
    return text
      ?.replace(/U\+60;/g, "<")
      .replace(/U\+62;/g, ">")
      .replace(/U\+34;/g, '"')
      .replace(/U\+47;/g, "/")
      .replace(/\\uD83D\\uDC47/g, "👇")
      .replace(/U\+10;/g, "\n");
  };

  const matchedTitle = decodeHtmlEntities(matchedData?.description);
  const finalDes = decodeHtmlEntities(
    gameOver
      ? mainData?.struct?.timeIsUpScreen?.description
      : finalScreen?.description
  );

  const handleStart = () => {
    setStartGame(true);
  };

  const handleFlip = (index) => {
    if (matchedData?.description === "") {
      setNextFlip(false);
    }

    if (flipped.length === 2 || matched.includes(shuffledList[index].id))
      return;
    setFlipped([...flipped, index]);
  };

  const handleNext = () => {
    setNextFlip(false);
  };

  const onSubmit = (data) => {
    if (mainData?.struct?.passwordList.length > 0) {
      if (mainData?.struct?.passwordList?.some((item) => item === data.code)) {
        setShowStartBtn(true);
        setShowInputModal(false);
        setStartGame(true);
        reset();
      } else {
        setCodeErrorShow(true);
      }
    } else {
      setShowStartBtn(true);
      setShowInputModal(false);
      setStartGame(true);
      reset();
    }
  };

  const handleRestartForm = () => {
    // setShowStartBtn(false);
    setCodeErrorShow(false);
  };

  const togglePlayPause = (id) => {
    const currentAudio = audioRefs.current[id];
    if (!currentAudio) return;

    if (playingId === id) {
      currentAudio.pause();
      setPlayingId(null);
    } else {
      Object.values(audioRefs.current).forEach((audio) => {
        if (!audio.paused) audio.pause();
      });

      currentAudio.play();
      setPlayingId(id);
    }
  };

  const handleRestart = () => {
    reset();
    setGameOver(false);
    setGameWon(false);
    setStartGame(false);
    setFlipped([]);
    setMatched([]);
    setActionCount(0);
    setTimeTaken(0);
    setTimeLeft(mainData?.struct?.countdownTime);
    setMatchedData({});
    setNextFlip(false);
    setShuffledList(shuffleArray([...first, ...second]));
    setMemorizeTime(mainData?.struct?.showToMemorizeTime);
    setShowMemorize(false);
  };

  const first = pairList?.map((item) => ({
    firstImage: item.firstImage,
    id: item.id,
    description: item.description,
  }));

  const second = pairList?.map((item) => ({
    firstImage: item.secondImage,
    id: item.id,
    description: item.description,
  }));

  const handleShuffleCards = () => {
    setShuffledList(shuffleArray([...first, ...second]));
  };

  useEffect(() => {
    handleShuffleCards();
  }, [cardLayout, data]);

  useEffect(() => {
    if (flipped.length === 2) {
      setActionCount((prev) => prev + 1);
      const [firstIndex, secondIndex] = flipped;
      if (shuffledList[firstIndex].id === shuffledList[secondIndex].id) {
        setMatched((prev) => [...prev, shuffledList[firstIndex].id]);
        const data = pairList.find(
          (item) => item.id === shuffledList[firstIndex].id
        );
        setMatchedData(data);
        setTimeout(() => {
          setNextFlip(true);
        }, 1000);

        if (matchedData?.description === "") {
          setNextFlip(false);
        }
      }
      setTimeout(
        () => setFlipped([]),
        `${mainData?.struct?.timeoutClosingCards}000`
      );
    }
  }, [flipped]);

  useEffect(() => {
    if (matched.length === cardLayout) {
      setGameWon(true);
    }
  }, [matched, cardLayout]);

  useEffect(() => {
    let interval;
    if (startGame && !gameWon && !nextFlip && !showMemorize) {
      interval = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        setTimeTaken((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [startGame, gameWon, nextFlip, showMemorize]);

  useEffect(() => {
    if (
      mainData?.struct?.timerType?.value === "countdown" &&
      mainData?.struct?.enableTimer
    ) {
      if (timeLeft === 0) {
        setGameOver(true);
      }
    }
  }, [timeLeft, mainData]);

  useEffect(() => {
    let interval;
    if (mainData?.struct?.showToMemorize && startGame) {
      setShowMemorize(true);
      setTimeout(() => {
        setShowMemorize(false);
      }, `${mainData?.struct?.showToMemorizeTime}000`);

      interval = setInterval(() => {
        setMemorizeTime((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [mainData, startGame]);

  useEffect(() => {
    if (matchedData?.description === "") {
      setNextFlip(false);
    }
  }, [matchedData, startGame]);

  // useEffect(() => {
  //   const [cols, rows] = playground?.cardLayout?.value.split("x").map(Number);
  //   const totalCards = cols * rows;

  //   setCardLayout(totalCards / 2);
  // }, [playground]);
  useEffect(() => {
    const layoutValue = playground?.cardLayout?.value;

    if (!layoutValue || !layoutValue.includes("x")) return;

    const [cols, rows] = layoutValue.split("x").map(Number);
    const totalCards = cols * rows;

    setCardLayout(totalCards / 2);
  }, [playground]);

  console.log("matchedData", showLeadForm);
  const onSubmitForm = (e) => {
    alert("form subbmited");
    setShowLeadForm(false);
  };
  return (
    <div style={{ fontSize: "unset" }} className={"block-builderd"}>
      <div className="game_mainParent">
        <div className="">
          <>
            <div className="container py-4 overflow-hidden">
              {approxvalue !== false && (
                <>
                  {!gameOver && !gameWon && mainData?.struct?.enableTimer && (
                    <div className="find-one-pair-actions">
                      <div className="d-flex justify-content-between">
                        <p className="m-0">
                          Number of actions : <span>{actionCount}</span>
                        </p>
                        <p className="m-0">
                          {mainData?.struct?.timerType?.value === "countdown"
                            ? formattedTimeLeft
                            : formattedTimeTaken}
                        </p>
                      </div>
                    </div>
                  )}
                </>
              )}

              {mainData?.struct?.showToMemorize && showMemorize && (
                <div className="find-one-pair-showMemorize mt-4">
                  <p className="m-0">
                    Get ready!
                    <sapn className="ps-4">{formattedMemorizeTime}s</sapn>
                  </p>
                </div>
              )}

              <div className="fine-one-pair-playground pt-4">
                {!gameOver && !gameWon && (
                  <div className="find-one-pair-game">
                    <div className="row g-2">
                      {shuffledList.map((item, i) => (
                        <div key={i} className="col-3">
                          <div
                            className={`pair-card ${flipped.includes(i) || matched.includes(item.id)
                              ? "flipped"
                              : showMemorize
                                ? "flipped"
                                : showMemorize
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
                                src={playground?.cardBackImage}
                                alt="card back"
                              />
                              {approxvalue !== false && (
                                <>
                                  {mainData?.struct?.numberedCardBacks && (
                                    <>
                                      {mainData?.struct?.numberedCardBacksType
                                        ?.value === "option_1" && (
                                          <div>
                                            <h2 className="text-white font-weight-bold">
                                              {i + 1}
                                            </h2>
                                          </div>
                                        )}
                                      {mainData?.struct?.numberedCardBacksType
                                        ?.value === "option_2" && (
                                          <div className="find-one-pair-game-outerImg-numberedCardBacks">
                                            <h3>{i + 1}</h3>
                                          </div>
                                        )}
                                    </>
                                  )}
                                </>
                              )}
                            </div>
                            {showMemorize ? (
                              <div className="find-one-pair-game-InnerImg">
                                {item.firstImage?.cardType === "text" && (
                                  <div
                                    style={{
                                      backgroundColor: `${item?.firstImage?.bgColor}`,
                                      color: `${item?.firstImage?.color}`,
                                    }}
                                  >
                                    <h3>{item.firstImage?.text}</h3>
                                  </div>
                                )}
                                {item.firstImage?.cardType === "image" && (
                                  <img
                                    src={item.firstImage?.src}
                                    alt="pair item"
                                  />
                                )}
                                {item?.firstImage?.cardType === "audio" && (
                                  <div
                                    className="matchup-image-audio"
                                    style={{
                                      backgroundColor: `${mainData?.struct?.colorTheme}`,
                                    }}
                                  >
                                    <audio
                                      ref={(el) =>
                                        (audioRefs.current[item.id] = el)
                                      }
                                      src={item?.firstImage?.src}
                                    />
                                    <div className="d-flex justify-content-end align-items-center">
                                      <button
                                        type="button"
                                        onClick={() => togglePlayPause(item.id)}
                                      >
                                        {playingId === item.id ? (
                                          <i className="fa-solid fa-circle-pause" />
                                        ) : (
                                          <i class="fa-solid fa-circle-play"></i>
                                        )}
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="find-one-pair-game-InnerImg">
                                {flipped.includes(i) ||
                                  matched.includes(item.id) ? (
                                  <>
                                    {item.firstImage?.cardType === "text" && (
                                      <div
                                        style={{
                                          backgroundColor: `${item?.firstImage?.bgColor}`,
                                          color: `${item?.firstImage?.color}`,
                                        }}
                                      >
                                        <h3>{item.firstImage?.text}</h3>
                                      </div>
                                    )}
                                    {item.firstImage?.cardType === "image" && (
                                      <img
                                        src={item.firstImage?.src}
                                        alt="pair item"
                                      />
                                    )}
                                    {item?.firstImage?.cardType === "audio" && (
                                      <div
                                        className="matchup-image-audio"
                                        style={{
                                          backgroundColor: `${mainData?.struct?.colorTheme}`,
                                        }}
                                      >
                                        <audio
                                          ref={(el) =>
                                            (audioRefs.current[item.id] = el)
                                          }
                                          src={item?.firstImage?.src}
                                        />
                                        <div className="d-flex justify-content-end align-items-center">
                                          <button
                                            onClick={() =>
                                              togglePlayPause(item.id)
                                            }
                                          >
                                            {playingId === item.id ? (
                                              <i className="fa-solid fa-circle-pause" />
                                            ) : (
                                              <i class="fa-solid fa-circle-play"></i>
                                            )}
                                          </button>
                                        </div>
                                      </div>
                                    )}
                                  </>
                                ) : null}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {playground?.isShowCover &&
                  !startGame &&
                  !gameWon &&
                  showStartBtn && (
                    <div className="find-one-pair-game-cover">
                      <h4>{playground?.coverHeader}</h4>
                      <button
                        onClick={handleStart}
                        className="btn btn-dark"
                        style={{
                          backgroundColor: `${mainData?.struct?.colorTheme}`,
                        }}
                      >
                        {playground?.coverButtonText}
                      </button>
                    </div>
                  )}

                {nextFlip && matchedData?.description !== "" && (
                  <div className="find-one-pair-game-cover">
                    <div className="d-flex justify-content-center py-2">
                      <div
                        className="find-one-pair-game-win-images"
                        style={{
                          backgroundColor: `${matchedData?.firstImage?.bgColor}`,
                        }}
                      >
                        {matchedData?.firstImage?.cardType === "image" ? (
                          <img
                            src={matchedData?.firstImage?.src}
                            alt="imgaess"
                          />
                        ) : (
                          <p>{matchedData?.firstImage?.text}</p>
                        )}
                      </div>
                      <div
                        className="find-one-pair-game-win-images"
                        style={{
                          backgroundColor: `${matchedData?.secondImage?.bgColor}`,
                          color: `${matchedData?.secondImage?.color}`,
                        }}
                      >
                        {matchedData?.secondImage?.cardType === "image" ? (
                          <img
                            src={matchedData?.secondImage?.src}
                            alt="imgaess"
                          />
                        ) : (
                          <p>{matchedData?.secondImage?.text}</p>
                        )}
                      </div>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: matchedTitle }} />
                    <button
                      onClick={handleNext}
                      className="btn btn-outline-dark mt-2"
                    >
                      Next
                    </button>
                  </div>
                )}

                {(gameWon ||
                  (gameOver &&
                    mainData?.struct?.timerType?.value === "countdown")) && (
                    <>
                      {showLeadForm ? (
                        <LeadForm
                          data={data}
                          onSubmit={() => onSubmitForm()}
                        />
                      ) : (
                        <>
                          <div className="fine-one-pair-finalScreen pt-4">
                            <div className="fine-one-pair-finalScreen-img">
                              {gameOver ? (
                                <>
                                  {mainData?.struct?.timeIsUpScreen?.imageSrc && (
                                    <img
                                      src={
                                        mainData?.struct?.timeIsUpScreen?.imageSrc
                                      }
                                      alt="imagesss"
                                    />
                                  )}
                                </>
                              ) : (
                                <img src={finalScreen?.imageSrc} alt="imagesss" />
                              )}
                            </div>
                            <div className="fine-one-pair-finalScreen-text">
                              <h5>
                                {gameOver
                                  ? mainData?.struct?.timeIsUpScreen?.header
                                  : finalScreen?.header}
                              </h5>
                              <div
                                dangerouslySetInnerHTML={{ __html: finalDes }}
                              />

                              {!gameOver && mainData?.struct?.isActionButton && (
                                <a
                                  href={mainData?.struct?.actionButtonLink}
                                  style={{
                                    backgroundColor: `${mainData?.struct?.colorTheme}`,
                                  }}
                                  onClick={handleRestart}
                                  className="btn btn-outline-dark"
                                >
                                  {mainData?.struct?.actionButtonText}
                                </a>
                              )}

                              {!mainData?.struct?.isHideRestartButton && (
                                <button
                                  onClick={handleRestart}
                                  className="btn btn-outline-dark"
                                >
                                  Restart
                                </button>
                              )}
                            </div>

                            {!gameOver && mainData?.struct?.enableTimer && (
                              <div className="fine-one-pair-finalScreen-result">
                                {mainData?.struct?.enableStars &&
                                  starsTimeArray.map((item, i) =>
                                    item > timeTaken ? (
                                      <FaStar key={i} />
                                    ) : (
                                      <CiStar key={i} />
                                    )
                                  )}
                                <p className="m-0">
                                  Your result:{" "}
                                  {mainData?.struct?.timerType?.value ===
                                    "countdown"
                                    ? formattedTimeLeft
                                    : formattedTimeTaken}
                                  s
                                </p>
                              </div>
                            )}
                          </div>
                          {(mainData?.struct?.isShowRatingEmail ||
                            mainData?.struct?.isEnableRating) &&
                            !gameOver && (
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
                    </>
                  )}
              </div>
            </div>

            {approxvalue !== false && (
              <>
                {(mainData?.struct?.passwordList?.length > 0 ||
                  mainData?.struct?.isEnableRating) &&
                  !codeErrorShow &&
                  !startGame &&
                  showInputModal && (
                    <div
                      className="modal fade show d-block"
                      tabIndex="-1"
                      style={{
                        display: "mainData",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                      }}
                      role="dialog"
                    >
                      <div className="modal-dialog modal-md">
                        <div className="modal-content p-4">
                          <div className="modal-body text-start">
                            <h3 className="mb-4">Sign in to play</h3>
                          </div>
                          <div className="pt-2">
                            <form onSubmit={handleSubmit(onSubmit)}>
                              <div className="row py-3">
                                {mainData?.struct?.passwordList?.length > 0 && (
                                  <div className="col-12 mb-2">
                                    <lable className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                                      Your code
                                    </lable>
                                    <input
                                      className="answer-input form-control theme-control"
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
                                {mainData?.struct?.isEnableRating && (
                                  <div className="col-12 mb-2">
                                    <lable className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                                      Nickname
                                    </lable>
                                    <input
                                      className="answer-input form-control theme-control"
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
                                {mainData?.struct?.isShowRatingEmail &&
                                  mainData?.struct?.isEnableRating && (
                                    <div className="col-12 mb-2">
                                      <lable className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                                        Email
                                      </lable>
                                      <input
                                        className="answer-input form-control theme-control"
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
                                {mainData?.struct?.legalStatement !== "" &&
                                  mainData?.struct?.isEnableRating && (
                                    <div className="col-12 mb-2">
                                      <input
                                        type="checkbox"
                                        className="form-check-input theme-control shadow-none m-0"
                                        {...register("legalStatement")}
                                      />
                                      <label className="ps-2">
                                        {mainData?.struct?.legalStatement}
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

                {codeErrorShow && (
                  <div
                    className="modal fade show d-block"
                    tabIndex="-1"
                    style={{
                      display: "block",
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
                              backgroundColor: `${mainData?.struct?.colorTheme}`,
                              color: `#000`,
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
            )}
          </>
        </div>
      </div>
    </div>
  );
}

export default PreviewMemory;
