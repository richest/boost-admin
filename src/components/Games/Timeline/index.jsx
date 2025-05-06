import React, { useEffect, useRef, useState } from "react";
import "./timeline.css";
import moment from "moment";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import TextEditor from "components/Text-editor";
import { useSelector, useDispatch } from "react-redux";
import { updateTemplateAction } from "views/pages/Templates/TemplateRedux/actions/drawerAction";

function Timeline({
  data,
  isSelected,
  isFirst,
  isLast,
  handleSelectBlock,
  handleDeleteBlock,
  handleEditModal,
  cloneblock,
  handleMoveDown,
  handleAddBlockFromBlock,
  handleMoveUp,
}) {
  const dispatch = useDispatch();

  const { templateDetails } = useSelector((state) => state.DrawerReducer);

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
  const decodeHtmlEntities = (text) => {
    return text
      ?.replace(/U\+60;/g, "<")
      .replace(/U\+62;/g, ">")
      .replace(/U\+34;/g, '"')
      .replace(/U\+47;/g, "/")
      .replace(/U\+10;/g, "\n");
  };
  const matchedTitle = decodeHtmlEntities(mainData?.text);
  const [editorTextButton, setEditorTextButton] = useState(`${mainData?.text}`);
  const [mainDataButton, setMainDataButton] = useState();
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

  const handleSaveText = () => {
    console.log("");
    const _data = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        pages: templateDetails.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === data?.id ? { ...block, text: editorTextButton } : block
          ),
        })),
      },
    };
    setMainDataButton(_data);
  };

  const handleChange = (html) => {
    console.log("");
    setEditorTextButton(html);
  };
  useEffect(() => {
    if (mainDataButton) {
      const _data = {
        ...templateDetails,
        project_structure: {
          ...templateDetails.project_structure,
          pages: templateDetails.project_structure.pages.map((page) => ({
            ...page,
            blocks: page.blocks.map((block) =>
              block.id === data?.id
                ? { ...block, text: editorTextButton }
                : block
            ),
          })),
        },
      };
      dispatch(updateTemplateAction(_data));
    }
  }, [mainDataButton]);
  return (
    <div
      style={{ fontSize: "unset" }}
      className={isSelected ? "block-builder selected" : "block-builder"}
      onClick={() => handleSelectBlock("timeline", data)}
    >
      <button
        className="plus-selected"
        onClick={() => handleAddBlockFromBlock(data.id)}
      >
        <i className="fa-solid fa-plus"></i>
      </button>
      <div className="game_mainParent">
        <div className="">
          <>
            <div className="container overflow-hidden">
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
                <div className="timeline-container editor-timeline">
                  <div className="py-2">
                    <input
                      type="text"
                      defaultValue={mainData?.markTitle}
                      className="w-100"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      defaultValue={mainData?.markSubtitle}
                      className="w-100"
                    />
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

                  <TextEditor
                    handleChange={handleChange}
                    handleSave={handleSaveText}
                    text={editorTextButton}
                  />
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

export default Timeline;
