import React, { useEffect, useRef, useState } from "react";
import "./hiddenObjects.module.css";
import moment from "moment";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { updateTemplateAction } from "views/pages/Templates/TemplateRedux/actions/drawerAction";
import CustomModal from "components/Models";
function HiddenObjects({
  data,
  isSelected,
  handleSelectBlock,
  handleDeleteBlock,
  handleEditModal,
  handleChangeLogo,
  handleMoveDown,
  handleMoveUp,
  cloneblock,
  handleAddBlockFromBlock,
}) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 1200,
    width: "100%",
    backgroundColor: "#fff",
    boxShadow: 24,
    borderRadius: "12px",
    overflow: "hidden",
    // p: 4,
    // marginInline: '12px'
  };
  console.log(data, "Dcheckhiddenobjectsasta");
  const { templateDetails } = useSelector((state) => state.DrawerReducer);
  const dispatch = useDispatch();
  const blocks = data;
  console.log(blocks?.struct?.pins, "blocks?.struct?.pins");
  const totalPins = blocks?.struct?.pins?.slice(0, blocks?.struct?.count);
  const starsTimeArray = blocks?.struct?.starsTimeList
    .split(",")
    .map((item) => item.trim());

  const Schema = Yup.object().shape({
    email:
      blocks?.struct?.isShowRatingEmail && blocks?.struct?.isEnableRating
        ? Yup.string().required("Required")
        : Yup.string(),
    code:
      blocks?.struct?.passwordList?.length > 0
        ? Yup.string().required("Required")
        : Yup.string(),
    nickname: blocks?.struct?.isEnableRating
      ? Yup.string().required("Required")
      : Yup.string(),
    legalStatement:
      blocks?.legalStatement !== "" && blocks?.struct?.isEnableRating
        ? Yup.boolean().required("Required")
        : Yup.boolean(),
  });

  const editContainerRef = useRef(null);
  const containerRef = useRef(null);
  const [pins, setPins] = useState(totalPins);
  const [previewGame, setPreviewGame] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);

  const [startGame, setStartGame] = useState(false);
  const [pinData, setPinData] = useState({});
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorMove, setCursorMove] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);
  const [openPinModal, setopenPinModal] = useState(false);
  const [matchedPins, setMatchedPins] = useState([]);
  const [gameWon, setGameWon] = useState(false);
  const [actionCount, setActionCount] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const [timeLeft, setTimeLeft] = useState(blocks?.struct?.countdownTime);
  const [pinPointData, setPinPointData] = useState({});
  const [showPinData, setShowPinData] = useState(false);
  const [codeErrorShow, setCodeErrorShow] = useState(false);
  const [showStartBtn, setShowStartBtn] = useState(blocks?.struct?.isShowCover);
  const [gameOver, setGameOver] = useState(false);
  const [showPassModal, setShowPassModal] = useState(false);

  const formattedTimeTaken = moment.utc(timeTaken * 1000).format("mm:ss");
  const formattedTimeLeft = moment.utc(timeLeft * 1000).format("mm:ss");

  const formOptions = { resolver: yupResolver(Schema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const handleMouseDown = (e, index, pin) => {
    e.preventDefault();
    setDragging(true);
    setDraggedIndex(index);
    console.log(pin, "checkpindataifhereornot");
  };

  const handleMouseUp = () => {
    if (!dragging) return;
    setDragging(false);
    setDraggedIndex(null);
  };

  const handleMouseMoveEdit = (e) => {
    if (!dragging || draggedIndex === null) return;

    const containerRect = editContainerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - containerRect.left;
    const mouseY = e.clientY - containerRect.top;

    const constrainedX = Math.min(
      Math.max(mouseX, 0),
      containerRect.width - blocks?.struct?.psize
    );
    const constrainedY = Math.min(
      Math.max(mouseY, 0),
      containerRect.height - blocks?.struct?.psize
    );

    if (draggedIndex !== -1 && draggedIndex < pins.length) {
      pins[draggedIndex].l = (constrainedX / containerRect.width) * 100;
      pins[draggedIndex].t = (constrainedY / containerRect.height) * 100;
      setPins([...pins]);
    }
  };

  const handleOpenPinSettings = (data) => {
    console.log(data, "checkdata");
    setPinData(data);
    setopenPinModal(true);
  };

  useEffect(() => {
    if (matchedPins.length === pins.length) {
      setTimeout(() => {
        setShowPinData(false);
        setGameWon(true);
      }, 2000);
    }
  }, [matchedPins, pins]);

  useEffect(() => {
    if (blocks?.struct?.enableTimer) {
      let interval;
      if (startGame && !gameWon && !showPinData) {
        interval = setInterval(() => {
          setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
          setTimeTaken((prev) => prev + 1);
        }, 1000);
      }
      return () => clearInterval(interval);
    }
  }, [startGame, gameWon, showPinData]);

  useEffect(() => {
    if (
      Object.keys(pinPointData).length > 0 &&
      (pinPointData?.blink !== "" ||
        // pinPointData?.btext !== "" ||
        pinPointData?.d !== "" ||
        pinPointData?.h !== "" ||
        pinPointData?.i !== "")
    ) {
      setShowPinData(true);
    }
  }, [pinPointData]);

  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", handleMouseMoveEdit);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMoveEdit);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMoveEdit);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  useEffect(() => {
    if (
      blocks?.struct?.timerType?.value === "countdown" &&
      blocks?.struct?.enableTimer
    ) {
      if (timeLeft === 0) {
        setGameOver(true);
      }
    }
  }, [timeLeft, blocks, data]);

  useEffect(() => {
    if (
      blocks?.struct?.passwordList?.length > 0 ||
      blocks?.struct?.isEnableRating
    ) {
      setShowPassModal(true);
    }
  }, []);

  const handleSaveModal = (id) => {
    console.log(id);
    const updatedData = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        pages: templateDetails.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === data?.id
              ? {
                  ...block,
                  struct: {
                    ...block.struct,
                    pins: block.struct.pins?.map((pin) =>
                      pin.id === id
                        ? {
                            pin: pinData,
                          }
                        : pin
                    ),
                  },
                }
              : block
          ),
        })),
      },
    };
    dispatch(updateTemplateAction(updatedData));
    setopenPinModal(false);
  };
  const handleheaderPin = (e, id) => {
    const updatedData = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        pages: templateDetails.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === data?.id
              ? {
                  ...block,
                  struct: {
                    ...block.struct,
                    pins: block.struct.pins?.map((pin) =>
                      pin.id === id
                        ? {
                            ...pin,
                            h: e,
                          }
                        : pin
                    ),
                  },
                }
              : block
          ),
        })),
      },
    };
    dispatch(updateTemplateAction(updatedData));
  };

  const handleDescriptionPin = (e, id) => {
    // const updatedObject = {
    //   ...pinData,
    //   d: e,
    // };
    // setPinData(updatedObject);

    const updatedData = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        pages: templateDetails.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === data?.id
              ? {
                  ...block,
                  struct: {
                    ...block.struct,
                    pins: block.struct.pins?.map((pin) =>
                      pin.id === id
                        ? {
                            ...pin,
                            d: e,
                          }
                        : pin
                    ),
                  },
                }
              : block
          ),
        })),
      },
    };
    dispatch(updateTemplateAction(updatedData));
  };

  const handleButtonText = (e) => {
    const updatedData = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        pages: templateDetails.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === data?.id
              ? {
                  ...block,
                  struct: {
                    ...block.struct,
                    pins: block.struct.pins?.map((pin) =>
                      pin.id === id
                        ? {
                            ...pin,
                            btext: e,
                          }
                        : pin
                    ),
                  },
                }
              : block
          ),
        })),
      },
    };
    dispatch(updateTemplateAction(updatedData));
  };

  const handleButtonLink = (e) => {
    const updatedData = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        pages: templateDetails.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === data?.id
              ? {
                  ...block,
                  struct: {
                    ...block.struct,
                    pins: block.struct.pins?.map((pin) =>
                      pin.id === id
                        ? {
                            ...pin,
                            blink: e,
                          }
                        : pin
                    ),
                  },
                }
              : block
          ),
        })),
      },
    };
    dispatch(updateTemplateAction(updatedData));
  };
  useEffect(() => {
    if (blocks) {
      const totalPins = blocks?.struct?.pins?.slice(0, blocks?.struct?.count);
      setPins(totalPins);
    }
  }, [data]);

  console.log(pins, "checkpinddsdsdsddayaioooioio");
  return (
    <div
      style={{ fontSize: "unset" }}
      className={isSelected ? "block-builder selected" : "block-builder"}
      onClick={() => handleSelectBlock("hidden-objects", data)}
    >
      <button
        className="plus-selected"
        onClick={() => handleAddBlockFromBlock(data.id)}
      >
        <i className="fa-solid fa-plus"></i>
      </button>
      <div className="game_mainParent">
        <div className="">
          <>
            <div className="hidden-objects pt-4">
              <div ref={editContainerRef} className="hidden-objects-img">
                <img src={blocks?.struct?.bimg} alt="imagesssss" />

                {pins.map((pin, index) => (
                  <div
                    key={index}
                    className={`hidden-object-marker ${
                      dragging && draggedIndex === index ? "dragging" : ""
                    }`}
                    style={{
                      position: "absolute",
                      left: `${pin.l}%`,
                      top: `${pin.t}%`,
                      transform: "translate(-50%, -50%)",
                      cursor:
                        dragging && draggedIndex === index
                          ? "grabbing"
                          : "grab",
                    }}
                    onClick={() => handleOpenPinSettings(pin)}
                    onMouseDown={(e) => handleMouseDown(e, index, pin)}
                  >
                    {blocks?.struct?.sucImg !== "" ? (
                      <img
                        style={{
                          width: `${blocks?.struct?.psize}px`,
                          height: `${blocks?.struct?.psize}px`,
                        }}
                        src={blocks?.struct?.sucImg}
                        alt="matched"
                      />
                    ) : (
                      <div
                        style={{
                          width: `${blocks?.struct?.psize}px`,
                          height: `${blocks?.struct?.psize}px`,
                          backgroundColor: `${blocks?.struct?.pcl}`,
                        }}
                        className="hidden-object-marker-pin"
                      ></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        </div>
      </div>
      <ul
        className={`${isSelected ? "inlineControls selected-controls" : "inlineControls"}  `}
      >
        <li
          className="Inline_control__list"
          title="Move up"
          role="button"
          onClick={() => handleMoveUp(data.id)}
        >
          <i className="fa-solid fa-arrow-up"></i>
        </li>
        <li
          className="Inline_control__list"
          title="Move down"
          role="button"
          onClick={() => handleMoveDown(data.id)}
        >
          <i className="fa-solid fa-arrow-down"></i>
        </li>
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
      <CustomModal open={openPinModal}>
        <div className="" style={style}>
          <div className="modal-form">
            <div className="modal-header-form">
              <h3>Hidden objects</h3>
              <button
                className="btn text-white"
                style={{ fontSize: "30px" }}
                onClick={() => setopenPinModal(false)}
              >
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="p-4 modal-form-body">
              <div className="form-left">
                <div className="fields-output">
                  <div className={`formFieldsList}`}>
                    <div className="additionalInfo">
                      <div className="fields_info">
                        <div className="mb-3">
                          <label
                            className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer"
                            role="button"
                          >
                            Title
                          </label>
                          <input
                            className=" form-control theme-control"
                            type="text"
                            defaultValue={pinData?.h}
                            onChange={(e) =>
                              handleheaderPin(e.target.value, pinData.id)
                            }
                          />
                        </div>

                        <div className="mb-3">
                          <label
                            className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer"
                            role="button"
                          >
                            Description
                          </label>
                          <textarea
                            className="form-control theme-control"
                            defaultValue={pinData?.d}
                            onChange={(e) =>
                              handleDescriptionPin(e.target.value, pinData.id)
                            }
                          />
                        </div>

                        <div className="d-flex w-100 gap-3 mb-3" role="button">
                          <div>
                            <label class="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                              Image
                            </label>

                            <div className="coverchangeImage">
                              {pinData?.i && (
                                <img src={pinData?.i} alt="cover" />
                              )}
                              <button
                                className="button button-primary border-0 font-sm"
                                onClick={() =>
                                  handleChangeLogo(
                                    "pin-image",
                                    data?.id,
                                    pinData?.id
                                  )
                                }
                              >
                                {pinData?.i ? "Change" : "Upload"}
                              </button>
                            </div>
                          </div>

                          <div className="w-100">
                            <label className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                              Button text
                            </label>
                            <input
                              className="form-control theme-control"
                              defaultValue={pinData?.btext}
                              onChange={(e) =>
                                handleButtonText(e.target.value, pinData.id)
                              }
                            />
                          </div>
                        </div>

                        <div className="">
                          <label
                            className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer"
                            role="button"
                          >
                            Button link
                          </label>
                          <input
                            className="form-control theme-control"
                            defaultValue={pinData?.blink}
                            onChange={(e) =>
                              handleButtonLink(e.target.value, pinData.id)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CustomModal>
    </div>
  );
}

export default HiddenObjects;
