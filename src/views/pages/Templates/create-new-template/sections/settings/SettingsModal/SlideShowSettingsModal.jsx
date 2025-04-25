import React, { useEffect, useState } from "react";
import QuestionsScreen from "./SettingsComponent/QuestionsScreen";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { updateTemplateAction } from "views/pages/Templates/TemplateRedux/actions/drawerAction";
import { generateShortId } from "utils/helpers";
import Quests from "./SettingsComponent/Quests";
import ResultScreen from "./SettingsComponent/ResultScreen";
import CardsRank from "./SettingsComponent/CardsRank";

function SlideSHowModal({
  selecteScreen,
  setSelectScreen,
  formData,
  handleChangeLogo,
  setIsOpenFormModal,
  onRegisterSlideImageCallback,
}) {
  const dispatch = useDispatch();
  const [slideShow, setSlideShow] = useState({
    slides: []
  });
  const [showMore, setShowMore] = useState(false)
  console.log(slideShow, "slideShowslideShow")
  const { templateDetails } = useSelector((state) => state.DrawerReducer);
  const toggleShowMore = (id) => {
    setShowMore((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // const hanldleSaveSlideShow = () => {
  //   console.log("object")
  //   if (!validateForm()) {
  //     return;
  //   } else {
  //     console.log("INELSLSSLL")
  //     const updatedData = {
  //       ...templateDetails,
  //       project_structure: {
  //         ...templateDetails.project_structure,
  //         pages: templateDetails.project_structure.pages.map((page) => ({
  //           ...page,
  //           blocks: page.blocks.map((block) =>
  //             block.id === formData?.id
  //               ? {
  //                 ...block,
  //                 struct: {
  //                   ...block.struct,
  //                   // playground: {
  //                   //   ...block.struct.playground,
  //                   //   ...puzzle
  //                   // },
  //                   form: {
  //                     ...block.struct.form,
  //                     ...leadformModel
  //                   },
  //                   final: {
  //                     ...block.struct.final,
  //                     ...finalResult
  //                   },
  //                 },
  //               }
  //               : block
  //           ),
  //         })),
  //       },
  //     };
  //     console.log(updatedData, "updatedData")
  //     // dispatch(updateTemplateAction(updatedData));
  //     setIsOpenFormModal(false)

  //   }
  // }
  const handleSlideImageChange = (image, slideId) => {
    setSlideShow((prev) => ({
      ...prev,
      slides: prev.slides.map((slide) =>
        slide.id === slideId ? { ...slide, image } : slide
      ),
    }));
  };


  const hanldleSaveSlideShow = () => {
    const updatedData = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        pages: templateDetails.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === formData?.id
              ? {
                ...block,
                struct: {
                  ...block.struct,
                  slides: slideShow.slides,

                },
              }
              : block
          ),
        })),
      },
    };

    console.log(updatedData, "updatedData");

    // Uncomment when ready to persist to Redux/backend
    dispatch(updateTemplateAction(updatedData));

    setIsOpenFormModal(false);

  };

  const handlechangeSliderDecription = (e, id) => {
    // Check the current state before update
    console.log("Before update:", slideShow);

    setSlideShow((prev) => {
      const updatedSlides = prev.slides.map((slide) => {
        if (slide.id === id) {
          return { ...slide, description: e }; // Only update the specific slide with matching ID
        }
        return slide;
      });

      // Log after state update
      console.log("Updated slides:", updatedSlides);

      return { ...prev, slides: updatedSlides }; // Return the updated state
    });
  };

  const handlechangeSliderHeader = (e, id) => {
    setSlideShow((prev) => {
      console.log("Previous state:", prev); // Check the state before updating

      const updatedSlides = prev.slides
        ? prev.slides.map((slide) =>
          slide.id === id
            ? { ...slide, header: e }
            : slide
        )
        : [];

      console.log("Updated slides:", updatedSlides); // Check the updated slides

      return {
        ...prev,
        slides: updatedSlides,
      };
    });
  };

  // const handlechangeSliderHeader = (e, id) => {
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
  //                 slides: block.struct.slides?.map((question) =>
  //                   question.id === id
  //                     ? {
  //                       ...question,
  //                       header: e,
  //                     }
  //                     : question
  //                 ),
  //               },
  //             }
  //             : block
  //         ),
  //       })),
  //     },
  //   };

  //   dispatch(updateTemplateAction(updatedData));
  // };

  // const handlechangeSliderCaption = (e, id) => {
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
  //                 slides: block.struct.slides?.map((question) =>
  //                   question.id === id
  //                     ? {
  //                       ...question,
  //                       imageCaption: e,
  //                     }
  //                     : question
  //                 ),
  //               },
  //             }
  //             : block
  //         ),
  //       })),
  //     },
  //   };

  //   dispatch(updateTemplateAction(updatedData));
  // };
  const handleDeleteQuestion = (id) => {
    setSlideShow((prev) => {
      // Filter out the slide with the matching id
      const updatedSlides = prev.slides?.filter((slide) => slide.id !== id) || [];

      return {
        ...prev,
        slides: updatedSlides, // Update the slides with the new filtered list
      };
    });
  };
  console.log(slideShow, "slideShowslideShow")
  const handlechangeSliderCaption = (e, id) => {
    setSlideShow((prev) => {
      console.log("Previous state:", prev); // Check state before updating

      const updatedSlides = prev.slides
        ? prev.slides.map((slide) =>
          slide.id === id
            ? { ...slide, imageCaption: e }
            : slide
        )
        : [];

      console.log("Updated slides:", updatedSlides); // Check the updated slides

      return {
        ...prev,
        slides: updatedSlides,
      };
    });
  };
  const cloneSlide = (id) => {
    setSlideShow((prev) => {
      const index = prev.slides.findIndex((slide) => slide.id === id);
      if (index === -1) return prev;

      const slideToClone = prev.slides[index];
      const clonedSlide = {
        ...slideToClone,
        id: generateShortId(), // Make sure to generate a new ID
      };

      const updatedSlides = [...prev.slides];
      updatedSlides.splice(index + 1, 0, clonedSlide); // Insert after the original

      return {
        ...prev,
        slides: updatedSlides,
      };
    });
  };

  const handleAddNew = () => {
    const object = {
      id: generateShortId(),
      header: "",
      description: "",
      hasTextOptions: true,
      image:
        "https://res.cloudinary.com/dwl5gzbuz/image/upload/v1739271156/Group_3_jl6d69.png",
      imageCaption: "",
    };
    setSlideShow((prev) => ({
      ...prev,
      slides: [...prev.slides, object],
    }));

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
    //               slides: [...block.struct.slides, object],
    //             },
    //           }
    //           : block
    //       ),
    //     })),
    //   },
    // };

    // dispatch(updateTemplateAction(updatedData));
  };
  const moveCardUp = (id) => {
    setSlideShow((prev) => {
      const index = prev.slides.findIndex((slide) => slide.id === id);
      if (index <= 0) return prev;

      const updatedSlides = [...prev.slides];
      [updatedSlides[index], updatedSlides[index - 1]] = [
        updatedSlides[index - 1],
        updatedSlides[index],
      ];

      return {
        ...prev,
        slides: updatedSlides,
      };
    });
  };

  const moveCardDown = (id) => {
    setSlideShow((prev) => {
      const index = prev.slides.findIndex((slide) => slide.id === id);
      if (index === -1 || index >= prev.slides.length - 1) return prev;

      const updatedSlides = [...prev.slides];
      [updatedSlides[index], updatedSlides[index + 1]] = [
        updatedSlides[index + 1],
        updatedSlides[index],
      ];

      return {
        ...prev,
        slides: updatedSlides,
      };
    });
  };

  console.log(formData?.struct, "cehchccchformdTAaa");
  useEffect(() => {
    setSlideShow(formData?.struct)
  }, [formData?.struct])
  console.log(slideShow, "slideShow")
  // Inside SlideShowModal
  useEffect(() => {
    if (onRegisterSlideImageCallback) {
      onRegisterSlideImageCallback(handleSlideImageChange);
    }
  }, []);
  useEffect(() => {
    // This runs once when slideShow/slides are loaded
    const defaultVisibility = {};
    slideShow.slides.forEach((slide) => {
      defaultVisibility[slide.id] = !!slide.header || !!slide.imageCaption;
    });
    setShowMore(defaultVisibility);
  }, [slideShow.slides]);
  return (
    <>
      <div className="form-option-wrap">
        <div className="w-100 scrollable-div p-3">
          {slideShow.slides &&
            slideShow?.slides.map((question, index) => (
              <div className="questioncontent">


                <div className="questionData">
                  <div class="mb-4">
                    <div class="d-flex gap-3">
                      <div className="">
                        <label className="form-label font-sm fw-medium d-flex align-items-center cursor-pointer justify-content-center">{index + 1}</label>
                        <div className="questionImageLabel quest-cover" style={{
                          width: 90,
                          height: 90,
                          margin: 0
                        }}>
                          <img
                            src={
                              question.image
                            }
                            alt="question-image"
                            className="w-100"
                          />

                          <label
                            onClick={() =>
                              handleChangeLogo(
                                "slider-image",
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

                      <div className="w-100">
                        <div className="mb-3">
                          <div className="d-flex align-items-center justify-content-between gap-2 mb-2">
                            <label className="form-label font-sm fw-medium d-flex align-items-center cursor-pointer">
                              Description
                            </label>
                            <div className="d-flex align-items-center gap-2">
                              <li
                                className="Inline_control__list"
                                title="Move up"
                                role="button"
                                onClick={() => moveCardUp(question.id)}
                              >
                                <i className="fa-solid fa-arrow-up"></i>
                              </li>
                              <li
                                className="Inline_control__list"
                                title="Move down"
                                role="button"
                                onClick={() => moveCardDown(question.id)}
                              >
                                <i className="fa-solid fa-arrow-down"></i>
                              </li>
                              <button
                                onClick={() => cloneSlide(question.id)}
                                className="button button-secondary border-0 p-2 h-auto rounded-5 text-muted font-sm"
                              >
                                <i className="fa-solid fa-clone"></i>
                              </button>
                              {slideShow?.slides.length > 1 && (
                                <button
                                  className="button button-secondary border-0 p-2 h-auto rounded-5 text-muted font-sm"
                                  onClick={() => handleDeleteQuestion(question.id)}
                                >
                                  <i className="fa-solid fa-trash"></i>
                                </button>
                              )}
                            </div>
                          </div>

                          <textarea
                            className="form-control theme-control"
                            rows="4"
                            defaultValue={question.description}
                            onChange={(e) =>
                              handlechangeSliderDecription(e.target.value, question.id)
                            }
                          ></textarea>
                        </div>

                        {/* Toggle Button */}
                        {showMore[question.id] ? (
                          <p onClick={() => toggleShowMore(question.id)}>Less Text Option</p>
                        ) : (
                          <p onClick={() => toggleShowMore(question.id)}>More Text Option</p>
                        )}

                        {/* Conditional Inputs */}
                        {showMore[question.id] && (
                          <div
                            role="button"
                            className="d-flex justify-content-between gap-3"
                          >
                            <div className="w-100">
                              <label className="form-label font-sm fw-medium d-flex align-items-center cursor-pointer">
                                Header
                              </label>
                              <input
                                type="text"
                                className="form-control theme-control"
                                defaultValue={question.header}
                                onChange={(e) =>
                                  handlechangeSliderHeader(e.target.value, question.id)
                                }
                              />
                            </div>

                            <div className="w-100">
                              <label className="form-label font-sm fw-medium d-flex align-items-center cursor-pointer">
                                Image caption
                              </label>
                              <input
                                type="text"
                                className="form-control theme-control"
                                defaultValue={question.imageCaption}
                                onChange={(e) =>
                                  handlechangeSliderCaption(e.target.value, question.id)
                                }
                              />
                            </div>
                          </div>
                        )}
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            ))}
          <div>
            <button className="btn button_boost" onClick={() => handleAddNew()}>
              <i class="fa-solid fa-plus"></i> Add new
            </button>
          </div>
        </div>
      </div > <ul className="Footer_footer__bMDNk">

        <li className="Footer_footerItem__yaFNE">
          <button
            onClick={hanldleSaveSlideShow}
            className="button button-primary px-3 text-decoration-none"
          >
            Save
          </button>
        </li>
      </ul></>
  );
}

export default SlideSHowModal;
