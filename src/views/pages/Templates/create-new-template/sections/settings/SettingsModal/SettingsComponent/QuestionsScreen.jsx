import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateShortId } from "utils/helpers";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useFormContext } from "react-hook-form";
import { updateTemplateAction } from "views/pages/Templates/TemplateRedux/actions/drawerAction";

const validationSchema = yup.object().shape({
  questions: yup.array().of(
    yup.object().shape({
      text: yup.string().required("Question text is required"),
      answers: yup
        .array()
        .min(1, "At least one answer is required") // Ensure at least one answer
        .of(
          yup.object().shape({
            text: yup.string().required("Answer text is required"),
            description: yup.string().nullable(),
          })
        ),
    })
  ),
});

function QuestionsScreen({
  isEditMediaTypeDetails,
  updateParentState,
  handleChangeImage,
  handleNext,
  setIsOpenFormModal,
  selecteScreen,
  setTriggerNext,
  formData,
  questions,
  handleSaveQuestion,
  formRef,
  setErrorScreen,
}) {
  console.log(
    updateParentState,
    "setSelectScreensetSelectScreenasasasasasasas"
  );
  console.log(questions, "questionsquestions");
  console.log(formData?.struct, "setSelectScreensetSelectScreen");
  // return
  const { templateDetails } = useSelector((state) => state.DrawerReducer);
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      questions: questions?.questions || [
        { text: "", answers: [{ text: "", description: "" }] },
      ],
    },
  });
  const [localQuestions, setLocalQuestions] = useState(
    questions?.questions || []
  );
  console.log(localQuestions, "localQuestions");
  // console.log(question.text, "23434")
  console.log(questions, "templateDetaddilstemplateDetails");
  const [localImage, setLocalImage] = useState("");
  const [changeText, setChangeText] = useState(() => {
    const currentPage = templateDetails?.project_structure?.pages?.find(
      (page) => page.blocks?.some((block) => block.id === formData?.id)
    );

    const currentBlock = currentPage?.blocks?.find(
      (block) => block.id === formData?.id
    );

    return currentBlock?.struct?.questions || [];
  });
  console.log(changeText, "changeTextchangeText");
  const [updatedtemplate, setupdatedTemplate] = useState(templateDetails || {});
  const hasValidatedRef = useRef(false);
  const [questionsList, setQuestionsList] = useState([]);
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
    trigger,
  } = methods;
  console.log(questions, "questionsquestionsquestions");
  console.log(errors, "ipoioiioioioi");
  const dispatch = useDispatch();
  // chnage from here
  console.log(updatedtemplate, "dsdsdsdsdsdsdsd");
  const handleAddNewQuestion = () => {
    const newQuestion = {
      id: generateShortId(),
      text: "",
      image: "",
      isText: true,
      answers: [
        {
          id: generateShortId(),
          text: "text",
          image:
            "https://res.cloudinary.com/dwl5gzbuz/image/upload/v1738148606/project-thumb_laxubz.png",
          isCorrect: true,
          imageLabel: "",
          description: "",
          imageDescription: "",
        },
        {
          id: generateShortId(),
          text: "text",
          image:
            "https://res.cloudinary.com/dwl5gzbuz/image/upload/v1738148606/project-thumb_laxubz.png",
          isCorrect: false,
          imageLabel: "",
          description: "",
          imageDescription: "",
        },
      ],
      imageDisclaimer: "",
    };

    // ✅ Update local state
    const updatedLocalQuestions = [...localQuestions, newQuestion];
    setLocalQuestions(updatedLocalQuestions);

    // ✅ Update updatedtemplate
    const updatedData = {
      ...updatedtemplate,
      project_structure: {
        ...updatedtemplate.project_structure,
        pages: updatedtemplate.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === formData?.id
              ? {
                  ...block,
                  struct: {
                    ...block.struct,
                    questions: updatedLocalQuestions,
                  },
                }
              : block
          ),
        })),
      },
    };

    setupdatedTemplate(updatedData); // ✅ Sync with template
  };

  console.log(updatedtemplate, "updatedtemplateupdatedtemplate");
  const handleDeleteQuestion = (questionId) => {
    const updatedData = {
      ...updatedtemplate,
      project_structure: {
        ...updatedtemplate.project_structure,
        pages: updatedtemplate.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === formData?.id
              ? {
                  ...block,
                  struct: {
                    ...block.struct,
                    questions: block.struct.questions?.filter(
                      (e) => e.id !== questionId
                    ),
                  },
                }
              : block
          ),
        })),
      },
    };
    setupdatedTemplate(updatedData);
  };

  // image
  // const handleChangeImage = (selected, formId, questionId, answerId) => {
  //   setChnageText((prevState) => {
  //     const updatedText = { ...prevState };

  //     // Traverse to the correct answer object
  //     const page = updatedText?.project_structure?.pages[0];
  //     if (page) {
  //       const block = page.blocks[0];
  //       if (block?.struct?.questions) {
  //         const questionIndex = block.struct.questions.findIndex(q => q.id === questionId);
  //         if (questionIndex !== -1) {
  //           const answerIndex = block.struct.questions[questionIndex].answers.findIndex(a => a.id === answerId);
  //           if (answerIndex !== -1) {
  //             block.struct.questions[questionIndex].answers[answerIndex].image = selected; // Update image
  //           }
  //         }
  //       }
  //     }

  //     return updatedText;
  //   });
  // };

  // uper image
  const handleQuestionTextChange = (e, id) => {
    console.log(e, "eeeeee", id, "IIIDIDIDIDIDI989898");
    const updatedData = {
      ...updatedtemplate,
      project_structure: {
        ...updatedtemplate.project_structure,
        pages: updatedtemplate.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === formData?.id
              ? {
                  ...block,
                  struct: {
                    ...block.struct,
                    questions: block.struct.questions?.map((question) =>
                      question.id === id
                        ? {
                            ...question,
                            text: e,
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
    setupdatedTemplate(updatedData);
  };
  console.log(updatedtemplate, "wswswsw");
  const handleChangeTextImage = (type, id) => {
    console.log("Clicked:", type, "on question:", id);

    const updatedQuestions = localQuestions.map((question) =>
      question.id === id ? { ...question, isText: type === "text" } : question
    );

    console.log("Updated Questions:", updatedQuestions);

    setLocalQuestions(updatedQuestions);
  };

  const handleImageDisclaimer = (e, id) => {
    const updatedData = {
      ...updatedtemplate,
      project_structure: {
        ...updatedtemplate.project_structure,
        pages: updatedtemplate.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === formData?.id
              ? {
                  ...block,
                  struct: {
                    ...block.struct,
                    questions: block.struct.questions?.map((question) =>
                      question.id === id
                        ? {
                            ...question,
                            imageDescription: e,
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
    setupdatedTemplate(updatedData);
  };

  const handleCheckCorrectAnswer = (e, id, answerId) => {
    const updatedData = {
      ...updatedtemplate,
      project_structure: {
        ...updatedtemplate.project_structure,
        pages: updatedtemplate.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === formData?.id
              ? {
                  ...block,
                  struct: {
                    ...block.struct,
                    questions: block.struct.questions?.map((question) =>
                      question.id === id
                        ? {
                            ...question,
                            answers: question.answers.map((answer) =>
                              answer.id === answerId
                                ? {
                                    ...answer,
                                    isCorrect: e, // ✅ Toggle the correct value
                                  }
                                : answer
                            ),
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

    setupdatedTemplate(updatedData); // ✅ Ensure this updates correctly
  };
  const handleDeleteAnswer = (questionId, answerId) => {
    console.log("Deleting answer:", answerId);

    const updatedLocalQuestions = localQuestions.map((question) =>
      question.id === questionId
        ? {
            ...question,
            answers: question.answers.filter(
              (answer) => answer.id !== answerId
            ), // Remove the selected answer
          }
        : question
    );

    setLocalQuestions(updatedLocalQuestions);

    // Also update the `updatedtemplate`
    const updatedData = {
      ...updatedtemplate,
      project_structure: {
        ...updatedtemplate.project_structure,
        pages: updatedtemplate.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === formData?.id
              ? {
                  ...block,
                  struct: {
                    ...block.struct,
                    questions: updatedLocalQuestions, // Sync back
                  },
                }
              : block
          ),
        })),
      },
    };

    setupdatedTemplate(updatedData);
  };

  // const handleDeleteAnswer = (id, answerId) => {
  //   console.log(id, answerId, "ioioioioiooioi")
  //   const updatedData = {
  //     ...updatedtemplate,
  //     project_structure: {
  //       ...updatedtemplate.project_structure,
  //       pages: updatedtemplate.project_structure.pages.map((page) => ({
  //         ...page,
  //         blocks: page.blocks.map((block) =>
  //           block.id === formData?.id
  //             ? {
  //               ...block,
  //               struct: {
  //                 ...block.struct,
  //                 questions: block.struct.questions?.map((question) =>
  //                   question.id === id
  //                     ? {
  //                       ...question,
  //                       answers: question.answers.filter(
  //                         (e) => e.id !== answerId
  //                       ),
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

  //   setupdatedTemplate(updatedData)
  // };
  const handleChangeTextAnswer = (e, id, answerId) => {
    console.log(e, "wsdswdwdw");
    const updatedData = {
      ...updatedtemplate,
      project_structure: {
        ...updatedtemplate.project_structure,
        pages: updatedtemplate.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === formData?.id
              ? {
                  ...block,
                  struct: {
                    ...block.struct,
                    questions: block.struct.questions?.map((question) =>
                      question.id === id
                        ? {
                            ...question,
                            answers: question.answers.map((answer) =>
                              answer.id === answerId
                                ? {
                                    ...answer,
                                    text: e,
                                  }
                                : answer
                            ),
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
    setupdatedTemplate(updatedData);
    // dispatch(updateTemplateAction(updatedData));
  };

  const handleChangeDescriptionAnswer = (e, id, answerId) => {
    const updatedData = {
      ...updatedtemplate,
      project_structure: {
        ...updatedtemplate.project_structure,
        pages: updatedtemplate.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === formData?.id
              ? {
                  ...block,
                  struct: {
                    ...block.struct,
                    questions: block.struct.questions?.map((question) =>
                      question.id === id
                        ? {
                            ...question,
                            answers: question.answers.map((answer) =>
                              answer.id === answerId
                                ? {
                                    ...answer,
                                    description: e,
                                  }
                                : answer
                            ),
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

    setupdatedTemplate(updatedData);
  };
  const handleAddAnswer = (id) => {
    console.log(id, "Adding new answer");

    const answerObject = {
      id: generateShortId(),
      text: "Answer text",
      isCorrect: false,
      imageLabel: "",
      description: "",
      imageDescription: "",
      image: "",
    };

    // Update localQuestions
    const updatedLocalQuestions = localQuestions.map((question) =>
      question.id === id
        ? { ...question, answers: [...question.answers, answerObject] }
        : question
    );

    setLocalQuestions(updatedLocalQuestions); // ✅ Update local state

    // If `questions.questions` comes from `updatedtemplate`, update that too
    const updatedData = {
      ...updatedtemplate,
      project_structure: {
        ...updatedtemplate.project_structure,
        pages: updatedtemplate.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === formData?.id
              ? {
                  ...block,
                  struct: {
                    ...block.struct,
                    questions: updatedLocalQuestions, // ✅ Update in `updatedtemplate`
                  },
                }
              : block
          ),
        })),
      },
    };

    setupdatedTemplate(updatedData); // ✅ Sync with `updatedtemplate`
  };

  const handleDeleteQuestionImage = (id) => {
    const updatedData = {
      ...updatedtemplate,
      project_structure: {
        ...updatedtemplate.project_structure,
        pages: updatedtemplate.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === formData?.id
              ? {
                  ...block,
                  struct: {
                    ...block.struct,
                    questions: block.struct.questions?.map((question) =>
                      question.id === id
                        ? {
                            ...question,
                            image: "",
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

    setupdatedTemplate(updatedData);
    setLocalQuestions(
      updatedData.project_structure.pages
        .find((page) => page.blocks.some((block) => block.id === formData?.id))
        ?.blocks.find((block) => block.id === formData?.id)?.struct.questions ||
        []
    ); //
  };
  console.log(
    isEditMediaTypeDetails,
    "isEditMediaTypeDetailsisEditMediaTypeDetails"
  );
  // const [localImage, setLocalImage] = useState(isEditMediaTypeDetails?.type);
  console.log(localImage, "localImagelocalImage");

  const handleLocalImageChange = (newImage) => {
    setLocalImage(newImage);
  };

  // const onSubmit = (data) => {
  //   console.log("Validated Data:", data);
  //   handleSaveQuestion(data); // Pass validated data to parent

  // };
  console.log(selecteScreen, "ioioiweoio");

  console.log(errors, "errorserrors");
  console.log(
    isEditMediaTypeDetails.type,
    localImage,
    "isEditMediaTypeDetails.type"
  );
  useEffect(() => {
    if (selecteScreen === "questions") {
      if (formRef) {
        formRef.current = {
          submitForm: handleSubmit((data) => {
            console.log(updatedtemplate, "123123123123");
            // return
            console.log(localImage !== isEditMediaTypeDetails.type, "asdsdsd");
            dispatch(updateTemplateAction(updatedtemplate));
            if (isEditMediaTypeDetails.type) {
              updateParentState((prevStruct) => ({
                ...prevStruct,
                ...isEditMediaTypeDetails,
                type: localImage,
              }));
            }

            // dispatch(updateTemplateAction(localQuestions))
            setIsOpenFormModal(false);
          }),

          hasErrors: () => Object.keys(errors).length > 0, // Checks for errors
        };
      }
    }
  }, [formRef, handleSubmit, errors, selecteScreen, updatedtemplate]);
  console.log(errors, "errors");

  useEffect(() => {
    if (selecteScreen === "questions") {
      // Check if there are any errors in the child form
      if (Object.keys(errors).length > 0) {
        setErrorScreen(true); // Show the error screen
        setTriggerNext(true); // Disable the "Next" button
      } else {
        setErrorScreen(false); // No errors, hide the error screen
        setTriggerNext(false); // Enable the "Next" button
      }
    }
  }, [errors, selecteScreen, setErrorScreen, setTriggerNext]);

  console.log(
    updatedtemplate?.project_structure?.pages[0]?.blocks[0]?.struct?.questions,
    "ioiooioo8900"
  );
  useEffect(() => {
    // Only trigger validation if errors exist or on initial load (when errors are empty)
    if (
      selecteScreen === "questions" &&
      (Object.keys(errors).length > 0 || !hasValidatedRef.current)
    ) {
      const checkErrors = async () => {
        const isValid = await trigger(); // Triggers validation for all fields
        setErrorScreen(!isValid); // Update error screen based on validity
        setTriggerNext(!isValid); // Enable/Disable next based on errors
        hasValidatedRef.current = true; // Mark as validated
      };

      checkErrors();
    }
  }, []); // Re-ru

  console.log(questions, "questionsquestions");
  useEffect(() => {
    if (questions?.questions?.length) {
      questions.questions.forEach((question, index) => {
        if (question.text) {
          setValue(`questions.${index}.text`, question.text);
          trigger(`questions.${index}.text`); // ✅ Validate after setting value
        }

        question?.answers?.forEach((answer, ansIndex) => {
          if (answer.text) {
            setValue(
              `questions.${index}.answers.${ansIndex}.text`,
              answer.text
            );
            trigger(`questions.${index}.answers.${ansIndex}.text`); // ✅ Validate after setting value
          }
        });
      });
    }
  }, [questions, setValue, trigger]); // ✅ Dependencies updated

  useEffect(() => {
    if (questions?.questions) {
      methods.reset({
        questions: questions.questions,
      });
    }
  }, [questions, methods]);

  useEffect(() => {
    if (isEditMediaTypeDetails?.type) {
      setLocalImage(isEditMediaTypeDetails.type);
    }
  }, [isEditMediaTypeDetails]);

  useEffect(() => {
    setQuestionsList(updatedtemplate);
  }, []);
  useEffect(() => {
    setLocalQuestions(questions?.questions || []);
  }, [questions]);
  useEffect(() => {
    if (questions?.questions?.length) {
      setLocalQuestions((prevQuestions) =>
        questions.questions.map((newQ) => {
          const existing = prevQuestions.find((q) => q.id === newQ.id);
          return {
            ...newQ,
            isText: existing?.isText ?? true, // Preserve local isText state
          };
        })
      );
    }
  }, [questions?.questions]);

  return (
    <>
      <div class="d-flex w-100 gap-3 gap-md-0">
        <div class="border-end scrollable-div">
          {/* <div class="form-check form-switch toogle-questionsbank">
            <input
              class="form-check-input"
              type="checkbox"
              id="useQuestionBank"
            />
            <label
              class="form-check-label font-sm lh-1 text-muted"
              for="useQuestionBank"
            >
              Use questions from question bank
            </label>
          </div> */}
          <div className="sidebarquestions questioncol">
            {questions &&
              questions?.questions.map((question, index) => (
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
                  <p className="mb-0">{`Question ${index + 1}`}</p>
                </div>
              ))}

            <div className="button_addNewquestion">
              <button
                className="btn button_boost p-0"
                onClick={() => handleAddNewQuestion()}
              >
                <i class="fa-solid fa-plus"></i> Add New
              </button>
            </div>
          </div>
        </div>
        <div className="w-100 scrollable-div p-4">
          {/* dwdwd */}
          <FormProvider {...methods}>
            <form>
              {localQuestions?.map((question, index) => {
                console.log(question, "questionquestion");
                return (
                  <div className="questioncontent">
                    <div className="titlequestions d-flex align-items-center justify-content-between">
                      <div className="questionTitle">
                        <h4>Question {index + 1}</h4>
                      </div>
                      <div className="questionTitle d-flex align-items-center gap-2">
                        <button className="button sm button-secondary px-3 border-0 font-sm">
                          <i class="fa-solid fa-clone"></i>
                        </button>
                        {localQuestions.length > 1 && (
                          <button
                            className="button sm button-secondary px-3 bg-danger text-white border-0 font-sm"
                            onClick={() => handleDeleteQuestion(question.id)}
                          >
                            <i class="fa-solid fa-trash"></i>
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="questionData">
                      <div class="mb-3">
                        <label class="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                          Question text <span style={{ color: "red" }}>*</span>
                        </label>
                        <textarea
                          class="form-control theme-control"
                          rows="4"
                          placeholder="Enter your text"
                          {...register(`questions.${index}.text`, {
                            required: "Question text is required",
                          })}
                          defaultValue={`questions.${index}.text` || ""}
                          onChange={(e) => {
                            handleQuestionTextChange(
                              e.target.value,
                              question.id
                            ); // ✅ Update local state
                          }}
                        ></textarea>

                        {errors.questions?.[index]?.text && (
                          <p style={{ color: "red" }} className="error">
                            {errors.questions[index].text.message}
                          </p>
                        )}
                      </div>

                      <div class="mb-3 d-flex align-items-start gap-3">
                        <div className="">
                          <label class="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                            Question image
                          </label>
                          <div class="d-flex align-items-start">
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
                            <button
                              type="button"
                              class="button button-primary border-0 me-2 font-sm"
                              onClick={() =>
                                handleChangeImage(
                                  "question-image",
                                  formData?.id,
                                  question.id
                                )
                              }
                            >
                              {question.image ? "Change" : "Upload"}
                            </button>
                            <button
                              class="button button-secondary px-3 border-0 font-sm"
                              onClick={() =>
                                handleDeleteQuestionImage(question.id)
                              }
                            >
                              <i class="fa-solid fa-trash"></i>
                            </button>
                          </div>
                        </div>
                        <div className="w-100">
                          <label className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                            Image disclaimer
                          </label>
                          <input
                            type="text"
                            class="form-control theme-control"
                            placeholder="Image disclaimer"
                            defaultValue={question.imageDisclaimer}
                            onChange={(e) =>
                              handleImageDisclaimer(e.target.value, question.id)
                            }
                          />
                          <div className="textImageOptions d-flex gap-1 mt-3">
                            {console.log(localQuestions, "ddwdwdwdw")}
                            <button
                              type="button"
                              htmlFor={`question${index}`}
                              className={`button button-primary sm font-sm py-2 border-0 ${
                                question.isText === true
                                  ? "selected"
                                  : "outline"
                              }`}
                              onClick={() =>
                                handleChangeTextImage("text", question.id)
                              }
                            >
                              <i class="fa-solid fa-bars"></i> Text
                            </button>
                            <button
                              type="button"
                              className={`button button-primary sm font-sm py-2 border-0 ${
                                question.isText === false
                                  ? "selected"
                                  : "outline"
                              }`}
                              onClick={() =>
                                handleChangeTextImage("images", question.id)
                              }
                            >
                              <i class="fa-regular fa-image"></i> Images
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="answers_content">
                        {/* {console.log(updatedtemplate?.project_structure?.pages[0]?.blocks[0]?.struct?.questions, "questionquestion")} */}

                        {localQuestions?.map((question, index) =>
                          question?.answers?.map((answer, ansIndex) => (
                            <div className="contentAnswer" key={answer.id}>
                              <div className="mb-4">
                                <div className="d-flex justify-content-between gap-2">
                                  <label className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                                    Answer {ansIndex + 1}
                                    <span style={{ color: "red" }}>*</span>
                                  </label>
                                  <div>
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={answer?.isCorrect}
                                      onChange={(e) =>
                                        handleCheckCorrectAnswer(
                                          e.target.checked,
                                          question.id,
                                          answer.id
                                        )
                                      }
                                    />
                                    <label className="form-check-label ms-2">
                                      Correct answer
                                    </label>
                                    {question.answers.length > 0 && (
                                      <i
                                        className="fa-solid fa-trash"
                                        role="button"
                                        onClick={() =>
                                          handleDeleteAnswer(
                                            question.id,
                                            answer.id
                                          )
                                        }
                                      ></i>
                                    )}
                                  </div>
                                </div>

                                <div className="d-flex align-items-center mb-3">
                                  {/* Show Image Upload only if it's not a text-only question */}
                                  {!question?.isText && (
                                    <>
                                      <div className="questionImageLabel">
                                        <img
                                          src={
                                            answer.image ||
                                            "https://res.cloudinary.com/dwl5gzbuz/image/upload/v1738148606/project-thumb_laxubz.png"
                                          }
                                          alt="question-image"
                                        />
                                      </div>
                                      <button
                                        type="button"
                                        className="button button-primary font-sm border-0 me-2"
                                        onClick={() =>
                                          handleChangeImage(
                                            "answer-image",
                                            formData?.id,
                                            question.id,
                                            answer.id
                                          )
                                        }
                                      >
                                        {answer.image ? "Change" : "Upload"}
                                      </button>
                                    </>
                                  )}

                                  <input
                                    {...register(
                                      `questions.${index}.answers.${ansIndex}.text`,
                                      {
                                        required: "Answer text is required",
                                      }
                                    )}
                                    type="text"
                                    className="form-control theme-control me-2"
                                    placeholder="Enter answer..."
                                    defaultValue={answer?.text}
                                    onChange={(e) =>
                                      handleChangeTextAnswer(
                                        e.target.value,
                                        question.id,
                                        answer.id
                                      )
                                    }
                                  />
                                </div>

                                <div className="mb-3">
                                  <label className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                                    Description
                                  </label>
                                  <textarea
                                    className="form-control theme-control"
                                    rows="2"
                                    placeholder="Enter description"
                                    defaultValue={answer?.description}
                                    onChange={(e) =>
                                      handleChangeDescriptionAnswer(
                                        e.target.value,
                                        question.id,
                                        answer.id
                                      )
                                    }
                                  ></textarea>
                                </div>
                              </div>
                            </div>
                          ))
                        )}

                        <div>
                          <button
                            type="button"
                            className="btn button_boost"
                            onClick={() => handleAddAnswer(question.id)}
                          >
                            <i class="fa-solid fa-plus"></i> Add answer
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </form>
          </FormProvider>
        </div>
      </div>
    </>
  );
}

export default QuestionsScreen;
