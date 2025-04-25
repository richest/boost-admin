import React, { useEffect, useRef, useState } from "react";
import { SketchPicker } from "react-color";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setOnLocalStorage } from "utils/localStorage";
import { STORAGE_INDEXES } from "app/constants";
import { updateTemplateAction } from "views/pages/Templates/TemplateRedux/actions/drawerAction";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import Select from "react-select";

function LeadFormSettings({
  handleChangeMedia,
  data,
  selectedBlockSettings,
  pageData,
}) {
  console.log(selectedBlockSettings, "dshsvdkjskjfdvskjfvskfvskkkfsf");
  const { id, imageUrl } = selectedBlockSettings;

  const [blockValues, setBlockValues] = useState({});
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showColorPickerBack, setShowColorPickerback] = useState(false);

  const { templateDetails } = useSelector((state) => state.DrawerReducer);
  const colorPickerRef = useRef(null);
  const colorPickerRefback = useRef(null);
  const dispatch = useDispatch();

  const handleChangeColorInputTextImage = (e) => {
    const updatedData = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        pages: templateDetails.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === id
              ? {
                ...block,
                struct: { ...block.struct, colorTheme: e },
              }
              : block
          ),
        })),
      },
    };

    dispatch(updateTemplateAction(updatedData));
  };

  const handleChangeColorInputTextImageBackground = (e) => {
    const updatedData = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        pages: templateDetails.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === id
              ? {
                ...block,
                struct: { ...block.struct, backgroundColor: e },
              }
              : block
          ),
        })),
      },
    };
    dispatch(updateTemplateAction(updatedData));
  };

  const handleChangeColorTextImageBackground = (color) => {
    const updatedData = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        pages: templateDetails.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === id
              ? {
                ...block,
                struct: { ...block.struct, backgroundColor: color },
              }
              : block
          ),
        })),
      },
    };
    dispatch(updateTemplateAction(updatedData));
  };

  const handleRedirectEnabled = (e) => {
    const updatedData = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        pages: templateDetails.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === id
              ? {
                ...block,
                struct: { ...block.struct, isRedirectEnabled: e },
              }
              : block
          ),
        })),
      },
    };

    dispatch(updateTemplateAction(updatedData));
  };
  const handleChangeCalltoActionLink = (e) => {
    const updatedData = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        pages: templateDetails.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === id
              ? {
                ...block,
                struct: { ...block.struct, callToActionLink: e },
              }
              : block
          ),
        })),
      },
    };
    dispatch(updateTemplateAction(updatedData));
  };
  const handleCallToActionButton = (e) => {
    const updatedData = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        pages: templateDetails.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === id
              ? {
                ...block,
                struct: { ...block.struct, callToActionEnabled: e },
              }
              : block
          ),
        })),
      },
    };

    dispatch(updateTemplateAction(updatedData));
  };

  const handleChangeLink = (e) => {
    const updatedData = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        pages: templateDetails.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === id
              ? {
                ...block,
                struct: { ...block.struct, redirectTargetLink: e },
              }
              : block
          ),
        })),
      },
    };

    dispatch(updateTemplateAction(updatedData));
  };

  const handleChangeRedirectTimeout = (e) => {
    const updatedData = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        pages: templateDetails.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === id
              ? {
                ...block,
                struct: { ...block.struct, redirectTimeout: e },
              }
              : block
          ),
        })),
      },
    };

    dispatch(updateTemplateAction(updatedData));
  };

  const handleChangeCallToActionText = (e) => {
    const updatedData = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        pages: templateDetails.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === id
              ? {
                ...block,
                struct: { ...block.struct, callToActionText: e },
              }
              : block
          ),
        })),
      },
    };

    dispatch(updateTemplateAction(updatedData));
  };
  useEffect(() => {
    if (pageData) {
      const block = pageData.blocks.find((block) => block.id === id);
      console.log(block, "checkzBLock");
      setBlockValues(block);
    }
  }, [pageData, templateDetails]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target)
      ) {
        setShowColorPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        colorPickerRefback.current &&
        !colorPickerRefback.current.contains(event.target)
      ) {
        setShowColorPickerback(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="panel-wrap">
      <div className="setting-block border-bottom">
        <h6 className="fw-semibold mb-4">Lead form</h6>
        <div className="sidebar__wrapper">
          <ul className="list">
            <li className="group-block">
              <ul className="list-style-none">
                <li>
                  <label
                    className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer"
                    role="button"
                  >Color theme
                  </label>
                  <div ref={colorPickerRef}>
                    <div className="d-flex align-items-center">
                      <div
                        className="color-picker-color"
                        style={{
                          backgroundColor: `${blockValues?.struct?.colorTheme}`,
                        }}
                        role="button"
                        onClick={() => setShowColorPicker(!showColorPicker)}
                      ></div>
                      <input
                        className="colorInput form-control theme-control"
                        type="text"
                        defaultValue={blockValues?.struct?.colorTheme}
                        onChange={(e) =>
                          handleChangeColorInputTextImage(e.target.value)
                        }
                      />
                    </div>
                    {showColorPicker && (
                      <SketchPicker
                        color={blockValues?.struct?.colorTheme}
                        onChange={(color) =>
                          handleChangeColorTextImage(color)
                        }
                      />
                    )}
                  </div>
                </li>
                <li>
                  <label
                    className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer"
                    role="button"
                  >Background color
                  </label>
                  <div ref={colorPickerRefback}>
                    <div className="d-flex align-items-center">
                      <div
                        className="color-picker-color"
                        style={{
                          backgroundColor: `${blockValues?.struct?.backgroundColor}`,
                        }}
                        role="button"
                        onClick={() =>
                          setShowColorPickerback(!showColorPickerBack)
                        }
                      ></div>
                      <input
                        className="colorInput form-control theme-control"
                        type="text"
                        defaultValue={blockValues?.struct?.backgroundColor}
                        onChange={(e) =>
                          handleChangeColorInputTextImageBackground(
                            e.target.value
                          )
                        }
                      />
                    </div>
                    {showColorPickerBack && (
                      <SketchPicker
                        color={blockValues?.struct?.backgroundColor}
                        onChange={(color) =>
                          handleChangeColorTextImageBackground(color.hex)
                        }
                      />
                    )}
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div className="setting-block border-bottom">

        <label
          className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer"
          role="button"
        >
          <input
            type="checkbox"
            id="redirectresultscreen"
            className="form-check-input theme-control shadow-none m-0"
            onChange={(e) =>
              handleRedirectEnabled(e.target.checked)
            }
            defaultChecked={
              blockValues?.struct?.isRedirectEnabled
            }
          />Redirect from thankyou screen
        </label>

        {blockValues?.struct?.isRedirectEnabled && (
          <>
            <div className="mb-3">
              <label
                className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer"
                role="button"
              >Redirect to (link)
              </label>
              <input
                className="colorInput form-control theme-control"
                type="text"
                defaultValue={
                  blockValues?.struct?.redirectTargetLink
                }
                onChange={(e) => handleChangeLink(e.target.value)}
              />
            </div>

            <div className="">
              <label
                className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer"
                role="button"
              >Seconds before redirect
              </label>
              <input
                className="colorInput form-control theme-control"
                type="number"
                defaultValue={
                  blockValues?.struct?.callToActionLink
                }
                onChange={(e) =>
                  handleChangeRedirectTimeout(e.target.value)
                }
              />
            </div>
          </>
        )}
      </div>
      <div className="setting-block border-bottom">
        <label
          className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer"
          role="button"
        >
          <input
            type="checkbox"
            id="calltoactionbutton"
            className="form-check-input theme-control shadow-none m-0"
            onChange={(e) =>
              handleCallToActionButton(e.target.checked)
            }
            defaultChecked={
              blockValues?.struct?.callToActionEnabled
            }
          />Call to action button
        </label>

        {blockValues?.struct?.callToActionEnabled && (
          <>
            <div className="mb-3">
              <label
                className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer"
                role="button"
              >Button Text

              </label>
              <input
                className="colorInput form-control theme-control"
                type="text"
                defaultValue={
                  blockValues?.struct?.callToActionText
                }
                onChange={(e) =>
                  handleChangeCallToActionText(e.target.value)
                }
              />
            </div>

            <div className="">
              <label
                className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer"
                role="button"
              >Link
              </label>
              <input
                type="text"
                className="colorInput form-control theme-control"
                defaultValue={
                  blockValues?.struct?.callToActionLink
                }
                onChange={(e) =>
                  handleChangeCalltoActionLink(e.target.value)
                }
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default LeadFormSettings;
