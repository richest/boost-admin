import React, { useEffect, useRef, useState } from "react";
import "./wheel.css";
import Confetti from "react-confetti";
import confetti from "canvas-confetti";
function PreviewSpintheWheel({
  data,
  isSelected,
  handleSelectBlock,
  handleDeleteBlock,
  handleEditModal,
}) {
  console.log(data, "sdsdsdsdsds");

  const page = data;
  const getanimation = data;
  // const { width, height } = useWindowSize()
  // const [wheelBlock,setwheelBlock] = useState(data?.struct)
  const wheelBlock = data?.struct;
  const [animation, setanimation] = useState("");
  const [showani, showanimation] = useState(false);
  // const [ShowCover,setShowcover] = useState(page?.isCover?.struct?.playground)
  const [loading, setLoading] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [animationDuration, setAnimationDuration] = useState(0);
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [isWin, setisWin] = useState(false);
  const [errorScreen, setErrorScreen] = useState(false);
  const [playGame, setPlayGame] = useState({});
  const [selectedIndex, setSelectedIndex] = useState({});
  const isCover = page;
  const ShowCover = isCover?.struct?.playground;
  const COORTHEME = isCover?.struct?.colorTheme;
  console.log(playGame, "playGame")
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
    setLoading(true);
    setRotation(null); // Reset previous rotation

    const totalSections = wheelBlock?.sections?.length || 6; // Default to 6 sections if not provided
    const degreesPerSection = 360 / totalSections;

    const randomFullSpins = Math.floor(Math.random() * 5) + 5; // 5 to 10 full spins
    // const selectedSection = Math.floor(Math.random() * totalSections); // Randomly select a section
    const selectedSection = selectedSectionIndex;
    console.log(selectedSection, "ioioioioioio");
    const finalRotation =
      randomFullSpins * 360 + (360 - selectedSection * degreesPerSection);

    const animationTime = data?.struct?.playground?.animationDuration;
    setRotation(finalRotation);
    setAnimationDuration(animationTime);
    console.log("BEFOREEEEEE")
    // showanimation(true)
    console.log("AFTERRRR")
    setTimeout(
      () => {
        showanimation(true);
      },
      animationTime * 1000 - 1000
    );

    setTimeout(() => {
      const selectedValue = data?.struct?.sections[selectedSection];
      console.log(selectedValue, "MEEEEEGETSELECTED");

      setSelectedIndex(selectedValue);
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
    // showanimation(false);
  };
  console.log(showani, "showanishowani")
  // useEffect(() => {
  //   setPlayGame(ShowCover);
  // }, [ShowCover]);

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

    const weights = sections.map((section) =>
      getWeight(section.probabilityOfWinning)
    );
    const totalWeight = weights.reduce((sum, w) => sum + w, 0);
    let randomWeight = Math.random() * totalWeight;

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

  console.log(data, "assasa")
  useEffect(() => {

    setPlayGame(data?.struct?.playground);
  }, [data]);


  useEffect(() => {
    console.log("Rerendered with playGame:", playGame);
  }, [playGame]);

  useEffect(() => {
    setanimation(getanimation?.struct?.animation);
  }, [getanimation]);
  console.log(playGame?.sectionType, "sqqs playa")
  return (
    <>

      <div
        style={{ fontSize: "unset" }}
        className={isSelected ? "block-builder selected" : "block-builder"}
      // onClick={() => handleSelectBlock("spin-wheel", data)}
      >
        <div className="game_mainParent">
          <div className="">
            <>
            {isWin !== true && (
  <div id="remix-app-root">
    <div className="page">
      <div className="block __26 wheelSpin-block">
        <div className="wheel-spin-container">
          <div className="wheel-spin">
            <div
              className="wheel-spin__wheel-container"
              style={{
                width: '100%',   // Keep the width relative
                maxWidth: '720px', // Limit the max width to 720px
                aspectRatio: '1 / 1',  // Ensures the wheel stays circular
              }}
            >
              <div
                className="wheel-spin__spin-button"
                onClick={loading ? dontSpinWheel : spinWheel}
                style={{
                  backgroundImage: `url(${wheelBlock?.playground?.spinImageUrl})`,
                  width: "114px",
                  height: "114px",
                  left: "calc(50% - 57px)", // This ensures the button is centered
                  top: "calc(50% - 57px)",
                }}
              ></div>

              <div
                className="wheel-spin__win-arrow"
                style={{
                  height: "74px", 
                  top: "-27px", 
                  position: "absolute", // Correct positioning for the arrow
                  left: "50%",
                  transform: "translateX(-50%)", // Center the arrow
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 60" width="100" height="60">
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
                  width: '100%',
                  height: 'auto',
                  aspectRatio: '1 / 1', // Keep the aspect ratio consistent
                  padding: 0,
                  position: "relative",
                  listStyle: "none",
                }}
              >
                {wheelBlock?.sections.map((section, index) => {
                  const totalSections = wheelBlock?.sections.length;
                  const anglePerSection = 360 / totalSections; // Calculate each section's angle

                  // Calculate the section width dynamically to avoid gaps
                  const sectionWidth = Math.max(
                    0,
                    2 * (720 / 2) * Math.tan((anglePerSection / 2) * (Math.PI / 180)) - 2
                  );

                  // Dynamically center the section
                  const leftPosition = (720 - sectionWidth) / 2; // Center the section

                  const sectionColor = getColorScheme(
                    getanimation?.struct?.colorScheme
                  )?.[index % totalSections] || "red";

                  return (
                    <li
                      key={section.id}
                      className={`wheel-section ${String(selectedIndex?.id) === String(section.id) ? "highlighted" : ""}`}
                      style={{
                        width: `${sectionWidth}px`,
                        clipPath: totalSections > 2
                          ? "polygon(100% 0px, 50% 100%, 0px 0px)"
                          : "none", // ClipPath only for more than 2 sections
                        "--sectionRotateDeg": `${anglePerSection * index}deg`, // Rotation for each section
                        left: `${leftPosition}px`, // Centered position of section
                        backgroundColor: sectionColor, // Dynamic background color
                        border: String(selectedIndex?.id) === String(section.id) ? "" : "none",
                        transition: "border 0.5s ease-in-out",
                        boxSizing: "border-box", // Prevents unwanted shrinkage
                      }}
                    >
                      <div
                        className="wheel-section-content"
                        style={{
                          height: "140.778px",
                          bottom: totalSections === 2 ? "50%" : "172.333px",
                          width: `${sectionWidth}px`, // Consistent width for section content
                        }}
                      >
                        {playGame?.sectionType === "TEXT" ? (
                          <div
                            className="wheel-section-content__text"
                            style={{
                              color: "#fff",
                              fontFamily: getanimation[1]?.fontFamily,
                              lineHeight: "1.4",
                              fontWeight: "700",
                              fontSize: "34px",
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
              {console.log(animation, "wdwdwdwdw")}
              {showani && animation == "fireworks" && launchFireworkConfetti()}
              {showani && animation === "stars" && launchFullScreenConfetti()}
              {showani && animation === "confetti" && (
                <Confetti width={"500px"} height={"500px"} />
              )}
            </>
          </div>
        </div>
       

      </div>
     

    </>


  );
}

export default PreviewSpintheWheel;
