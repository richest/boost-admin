import React from "react";
import "./logo.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
function PreviewLogo({ data }) {
  console.log(data, "checkdatafotthisss");
  const { templateDetails } = useSelector((state) => state.DrawerReducer);
  console.log(
    templateDetails?.project_structure?.app?.isOpenLinksInNewTab,
    "sdsdsdsdsdsdsdsd"
  );

  return (
    <div className={"previewBlock "}>
      <div
        className="main-block block-3"
        style={{
          textAlign: `${data?.position?.value}`,
          padding: `${data?.top}px ${data?.right}px ${data?.bottom}px ${data?.left}px`,
        }}
      >
        {data?.link ? (
          <>
            {templateDetails?.project_structure?.app?.isOpenLinksInNewTab ? (
              <Link to={data.link} target="_blank">
                <img
                  className=""
                  src={data?.url}
                  style={{ width: `${data?.width}%` }}
                  alt="logo"
                />
              </Link>
            ) : (
              <Link to={data.link}>
                <img
                  className=""
                  src={data?.url}
                  style={{ width: `${data?.width}%` }}
                  alt="logo"
                />
              </Link>
            )}
          </>
        ) : (
          <img
            className=""
            src={data?.url}
            style={{ width: `${data?.width}%` }}
            alt="logo"
          />
        )}
      </div>
    </div>
  );
}

export default PreviewLogo;
