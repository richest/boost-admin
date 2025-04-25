import React, { useState, useEffect } from "react";
import "./puzzle.css";

const Puzzle = ({
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
  approxValue,
  puzzle
}) => {
  const FormValues = data?.struct?.leadFormStruct?.form;
  const gameData = data?.struct?.playground;
  const gridSize = parseInt(gameData.layout.label.split("x")[0], 10);
  const totalTiles = gridSize * gridSize;
  const maxSideTiles = (gridSize / 2) * gridSize;
  const imageUrl = gameData.image;
  const DialogueInfo = data?.struct;
  const DialogueButtonColorandBorder = data?.struct?.colorTheme;
  // After generating tiles with generateTiles():
  const generateTiles = () => {
    let shuffledTiles = Array.from({ length: totalTiles }, (_, index) => ({
      id: index + 1,
      backgroundPosition: `${-((index % gridSize) * 100)}px ${-(Math.floor(index / gridSize) * 100)}px`,
    })).sort(() => Math.random() - 0.5);

    return {
      left: shuffledTiles.slice(0, maxSideTiles),
      right: shuffledTiles.slice(maxSideTiles, maxSideTiles * 2),
    };
  };
  const { left, right } = generateTiles();
  const [isInitialPreview, setisInitialPreview] = useState(true);
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

  const [formData, setFormData] = useState({
    password: "",
    ...FormValues?.fields?.reduce((acc, field) => {
      acc[field.key] = "";
      return acc;
    }, {}),
  });

  // const [placedTiles, setPlacedTiles] = useState(Array(totalTiles).fill());
  const [placedTiles, setPlacedTiles] = useState([
    { backgroundPosition: "center" }, // This ensures the full image appears initially
  ]);
  const [draggedTile, setDraggedTile] = useState(null);
  const [source, setSource] = useState(null);
  const [showRegister, seshowRegister] = useState(true);
  const [incorrectTiles, setIncorrectTiles] = useState([]);

  // Multi-password modal state and handlers
  const [inputPassword, setInputPassword] = useState("");
  const [activePasswords, setActivePasswords] = useState([]);

  const handleAddPassword = () => {
    if (inputPassword.trim() !== "") {
      setActivePasswords([...activePasswords, inputPassword.trim()]);
      setInputPassword("");
    }
  };
  const CoverValue = data?.struct?.playground;
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

  return (
    <div
      style={{ fontSize: "unset" }}
      className={isSelected ? "block-builder selected" : "block-builder"}
      onClick={() => handleSelectBlock("puzzle", data)}
    >
      <button
        className="plus-selected"
        onClick={() => handleAddBlockFromBlock(data.id)}
      >
        <i className="fa-solid fa-plus"></i>
      </button>
      <div className="game_mainParent">
        {console.log(data?.struct?.playground?.isShowCover, "efefef", approxValue)}
        {approxValue && (data?.struct?.playground?.isShowCover && (
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
                    {puzzle?.coverHeader



                      //  CoverValue.coverHeader

                    }
                  </h2>
                  <button
                    onClick={() => setshowCoverModel((prev) => !prev)}
                    style={{
                      backgroundColor: `${DialogueButtonColorandBorder}`,
                      color: "rgb(255, 255, 255)",
                    }}
                    className="common-cover__button"
                  >
                    {
                      // CoverValue.coverButtonText



                      puzzle?.coverButtonText}
                    {console.log(puzzle?.coverButtonText, "sqsqqs")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}




        {
          !approxValue && (
            <>
              <div className="editButton">
                <button
                  className="button-boost"
                  onClick={() => handleEditModal("puzzle", data?.id)}
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
            </>
          )
        }

        <div className="disabled-panel">
          <>
            <div className="puzzle-block-container">
              {/* Top Statistics */}
              {
                !approxValue && (
                  <div className="puzzle-block-container">
                    <div className="statistic withMoves">
                      <div className="statistic__moves">
                        <span className="statistic__moves-title">
                          Number of actions
                        </span>
                        <span>0</span>
                      </div>
                      <div className="statistic__timer"> Time</div>
                    </div>
                  </div>
                )
              }


              <div className="puzzle-container">
                {isWinner && <h3 className="winner-message">🎉 You Win! 🎉</h3>}
                {/* Left Pieces */}
                {/* Left Pieces */}
                {/* Left Pieces */}
                {/* <div className="side-zone">
                  <h3>Left Pieces</h3>
                  <div
                    className="tiles-container"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 100px)",
                      gridTemplateRows: "repeat(4, 100px)",
                      gap: "5px",
                    }}
                  >
                    {leftTiles.map((tile, index) => (
                      <div
                        key={tile ? tile.id : `empty-${index}`}
                        className="puzzle-slot"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDrop(index, "left")}
                        style={{
                          width: "100px",
                          height: "100px",
                          border: "1px solid transparent",
                        }}
                      >
                        {tile ? (
                          <div
                            className="puzzle-piece"
                            style={{
                              backgroundImage: `url(${""})`,
                              backgroundSize: `${gridSize * 100}px ${gridSize * 100}px`,
                              backgroundPosition: tile.backgroundPosition,
                              width: "100px",
                              height: "100px",
                              border: "1px solid black",
                            }}
                            draggable
                            onDragStart={() => handleDragStart(tile, "left")}
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
                </div> */}

                {/* here for center Image  */}
                <div className="puzzle-container">
                  {isInitialPreview && (
                    <div
                      className="puzzle-grid"
                      style={{
                        display: "grid",
                        gridTemplateColumns: `repeat(${gridSize}, 100px)`, // Adjust number of columns
                        gridTemplateRows: `repeat(${gridSize}, 100px)`, // Adjust number of rows
                        gap: "1px",
                      }}
                    >
                      {Array.from({ length: gridSize * gridSize }).map(
                        (_, index) => {
                          const row = Math.floor(index / gridSize); // Calculate row position
                          const col = index % gridSize; // Calculate column position
                          return (
                            <div
                              key={index}
                              style={{
                                width: "100px", // Tile width
                                height: "100px", // Tile height
                                backgroundImage: `url(${imageUrl})`,
                                backgroundSize: `${gridSize * 100}px ${gridSize * 100}px`,
                                backgroundPosition: `${-col * 100}px ${-row * 100}px`, // Set the background position
                                border: "1px solid black",
                              }}
                            />
                          );
                        }
                      )}
                    </div>
                  )}
                </div>

                {/* <div className="side-zone">
                  <h3>Right Pieces</h3>
                  <div
                    className="tiles-container"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 100px)",
                      gridTemplateRows: "repeat(4, 100px)",
                      gap: "5px",
                    }}
                  >
                    {rightTiles.map((tile, index) => (
                      <div
                        key={tile ? tile.id : `empty-${index}`}
                        className="puzzle-slot"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDrop(index, "right")}
                        style={{
                          width: "100px",
                          height: "100px",
                          border: "1px solid transparent",
                        }}
                      >
                        {tile ? (
                          <div
                            className="puzzle-piece"
                            style={{
                              backgroundImage: `url(${""})`,
                              backgroundSize: `${gridSize * 100}px ${gridSize * 100}px`,
                              backgroundPosition: tile.backgroundPosition,
                              width: "100px",
                              height: "100px",
                              border: "1px solid black",
                            }}
                            draggable
                            onDragStart={() => handleDragStart(tile, "right")}
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
                </div> */}
              </div>

              {/* Dialogue Modal */}
              {isWinner && (
                <div className="modal cover-modal">
                  <div className="modal__content">
                    <div className="modal__content-scroll">
                      <div className="common-cover">
                        <h2 className="common-cover__title">
                          {DialogueInfo?.playground?.coverHeader}
                        </h2>
                        <button
                          onClick={() => {
                            // Toggle dialogue/modal view
                          }}
                          style={{
                            backgroundColor: DialogueButtonColorandBorder,
                            color: "rgb(255, 255, 255)",
                          }}
                          className="common-cover__button"
                        >
                          {DialogueInfo?.playground?.coverButtonText}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Registration Form */}
            </div>
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
};

export default Puzzle;
