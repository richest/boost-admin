import CustomModal from "components/Models";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateShortId } from "utils/helpers";
import { updateTemplateAction } from "views/pages/Templates/TemplateRedux/actions/drawerAction";

function Pairs({ formData, questions, handleChangeLogo, pairs, setPairs }) {
  const { templateDetails } = useSelector((state) => state.DrawerReducer);
  console.log(formData, "questionsquestionsquestions");
  const [opentextModal, setIsOpenTextModal] = useState(false);
  const [textModalData, setTextModalData] = useState({});

  console.log("textModalData", textModalData);
  console.log(pairs, "pairspairs")
  const dispatch = useDispatch();

  const handleSHowDescription = (e) => {
    const newValue = e
    setPairs((prev) => ({
      ...prev,
      isShowFeedback: newValue
    }))
    // const updatedData = {
    //   ...templateDetails,
    //   project_structure: {
    //     ...templateDetails.project_structure,
    //     pages: templateDetails.project_structure.pages.map((page) => ({
    //       ...page,
    //       blocks: page.blocks.map((block) =>
    //         block.id === formData?.id
    //           ? {
    //             ...block,
    //             struct: {
    //               ...block.struct,
    //               pairs: {
    //                 ...block.struct.pairs,
    //                 isShowFeedback: e,
    //               },
    //             },
    //           }
    //           : block
    //       ),
    //     })),
    //   },
    // };
    // dispatch(updateTemplateAction(updatedData));
  };

  // const handlePairText = (tile, imageType) => {
  //   console.log(tile, imageType, "ddeede")
  //   // Check if imageType (firstImage or secondImage) exists in the tile
  //   const selectedImage = tile[imageType];

  //   if (selectedImage) {
  //     // Set the textModalData with the corresponding image info
  //     setTextModalData({
  //       tileId: tile.id,
  //       imageType: imageType, // 'firstImage' or 'secondImage'
  //       text: selectedImage.text || '', // Set the text, defaulting to an empty string
  //       bgColor: selectedImage.bgColor || 'rgb(255, 255, 255)', // Default to white if no bgColor is provided
  //     });
  //   } else {
  //     // If image data is missing, fall back to defaults
  //     setTextModalData({
  //       tileId: tile.id,
  //       imageType: imageType,
  //       text: '',
  //       bgColor: 'rgb(255, 255, 255)', // Default white
  //     });
  //   }

  //   setIsOpenTextModal(true);  // Open the modal
  // };
  const handlePairText = (type, question) => {
    setTextModalData({
      tileId: question.id,
      imageType: type,
      [type]: {
        ...question[type], // this brings in the text, bgColor, etc
      },
      bgColor: question[type]?.bgColor || "#fff",
    });
    setIsOpenTextModal(true);
  };


  const handlechangePairText = (value, type) => {
    const updated = {
      ...textModalData,
      [type]: {
        ...textModalData[type],
        text: value,
      },
    };
    setTextModalData(updated);
  };
  const handleSetColor = (color) => {
    const type = textModalData.imageType;

    const updated = {
      ...textModalData,
      [type]: {
        ...textModalData[type],
        bgColor: color,
      },
      bgColor: color, // for preview
    };

    setTextModalData(updated);
  };

  // const handlechangePairText = (e) => {
  //   const updatedObject = {
  //     ...textModalData,
  //     text: e,
  //   };
  //   setTextModalData(updatedObject);
  // };
  // const handleSetColor = (color) => {
  //   console.log(color, "checkcolor");
  //   const updatedObject = {
  //     ...textModalData,
  //     bgColor: color,
  //   };
  //   setTextModalData(updatedObject);
  // };
  console.log(textModalData, "textModalData")
  const handleSaveText = () => {
    setPairs((prev) => ({
      ...prev,
      pairList: prev.pairList.map((tile) =>
        tile.id === textModalData.tileId
          ? {
            ...tile,
            [textModalData.imageType]: {
              ...tile[textModalData.imageType],
              text: textModalData?.[textModalData.imageType]?.text, // 👈 correct way if nested
              bgColor: textModalData.bgColor,
              cardType: "text",
            },
          }
          : tile
      ),
    }));

    setIsOpenTextModal(false);
  };

  // const handleSaveText = (id) => {
  //   setPairs((prev) => ({
  //     ...prev,
  //     pairList: prev.pairList.map((tile) =>
  //       tile.id === textModalData.tileId
  //         ? {
  //           ...tile,
  //           [textModalData.imageType]: {
  //             ...tile[textModalData.imageType],
  //             text: textModalData.text,
  //             bgColor: textModalData.bgColor,
  //             cardType: "text",
  //           },
  //         }
  //         : tile
  //     ),
  //   }));

  //   const updatedData = {
  //     ...templateDetails,
  //     project_structure: {
  //       ...templateDetails.project_structure,
  //       pages: templateDetails.project_structure.pages.map((page) => ({
  //         ...page,
  //         blocks: page.blocks.map((block) => {
  //           if (block.id === formData.id) {
  //             return {
  //               ...block,
  //               struct: {
  //                 ...block.struct,
  //                 pairs: {
  //                   ...block.struct.pairs,
  //                   pairList: block.struct.pairs.pairList.map((tile) =>
  //                     tile.id === textModalData.tileId
  //                       ? {
  //                         ...tile,
  //                         [textModalData.imageType]: {
  //                           ...tile[textModalData.imageType],
  //                           text: textModalData?.[textModalData.imageType]?.text,
  //                           bgColor: textModalData.bgColor,
  //                           cardType: "text",
  //                         },
  //                       }
  //                       : tile
  //                   ),
  //                 },
  //               },
  //             };
  //           }
  //           return block;
  //         }),
  //       })),
  //     },
  //   };

  //   dispatch(updateTemplateAction(updatedData));
  //   setIsOpenTextModal(false);
  // };
  // console.log(pairs, "qdqddqdqdqqd")


  const handleChangeSliderDescription = (value, id) => {
    setPairs((prev) => ({
      ...prev,
      pairList: prev?.pairList?.map((tile) =>
        tile.id === id ? { ...tile, description: value } : tile
      ),
    }));



    // const updatedData = {
    //   ...templateDetails,
    //   project_structure: {
    //     ...templateDetails.project_structure,
    //     pages: templateDetails.project_structure.pages.map((page) => ({
    //       ...page,
    //       blocks: page.blocks.map((block) => {
    //         if (block.id === formData.id) {
    //           return {
    //             ...block,
    //             struct: {
    //               ...block.struct,
    //               pairs: {
    //                 ...block.struct.pairs,
    //                 pairList: block.struct.pairs?.pairList?.map((tile) =>
    //                   tile.id === id
    //                     ? {
    //                       ...tile,
    //                       description: e,
    //                     }
    //                     : tile
    //                 ),
    //               },
    //             },
    //           };
    //         }
    //         return block;
    //       }),
    //     })),
    //   },
    // };

    // dispatch(updateTemplateAction(updatedData));
  };

  const handlechangedescriptiont = (value, type) => {
    setTextModalData((prev) => ({
      ...prev,
      [type]: {
        ...prev?.[type],
        text: value,
      },
    }));
  };
















  console.log("templateDetailstemplateDetails", templateDetails);
  console.log(textModalData, "textModalData")
  console.log(pairs, "ppspsqksqkspqkspqkspkq")
  return (
    <>
      <div class="d-flex w-100 gap-3 gap-md-0">
        <div className="w-100 p-4 scrollable-div">
          <div className="questioncontent mb-3">
            <div className="titlequestions d-flex align-items-center justify-content-between">
              <div className="questionTitle">
                <h5 className="mb-3">Pairs</h5>
              </div>
              <div className="questionTitle">
                <div class="form-check form-switch toogle-questionsbank m-0">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="useQuestionBank"
                    onChange={(e) => handleSHowDescription(e.target.checked)}
                  />
                  <label
                    class="form-check-label font-sm lh-1 text-muted"
                    for="useQuestionBank"
                  >
                    Show feedback for found pairs
                  </label>
                </div>
              </div>
            </div>
            {console.log(pairs, "09089809")}
            <div className="questionData">
              <div class="row g-4 mt-4">
                {pairs?.pairList &&
                  pairs.pairList?.map((question, index) => (
                    <div
                      class={
                        pairs?.isShowFeedback
                          ? "col-md-12"
                          : "col-md-3"
                      }
                    >
                      <div className="d-flex gap-3">
                        <div className="pairs_list_items">
                          <label className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                            Pair {index + 1}
                          </label>
                          <div className="questioncontent">
                            <div className="questionData">
                              <div class="d-flex gap-3">
                                <div className="">
                                  {/* <div
                                    className="questionImageLabel quest-cover"
                                    style={{
                                      width: 90,
                                      height: 90,
                                      margin: 0,
                                    }}
                                  >
                                    <img
                                      src={question.firstImage?.src}
                                      alt="question-image"
                                      className="w-100"
                                    />
                                    <div className="icons_pairs d-flex align-items-center gap-1">
                                      <label
                                        onClick={() => handlePairText("firstImage"
                                          , question)}
                                        role="button"
                                      >
                                        <i
                                          class="fa-solid fa-font"
                                          title="Add Text"
                                        ></i>{" "}
                                      </label>
                                      <label
                                        onClick={() =>
                                          handleChangeLogo(
                                            "first-image",
                                            formData?.id,
                                            question.id
                                          )
                                        }
                                        role="button"
                                      >
                                        <i
                                          class="fa-solid fa-camera"
                                          title="Add Image"
                                        ></i>
                                      </label>
                                      <label
                                        onClick={() =>
                                          handleChangeLogo(
                                            "first-audio",
                                            formData?.id,
                                            question.id
                                          )
                                        }
                                        role="button"
                                      >
                                        <i
                                          class="fa-solid fa-music"
                                          title="Add audio"
                                        ></i>
                                      </label>
                                    </div>
                                  </div> */}

                                  <div className="d-flex align-items-start gap-3">
                                    {["firstImage", "secondImage"].map((type) => (
                                      <div
                                        className="questionImageLabel quest-cover"
                                        style={{ width: 90, height: 90, margin: 0 }}
                                      >
                                        {(() => {
                                          const data = question[type];
                                          const cardType = data?.cardType;

                                          if (cardType === "text") {
                                            return (
                                              <div
                                                className="d-flex align-items-center justify-content-center text-center p-2 h-100 w-100"
                                                style={{
                                                  backgroundColor: data?.bgColor || "#fff",
                                                  color: data?.bgColor === "#fff" ? "#000" : "#fff",
                                                  borderRadius: "8px",
                                                }}
                                              >
                                                {console.log(data?.text, "data")}
                                                <span className="font-sm">{data?.text}</span>
                                              </div>
                                            );
                                          } else if (cardType === "image") {
                                            return <img src={data?.src} alt="Image" className="w-100" />;
                                          } else if (cardType === "audio") {
                                            return (
                                              <audio controls className="w-100">
                                                <source src={data?.src} type="audio/mpeg" />
                                                Your browser does not support the audio element.
                                              </audio>
                                            );
                                          } else {
                                            return null;
                                          }
                                        })()}

                                        {/* Icons */}
                                        <div className="icons_pairs d-flex align-items-center gap-1 mt-2">
                                          <label onClick={() => handlePairText(type, question)} role="button">
                                            <i className="fa-solid fa-font" title="Add Text"></i>
                                          </label>
                                          <label onClick={() => handleChangeLogo(`${type.replace("Image", "")}-image`, formData?.id, question.id)} role="button">
                                            <i className="fa-solid fa-camera" title="Add Image"></i>
                                          </label>
                                          <label onClick={() => handleChangeLogo(`${type.replace("Image", "")}-audio`, formData?.id, question.id)} role="button">
                                            <i className="fa-solid fa-music" title="Add Audio"></i>
                                          </label>
                                        </div>
                                      </div>

                                    ))}
                                  </div>

                                </div>
                                {/* <div
                                  className="questionImageLabel quest-cover"
                                  style={{
                                    width: 90,
                                    height: 90,
                                    margin: 0,
                                  }}
                                >
                                  <img
                                    src={question.secondImage?.src}
                                    alt="question-image"
                                    className="w-100"
                                  />
                                  <div className="icons_pairs d-flex align-items-center gap-1">
                                    <label
                                      onClick={() => handlePairText("secondImage", question)}
                                      role="button"
                                    >
                                      <i class="fa-solid fa-font"></i>{" "}
                                    </label>
                                    <label
                                      onClick={() =>
                                        handleChangeLogo(
                                          "second-image",
                                          formData?.id,
                                          question.id
                                        )
                                      }
                                      role="button"
                                    >
                                      <i class="fa-solid fa-camera"></i>
                                    </label>
                                    <label
                                      onClick={() =>
                                        handleChangeLogo(
                                          "second-audio",
                                          formData?.id,
                                          question.id
                                        )
                                      }
                                      role="button"
                                    >
                                      <i class="fa-solid fa-music"></i>
                                    </label>
                                  </div>
                                </div> */}
                              </div>
                            </div>
                          </div>
                        </div>
                        {pairs?.isShowFeedback && (
                          <div className="w-100">
                            <label class="form-label font-sm fw-medium d-flex align-items-center cursor-pointer">
                              Description
                            </label>
                            <textarea
                              className="form-control theme-control resize-none"
                              rows="4"
                              placeholder="Enter your text"
                              value={question.description || ""}
                              // onChange={(e) =>
                              //   handlechangedescriptiont(e.target.value, textModalData?.imageType)
                              // }
                              onChange={(e) =>
                                handleChangeSliderDescription(
                                  e.target.value,
                                  question.id
                                )
                              }
                            />

                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {console.log("sqsqq", textModalData?.[textModalData?.imageType])}
      {console.log(textModalData, "ikikukuiikuykuk")}
      <CustomModal open={opentextModal}>
        <div className="p-4">
          <h4 className="mb-4">Text on card</h4>
          <div className="content_textcard row g-4 mb-3">
            <div className="col-8">
              <div>
                <label class="form-label font-sm fw-medium d-flex align-items-center cursor-pointer">
                  Text on card
                </label>
                <textarea
                  className="form-control theme-control resize-none"
                  rows="4"
                  placeholder="Enter your text"
                  value={textModalData?.[textModalData?.imageType]?.text}
                  onChange={(e) => handlechangePairText(e.target.value, textModalData?.imageType)}

                ></textarea>
                <label class="form-label font-sm fw-medium d-flex align-items-center cursor-pointer">
                  Card color
                </label>
                <div className="colors_text d-flex align-items-center gap-2 mt-3">
                  <span
                    className="white"
                    role="button"
                    onClick={() => handleSetColor("#fff")}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "20px",
                      height: "20px",
                      backgroundColor: "#fff",
                      borderRadius: "100%",
                      border: "1px solid",
                    }}
                  >
                    {textModalData?.bgColor === "#fff" && (
                      <i
                        className="fa-solid fa-check"
                        style={{ color: "#000", fontSize: "14px" }}
                      />
                    )}
                  </span>
                  <span
                    className="white"
                    role="button"
                    style={{
                      width: "20px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "20px",
                      backgroundColor: "rgb(105, 177, 252)",
                      borderRadius: "100%",
                    }}
                    onClick={() => handleSetColor("rgb(105, 177, 252)")}
                  >
                    {textModalData?.bgColor === "rgb(105, 177, 252)" && (
                      <i
                        className="fa-solid fa-check"
                        style={{ color: "#fff", fontSize: "14px" }}
                      />
                    )}
                  </span>
                  <span
                    className="white"
                    role="button"
                    style={{
                      width: "20px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "20px",
                      backgroundColor: "rgb(101, 187, 90)",
                      borderRadius: "100%",
                    }}
                    onClick={() => handleSetColor("rgb(101, 187, 90)")}
                  >
                    {textModalData?.bgColor === "rgb(101, 187, 90)" && (
                      <i
                        className="fa-solid fa-check"
                        style={{ color: "#fff", fontSize: "14px" }}
                      />
                    )}
                  </span>
                  <span
                    className="white"
                    role="button"
                    style={{
                      width: "20px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "20px",
                      backgroundColor: "rgb(255, 86, 86)",
                      borderRadius: "100%",
                    }}
                    onClick={() => handleSetColor("rgb(255, 86, 86)")}
                  >
                    {textModalData?.bgColor === "rgb(255, 86, 86)" && (
                      <i
                        className="fa-solid fa-check"
                        style={{ color: "#fff", fontSize: "14px" }}
                      />
                    )}
                  </span>
                  <span
                    className="white"
                    role="button"
                    style={{
                      width: "20px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "20px",
                      backgroundColor: "rgb(255, 170, 44)",
                      borderRadius: "100%",
                    }}
                    onClick={() => handleSetColor("rgb(255, 170, 44)")}
                  >
                    {textModalData?.bgColor === "rgb(255, 170, 44)" && (
                      <i
                        className="fa-solid fa-check"
                        style={{ color: "#fff", fontSize: "14px" }}
                      />
                    )}
                  </span>
                  <span
                    className="white"
                    role="button"
                    style={{
                      width: "20px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "20px",
                      backgroundColor: "rgb(134, 70, 156)",
                      borderRadius: "100%",
                    }}
                    onClick={() => handleSetColor("rgb(134, 70, 156)")}
                  >
                    {textModalData?.bgColor === "rgb(134, 70, 156)" && (
                      <i
                        className="fa-solid fa-check"
                        style={{ color: "#fff", fontSize: "14px" }}
                      />
                    )}
                  </span>
                  <span
                    className="white"
                    role="button"
                    style={{
                      width: "20px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "20px",
                      backgroundColor: "rgb(0, 0, 0)",
                      borderRadius: "100%",
                    }}
                    onClick={() => handleSetColor("rgb(0, 0, 0)")}
                  >
                    {textModalData?.bgColor === "rgb(0, 0, 0)" && (
                      <i
                        className="fa-solid fa-check"
                        style={{ color: "#fff", fontSize: "14px" }}
                      />
                    )}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div class="h-100 d-flex flex-column">
                <label class="form-label font-sm fw-medium d-flex align-items-center cursor-pointer">
                  Approx view
                </label>

                <div
                  className="viewdiv d-flex align-items-center justify-content-center h-100 rounded-3 text-center"
                  style={{
                    backgroundColor: textModalData?.bgColor ? `${textModalData?.bgColor}` : '#f9f9f9',
                    border: `1px solid ${textModalData?.bgColor ? textModalData?.bgColor : '#ccc'}`,
                    color: `${textModalData?.bgColor ? (textModalData?.bgColor === "#fff" ? "#000" : "#fff") : "#000"}`,
                  }}
                >
                  <span>{textModalData?.[textModalData?.imageType]?.text}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-end d-flex align-items-center gap-2 justify-content-end">
            <button
              onClick={() => setIsOpenTextModal(false)}
              className="button button-secondary border-0"
            >
              Cancel
            </button>
            <button
              onClick={() => handleSaveText(textModalData.id)}
              className="button button-primary border-0"
            // disabled={textModalData?.text ? false : true}
            >
              Saveqssqs
            </button>
          </div>
        </div>
      </CustomModal>
    </>
  );
}

export default Pairs;
