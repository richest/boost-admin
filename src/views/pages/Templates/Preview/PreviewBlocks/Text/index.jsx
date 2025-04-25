import React from "react";
import "./text.css";


function PreviewTextBlock({ data }) {
  return (
    <div className={""}>
      <div
        className={`main-block block-1`}
        style={{
          backgroundColor: ` ${data?.isTransparentBackground ? "transparent" : `${data?.wP_bg}`}`,
        }}
      >
        <div
          className="ql-editor"
          dangerouslySetInnerHTML={{ __html: data?.text }}
        ></div>
      </div>
    </div>
  );
}

export default PreviewTextBlock;
