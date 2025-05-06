import React, { useEffect, useRef, useState } from "react";
import { SketchPicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { updateTemplateAction } from "views/pages/Templates/TemplateRedux/actions/drawerAction";

function MemorySettings({
  data,
  selectedBlockSettings,
  pageData,
  handleOpenFormFields,
  handleOpenPasswordModal,
  handleTimeUpPage,
}) {
  const { id } = selectedBlockSettings;
  const [blockValues, setBlockValues] = useState({});
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showColorPickerForm, setShowColorPickerForm] = useState(false);
  const { templateDetails } = useSelector((state) => state.DrawerReducer);
  const colorPickerRef = useRef(null);
  const colorPickerRefForm = useRef(null);
  const dispatch = useDispatch();
  console.log(blockValues, "blockValuesblockValues")
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

  const handleChangeColorTextImage = (color) => {
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
    console.log(e, "qsqsqsqq")
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

    dispatch(updateTemplateAction(updatedData));
  };
  const handleShowNumbers = (e) => {
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
                struct: { ...block.struct, numberedCardBacks: e },
              }
              : block
          ),
        })),
      },
    };

    dispatch(updateTemplateAction(updatedData));
  };

  const handleShowToMemorize = (e) => {
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
                struct: { ...block.struct, showToMemorize: e },
              }
              : block
          ),
        })),
      },
    };

    dispatch(updateTemplateAction(updatedData));
  };

  const handleChangenoSecondsmemorize = (e) => {
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
                struct: { ...block.struct, showToMemorizeTime: e },
              }
              : block
          ),
        })),
      },
    };

    dispatch(updateTemplateAction(updatedData));
  };

  const handleChangenoTimeOutClosing = (e) => {
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
                struct: { ...block.struct, timeoutClosingCards: e },
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

  const handleSelectNumberOption = (e, label) => {
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
                  numberedCardBacksType: {
                    ...block.struct.numberedCardBacksType,
                    value: e,
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

  const handleSelectNumberOptionSecond = (e, label) => {
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
                  numberedCardBacksType: {
                    ...block.struct.numberedCardBacksType,
                    value: e,
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
  const handleEnableStars = (e) => {
    console.log(e, "sdscsc")
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
                struct: { ...block.struct, enableStars: e },
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
      const block = pageData?.blocks?.find((block) => block.id === id);
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
        colorPickerRefForm.current &&
        !colorPickerRefForm.current.contains(event.target)
      ) {
        setShowColorPickerForm(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  console.log(
    blockValues,
    "blockValuesbddddlockVdddddtuoophgfgaluesblockValuesdsdsd"
  );

  return (
    <div className="panel-wrap">
      <div className="setting-block border-bottom">
        <h6 className="fw-semibold mb-4">Memory settings</h6>
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
            onChange={(e) => handleShowNumbers(e.target.checked)}
            checked={blockValues?.struct?.numberedCardBacks}
          />
          Number card backs
        </label>
      </div>

      <div className="setting-block border-bottom">
        {blockValues?.struct?.numberedCardBacks && (
          <div className="control-box">
            <div className="form-label font-sm fw-medium  cursor-pointer d-flex justify-content-start gap-3 mb-3">
              <label
                className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer mb-0"
                role="button"
              >
                <input
                  type="radio"
                  id="classicTimer"
                  name="good"
                  className=""
                  onChange={() =>
                    handleSelectNumberOption("option_1", "Option 1")
                  }
                  checked={
                    blockValues?.struct?.numberedCardBacksType?.value ===
                    "option_1"
                  }
                />
                Option 1
              </label>
              <label
                className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer mb-0"
                role="button"
              >
                <input
                  type="radio"
                  id="countdownTimer"
                  name="good"
                  className=""
                  onChange={() =>
                    handleSelectNumberOptionSecond("option_2", "Option 2")
                  }
                  checked={
                    blockValues?.struct?.numberedCardBacksType?.value ===
                    "option_2"
                  }
                />
                Option 2
              </label>
            </div>
          </div>
        )}
        <label
          className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer mb-0"
          role="button"
        >
          <input
            type="checkbox"
            id="restartbutton"
            className="form-check-input theme-control shadow-none m-0"
            onChange={(e) => handleShowToMemorize(e.target.checked)}
            checked={blockValues?.struct?.showToMemorize}
          />
          Show cards before the game start
        </label>
        {blockValues?.struct?.showToMemorize && (
          <div className="control-box mt-3">
            <label className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
              Time to memorize (in seconds)
            </label>
            <input
              className="colorInput form-control theme-control"
              type="number"
              defaultValue={blockValues?.struct?.showToMemorizeTime}
              onChange={(e) => handleChangenoSecondsmemorize(e.target.value)}
              min="0"
            />
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
      <div className="setting-block border-bottom">
        <label className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
          Delay before flipping cards (in seconds)
        </label>
        <input
          className="colorInput form-control theme-control"
          type="number"
          defaultValue={blockValues?.struct?.timeoutClosingCards}
          onChange={(e) => handleChangenoTimeOutClosing(e.target.value)}
          min="0"
        />
      </div>

      <div className="setting-block border-bottom">
        <div className="control-box">
          <div className="d-flex justify-content-between form-label font-sm fw-medium d-flex align-items-center cursor-pointer mb-0">
            <label className="mb-0">Privacy</label>
            <div>
              {blockValues?.struct?.passwordList?.length === 0 ? (
                <p
                  role="button"
                  className="mb-0 d-flex gap-2 align-items-center px-3 py-2 button button-primary"
                  onClick={() => handleOpenPasswordModal(blockValues)}
                >
                  <i class="fa-solid fa-lock-open"></i> No restrictions
                </p>
              ) : (
                <p
                  role="button"
                  className="mb-0 d-flex gap-2 align-items-center px-3 py-2 button button-primary"
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
            <label
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
                Hide leaderboard from users
              </label>
            </div>

            <div className="mb-3">
              <label className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                Number of attempts
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
              <label className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                Links to service policies (html)
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
        {console.log(blockValues?.struct?.enableStars, "blockValuesblockValues")}
        {blockValues?.struct?.enableTimer && (
          <div className="control-box">
            <div className="d-flex justify-content-start gap-3">
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
        {blockValues?.struct?.enableTimer && blockValues?.struct?.timerType?.value === "stopwatch" && (
          <div className="form-label font-sm fw-medium  cursor-pointer">
            <label
              className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer mb-0"
              role="button"
            >
              <input
                type="checkbox"
                id="restartbutton"
                className="form-check-input theme-control shadow-none m-0"
                onChange={(e) => handleEnableStars(e.target.checked)}
                checked={blockValues?.struct?.enableStars}
              />
              Enable player ratings
            </label>
          </div>
        )}
        {console.log(blockValues?.struct?.timerType?.value, "dvdvdvdvdd")}
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
              <p
                style={{ color: "#20a2b8" }}
                role="button"
                className="mb-0 font-sm fw-medium"
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

export default MemorySettings;
