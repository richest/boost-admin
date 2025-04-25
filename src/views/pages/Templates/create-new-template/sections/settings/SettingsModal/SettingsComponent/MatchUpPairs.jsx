import CustomModal from "components/Models";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateShortId } from "utils/helpers";
import { updateTemplateAction } from "views/pages/Templates/TemplateRedux/actions/drawerAction";

function MatchUpPairs({ formData,onRegisterSlideImageCallback, questions, pairData, setPairData, handleChangeLogo, selecteScreen }) {
  const { templateDetails } = useSelector((state) => state.DrawerReducer);
  console.log(formData, "questionsquestionsquestions");
  const [opentextModal, setIsOpenTextModal] = useState(false);
  const [textModalData, setTextModalData] = useState({});
  // const [pairData, setPairData] = useState({
  //   isLargeCards: false,
  //   pairList: [],
  // })

  const dispatch = useDispatch();
  const handleSHowDescription = (checked) => {
    setPairData((prev) => ({
      ...prev,
      isLargeCards: checked,
    }));
  };
  console.log(selecteScreen, "selecteScreen")
  // const handleSHowDescription = (e) => {
  //   const updatedData = {
  //     ...templateDetails,
  //     project_structure: {
  //       ...templateDetails.project_structure,
  //       pages: templateDetails.project_structure.pages.map((page) => ({
  //         ...page,
  //         blocks: page.blocks.map((block) =>
  //           block.id === formData?.id
  //             ? {
  //               ...block,
  //               struct: {
  //                 ...block.struct,
  //                 pairs: {
  //                   ...block.struct.pairs,
  //                   isLargeCards: e,
  //                 },
  //               },
  //             }
  //             : block
  //         ),
  //       })),
  //     },
  //   };
  //   dispatch(updateTemplateAction(updatedData));
  // };
  console.log(selecteScreen, "selecteScreen")
  const handlePairText = (data) => {
    setTextModalData(data);
    setIsOpenTextModal(true);
  };
  // const handleMatchImageChange = (image, slideId) => {
  //   Fn((prev) => ({
  //     ...prev,
  //     slides: prev.slides.map((slide) =>
  //       slide.id === slideId ? { ...slide, image } : slide
  //     ),
  //   }));
  // };

  const handlechangePairText = (e) => {
    const updatedObject = {
      ...textModalData,
      text: e,
    };
    setTextModalData(updatedObject);
  };
  const handleSetColor = (color) => {
    console.log(color, "checkcolor");
    const updatedObject = {
      ...textModalData,
      bgColor: color,
    };
    setTextModalData(updatedObject);
  };
  const handleSaveText = (id) => {
    setPairData((prev) => ({
      ...prev,
      pairList: prev.pairList.map((tile) =>
        tile.id === id
          ? {
            ...tile,
            firstImage: {
              ...tile.firstImage,
              text: textModalData.text,
              bgColor: textModalData.text, // use separate value if needed
              cardType: "text",
            },
          }
          : tile
      ),
    }));

    setIsOpenTextModal(false);
  };

  // const handleSaveText = (id) => {
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
  //                   pairList: block.struct.pairs?.pairList?.map((tile) =>
  //                     tile.id === id
  //                       ? {
  //                         ...tile,
  //                         firstImage: {
  //                           ...tile.firstImage,
  //                           text: textModalData.text,
  //                           bgColor: textModalData.text,
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

  // const handleAddpair = () => {
  //   const addObject = {
  //     id: generateShortId(),
  //     firstImage: {
  //       src: "https://res.cloudinary.com/dwl5gzbuz/image/upload/v1739271156/Group_3_jl6d69.png",
  //       text: "",
  //       bgColor: "#ffffff",
  //       cardType: "image",
  //     },
  //     description: "",
  //     secondImage: {
  //       src: "https://res.cloudinary.com/dwl5gzbuz/image/upload/v1739271156/Group_3_jl6d69.png",
  //       text: "",
  //       bgColor: "#ffffff",
  //       cardType: "image",
  //     },
  //   };
  //   const updatedData = {
  //     ...templateDetails,
  //     project_structure: {
  //       ...templateDetails.project_structure,
  //       pages: templateDetails.project_structure.pages.map((page) => ({
  //         ...page,
  //         blocks: page.blocks.map((block) =>
  //           block.id === formData?.id
  //             ? {
  //               ...block,
  //               struct: {
  //                 ...block.struct,
  //                 pairs: {
  //                   ...block.struct.pairs,
  //                   pairList: [...block.struct.pairs.pairList, addObject],
  //                 },
  //               },
  //             }
  //             : block
  //         ),
  //       })),
  //     },
  //   };
  //   dispatch(updateTemplateAction(updatedData));
  // };
  const handleAddpair = () => {
    const addObject = {
      id: generateShortId(),
      firstImage: {
        src: "https://res.cloudinary.com/dwl5gzbuz/image/upload/v1739271156/Group_3_jl6d69.png",
        text: "",
        bgColor: "#ffffff",
        cardType: "image",
      },
      description: "",
      secondImage: {
        src: "https://res.cloudinary.com/dwl5gzbuz/image/upload/v1739271156/Group_3_jl6d69.png",
        text: "",
        bgColor: "#ffffff",
        cardType: "image",
      },
    };

    setPairData((prev) => ({
      ...prev,
      pairList: [...prev.pairList, addObject],
    }));
  };
  const handleDeletePair = (id) => {
    setPairData((prev) => ({
      ...prev,
      pairList: prev.pairList.filter((pair) => pair.id !== id),
    }));
  };

  // const handleDeletePair = (id) => {
  //   const updatedData = {
  //     ...templateDetails,
  //     project_structure: {
  //       ...templateDetails.project_structure,
  //       pages: templateDetails.project_structure.pages.map((page) => ({
  //         ...page,
  //         blocks: page.blocks.map((block) =>
  //           block.id === formData?.id
  //             ? {
  //               ...block,
  //               struct: {
  //                 ...block.struct,
  //                 pairs: {
  //                   ...block.struct.pairs,
  //                   pairList: block.struct.pairs.pairList?.filter(
  //                     (e) => e.id !== id
  //                   ),
  //                 },
  //               },
  //             }
  //             : block
  //         ),
  //       })),
  //     },
  //   };
  //   dispatch(updateTemplateAction(updatedData));
  // };


  console.log(pairData, "aooduo")
  useEffect(() => {
    if (formData?.struct?.pairs) {
      setPairData(formData.struct.pairs);
    }
  }, [formData]);
 

  
  return (
    <>
      <div class="d-flex w-100 gap-3 gap-md-0">
        <div className="w-100 p-4 scrollable-div d-flex flex-column"  >
          <div style={{ flexGrow: 1 }}><div className="questioncontent mb-3">
            <div className="titlequestions d-flex align-items-center justify-content-between">
              <div className="questionTitle">
                <h5 className="mb-3">Pairs</h5>
              </div>
              <div className="questionTitle">
                <div class="form-check form-switch toogle-questionsbank">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="useQuestionBank"
                    onChange={(e) => handleSHowDescription(e.target.checked)}
                    checked={pairData.isLargeCards}
                  />
                  <label
                    class="form-check-label font-sm lh-1 text-muted"
                    for="useQuestionBank"
                  >
                    Large cards
                  </label>
                  <button
                    className="button button-primary border-0 px-3 py-2 ms-2"
                    onClick={() => handleAddpair()}
                  >
                    + Add Pair
                  </button>
                </div>
              </div>
            </div>
            <div className="questionData">
              <div class="row g-4 mt-4">
                {pairData?.pairList &&
                  pairData.pairList?.map((question, index) => (
                    <div class={"col-md-3"}>
                      <div className="pairs_list_items">
                        <div className="d-flex justify-content-between">
                          <label className="form-label font-sm fw-medium d-flex align-items-center cursor-pointer">
                            <span>Pair {index + 1}</span>
                          </label>
                          <button
                            type="button"
                            className="btn button-secondary px-3 border-0 text-muted"
                            onClick={() => handleDeletePair(question.id)}
                          >
                            <i class="fa-solid fa-trash"></i>
                          </button>
                        </div>

                        <div className="questioncontent">
                          <div className="questionData">
                            <div class="mb-4">
                              <div class="d-flex gap-3">
                                <div className="">
                                  <div
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
                                        onClick={() => handlePairText(question)}
                                        role="button"
                                      >
                                        <i class="fa-solid fa-font"></i>{" "}
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
                                        <i class="fa-solid fa-camera"></i>
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
                                        <i class="fa-solid fa-music"></i>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div
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
                                      onClick={() => handlePairText(question)}
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
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          </div>
          {/* <ul className="Footer_footer__bMDNk">

            <li className="Footer_footerItem__yaFNE">
              <button
                onClick={handleSaveMatchUp}
                className="button button-primary px-3 text-decoration-none"
              >
                Save
              </button>
            </li>
          </ul> */}
        </div>
      </div>
      <CustomModal open={opentextModal}>
        <div className="p-4">
          <h4 className="mb-4">Text on card</h4>
          <div className="content_textcard row g-4 mb-3">
            <div className="col-8">
              <div class="">
                <label class="form-label font-sm fw-medium d-flex align-items-center cursor-pointer">
                  Text on card
                </label>
                <textarea
                  class="form-control theme-control mb-3"
                  rows="4"
                  placeholder="Enter your text"
                  defaultValue={"check"}
                  onChange={(e) => handlechangePairText(e.target.value)}
                ></textarea>
                <label class="form-label font-sm fw-medium d-flex align-items-center cursor-pointer">
                  Card color
                </label>
                <div className="colors_text d-flex gap-2 align-items-center mt-3">
                  <span
                    className="white"
                    role="button"
                    onClick={() => handleSetColor("#fff")}
                    style={{
                      display: "inline-block",
                      width: "20px",
                      height: "20px",
                      backgroundColor: "#fff",
                      borderRadius: "100%",
                      border: "1px solid",
                    }}
                  ></span>
                  <span
                    className="white"
                    role="button"
                    style={{
                      width: "20px",
                      display: "inline-block",
                      height: "20px",
                      backgroundColor: "rgb(105, 177, 252)",
                      borderRadius: "100%",
                    }}
                    onClick={() => handleSetColor("rgb(105, 177, 252)")}
                  ></span>
                  <span
                    className="white"
                    role="button"
                    style={{
                      width: "20px",
                      display: "inline-block",
                      height: "20px",
                      backgroundColor: "rgb(101, 187, 90)",
                      borderRadius: "100%",
                    }}
                    onClick={() => handleSetColor("rgb(101, 187, 90)")}
                  ></span>
                  <span
                    className="white"
                    role="button"
                    style={{
                      width: "20px",
                      display: "inline-block",
                      height: "20px",
                      backgroundColor: "rgb(255, 86, 86)",
                      borderRadius: "100%",
                    }}
                    onClick={() => handleSetColor("rgb(255, 86, 86)")}
                  ></span>
                  <span
                    className="white"
                    role="button"
                    style={{
                      width: "20px",
                      display: "inline-block",
                      height: "20px",
                      backgroundColor: "rgb(255, 170, 44)",
                      borderRadius: "100%",
                    }}
                    onClick={() => handleSetColor("rgb(255, 170, 44)")}
                  ></span>
                  <span
                    className="white"
                    role="button"
                    style={{
                      width: "20px",
                      display: "inline-block",
                      height: "20px",
                      backgroundColor: "rgb(134, 70, 156)",
                      borderRadius: "100%",
                    }}
                    onClick={() => handleSetColor("rgb(134, 70, 156)")}
                  ></span>
                  <span
                    className="white"
                    role="button"
                    style={{
                      width: "20px",
                      display: "inline-block",
                      height: "20px",
                      backgroundColor: "rgb(0, 0, 0)",
                      borderRadius: "100%",
                    }}
                    onClick={() => handleSetColor("rgb(0, 0, 0)")}
                  ></span>
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
                    border: `1px solid ${textModalData?.bgColor === '#fff' ? '#ccc' : textModalData?.bgColor}`,
                    color: `${textModalData?.bgColor ? (textModalData?.bgColor === "#fff" ? "#000" : "#fff") : "#000"}`,
                  }}
                >
                  <span>{textModalData?.text}</span>
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
              disabled={textModalData?.text ? false : true}
            >
              Save
            </button>
          </div>
        </div>
      </CustomModal>
      {selecteScreen === "final-screen" && (
        <ResultScreen
          onRegisterSlideImageCallback={onRegisterSlideImageCallback}
          formData={formData}
          questions={formData?.struct?.questions}
          handleChangeImage={handleChangeLogo}
        />
      )}
    </>
  );
}

export default MatchUpPairs;
