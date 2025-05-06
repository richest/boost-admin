import React from "react";
import "./video.css";
import { Link } from "react-router-dom";
import { DEFAULT_VIDEO_URL } from "app/constants";

function DrawerYoutubeVideo({
  data,
  isFirst,
  isLast,
  isSelected,
  embedCode,
  handleSelectBlock,
  handleDeleteBlock,
  handleMoveUp,
  handleMoveDown,
  cloneblock,
  handleAddBlockFromBlock
}) {
  console.log(data?.embedCode.replace(/^"|"$/g, ""), "youtubeblockdtaaa");

  return (
    <div
      className={
        isSelected === "text" ? "block-builder selected" : "block-builder"
      }
      onClick={() => handleSelectBlock("youtubeVideo", data)}
    >
      <button
        className="plus-selected"
        onClick={() => handleAddBlockFromBlock(data.id)}
      >
        <i className="fa-solid fa-plus"></i>
      </button>
      <div className="main-block block-4 position-relative">
        {/* {data?.embedCode ? (
          <div
            className="main-block block-4"
            dangerouslySetInnerHTML={{
              __html: data?.embedCode
                ?.replace(/&lt;/g, "<")
                .replace(/&gt;/g, ">"),
            }}
          />
        ) : (
          <>
            <img src={DEFAULT_VIDEO_URL} className="w-100" alt="defultVideo" />
            <h3 className="text-center">Video is displayed in preview mode or after publishing</h3>
          </>
        )} */}
        <img src={DEFAULT_VIDEO_URL} className="w-100" alt="defultVideo" />
        <div className="contentvideo">
          <h6 className="text-center">
            Video is displayed in preview mode or after publishing
          </h6>
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

export default DrawerYoutubeVideo;
