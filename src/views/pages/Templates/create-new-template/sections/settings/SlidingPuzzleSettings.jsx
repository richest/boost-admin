import React, { useEffect, useRef, useState } from "react";
import { SketchPicker } from "react-color";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setOnLocalStorage } from "utils/localStorage";
import { STORAGE_INDEXES } from "app/constants";
import { updateTemplateAction } from "views/pages/Templates/TemplateRedux/actions/drawerAction";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import Select from "react-select";

function SlidingPuzzleSettings({
  handleChangeMedia,
  data,
  selectedBlockSettings,
  pageData,
  type,
  handleChangePositionTextImage,
  handleOpenFormFields,
  handleOpenPasswordModal,
  handleTimeUpPage,
}) {
  const { id } = selectedBlockSettings;
  console.log(pageData, "sqsqsqsqsqs")
  const [blockValues, setBlockValues] = useState({});
  const [defaultSelectedValue, setDefaultSelectedValue] = useState({});
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showColorPickerForm, setShowColorPickerForm] = useState(false);
  const [showColorButtonPickerForm, setShowColorButtonPicker] = useState(false)
  console.log(data, "datadata")
  const { templateDetails } = useSelector((state) => state.DrawerReducer);
  const passwordList = templateDetails?.project_structure?.pages
    .map((page) => page?.blocks) // Map to get the blocks from each page
    .filter((blockArray) => blockArray) // Filter out undefined or null arrays of blocks
    .flat() // Flatten the array if blocks are nested in multiple arrays
    .filter((block) => block !== null && block !== undefined) // Filter out null or undefined blocks
    .map((block) => block?.struct?.passwordList) // Access passwordList from struct of each block
    .filter((passwordList) => passwordList); // Filter out null/undefined passwordList values

  console.log(passwordList, "wedws");
  const colorPickerRef = useRef(null);
  const colorPickerButtonRef = useRef(null);
  const colorPickerRefForm = useRef(null);
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
  const handleChangeColorButton = (e) => {
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
                struct: { ...block.struct, correctColor: e },
              }
              : block
          ),
        })),
      },
    };

    dispatch(updateTemplateAction(updatedData));
  };

  const handleChangeColorTextImage = (color) => {
    console.log("HITTEDTDTTTD")
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
                struct: { ...block.struct, colorTheme: color },
              }
              : block
          ),
        })),
      },
    };

    dispatch(updateTemplateAction(updatedData));
  };

  const handleHideRestartButton = (e) => {
    console.log("esdwddw", e)
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
                struct: { ...block.struct, isHideRestartButton: e },
              }
              : block
          ),
        })),
      },
    };
    console.log(updatedData, "wowoqrwqori328903928")
    dispatch(updateTemplateAction(updatedData));
  };
  const handleShuffleButton = (e) => {
    console.log(e, "eeeeeeeeeee")
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
                struct: { ...block.struct, isShowShuffleButton: e },
              }
              : block
          ),
        })),
      },
    };

    dispatch(updateTemplateAction(updatedData));
  };

  const handleChangenoOfattempt = (e) => {
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
                struct: { ...block.struct, numberOfAttempts: e },
              }
              : block
          ),
        })),
      },
    };

    dispatch(updateTemplateAction(updatedData));
  };
  const handleChangenoLeagalstatment = (e) => {
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
                struct: { ...block.struct, legalStatement: e },
              }
              : block
          ),
        })),
      },
    };

    dispatch(updateTemplateAction(updatedData));
  };

  const handleEnablePlayerRatings = (e) => {
    console.log(e, "jiji")
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
                struct: { ...block.struct, isEnableRating: e },
              }
              : block
          ),
        })),
      },
    };

    dispatch(updateTemplateAction(updatedData));
  };
  console.log(templateDetails, "templateDetailstemplateDetails")
  const handleEnableCorrectTile = (e) => {
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
                struct: { ...block.struct, isHighlightCorrect: e },
              }
              : block
          ),
        })),
      },
    };

    dispatch(updateTemplateAction(updatedData));
  };
  const handlehideLeaderBoard = (e) => {
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
                struct: { ...block.struct, isHideLeaderboard: e },
              }
              : block
          ),
        })),
      },
    };

    dispatch(updateTemplateAction(updatedData));
  };
  const handleSelectTimerType = (e, label) => {
    console.log(e, label, "checklabel");
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
                struct: {
                  ...block.struct,
                  timerType: {
                    ...block.struct.timerType,
                    value: "countdown",
                    label: label,
                  },
                },
              }
              : block
          ),
        })),
      },
    };

    dispatch(updateTemplateAction(updatedData));
  };

  const handleSelectTimerTypeclasic = (e, label) => {
    console.log(e, label, "checklabel");

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
                struct: {
                  ...block.struct,
                  timerType: {
                    ...block.struct.timerType,
                    value: "stopwatch",
                    label: label,
                  },
                },
              }
              : block
          ),
        })),
      },
    };

    dispatch(updateTemplateAction(updatedData));
  };

  const handleEnableTimer = (e) => {
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
                struct: { ...block.struct, enableTimer: e },
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

  const handleShowLeadForm = (e) => {
    console.log(e, "sAS")
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
                struct: { ...block.struct, isShowLeadForm: e },
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

  const handleCountDownTime = (e) => {
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
                struct: { ...block.struct, countdownTime: e },
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

  const handleChangeColorInputForm = (e) => {
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
                struct: { ...block.struct, leadFormBackgroundColor: e },
              }
              : block
          ),
        })),
      },
    };
    dispatch(updateTemplateAction(updatedData));
  };

  const handleChangeColorInputFormColorPicker = (color) => {
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
                struct: { ...block.struct, leadFormBackgroundColor: color },
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

  useEffect(() => {
    if (pageData) {
      const block = pageData.blocks.find((block) => block.id === id);
      console.log(block, "checkzBLock");
      setBlockValues(block);
    }
  }, [pageData, templateDetails]);

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (
  //       colorPickerRef.current &&
  //       !colorPickerRef.current.contains(event.target) || colorPickerButtonRef.current &&
  //       !colorPickerButtonRef.current.contains(event.target)
  //     ) {
  //       setShowColorButtonPicker(false)
  //       setShowColorPicker(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        colorPickerRefForm.current &&
        !colorPickerRefForm.current.contains(event.target) || colorPickerButtonRef.current &&
        !colorPickerButtonRef.current.contains(event.target)
      ) {
        setShowColorButtonPicker(false)
        setShowColorPickerForm(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  console.log(
    blockValues?.struct,
    "blockValuesbddddlockVdddtuoophgfgaluesblockValuesdsdsd"
  );

  return (
    <div className="panel-wrap">
      <div className="setting-block border-bottom">
        <h6 className="fw-semibold mb-4">Sliding Puzzle settings</h6>
        <div>
          <label
            className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer"
            role="button"
          >
            Color theme
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
                onChange={(color) => handleChangeColorTextImage(color.hex)}
              />
            )}
          </div>
        </div>
        {/* for \button color  */}
      </div>


      <div className="setting-block border-bottom">
        <div className="control-box">
          < label
            className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer mb-3"
            role="button"
          >
            <input
              type="checkbox"
              id="restartbutton"
              className="form-check-input theme-control shadow-none m-0"
              onChange={(e) => handleEnableCorrectTile(e.target.checked)}
              checked={blockValues?.struct?.isHighlightCorrect}
            />
            Mark Correct Tiles
          </label>

          {blockValues?.struct?.isHighlightCorrect === true && <div className="mb-3">
            <label
              className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer"
              role="button"
            >
              Correct Tile Color
            </label>
            <div ref={colorPickerButtonRef}>
              <div className="d-flex align-items-center">
                <div
                  className="color-picker-color"
                  style={{
                    backgroundColor: `${blockValues?.struct?.correctColor}`,
                  }}
                  role="button"
                  onClick={() => setShowColorButtonPicker(!showColorButtonPickerForm)}
                ></div>
                <input
                  className="colorInput form-control theme-control"
                  type="text"
                  defaultValue={blockValues?.struct?.correctColor}
                  onChange={(e) =>
                    handleChangeColorButton(e.target.value)
                  }
                />
              </div>
              {showColorButtonPickerForm && (
                <SketchPicker
                  color={blockValues?.struct?.correctColor}
                  onChange={(color) => handleChangeColorButton(color.hex)}
                />
              )}
            </div>
          </div>}
          <div className="d-flex justify-content-between form-label font-sm fw-medium d-flex align-items-center cursor-pointer mb-0">
            <label className="mb-0">Privacy</label>
            {console.log(blockValues?.struct?.passwordList.length, "uiouiou")}
            <div>
              {blockValues?.struct?.passwordList?.length === 0 ? (
                <p
                  className="mb-0 d-flex gap-2 align-items-center px-3 py-2 button button-primary"
                  role="button"
                  onClick={() => handleOpenPasswordModal(blockValues)}
                >
                  <i class="fa-solid fa-lock-open"></i> No restrictions
                </p>
              ) : (
                <p
                  className="mb-0 d-flex gap-2 align-items-center px-3 py-2 button button-primary"
                  role="button"
                  onClick={() => handleOpenPasswordModal(blockValues)}
                >
                  <i class="fa-solid fa-lock"></i> Password access
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="setting-block border-bottom">
        <div className="control-box">
          <div className="form-label font-sm fw-medium  cursor-pointer">
            <p>Gamification</p>
            < label
              className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer mb-0"
              role="button"
            >
              <input
                type="checkbox"
                id="restartbutton"
                className="form-check-input theme-control shadow-none m-0"
                onChange={(e) => handleEnablePlayerRatings(e.target.checked)}
                checked={blockValues?.struct?.isEnableRating}
              />
              Enable player ratings
            </label>
          </div>
        </div>
        {blockValues?.struct?.isEnableRating && (
          <div className="control-box">
            <div className="mb-3">
              <label
                className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer mb-0"
                role="button"
              >
                <input
                  type="checkbox"
                  id="restartbutton"
                  className="form-check-input theme-control shadow-none m-0"
                  onChange={(e) => handlehideLeaderBoard(e.target.checked)}
                  checked={blockValues?.struct?.isHideLeaderboard}
                />
                Hide leaderboard from users
              </label>
            </div>

            <div className="mb-3">
              <label
                className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer"
                role="button"
              >Number of attempts
              </label>
              <input
                className="colorInput form-control theme-control"
                type="number"
                defaultValue={blockValues?.struct?.numberOfAttempts}
                onChange={(e) => handleChangenoOfattempt(e.target.value)}
                min="0"
              />
            </div>
            <div className="mb-3">
              <label
                className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer"
                role="button"
              >Links to service policies (html)
              </label>
              <input
                className="colorInput form-control theme-control"
                type="text"
                defaultValue={blockValues?.struct?.legalStatement}
                onChange={(e) => handleChangenoLeagalstatment(e.target.value)}
                min="0"
              />
            </div>

            <div className="form-label font-sm fw-medium  cursor-pointer">
              <label
                className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer mb-0"
                role="button"
              >
                <input
                  type="checkbox"
                  id="restartbutton"
                  className="form-check-input theme-control shadow-none m-0"
                  onChange={(e) => handlehideLeaderBoard(e.target.checked)}
                  checked={blockValues?.struct?.isHideLeaderboard}
                />
                Ask user email
              </label>
            </div>
          </div>
        )}

        <div className="form-label font-sm fw-medium  cursor-pointer">
          <label
            className={`${blockValues?.struct?.isEnableRating === true ? "form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer mb-0 disabled" : "form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer mb-0"} `}
            role="button"
          >
            <input
              type="checkbox"
              id="restartbutton"
              className="form-check-input theme-control shadow-none m-0"
              onChange={(e) => handleEnableTimer(e.target.checked)}
              checked={
                blockValues?.struct?.isEnableRating
                  ? true
                  : blockValues?.struct?.enableTimer
              }
              disabled={
                blockValues?.struct?.isEnableRating === true ? true : false
              }
            />
            Enable timer
          </label>
        </div>

        {blockValues?.struct?.enableTimer && (
          <div className="control-box">
            <div className="form-label font-sm fw-medium  cursor-pointer d-flex justify-content-start gap-3">
              <label
                className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer mb-0"
                role="button"
              >
                <input
                  type="radio"
                  id="classicTimer"
                  name="timerType"
                  className=""
                  onChange={(e) =>
                    handleSelectTimerTypeclasic(
                      e.target.checked,
                      "Classic timer"
                    )
                  }
                  checked={
                    blockValues?.struct?.timerType?.value === "stopwatch"
                  }
                />
                Classic timer
              </label>
              <label
                className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer mb-0"
                role="button"
              >
                <input
                  type="radio"
                  id="countdownTimer"
                  name="timerType"
                  className=""
                  onChange={(e) =>
                    handleSelectTimerType(e.target.checked, "Countdown")
                  }
                  checked={
                    blockValues?.struct?.timerType?.value === "countdown"
                  }
                />
                Countdown
              </label>
            </div>
          </div>
        )}
        {blockValues?.struct?.timerType?.value === "countdown" && (
          <div className="">
            <div className="my-3">
              <label
                className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer"
                role="button"
              >
                Value in seconds
              </label>
              <input
                className="colorInput form-control theme-control"
                type="number"
                min={0}
                defaultValue={blockValues?.struct?.countdownTime}
                onChange={(e) => handleCountDownTime(e.target.value)}
              />
            </div>
            <div>
              {console.log(pageData?.blocks, "pageData?.blocks")}
              <p
                className="mb-0 font-sm fw-medium"
                style={{ color: "#20a2b8" }}
                role="button"
                onClick={() => handleTimeUpPage(blockValues)}
              >
                Customize the “Time is up” page
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="setting-block border-bottom">
        <label
          className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer mb-0"
          role="button"
        >
          <input
            type="checkbox"
            id="restartbutton"
            className="form-check-input theme-control shadow-none m-0"
            onChange={(e) => handleHideRestartButton(e.target.checked)}
            checked={blockValues?.struct?.isHideRestartButton}
          />
          Hide restart button
        </label>
      </div>
      {/* HIDE sHIFFLE buTTON  */}
      {console.log(blockValues?.struct, "blockValues?.struct")}
      <div className="setting-block border-bottom">
        <label
          className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer mb-0"
          role="button"
        >
          <input
            type="checkbox"
            id="restartbutton"
            className="form-check-input theme-control shadow-none m-0"
            onChange={(e) => handleShuffleButton(e.target.checked)}
            checked={blockValues?.struct?.isShowShuffleButton}
          />
          Hide Shuffle button
        </label>
      </div>


      {/* hiDE sHUFFLE buTTON  */}
      <div className="setting-block border-bottom">
        <label
          className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer mb-0"
          role="button"
        >
          <input
            type="checkbox"
            id="redirectresultscreen"
            className="form-check-input theme-control shadow-none m-0"
            onChange={(e) => handleRedirectEnabled(e.target.checked)}
            checked={blockValues?.struct?.isRedirectEnabled}
          />
          Redirect from result screen
        </label>
        {blockValues?.struct?.isRedirectEnabled && (
          <>
            <div className="my-3">
              <label
                className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer"
                role="button"
              >
                Redirect to (link)
              </label>
              <input
                className="colorInput form-control theme-control"
                type="text"
                defaultValue={blockValues?.struct?.redirectTargetLink}
                onChange={(e) => handleChangeLink(e.target.value)}
              />
            </div>
            <div className="">
              <label
                className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer"
                role="button"
              >
                Seconds before redirect
              </label>
              <input
                className="colorInput form-control theme-control"
                type="number"
                defaultValue={blockValues?.struct?.callToActionLink}
                onChange={(e) => handleChangeRedirectTimeout(e.target.value)}
              />
            </div>
          </>
        )}
      </div>

      <div className="setting-block border-bottom">
        <label
          className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer mb-0"
          role="button"
        >
          <input
            type="checkbox"
            id="showleadform"
            className="form-check-input theme-control shadow-none m-0"
            onChange={(e) => handleShowLeadForm(e.target.checked)}
            checked={blockValues?.struct?.isShowLeadForm}
          />
          Show lead form
        </label>

        {blockValues?.struct?.isShowLeadForm && (
          <>
            <button
              onClick={() => handleOpenFormFields(id)}
              className="button button-primary outline px-3 py-2 font-sm my-2"
            >
              Customize
            </button>
            <div className="">
              <label
                className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer"
                role="button"
              >
                Background color
              </label>
              <div ref={colorPickerRefForm}>
                <div className="d-flex align-items-center">
                  <div
                    className="color-picker-color"
                    style={{
                      backgroundColor: `${blockValues?.struct?.leadFormBackgroundColor}`,
                    }}
                    role="button"
                    onClick={() => setShowColorPickerForm(!showColorPickerForm)}
                  ></div>
                  <input
                    className="colorInput form-control theme-control"
                    type="text"
                    defaultValue={blockValues?.struct?.leadFormBackgroundColor}
                    onChange={(e) => handleChangeColorInputForm(e.target.value)}
                  />
                </div>
                {showColorPickerForm && (
                  <SketchPicker
                    color={blockValues?.struct?.leadFormBackgroundColor}
                    onChange={(color) =>
                      handleChangeColorInputFormColorPicker(color)
                    }
                  />
                )}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="setting-block border-bottom">
        <label
          className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer mb-0"
          role="button"
        >
          <input
            type="checkbox"
            id="calltoactionbutton"
            className="form-check-input theme-control shadow-none m-0"
            onChange={(e) => handleCallToActionButton(e.target.checked)}
            checked={blockValues?.struct?.callToActionEnabled}
          />
          Call to action button
        </label>

        {blockValues?.struct?.callToActionEnabled && (
          <>
            <div className="my-3">
              <label
                className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer"
                role="button"
              >
                Button Text
              </label>
              <input
                className="colorInput form-control theme-control"
                type="text"
                defaultValue={blockValues?.struct?.callToActionText}
                onChange={(e) => handleChangeCallToActionText(e.target.value)}
              />
            </div>
            <div className="">
              <label
                className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer"
                role="button"
              >
                Link
              </label>
              <input
                type="text"
                className="colorInput form-control theme-control"
                defaultValue={blockValues?.struct?.callToActionLink}
                onChange={(e) => handleChangeCalltoActionLink(e.target.value)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SlidingPuzzleSettings;
