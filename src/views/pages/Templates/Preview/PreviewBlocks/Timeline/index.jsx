import React, { useEffect, useRef, useState } from "react";
import "./timeline.css";

function PreviewTimeline({
  data,
  isSelected,
  handleSelectBlock,
  handleDeleteBlock,
  handleEditModal,
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
  const mainData = data;
  console.log(data,"checktimelinefatahererr")
  const decodeHtmlEntities = (text) => {
    return text
      ?.replace(/U\+60;/g, "<")
      .replace(/U\+62;/g, ">")
      .replace(/U\+34;/g, '"')
      .replace(/U\+47;/g, "/")
      .replace(/U\+10;/g, "\n");
  };
  const matchedTitle = decodeHtmlEntities(mainData?.text);

  const [titlePosition, setTitlePosition] = useState(50);
  const [subtitlePosition, setSubtitlePosition] = useState(105);
  const [showTitle, setShowTitle] = useState(false);
  const timelineRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (timelineRef.current) {
        const rect = timelineRef.current.getBoundingClientRect();
        const scrollOffset = Math.abs(rect.top);

        setSubtitlePosition(200 + scrollOffset);
        setTitlePosition(Math.min(80 + scrollOffset));
        setShowTitle(scrollOffset > 50);
      }
    };

    const handleMouseEnter = () => {
      window.addEventListener("scroll", handleScroll);
    };

    const handleMouseLeave = () => {
      window.removeEventListener("scroll", handleScroll);
      setTitlePosition(50);
      setSubtitlePosition(105);
      setShowTitle(false);
    };

    const refCurrent = timelineRef.current;
    if (refCurrent) {
      refCurrent.addEventListener("mouseenter", handleMouseEnter);
      refCurrent.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (refCurrent) {
        refCurrent.removeEventListener("mouseenter", handleMouseEnter);
        refCurrent.removeEventListener("mouseleave", handleMouseLeave);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      style={{ fontSize: "unset" }}
      className={""}
    >
      <div className="game_mainParent">
        <div className="">
          <>
            <div className="container py-4 overflow-hidden">
              <div
                ref={timelineRef}
                style={{
                  background: `${
                    mainData?.isTransparentBackground
                      ? "transparent"
                      : mainData?.wP_bg
                  }`,
                  height: "100%",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <div className="timeline-container">
                  <div className="py-2">
                    <h3>{mainData?.markTitle}</h3>
                  </div>
                  <div>
                    <h5 className="pb-2">{mainData?.markSubtitle}</h5>
                  </div>
                  {mainData?.imageUrl && (
                    <div className="timeline-img">
                      <img src={mainData?.imageUrl} alt={mainData?.markTitle} />
                    </div>
                  )}

                  <div>
                    <p style={{ color: "gray" }}>
                      {mainData?.imageDescription}
                    </p>
                  </div>

                  <div dangerouslySetInnerHTML={{ __html: matchedTitle }} />

                  <div
                    className="timeline-navigation-top"
                    style={{
                      top: `${titlePosition}px`,
                      opacity: showTitle ? 1 : 0,
                      visibility: showTitle ? "visible" : "hidden",
                    }}
                    onClick={() => {
                      if (timelineRef.current) {
                        timelineRef.current.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }
                    }}
                  >
                    <p>{mainData?.markTitle}</p>
                  </div>

                  <div
                    className="timeline-navigation-center"
                    style={{ top: `${subtitlePosition}px` }}
                    onClick={() => {
                      if (timelineRef.current) {
                        timelineRef.current.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }
                    }}
                  >
                    {/* <div className="timeline-navigation-center-dot"></div> */}
                  </div>
                </div>
              </div>
            </div>
          </>
        </div>
      </div>
    </div>
  );
}

export default PreviewTimeline;
