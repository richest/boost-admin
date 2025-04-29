// import React, { useEffect, useState } from "react";
// import QuestionsScreen from "./SettingsComponent/QuestionsScreen";
// import { useDispatch, useSelector } from "react-redux";
// import Select from "react-select";
// import { updateTemplateAction } from "views/pages/Templates/TemplateRedux/actions/drawerAction";
// import { generateShortId } from "utils/helpers";
// import Quests from "./SettingsComponent/Quests";
// import ResultScreen from "./SettingsComponent/ResultScreen";
// import CardsRank from "./SettingsComponent/CardsRank";

// function CookiesModal({
//   selecteScreen,
//   setSelectScreen,
//   formData,
//   handleChangeLogo,
// }) {
//   const dispatch = useDispatch();
//   const { templateDetails } = useSelector((state) => state.DrawerReducer);

//   const handlechangeSliderDecription = (e, id) => {
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
//                   cards: block.struct.cards?.map((question) =>
//                     question.id === id
//                       ? {
//                         ...question,
//                         description: e,
//                       }
//                       : question
//                   ),
//                 },
//               }
//               : block
//           ),
//         })),
//       },
//     };

//     dispatch(updateTemplateAction(updatedData));
//   };

//   const handlechangeSliderHeader = (e, id) => {
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
//                   cards: block.struct.cards?.map((question) =>
//                     question.id === id
//                       ? {
//                         ...question,
//                         header: e,
//                       }
//                       : question
//                   ),
//                 },
//               }
//               : block
//           ),
//         })),
//       },
//     };

//     dispatch(updateTemplateAction(updatedData));
//   };
//   const handlechangeSliderButtontext = (e, id) => {
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
//                   cards: block.struct.cards?.map((question) =>
//                     question.id === id
//                       ? {
//                         ...question,
//                         buttonText: e,
//                       }
//                       : question
//                   ),
//                 },
//               }
//               : block
//           ),
//         })),
//       },
//     };

//     dispatch(updateTemplateAction(updatedData));
//   };

//   const handlechangeSliderButtonLink = (e, id) => {
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
//                   cards: block.struct.cards?.map((question) =>
//                     question.id === id
//                       ? {
//                         ...question,
//                         buttonLink: e,
//                       }
//                       : question
//                   ),
//                 },
//               }
//               : block
//           ),
//         })),
//       },
//     };

//     dispatch(updateTemplateAction(updatedData));
//   };
//   const handlechangeSliderCaption = (e, id) => {
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
//                   cards: block.struct.cards?.map((question) =>
//                     question.id === id
//                       ? {
//                         ...question,
//                         disclaimer: e,
//                       }
//                       : question
//                   ),
//                 },
//               }
//               : block
//           ),
//         })),
//       },
//     };

//     dispatch(updateTemplateAction(updatedData));
//   };

//   const handleAddNew = () => {
//     const object = {
//       id: generateShortId(),
//       buttonLink: "",
//       buttonText: "",
//       coverImage:
//         "https://res.cloudinary.com/dwl5gzbuz/image/upload/v1739271156/Group_3_jl6d69.png",
//       description: "description",
//       disclaimer: "",
//       header: "Text",
//     };

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
//                   cards: [...block.struct.cards, object],
//                 },
//               }
//               : block
//           ),
//         })),
//       },
//     };

//     dispatch(updateTemplateAction(updatedData));
//   };

//   const handleDeleteImage = (cardId) => {
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
//                   cards: block.struct.cards?.map((question) =>
//                     question.id === cardId
//                       ? {
//                         ...question,
//                         illustrationImage: "",
//                       }
//                       : question
//                   ),
//                 },
//               }
//               : block
//           ),
//         })),
//       },
//     };

//     dispatch(updateTemplateAction(updatedData));
//   };
//   console.log(formData?.struct, "cehchccchformdTAaaformhoroscope");
//   return (
//     <div className="form-option-wrap">
//       <div class="scrollable-div border-end result-list">
//         <div className="sidebarquestions">
//           {formData?.struct?.cards &&
//             formData?.struct?.cards?.map((question, index) => (
//               <div className="questionSidebarList align-items-center">
//                 <div className="questionImageLabel">
//                   <img
//                     src={
//                       question.image ||
//                       "https://res.cloudinary.com/dwl5gzbuz/image/upload/v1738148606/project-thumb_laxubz.png"
//                     }
//                     alt="question-image"
//                     className=""
//                   />
//                 </div>
//                 <p className="mb-0">{`Card ${index + 1}`}</p>
//               </div>
//             ))}

//           <div className="button_addNewquestion pb-3">
//             <button
//               className="btn button_boost p-0"
//               onClick={() => handleAddNew()}
//             >
//               <i class="fa-solid fa-plus"></i> Add New
//             </button>
//           </div>
//         </div>
//       </div>
//       <div className="w-100 scrollable-div p-4">
//         {formData?.struct?.cards &&
//           formData?.struct?.cards?.map((question, index) => (
//             <div className="questioncontent">
//               <div className="titlequestions d-flex align-items-center justify-content-between mb-3">
//                 <h4>Card {index + 1}</h4>
//                 <div className="questionTitle gap-2 d-flex align-items-center">
//                   <button className="button button-secondary border-0 p-2 h-auto rounded-5 text-muted font-sm">
//                     <i class="fa-solid fa-clone"></i>
//                   </button>
//                   {formData?.struct?.cards?.length > 1 && (
//                     <button
//                       className="button button-secondary border-0 p-2 h-auto rounded-5 text-muted font-sm"
//                       onClick={() => handleDeleteQuestion(question.id)}
//                     >
//                       <i class="fa-solid fa-trash"></i>
//                     </button>
//                   )}
//                 </div>
//               </div>

//               <div className="questionData">
//                 <div class="mb-3">
//                   <div class="d-flex gap-4">
//                     <div className="questionImageLabel quest-cover"
//                       style={{
//                         height: 128,
//                         width: 128,
//                         objectFit: "cover",
//                         borderRadius: 8,
//                         margin: 0
//                       }}>
//                       <img
//                         src={
//                           question.coverImage ||
//                           "https://res.cloudinary.com/dwl5gzbuz/image/upload/v1738148606/project-thumb_laxubz.png"
//                         }
//                         alt="question-image"
//                         className=""
//                       />

//                       <label
//                         onClick={() =>
//                           handleChangeLogo(
//                             "horoscope-image",
//                             formData?.id,
//                             question.id
//                           )
//                         }
//                         role="button"
//                       >
//                         <i class="fa-solid fa-camera"></i>
//                       </label>
//                     </div>

//                     <div className="w-100">
//                       <div className="mb-3">
//                         <label className="form-label font-sm fw-medium d-flex align-items-center gap-2">Header *</label>
//                         <input
//                           type="text"
//                           class="form-control theme-control w-100"
//                           placeholder="Header"
//                           defaultValue={question.header}
//                           onChange={(e) =>
//                             handlechangeSliderHeader(
//                               e.target.value,
//                               question.id
//                             )
//                           }
//                         />
//                       </div>
//                       <div class="mb-3">
//                         <label class="form-label font-sm fw-medium d-flex align-items-center gap-2">Description</label>
//                         <textarea
//                           class="form-control theme-control"
//                           rows="4"
//                           placeholder="Enter your text"
//                           defaultValue={question.description}
//                           onChange={(e) =>
//                             handlechangeSliderDecription(
//                               e.target.value,
//                               question.id
//                             )
//                           }
//                         ></textarea>
//                       </div>
//                       <div className="mb-3">
//                         <div className="w-100">
//                           <label className="form-label font-sm fw-medium d-flex align-items-center gap-2">Image caption</label>
//                           <input
//                             type="text"
//                             class="form-control theme-control w-100"
//                             placeholder="Image disclaimer"
//                             defaultValue={question.disclaimer}
//                             onChange={(e) =>
//                               handlechangeSliderCaption(
//                                 e.target.value,
//                                 question.id
//                               )
//                             }
//                           />
//                         </div>
//                       </div>
//                       <div className="illustrationUploadImage d-flex align-items-center gap-3 flex-wrap flex-md-nowrap">
//                         <div className="mb-3">
//                           <label className="form-label font-sm fw-medium d-flex align-items-center gap-2">Illustration</label>

//                           <div className="d-flex gap-2">
//                             {question?.illustrationImage && (
//                               <img
//                                 src={question?.illustrationImage}
//                                 alt="illustrationImage"
//                                 className="image_illustrate"
//                                 style={{
//                                   height: 44,
//                                   width: 44,
//                                   borderRadius: 8,
//                                   objectFit: 'cover'
//                                 }}
//                               />
//                             )}

//                             <button
//                               className="button button-primary border-0"
//                               onClick={() =>
//                                 handleChangeLogo(
//                                   "horoscope-illustrationImage",
//                                   formData?.id,
//                                   question.id
//                                 )
//                               }
//                             >
//                               {question?.illustrationImage
//                                 ? "Change"
//                                 : "Upload"}
//                             </button>
//                             <button
//                               className="button button-secondary px-3 border-0 text-muted"
//                               onClick={() => handleDeleteImage(question.id)}
//                             >
//                               <i class="fa-solid fa-trash"></i>
//                             </button>
//                           </div>
//                         </div>
//                         <div className="buttonlink d-flex w-100 gap-3">
//                           <div className="w-100 mb-3">
//                             <label className="form-label font-sm fw-medium d-flex align-items-center gap-2">Button text </label>
//                             <input
//                               type="text"
//                               class="form-control theme-control w-100"
//                               placeholder="Button text"
//                               defaultValue={question.buttonText}
//                               onChange={(e) =>
//                                 handlechangeSliderButtontext(
//                                   e.target.value,
//                                   question.id
//                                 )
//                               }
//                             />
//                           </div>
//                           <div className="w-100">
//                             <label className="form-label font-sm fw-medium d-flex align-items-center gap-2">Link</label>
//                             <input
//                               type="text"
//                               class="form-control theme-control w-100"
//                               placeholder="Link"
//                               defaultValue={question.buttonLink}
//                               onChange={(e) =>
//                                 handlechangeSliderButtonLink(
//                                   e.target.value,
//                                   question.id
//                                 )
//                               }
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         <div>
//           <button className="btn button_boost" onClick={() => handleAddNew()}>
//             <i class="fa-solid fa-plus"></i> Add new
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CookiesModal;
import React, { useEffect, useRef, useState } from "react";
import QuestionsScreen from "./SettingsComponent/QuestionsScreen";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { updateTemplateAction } from "views/pages/Templates/TemplateRedux/actions/drawerAction";
import { generateShortId } from "utils/helpers";
import Quests from "./SettingsComponent/Quests";
import ResultScreen from "./SettingsComponent/ResultScreen";
import CardsRank from "./SettingsComponent/CardsRank";

function CookiesModal({
  selecteScreen,
  setSelectScreen,
  formData,
  handleChangeLogo,
  setIsOpenFormModal
}) {
  const dispatch = useDispatch();
  const { templateDetails } = useSelector((state) => state.DrawerReducer);
  const [errors, setErrors] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [horo, sethoro] = useState([])
  const [errorScreen, setErrorScreen] = useState(false);
  const [triggerNext, setTriggerNext] = useState(false);
  const [finalResult, setfinalResult] = useState({})
  const handlechangeSliderDecription = (e, id) => {
    const updatedHoro = horo.map((card) =>
      card.id === id
        ? { ...card, description: e }
        : card
    );

    sethoro(updatedHoro);
  };

  const handlechangeSliderHeader = (newHeaderValue, questionId) => {
    // Update the horo array (form values)
    const updatedHoro = horo.map((question) =>
      question.id === questionId
        ? { ...question, header: newHeaderValue }
        : question
    );
    sethoro(updatedHoro);

    // Check if header is empty (or contains only spaces)
    const isHeaderEmpty = !newHeaderValue.trim(); // true if empty

    console.log(`Is header empty for question ${questionId}?`, isHeaderEmpty);  // Log to check

    // Update the errors state
    setErrors((prevErrors) => ({
      ...prevErrors,
      [questionId]: {
        ...prevErrors[questionId],
        header: isHeaderEmpty, // Set error if empty
      },
    }));
  };
  console.log(errors, "trhrtht")

  console.log(errors, "SQSQS")
  // const handlechangeSliderHeader = (e, id) => {
  //   // const updatedData = {
  //   //   ...templateDetails,
  //   //   project_structure: {
  //   //     ...templateDetails.project_structure,
  //   //     pages: templateDetails.project_structure.pages.map((page) => ({
  //   //       ...page,
  //   //       blocks: page.blocks.map((block) =>
  //   //         block.id === formData?.id
  //   //           ? {
  //   //             ...block,
  //   //             struct: {
  //   //               ...block.struct,
  //   //               cards: block.struct.cards?.map((question) =>
  //   //                 question.id === id
  //   //                   ? {
  //   //                     ...question,
  //   //                     header: e,
  //   //                   }
  //   //                   : question
  //   //               ),
  //   //             },
  //   //           }
  //   //           : block
  //   //       ),
  //   //     })),
  //   //   },
  //   // };

  //   // dispatch(updateTemplateAction(updatedData));
  // };
  // const handlechangeSliderButtontext = (e, id) => {
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
  //                 cards: block.struct.cards?.map((question) =>
  //                   question.id === id
  //                     ? {
  //                       ...question,
  //                       buttonText: e,
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
  const handlechangeSliderButtontext = (e, id) => {
    const updatedHoro = horo.map((card) =>
      card.id === id
        ? { ...card, buttonText: e }
        : card
    );

    sethoro(updatedHoro);
  };
  const handlechangeSliderButtonLink = (e, id) => {
    const updatedHoro = horo.map((card) =>
      card.id === id
        ? { ...card, buttonLink: e }
        : card
    );

    sethoro(updatedHoro);
  };

  // const handlechangeSliderButtonLink = (e, id) => {
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
  //                 cards: block.struct.cards?.map((question) =>
  //                   question.id === id
  //                     ? {
  //                       ...question,
  //                       buttonLink: e,
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
  //                 cards: block.struct.cards?.map((question) =>
  //                   question.id === id
  //                     ? {
  //                       ...question,
  //                       disclaimer: e,
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
  const handlechangeSliderCaption = (e, id) => {
    const updatedHoro = horo.map((card) =>
      card.id === id
        ? { ...card, disclaimer: e }
        : card
    );

    sethoro(updatedHoro);
  };
  const handleDeleteQuestion = (id) => {
    const updatedHoro = horo.filter((card) => card.id !== id);
    sethoro(updatedHoro);
  };
  const scrollableDivRef = useRef(null);
  const handleAddNew = () => {
    const object = {
      id: generateShortId(),
      buttonLink: "",
      buttonText: "",
      coverImage:
        "https://res.cloudinary.com/dwl5gzbuz/image/upload/v1739271156/Group_3_jl6d69.png",
      description: "description",
      disclaimer: "",
      header: "Text",
    };

    sethoro((prevHoro) => [...prevHoro, object]);
  };
  const handleMoveUp = (id) => {
    const page = templateDetails?.project_structure?.pages?.find(
      (page) => page.name === selectedPage
    );
    if (!page) {
      console.error("No page found with the selected name:", selectedPage);
      return;
    }
    const index = page?.blocks?.findIndex((block) => block.id === id);
    const updatedBlocks = [...page?.blocks];
    [updatedBlocks[index], updatedBlocks[index - 1]] = [
      updatedBlocks[index - 1],
      updatedBlocks[index],
    ];
    // return updatedBlocks;
    const _data = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        pages: templateDetails.project_structure.pages.map((page) => ({
          ...page,
          blocks: updatedBlocks,
        })),
      },
    };
    dispatch(updateTemplateAction(_data));
  };

  const handleMoveDown = (id) => {
    const page = templateDetails?.project_structure?.pages?.find(
      (page) => page.name === selectedPage
    );
    if (!page) {
      console.error("No page found with the selected name:", selectedPage);
      return;
    }
    const index = page?.blocks?.findIndex((block) => block.id === id);
    const updatedBlocks = [...page?.blocks];
    [updatedBlocks[index], updatedBlocks[index + 1]] = [
      updatedBlocks[index + 1],
      updatedBlocks[index],
    ];
    const _data = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        pages: templateDetails.project_structure.pages.map((page) => ({
          ...page,
          blocks: updatedBlocks,
        })),
      },
    };
    dispatch(updateTemplateAction(_data));
  };

  // const handleAddNew = () => {
  //   const object = {
  //     id: generateShortId(),
  //     buttonLink: "",
  //     buttonText: "",
  //     coverImage:
  //       "https://res.cloudinary.com/dwl5gzbuz/image/upload/v1739271156/Group_3_jl6d69.png",
  //     description: "description",
  //     disclaimer: "",
  //     header: "Text",
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
  //                 cards: [...block.struct.cards, object],
  //               },
  //             }
  //             : block
  //         ),
  //       })),
  //     },
  //   };

  //   dispatch(updateTemplateAction(updatedData));
  // };
  const cloneBlock = (id) => {
    const index = horo.findIndex((card) => card.id === id);
    if (index === -1) return;

    const clonedCard = {
      ...horo[index],
      id: generateShortId(), // Make sure this is unique
    };

    const updatedCards = [...horo];
    updatedCards.splice(index + 1, 0, clonedCard); // Insert right after original

    sethoro(updatedCards); // ✅ update local state
  };


  const handleDeleteImage = (cardId) => {
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
                  cards: block.struct.cards?.map((question) =>
                    question.id === cardId
                      ? {
                        ...question,
                        illustrationImage: "",
                      }
                      : question
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
  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    horo.forEach((question) => {
      if (!question.header?.trim()) {
        newErrors[question.id] = { header: true };
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };
  const handleSelectSector = (index) => {
    setSelectedIndex(index);
    // Card
    // Scroll to the corresponding section in the main content
    const sectionElement = document.getElementById(`Card-${index}`);
    if (sectionElement) {
      sectionElement.scrollIntoView({
        behavior: 'smooth', // Smooth scrolling
        block: 'start', // Align to the top of the viewport
      });
    }
  };

  const handleScroll = () => {
    const sections = document.querySelectorAll('.questioncontent'); // All sections
    let indexToHighlight = null;

    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
        indexToHighlight = index;
      }
    });

    if (indexToHighlight !== null && indexToHighlight !== selectedIndex) {
      setSelectedIndex(indexToHighlight); // Update the selected index on scroll
    }
  };

  const moveCardUp = (id) => {
    const index = horo.findIndex((card) => card.id === id);
    if (index <= 0) return;

    const updated = [...horo];
    [updated[index], updated[index - 1]] = [updated[index - 1], updated[index]];
    sethoro(updated);
  };

  const moveCardDown = (id) => {
    const index = horo.findIndex((card) => card.id === id);
    if (index === -1 || index >= horo.length - 1) return;

    const updated = [...horo];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    sethoro(updated);
  };

  // const validateForm = () => {
  //   const newErrors = {
  //     header: !horo.coverHeader?.trim(),

  //   };

  //   setErrors(newErrors);

  //   return !newErrors.header
  // };
  const handleSaveHoroscope = () => {
    console.log("Saving horoscope...");

    if (!validateForm()) {
      setErrorScreen(true)
      return;
    }

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
                  cards: horo, // ✅ Use local state for updated cards
                  // playground: {
                  //   ...block.struct.playground,
                  //   ...puzzle, // ✅ Your puzzle state
                  // },
                  // finalScreen: {
                  //   ...block.struct.finalScreen,
                  //   ...finalResult, // ✅ Your final screen state
                  // },
                },
              }
              : block
          ),
        })),
      },
    };

    console.log(updatedData, "✅ Final data to dispatch");

    dispatch(updateTemplateAction(updatedData));
    setIsOpenFormModal(false);
  };

  console.log(horo, "horohoro", formData?.struct?.cards)
  useEffect(() => {
    sethoro(formData?.struct?.cards)
    setfinalResult(formData?.struct?.finalScreen)
  }, [formData])
  console.log(formData?.struct, "cehchccchformdTAaaformhoroscope");
  console.log(horo.coverImage, "horo.coverImage")
  useEffect(() => {
    const scrollableDiv = scrollableDivRef.current;

    if (scrollableDiv) {
      // Add event listener for scroll events
      scrollableDiv.addEventListener('scroll', handleScroll);

      // Clean up the event listener on component unmount
      return () => {
        scrollableDiv.removeEventListener('scroll', handleScroll);
      };
    }
  }, [selectedIndex]);

  return (
    <>
      <div className="form-option-wrap">
        <div class="scrollable-div border-end result-list">
          <div className="sidebarquestions">
            {horo &&
              horo?.map((question, index) => (
                <div className={`questionSidebarList align-items-center ${selectedIndex === index ? 'highlight' : ''}`} onClick={() => handleSelectSector(index)}>
                  <div className="questionImageLabel">
                    <img
                      src={
                        question.coverImage ||
                        "https://res.cloudinary.com/dwl5gzbuz/image/upload/v1738148606/project-thumb_laxubz.png"
                      }
                      alt="question-image"
                      className=""
                    />
                  </div>
                  <p className="mb-0">{`Card ${index + 1}`}</p>
                </div>
              ))}

            <div className="button_addNewquestion pb-3">
              <button
                className="btn button_boost p-0"
                onClick={() => handleAddNew()}
              >
                <i class="fa-solid fa-plus"></i> Add New
              </button>
            </div>
          </div>
        </div>
        <div className="w-100 scrollable-div p-4" ref={scrollableDivRef}>
          {horo &&
            horo?.map((question, index) => (
              <div key={question.id} className={`questioncontent mb-3 ${selectedIndex === index ? 'highlight' : ''}`}

                style={{ backgroundColor: selectedIndex === index ? '#f0f0f0' : 'transparent' }}
              >
                <div className="titlequestions d-flex align-items-center justify-content-between mb-3">
                  <h4>Card {index + 1}</h4>
                  <div className="questionTitle gap-2 d-flex align-items-center">

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
                    <button onClick={() => cloneBlock(question.id)}
                      className="button button-secondary border-0 p-2 h-auto rounded-5 text-muted font-sm">
                      <i class="fa-solid fa-clone"></i>
                    </button>
                    {horo.length > 1 && (
                      <button
                        className="button button-secondary border-0 p-2 h-auto rounded-5 text-muted font-sm"
                        onClick={() => handleDeleteQuestion(question.id)}
                      >
                        <i class="fa-solid fa-trash"></i>
                      </button>
                    )}
                  </div>
                </div>

                <div className="questionData">
                  <div class="mb-3">
                    <div class="d-flex gap-4">
                      <div className="questionImageLabel quest-cover"
                        style={{
                          height: 128,
                          width: 128,
                          objectFit: "cover",
                          borderRadius: 8,
                          margin: 0
                        }}>
                        <img
                          src={
                            question.coverImage ||
                            "https://res.cloudinary.com/dwl5gzbuz/image/upload/v1738148606/project-thumb_laxubz.png"
                          }
                          alt="question-image"
                          className=""
                        />

                        <label
                          onClick={() =>
                            handleChangeLogo(
                              "horoscope-image",
                              formData?.id,
                              question.id
                            )
                          }
                          role="button"
                        >
                          <i class="fa-solid fa-camera"></i>
                        </label>
                      </div>

                      <div className="w-100">
                        <div className="mb-3">
                          <label className="form-label font-sm fw-medium d-flex align-items-center gap-2">
                            Header <span style={{ color: 'red' }}>*</span>
                          </label>

                          {/* <input
                            type="text"
                            class="form-control theme-control w-100"
                            placeholder="Header"
                            defaultValue={question.header}
                            onChange={(e) =>
                              handlechangeSliderHeader(
                                e.target.value,
                                question.id
                              )
                            }
                          /> */}
                          <input
                            type="text"
                            className={`form-control theme-control ${errors[question.id]?.header ? 'is-invalid' : ''}`}
                            value={question.header}
                            onChange={(e) => handlechangeSliderHeader(e.target.value, question.id)}
                            required
                          />

                          {errors[question.id]?.header && (
                            <div className="invalid-feedback">Header is required.</div>
                          )}
                          {console.log(errors.headerWordCount, "vvvvv")}
                          {/* {errors.headerWordCount && (
                            <div className="invalid-feedback">Must be No more than 20 characters .</div>
                          )} */}
                        </div>
                        <div class="mb-3">
                          <label class="form-label font-sm fw-medium d-flex align-items-center gap-2">Description</label>
                          <textarea
                            class="form-control theme-control"
                            rows="4"
                            placeholder="Enter your text"
                            defaultValue={question.description}
                            onChange={(e) =>
                              handlechangeSliderDecription(
                                e.target.value,
                                question.id
                              )
                            }
                          ></textarea>
                        </div>
                        <div className="mb-3">
                          <div className="w-100">
                            <label className="form-label font-sm fw-medium d-flex align-items-center gap-2">1 st-page disclaimer

                            </label>
                            <input
                              type="text"
                              class="form-control theme-control w-100"
                              placeholder="Image disclaimer"
                              defaultValue={question.disclaimer}
                              onChange={(e) =>
                                handlechangeSliderCaption(
                                  e.target.value,
                                  question.id
                                )
                              }
                            />
                          </div>
                        </div>
                        <div className="illustrationUploadImage d-flex align-items-center gap-3 flex-wrap flex-md-nowrap">
                          <div className="mb-3">
                            <label className="form-label font-sm fw-medium d-flex align-items-center gap-2">Illustration</label>

                            <div className="d-flex gap-2">
                              {question?.illustrationImage && (
                                <img
                                  src={question?.illustrationImage}
                                  alt="illustrationImage"
                                  className="image_illustrate"
                                  style={{
                                    height: 44,
                                    width: 44,
                                    borderRadius: 8,
                                    objectFit: 'cover'
                                  }}
                                />
                              )}

                              <button
                                className="button button-primary border-0"
                                onClick={() =>
                                  handleChangeLogo(
                                    "horoscope-illustrationImage",
                                    formData?.id,
                                    question.id
                                  )
                                }
                              >
                                {question?.illustrationImage
                                  ? "Change"
                                  : "Upload"}
                              </button>
                              <button
                                className="button button-secondary px-3 border-0 text-muted"
                                onClick={() => handleDeleteImage(question.id)}
                              >
                                <i class="fa-solid fa-trash"></i>
                              </button>
                            </div>
                          </div>

                          <div className="buttonlink d-flex w-100 gap-3">
                            <div className="w-100 mb-3">
                              <label className="form-label font-sm fw-medium d-flex align-items-center gap-2">Button text </label>
                              <input
                                type="text"
                                class="form-control theme-control w-100"
                                placeholder="Button text"
                                defaultValue={question.buttonText}
                                onChange={(e) =>
                                  handlechangeSliderButtontext(
                                    e.target.value,
                                    question.id
                                  )
                                }
                              />
                            </div>
                            <div className="w-100">
                              <label className="form-label font-sm fw-medium d-flex align-items-center gap-2">Link</label>
                              <input
                                type="text"
                                class="form-control theme-control w-100"
                                placeholder="Header"
                                defaultValue={question.buttonLink}
                                onChange={(e) =>
                                  handlechangeSliderButtonLink(
                                    e.target.value,
                                    question.id
                                  )
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
            ))}
          <div>

          </div>
        </div>
      </div>

      <ul className="Footer_footer__bMDNk">

        <li className="Footer_footerItem__yaFNE">
          <button
            onClick={handleSaveHoroscope}
            className="button button-primary px-3 text-decoration-none"
          >
            Save
          </button>
        </li>
      </ul>

      {(errorScreen || triggerNext) && (
        <div className="StopPanel_modalStop__Msu+K">
          <div className="StopPanel_modalOverlay__1dGP2"></div>
          <div className="StopPanel_modalContent__8Epq4">
            <div className="StopPanel_note__c+Qou">
              <div className="StopPanel_imageBox__2Udoo">
                <img
                  className="StopPanel_image__2gtri"
                  src="https://account.interacty.me/static/media/girl.af105485362519d96dd6e5f1bc6da415.svg"
                  alt=""
                />
              </div>
              <div className="StopPanel_textBox__stxYL">
                <h4 className="StopPanel_textTitle__T8v5c">
                  Oh! Need more information
                </h4>
                <p className="StopPanel_textContent__2I+u6">
                  Please fill all required fields on this tab for the quiz to
                  work correctly.
                </p>
              </div>
            </div>
            <div className="StopPanel_buttons__cZz5n">
              <button
                onClick={() => {
                  setErrorScreen(false);
                  setTriggerNext(false);
                }}
                className="button button-primary px-3 text-decoration-none"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CookiesModal;
