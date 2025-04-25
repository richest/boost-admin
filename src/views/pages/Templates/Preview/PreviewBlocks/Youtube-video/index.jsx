import React from "react";
import "./video.css";
import { Link } from "react-router-dom";
import { DEFAULT_VIDEO_URL } from "app/constants";

function PreviewYoutubeVideo({
  data,
  isSelected,
  handleSelectBlock,
  handleDeleteBlock,
}) {
  console.log(data?.embedCode.replace(/^"|"$/g, ""), "youtubeblockdtaaa");

  return (
    <div className={""}>
      <div className="main-block block-4">
        {data?.embedCode ? (
          <div
            className="main-block block-4"
            dangerouslySetInnerHTML={{
              __html: data?.embedCode
                ?.replace(/&lt;/g, "<")
                .replace(/&gt;/g, ">"),
            }}
          />
        ) : (
          <img src={DEFAULT_VIDEO_URL} className="w-100 d-block" alt="defultVideo" />
        )}
      </div>
    </div>
  );
}

export default PreviewYoutubeVideo;
