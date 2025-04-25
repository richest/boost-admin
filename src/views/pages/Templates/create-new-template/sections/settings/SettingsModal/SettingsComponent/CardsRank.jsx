import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateShortId } from "utils/helpers";
import { updateTemplateAction } from "views/pages/Templates/TemplateRedux/actions/drawerAction";

function CardsRank({ formData, errors, setRankMain, setRankCard, questions, rankCard, rankMain, handleChangeImage }) {
  const { templateDetails } = useSelector((state) => state.DrawerReducer);
  console.log(formData?.struct?.playground?.cardType, "questionsquestionsquestions");
  console.log(rankMain, "rankMain")
  const [textLength, setTextLength] = useState(0)
  const [descriptionLength, setDescriptionLength] = useState(0)
  const dispatch = useDispatch();

  const handleQuestName = (e, id) => {
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
    //               cards: block.struct.cards?.map((card) =>
    //                 card.id === id
    //                   ? {
    //                     ...card,
    //                     text: e,
    //                   }
    //                   : card
    //               ),
    //             },
    //           };
    //         }
    //         return block;
    //       }),
    //     })),
    //   },
    // };
    console.log(e.length, "ooioio")

    if (e.length > 40) return;
    setTextLength(e?.length)
    setRankCard((prevCards) =>
      prevCards?.map((card) =>
        card.id === id
          ? {
            ...card,
            text: e,
          }
          : card
      )
    );
    // dispatch(updateTemplateAction(updatedData));
  };
  console.log(rankMain, "sjoqjso")
  const handleQuestDescription = (value, id) => {
    if (value.length > 60) return;

    setDescriptionLength(value.length);

    setRankCard((prevCards) =>
      Array.isArray(prevCards)
        ? prevCards.map((card) =>
          card.id === id
            ? {
              ...card,
              description: value,
            }
            : card
        )
        : []
    );
  };


  const handleButtonText = (e, id) => {
    const updatedData = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        pages: templateDetails.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) => {
            if (block.id === formData.id) {
              return {
                ...block,
                struct: {
                  ...block.struct,
                  tiles: {
                    ...block.struct.tiles,
                    tileList: block.struct.tiles?.tileList?.map((tile) =>
                      tile.id === id
                        ? {
                          ...tile,
                          buttonText: e,
                        }
                        : tile
                    ),
                  },
                },
              };
            }
            return block;
          }),
        })),
      },
    };

    dispatch(updateTemplateAction(updatedData));
  };
  const handleButtonTextLink = (e, id) => {
    const updatedData = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        pages: templateDetails.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) => {
            if (block.id === formData.id) {
              return {
                ...block,
                struct: {
                  ...block.struct,
                  tiles: {
                    ...block.struct.tiles,
                    tileList: block.struct.tiles?.tileList?.map((tile) =>
                      tile.id === id
                        ? {
                          ...tile,
                          buttonLink: e,
                        }
                        : tile
                    ),
                  },
                },
              };
            }
            return block;
          }),
        })),
      },
    };

    dispatch(updateTemplateAction(updatedData));
  };
  const handleQuestPassword = (e, id) => {
    const updatedData = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        pages: templateDetails.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) => {
            if (block.id === formData.id) {
              return {
                ...block,
                struct: {
                  ...block.struct,
                  tiles: {
                    ...block.struct.tiles,
                    tileList: block.struct.tiles?.tileList?.map((tile) =>
                      tile.id === id
                        ? {
                          ...tile,
                          password: e,
                        }
                        : tile
                    ),
                  },
                },
              };
            }
            return block;
          }),
        })),
      },
    };

    dispatch(updateTemplateAction(updatedData));
  };

  const handleDeleteOverLayImage = (id) => {
    const updatedData = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        pages: templateDetails.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) => {
            if (block.id === formData.id) {
              return {
                ...block,
                struct: {
                  ...block.struct,
                  tiles: {
                    ...block.struct.tiles,
                    tileList: block.struct.tiles?.tileList?.map((tile) =>
                      tile.id === id
                        ? {
                          ...tile,
                          overlaySrc: "",
                        }
                        : tile
                    ),
                  },
                },
              };
            }
            return block;
          }),
        })),
      },
    };

    dispatch(updateTemplateAction(updatedData));
  };
  console.log(rankCard, "dfkjbfkjbfjkbfsfs");
  return (
    <>
      <div class="d-flex w-100 gap-3 gap-md-0">
        <div class="border-end scrollable-div result-list">
          <div className="sidebarquestions">
            <h3>Cards</h3>
            {rankCard?.length !== 0 &&
              rankCard?.map((card, index) => (
                <div className="questionSidebarList align-items-center">
                  <div className="questionImageLabel">
                    <img
                      src={
                        card.imageUrl ||
                        "https://res.cloudinary.com/dwl5gzbuz/image/upload/v1738148606/project-thumb_laxubz.png"
                      }
                      alt="question-image"
                      className=""
                    />
                  </div>
                  <p className="mb-0">{`Card ${index + 1}`}</p>
                </div>
              ))}
          </div>
        </div>
        <div className="w-100 scrollable-div p-4">
          {rankCard &&
            rankCard?.map((question, index) => (
              <div className="questioncontent mb-3">
                {/* <div className="titlequestions d-flex align-items-center justify-content-between">
                </div> */}
                <div className="questionTitle">
                  <h5 className="mb-3">Card {index + 1}</h5>
                </div>
                {console.log(rankMain?.cardType, "opwid")}
                <div className="questionData">
                  {rankMain?.cardType === "TEXT" ? (
                    <div class="row">
                      <div class="col-md-12">
                        <form>
                          {rankMain?.cardType ===
                            "TEXT" && (
                              <div className="mb-2">
                                <label className="form-label">
                                  Text <span className="text-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className={`form-control theme-control ${errors?.questions?.[question.id]?.text ? "is-invalid" : ""
                                    }`}
                                  id="questName"
                                  maxLength="60"
                                  value={question?.text}
                                  onChange={(e) => handleQuestName(e.target.value, question.id)}
                                />
                                {console.log(errors?.questions?.[question.id]?.text, "Question Error")}
                                {errors?.questions?.[question.id]?.text && (
                                  <div className="invalid-feedback">
                                    {errors.questions[question.id].text}
                                  </div>
                                )}
                              </div>
                            )}
                          <div class="mb-2">
                            <label class="form-label">Description</label>
                            <textarea
                              class="form-control theme-control"
                              value={question?.description}
                              onChange={(e) =>
                                handleQuestDescription(
                                  e.target.value,
                                  question.id
                                )
                              }
                            ></textarea>
                            <small class="quest-name-counter">
                              {question?.description?.length || 0}/60`
                            </small>

                          </div>
                        </form>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div class="row g-4">
                        <div class="col-md-2">
                          <div class="quest-cover border rounded-3 overflow-hidden w-100">
                            <img
                              src={
                                question.imageUrl ||
                                "https://res.cloudinary.com/dwl5gzbuz/image/upload/v1738148606/project-thumb_laxubz.png"
                              }
                              alt="Upload Icon"
                              className="w-100"
                            />
                            <label
                              onClick={() =>
                                handleChangeImage(
                                  "card-image",
                                  formData?.id,
                                  question.id
                                )
                              }
                              role="button"
                            >
                              <i class="fa-solid fa-camera"></i>
                            </label>
                          </div>
                        </div>

                        <div class="col-md-10">
                          <form className="h-100">
                            <div class="d-flex flex-column h-100">
                              <label class="form-label">Description</label>
                              <textarea
                                class="form-control h-100"
                                defaultValue={question?.description}
                                onChange={(e) =>
                                  handleQuestDescription(
                                    e.target.value,
                                    question.id
                                  )
                                }
                              ></textarea>
                            </div>
                          </form>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default CardsRank;
