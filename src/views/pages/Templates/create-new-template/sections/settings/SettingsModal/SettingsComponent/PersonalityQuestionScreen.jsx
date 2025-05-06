import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateShortId } from "utils/helpers";
import { updateTemplateAction } from "views/pages/Templates/TemplateRedux/actions/drawerAction";

function PersonalityQuestionScreen({ setSelectedImageType, formData, errors, questions, handleChangeImage, personalityquizquestion, setPersonalityQuizQuestion }) {
  const { templateDetails } = useSelector((state) => state.DrawerReducer);
  console.log(questions, "questionsquestionsquestions");
  // const [settingsData, setSettingsaData] = useState([
  //   imageSrc: formData?.struct?.questions.map((e)=>e?.image // Set initial state
  // ]};
  console.log(personalityquizquestion, "personalityquizquestion")
  const [settingsData, setSettingsaData] = useState([formData?.struct?.questions.map((e) => e?.image)])
  console.log(settingsData, "sqsqsqsqsqsqs")
  const dispatch = useDispatch();
  const handleAddNewQuestion = () => {
    const question = {
      id: generateShortId(),
      text: "",
      image: "",
      isText: true,
      answers: [
        {
          id: generateShortId(),
          text: "tess",
          image:
            "https://res.cloudinary.com/dwl5gzbuz/image/upload/v1738148606/project-thumb_laxubz.png",
          isCorrect: true,
          imageLabel: "",
          description: "",
          imageDescription: "",
        },
        {
          id: generateShortId(),
          text: "",
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
    setPersonalityQuizQuestion((prevQuestions) => [...prevQuestions, question])

  };

  const handleDeleteQuestion = (questionId) => {
    setPersonalityQuizQuestion((prev) =>
      prev.filter((question) => question.id !== questionId)
    );

  };

  const handleQuestionTextChange = (e, id) => {

    setPersonalityQuizQuestion((prev) =>
      prev.map((q) =>
        q.id === id
          ? {
            ...q,
            text: e,
          }
          : q
      )
    );

  };

  const handleChangeTextImage = (e, id) => {
    const isText = e === "text";
    setPersonalityQuizQuestion((prev) =>
      prev.map((q) =>
        q.id === id
          ? {
            ...q,
            isText,
          }
          : q
      )
    );

  };

  const handleImageDisclaimer = (e, id) => {
    setPersonalityQuizQuestion((prev) =>
      prev.map((q) =>
        q.id === id
          ? {
            ...q,
            imageDescription: e,
          }
          : q
      )
    );

  };

  const handleCheckCorrectAnswer = (e, id, answerId) => {



  };

  const handleDeleteAnswer = (id, answerId) => {
    setPersonalityQuizQuestion((prev) =>
      prev.map((question) =>
        question.id === id
          ? {
            ...question,
            answers: question.answers.filter((a) => a.id !== answerId),
          }
          : question
      )
    );


  };
  const handleChangeTextAnswer = (e, id, answerId) => {
    setPersonalityQuizQuestion((prev) =>
      prev.map((question) =>
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
      )
    );



  };

  const handleChangeDescriptionAnswer = (e, id, answerId) => {
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

    dispatch(updateTemplateAction(updatedData));
  };
  const handleAddAnswer = (id) => {
    console.log(id, "saasasaa")
    const answerObject = {
      id: generateShortId(),
      text: "Answer text",
      isCorrect: false,
      imageLabel: "",
      description: "",
      imageDescription: "",
      image: "",
    };
    setPersonalityQuizQuestion((prev) =>
      prev.map((question) =>
        question.id === id
          ? {
            ...question,
            answers: [...question.answers, answerObject],
          }
          : question
      )
    );

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
    //               questions: block.struct.questions?.map((question) =>
    //                 question.id === id
    //                   ? {
    //                     ...question,
    //                     answers: [...question.answers, answerObject],
    //                   }
    //                   : question
    //               ),
    //             },
    //           }
    //           : block
    //       ),
    //     })),
    //   },
    // };
    // dispatch(updateTemplateAction(updatedData));
  };
  const handleDeleteQuestionImage = (id) => {

    setPersonalityQuizQuestion((prev) =>
      prev.map((question) =>
        question.id === id
          ? {
            ...question,
            image: "",
          }
          : question
      )
    );
    // dispatch(updateTemplateAction(updatedData));
  };
  const handleCloneQuestion = (questionId) => {
    // Find the question you want to clone
    const questionToClone = personalityquizquestion.find((question) => question.id === questionId);

    // Clone the question by creating a new object (you can spread the existing question to retain its data)
    const clonedQuestion = { ...questionToClone, id: generateShortId() }; // Ensure the cloned question has a unique id

    // Add the cloned question to the state
    setPersonalityQuizQuestion((prevQuestions) => [...prevQuestions, clonedQuestion]);
  };

  console.log("personalityquizquestion", personalityquizquestion);

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
            {personalityquizquestion &&
              personalityquizquestion?.map((question, index) => (
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
          {personalityquizquestion &&
            personalityquizquestion?.map((question, index) => (
              <div className="questioncontent">
                <div className="titlequestions d-flex align-items-center justify-content-between">
                  <div className="questionTitle">
                    <h4>Question {index + 1}</h4>
                  </div>
                  <div className="questionTitle d-flex align-items-center gap-2">
                    <button onClick={() => handleCloneQuestion(question.id)} className="button sm button-secondary px-3 border-0 font-sm">
                      <i class="fa-solid fa-clone"></i>
                    </button>
                    {console.log(questions?.length, "questions?.length")}
                    {personalityquizquestion?.length > 1 && (
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
                      defaultValue={question.text}
                      onChange={(e) =>
                        handleQuestionTextChange(e.target.value, question.id)
                      }

                    ></textarea>
                    {errors?.questions?.[index]?.text && (
                      <p className="text-danger font-sm mt-1">
                        {errors.questions[index].text}
                      </p>
                    )}
                  </div>
                  {/* question-image */}
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
                          class="button button-primary border-0 me-2 font-sm"
                          onClick={() => {
                            setSelectedImageType({ type: "personalityquestion", questionId: question.id });
                            handleChangeImage(
                              "question-image",
                              formData?.id,
                              question.id
                            )
                          }
                          }
                        >
                          Upload
                        </button>
                        <button
                          class="button button-secondary px-3 border-0 font-sm"
                          onClick={() => handleDeleteQuestionImage(question.id)}
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
                        <button
                          htmlFor={`question${index}`}
                          className={`button button-primary sm font-sm py-2 border-0 ${question.isText ? "selected" : "outline"}`}
                          onClick={() =>
                            handleChangeTextImage("text", question.id)
                          }
                        >
                          <i class="fa-solid fa-bars"></i> Text
                        </button>
                        <button
                          className={`button button-primary sm font-sm py-2 border-0 ${question.isText === false ? "selected" : "outline"}`}
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
                    {question?.answers?.map((answer, index) => (
                      <div className="contentAnswer">
                        <div class="mb-4">
                          <div className="d-flex justify-content-between gap-2">
                            <label class="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                              Answer {index + 1} <span style={{ color: "red" }}>*</span>
                            </label>
                            <div className="d-flex align-items-center gap-3 mb-4">
                              <p className="mb-0">Link to result: 1</p>
                              {/* <input
                                class="form-check-input"
                                type="checkbox"
                                defaultChecked={answer?.isCorrect}
                                onChange={(e) =>
                                  handleCheckCorrectAnswer(
                                    e.target.checked,
                                    question.id,
                                    answer.id
                                  )
                                }
                              />
                              <label class="form-check-label ms-2">
                                Correct answer
                              </label> */}
                              <i
                                className="fa-solid fa-trash"
                                role="button"
                                onClick={() =>
                                  handleDeleteAnswer(question.id, answer.id)
                                }
                              ></i>
                            </div>
                          </div>

                          <div class="d-flex align-items-center mb-3">
                            {question?.isText === false && (
                              <>
                                <div className="questionImageLabel ">
                                  <img
                                    src={
                                      answer.image ||
                                      "https://res.cloudinary.com/dwl5gzbuz/image/upload/v1738148606/project-thumb_laxubz.png"
                                    }
                                    alt="question-image"
                                    className=""
                                  />
                                </div>
                                <button
                                  class="button button-primary font-sm border-0 me-2"
                                  onClick={() =>
                                    handleChangeImage(
                                      "answer-image",
                                      formData?.id,
                                      question.id,
                                      answer.id
                                    )
                                  }
                                >
                                  Upload
                                </button>
                              </>
                            )}

                            <input
                              type="text"
                              class="form-control theme-control me-2"
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
                            {errors?.questions?.[index]?.answers?.[index]?.text && (
                              <p className="text-danger font-sm mt-1">
                                {errors.questions[index].answers[index].text}
                              </p>
                            )}
                          </div>
                          {/* <div class="mb-3">
                            <label class="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                              Description
                            </label>
                            <textarea
                              class="form-control theme-control"
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
                          </div> */}
                        </div>
                      </div>
                    ))}

                    <div>
                      <button
                        className="btn button_boost"
                        onClick={() => handleAddAnswer(question.id)}
                      >
                        <i class="fa-solid fa-plus"></i> Add answer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>


      </div >
    </>
  );
}

export default PersonalityQuestionScreen;
