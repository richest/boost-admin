import React, { useEffect, useRef, useState } from "react";
import "./wheel.css";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import confetti from "canvas-confetti";
function SpintheWheel({
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
  console.warn(data, "4353534534");

  const page = data;
  const getanimation = data;
  console.log(getanimation, "ioioioioioi");
  // const { width, height } = useWindowSize()
  const wheelBlock = data?.struct;
  const [animation, setanimation] = useState("");
  const [showani, showanimation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [animationDuration, setAnimationDuration] = useState(0);
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [isWin, setisWin] = useState(false);
  const [playGame, setPlayGame] = useState({});
  const [selectedIndex, setSelectedIndex] = useState({});
  const isCover = page;
  const ShowCover = isCover?.struct?.playground;
  const COORTHEME = isCover?.struct?.colorTheme;
  const getSectionUnderArrow = (rotation) => {
    const sections = wheelBlock?.sections || [];
    const numSections = sections.length;
    if (numSections === 0) return null;
    const sectionAngle = 360 / numSections;
    const normalizedRotation = ((rotation % 360) + 360) % 360;
    let sectionIndex = Math.floor(normalizedRotation / sectionAngle);
    if (normalizedRotation === 0) {
      sectionIndex = numSections - 1;
    }
    return { section: sections[sectionIndex], index: sectionIndex };
  };
  console.log(animation, "animationanimation");
  const launchFullScreenConfetti = () => {
    confetti({
      particleCount: 200, // More particles for full coverage
      spread: 360, // Spread in all directions
      origin: { x: 0.5, y: 0.5 }, // Start from the center
      colors: ["#ffcc00", "#ff6600", "#ff0066"],
      shapes: ["star"],
      // scalar: 1.2, // Size of particles
      // gravity: 0.3, // Slows down the fall
      // decay: 0.95, // Slows down fading
      // startVelocity: 20, // Launch speed
      // ticks: 200, // Longer duration
    });
  };

  // Call the createStarConfetti function when the component mounts

  const launchFireworkConfetti = () => {
    const fireworksCount = 5; // Number of bursts
    for (let i = 0; i < fireworksCount; i++) {
      setTimeout(() => {
        confetti({
          particleCount: 200, // Number of particles per burst
          spread: 360, // Ensures particles explode in all directions
          origin: {
            x: Math.random(), // Random horizontal position
            y: Math.random() * 0.5, // Random height (top half of screen)
          },
          colors: ["#ffcc00", "#ff6600", "#ff0066", "#00ccff", "#00ff66"],
          shapes: ["circle", "square"], // Different shapes for variation
          scalar: 1.2, // Size of particles
          gravity: 0.4, // Slows down falling effect
          decay: 0.92, // Particles fade away slowly
          startVelocity: 60 + Math.random() * 40, // Varying launch speeds
          ticks: 300, // Lasts longer before disappearing
        });
      }, i * 800); // Delay each burst slightly for a fireworks effect
    }
  };
  const HideRestartButtonddd = data?.struct?.isShowRestartButton;

  const spinWheel = () => {
    console.warn("jijijijji");
    setLoading(true);
    setRotation(null); // Reset previous rotation

    const totalSections = wheelBlock?.sections?.length || 6; // Default to 6 sections if not provided
    const degreesPerSection = 360 / totalSections;

    const randomFullSpins = Math.floor(Math.random() * 5) + 5; // 5 to 10 full spins
    // const selectedSection = Math.floor(Math.random() * totalSections); // Randomly select a section
    const selectedSection =
      selectedSectionIndex ?? Math.floor(Math.random() * totalSections);
    console.log(selectedSection, "ioioioioioio");
    const finalRotation =
      randomFullSpins * 360 + (360 - selectedSection * degreesPerSection);
    console.log("REACHEDDDDDD4");
    const animationTime = data?.struct?.playground?.animationDuration;
    setRotation(finalRotation);
    setAnimationDuration(animationTime);
    console.log("REACHEDDDDDD5");
    // showanimation(true)
    // setTimeout(
    //   () => {
    //     showanimation(true);
    //   },
    //   animationTime * 1000 - 1000
    // );
    // setTimeout(() => {
    //   console.log("Calling showanimation...");
    //   showanimation(true);
    // }, Math.max(0, animationTime * 1000 - 1000))
    setTimeout(() => {
      const selectedValue = data?.struct?.sections[selectedSection];
      console.log(selectedValue, "MEEEEEGETSELECTED");

      setSelectedIndex(selectedValue);
      // showanimation(true)
      setTimeout(() => {
        setisWin(true);
      }, 5000); //
    }, animationTime * 1000);
  };

  const restartSpineer = () => {
    setSelectedIndex({});
    setLoading(false);
    setRotation(0);
    setisWin(false);
    showanimation(false);
  };
  useEffect(() => {
    setPlayGame(ShowCover);
  }, [ShowCover]);

  // useEffect(() => {
  //   if (showani && animation === "STAR") {
  //     launchFullScreenConfetti();
  //   }
  // }, [showani, animation]);
  const getWeight = (probabilityString) => {
    switch (probabilityString) {
      case "VERY_HIGH":
        return 4;
      case "HIGH":
        return 3;
      case "NORMAL":
        return 1;
      case "LOW":
        return 0.5;
      default:
        return 1;
    }
  };

  const sections = wheelBlock?.sections || [];
  console.log(
    sections.map((e) => e?.probabilityOfWinning),
    "sqqsqqsqs"
  );
  const weights = sections.map((section) =>
    getWeight(section.probabilityOfWinning)
  );

  const weightedRandomSection = () => {
    const sections = wheelBlock?.sections || [];
    console.warn("in WEIGHTEDD");
    const weights = sections?.map((section) =>
      getWeight(section.probabilityOfWinning)
    );
    console.warn(weights, "io008880");
    const totalWeight = weights.reduce((sum, w) => sum + w, 0);
    let randomWeight = Math.random() * totalWeight;
    console.log(totalWeight, "p2ep22e2e");
    for (let i = 0; i < sections.length; i++) {
      randomWeight -= weights[i];
      if (randomWeight <= 0) {
        return i; // return the selected section index
      }
    }
    return sections.length - 1;
  };

  const selectedSectionIndex = weightedRandomSection();
  const getColorScheme = (scheme) => {
    switch (scheme) {
      case "ANALOGOUS":
        return [
          "#ff6600",
          "#ff9900",
          "#ffcc00",
          "#ff3300",
          "#ff6633",
          "#ff9966",
          "#ff3300",
          "#ff6600",
          "#ffcc00",
          "#ff9933",
          "#ff6600",
        ]; // 11 colors for analogous scheme
      case "MONOCHROMATIC":
        return [
          "#3333ff",
          "#6666ff",
          "#9999ff",
          "#ccccff",
          "#aaaaff",
          "#ddddff",
          "#b3b3ff",
          "#9999ff",
          "#8080ff",
          "#6666ff",
          "#4c4cff",
        ]; // 11 shades of blue
      case "TRIADIC":
        return [
          "#ff0000",
          "#00ff00",
          "#0000ff",
          "#ff6600",
          "#66ffcc",
          "#ff0066",
          "#cc0000",
          "#00cc00",
          "#0000cc",
          "#ff3300",
          "#33ff66",
        ]; // 11 colors from triadic scheme
      case "SPLIT COMPLEMENTARY":
        return [
          "#ff6600",
          "#66ffcc",
          "#ff0066",
          "#cc6600",
          "#66cc99",
          "#990066",
          "#ff3300",
          "#33ff99",
          "#ff9933",
          "#3399cc",
          "#ff6600",
        ]; // 11 colors from split complementary
      default:
        return [
          "#ffffff",
          "#cccccc",
          "#999999",
          "#666666",
          "#333333",
          "#000000",
          "#9999ff",
          "#ffcc00",
          "#cc66ff",
          "#ff6600",
          "#66cc66",
        ]; // Default fallback to 11 colors
    }
  };

  const dontSpinWheel = () => {
    console.log("TRIGGERED");
  };
  console.log(data?.struct, "data?.structdata?.struct");

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    // handlehangepropertions
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    setanimation(getanimation?.struct?.animation);
    // showanimation(true)
  }, [getanimation]);
  useEffect(() => {
    if (typeof handleSelectBlock !== "function") {
      console.warn("⚠️ handleSelectBlock is not a function");
    }
  }, [handleSelectBlock]);
  return (
    <div
      style={{ fontSize: "unset" }}
      className={isSelected ? "block-builder selected" : "block-builder"}
      onClick={() => handleSelectBlock("spin-wheel", data)}
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
            onClick={() => handleEditModal("spin-wheel", data?.id)}
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
            {isWin !== true && (
              <div id="remix-app-root">
                <div id="pagination"></div>
                <div className="page">
                  <div className="block __26 wheelSpin-block">
                    <div className="wheel-spin-container">
                      <div className="wheel-spin">
                        <div
                          className="wheel-spin__wheel-container"
                          style={{ /*width: "720px",*/ width: "100%" }}
                        >
                          <div
                            className="wheel-spin__spin-button"
                            onClick={loading ? dontSpinWheel : spinWheel}
                            style={{
                              backgroundImage: `url(${wheelBlock?.playground?.spinImageUrl})`,
                              width: "114px",
                              height: "114px",
                              left: "calc(50% - 57px)",
                              top: "calc(50% - 57px)",
                            }}
                          ></div>
                          <div
                            className="wheel-spin__win-arrow"
                            style={{ height: "74px", top: "-27px" }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 100 60"
                              width="100"
                              height="60"
                            >
                              <path
                                d="M16.3794 13.1536L47.4321 53.2769C48.226 54.3027 49.774 54.3027 50.5679 53.2769L81.6207 13.1536C82.63 11.8494 81.7012 9.95376 80.0527 9.95376L17.9473 9.95376C16.2989 9.95376 15.37 11.8494 16.3794 13.1536ZM42.7284 56.9225C45.9042 61.0258 52.0959 61.0258 55.2716 56.9225L86.3243 16.7992C90.3617 11.5825 86.6463 4.00001 80.0527 4.00001L17.9473 4C11.3537 4 7.63831 11.5825 11.6757 16.7992L42.7284 56.9225Z"
                                fill="filled"
                                stroke="red"
                                strokeWidth="2"
                              />
                            </svg>
                          </div>
                          <ul
                            className="wheel-sections"
                            style={{
                              transform: `rotate(${rotation}deg)`,
                              transition: `transform ${animationDuration}s ease-out`,
                              borderWidth: "14px",
                              width: "100%",
                              height: "auto",
                              aspectRatio: "1/1",
                              padding: 0,
                            }}
                          >
                            {wheelBlock?.sections.map((section, index) => {
                              const totalSections = wheelBlock?.sections.length;
                              const anglePerSection = 360 / totalSections;

                              const wheelDiameter = Math.min(
                                screenWidth * 0.8,
                                720
                              ); // Max width 720px, but scales down
                              const sectionWidth = Math.max(
                                0,
                                2 *
                                (wheelDiameter / 2) *
                                Math.tan(
                                  (anglePerSection / 2) * (Math.PI / 180)
                                ) -
                                2
                              );
                              const leftPosition =
                                (wheelDiameter - sectionWidth) / 2;

                              const sectionColor =
                                getColorScheme(
                                  getanimation?.struct?.colorScheme
                                )?.[index % totalSections] || "red";

                              return (
                                <li
                                  key={section.id}
                                  className={`wheel-section ${String(selectedIndex?.id) === String(section.id) ? "highlighted" : ""}`}
                                  style={{
                                    width: `${sectionWidth}px`,
                                    clipPath:
                                      totalSections > 2
                                        ? "polygon(100% 0px, 50% 100%, 0px 0px)"
                                        : "none",
                                    "--sectionRotateDeg": `${anglePerSection * index}deg`,
                                    left: `${leftPosition}px`,
                                    backgroundColor: sectionColor,
                                    border:
                                      String(selectedIndex?.id) ===
                                        String(section.id)
                                        ? ""
                                        : "none",
                                    transition: "border 0.5s ease-in-out",
                                    boxSizing: "border-box",
                                  }}
                                >
                                  {console.log(totalSections, "totalSections")}
                                  <div
                                    className="wheel-section-content"
                                    style={{
                                      height: `${wheelDiameter * 0.2}px`, // Adjust height dynamically
                                      bottom:
                                        totalSections === 2
                                          ? "50%"
                                          : `${wheelDiameter * 0.24}px`,
                                      width: `${sectionWidth}px`,
                                    }}
                                  >
                                    {ShowCover?.sectionType === "TEXT" ? (
                                      <div
                                        className="wheel-section-content__text"
                                        style={{
                                          color: "#fff",
                                          fontFamily:
                                            getanimation[1]?.fontFamily,
                                          lineHeight: "1.4",
                                          fontWeight: "700",
                                          fontSize: `${Math.max(16, wheelDiameter * 0.05)}px`, // Dynamic font size
                                        }}
                                      >
                                        {section?.text}
                                      </div>
                                    ) : (
                                      <div
                                        className="wheel-section-content__image"
                                        style={{
                                          width: `${sectionWidth}px`,
                                          height: "auto",
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                        }}
                                      >
                                        <div
                                          className="wheel-section-content__image__img"
                                          style={{
                                            backgroundImage: `url(${section.imageUrl})`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            backgroundRepeat: "no-repeat",
                                            width: "100%",
                                            height: "100%",
                                          }}
                                        ></div>
                                      </div>
                                    )}
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>

                      {/* AFTER WINNING */}
                      {/* here is the Block Dialogue  */}
                      {playGame?.isShowCover && (
                        <div className="modal cover-modal">
                          <div className="modal__content">
                            <div className="modal__content-scroll">
                              <div className="common-cover">
                                <h2 className="common-cover__title">
                                  {playGame?.coverHeader}
                                </h2>

                                <button
                                  style={{
                                    backgroundColor: "rgb(89, 145, 203)",
                                    color: "rgb(255, 255, 255)",
                                  }}
                                  onClick={() =>
                                    setPlayGame((prev) => ({
                                      ...prev,
                                      isShowCover: false,
                                    }))
                                  }
                                  className="common-cover__button"
                                >
                                  {playGame?.coverButtonText}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isWin && (
              <div className="final-screen is-win">
                <div
                  style={{ paddingBottom: "75%" }}
                  className="final-screen__image-container"
                >
                  <div
                    className="final-screen__image"
                    style={{
                      backgroundImage: `url(${`https://p.interacty.me/default-image-bg-big.svg`})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center top",
                    }}
                  ></div>
                </div>
                <div className="final-screen__content">
                  <div className="final-screen__content-header">
                    Congratulations
                  </div>
                  <div className="final-screen__content-description">
                    {selectedSection?.resultHeader}
                  </div>
                  <div className="restart-button__wrapper">
                    {HideRestartButtonddd !== true && (
                      <button
                        onClick={restartSpineer}
                        className="restart-button__btn"
                      >
                        {" "}
                        Restart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
            {console.log(
              showani && animation,
              "showani && animation",
              animation,
              showani
            )}
            {showani && animation == "FIREWORKS" && launchFireworkConfetti()}
            {showani && animation === "STAR" && launchFullScreenConfetti()}
            {showani && animation === "confetti" && (
              <Confetti width={"500px"} height={"500px"} />
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

export default SpintheWheel;
