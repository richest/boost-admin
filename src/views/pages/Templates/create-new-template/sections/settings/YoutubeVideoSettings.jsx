import React, { useEffect, useRef, useState } from "react";
import { SketchPicker } from "react-color";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setOnLocalStorage } from "utils/localStorage";
import { STORAGE_INDEXES } from "app/constants";
import { updateTemplateAction } from "views/pages/Templates/TemplateRedux/actions/drawerAction";

function YoutubeVideoSettings({ selectedBlockSettings, pageData }) {
  const { embedCode, id } = selectedBlockSettings;
  const { templateDetails } = useSelector((state) => state.DrawerReducer);
  const colorPickerRef = useRef(null);
  const dispatch = useDispatch();

  const handleChangeTextarea = (e) => {
    let timeout;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      console.log(e, "check input after debounce");
      const _data = {
        ...templateDetails, 
        project_structure: {
          ...templateDetails.project_structure,
          pages: templateDetails.project_structure.pages.map((page) => ({
            ...page,
            blocks: page.blocks.map((block) =>
              block.id === id ? { ...block, embedCode: e } : block
            ),
          })),
        },
      };
      console.log("_data", _data);
      dispatch(updateTemplateAction(_data));
    }, 500);
  };
  console.log(embedCode, "embedCodedsds");
  return (
    <div className="panel-wrap">
      <div className="setting-block border-bottom">
        <h6 className="fw-semibold mb-4">video</h6>
        <div className="content textarea-youtubevideo">
          <textarea
            onChange={(e) => handleChangeTextarea(e.target.value)}
            rows="5"
            defaultValue={embedCode && embedCode}
            // style={{
            //   overflow: "hidden",
            //   overflowWrap: "break-word",
            //   height: "93px",
            // }}
            className="form-control theme-control"
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default YoutubeVideoSettings;
