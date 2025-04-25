import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateShortId } from "utils/helpers";
import { updateTemplateAction } from "views/pages/Templates/TemplateRedux/actions/drawerAction";

function CardsRank({ formData, questions, handleChangeImage }) {
  const { templateDetails } = useSelector((state) => state.DrawerReducer);
  console.log(formData?.struct?.playground?.cardType, "questionsquestionsquestions");

  const dispatch = useDispatch();

  const handleQuestName = (e, id) => {
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
                  cards: block.struct.cards?.map((card) =>
                    card.id === id
                      ? {
                        ...card,
                        text: e,
                      }
                      : card
                  ),
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

  const handleQuestDescription = (e, id) => {
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
                          questDescription: e,
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
  console.log(formData, "dfkjbfkjbfjkbfsfs");
  return (
    <>
      <div class="d-flex w-100 gap-3 gap-md-0">
        <div class="border-end scrollable-div result-list">
          <div className="sidebarquestions">
            <h3>Cards</h3>
            {formData?.struct?.cards?.length !== 0 &&
              formData?.struct?.cards?.map((card, index) => (
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
          {formData?.struct?.cards &&
            formData?.struct?.cards?.map((question, index) => (
              <div className="questioncontent mb-3">
                {/* <div className="titlequestions d-flex align-items-center justify-content-between">
                </div> */}
                <div className="questionTitle">
                  <h5 className="mb-3">Card {index + 1}</h5>
                </div>

                <div className="questionData">
                  {formData?.struct?.playground?.cardType === "TEXT" ? (
                    <div class="row">
                      <div class="col-md-12">
                        <form>
                          {formData?.struct?.playground?.cardType ===
                            "TEXT" && (
                              <div class="mb-2">
                                <label class="form-label">Text</label>
                                <input
                                  type="text"
                                  class="form-control theme-control"
                                  id="questName"
                                  maxlength="60"
                                  defaultValue={question?.text}
                                  onChange={(e) =>
                                    handleQuestName(e.target.value, question.id)
                                  }
                                />
                                <small class="quest-name-counter">
                                  Maximum length: 60 characters
                                </small>
                              </div>
                            )}
                          <div class="mb-2">
                            <label class="form-label">Description</label>
                            <textarea
                              class="form-control theme-control"
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
