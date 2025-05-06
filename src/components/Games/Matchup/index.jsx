import React, { useEffect, useRef, useState } from "react";
import "./matchUp.css";
import moment from "moment";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

function MatchUp({
  data,
  isSelected,
  handleSelectBlock,
  isFirst,
  isLast,
  handleDeleteBlock,
  handleEditModal,
  setShowTemplatePreview,
  handleMoveDown,
  handleMoveUp,
  cloneblock,
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

  const block = data;
  const pairs = block?.struct?.pairs?.pairList;
  const finalScreen = block?.struct?.finalScreen;

  const Schema = Yup.object().shape({
    email:
      block?.struct?.isShowRatingEmail && block?.struct?.isEnableRating
        ? Yup.string().required("This field is required")
        : Yup.string(),
    code:
      block?.struct?.passwordList?.length > 0
        ? Yup.string().required("This field is required")
        : Yup.string(),
    nickname: block?.struct?.isEnableRating
      ? Yup.string().required("This field is required")
      : Yup.string(),
    legalStatement:
      block?.struct?.legalStatement !== "" && block?.struct?.isEnableRating
        ? Yup.boolean().required("This field is required")
        : Yup.boolean(),
  });

  const [shuffledFirst, setShuffledFirst] = useState([]);
  const [shuffledSecond, setShuffledSecond] = useState([]);
  const [timeTaken, setTimeTaken] = useState(0);
  const [timeLeft, setTimeLeft] = useState(block?.struct?.countdownTime);
  const [actionCount, setActionCount] = useState(0);
  const [showStartBtn, setShowStartBtn] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [codeErrorShow, setCodeErrorShow] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [selectedNameId, setSelectedNameId] = useState(null);
  const [gameWon, setGameWon] = useState(false);
  const [wrongMatch, setWrongMatch] = useState(false);
  const [playingId, setPlayingId] = useState(null);
  const audioRefs = useRef({});

  const formattedTimeTaken = moment.utc(timeTaken * 1000).format("mm:ss");
  const formattedTimeLeft = moment.utc(timeLeft * 1000).format("mm:ss");
  const starsTimeArray = block?.struct?.starsTimeList
    .split(",")
    .map((item) => item.trim());

  const formOptions = { resolver: yupResolver(Schema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const shuffleArray = (arr) => {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
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

  const onSubmit = (data) => {
    if (block?.struct?.passwordList.length > 0) {
      if (block?.struct?.passwordList?.some((item) => item === data.code)) {
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

  const handleRestartForm = () => {
    setShowStartBtn(false);
    setCodeErrorShow(false);
  };

  const handleStartGame = () => {
    setStartGame(true);
    setShowStartBtn(false);
  };

  const handleClickName = (id) => {
    setSelectedNameId(id);
  };

  const handleClickBox = (imageId) => {
    setActionCount((prev) => prev + 1);
    if (selectedNameId) {
      setShuffledSecond((prev) =>
        prev.map((item) =>
          item.id === imageId && !item.pairId
            ? { ...item, pairId: selectedNameId }
            : item
        )
      );
      setSelectedNameId(null);
    }
  };

  const handleRemoveMatch = (imageId) => {
    setActionCount((prev) => prev + 1);
    setShuffledSecond((prev) =>
      prev.map((item) =>
        item.id === imageId ? { ...item, pairId: null } : item
      )
    );
  };

  const handleDragStart = (e, itemId, type) => {
    e.dataTransfer.setData("itemId", itemId);
    e.dataTransfer.setData("type", type);
  };

  const handleDrop = (e, targetId, type) => {
    e.preventDefault();
    const draggedItemId = e.dataTransfer.getData("itemId");
    const draggedType = e.dataTransfer.getData("type");

    if (!draggedItemId) return;

    setActionCount((prev) => prev + 1);

    if (draggedType === "name" && type === "image") {
      setShuffledSecond((prev) =>
        prev.map((item) => {
          if (item.pairId === draggedItemId) {
            return { ...item, pairId: null };
          }

          if (
            draggedType === "name" &&
            type === "image" &&
            item.id === targetId &&
            !item.pairId
          ) {
            return { ...item, pairId: draggedItemId };
          }

          return item;
        })
      );
    } else if (draggedType === "name" && type === "name") {
      setShuffledSecond((prev) =>
        prev.map((item) =>
          item.pairId === draggedItemId ? { ...item, pairId: null } : item
        )
      );
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleRestart = () => {
    setShuffledFirst([]);
    setShuffledSecond([]);
    setTimeTaken(0);
    setTimeLeft(block?.struct?.countdownTime);
    setActionCount(0);
    setShowStartBtn(false);
    setStartGame(false);
    setCodeErrorShow(false);
    setGameOver(false);
    setSelectedNameId(null);
    setGameWon(false);
    setWrongMatch(false);
    cardShuffle();
    if (
      block?.struct?.passwordList?.length === 0 &&
      !block?.struct?.isEnableRating
    ) {
      setShowStartBtn(true);
    }
  };

  const firstImage = pairs?.map((item) => ({
    id: item.id,
    description: item.description,
    firstImage: item.firstImage,
  }));
  const secondImage = pairs?.map((item) => ({
    id: item.id,
    description: item.description,
    firstImage: item.secondImage,
    pairId: null,
  }));

  const cardShuffle = () => {
    if (block?.struct?.shuffleCards) {
      setShuffledFirst(shuffleArray(firstImage));
      setShuffledSecond(shuffleArray(secondImage));
    } else {
      setShuffledFirst(shuffleArray(firstImage));
      setShuffledSecond(secondImage);
    }
  };

  useEffect(() => {
    cardShuffle();
  }, []);

  useEffect(() => {
    let interval;

    if (startGame && !gameWon) {
      interval = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        setTimeTaken((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [startGame, gameWon]);

  useEffect(() => {
    if (block?.struct?.timerType?.value === "countdown" && block?.enableTimer) {
      if (timeLeft === 0) {
        setGameOver(true);
      }
    }
  }, [timeLeft, block]);

  useEffect(() => {
    if (
      block?.struct?.passwordList?.length === 0 &&
      !block?.struct?.isEnableRating
    ) {
      setShowStartBtn(true);
    }
    if (!block?.struct?.enableTimer) {
      setShowStartBtn(false);
      setStartGame(true);
    }
  }, []);

  useEffect(() => {
    const allCardsPlaced = shuffledSecond.every((item) => item.pairId !== null);

    if (allCardsPlaced) {
      const correctCount = shuffledSecond.filter(
        (item) => item.pairId === item.id
      ).length;

      if (correctCount === shuffledSecond.length) {
        setGameWon(true);
        setWrongMatch(false);
      } else {
        setGameWon(false);
        setWrongMatch(true);
      }
    } else {
      setGameWon(false);
      setWrongMatch(false);
    }
  }, [shuffledSecond]);

  return (
    <div
      style={{ fontSize: "unset" }}
      className={isSelected ? "block-builder selected" : "block-builder"}
      onClick={() => handleSelectBlock("matchup", data)}
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
            onClick={() => handleEditModal("matchup", data?.id)}
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
            <div className="container py-4">
              {!gameOver && !gameWon && (
                <>
                  {block?.struct?.enableTimer && (
                    <div className="find-one-pair-actions">
                      <div className="d-flex justify-content-between">
                        <p className="m-0">
                          Number of actions : <span>{actionCount}</span>
                        </p>
                        <p className="m-0">
                          {block?.struct?.timerType?.value === "countdown"
                            ? formattedTimeLeft
                            : formattedTimeTaken}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="row d-flex justify-content-center mt-4">
                    <div className="col-lg-12">
                      <div className="d-flex align-items-center flex-wrap gap-2 justify-content-center">
                        {shuffledFirst.map((item) => (
                          <div key={item.id}>
                            {shuffledSecond.some(
                              (pair) => pair.pairId === item.id
                            ) ? (
                              <div
                                className="black-name-card"
                                style={{
                                  backgroundColor: `${item?.firstImage?.bgColor}`,
                                }}
                                onClick={() =>
                                  handleRemoveMatch(
                                    shuffledSecond.find(
                                      (pair) => pair.pairId === item.id
                                    )?.id
                                  )
                                }
                                onDrop={(e) => handleDrop(e, null, "name")}
                                onDragOver={handleDragOver}
                              ></div>
                            ) : !startGame ? (
                              <div
                                role="button"
                                className="matchup-name"
                                style={{
                                  backgroundColor: `${block?.struct?.colorTheme}`,
                                }}
                              >
                                <h5
                                  className="m-0"
                                  style={{
                                    color: `${block?.struct?.color ? block?.struct?.color : "#000"}`,
                                  }}
                                >
                                  ?
                                </h5>
                              </div>
                            ) : (
                              <div
                                role="button"
                                className={
                                  item?.firstImage?.cardType === "text"
                                    ? "matchup-name"
                                    : "matchup-image"
                                }
                                style={{
                                  backgroundColor: `${item?.firstImage?.bgColor}`,
                                }}
                                onClick={() => handleClickName(item.id)}
                                draggable
                                onDragStart={(e) =>
                                  handleDragStart(e, item.id, "name")
                                }
                                onDrop={(e) => handleDrop(e, item.id, "name")}
                                onDragOver={handleDragOver}
                              >
                                {item?.firstImage?.cardType === "image" && (
                                  <img
                                    src={item?.firstImage?.src}
                                    alt={item.firstImage.text}
                                  />
                                )}
                                {item?.firstImage?.cardType === "text" && (
                                  <h5
                                    className="m-0"
                                    style={{
                                      color: `${item?.firstImage?.color}`,
                                    }}
                                  >
                                    {item.firstImage.text}
                                  </h5>
                                )}
                                {item?.firstImage?.cardType === "audio" && (
                                  <div
                                    className="matchup-image-audio"
                                    style={{
                                      backgroundColor: `${block?.struct?.colorTheme}`,
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
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-2 flex-wrap justify-content-center mt-4">
                    {shuffledSecond.map((item) => (
                      <div
                        key={item.id}
                        className="matchup-name-image p-2 bg-white shadow rounded-3"
                      >
                        <div className="d-flex align-items-center gap-2">
                          {item.pairId ? (
                            <div
                              role="button"
                              className={`${
                                shuffledFirst.map(
                                  (item) => item.firstImage.cardType === "image"
                                )
                                  ? "matchup-image"
                                  : "matchup-name"
                              }
                            ${wrongMatch && !gameWon ? "shake-animation" : ""}
                        `}
                              style={{
                                backgroundColor: `${shuffledFirst[0]?.firstImage?.bgColor}`,
                              }}
                              draggable
                              onDragStart={(e) =>
                                handleDragStart(e, item.pairId, "name")
                              }
                              onDrop={(e) => handleDrop(e, item.id, "name")}
                              onDragOver={handleDragOver}
                              onClick={() => handleRemoveMatch(item.id)}
                            >
                              {shuffledFirst.some(
                                (item) => item?.firstImage?.cardType === "image"
                              ) && (
                                <img
                                  src={
                                    shuffledFirst.find(
                                      (pair) => pair.id === item.pairId
                                    )?.firstImage?.src
                                  }
                                  alt={
                                    shuffledFirst.find(
                                      (pair) => pair.id === item.pairId
                                    )?.firstImage?.text
                                  }
                                />
                              )}
                              {shuffledFirst.some(
                                (item) => item?.firstImage?.cardType === "text"
                              ) && (
                                <h5
                                  className="m-0"
                                  style={{
                                    color: `${shuffledFirst[0]?.firstImage?.color}`,
                                  }}
                                >
                                  {
                                    shuffledFirst.find(
                                      (pair) => pair.id === item.pairId
                                    )?.firstImage?.text
                                  }
                                </h5>
                              )}
                              {shuffledFirst.some(
                                (item) => item?.firstImage?.cardType === "audio"
                              ) && (
                                <div
                                  className="matchup-image-audio"
                                  style={{
                                    backgroundColor: `${block?.struct?.colorTheme}`,
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
                            <div
                              role="button"
                              className={`matchup-blank ${
                                selectedNameId !== null ? "active" : ""
                              }`}
                              onClick={() => handleClickBox(item.id)}
                              onDrop={(e) => handleDrop(e, item.id, "image")}
                              onDragOver={handleDragOver}
                            ></div>
                          )}
                          <div
                            style={{
                              backgroundColor: `${
                                item?.firstImage?.cardType === "text"
                                  ? item?.firstImage?.bgColor
                                  : ""
                              }`,
                              color: `${
                                item?.firstImage?.cardType === "text"
                                  ? item?.firstImage?.color
                                  : ""
                              }`,
                            }}
                            className={`matchup-image ${
                              wrongMatch && !gameWon ? "shake-animation" : ""
                            }`}
                          >
                            {item?.firstImage?.cardType === "text" && (
                              <h5>{item?.firstImage?.text}</h5>
                            )}
                            {item?.firstImage?.cardType === "image" && (
                              <img src={item?.firstImage?.src} alt={item.id} />
                            )}
                            {item?.firstImage?.cardType === "audio" && (
                              <div
                                className="matchup-image-audio"
                                style={{
                                  backgroundColor: `${block?.struct?.colorTheme}`,
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
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {(gameWon || gameOver) && (
                <>
                  <div className="fine-one-pair-finalScreen pt-4">
                    <div className="fine-one-pair-finalScreen-img">
                      {gameOver ? (
                        block?.struct?.timeIsUpScreen?.imageSrc ? (
                          <img
                            src={block?.struct?.timeIsUpScreen?.imageSrc}
                            alt="imagesss"
                          />
                        ) : (
                          <div style={{ height: "300px" }}></div>
                        )
                      ) : (
                        <img src={finalScreen?.imageSrc} alt="imagesss" />
                      )}
                    </div>

                    <div className="finalScreenBlock">
                      {!gameOver && block?.struct?.enableTimer && (
                        <div className="fine-one-pair-finalScreen-result">
                          {block?.struct?.enableStars &&
                            starsTimeArray.map((item, i) =>
                              item > timeTaken ? (
                                <FaStar key={i} />
                              ) : (
                                <CiStar key={i} />
                              )
                            )}
                          <p className="m-0">
                            Your result:{" "}
                            {block?.struct?.timerType?.value === "countdown"
                              ? formattedTimeLeft
                              : formattedTimeTaken}
                            s
                          </p>
                        </div>
                      )}
                      <div className="fine-one-pair-finalScreen-text">
                        <h5>
                          {gameOver
                            ? block?.struct?.timeIsUpScreen?.header
                            : finalScreen?.header}
                        </h5>
                        <p>
                          {gameOver
                            ? block?.struct?.timeIsUpScreen?.description
                            : finalScreen?.description}
                        </p>

                        {!gameOver && block?.struct?.isActionButton && (
                          <a
                            href={block?.struct?.actionButtonLink}
                            style={{
                              backgroundColor: `${block?.struct?.colorTheme}`,
                            }}
                            onClick={handleRestart}
                            className="btn btn-outline-dark"
                          >
                            {block?.struct?.struct?.actionButtonText}
                          </a>
                        )}

                        {!block?.struct?.isHideRestartButton && (
                          <button
                            onClick={handleRestart}
                            className="btn btn-outline-dark"
                          >
                            Restart
                          </button>
                        )}
                      </div>
                    </div>

                  </div>
                  {block?.struct?.isShowLeadForm && <p>LeadForm</p>}
                </>
              )}
            </div>

            {(block?.struct?.passwordList?.length > 0 ||
              block?.struct?.isEnableRating) &&
              !codeErrorShow &&
              !showStartBtn &&
              !startGame && (
                <div
                  className="modal fade show d-block"
                  tabIndex="-1"
                  style={{
                    display: "block",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                  }}
                  role="dialog"
                >
                  <div className="modal-dialog modal-md modal-dialog-centered">
                    <div className="modal-content p-4">
                      <div className="text-start">
                        <h3 className="mb-4">Sign in to play</h3>
                      </div>
                      <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <div className="row py-3">
                            {block?.struct?.passwordList?.length > 0 && (
                              <div className="col-12 mb-2">
                                <lable className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                                  Your code
                                </lable>
                                <input
                                  style={{ border: `1px solid gray` }}
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
                            {block?.struct?.isEnableRating && (
                              <div className="col-12 mb-2">
                                <lable className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                                  Nickname
                                </lable>
                                <input
                                  style={{ border: `1px solid gray` }}
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
                            {block?.struct?.isShowRatingEmail &&
                              block?.struct?.isEnableRating && (
                                <div className="col-12 mb-2">
                                  <lable className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                                    Email
                                  </lable>
                                  <input
                                    style={{ border: `1px solid gray` }}
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
                            {block?.struct?.legalStatement !== "" &&
                              block?.struct?.isEnableRating && (
                                <div className="col-12 mb-2">
                                  <input
                                    type="checkbox"
                                    className="form-check-input theme-control shadow-none m-0"
                                    {...register("legalStatement")}
                                  />
                                  <label className="ps-2">
                                    {block?.struct?.legalStatement}
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
                  display: "block",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
                role="dialog"
              >
                <div className="modal-dialog modal-sm">
                  <div className="modal-content p-4">
                    <div className="modal-body text-center">
                      <button
                        onClick={handleStartGame}
                        className="btn btn-primary"
                        style={{
                          backgroundColor: `${block?.struct?.colorTheme}`,
                          color: "#000",
                        }}
                      >
                        Start
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

export default MatchUp;
