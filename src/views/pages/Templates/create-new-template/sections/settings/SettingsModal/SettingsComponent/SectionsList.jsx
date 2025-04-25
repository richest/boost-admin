import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateShortId } from "utils/helpers";
import { updateTemplateAction } from "views/pages/Templates/TemplateRedux/actions/drawerAction";
import Select from "react-select";
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object().shape({
  sectors: yup.array().of(
    yup.object().shape({
      text: yup.string().required("Sector name is required"),
      probabilityOfWinning: yup.string().required("Probability is required"),
      resultHeader: yup.string().required("Header is required"),
      resultDescription: yup.string(),
    })
  ),
});

function SectionsList({ setIsOpenFormModal, setErrorScreen, formData, questions, handleChangeImage, formRef, setSubmitFn }) {
  const { templateDetails } = useSelector((state) => state.DrawerReducer);
  console.log(
    formData?.struct?.playground?.cardType,
    "questionsquestionsquestions"
  );
  const defaultValues = {
    sectors: formData?.struct?.sections?.map((section) => ({
      text: section.text || "",
      probabilityOfWinning: section.probabilityOfWinning || "",
      resultHeader: section.resultHeader || "",
      resultDescription: section.resultDescription || "",
      description: section.description || "",
      imageUrl: section.imageUrl || "",
    })),
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      sectors: formData?.struct?.sections || [],
    },
    resolver: yupResolver(schema),
  });
  const { fields } = useFieldArray({
    control,
    name: "sectors",
  });
  console.log(fields, "fields")
  const onSubmit = (data) => {
    console.log("Submitted data:", data);
    setIsOpenFormModal(false)
    // dispatch or do what you want here
  };
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showoptions, setShowOptions] = useState(false)
  // const handleSelectSector = (index) => {
  //   setSelectedIndex(index);
  // };
  const scrollableDivRef = useRef(null);
  const handleSelectSector = (index) => {
    setSelectedIndex(index);

    // Scroll to the corresponding section in the main content
    const sectionElement = document.getElementById(`sector-${index}`);
    if (sectionElement) {
      sectionElement.scrollIntoView({
        behavior: 'smooth', // Smooth scrolling
        block: 'start', // Align to the top of the viewport
      });
    }
  };

  // Function to track which sector is currently in view
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

  const handleToggleState = () => {
    setShowOptions((prev) => !prev)
  }
  useEffect(() => {
    if (setSubmitFn) {

      setSubmitFn(handleSubmit(onSubmit));
    }
  }, [setSubmitFn, handleSubmit]);
  const questsLength = [
    {
      label: "Normal (50%)",
      value: "Normal (50%)",
    },
    {
      label: "Very High (75%)",
      value: "Very High (75%)",
    },
    {
      label: "High (60%)",
      value: "High (60%)",
    },
    {
      label: "Low (33%)",
      value: "Low (33%)",
    },
    {
      label: "Very Low (9%)",
      value: "Very Low (9%)",
    },
  ];

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
                  sections: block.struct.sections?.map((card) =>
                    card.id === id
                      ? {
                        ...card,
                        text: e, // ✅ update a different field
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

  const handleSelectChange = (e, id) => {
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
                  sections: block.struct.sections?.map((card) =>
                    card.id === id
                      ? {
                        ...card,
                        probabilityOfWinning: e.value,
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
  const handleQuestresulrheader = (e, id) => {
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
                  sections: block.struct.sections?.map((card) =>
                    card.id === id
                      ? {
                        ...card,
                        resultHeader: e,
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
                          resultDescription: e,
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


  console.log(errors, "errrrr")
  useEffect(() => {
    const hasAnyError = Object.keys(errors).length > 0;
    console.log(errors, "Errors object");  // Debug: Log errors
    console.log(hasAnyError, "Has any errors?");
    setErrorScreen(hasAnyError);  // Update error screen state based on errors
  }, [errors, setErrorScreen, handleSubmit]);
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
      <div class="d-flex w-100 gap-3 gap-md-0">
        <div class="border-end scrollable-div result-list">
          <div className="sidebarquestions">
            <h3>Sectors</h3>
            {formData?.struct?.sections?.length !== 0 &&
              formData?.struct?.sections?.map((card, index) => (
                <div className={`questionSidebarList align-items-center ${selectedIndex === index ? 'highlight' : ''}`}

                  onClick={() => handleSelectSector(index)}>
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
                  <p className="mb-0">{`Sector ${index + 1}`}</p>
                </div>
              ))}
          </div>
        </div>

        <div ref={scrollableDivRef} className="w-100 scrollable-div p-4">
          {fields.map((field, index) => (
            <div key={field.id}
              id={`sector-${index}`}
              className={`questioncontent mb-3 ${selectedIndex === index ? 'highlight' : ''}`}

              style={{ backgroundColor: selectedIndex === index ? '#f0f0f0' : 'transparent' }} // Highlight selected section

            >
              <div className="questionTitle">
                <h5 className="mb-3">Sector {index + 1}</h5>
              </div>
              {console.log(formData?.struct?.playground, "oioioi")}
              <div className="questionData">
                {formData?.struct?.playground?.sectionType === "TEXT" ? (
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-2">
                        <label className="form-label">Sector name on the wheel</label>
                        <input
                          type="text"
                          className="form-control theme-control"
                          {...register(`sectors.${index}.text`)}
                          maxLength={60}
                        />
                        <p className="text-danger">
                          {errors?.sectors?.[index]?.text?.message}
                        </p>
                      </div>

                      <div className="mb-2">
                        <label className="form-label">Probability of winning</label>
                        <Controller
                          control={control}
                          name={`sectors.${index}.probabilityOfWinning`}
                          render={({ field }) => (
                            <Select
                              className="theme-select"
                              classNamePrefix="react-select"
                              value={
                                field.value
                                  ? { label: field.value, value: field.value }
                                  : null
                              }
                              onChange={(selected) => field.onChange(selected?.value)}
                              options={questsLength} // must be [{ label: '', value: '' }]
                              placeholder="no of cards"
                            />
                          )}
                        />
                        <p className="text-danger">
                          {errors?.sectors?.[index]?.probabilityOfWinning?.message}
                        </p>
                      </div>

                      <div className="mb-2">
                        <label className="form-label">Result page header</label>
                        <input
                          type="text"
                          className="form-control theme-control"
                          {...register(`sectors.${index}.resultHeader`)}
                        />
                        <p className="text-danger">
                          {errors?.sectors?.[index]?.resultHeader?.message}
                        </p>
                      </div>

                      <div className="mb-2">
                        <label className="form-label">Result page Description</label>
                        <textarea
                          className="form-control theme-control"
                          {...register(`sectors.${index}.resultDescription`)}
                        ></textarea>
                      </div>

                    </div>
                    <div className="seeOptions">

                      <div>
                        <label className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                          Result image
                        </label>
                        <div className="d-flex align-items-start">
                          <div className="mb-3">
                            <div className="d-flex gap-2">
                              {formData?.struct?.playground.spinImageUrl && (
                                <img
                                  src={formData?.struct?.playground.spinImageUrl}
                                  alt="illustrationImage"
                                  className="image_illustrate"
                                  style={{
                                    height: 44,
                                    width: 44,
                                    borderRadius: 8,
                                    objectFit: "cover",
                                  }}
                                />
                              )}
                              <button
                                className="button button-primary border-0"
                                onClick={() =>
                                  handleChangeLogo(
                                    "spin-wheel-middle",
                                    formData?.id
                                  )
                                }
                              >
                                {formData?.struct?.playground.spinImageUrl
                                  ? "Change"
                                  : "Upload"}
                              </button>
                              {formData?.struct?.playground.spinImageUrl && (
                                <button
                                  className="button button-secondary px-3 border-0 text-muted"
                                  onClick={() => handleDeleteImage(formData.id)}
                                >
                                  <i class="fa-solid fa-trash"></i>
                                </button>
                              )}
                              <div onClick={() => handleToggleState()}>More Option</div>

                            </div>

                          </div>

                        </div>
                        {console.log(showoptions, "showoptions")}
                        {showoptions && <>

                          <div className="mb-2">
                            <label className="form-label">Image disclaimer</label>
                            <textarea
                              className="form-control theme-control"
                              {...register(`sectors.${index}.imageDisclaimer`)}
                            ></textarea>
                          </div>

                          <div className="mb-2">
                            <label className="form-label">Button text</label>
                            <textarea
                              className="form-control theme-control"
                              {...register(`sectors.${index}.buttonText`)}
                            ></textarea>
                          </div>

                          <div className="mb-2">
                            <label className="form-label">Link</label>
                            <textarea
                              className="form-control theme-control"
                              {...register(`sectors.${index}.link`)}
                            ></textarea>
                          </div>
                        </>

                        }
                      </div>

                    </div>
                  </div>
                ) : (
                  // <div className="row g-4">
                  //   <div className="col-md-2">
                  //     <div className="quest-cover border rounded-3 overflow-hidden w-100">
                  //       <img
                  //         src={
                  //           field.imageUrl ||
                  //           "https://res.cloudinary.com/dwl5gzbuz/image/upload/v1738148606/project-thumb_laxubz.png"
                  //         }
                  //         alt="Upload Icon"
                  //         className="w-100"
                  //       />
                  //       <label
                  //         onClick={() =>
                  //           handleChangeImage("card-image", formData?.id, field.id)
                  //         }
                  //         role="button"
                  //       >
                  //         <i className="fa-solid fa-camera"></i>
                  //       </label>
                  //     </div>
                  //   </div>

                  //   <div className="col-md-10">
                  //     <div className="d-flex flex-column h-100">
                  //       <label className="form-label">Description</label>
                  //       <textarea
                  //         className="form-control h-100"
                  //         {...register(`sectors.${index}.description`)}
                  //       ></textarea>
                  //     </div>
                  //   </div>
                  // </div>
                  // jhee have to make
                  <div className="row g-4">
                    <div className="col-md-2">
                      <div className="quest-cover border rounded-3 overflow-hidden w-100">
                        <img
                          src={
                            field.imageUrl ||
                            "https://res.cloudinary.com/dwl5gzbuz/image/upload/v1738148606/project-thumb_laxubz.png"
                          }
                          alt="Upload Icon"
                          className="w-100"
                        />
                        <label
                          onClick={() =>
                            handleChangeImage("card-image", formData?.id, field.id)
                          }
                          role="button"
                        >
                          <i className="fa-solid fa-camera"></i>
                        </label>
                      </div>
                    </div>

                    <div className="col-md-10">
                      <div className="d-flex flex-column h-100">
                        <label className="form-label">Description</label>
                        <textarea
                          className="form-control h-100"
                          {...register(`sectors.${index}.description`)}
                        ></textarea>
                      </div>
                    </div>

                    <div className="mb-2">
                      <label className="form-label">Probability of winning</label>
                      <Controller
                        control={control}
                        name={`sectors.${index}.probabilityOfWinning`}
                        render={({ field }) => (
                          <Select
                            className="theme-select"
                            classNamePrefix="react-select"
                            value={
                              field.value
                                ? { label: field.value, value: field.value }
                                : null
                            }
                            onChange={(selected) => field.onChange(selected?.value)}
                            options={questsLength} // Options for probability dropdown
                            placeholder="Select probability"
                          />
                        )}
                      />
                      <p className="text-danger">
                        {errors?.sectors?.[index]?.probabilityOfWinning?.message}
                      </p>
                    </div>

                    <div className="mb-2">
                      <label className="form-label">Result page header</label>
                      <input
                        type="text"
                        className="form-control theme-control"
                        {...register(`sectors.${index}.resultHeader`)}
                      />
                      <p className="text-danger">
                        {errors?.sectors?.[index]?.resultHeader?.message}
                      </p>
                    </div>

                    <div className="mb-2">
                      <label className="form-label">Result page image Description</label>
                      <textarea
                        className="form-control theme-control"
                        {...register(`sectors.${index}.resultDescription`)}
                      ></textarea>
                    </div>



                    <div className="seeOptions">

                      <div>
                        <label className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                          Result image
                        </label>
                        <div className="d-flex align-items-start">
                          <div className="mb-3">
                            <div className="d-flex gap-2">
                              {formData?.struct?.playground.spinImageUrl && (
                                <img
                                  src={formData?.struct?.playground.spinImageUrl}
                                  alt="illustrationImage"
                                  className="image_illustrate"
                                  style={{
                                    height: 44,
                                    width: 44,
                                    borderRadius: 8,
                                    objectFit: "cover",
                                  }}
                                />
                              )}
                              <button
                                className="button button-primary border-0"
                                onClick={() =>
                                  handleChangeLogo(
                                    "spin-wheel-middle",
                                    formData?.id
                                  )
                                }
                              >
                                {formData?.struct?.playground.spinImageUrl
                                  ? "Change"
                                  : "Upload"}
                              </button>
                              {formData?.struct?.playground.spinImageUrl && (
                                <button
                                  className="button button-secondary px-3 border-0 text-muted"
                                  onClick={() => handleDeleteImage(formData.id)}
                                >
                                  <i class="fa-solid fa-trash"></i>
                                </button>
                              )}
                              <div onClick={() => handleToggleState()}>More Option</div>

                            </div>

                          </div>

                        </div>
                        {console.log(showoptions, "showoptions")}
                        {showoptions && <>

                          <div className="mb-2">
                            <label className="form-label">Image disclaimer</label>
                            <textarea
                              className="form-control theme-control"
                              {...register(`sectors.${index}.imageDisclaimer`)}
                            ></textarea>
                          </div>

                          <div className="mb-2">
                            <label className="form-label">Button text</label>
                            <textarea
                              className="form-control theme-control"
                              {...register(`sectors.${index}.buttonText`)}
                            ></textarea>
                          </div>

                          <div className="mb-2">
                            <label className="form-label">Link</label>
                            <textarea
                              className="form-control theme-control"
                              {...register(`sectors.${index}.link`)}
                            ></textarea>
                          </div>
                        </>

                        }
                      </div>

                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}




        </div>

      </div>
    </>
  );
}

export default SectionsList;


// 
{/* <Controller
  name={`sectors.${index}.probabilityOfWinning`}
  control={control}
  render={({ field }) => (
    <Select
      {...field}
      options={questsLength}
      defaultValue={questsLength.find(
        (opt) => opt.value === question.probabilityOfWinning
      )}
      onChange={(e) => {
        field.onChange(e.value);
        handleSelectChange(e, question.id); // ✅ Update Redux
      }}
      className="theme-select"
      classNamePrefix="react-select"
    />
  )}
/>
{errors?.sectors?.[index]?.probabilityOfWinning && (
  <p className="text-danger small mt-1">
    {errors?.sectors?.[index]?.probabilityOfWinning?.message}
  </p>
)} */}
