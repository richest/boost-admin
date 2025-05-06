import React, { useEffect, useRef, useState } from "react";
import "./slidingpuzzle.css";
import moment from "moment";
import { Navigate, useNavigate } from "react-router-dom";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import LeadForm from "../Form";
function PreviewSlidingPuzzle({
  data,

  slidingpuzzle
}) {
  // coverHeader
  // coverButtonText
  console.log(data?.struct?.isShowLeadForm, "ouieowuew")
  const FormValues = data?.struct?.leadFormStruct?.form;
  console.log(data?.struct, "qasqsqsqs54989958587")
  const hideRestart = data?.struct?.isHideRestartButton
  console.log(hideRestart, "hideRestart")
  const HideRestartButton = data?.struct?.timeIsUpScreen?.HideRestartButton;
  console.log(HideRestartButton, "HideRestartButton")
  const actionButtonLink = data?.struct?.timeIsUpScreen?.actionButtonLink
  const actionButtonText = data?.struct?.timeIsUpScreen?.actionButtonText
  console.log(actionButtonLink, "actionButtonLink", actionButtonText, "actionButtonText")
  const ToggleShuffle = data?.struct?.isShowShuffleButton;
  const callToActionEnabledButton = data?.struct?.callToActionEnabled
  const HighLightCorrectTile = data?.struct?.isHighlightCorrect;
  console.log(HighLightCorrectTile, "adadadada")
  const NUmberGameTheme = data?.struct?.colorTheme;
  console.log(NUmberGameTheme, "NUmberGameTheme")
  const EnableTimer = data?.struct?.enableTimer;
  const CorrectColor = data?.struct?.correctColor;
  const ColorTeheme = data?.struct;
  const TimeISUP = data?.struct?.timeIsUpScreen;
  const PLayGroundData = data?.struct?.playground;
  const FinalScreen = data?.struct;
  const FinalRedirectLink = data?.struct?.callToActionLink
  // GameType Image TileCount
  // // coverHeader
  // console.log(PLayGroundData?.coverButtonText, "PLayGroundDataPLayGroundData")
  const GameType = PLayGroundData?.gameType;
  const PuzzleImage = slidingpuzzle?.imageUrl || PLayGroundData?.imageUrl;

  const TileCount = PLayGroundData?.tilesCount;
  const HeaderMessage = PLayGroundData?.coverHeader;
  const showCoverButton = PLayGroundData?.isShowCover;

  const CoverButtonMessage = PLayGroundData?.coverButtonText;
  const ShowImageNumber = PLayGroundData?.isShowImageNumbers;
  const StarsData = data?.struct;
  console.log(StarsData?.enableStars, "StarsData")
  const starsTimeArray = StarsData?.starsTimeList
    // console.log(starsTimeArray,"jkopasjdasijasd")
    // console.log(CorrectColor, "CorrectColorCorrectColor")
    .split(",")
    .map((item) => item.trim());
  // Game Finish
  // const FinalMessage   = PLayGroundData?.
  console.log(CorrectColor, "CorrectColor")
  const navigate = useNavigate()
  console.log(FinalScreen, "FinalScreen")
  const finalData = {
    finalMessage: FinalScreen?.final.description,
    colorTheme: ColorTeheme,
    image: FinalScreen.final.image,
    header: FinalScreen.final.header,
    description: FinalScreen?.final.description,
    imageDisclaimer: "",
    gameType: GameType,
    imageUrl: PuzzleImage,
    tilesCount: TileCount,
    coverHeader: HeaderMessage,
    isShowCover: showCoverButton,
    coverButtonText: CoverButtonMessage,
    isShowImageNumbers: ShowImageNumber,
    hideRestartButton: "",
  };
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
  ]
  const dataHere = {
    gameType: finalData?.gameType,
    puzzleImage: finalData?.imageUrl,
    tilesCount: finalData?.tilesCount,
    headerMessage: finalData?.coverHeader,
    coverButtonText: finalData?.coverButtonText,
    finalMessage: finalData?.description,
    colorTheme: "#b3d7fc",
  };
  console.log(finalData?.isShowCover, "sdds")
  const [showCoverModel, setshowCoverModel] = useState(finalData?.isShowCover);

  const [passwordWrong, setPasswordWrong] = useState(false);
  const [tilesNumber, setTilesNumber] = useState([]);
  const [emptyTileIndexNumber, setEmptyTileIndexNumber] = useState(null);
  const [isWinNumber, setIsWinNumber] = useState(false);
  const [showRegister, setShowRegister] = useState(data?.struct?.isShowLeadForm);
  const [inputPassword, setInputPassword] = useState("");
  const [moves, setMoves] = useState(0);
  const [checkbox, setCheckbox] = useState(false);
  const [isFormInvalid, setIsFormInvalid] = useState()
  const [errors, setErrors] = useState({});
  const [passwordAccess, setPasswordAccess] = useState(false);
  const [ChnageModel, seChnageModel] = useState(false);
  const [activePasswords, setActivePasswords] = useState([]);
  const [formData, setFormData] = useState({
    password: "",
    ...FormValues?.fields?.reduce((acc, field) => {
      acc[field.key] = "";
      return acc;
    }, {}),
  });
  const [timeIsUp, setimeIsUp] = useState(true);
  const mainData = data?.struct;
  const TimeType = data?.struct?.timerType?.value;
  // const isFormInvalid =
  //   !checkbox ||
  //   Object.values(errors).some(Boolean) ||
  //   FormValues?.fields?.some(field => !formData[field.key]?.trim());
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--tilesCount",
      Math.sqrt(dataHere.tilesCount)
    );
    initializeTilesNumber();
  }, [dataHere.tilesCount]);
  const [timeTaken, setTimeTaken] = useState(0);
  const [timeLeft, setTimeLeft] = useState(mainData?.countdownTime);
  const formattedTimeTaken = moment.utc(timeTaken * 1000).format("mm:ss");
  const formattedTimeLeft = moment.utc(timeLeft * 1000).format("mm:ss");
  const [startGame, setStartGame] = useState(false);
  const topBannerText = data?.struct;
  const pairsData = data?.struct;
  useEffect(() => {
    let interval;
    if (startGame && !isWinNumber && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        setTimeTaken((prev) => prev + 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval); // Stop timer when time reaches 0
    }
    return () => clearInterval(interval);
  }, [startGame, isWinNumber, timeLeft, data]);
  console.log(isWinNumber, "isWinNumber")
  const isSolvable = (tiles) => {
    let inversions = 0;
    const tileArray = tiles.filter((tile) => tile !== 0); // Exclude empty tile

    for (let i = 0; i < tileArray.length; i++) {
      for (let j = i + 1; j < tileArray.length; j++) {
        if (tileArray[i] > tileArray[j]) {
          inversions++;
        }
      }
    }
    console.log(showRegister, "showRegistershowRegister")
    const isWinningState = (tiles) => {
      return tiles.every((tile, index) => tile === (index + 1) % tiles.length);
    };
    // If grid width is odd, puzzle is solvable if inversions are even
    return inversions % 2 === 0;
  };
  const handleAddPassword = () => {
    if (inputPassword.trim() !== "") {
      setActivePasswords([...activePasswords, inputPassword.trim()]);
      setInputPassword("");
    }
  };

  const handleClearAll = () => {
    setActivePasswords([]);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update form data
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);

    // Basic validation example
    const updatedErrors = { ...errors };

    if (name === "email") {
      // simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      updatedErrors[name] = !emailRegex.test(value)
        ? "Please enter a valid email address"
        : "";
    } else {
      // required field check
      updatedErrors[name] = value.trim() === "" ? "This field is required" : "";
    }

    setErrors(updatedErrors);

    // Update form validity (optional central flag)
    const isInvalid =
      !checkbox ||
      Object.values(updatedErrors).some((err) => err) ||
      FormValues?.fields?.some((field) => !updatedFormData[field.key]?.trim());

    setIsFormInvalid(isInvalid);
  };

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const passwordList = data?.struct?.passwordList;
  //   let newErrors = {};

  //   // Validate "Your Code" field if needed
  //   if (passwordList && passwordList.length > 0) {
  //     if (!formData.password.trim()) {
  //       newErrors.password = "Your Code is required";
  //     } else if (!passwordList.includes(formData.password)) {
  //       newErrors.password = "Incorrect password";
  //       setPasswordWrong(true);
  //     }
  //   }

  //   // Validate dynamic fields
  //   FormValues?.fields?.forEach((field) => {
  //     if (field.isRequired && !formData[field.key].trim()) {
  //       newErrors[field.key] = `${field.label} is required`;
  //     }
  //   });

  //   // Validate checkbox
  //   if (!checkbox) {
  //     newErrors.checkbox = "You must agree to the terms";
  //   }

  //   if (Object.keys(newErrors).length) {
  //     setErrors(newErrors);
  //   } else {
  //     setErrors({});
  //     setShowRegister(false);
  //     console.log("Form submitted", formData);
  //   }
  // };
  const handleSubmit = (e) => {
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
      const value = formData[field.key]?.trim();
      console.log(field.type, "field.type")
      if (field.isRequired && !value) {
        newErrors[field.key] = `${field.label} is required`;
      } else {
        // Additional format validations
        if (field.type === "email") {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            newErrors[field.key] = "Enter a valid email address";
          }
        }

        if (field.type === "number") {
          const phoneRegex = /^[0-9]{10}$/; // You can adjust this if needed
          if (!phoneRegex.test(value)) {
            newErrors[field.key] = "Enter a valid 10-digit phone number";
          }
        }
      }
    });

    // Validate checkbox
    if (!checkbox) {
      newErrors.checkbox = "You must agree to the terms";
    }

    // Final error check
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
    } else {
      setErrors({});
      setShowRegister(false);
      console.log("Form submitted", formData);
      // setIsWin(true)

    }
  };

  const initializeTilesNumber = () => {
    let initialTiles = Array.from(
      { length: dataHere.tilesCount - 1 },
      (_, i) => i + 1
    );
    initialTiles.push(0); // Empty tile (0)

    do {
      initialTiles = shuffleArrayNumber(initialTiles);
    } while (isWinningState(initialTiles)); // Reshuffle if in the winning state

    const emptyIndex = initialTiles.indexOf(0);
    setEmptyTileIndexNumber(emptyIndex);
    setTilesNumber(initialTiles);
    setIsWinNumber(false); // Reset win state
    setMoves(0);
    setTimeLeft(mainData?.countdownTime ?? 30);
    setimeIsUp(false);
    setTimeTaken(0);
  };

  const initializeTilesNumberShuffle = () => {
    let initialTiles = Array.from(
      { length: dataHere.tilesCount - 1 },
      (_, i) => i + 1
    );
    initialTiles.push(0); // Empty tile (0)

    do {
      initialTiles = shuffleArrayNumber(initialTiles);
    } while (isWinningState(initialTiles)); // Reshuffle if in the winning state

    const emptyIndex = initialTiles.indexOf(0);
    setEmptyTileIndexNumber(emptyIndex);
    setTilesNumber(initialTiles);
    // Reset win state
  };
  useEffect(() => {
    if (timeLeft <= 0) {
      setimeIsUp(true);
    }
  }, [timeLeft]);
  // Function to check if the puzzle is in a winning state
  const isWinningState = (tiles) => {
    return tiles.every((tile, index) => tile === (index + 1) % tiles.length);
  };

  const shuffleArrayNumber = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const checkWinNumber = (tilesNumber) => {
    const isSolved = tilesNumber.every(
      (tile, index) => tile === 0 || tile === index + 1
    );
    if (isSolved) {
      console.log(isSolved, "isSolved")
      setIsWinNumber(true); // Set win state to true
    }
  };

  const handleTileClickNumber = (index) => {
    setStartGame(true);

    if (isWinNumber) return; // Prevent movements if the game is won
    if (isAdjacentNumber(index, emptyTileIndexNumber)) {
      const newTiles = [...tilesNumber];
      [newTiles[index], newTiles[emptyTileIndexNumber]] = [
        newTiles[emptyTileIndexNumber],
        newTiles[index],
      ];
      setTilesNumber(newTiles);
      setEmptyTileIndexNumber(index);
      setMoves((prev) => prev + 1);
      setTimeout(() => {
        checkWinNumber(newTiles); // Check for win after a slight delay
      }, 100); // Adding a short delay for a smoother transition
    }
  };

  const isAdjacentNumber = (index1, index2) => {
    const gridSize = Math.sqrt(dataHere.tilesCount);
    const row1 = Math.floor(index1 / gridSize);
    const col1 = index1 % gridSize;
    const row2 = Math.floor(index2 / gridSize);
    const col2 = index2 % gridSize;
    return Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1;
  };

  const rowsNumber = Math.sqrt(dataHere.tilesCount); // Grid rows (always a square grid)
  const colsNumber = Math.sqrt(dataHere.tilesCount); // Grid columns (same as rows)

  // image one
  const ImageData = {
    struct: {
      final: {
        image: finalData.image,
        header: finalData.header,
        description: finalData?.description,
        imageDisclaimer: "",
      },
      playground: {
        gameType: finalData?.gameType,
        imageUrl: finalData?.imageUrl,
        tilesCount: finalData?.tilesCount,
        coverHeader: finalData?.coverHeader,
        isShowCover: finalData?.isShowCover,
        coverButtonText: finalData?.coverButtonText,
        isShowImageNumbers: finalData?.isShowImageNumbers,
      },
    },
  };

  const { imageUrl, tilesCount, isShowImageNumbers } =
    ImageData.struct.playground;
  const [tiles, setTiles] = useState([]);
  const [emptyTileIndex, setEmptyTileIndex] = useState(null);
  const [isWin, setIsWin] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--tilesCount",
      Math.sqrt(tilesCount)
    );
    initializeTiles();
  }, []);

  const initializeTiles = () => {
    let initialTiles = Array.from({ length: tilesCount }, (_, i) => i);
    initialTiles = shuffleArray(initialTiles);
    const newEmptyTileIndex = initialTiles.indexOf(0);

    setTiles(initialTiles);
    setEmptyTileIndex(newEmptyTileIndex);
    setIsWin(false);
    setMoves(0);
    setTimeLeft(mainData?.countdownTime ?? 30);
    setimeIsUp(false);
    setTimeTaken(0);
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const checkWin = (tiles) => {
    const isSolved = tiles.every(
      (tile, index) => tile === 0 || tile === index + 1
    );

    if (isSolved) {
      setTimeout(() => {
        setTiles((prevTiles) => {
          const updatedTiles = [...prevTiles];
          const emptyIndex = prevTiles.indexOf(0);

          // Instead of reusing a tile, assign a new value for the missing piece
          updatedTiles[emptyIndex] = tiles.length;

          return updatedTiles;
        });

        setTimeout(() => {
          setIsWin(true);
        }, 1000);
      }, 500);
    }
  };

  const handleTileClick = (index) => {
    setStartGame(true);
    if (isWin) return;
    if (isAdjacent(index, emptyTileIndex)) {
      const newTiles = [...tiles];
      [newTiles[index], newTiles[emptyTileIndex]] = [
        newTiles[emptyTileIndex],
        newTiles[index],
      ];
      setTiles(newTiles);
      setEmptyTileIndex(index);
      setMoves((prev) => prev + 1);
      setTimeout(() => checkWin(newTiles), 100);
    }
  };
  const shouldShowResults =
    (topBannerText?.isShowRatingEmail || topBannerText?.isEnableRating) &&
    !topBannerText?.isHideLeaderboard &&
    (isWinNumber || timeIsUp);

  const isAdjacent = (index1, index2) => {
    const gridSize = Math.sqrt(tilesCount);
    const row1 = Math.floor(index1 / gridSize);
    const col1 = index1 % gridSize;
    const row2 = Math.floor(index2 / gridSize);
    const col2 = index2 % gridSize;
    return Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1;
  };

  const rows = Math.sqrt(tilesCount);
  const cols = Math.sqrt(tilesCount);
  console.log(actionButtonLink, "actionButtonLink", FinalRedirectLink)
  const handleNavigate = () => {
    // navigate(`${actionButtonLink}`)
    navigate(`${FinalRedirectLink}`)
  }
  useEffect(() => {
    console.log("RENDERINGGG", slidingpuzzle)
    setshowCoverModel(finalData?.isShowCover)
  }, [finalData?.isShowCover, slidingpuzzle])
  console.log(data, "checkdataokormnot")
  const handleSubmitForm = () => {
    setShowRegister(false)
  }
  return (
    <div style={{ fontSize: "unset" }} className={"block-builder"}>
      <div className="game_mainParent">
        <div className="">
          <>
            {passwordAccess && (
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
                        <button
                          onClick={() => {
                            // if (passwordAccess ) {
                            //   seChnageModel(prev => !prev);
                            // }
                            setPasswordAccess((prev) => !prev);
                          }}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {!isWinNumber &&
              passwordAccess !== true &&
              finalData?.gameType == "NUMBERS" && (
                <div className="block __28 slidingPuzzle-block">
                  <div className="sliding-puzzle-container">
                    {/* moves in Number */}
                    {!isWinNumber && timeIsUp !== true && EnableTimer && (
                      <div
                        className="statistic withMoves"
                        style={{ width: "568px" }}
                      >
                        <div className="statistic__moves">
                          <span className="statistic__moves-title">
                            {" "}
                            Number Of Actions{" "}
                          </span>
                          <span>{moves}</span>
                        </div>
                        <div>
                          {console.log(
                            formattedTimeLeft,
                            "formattedTimeLeftformattedTimeLeft"
                          )}
                          <div className="statistic__timer">
                            {TimeType == "stopwatch"
                              ? formattedTimeLeft
                              : formattedTimeTaken}
                          </div>
                        </div>
                      </div>
                    )}
                    {console.log(slidingpuzzle?.coverHeader, "widowdiwd")}
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
                                {slidingpuzzle?.coverHeader || finalData?.coverHeader}
                              </h2>
                              <button
                                onClick={() =>
                                  setshowCoverModel((prev) => !prev)
                                }
                                style={{
                                  backgroundColor: NUmberGameTheme,
                                  color: "rgb(255, 255, 255)",
                                }}
                                className="common-cover__button"
                              >
                                {slidingpuzzle?.coverButtonText || finalData?.coverButtonText}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {!isWinNumber && timeIsUp !== true && (
                      <div className="sliding-puzzle__playground">
                        <div
                          className="sliding-puzzle__playground__ workplace"
                          style={{
                            maxWidth: "568px",
                            padding: "40px",
                            backgroundColor: NUmberGameTheme,
                            margin: 'auto',
                            marginBottom: 20
                          }}
                        >
                          <div className="sliding-puzzle__playground__workplace__helper"></div>
                          <div
                            className="sliding-puzzle__board"
                            style={{
                              gridTemplateColumns: `repeat(${colsNumber}, 1fr)`,
                              gridTemplateRows: `repeat(${rowsNumber}, 1fr)`,
                            }}
                          >
                            {tilesNumber.map((tile, index) => {
                              return (
                                <div
                                  key={index}
                                  className={`sliding-puzzle__tile ${index === emptyTileIndexNumber
                                    ? "sliding-puzzle__tile--is-hidden"
                                    : "sliding-puzzle__tile--is-can-move"
                                    }`}
                                  style={{
                                    backgroundColor:
                                      HighLightCorrectTile &&
                                        tile !== 0 &&
                                        tile === index + 1
                                        ? CorrectColor
                                        : NUmberGameTheme,
                                    // margin: "4px",
                                    // border: "3px solid transparent",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    fontSize: "36px",
                                    fontWeight: "bold",
                                    color: "white",
                                    cursor: "pointer",
                                    borderRadius: 4,
                                    aspectRatio: '1/1'
                                  }}
                                  onClick={() => handleTileClickNumber(index)}
                                >
                                  {index !== emptyTileIndexNumber && (
                                    <div className="sliding-puzzle__tile__inner">
                                      {tile}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        {ToggleShuffle == true && (
                          <div className="sliding-puzzle__shuffle-button-container">
                            <button
                              onClick={initializeTilesNumberShuffle}
                              className="common__button custom sliding-puzzle__shuffle-button"
                            >
                              Shuffle
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            {isWinNumber &&
              passwordAccess !== true &&
              finalData?.gameType === "NUMBERS" && (


                <>

                  {console.log(showRegister, "ukukuukuk")}
                  {
                    showRegister ? (
                      <LeadForm data={data} onSubmit={() => handleSubmitForm()} />
                    ) : (
                      ""
                    )
                  }
                </>



              )}
            {/* ASDsadsd */}
            {/* Time Up Screen - Rendered separately when the user loses */}
            {console.log(!isWinNumber, timeIsUp, "scssfsf", isWinNumber && timeIsUp)}
            {!isWinNumber && timeIsUp && (
              <div
                className="final-screen__content no-image with-time"
                style={{ paddingBottom: "50px" }}
              >
                <div
                  className="final-screen__content-result"
                  style={{ backgroundImage: `url(${dataHere.puzzleImage})` }}
                >
                  <div className="final-screen__content-result-counter">
                    <p className="final-screen__content-result-counter-title">
                      Your Result
                    </p>
                    <p className="final-screen__content-result-counter-time">
                      {formattedTimeLeft}
                    </p>
                  </div>
                </div>
                <div className="final-screen__content-header">
                  {TimeISUP?.header}
                </div>
                <div className="final-screen__content-description">
                  {TimeISUP?.description}
                  <div className="fine-one-pair-finalScreen-result">
                    {console.log(starsTimeArray, "starsTimeArray")}
                    {console.log(StarsData?.isEnableRating, "ijiuii")}
                    {StarsData?.isEnableRating &&
                      starsTimeArray.map((item, i) =>
                        item > timeTaken ? <FaStar key={i} /> : <CiStar key={i} />
                      )}
                    <p className="m-0">
                      Your result:{" "}
                      {TimeType == "stopwatch"
                        ? formattedTimeTaken
                        : formattedTimeLeft}
                    </p>
                  </div>
                </div>
                <div className="restart-button__wrapper">
                  {TimeISUP.isRetryButton == true && (
                    <button
                      onClick={initializeTilesNumber}
                      className="restart-button__btn"
                    >
                      Retry
                    </button>
                  )}

                </div>
              </div>
            )}

            {/* for Image */}

            {finalData?.gameType == "IMAGE" && passwordAccess !== true && (
              <>
                {!isWin && (
                  <div className="slidingPuzzle-block">
                    <div className="sliding-puzzle-container">
                      {!isWin && timeIsUp !== true && EnableTimer && (
                        <div
                          className="statistic withMoves"
                          style={{ width: "568px" }}
                        >

                          <div className="statistic__moves">
                            <span className="statistic__moves-title">
                              {" "}
                              Number Of Actions{" "}
                            </span>
                            <span>{moves}</span>
                          </div>
                          <div>
                            {console.log(
                              formattedTimeLeft,
                              "formattedTimeLeftformattedTimeLeft"
                            )}
                            <div className="statistic__timer">
                              {TimeType == "stopwatch"
                                ? formattedTimeTaken
                                : formattedTimeLeft}
                            </div>
                          </div>
                        </div>
                      )}
                      {showCoverModel && (
                        <div
                          className="modal cover-modal"
                          style={{
                            display: "block",
                            maxWidth: "568px",
                            left: "50%",
                            transform: "translateX(-50%)",
                          }}
                        >
                          {console.log(slidingpuzzle, "ddededed")}
                          <div className="modal__content">
                            <div className="modal__content-scroll">
                              <div className="common-cover">
                                <h2 className="common-cover__title">
                                  {slidingpuzzle?.coverHeader || finalData?.coverHeader}
                                  vcfvffv
                                </h2>
                                <button
                                  onClick={() =>
                                    setshowCoverModel((prev) => !prev)
                                  }
                                  style={{
                                    backgroundColor: NUmberGameTheme,
                                    color: "rgb(255, 255, 255)",
                                  }}
                                  className="common-cover__button"
                                >
                                  {slidingpuzzle?.coverButtonText || finalData?.coverButtonText}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {!isWin && timeIsUp !== true && (
                        <div className="sliding-puzzle__playground">
                          <div className="sliding-puzzle__playground__workplace">
                            <div
                              className="sliding-puzzle__board"
                              style={{
                                minHeight: 500,
                                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                                // gridTemplateRows: `repeat(${rows}, 1fr)`,
                                // backgroundImage: `url(${imageUrl})`,
                                // backgroundSize: "cover"
                              }}
                            >
                              {tiles.map((tile, index) => {
                                const row = Math.floor(index / cols);
                                const col = index % cols;
                                const emptyIndex = tiles.indexOf(0); // Get the latest empty tile index
                                const isWinningTile =
                                  isWin && index === emptyIndex;

                                // Determine which tile to display in the empty spot upon winning
                                const displayedTile =
                                  tile === 0 && isWin
                                    ? emptyTileIndex + 1
                                    : tile;

                                return (
                                  <div
                                    key={index}
                                    className={`sliding-puzzle__tile ${tile === 0 && !isWin
                                      ? "sliding-puzzle__tile--is-hidden"
                                      : "sliding-puzzle__tile--is-can-move"
                                      }`}
                                    style={{
                                      backgroundImage:
                                        displayedTile !== 0
                                          ? `url(${imageUrl})`
                                          : "none",
                                      backgroundSize: `${cols * 100}% ${rows * 100}%`,
                                      backgroundPosition:
                                        displayedTile !== 0
                                          ? `${((displayedTile - 1) % cols) *
                                          (100 / (cols - 1))
                                          }% ${Math.floor(
                                            (displayedTile - 1) / cols
                                          ) *
                                          (100 / (rows - 1))
                                          }%`
                                          : `${(tiles.length % cols) *
                                          (100 / (cols - 1))
                                          }% ${Math.floor(tiles.length / cols) *
                                          (100 / (rows - 1))
                                          }%`, // Handle last missing tile
                                      margin: "4px",
                                      border: "3px solid transparent",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      fontSize: "24px",
                                      fontWeight: "bold",
                                      color: "white",
                                      cursor:
                                        tile !== 0 ? "pointer" : "default",
                                    }}
                                    onClick={() =>
                                      tile !== 0 && handleTileClick(index)
                                    }
                                  >
                                    {isShowImageNumbers && tile !== 0 && (
                                      <span className="sliding-puzzle__tile-number">
                                        {tile}
                                      </span>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                          <div className="sliding-puzzle__shuffle-button-container">
                            {ToggleShuffle !== true && (
                              <button
                                onClick={initializeTiles}
                                className="common__button custom sliding-puzzle__shuffle-button"
                              >
                                Shuffle
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {isWin && !timeIsUp && (
                  // <div className="final-screen is-win">
                  //   <div
                  //     className="final-screen__image-container"
                  //     style={{ paddingBottom: "75%" }}
                  //   >
                  //     <div
                  //       className="final-screen__image"
                  //       style={{
                  //         backgroundImage: `url(${ImageData.struct.final.image})`,
                  //       }}
                  //     ></div>
                  //   </div>
                  //   <div className="final-screen__content">
                  //     <div className="final-screen__content-header">
                  //       {ImageData.struct.final.header}
                  //     </div>
                  //     <div className="restart-button__wrapper">
                  //       {ToggleShuffle !== true && (
                  //         <button
                  //           onClick={initializeTiles}
                  //           className="restart-button__btn"
                  //         >
                  //           Restart
                  //         </button>
                  //       )}
                  //     </div>
                  //   </div>
                  // </div>
                  <div className="final-screen is-win">
                    <div
                      className="final-screen__image-container"
                      style={{ paddingBottom: "75%" }}
                    >
                      IMAGEEEE
                      <div
                        className="final-screen__image"
                        style={{
                          backgroundImage: `url(${dataHere.puzzleImage})`,
                        }}
                      >

                      </div>
                    </div>

                    <div className="final-screen__content">
                      <div className="final-screen__content-result-counter">
                        <p className="final-screen__content-result-counter-title">
                          Your Result
                        </p>
                        <p className="final-screen__content-result-counter-time">
                          {formattedTimeLeft}
                        </p>
                      </div>
                      {StarsData?.isEnableRating &&
                        starsTimeArray.map((item, i) =>
                          item > timeTaken ? <FaStar key={i} /> : <CiStar key={i} />
                        )}

                      <div className="final-screen__content-header">
                        {dataHere.finalMessage}
                      </div>
                      {console.log(dataHere, "dataHere")}

                      <div className="restart-button__wrapper">
                        {callToActionEnabledButton === true && (
                          <button
                            style={{ backgroundColor: NUmberGameTheme, color: "white" }}
                            onClick={handleNavigate}
                            className="restart-button__btn"

                          >

                            {dataHere?.coverButtonText}
                          </button>
                        )}
                        {console.log(HideRestartButton, "sddsdsd")}
                      </div>
                      {hideRestart || HideRestartButton !== true && (
                        <button
                          onClick={initializeTilesNumber}
                          className="restart-button__btn"
                        >
                          Restart
                        </button>
                      )}

                    </div>


                    {shouldShowResults && (
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

                  </div>
                )}
              </>
            )}
            {console.log(isWinNumber || isWin && showRegister, "ioioi")}
            {(isWinNumber || isWin) && showRegister && (
              <div className="">
                <div className="modal__content">
                  <div className="modal__content-scroll">
                    <div className="registration">
                      {passwordWrong && (
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
                              The code is entered incorrectly or has expired.
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
                        </div>
                      )}
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

export default PreviewSlidingPuzzle;
