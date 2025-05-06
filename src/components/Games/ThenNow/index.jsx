import React, { useRef, useState } from "react";

function ThenNow({
  data,
  isSelected,
  handleSelectBlock,
  handleDeleteBlock,
  handleEditModal,
  handleMoveDown,
  handleMoveUp,
  isFirst,
  isLast,
  cloneblock,
  handleAddBlockFromBlock,
}) {
  console.log(data, "chekcdttatsasasayavoa");
  const heading_text = data?.projectStructureJson?.pages[0]?.blocks[0]?.text;
  const images = data?.projectStructureJson?.pages[0]?.blocks[1];

  const [position, setPosition] = useState(50);
  const delimiterRef = useRef(null);
  const containerRef = useRef(null);

  const decodeHtmlEntities = (text) => {
    return text
      ?.replace(/U\+60;/g, "<")
      .replace(/U\+62;/g, ">")
      .replace(/U\+34;/g, '"')
      .replace(/U\+47;/g, "/")
      .replace(/\\uD83D\\uDC47/g, "👇");
  };
  const decodedHtml = decodeHtmlEntities(heading_text);

  const handleMouseDown = (event) => {
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();

    const handleMouseMove = (e) => {
      let newLeft =
        ((e.clientX - containerRect.left) / containerRect.width) * 100;

      newLeft = Math.max(0, Math.min(100, newLeft));

      setPosition(newLeft);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  let minHeight;
  if (data?.imageProportions === "1:1") {
    minHeight = "800px";
  } else if (data?.imageProportions === "5:4") {
    minHeight = "640px";
  } else if (data?.imageProportions === "4:3") {
    minHeight = "600px";
  } else if (data?.imageProportions === "3:2") {
    minHeight = "533.333px";
  } else if (data?.imageProportions === "16:9") {
    minHeight = "450px";
  } else {
    minHeight = "450px";
  }
  console.log(data, "dsnklsndlksbnf");

  return (
    <div
      style={{ fontSize: "unset" }}
      className={isSelected ? "block-builder selected" : "block-builder"}
      onClick={() => handleSelectBlock("then-now", data)}
    >
      <button
        className="plus-selected"
        onClick={() => handleAddBlockFromBlock(data.id)}
      >
        <i className="fa-solid fa-plus"></i>
      </button>
      <div className="game_mainParent">
        <div className="">
          <div className="container py-4 overflow-hidden">
            <div className="text-center">
              <div dangerouslySetInnerHTML={{ __html: decodedHtml }} />
            </div>

            <div
              ref={containerRef}
              className="then-now-block"
              style={{
                width: "100%",
                aspectRatio: `${data?.imageProportions?.value}`,
              }}
            >
              <div
                className="then-now-leftimg"
                style={{
                  backgroundImage: `url(${data?.leftSrc})`,
                  // aspectRatio: `${data?.imageProportions?.value}`,
                  // backgroundSize: "cover",
                }}
              ></div>
              <div className="then-now-block__img-container">
                <div
                  className="then-now-block__img-inner-container overflow-hidden"
                  style={{ left: `${position}%` }}
                >
                  <div
                    className="then-now-block__img-inner-container"
                    style={{ left: `-${position}%` }}
                  >
                    <div
                      className="then-now-block__img"
                      style={{
                        backgroundImage: `url(${data?.rightSrc})`,
                        // aspectRatio: `${data?.imageProportions?.value}`,
                        // backgroundSize: "cover",
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <div
                ref={delimiterRef}
                onMouseDown={handleMouseDown}
                className="then-now-block__delimiter"
                style={{ left: `${position}%` }}
              >
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="24"
                    cy="24"
                    r="24"
                    fill="black"
                    fillOpacity="0.4"
                  ></circle>
                  <path
                    d="M42 24L34.5 15.3397L34.5 32.6603L42 24Z"
                    fill="#FFFFFF"
                  ></path>
                  <rect
                    x="20"
                    y="6"
                    width="8"
                    height="36"
                    rx="1"
                    fill="#FFFFFF"
                  ></rect>
                  <path
                    d="M6 24L13.5 15.3397L13.5 32.6603L6 24Z"
                    fill="#FFFFFF"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
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

export default ThenNow;
