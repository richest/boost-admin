import React, { useRef, useState, useEffect } from "react";
import "./audio.css";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

function PreviewAudio({ data }) {
  console.log(data, "checkdatatata");
  return (
    <div>
      <div className="main-block block-6">
        <div className="">
          <AudioPlayer
            autoPlay={data?.isAutoPlay || false} // Apply autoPlay conditionally
            src={data?.url}
            onPlay={(e) => console.log("onPlay")}
            loop={data?.isLoop || false} // Apply loop conditionally
            muted={data?.isMuted || false} // Apply muted conditionally
          />
        </div>
      </div>
    </div>
  );
}

export default PreviewAudio;
