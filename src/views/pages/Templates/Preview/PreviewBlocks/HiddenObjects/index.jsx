import React, { useEffect, useRef, useState } from "react";
import "./hiddenObjects.css";
import moment from "moment";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

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
function PreviewHiddenObjects({
  data,
  isSelected,
  handleSelectBlock,
  handleDeleteBlock,
  handleEditModal,
}) {
  const blocks = data;
  const totalPins = blocks?.struct?.pins.slice(0, blocks?.struct?.count);
  const starsTimeArray = blocks?.struct?.starsTimeList
    .split(",")
    .map((item) => item.trim());

  const Schema = Yup.object().shape({
    email:
      blocks?.struct?.isShowRatingEmail && blocks?.struct?.isEnableRating
        ? Yup.string().required("This field is required")
        : Yup.string(),
    code:
      blocks?.struct?.passwordList?.length > 0
        ? Yup.string().required("This field is required")
        : Yup.string(),
    nickname: blocks?.struct?.isEnableRating
      ? Yup.string().required("This field is required")
      : Yup.string(),
    legalStatement:
      blocks?.legalStatement !== "" && blocks?.struct?.isEnableRating
        ? Yup.boolean().required("This field is required")
        : Yup.boolean(),
  });

  const editContainerRef = useRef(null);
  const containerRef = useRef(null);
  const [pins, setPins] = useState(totalPins);
  const [previewGame, setPreviewGame] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);

  const [startGame, setStartGame] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorMove, setCursorMove] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);
  const [matchedPins, setMatchedPins] = useState([]);
  const [gameWon, setGameWon] = useState(false);
  const [actionCount, setActionCount] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const [timeLeft, setTimeLeft] = useState(blocks?.struct?.countdownTime);
  const [pinPointData, setPinPointData] = useState({});
  const [showPinData, setShowPinData] = useState(false);
  const [codeErrorShow, setCodeErrorShow] = useState(false);
  const [showStartBtn, setShowStartBtn] = useState(blocks?.struct?.isShowCover);
  const [gameOver, setGameOver] = useState(false);
  const [showPassModal, setShowPassModal] = useState(false);
  const formattedTimeTaken = moment.utc(timeTaken * 1000).format("mm:ss");
  const formattedTimeLeft = moment.utc(timeLeft * 1000).format("mm:ss");
  const formOptions = { resolver: yupResolver(Schema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const handleMouseDown = (e, index) => {
    e.preventDefault();
    setDragging(true);
    setDraggedIndex(index);
  };

  const handleMouseUp = () => {
    if (!dragging) return;
    setDragging(false);
    setDraggedIndex(null);
  };

  const handleMouseMoveEdit = (e) => {
    if (!dragging || draggedIndex === null) return;

    const containerRect = editContainerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - containerRect.left;
    const mouseY = e.clientY - containerRect.top;

    const constrainedX = Math.min(
      Math.max(mouseX, 0),
      containerRect.width - blocks?.struct?.psize
    );
    const constrainedY = Math.min(
      Math.max(mouseY, 0),
      containerRect.height - blocks?.struct?.psize
    );

    if (draggedIndex !== -1 && draggedIndex < pins.length) {
      pins[draggedIndex].l = (constrainedX / containerRect.width) * 100;
      pins[draggedIndex].t = (constrainedY / containerRect.height) * 100;
      setPins([...pins]);
    }
  };

  const handleStartGame = () => {
    setShowStartBtn(false);
    setStartGame(true);
    setMatchedPins([]);
  };

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;

    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const relX = ((e.clientX - left) / width) * 100;
    const relY = ((e.clientY - top) / height) * 100;
    setCursorPos({ x: relX, y: relY });
    setCursorMove({ x: e.clientX - left, y: e.clientY - top });
  };

  const handleClickImg = () => {
    setStartGame(true);
    if (startGame) {
      setActionCount((prev) => prev + 1);
      const foundPin = pins.find(
        (pin) =>
          Math.abs(parseFloat(pin.l) - cursorPos.x) < 2 &&
          Math.abs(parseFloat(pin.t) - cursorPos.y) < 2
      );
      if (
        foundPin &&
        !matchedPins.some((p) => p.l === foundPin.l && p.t === foundPin.t)
      ) {
        setMatchedPins([...matchedPins, foundPin]);
      }

      if (foundPin !== undefined) {
        setPinPointData(foundPin);
      }
    }
  };

  const onSubmit = (data) => {
    if (blocks?.struct?.passwordList.length > 0) {
      if (blocks?.struct?.passwordList?.some((item) => item === data.code)) {
        if (blocks?.struct?.isShowCover) {
          setShowStartBtn(true);
        }
        setShowPassModal(false);
        reset();
      } else {
        setShowPassModal(false);
        setCodeErrorShow(true);
      }
    } else {
      if (blocks?.struct?.isShowCover) {
        setShowStartBtn(true);
      }
      setShowPassModal(false);
      reset();
    }
  };

  const handleRestartForm = () => {
    setShowStartBtn(false);
    setCodeErrorShow(false);
    setShowPassModal(true);
  };

  const handleClickPinBtn = () => {
    if (pinPointData?.blink !== "") {
      // navigate(`${pinPointData?.blink}`)
    } else {
      setShowPinData(false);
    }
  };

  const handleRestart = () => {
    setStartGame(false);
    setCursorPos({ x: 0, y: 0 });
    setShowCursor(false);
    setMatchedPins([]);
    setGameWon(false);
    setActionCount(0);
    setTimeTaken(0);
    setTimeLeft(blocks?.struct?.countdownTime);
    setPinPointData({});
    setShowPinData(false);
    setCodeErrorShow(false);
    setShowStartBtn(blocks?.struct?.isShowCover);
    setGameOver(false);
  };

  useEffect(() => {
    if (matchedPins.length === pins.length) {
      setTimeout(() => {
        setShowPinData(false);
        setGameWon(true);
      }, 2000);
    }
  }, [matchedPins, pins]);

  useEffect(() => {
    if (blocks?.struct?.enableTimer) {
      let interval;
      if (startGame && !gameWon && !showPinData) {
        interval = setInterval(() => {
          setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
          setTimeTaken((prev) => prev + 1);
        }, 1000);
      }
      return () => clearInterval(interval);
    }
  }, [startGame, gameWon, showPinData]);

  useEffect(() => {
    if (
      Object.keys(pinPointData).length > 0 &&
      (pinPointData?.blink !== "" ||
        // pinPointData?.btext !== "" ||
        pinPointData?.d !== "" ||
        pinPointData?.h !== "" ||
        pinPointData?.i !== "")
    ) {
      setShowPinData(true);
    }
  }, [pinPointData]);

  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", handleMouseMoveEdit);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMoveEdit);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMoveEdit);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  useEffect(() => {
    if (
      blocks?.struct?.timerType?.value === "countdown" &&
      blocks?.struct?.enableTimer
    ) {
      if (timeLeft === 0) {
        setGameOver(true);
      }
    }
  }, [timeLeft, blocks, data]);

  useEffect(() => {
    if (
      blocks?.struct?.passwordList?.length > 0 ||
      blocks?.struct?.isEnableRating
    ) {
      setShowPassModal(true);
    }
  }, []);
  return (
    <div style={{ fontSize: "unset" }} className={"block-builder"}>
      <div className="game_mainParent">
        <div className="">
          <>
            {!gameOver && !gameWon && (
              <>
                {blocks?.enableTimer && (
                  <div className="find-one-pair-actions">
                    <div className="d-flex justify-content-between">
                      <p className="m-0">
                        Number of actions : <span>{actionCount}</span>
                      </p>
                      <p className="m-0">
                        {blocks?.struct?.timerType?.value === "countdown"
                          ? formattedTimeLeft
                          : formattedTimeTaken}
                      </p>
                    </div>
                  </div>
                )}

                <div className="hidden-objects pt-4">
                  <div
                    ref={containerRef}
                    className="hidden-objects-img"
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setShowCursor(true)}
                    onMouseLeave={() => setShowCursor(false)}
                    onClick={handleClickImg}
                    // style={{ cursor: showCursor ? "none" : "default" }}
                  >
                    <img src={blocks?.struct?.bimg} alt="imagesssss" />
                    {showCursor && (
                      <div
                        className="custom-cursor"
                        style={{
                          position: "absolute",
                          top: `${cursorMove.y}px`,
                          left: `${cursorMove.x}px`,
                          width: "30px",
                          height: "30px",
                          background:
                            "url('../images/zoom-lens.png') no-repeat center/contain",
                          pointerEvents: "none",
                          transform: "translate(-50%, -50%)",
                        }}
                      />
                    )}

                    {matchedPins.map((pin, index) =>
                      blocks?.pimg !== "" ? (
                        <img
                          key={index}
                          src={pin?.i}
                          alt="matched"
                          style={{
                            position: "absolute",
                            left: `${pin.l}%`,
                            top: `${pin.t}%`,
                            transform: "translate(-50%, -50%)",
                            width: `${blocks?.struct?.psize}px`,
                            height: `${blocks?.struct?.psize}px`,
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            position: "absolute",
                            left: `${pin.l}%`,
                            top: `${pin.t}%`,
                            transform: "translate(-50%, -50%)",
                            width: `${blocks?.struct?.psize}px`,
                            height: `${blocks?.struct?.psize}px`,
                            backgroundColor: `${blocks?.struct?.pcl}`,
                          }}
                          className="hidden-object-marker-pin"
                        ></div>
                      )
                    )}
                  </div>
                </div>
              </>
            )}

            {(gameOver || gameWon) && (
              <>
                <div className="hidden-objects-final-screen">
                  <div className="hidden-objects-final-screen-img">
                    {gameOver &&
                    blocks?.struct?.timeIsUpScreen?.imageSrc !== "" ? (
                      <img
                        src={blocks?.struct?.timeIsUpScreen?.imageSrc}
                        alt="imagesss"
                      />
                    ) : (
                      <div style={{ height: "300px" }}></div>
                    )}
                    {gameWon && blocks?.struct?.sucImg !== "" ? (
                      <img src={blocks?.struct?.sucImg} alt="tag" />
                    ) : (
                      <div style={{ height: "300px" }}></div>
                    )}
                  </div>
                  <div className="hidden-objects-final-screen-content">
                    <h4>
                      {gameOver
                        ? blocks?.struct?.timeIsUpScreen?.header
                        : blocks?.struct?.suct}
                    </h4>
                    <p>
                      {gameOver
                        ? blocks?.struct?.timeIsUpScreen?.description
                        : blocks?.struct?.sucd}
                    </p>
                    {!gameOver &&
                      blocks?.struct?.isActionButton &&
                      blocks?.struct?.sucBtext !== "" && (
                        <button
                          // link to {blocks?.sucBlink}
                          className="btn btn-outline-dark"
                          style={{
                            backgroundColor: `${blocks?.struct?.pcl}`,
                            color: `${blocks?.struct?.btcolor}`,
                          }}
                        >
                          {blocks?.struct?.sucBtext}
                        </button>
                      )}
                    {!blocks?.struct?.isHideRestartButton && (
                      <button
                        onClick={handleRestart}
                        className="btn btn-outline-dark"
                      >
                        Restart
                      </button>
                    )}
                  </div>
                  {!gameOver && blocks?.struct?.enableTimer && (
                    <div className="fine-one-pair-finalScreen-result">
                      {blocks?.struct?.enableStars &&
                        starsTimeArray.map((item, i) =>
                          item > timeTaken ? (
                            <FaStar key={i} />
                          ) : (
                            <CiStar key={i} />
                          )
                        )}
                      <p className="m-0">
                        Your result:{" "}
                        {blocks?.struct?.timerType?.value === "countdown"
                          ? formattedTimeLeft
                          : formattedTimeTaken}
                        s
                      </p>
                    </div>
                  )}
                </div>
                {(blocks?.struct?.isShowRatingEmail ||
                  blocks?.struct?.isEnableRating) &&
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

                {blocks?.struct?.isShowLeadForm && <p>LeadForm</p>}
              </>
            )}

            {(blocks?.struct?.passwordList?.length > 0 ||
              blocks?.struct?.isEnableRating) &&
              showPassModal &&
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
                  <div className="modal-dialog modal-md">
                    <div className="modal-content p-4">
                      <div className="modal-body text-start">
                        <h3 className="mb-4">Sign in to play</h3>
                      </div>
                      <div className="pt-2">
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <div className="row py-3">
                            {blocks?.struct?.passwordList?.length > 0 && (
                              <div className="col-12 mb-2">
                                <lable className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">Your code</lable>
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
                            {blocks?.struct?.isEnableRating && (
                              <div className="col-12 mb-2">
                                <lable className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">Nickname</lable>
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
                            {blocks?.struct?.isShowRatingEmail &&
                              blocks?.struct?.isEnableRating && (
                                <div className="col-12 mb-2">
                                  <lable className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">Email</lable>
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
                            {blocks?.struct?.legalStatement !== "" &&
                              blocks?.struct?.isEnableRating && (
                                <div className="col-12 mb-2">
                                  <input
                                  className="form-check-input theme-control shadow-none m-0"
                                    type="checkbox"
                                    {...register("legalStatement")}
                                  />
                                  <label className="ps-2">
                                    {blocks?.struct?.legalStatement}
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
                      <h4>{blocks?.struct?.coverHeader}</h4>
                      <button
                        onClick={handleStartGame}
                        className="btn btn-primary"
                        style={{
                          backgroundColor: `${blocks?.struct?.pcl}`,
                          color: `${blocks?.struct?.btcolor}`,
                        }}
                      >
                        {blocks?.struct?.coverBtnText}
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
                        style={{
                          backgroundColor: `${blocks?.struct?.pcl}`,
                          color: `${blocks?.struct?.btcolor}`,
                        }}
                      >
                        Restart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {showPinData && (
              <div
                className="modal fade show d-block"
                tabIndex="-1"
                style={{
                  display: "block",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
                role="dialog"
              >
                <div className="modal-dialog modal-sm modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-body text-center p-0">
                      <div className="hidden-objects-popup">
                        {pinPointData?.i !== "" && (
                          <div className="hidden-objects-pinData-img">
                            <img src={pinPointData?.i} className="w-100" alt="imgggg" />
                          </div>
                        )}
                        <div className="p-4">
                        {pinPointData?.h !== "" && <h4>{pinPointData?.h}</h4>}
                        {pinPointData?.d !== "" && <p>{pinPointData?.d}</p>}
                          <div className="d-flex align-items-center gap-3 justify-content-center">
                          {pinPointData?.btext !== "" && (
                            <button
                              onClick={handleClickPinBtn}
                              style={{
                                backgroundColor: `${blocks?.struct?.pcl}`,
                                color: `${blocks?.struct?.btcolor}`,
                              }}
                              className="btn btn-outline-dark"
                            >
                              {pinPointData?.btext}
                            </button>
                          )}
                          <button
                            onClick={() => setShowPinData(false)}
                            className="btn btn-outline-primary"
                          >
                            Close
                          </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        </div>
      </div>
    </div>
  );
}

export default PreviewHiddenObjects;
