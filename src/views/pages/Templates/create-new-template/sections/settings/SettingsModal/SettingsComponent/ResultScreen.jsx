import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateShortId } from "utils/helpers";
import { updateTemplateAction } from "views/pages/Templates/TemplateRedux/actions/drawerAction";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";

const validationSchema = yup.object().shape({
  results: yup.array().of(
    yup.object().shape({
      header: yup.string().required("Header is required"),
    })
  ),
  // mode: "onChange",
});

function ResultScreen({
  setIsOpenFormModal,
  finalResult,
  handleNext,
  setParentErros,
  setfinalResult,
  selecteScreen,
  setTriggerNext = () => { },
  parenterror,
  questions,
  handleSaveQuestion,
  handleDeleteImageMatchUp,
  formRef,
  setErrorScreen = () => { },
  formData,
  handleChangeImage,
  onRegisterSlideImageCallback,
  handleDeleteImageResultForm
}) {
  const { templateDetails } = useSelector((state) => state.DrawerReducer);
  console.log(finalResult, "finalResultfinalResultfinalResult");
  const dispatch = useDispatch();
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      questions: [{ text: "", answers: [{ text: "", description: "" }] }],
    },
  });
  const [updatedtemplate, setupdatedTemplate] = useState(templateDetails || {});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
  const handleDeleteResultvalue = (id) => {
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
                  results: block.struct.results?.filter((e) => e.id !== id),
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
  const handleChangeHeaderResult = (e, id) => {
    console.log(e, "dasddaadda");

    // setErrors((prevErrors) => ({
    //   ...prevErrors,
    //   [id]: value === "" ? "Header is required." : null,
    // }));
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
                  results: block.struct.results?.map((result) =>
                    result.id === id
                      ? {
                        ...result,
                        header: e,
                      }
                      : result
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

  const handleChangeDescriptionResult = (e, id) => {
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
                  results: block.struct.results?.map((result) =>
                    result.id === id
                      ? {
                        ...result,
                        description: e,
                      }
                      : result
                  ),
                },
              }
              : block
          ),
        })),
      },
    };
    console.log(updatedData, "updatedDataupdatedData");
    setupdatedTemplate(updatedData);
    // dispatch(updateTemplateAction(updatedData));
  };

  const handleChangeImageDisclaimer = (e, id) => {
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
                  results: block.struct.results?.map((result) =>
                    result.id === id
                      ? {
                        ...result,
                        imageDisclaimer: e,
                      }
                      : result
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
  const handleChangeButtontext = (e, id) => {
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
                  results: block.struct.results?.map((result) =>
                    result.id === id
                      ? {
                        ...result,
                        buttonText: e,
                      }
                      : result
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

  const handleChangeButtonLink = (e, id) => {
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
                  results: block.struct.results?.map((result) =>
                    result.id === id
                      ? {
                        ...result,
                        buttonLink: e,
                      }
                      : result
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

  const handleDeleteImage = (id) => {
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
                  results: block.struct.results?.map((result) =>
                    result.id === id
                      ? {
                        ...result,
                        image: "",
                      }
                      : result
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

  const handleResultHeader = (e) => {
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
                  finalScreen: {
                    ...block.struct.finalScreen,
                    header: e,
                  },
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
  // const handleResultDescriptionFormPuzzle = (e) => {
  //   // const updatedData = {
  //   //   ...updatedtemplate,
  //   //   project_structure: {
  //   //     ...updatedtemplate.project_structure,
  //   //     pages: updatedtemplate.project_structure.pages.map((page) => ({
  //   //       ...page,
  //   //       blocks: page.blocks.map((block) =>
  //   //         block.id === formData?.id
  //   //           ? {
  //   //             ...block,
  //   //             struct: {
  //   //               ...block.struct,
  //   //               finalScreen: {
  //   //                 ...block.struct.finalScreen,
  //   //                 description: e,
  //   //               },
  //   //             },
  //   //           }
  //   //           : block
  //   //       ),
  //   //     })),
  //   //   },
  //   // };
  //   // setupdatedTemplate(updatedData)
  //   // dispatch(updateTemplateAction(updatedData));
  // };
  const handleResultDescriptionFormPuzzle = (e) => {
    const value = e;
    setfinalResult((prev) => ({ ...prev, description: value }));

    console.log(value, "checkposition");
    // const updatedData = {
    //   ...updatedtemplate,
    //   project_structure: {
    //     ...updatedtemplate.project_structure,
    //     pages: updatedtemplate.project_structure.pages.map((page) => ({
    //       ...page,
    //       blocks: page.blocks.map((block) =>
    //         block.id === formData?.id
    //           ? {
    //             ...block,
    //             struct: {
    //               ...block.struct,
    //               finalScreen: {
    //                 ...block.struct.finalScreen,
    //                 header: e,
    //               },
    //             },
    //           }
    //           : block
    //       ),
    //     })),
    //   },
    // };
    // setupdatedTemplate(updatedData)
    // dispatch(updateTemplateAction(updatedData));
  };
  const handleResultDescription = (e) => {
    console.log(e, "checkposition");
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
                  finalScreen: {
                    ...block.struct.finalScreen,
                    description: e,
                  },
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

  const handleResultHeaderForm = (e) => {
    const value = e
    console.log(e, "checkposition");
    setfinalResult((prev) => ({ ...prev, headerText: value }));
    setParentErros((prev) => ({ ...prev, finalResultHeader: false }));
    // const updatedData = {
    //   ...updatedtemplate,
    //   project_structure: {
    //     ...updatedtemplate.project_structure,
    //     pages: updatedtemplate.project_structure.pages.map((page) => ({
    //       ...page,
    //       blocks: page.blocks.map((block) =>
    //         block.id === formData?.id
    //           ? {
    //             ...block,
    //             struct: {
    //               ...block.struct,
    //               finalScreen: {
    //                 ...block.struct.finalScreen,
    //                 headerText: e,
    //               },
    //             },
    //           }
    //           : block
    //       ),
    //     })),
    //   },
    // };
    // setupdatedTemplate(updatedData);
    // dispatch(updateTemplateAction(updatedData));
  };
  const handleResultHeaderFormPuzzle = (e) => {
    const value = e;
    console.log(value, "asaa")
    setfinalResult((prev) => ({ ...prev, header: value }));
    setParentErros((prev) => ({ ...prev, finalResultHeader: false }));
    console.log(value, "checkposition");
    // const updatedData = {
    //   ...updatedtemplate,
    //   project_structure: {
    //     ...updatedtemplate.project_structure,
    //     pages: updatedtemplate.project_structure.pages.map((page) => ({
    //       ...page,
    //       blocks: page.blocks.map((block) =>
    //         block.id === formData?.id
    //           ? {
    //             ...block,
    //             struct: {
    //               ...block.struct,
    //               finalScreen: {
    //                 ...block.struct.finalScreen,
    //                 header: e,
    //               },
    //             },
    //           }
    //           : block
    //       ),
    //     })),
    //   },
    // };
    // setupdatedTemplate(updatedData)
    // dispatch(updateTemplateAction(updatedData));
  };
  const handleResultDescriptionForm = (e) => {
    const value = e
    setfinalResult((prev) => ({ ...prev, descriptionText: value }));
    // const updatedData = {
    //   ...updatedtemplate,
    //   project_structure: {
    //     ...updatedtemplate.project_structure,
    //     pages: updatedtemplate.project_structure.pages.map((page) => ({
    //       ...page,
    //       blocks: page.blocks.map((block) =>
    //         block.id === formData?.id
    //           ? {
    //             ...block,
    //             struct: {
    //               ...block.struct,
    //               finalScreen: {
    //                 ...block.struct.finalScreen,
    //                 descriptionText: e,
    //               },
    //             },
    //           }
    //           : block
    //       ),
    //     })),
    //   },
    // };
    // setupdatedTemplate(updatedData);
    // dispatch(updateTemplateAction(updatedData));
  };

  const handleAddNewResult = () => {
    const answerObject = {
      id: generateShortId(),
      image: "",
      header: "Header text",
      buttonLink: "",
      buttonText: "",
      description: "Description",
    };

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
                  results: [...block.struct.results, answerObject],
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
  console.log(formData, "finalResult.imageSrc")
  const handleDeleteImageResultLeadForm = (cardId) => {
    const updatedData = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        pages: templateDetails.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === cardId
              ? {
                ...block,
                struct: {
                  ...block.struct,
                  final: {
                    ...block.struct.final,
                    imageSrc: "",
                  },
                },
              }
              : block
          ),
        })),
      },
    };
    dispatch(updateTemplateAction(updatedData));
    // dispatch(updateTemplateAction(updatedData));
  };
  // const handleDeleteImageResultForm = () => {
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
  //                 finalScreen: {
  //                   ...block.struct.finalScreen,
  //                   imageSrc: "",
  //                 },
  //               },
  //             }
  //             : block
  //         ),
  //       })),
  //     },
  //   };
  //   setupdatedTemplate(updatedData);
  //   // dispatch(updateTemplateAction(updatedData));
  // };
  console.log(updatedtemplate, "updatedtemplateupdatedtemplate");
  console.log(formData, "checkformdataheerere");
  const handleSlideImageChange = (image, slideId) => {
    setSlideShow((prev) => ({
      ...prev,
      slides: prev.slides.map((slide) =>
        slide.id === slideId ? { ...slide, image } : slide
      ),
    }));
  };

  useEffect(() => {
    if (formRef?.current) {
      formRef.current = {
        submitFormQuizResult: handleSubmit((data) => {
          console.log(updatedtemplate, "123123123123");
          // return
          dispatch(updateTemplateAction(updatedtemplate));
          setIsOpenFormModal(false);
        }),

        hasErrors: () => Object.keys(errors).length > 0, // Checks for errors
      };
    }
  }, [formRef, handleSubmit, errors, updatedtemplate]);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setErrorScreen(true);
      setTriggerNext(true);
    } else {
      setErrorScreen(false);
      setTriggerNext(false);
    }
  }, [errors]);
  useEffect(() => {
    methods.reset(updatedtemplate);
  }, [updatedtemplate, methods]);

  useEffect(() => {
    methods.trigger("results");
  }, [methods]);
  useEffect(() => {
    methods.reset(updatedtemplate); // Ensure it respects empty values
  }, [updatedtemplate]);

  console.log(formData?.struct, "checkformdatatatata")
  return (
    <>
      {formData.block === "quiz" && (
        <div class="d-flex w-100 gap-3 gap-md-0">
          <div class="border-end scrollable-div result-list">
            <div className="sidebarquestions">
              {formData?.struct?.results?.map((result, index) => (
                <div className="questionSidebarList align-items-center">
                  <div className="questionImageLabel">
                    <img
                      src={
                        result.image ||
                        "https://res.cloudinary.com/dwl5gzbuz/image/upload/v1738148606/project-thumb_laxubz.png"
                      }
                      alt="question-image"
                      className=""
                    />
                  </div>
                  <p className="mb-0">Result {index + 1}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="w-100 scrollable-div">
            <FormProvider {...methods}>
              <form>
                {formData?.struct?.results?.map((result, index) => {
                  const totalQuestions = formData?.struct?.questions?.length;

                  const resultRange =
                    index < totalQuestions + 1 ? index : totalQuestions;

                  return (
                    <div key={result.id} className="resultsscreen p-4">
                      <div className="d-flex justify-content-between">
                        <h5 className="fw-bold">
                          Result {index + 1}
                          {/* Adjusting result range dynamically based on the number of questions */}
                          <span className="text-muted">
                            ({resultRange} correct answer
                            {resultRange > 1 ? "s" : ""})
                          </span>
                        </h5>

                        <div className="questionTitle d-flex align-items-center gap-2">
                          <button className="button sm button-secondary px-3 border-0 font-sm">
                            <i className="fa-solid fa-clone"></i>
                          </button>
                          {formData?.struct?.results?.length > 1 && (
                            <button
                              className="button sm button-secondary bg-danger text-white px-3 border-0 font-sm"
                              onClick={() => handleDeleteResultvalue(result.id)}
                            >
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="mb-3">
                        <label className="form-label font-sm fw-medium d-flex align-items-center cursor-pointer">
                          Header<span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          type="text"
                          {...register(`results[${index}].header`, {
                            required: "Header is required",
                            validate: (value) =>
                              value.trim() !== "" || "Header cannot be empty",
                          })}
                          className="form-control theme-control"
                          defaultValue={result.header}
                          onChange={(e) =>
                            handleChangeHeaderResult(e.target.value, result.id)
                          }
                        />
                        {errors.results?.[index]?.header && (
                          <p className="text-danger font-sm mt-1">
                            {errors.results[index].header.message}
                          </p>
                        )}
                      </div>

                      <div className="mb-3">
                        <label className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                          Description
                        </label>
                        <textarea
                          className="form-control theme-control"
                          rows="3"
                          defaultValue={result.description}
                          onChange={(e) =>
                            handleChangeDescriptionResult(
                              e.target.value,
                              result.id
                            )
                          }
                        ></textarea>
                      </div>

                      <div className="mb-3">
                        <label className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                          Result image
                        </label>
                        <div className="d-flex align-items-center">
                          <div className="questionImageLabel">
                            <img
                              src={
                                result.image ||
                                "https://res.cloudinary.com/dwl5gzbuz/image/upload/v1738148606/project-thumb_laxubz.png"
                              }
                              alt="question-image"
                              className=""
                            />
                          </div>
                          <button
                            className="button button-primary font-sm border-0 me-2"
                            onClick={() =>
                              handleChangeImage(
                                "result-image",
                                formData?.id,
                                result.id
                              )
                            }
                          >
                            Upload
                          </button>
                          <button
                            className="button button-secondary border-0 px-3"
                            onClick={() => handleDeleteImage(result.id)}
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </div>
                      </div>

                      <div className="mb-3">
                        <label className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                          Image disclaimer (optional)
                        </label>
                        <input
                          type="text"
                          className="form-control theme-control"
                          defaultValue={result.imageDisclaimer}
                          onChange={(e) =>
                            handleChangeImageDisclaimer(
                              e.target.value,
                              result.id
                            )
                          }
                        />
                      </div>

                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                            Button text
                          </label>
                          <input
                            type="text"
                            className="form-control theme-control"
                            defaultValue={result.buttonText}
                            onChange={(e) =>
                              handleChangeButtontext(e.target.value, result.id)
                            }
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label font-sm fw-medium d-flex align-items-center justify-content-between gap-2 cursor-pointer">
                            Link
                          </label>
                          <input
                            type="text"
                            className="form-control theme-control"
                            placeholder="Internal page"
                            defaultValue={result.buttonLink}
                            onChange={(e) =>
                              handleChangeButtonLink(e.target.value, result.id)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </form>
            </FormProvider>
          </div>
        </div>
      )}

      {formData.block === "personality-quiz" && (
        <div class="d-flex w-100 gap-3 gap-md-0">
          <div class="border-end scrollable-div result-list">
            <div className="sidebarquestions">
              {formData?.struct?.results?.map((result, index) => (
                <div className="questionSidebarList align-items-center">
                  <div className="questionImageLabel">
                    <img
                      src={
                        result.image ||
                        "https://res.cloudinary.com/dwl5gzbuz/image/upload/v1738148606/project-thumb_laxubz.png"
                      }
                      alt="questionimage"
                      className=""
                    />
                  </div>
                  <p className="mb-0">Result {index + 1}</p>
                </div>
              ))}
              <div className="button_addNewquestion pb-3">
                <button
                  className="btn button_boost p-0"
                  onClick={() => handleAddNewResult()}
                >
                  <i class="fa-solid fa-plus"></i> Add New
                </button>
              </div>
            </div>
          </div>
          <div className="w-100 scrollable-div">
            {formData?.struct?.results?.map((result, index) => {
              const totalQuestions = formData?.struct?.questions?.length;

              const resultRange =
                index < totalQuestions + 1 ? index : totalQuestions;

              return (
                <div key={result.id} className="resultsscreen p-4">
                  <div className="d-flex justify-content-between">
                    <h5 className="fw-bold">
                      Result {index + 1}
                      {/* Adjusting result range dynamically based on the number of questions */}
                      <span className="text-muted">
                        ({resultRange} correct answer
                        {resultRange > 1 ? "s" : ""})
                      </span>
                    </h5>

                    <div className="questionTitle d-flex align-items-center gap-2">
                      <button className="button sm button-secondary px-3 border-0 font-sm">
                        <i className="fa-solid fa-clone"></i>
                      </button>
                      {formData?.struct?.results?.length > 1 && (
                        <button
                          className="button sm button-secondary bg-danger text-white px-3 border-0 font-sm"
                          onClick={() => handleDeleteResultvalue(result.id)}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label font-sm fw-medium d-flex align-items-center cursor-pointer">
                      Header<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control theme-control"
                      defaultValue={result.header}
                      onChange={(e) =>
                        handleChangeHeaderResult(e.target.value, result.id)
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                      Description
                    </label>
                    <textarea
                      className="form-control theme-control"
                      rows="3"
                      defaultValue={result.description}
                      onChange={(e) =>
                        handleChangeDescriptionResult(e.target.value, result.id)
                      }
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                      Result image
                    </label>
                    <div className="d-flex align-items-center">
                      <div className="questionImageLabel">
                        <img
                          src={
                            result.image ||
                            "https://res.cloudinary.com/dwl5gzbuz/image/upload/v1738148606/project-thumb_laxubz.png"
                          }
                          alt="question-image"
                          className=""
                        />
                      </div>
                      <button
                        className="button button-primary font-sm border-0 me-2"
                        onClick={() =>
                          handleChangeImage(
                            "result-image",
                            formData?.id,
                            result.id
                          )
                        }
                      >
                        Upload
                      </button>
                      <button
                        className="button button-secondary border-0 px-3"
                        onClick={() => handleDeleteImage(result.id)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                      Image disclaimer (optional)
                    </label>
                    <input
                      type="text"
                      className="form-control theme-control"
                      defaultValue={result.imageDisclaimer}
                      onChange={(e) =>
                        handleChangeImageDisclaimer(e.target.value, result.id)
                      }
                    />
                  </div>

                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                        Button text
                      </label>
                      <input
                        type="text"
                        className="form-control theme-control"
                        defaultValue={result.buttonText}
                        onChange={(e) =>
                          handleChangeButtontext(e.target.value, result.id)
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label font-sm fw-medium d-flex align-items-center justify-content-between gap-2 cursor-pointer">
                        Link
                      </label>
                      <input
                        type="text"
                        className="form-control theme-control"
                        placeholder="Internal page"
                        defaultValue={result.buttonLink}
                        onChange={(e) =>
                          handleChangeButtonLink(e.target.value, result.id)
                        }
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {formData.block === "treasure-hunt" && (
        <>
          <div class="form-left scrollable-div">
            <h4 className="mb-4">final screen</h4>
            <div class="mb-3">
              <label class="form-label font-sm fw-medium d-flex align-items-center cursor-pointer">
                Header <span class="text-danger">*</span>
              </label>
              <input
                type="text"
                class="form-control theme-control"
                id="headerInput"
                placeholder="Congrats message"
                defaultValue={formData?.struct?.finalScreen?.header}
                onChange={(e) => handleResultHeader(e.target.value)}
              />
            </div>
            <div class="mb-3">
              <label class="form-label font-sm fw-medium d-flex align-items-center cursor-pointer">
                Description
              </label>
              <textarea
                class="form-control theme-control"
                id="descriptionInput"
                rows="3"
                placeholder="Description"
                defaultValue={formData?.struct?.finalScreen?.description}
                onChange={(e) => handleResultDescription(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label class="form-label font-sm fw-medium d-flex align-items-center cursor-pointer">
                Image
              </label>
              <div class="d-flex align-items-center gap-2">
                {formData?.struct?.finalScreen?.imageSrc && (
                  <div>
                    <img
                      src={formData?.struct?.finalScreen?.imageSrc}
                      alt="question-image"
                      style={{
                        height: 44,
                        width: 44,
                        borderRadius: 8,
                        objectFit: "cover",
                      }}
                    />
                  </div>
                )}

                <button
                  className="button button-primary border-0"
                  onClick={() =>
                    handleChangeImage("result-image-treasure", formData?.id)
                  }
                >
                  Change
                </button>
              </div>
            </div>
          </div>

          <div class="form-right scrollable-div border-start py-4">
            <h6>Approximate preview</h6>
            <div class="preview-box text-center">
              {formData?.struct?.finalScreen?.imageSrc && (
                <img
                  id="previewImage"
                  src={formData?.struct?.finalScreen?.imageSrc}
                  alt="Preview"
                  style={{
                    height: 192,
                    width: "100%",
                    objectFit: "cover",
                  }}
                  className="w-100"
                />
              )}

              <div className="p-3 bg-white">
                <p class="preview-text mb-2 fw-medium" id="previewHeader">
                  {formData?.struct?.finalScreen?.header}
                </p>
                <p id="previewDescription" className="mb-0">
                  {formData?.struct?.finalScreen?.description}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
      {console.log(formData.block, "formData.block")}
      {formData.block === "form" && (
        <>
          <div class="form-left scrollable-div">
            <h4 className="mb-4">Thank  you</h4>
            <div class="mb-3">
              <label class="form-label font-sm fw-medium d-flex align-items-center gap-1 cursor-pointer">
                Header <span class="text-danger">*</span>
              </label>
              {console.log(finalResult?.headerText, "finalResult?.headerText")}
              <input
                type="text"
                className={`form-control theme-control ${parenterror.finalResultHeader ? "is-invalid" : ""
                  }`}
                id="headerInput"
                placeholder="Congrats message"
                value={finalResult?.headerText}
                onChange={(e) => handleResultHeaderForm(e.target.value)}
              />
              {parenterror.finalResultHeader && (
                <div className="invalid-feedback">Header is required.</div>
              )}
            </div>
            <div class="mb-3">
              <label class="form-label font-sm fw-medium d-flex align-items-center gap-1 cursor-pointer">
                Description
              </label>
              <textarea
                class="form-control theme-control"
                id="descriptionInput"
                rows="3"
                placeholder="Description"
                defaultValue={finalResult.descriptionText}
                onChange={(e) => handleResultDescriptionForm(e.target.value)}
              />
            </div>
            <div class="mb-3">
              <label class="form-label font-sm fw-medium d-flex align-items-center gap-1 cursor-pointer">
                Imagewqwqw
              </label>
              <div className="d-flex align items-center gap-2">
                {finalResult.imageSrc && (
                  <img
                    src={finalResult?.imageSrc}
                    alt="question-image"
                    style={{
                      height: 44,
                      width: 44,
                      borderRadius: 8,
                      objectFit: "cover",
                    }}
                  />
                )}

                <button
                  className="button button-primary px-3 border-0"
                  onClick={() =>
                    handleChangeImage("result-image-form", formData?.id)
                  }
                >
                  Change
                </button>
                <button
                  className="button button-secondary sm px-3 border-0 text-muted"
                  onClick={() => handleDeleteImageResultLeadForm(formData?.id)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="form-right scrollable-div border-start p-4">
            <h6>Approximate preview</h6>
            {console.log(formData?.struct?.final?.imageSrc, "asasasasa")}
            <div class="preview-box text-center">
              {formData?.struct?.final?.imageSrc && (
                <img
                  id="previewImage"
                  src={formData?.struct?.final?.imageSrc}
                  alt="Preview"
                  className="w-100"
                />
              )}

              <div className="p-3 bg-white">
                <p class="preview-text mb-2 fw-medium" id="previewHeader">
                  {finalResult?.headerText}
                </p>
                <p className="previewDescription mb-0 text-break">
                  {finalResult?.descriptionText}
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {formData.block === "puzzle" && (
        <>
          <div class="form-left scrollable-div">
            <h4 className="mb-4">Final screen</h4>
            <div class="mb-3">
              <label class="form-label font-sm fw-medium d-flex align-items-center gap-1 cursor-pointer">
                Header <span class="text-danger">*</span>
              </label>
              <input
                type="text"
                value={finalResult.header || ""}
                // onChange={(e) =>
                //   setFinalResult((prev) => ({ ...prev, header: e.target.value }))
                // }
                // defaultValue={formData?.struct?.finalScreen?.header}
                onChange={(e) => handleResultHeaderFormPuzzle(e.target.value)}
                className={`form-control theme-control ${parenterror.finalResultHeader ? "is-invalid" : ""
                  }`}
                placeholder="Congrats message"
              />

              {parenterror.finalResultHeader && (
                <div className="invalid-feedback">Header is required.</div>
              )}
            </div>
            <div class="mb-3">
              <label class="form-label font-sm fw-medium d-flex align-items-center gap-1 cursor-pointer">
                Description
              </label>
              {console.log(finalResult, "finalResult.description")}
              <textarea
                class="form-control theme-control"
                id="descriptionInput"
                rows="3"
                placeholder="Description"
                value={finalResult.description || ""}
                onChange={(e) =>
                  handleResultDescriptionFormPuzzle(e.target.value)
                }
              />
            </div>
            <div class="mb-3">
              <label class="form-label font-sm fw-medium d-flex align-items-center gap-1 cursor-pointer">
                Image
              </label>
              <div className="d-flex align items-center gap-2">
                <img
                  src={
                    formData?.struct?.finalScreen?.imageSrc ||
                    "https://res.cloudinary.com/dwl5gzbuz/image/upload/v1738148606/project-thumb_laxubz.png"
                  }
                  alt="question-image"
                  style={{
                    height: 44,
                    width: 44,
                    borderRadius: 8,
                    objectFit: "cover",
                  }}
                />

                <button
                  className="button button-primary px-3 border-0"
                  onClick={() => handleChangeImage("puzzle", formData?.id)}
                >
                  Change
                </button>
                <button
                  className="button button-secondary sm px-3 border-0 text-muted"
                  onClick={() => handleDeleteImageMatchUp(formData?.id)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="form-right scrollable-div border-start p-4">
            <h6>Approximate preview</h6>
            <div class="preview-box text-center">
              <img
                id="previewImage"
                src={
                  formData?.struct?.finalScreen?.imageSrc ||
                  "https://res.cloudinary.com/dwl5gzbuz/image/upload/v1738148606/project-thumb_laxubz.png"
                }
                alt="Preview"
                className="w-100"
              />
              <div className="p-3 bg-white">
                <p class="preview-text mb-2 fw-medium" id="previewHeader">
                  {finalResult.header}
                </p>
                <p className="previewDescription mb-0 text-break">
                  {finalResult.description}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
      {formData.block === "sliding-puzzle" && (
        <>
          <div class="form-left scrollable-div">
            <h4 className="mb-4">Final screen</h4>
            <div class="mb-3">
              <label class="form-label font-sm fw-medium d-flex align-items-center gap-1 cursor-pointer">
                Header <span class="text-danger">*</span>
              </label>
              <input
                type="text"
                value={finalResult.header || ""}
                // onChange={(e) =>
                //   setFinalResult((prev) => ({ ...prev, header: e.target.value }))
                // }
                // defaultValue={formData?.struct?.finalScreen?.header}
                onChange={(e) => handleResultHeaderFormPuzzle(e.target.value)}
                className={`form-control theme-control ${parenterror.finalResultHeader ? "is-invalid" : ""
                  }`}
                placeholder="Congrats message"
              />

              {parenterror.finalResultHeader && (
                <div className="invalid-feedback">Header is required.</div>
              )}
            </div>
            <div class="mb-3">
              <label class="form-label font-sm fw-medium d-flex align-items-center gap-1 cursor-pointer">
                Description
              </label>
              {console.log(finalResult, "finalResult.description")}
              <textarea
                class="form-control theme-control"
                id="descriptionInput"
                rows="3"
                placeholder="Description"
                value={finalResult.description || ""}
                onChange={(e) =>
                  handleResultDescriptionFormPuzzle(e.target.value)
                }
              />
            </div>
            <div class="mb-3">
              <label class="form-label font-sm fw-medium d-flex align-items-center gap-1 cursor-pointer">
                Image
              </label>
              <div className="d-flex align items-center gap-2">
                <img
                  src={
                    formData?.struct?.finalScreen?.imageSrc ||
                    "https://res.cloudinary.com/dwl5gzbuz/image/upload/v1738148606/project-thumb_laxubz.png"
                  }
                  alt="question-image"
                  style={{
                    height: 44,
                    width: 44,
                    borderRadius: 8,
                    objectFit: "cover",
                  }}
                />

                <button
                  className="button button-primary px-3 border-0"
                  onClick={() =>
                    handleChangeImage("puzzle-result-image", formData?.id)
                  }
                >
                  Change
                </button>
                <button
                  className="button button-secondary sm px-3 border-0 text-muted"
                  onClick={() => handleDeleteImageResultForm(formData?.id)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="form-right scrollable-div border-start p-4">
            <h6>Approximate preview</h6>
            <div class="preview-box text-center">
              <img
                id="previewImage"
                src={
                  formData?.struct?.finalScreen?.imageSrc ||
                  "https://res.cloudinary.com/dwl5gzbuz/image/upload/v1738148606/project-thumb_laxubz.png"
                }
                alt="Preview"
                className="w-100"
              />
              <div className="p-3 bg-white">
                <p class="preview-text mb-2 fw-medium" id="previewHeader">
                  {finalResult.header}
                </p>
                <p className="previewDescription mb-0 text-break">
                  {finalResult.description}
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {formData.block === "memory" && (
        <>
          <div class="form-left scrollable-div">
            <h4 className="mb-4">Final screen</h4>
            <div class="mb-3">
              <label class="form-label font-sm fw-medium d-flex align-items-center gap-1 cursor-pointer">
                Header <span class="text-danger">*</span>
              </label>
              <input
                type="text"
                value={finalResult.header || ""}
                // onChange={(e) =>
                //   setFinalResult((prev) => ({ ...prev, header: e.target.value }))
                // }
                // defaultValue={formData?.struct?.finalScreen?.header}
                onChange={(e) => handleResultHeaderFormPuzzle(e.target.value)}
                className={`form-control theme-control ${parenterror.finalResultHeader ? "is-invalid" : ""
                  }`}
                placeholder="Congrats message"
              />

              {parenterror.finalResultHeader && (
                <div className="invalid-feedback">Header is required.</div>
              )}
            </div>
            <div class="mb-3">
              <label class="form-label font-sm fw-medium d-flex align-items-center gap-1 cursor-pointer">
                Description
              </label>
              {console.log(finalResult, "finalResult.description")}
              <textarea
                class="form-control theme-control"
                id="descriptionInput"
                rows="3"
                placeholder="Description"
                value={finalResult.description || ""}
                onChange={(e) =>
                  handleResultDescriptionFormPuzzle(e.target.value)
                }
              />
            </div>
            <div class="mb-3">
              <label class="form-label font-sm fw-medium d-flex align-items-center gap-1 cursor-pointer">
                Image
              </label>
              <div className="d-flex align items-center gap-2">
                <img
                  src={
                    formData?.struct?.finalScreen?.imageSrc ||
                    "https://res.cloudinary.com/dwl5gzbuz/image/upload/v1738148606/project-thumb_laxubz.png"
                  }
                  alt="question-image"
                  style={{
                    height: 44,
                    width: 44,
                    borderRadius: 8,
                    objectFit: "cover",
                  }}
                />

                <button
                  className="button button-primary px-3 border-0"
                  onClick={() =>
                    handleChangeImage("puzzle-result-image", formData?.id)
                  }
                >
                  Change
                </button>
                <button
                  className="button button-secondary sm px-3 border-0 text-muted"
                  onClick={() => handleDeleteImageResultForm(formData?.id)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="form-right scrollable-div border-start p-4">
            <h6>Approximate preview</h6>
            <div class="preview-box text-center">
              <img
                id="previewImage"
                src={
                  formData?.struct?.finalScreen?.imageSrc ||
                  "https://res.cloudinary.com/dwl5gzbuz/image/upload/v1738148606/project-thumb_laxubz.png"
                }
                alt="Preview"
                className="w-100"
              />
              <div className="p-3 bg-white">
                <p class="preview-text mb-2 fw-medium" id="previewHeader">
                  {finalResult?.header}
                </p>
                <p className="previewDescription mb-0 text-break">
                  {finalResult?.description}
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {formData.block === "find-pair" && (
        <>
          <div class="form-left scrollable-div">
            <h4 className="mb-4">Final screen</h4>
            <div class="mb-3">
              <label class="form-label font-sm fw-medium d-flex align-items-center gap-1 cursor-pointer">
                Header <span class="text-danger">*</span>
              </label>
              <input
                type="text"
                class="form-control theme-control"
                id="headerInput"
                placeholder="Congrats message"
                defaultValue={formData?.struct?.finalScreen?.header}
                onChange={(e) => handleResultHeaderFormPuzzle(e.target.value)}
              />
            </div>
            <div class="mb-3">
              <label class="form-label font-sm fw-medium d-flex align-items-center gap-1 cursor-pointer">
                Description
              </label>
              <textarea
                class="form-control theme-control"
                id="descriptionInput"
                rows="3"
                placeholder="Description"
                defaultValue={formData?.struct?.finalScreen?.description}
                onChange={(e) =>
                  handleResultDescriptionFormPuzzle(e.target.value)
                }
              />
            </div>
            <div class="mb-3">
              <label class="form-label font-sm fw-medium d-flex align-items-center gap-1 cursor-pointer">
                Image
              </label>
              <div className="d-flex align items-center gap-2">
                <img
                  src={
                    formData?.struct?.finalScreen?.imageSrc ||
                    "https://res.cloudinary.com/dwl5gzbuz/image/upload/v1738148606/project-thumb_laxubz.png"
                  }
                  alt="question-image"
                  style={{
                    height: 44,
                    width: 44,
                    borderRadius: 8,
                    objectFit: "cover",
                  }}
                />

                <button
                  className="button button-primary px-3 border-0"
                  onClick={() =>
                    handleChangeImage("puzzle-result-image", formData?.id)
                  }
                >
                  Change
                </button>
                <button
                  className="button button-secondary sm px-3 border-0 text-muted"
                  onClick={() => handleDeleteImageResultForm(formData?.id)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="form-right scrollable-div border-start p-4">
            <h6>Approximate preview</h6>
            <div class="preview-box text-center">
              <img
                id="previewImage"
                src={
                  formData?.struct?.finalScreen?.imageSrc ||
                  "https://res.cloudinary.com/dwl5gzbuz/image/upload/v1738148606/project-thumb_laxubz.png"
                }
                alt="Preview"
                className="w-100"
              />
              <div className="p-3 bg-white">
                <p class="preview-text mb-2 fw-medium" id="previewHeader">
                  {formData?.struct?.finalScreen?.header}
                </p>
                <p className="previewDescription mb-0 text-break">
                  {formData?.struct?.finalScreen?.description}
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {formData.block === "match-up" && (
        <>
          <div class="form-left scrollable-div">
            <h4 className="mb-4">Final screen</h4>
            {/* <div class="mb-3">
              <label class="form-label font-sm fw-medium d-flex align-items-center gap-1 cursor-pointer">
                Header <span class="text-danger">*</span>
              </label>
              <input
                type="text"
                class="form-control theme-control"
                id="headerInput"
                placeholder="Congrats message"
                defaultValue={finalResult.header}
                onChange={(e) => handleResultHeaderFormPuzzle(e.target.value)}
              />
              {parenterror.finalResultHeader && (
                <div className="invalid-feedback">Header is required.</div>
              )}
            </div> */}
            <div class="mb-3">
              <label class="form-label font-sm fw-medium d-flex align-items-center gap-1 cursor-pointer">
                Header <span class="text-danger">*</span>
              </label>
              <input
                type="text"
                value={finalResult?.header || ""}
                // onChange={(e) =>
                //   setFinalResult((prev) => ({ ...prev, header: e.target.value }))
                // }
                // defaultValue={formData?.struct?.finalScreen?.header}
                onChange={(e) => handleResultHeaderFormPuzzle(e.target.value)}
                className={`form-control theme-control ${parenterror.finalResultHeader ? "is-invalid" : ""
                  }`}
                placeholder="Congrats message"
              />

              {parenterror.finalResultHeader && (
                <div className="invalid-feedback">Header is required.</div>
              )}
            </div>
            <div class="mb-3">
              <label class="form-label font-sm fw-medium d-flex align-items-center gap-1 cursor-pointer">
                Description
              </label>
              <textarea
                class="form-control theme-control"
                id="descriptionInput"
                rows="3"
                placeholder="Description"
                defaultValue={finalResult?.description}
                onChange={(e) =>
                  handleResultDescriptionFormPuzzle(e.target.value)
                }
              />
            </div>
            <div class="mb-3">
              <label class="form-label font-sm fw-medium d-flex align-items-center gap-1 cursor-pointer">
                Image
              </label>
              <div className="d-flex align items-center gap-2">
                <img
                  src={
                    finalResult?.imageSrc ||
                    "https://res.cloudinary.com/dwl5gzbuz/image/upload/v1738148606/project-thumb_laxubz.png"
                  }
                  alt="question-image"
                  style={{
                    height: 44,
                    width: 44,
                    borderRadius: 8,
                    objectFit: "cover",
                  }}
                />

                <button
                  className="button button-primary px-3 border-0"
                  onClick={() =>
                    handleChangeImage("match-up-image", formData?.id)
                  }
                >
                  Change
                </button>
                <button
                  className="button button-secondary sm px-3 border-0 text-muted"
                  onClick={() => handleDeleteImageResultForm(formData?.id)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="form-right scrollable-div border-start p-4">
            <h6>Approximate preview</h6>
            <div class="preview-box text-center">
              <img
                id="previewImage"
                src={
                  finalResult.imageSrc ||
                  "https://res.cloudinary.com/dwl5gzbuz/image/upload/v1738148606/project-thumb_laxubz.png"
                }
                alt="Preview"
                className="w-100"
              />
              <div className="p-3 bg-white">
                <p class="preview-text mb-2 fw-medium" id="previewHeader">
                  {finalResult?.header}
                </p>
                <p className="previewDescription mb-0 text-break">
                  {finalResult?.description}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ResultScreen;
