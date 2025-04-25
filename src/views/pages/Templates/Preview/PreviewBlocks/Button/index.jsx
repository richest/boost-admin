import React from "react";
import "./button.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function PreviewButton({ data }) {
  console.log(data, "data?.textdata?.textdata?.text");
  const { templateDetails } = useSelector((state) => state.DrawerReducer);

  return (
    <div>
      <div className="main-block block-5">
        <div className={`${data?.pulse ? "pulseAnimation" : ""}`}>
          {templateDetails?.project_structure?.app?.isOpenLinksInNewTab ? (
            <Link to={data.href} target="_blank">
              <div
                className="block-button"
                style={{
                  borderRadius: `${data?.brad}px`,
                  backgroundColor: `${data?.bc}`,
                  minWidth: "150px",
                }}
                role="buton"
              >
                <div
                  className="ql-editor"
                  dangerouslySetInnerHTML={{ __html: data?.text }}
                ></div>
              </div>
            </Link>
          ) : (
            <Link to={data.href}>
              <div
                className="block-button"
                style={{
                  borderRadius: `${data?.brad}px`,
                  backgroundColor: `${data?.bc}`,
                  minWidth: "150px",
                }}
                role="buton"
              >
                <div
                  className="ql-editor text-center"
                  dangerouslySetInnerHTML={{ __html: data?.text }}
                ></div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
