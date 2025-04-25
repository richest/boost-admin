import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateShortId } from "utils/helpers";
import { updateTemplateAction } from "views/pages/Templates/TemplateRedux/actions/drawerAction";

function Quests({ formData, questions, handleChangeImage, treasurepairs, settreasuretiles }) {
  const { templateDetails } = useSelector((state) => state.DrawerReducer);
  console.log(formData, "questionsquestionsquestions");

  const dispatch = useDispatch();
  console.log(treasurepairs, "treasurepairs")
  // const handleQuestName = (e, id) => {
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
  //                 tiles: {
  //                   ...block.struct.tiles,
  //                   tileList: block.struct.tiles?.tileList?.map((tile) =>
  //                     tile.id === id
  //                       ? {
  //                         ...tile,
  //                         quest: e, // Make sure you are getting the correct value
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
  // };
  const handleQuestName = (e, id) => {
    settreasuretiles((prev) => ({
      ...prev,
      tileList: prev.tileList.map((tile) =>
        tile.id === id
          ? {
            ...tile,
            quest: e, // or e.target.value if it's from an input field
          }
          : tile
      ),
    }));
  };
  const handleQuestDescription = (e, id) => {
    settreasuretiles((prev) => ({
      ...prev,
      tileList: prev.tileList.map((tile) =>
        tile.id === id
          ? {
            ...tile,
            questDescription: e,
          }
          : tile
      ),
    }));
  };
  const handleButtonText = (e, id) => {
    settreasuretiles((prev) => ({
      ...prev,
      tileList: prev.tileList.map((tile) =>
        tile.id === id
          ? {
            ...tile,
            buttonText: e,
          }
          : tile
      ),
    }));
  };
  const handleButtonTextLink = (e, id) => {
    settreasuretiles((prev) => ({
      ...prev,
      tileList: prev.tileList.map((tile) =>
        tile.id === id
          ? {
            ...tile,
            buttonLink: e,
          }
          : tile
      ),
    }));
  };
  const handleQuestPassword = (e, id) => {
    settreasuretiles((prev) => ({
      ...prev,
      tileList: prev.tileList.map((tile) =>
        tile.id === id
          ? {
            ...tile,
            password: e,
          }
          : tile
      ),
    }));
  };

  // const handleQuestDescription = (e, id) => {
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
  //                 tiles: {
  //                   ...block.struct.tiles,
  //                   tileList: block.struct.tiles?.tileList?.map((tile) =>
  //                     tile.id === id
  //                       ? {
  //                         ...tile,
  //                         questDescription: e,
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
  // };
  // const handleButtonText = (e, id) => {
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
  //                 tiles: {
  //                   ...block.struct.tiles,
  //                   tileList: block.struct.tiles?.tileList?.map((tile) =>
  //                     tile.id === id
  //                       ? {
  //                         ...tile,
  //                         buttonText: e,
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
  // };
  // const handleButtonTextLink = (e, id) => {
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
  //                 tiles: {
  //                   ...block.struct.tiles,
  //                   tileList: block.struct.tiles?.tileList?.map((tile) =>
  //                     tile.id === id
  //                       ? {
  //                         ...tile,
  //                         buttonLink: e,
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
  // };
  // const handleQuestPassword = (e, id) => {
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
  //                 tiles: {
  //                   ...block.struct.tiles,
  //                   tileList: block.struct.tiles?.tileList?.map((tile) =>
  //                     tile.id === id
  //                       ? {
  //                         ...tile,
  //                         password: e,
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
  // };

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
  console.log(questions, "dfkjbfkjbfjkbfsfs");
  return (
    <>
      <div class="d-flex w-100 gap-3 gap-md-0">
        <div class="border-end scrollable-div result-list">
          <div className="sidebarquestions">
            {treasurepairs?.tileList?.length !== 0 &&
              treasurepairs?.tileList?.map((question, index) => (
                <div className="questionSidebarList align-items-center">
                  <div className="questionImageLabel">
                    <img
                      src={
                        question.image ||
                        "https://res.cloudinary.com/dwl5gzbuz/image/upload/v1738148606/project-thumb_laxubz.png"
                      }
                      alt="question-image"
                      className=""
                    />
                  </div>
                  <p className="mb-0">{`Quest ${index + 1}`}</p>
                </div>
              ))}
          </div>
        </div>
        <div className="w-100 p-4 scrollable-div">
          {treasurepairs?.tileList &&
            treasurepairs?.tileList?.map((question, index) => (
              <div className="questioncontent mb-3">
                <div className="titlequestions d-flex align-items-center justify-content-between">
                  <div className="questionTitle">
                    <h5 className="mb-3">Quest {index + 1}</h5>
                  </div>
                </div>

                <div className="questionData">
                  <div class="row g-4">
                    <div class="col-md-2">
                      <div class="quest-cover rounded-3 overflow-hidden border w-100">
                        <img
                          src={
                            question.headerImgSrc ||
                            "https://res.cloudinary.com/dwl5gzbuz/image/upload/v1738148606/project-thumb_laxubz.png"
                          }
                          alt="Upload Icon"
                          className="w-100"
                        />
                        <label
                          onClick={() =>
                            handleChangeImage(
                              "quest-header",
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
                      {console.log()}
                      <form>
                        <div class="mb-2">
                          <label class="form-label font-sm fw-medium d-flex align-items-center cursor-pointer">Quest name</label>
                          <input
                            type="text"
                            class="form-control theme-control"
                            id="questName"
                            maxlength="60"
                            defaultValue={question?.quest}
                            onChange={(e) =>
                              handleQuestName(e.target.value, question.id)
                            }
                          />
                          <small class="quest-name-counter">
                            Maximum length: 60 characters
                          </small>
                        </div>

                        <div class="mb-2">
                          <label class="form-label font-sm fw-medium d-flex align-items-center cursor-pointer">Quest description</label>
                          <textarea
                            class="form-control theme-control"
                            defaultValue={question?.questDescription}
                            onChange={(e) =>
                              handleQuestDescription(
                                e.target.value,
                                question.id
                              )
                            }
                          ></textarea>
                        </div>

                        <div class="row">
                          <div class="col-md-6">
                            <label class="form-label font-sm fw-medium d-flex align-items-center cursor-pointer">Button text</label>
                            <input
                              type="text"
                              class="form-control theme-control"
                              defaultValue={question?.buttonText}
                              onChange={(e) =>
                                handleButtonText(e.target.value, question.id)
                              }
                            />
                          </div>

                          <div class="col-md-6">
                            <label class="form-label font-sm fw-medium d-flex align-items-center cursor-pointer">Link</label>
                            <input
                              type="text"
                              class="form-control theme-control"
                              defaultValue={question?.buttonLink}
                              onChange={(e) =>
                                handleButtonTextLink(
                                  e.target.value,
                                  question.id
                                )
                              }
                            />
                          </div>
                        </div>

                        <div class="row mt-2">
                          <div class="col-md-6">
                            <label class="form-label font-sm fw-medium d-flex align-items-center cursor-pointer">
                              Secret code to open the cell{" "}
                              <span class="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              class="form-control theme-control"
                              defaultValue={question?.password}
                              onChange={(e) =>
                                handleQuestPassword(
                                  e.target.value,
                                  question.id
                                )
                              }
                            />
                          </div>
                          <div class="col-md-6">
                            <label class="form-label font-sm fw-medium d-flex align-items-center cursor-pointer">
                              Quest header illustration
                            </label>
                            <div className="d-flex gap-2">
                              {question?.overlaySrc && (
                                <img
                                  src={question?.overlaySrc}
                                  alt="overlay"
                                  style={{ height: 44, width: 44, borderRadius: 8, flexShrink: 0, objectFit: 'cover' }}
                                />
                              )}
                              <label
                                htmlFor="overlayUpload"
                                class="button button-primary"
                                role="button"
                                onClick={() =>
                                  handleChangeImage(
                                    "quest-overlay",
                                    formData?.id,
                                    question.id
                                  )
                                }
                              >
                                Change
                              </label>

                              {question?.overlaySrc && (
                                <button
                                  type="button"
                                  className="button button-secondary px-3 border-0 text-muted"
                                  onClick={() =>
                                    handleDeleteOverLayImage(question.id)
                                  }
                                >
                                  <i class="fa-solid fa-trash"></i>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Quests;
