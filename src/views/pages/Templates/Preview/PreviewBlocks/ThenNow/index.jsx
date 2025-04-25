import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LeadForm from "../Form";

function ThenNowPreview({ data }) {
  const { templateDetails } = useSelector((state) => state.DrawerReducer);
  console.log(
    data?.struct,
    "chckdsdsdsd"
  );
  const heading_text = data?.projectStructureJson?.pages[0]?.blocks[0]?.text;

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
  return (
    <div>
      <div className="game_mainParent">
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
      </div>
    </div>
  );
}

export default ThenNowPreview;
