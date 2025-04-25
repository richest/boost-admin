import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
// import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
// import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

function PreviewPuzzle({
  data,
  isSelected,
  handleSelectBlock,
  handleDeleteBlock,
  handleEditModal,
}) {
  const { templateDetails } = useSelector((state) => state.DrawerReducer);

  const FormValues = data?.struct?.leadFormStruct?.form;
  const gameData = data?.struct?.playground;
  const gridSize = parseInt(gameData.layout.label.split("x")[0], 10);
  const EnableTimer = data?.struct?.enableTimer;
  const totalTiles = gridSize * gridSize;
  const maxSideTiles = (gridSize / 2) * gridSize;
  const imageUrl = gameData.image;
  console.log(imageUrl, "ioioioioiooioi");
  const StarsData = data?.struct;
  console.log(StarsData, "StarsDataStarsData");
  const starsTimeArray = StarsData?.starsTimeList
    .split(",")
    .map((item) => item.trim());
  const DialogueInfo = data?.struct;
  const TimeISUP = data?.struct?.timeIsUpScreen;
  const DialogueButtonColorandBorder = data?.struct?.colorTheme;
  console.log(
    DialogueButtonColorandBorder,
    "DialogueButtonColorandBorderDialogueButtonColorandBorder"
  );
  // After generating tiles with generateTiles():
  const generateTiles = () => {
    let shuffledTiles = Array.from({ length: totalTiles }, (_, index) => ({
      id: index + 1,
      backgroundPosition: `${-((index % gridSize) * 100)}px ${-(
        Math.floor(index / gridSize) * 100
      )}px`,
    })).sort(() => Math.random() - 0.5);

    return {
      left: shuffledTiles.slice(0, maxSideTiles),
      right: shuffledTiles.slice(maxSideTiles, maxSideTiles * 2),
    };
  };
  const { left, right } = generateTiles();

  // Create fixed arrays
  const initialLeftDisplay = Array(maxSideTiles).fill(null);
  for (let i = 0; i < left.length; i++) {
    initialLeftDisplay[i] = left[i];
  }

  const initialRightDisplay = Array(maxSideTiles).fill(null);
  for (let i = 0; i < right.length; i++) {
    initialRightDisplay[i] = right[i];
  }

  // Use these arrays in state:
  const [leftTiles, setLeftTiles] = useState(initialLeftDisplay);
  const [rightTiles, setRightTiles] = useState(initialRightDisplay);

  // Puzzle game state variables...
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordAccess, setPasswordAccess] = useState(false);
  const [passwordWrong, setPasswordWrong] = useState(false);
  const [checkbox, setCheckbox] = useState(false);
  const [errors, setErrors] = useState({});
  const [isWinner, setIsWinner] = useState(false);
  const [isGridFull, setIsGridFull] = useState(false);
  const [moves, setMoves] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const [timeLeft, setTimeLeft] = useState(data?.struct?.countdownTime);
  const [formData, setFormData] = useState({
    password: "",
    ...FormValues?.fields?.reduce((acc, field) => {
      acc[field.key] = "";
      return acc;
    }, {}),
  });

  const [placedTiles, setPlacedTiles] = useState(Array(totalTiles).fill(null));
  // const [placedTiles, setPlacedTiles] = useState([
  //     { backgroundPosition: "center" }, // This ensures the full image appears initially
  // ]);
  const CoverValue = data?.struct?.playground;
  const [draggedTile, setDraggedTile] = useState(null);
  const [showCoverModel, setshowCoverModel] = useState(CoverValue.isShowCover);
  const [source, setSource] = useState(null);
  const [showRegister, seshowRegister] = useState(false);
  const [incorrectTiles, setIncorrectTiles] = useState([]);

  // Multi-password modal state and handlers
  const [inputPassword, setInputPassword] = useState("");
  const [activePasswords, setActivePasswords] = useState([]);
  const [timeIsUp, setimeIsUp] = useState(false);

  const handleAddPassword = () => {
    if (inputPassword.trim() !== "") {
      setActivePasswords([...activePasswords, inputPassword.trim()]);
      setInputPassword("");
    }
  };

  const handleClearAll = () => {
    setActivePasswords([]);
  };

  // Check win condition whenever placedTiles updates
  useEffect(() => {
    checkWinCondition();
  }, [placedTiles]);

  const handleDragStart = (tile, from) => {
    setDraggedTile(tile);
    setSource(from);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    console.log("handleSubmit:", e);
    e.preventDefault();
    const passwordList = data?.struct?.passwordList;
    let newErrors = {};

    // Validate "Your Code" field if needed
    if (passwordList && passwordList.length > 0) {
      if (!formData.password.trim()) {
        newErrors.password = "Your Code is required";
      } else if (!passwordList.includes(formData.password)) {
        newErrors.password = "Incorrect password";
        setPasswordWrong(true);
      }
    }

    // Validate dynamic fields
    FormValues?.fields?.forEach((field) => {
      if (field.isRequired && !formData[field.key].trim()) {
        newErrors[field.key] = `${field.label} is required`;
      }
    });

    // Validate checkbox
    if (!checkbox) {
      newErrors.checkbox = "You must agree to the terms";
    }

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
    } else {
      setErrors({});
      seshowRegister(false);
      console.log("Form submitted", formData);
    }
  };
  const handleDrop = (index, target) => {
    if (!draggedTile) return;

    // Clone the arrays
    const updatedLeftTiles = [...leftTiles];
    const updatedRightTiles = [...rightTiles];
    const updatedPlacedTiles = [...placedTiles];

    let placedSuccessfully = false; // Track if the image was placed in a valid spot

    if (target === "center") {
      if (!updatedPlacedTiles[index]) {
        if (source === "left") {
          const srcIndex = updatedLeftTiles.findIndex(
            (t) => t && t.id === draggedTile.id
          );
          if (srcIndex !== -1) updatedLeftTiles[srcIndex] = null;
        } else if (source === "right") {
          const srcIndex = updatedRightTiles.findIndex(
            (t) => t && t.id === draggedTile.id
          );
          if (srcIndex !== -1) updatedRightTiles[srcIndex] = null;
        } else if (source === "center") {
          const srcIndex = updatedPlacedTiles.findIndex(
            (t) => t && t.id === draggedTile.id
          );
          if (srcIndex !== -1) updatedPlacedTiles[srcIndex] = null;
        }

        updatedPlacedTiles[index] = draggedTile;
        placedSuccessfully = true;
      }
    } else if (target === "left") {
      if (source === "left") {
        const srcIndex = updatedLeftTiles.findIndex(
          (t) => t && t.id === draggedTile.id
        );
        if (index !== null && index !== undefined && srcIndex !== -1) {
          const temp = updatedLeftTiles[index];
          updatedLeftTiles[index] = draggedTile;
          updatedLeftTiles[srcIndex] = temp;
          placedSuccessfully = true;
        }
      } else {
        if (source === "center") {
          const srcIndex = updatedPlacedTiles.findIndex(
            (t) => t && t.id === draggedTile.id
          );
          if (srcIndex !== -1) updatedPlacedTiles[srcIndex] = null;
        } else if (source === "right") {
          const srcIndex = updatedRightTiles.findIndex(
            (t) => t && t.id === draggedTile.id
          );
          if (srcIndex !== -1) updatedRightTiles[srcIndex] = null;
        }
        const emptySlot = updatedLeftTiles.findIndex((slot) => slot === null);
        if (emptySlot !== -1) {
          updatedLeftTiles[emptySlot] = draggedTile;
          placedSuccessfully = true;
        }
      }
    } else if (target === "right") {
      if (source === "right") {
        const srcIndex = updatedRightTiles.findIndex(
          (t) => t && t.id === draggedTile.id
        );
        if (index !== null && index !== undefined && srcIndex !== -1) {
          const temp = updatedRightTiles[index];
          updatedRightTiles[index] = draggedTile;
          updatedRightTiles[srcIndex] = temp;
          placedSuccessfully = true;
        }
      } else {
        if (source === "center") {
          const srcIndex = updatedPlacedTiles.findIndex(
            (t) => t && t.id === draggedTile.id
          );
          if (srcIndex !== -1) updatedPlacedTiles[srcIndex] = null;
        } else if (source === "left") {
          const srcIndex = updatedLeftTiles.findIndex(
            (t) => t && t.id === draggedTile.id
          );
          if (srcIndex !== -1) updatedLeftTiles[srcIndex] = null;
        }

        const emptySlot = updatedRightTiles.findIndex((slot) => slot === null);
        if (emptySlot !== -1) {
          updatedRightTiles[emptySlot] = draggedTile;
          placedSuccessfully = true;
        }
      }
    }
    if (placedSuccessfully) {
      setMoves((prevCount) => prevCount + 1);
      setStartGame(true);
    }

    // If placement was not successful, revert the tile back to its original position
    if (!placedSuccessfully) {
      if (source === "left") {
        const srcIndex = updatedLeftTiles.findIndex(
          (t) => t && t.id === draggedTile.id
        );
        if (srcIndex === -1) {
          const emptySlot = updatedLeftTiles.findIndex((slot) => slot === null);
          if (emptySlot !== -1) updatedLeftTiles[emptySlot] = draggedTile;
        }
      } else if (source === "right") {
        const srcIndex = updatedRightTiles.findIndex(
          (t) => t && t.id === draggedTile.id
        );
        if (srcIndex === -1) {
          const emptySlot = updatedRightTiles.findIndex(
            (slot) => slot === null
          );
          if (emptySlot !== -1) updatedRightTiles[emptySlot] = draggedTile;
        }
      }
    }

    // Update the state arrays
    setLeftTiles(updatedLeftTiles);
    setRightTiles(updatedRightTiles);
    setPlacedTiles(updatedPlacedTiles);
    setDraggedTile(null);
    setSource(null);
  };

  // Win condition: every slot in placedTiles is non-null and tile.id === index + 1
  // Create a solution array when the game starts:
  const solution = Array.from({ length: totalTiles }, (_, index) => index + 1);

  const checkWinCondition = () => {
    console.log("Checking win condition...");

    // Create current order from placedTiles
    const currentOrder = placedTiles.map((tile) => (tile ? tile.id : null));
    console.log("Current Order:", currentOrder);

    // Expected solution: for example, tile id should be index + 1
    const solution = Array.from(
      { length: totalTiles },
      (_, index) => index + 1
    );
    console.log("Expected Order:", solution);

    // Create an array where each entry is true if the tile at that index is incorrect
    const incorrect = currentOrder.map(
      (tileId, index) => tileId !== solution[index]
    );

    // Update state that holds which positions are incorrect (for highlighting)
    setIncorrectTiles(incorrect);

    // Determine if all tiles are correct
    const isComplete = incorrect.every((isWrong) => !isWrong);
    console.log("Is win condition met?", isComplete);
    if (isComplete) {
      setIsWinner(true);
    }
  };

  useEffect(() => {
    // When placedTiles changes, check if the grid is full
    const full = placedTiles.every((tile) => tile !== null);
    setIsGridFull(full);
    // Only call checkWinCondition if grid is full
    if (full) {
      checkWinCondition();
    }
  }, [placedTiles]);
  useEffect(() => {
    if (placedTiles.every((tile) => tile !== null)) {
      const timeout = setTimeout(() => {
        checkWinCondition();
      }, 300); // 300ms delay
      return () => clearTimeout(timeout);
    }
  }, [placedTiles]);

  const [startGame, setStartGame] = useState(false);
  const TimeType = data?.struct?.timerType?.value;
  const formattedTimeTaken = moment.utc(timeTaken * 1000).format("mm:ss");
  const formattedTimeLeft = moment.utc(timeLeft * 1000).format("mm:ss");
  useEffect(() => {
    let interval;
    if (startGame && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        setTimeTaken((prev) => prev + 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval); // Stop timer when time reaches 0
    }
    return () => clearInterval(interval);
  }, [timeLeft, startGame]);
  useEffect(() => {
    if (timeLeft <= 0) {
      setimeIsUp(true);
    }
  }, [timeLeft]);
  const handleResetGame = () => {
    // Revert tiles to their original positions by resetting them to initial values
    const initialLeftDisplay = Array(maxSideTiles).fill(null);
    for (let i = 0; i < left.length; i++) {
      initialLeftDisplay[i] = left[i];
    }

    const initialRightDisplay = Array(maxSideTiles).fill(null);
    for (let i = 0; i < right.length; i++) {
      initialRightDisplay[i] = right[i];
    }

    const initialPlacedTiles = Array(totalTiles).fill(null); // Reset placed tiles

    // Update state with initial values
    setLeftTiles(initialLeftDisplay);
    setRightTiles(initialRightDisplay);
    setPlacedTiles(initialPlacedTiles);

    // Reset the game state
    setimeIsUp(false); // Timer not up
    setMoves(0); // Reset moves count
    setTimeLeft(data?.struct?.countdownTime); // Reset timer to initial value
    setTimeTaken(0); // Reset time taken
    setStartGame(false); // Stop the game if it's running
    setDraggedTile(null); // Clear dragged tile state
    setSource(null); // Clear source of drag
  };
  const PLayGroundData = data?.struct?.playground;

  return (
    <div style={{ fontSize: "unset" }} className={"block-builder"}>
      <div className="game_mainParent">
        <div className="">
          <>
            {showCoverModel && (
              <div
                className="modal cover-modal"
                style={{
                  maxWidth: "568px",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                <div className="modal__content">
                  <div className="modal__content-scroll">
                    <div className="common-cover">
                      <h2 className="common-cover__title">
                        {CoverValue.coverHeader}
                      </h2>
                      <button
                        onClick={() => setshowCoverModel((prev) => !prev)}
                        style={{
                          backgroundColor: `${DialogueButtonColorandBorder}`,
                          color: "rgb(255, 255, 255)",
                        }}
                        className="common-cover__button"
                      >
                        {CoverValue.coverButtonText}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {passwordAccess ? (
              <div className="modal-wrapper">
                <div className="modalContainer">
                  <div className="modal-wrapper__content">
                    <div className="modal-header">
                      <div className="modal-header__title">
                        Privacy
                        <div className="modal-header__close">Cr</div>
                      </div>
                    </div>

                    <div className="privacy-settings-modal">
                      <div className="init" style={{ maxHeight: "100%" }}>
                        <div className="simplebar-wrapper">
                          <div className="privacy-settings-modal__workplace">
                            <div className="privacy-settings-modal__adding-box">
                              <div className="privacy-settings-modal__adding-box__title">
                                Add password
                              </div>
                              <div className="privacy-settings-modal__adding-box__block">
                                <input
                                  type="text"
                                  value={inputPassword}
                                  onChange={(e) =>
                                    setInputPassword(e.target.value)
                                  }
                                />
                                <button
                                  className="button"
                                  onClick={handleAddPassword}
                                >
                                  Add
                                </button>
                              </div>
                            </div>
                            <div className="privacy-settings-modal__table">
                              <div className="privacy-settings-modal__table__head">
                                {/* Display all active passwords in a p tag */}
                                <p>
                                  Active Passwords:{" "}
                                  {/* {activePasswords.length > 0 ? activePasswords.join(", ") : ""} */}
                                </p>
                                <div
                                  onClick={handleClearAll}
                                  style={{ cursor: "pointer" }}
                                >
                                  Clear All
                                </div>
                              </div>
                              <ul className="privacy-settings-modal__table__body">
                                {activePasswords.map((password, index) => (
                                  <li
                                    key={index}
                                    className="privacy-settings-modal__table__item"
                                  >
                                    {password}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <div
                            style={{ width: "960px", height: "330px" }}
                            className="simplebar-placeholder"
                          ></div>
                          <div
                            className="simplebar-track simplebar-horizontal"
                            style={{ visibility: "hidden" }}
                          >
                            <div className="simplebar-scrollbar simplebar-visible"></div>
                          </div>
                          <div className="simplebar-track simplebar-vertical">
                            <div className="simplebar-scrollbar simplebar-visible"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="modal-footer">
                      <div className="modal-footer__note"></div>
                      <div className="modal-footer__actions">
                        <button>Cancel</button>
                        <button>Save</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="puzzle-block-container">
                {/* Top Statistics */}
                {EnableTimer && (
                  <div className="puzzle-block-container">
                    <div className="statistic withMoves">
                      <div className="statistic__moves">
                        <span className="statistic__moves-title">
                          Number of actions
                        </span>
                        <span>{moves}</span>
                      </div>

                      <div className="statistic__timer">
                        {" "}
                        {TimeType == "stopwatch"
                          ? formattedTimeTaken
                          : formattedTimeLeft}
                      </div>
                    </div>
                  </div>
                )}

                {!timeIsUp && (
                  <div
                    className="puzzle-container"
                    style={{
                      "--container-width": `calc(${templateDetails.project_structure.app.maxWidth}px`,
                      gap: 12,
                    }}
                  >
                    {isWinner && (
                      <h3 className="winner-message">🎉 You Win! 🎉</h3>
                    )}

                    <div className="side-zone">
                      <div
                        className="tiles-container"
                        // style={{
                        //   display: "grid",
                        //   gridTemplateColumns: "repeat(2, 100px)",
                        //   gridTemplateRows: "repeat(4, 100px)",
                        //   gap: "5px",
                        // }}
                        style={{
                          display: "grid",
                          width: `calc((var(--container-width) - 32px) / 4 - 6px)`,
                          height: `calc((var(--container-width) - 32px) / 2 - 12px)`,
                          gridTemplateColumns: "repeat(2, 1fr)",
                          gridTemplateRows: "repeat(4, 1fr)",
                        }}
                      >
                        {leftTiles.map((tile, index) => (
                          <div
                            key={tile ? tile.id : `empty-${index}`}
                            className="puzzle-slot"
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={() => handleDrop(index, "left")}
                            style={{
                              width: "100%",
                              height: "100%",
                              border: "1px solid transparent",
                            }}
                          >
                            {tile ? (
                              <div
                                className="puzzle-piece"
                                style={{
                                  backgroundImage: `url(${imageUrl})`,
                                  backgroundSize: `${gridSize * 100}px ${
                                    gridSize * 100
                                  }px`,
                                  backgroundPosition: tile.backgroundPosition,
                                  width: "100%",
                                  height: "100%",
                                  // border: "1px solid black",
                                }}
                                draggable
                                onDragStart={() =>
                                  handleDragStart(tile, "left")
                                }
                              />
                            ) : (
                              <div
                                className="puzzle-piece placeholder"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  border: "1px dashed gray",
                                }}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Center Puzzle Grid */}
                    <div
                      className="puzzle-grid"
                      style={{
                        width: `calc(var(--container-width) / 2 - 12px)`,
                        height: `calc((var(--container-width) - 32px) / 2 - 12px)`,
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gridTemplateRows: "repeat(4, 1fr)",
                      }}
                    >
                      {placedTiles.map((tile, index) => {
                        // Only mark incorrect if the grid is full
                        const isIncorrect = isGridFull && incorrectTiles[index];
                        return (
                          <div
                            key={index}
                            className="puzzle-slot"
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={() => handleDrop(index, "center")}
                            style={{
                              width: "100%",
                              height: "100%",
                              // border: "1px solid black",
                              backgroundColor: "#f0f0f0",
                            }}
                          >
                            {tile && (
                              <div
                                className={`puzzle-piece ${
                                  isIncorrect ? "incorrect" : ""
                                }`}
                                style={{
                                  backgroundImage: `url(${imageUrl})`,
                                  backgroundSize: `${gridSize * 100}px ${
                                    gridSize * 100
                                  }px`,
                                  backgroundPosition: tile.backgroundPosition,
                                  width: "100%",
                                  height: "100%",
                                }}
                                draggable
                                onDragStart={() =>
                                  handleDragStart(tile, "center")
                                }
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="side-zone">
                      <div
                        className="tiles-container"
                        style={{
                          display: "grid",
                          width: `calc((var(--container-width) - 32px) / 4 - 6px)`,
                          height: `calc((var(--container-width) - 32px) / 2 - 12px)`,
                          gridTemplateColumns: "repeat(2, 1fr)",
                          gridTemplateRows: "repeat(4, 1fr)",
                        }}
                      >
                        {rightTiles.map((tile, index) => (
                          <div
                            key={tile ? tile.id : `empty-${index}`}
                            className="puzzle-slot"
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={() => handleDrop(index, "right")}
                            style={{
                              width: "100%",
                              height: "100%",
                              // border: "1px solid transparent",
                            }}
                          >
                            {tile ? (
                              <div
                                className="puzzle-piece"
                                style={{
                                  backgroundImage: `url(${imageUrl})`,
                                  backgroundSize: `${gridSize * 100}px ${
                                    gridSize * 100
                                  }px`,
                                  backgroundPosition: tile.backgroundPosition,
                                  width: "100%",
                                  height: "100%",
                                  // border: "1px solid black",
                                }}
                                draggable
                                onDragStart={() =>
                                  handleDragStart(tile, "right")
                                }
                              />
                            ) : (
                              <div
                                className="puzzle-piece placeholder"
                                style={{
                                  width: "100px",
                                  height: "100px",
                                  border: "1px dashed gray",
                                }}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {/* Dialogue Modal */}
                {isWinner && (
                  <div className="modal cover-modal">
                    <div className="modal__content">
                      <div className="modal__content-scroll">
                        <div className="common-cover">
                          <h2 className="common-cover__title">
                            {DialogueInfo?.playground?.coverHeader}
                          </h2>
                          dsfkdsflsDKFKJs
                          <button
                            onClick={() => {
                              // Toggle dialogue/modal view
                            }}
                            style={{
                              background: `${DialogueButtonColorandBorder}`,
                              color: "rgb(255, 255, 255)",
                            }}
                            className="common-cover__button"
                          >
                            {DialogueInfo?.playground?.coverButtonText}
                          </button>
                        </div>
                        <div className="fine-one-pair-finalScreen-result">
                          {StarsData?.enableStars &&
                            starsTimeArray.map((item, i) =>
                              item > timeTaken
                                ? // <FontAwesomeIcon icon={solidStar} key={i} />
                                  "star"
                                : // <FontAwesomeIcon icon={regularStar} key={i} />
                                  "star"
                            )}
                          <p className="m-0">
                            Your result:{" "}
                            {TimeType == "stopwatch"
                              ? formattedTimeTaken
                              : formattedTimeLeft}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Registration Form */}
                {showRegister && (
                  <div className="modal registration-modal">
                    <div className="modal__content">
                      <div className="modal__content-scroll">
                        <div className="registration">
                          {passwordWrong ? (
                            // Wrong password message
                            <div className="registration-access">
                              <div className="registration-access__content">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="32"
                                  height="32"
                                  viewBox="0 0 32 32"
                                  fill="currentColor"
                                >
                                  <path d="M22 14H10C8.89543 14 8 14.8954 8 16V26C8 27.1046 8.89543 28 10 28H22C23.1046 28 24 27.1046 24 26V16C24 14.8954 23.1046 14 22 14ZM10 12C7.79086 12 6 13.7909 6 16V26C6 28.2091 7.79086 30 10 30H22C24.2091 30 26 28.2091 26 26V16C26 13.7909 24.2091 12 22 12H10Z" />
                                </svg>
                                <h2 className="registration-access__content-title">
                                  Access is closed
                                </h2>
                                <p className="registration-access__content-text">
                                  The code is entered incorrectly or has
                                  expired.
                                </p>
                                <button
                                  style={{
                                    color: "rgb(255, 255, 255)",
                                    backgroundColor: "rgb(72, 145, 243)",
                                  }}
                                  className="registration-access__content-button is-handled"
                                  onClick={() => {
                                    setPasswordWrong(false);
                                  }}
                                >
                                  Restart
                                </button>
                              </div>
                              isHideRestartButton
                            </div>
                          ) : (
                            <form
                              className="p-4 text-start"
                              action=""
                              onSubmit={handleSubmit}
                            >
                              <h3 className="mb-4">Sign in to play</h3>
                              {data?.struct?.passwordList &&
                                data?.struct?.passwordList.length > 0 && (
                                  <div className="registration__form__field">
                                    <label className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                                      Your Code
                                    </label>
                                    <input
                                      name="password"
                                      className="form-control theme-control"
                                      type="text"
                                      value={formData.password}
                                      onChange={handleChange}
                                    />
                                    {errors.password && (
                                      <p className="registration__form__field__error">
                                        {errors.password}
                                      </p>
                                    )}
                                  </div>
                                )}
                              {FormValues?.fields?.map((field) => (
                                <div
                                  key={field.key}
                                  className="registration__form__field"
                                >
                                  <label className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                                    {field.label}
                                  </label>
                                  <input
                                    name={field.key}
                                    className="form-control theme-control"
                                    type={
                                      field.type === "EMAIL" ? "email" : "text"
                                    }
                                    value={formData[field.key]}
                                    onChange={handleChange}
                                  />
                                  {errors[field.key] && (
                                    <p className="registration__form__field__error">
                                      {errors[field.key]}
                                    </p>
                                  )}
                                </div>
                              ))}
                              <div className="registration__form__legal-statement">
                                <label
                                  htmlFor="legalAgreement"
                                  className="d-flex align-items-center gap-1"
                                >
                                  <input
                                    onChange={(e) =>
                                      setCheckbox(e.target.checked)
                                    }
                                    checked={checkbox}
                                    type="checkbox"
                                    id="legalAgreement"
                                    className="form-check-input theme-control shadow-none m-0"
                                  />

                                  <span className="registration__form__legal-statement__content">
                                    wdwdwdwdwdwd
                                  </span>
                                </label>
                              </div>
                              <button
                                disabled={!checkbox}
                                type="submit"
                                className={`button button-primary border-0 ${
                                  !checkbox ? "is-disabled" : ""
                                }`}
                              >
                                Start
                              </button>
                            </form>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {timeIsUp && (
                  <div
                    className="final-screen__content no-image with-time"
                    style={{ paddingBlock: "50px" }}
                  >
                    <div
                      className="final-screen__content-result"
                      style={{
                        backgroundImage: `url(${data?.struct?.puzzleImage})`,
                        position: "static",
                        transform: "unset",
                        margin: "auto auto 20px",
                      }}
                    >
                      <div className="final-screen__content-result-counter">
                        <p className="final-screen__content-result-counter-title">
                          Your Result
                        </p>
                        <p
                          style={{ color: "black", textAlign: "center " }}
                          className="final-screen__content-result-counter-time"
                        >
                          {TimeType == "stopwatch"
                            ? formattedTimeTaken
                            : formattedTimeLeft}
                        </p>
                      </div>
                    </div>
                    <div className="final-screen__content-header">
                      {TimeISUP?.header}
                    </div>
                    <div className="final-screen__content-description">
                      {TimeISUP?.description}
                    </div>
                    <div className="restart-button__wrapper">
                      {TimeISUP.isRetryButton == true && (
                        <button
                          onClick={handleResetGame}
                          className="restart-button__btn"
                        >
                          Retry
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        </div>
      </div>
    </div>
  );
}

export default PreviewPuzzle;
