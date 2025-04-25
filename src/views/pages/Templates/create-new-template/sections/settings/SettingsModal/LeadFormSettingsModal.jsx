import React, { useEffect, useState } from "react";
import QuestionsScreen from "./SettingsComponent/QuestionsScreen";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { updateTemplateAction } from "views/pages/Templates/TemplateRedux/actions/drawerAction";
import { generateShortId } from "utils/helpers";
import Quests from "./SettingsComponent/Quests";
import ResultScreen from "./SettingsComponent/ResultScreen";
import CardsRank from "./SettingsComponent/CardsRank";
import RankBattlePreview from "views/pages/Templates/Preview/PreviewBlocks/RankBattle";
import { fields, inputTypes } from "views/pages/Templates/constant";
import { Link } from "react-router-dom";

function LeadFormModal({
  selecteScreen,
  setSelectScreen,
  formData,
  handleChangeLogo,
  setIsOpenFormModal
}) {
  const [checkedFields, setCheckedFields] = useState([]);
  const [leadformModel, setleadFormModel] = useState({})
  const [newFieldsArray, setNewFieldsArray] = useState([]);
  const [finalResult, setfinalResult] = useState({})
  const [errorScreen, setErrorScreen] = useState(false);
  const [triggerNext, setTriggerNext] = useState(false);
  const [selectedType, setSelectedType] = useState("");


  const { templateDetails } = useSelector((state) => state.DrawerReducer);
  console.log(formData, "cehckTemplateDetailks");
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1200,
    backgroundColor: "#fff",
    boxShadow: 24,
    borderRadius: "12px",
    p: 4,
  };
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({
    header: false,
    buttonText: false,
    finalResultHeader: false,
    headerWordCount: false,
    buttonTextWordCount: false
  });
  useEffect(() => {
    // Initialize checked fields based on the fields data
    const checkedLabels = formData?.struct?.form?.fields.map(
      (field) => field.id
    );
    setCheckedFields(checkedLabels);
  }, [formData]

  );
  console.log(checkedFields, "finalResult")
  console.log(finalResult.headerText, "leadformModel")
  const validateForm = () => {
    const newErrors = {
      // header: !leadformModel.coverHeader?.trim(),
      // headerWordCount: !isValidWordCount(leadformModel.coverHeader),

      buttonText: !leadformModel.buttonText, // check if buttonText is empty
      buttonTextWordCount: !isValidWordCount(leadformModel.buttonText),

      finalResultHeader: !finalResult.headerText?.trim(),
      finalResultHeaderWordCount: !isValidWordCount(finalResult.headerText),
    };

    setErrors(newErrors);

    return !newErrors.header && !newErrors.buttonText && !newErrors.finalResultHeader &&
      !newErrors.headerWordCount && !newErrors.buttonTextWordCount && !newErrors.finalResultHeaderWordCount;
  };
  { console.log(errors, "sqsqsqs") }
  // const validateForm = () => {
  //   const newErrors = {

  //     header: !leadformModel.coverHeader?.trim(),
  //     headerWordCount: !isValidWordCount(leadformModel.coverHeader),

  //     buttonText: !leadformModel.buttonText?.trim(),
  //     buttonTextWordCount: !isValidWordCount(leadformModel.buttonText),

  //     finalResultHeader: !finalResult.header?.trim(),
  //     finalResultHeaderWordCount: !isValidWordCount(finalResult.header),
  //   };

  //   setErrors(newErrors);

  //   return !newErrors.header && !newErrors.buttonText && !newErrors.finalResultHeader &&
  //     !newErrors.headerWordCount && !newErrors.buttonTextWordCount && !newErrors.finalResultHeaderWordCount;
  // };
  const isValidWordCount = (text) => {
    console.log(text, "09485");

    // Ensure text is a valid string before calling trim
    if (typeof text !== 'string') {
      return false;  // Return false if the text is not a string
    }

    // Remove leading/trailing spaces and collapse multiple spaces between words
    const trimmedText = text.trim().replace(/\s+/g, ' ');

    // Split the text into an array of words
    const wordCount = trimmedText.split(' ').length;

    console.log(trimmedText, "trimmed text");  // Debug the trimmed text
    console.log(wordCount, "word count"); // Log the word count to verify

    // Return true if the word count is less than or equal to 20
    return wordCount <= 20 && wordCount > 0;  // Ensure that word count is greater than 0
  };
  console.log(checkedFields, "checkedFields")
  const handleCheckboxChange = (e, id, label) => {
    const isChecked = e.target.checked;

    setCheckedFields((prev) =>
      isChecked ? [...prev, id] : prev.filter((item) => item !== id)
    );

    // Optionally, you can update the label object to reflect the new state (if needed)
    setNewFieldsArray((prevFields) =>
      prevFields.map((item) =>
        item.id === id ? { ...item, checked: isChecked } : item
      )
    );
  };




  const handleAddItem = () => {
    const addInputField = {
      id: generateShortId(),
      key: "new",
      type: "text",
      label: "New",
      isRequired: true,
      initialValue: "New",
    };

    setNewFieldsArray((prev) => [...prev, addInputField]);

    // ✅ Also add it to checkedFields
    setCheckedFields((prev) => [...prev, addInputField.id]);
  };

  useEffect(() => {
    if (inputTypes.length > 0) {
      // Default to the first option in inputTypes if no selection
      setSelectedType({
        value: inputTypes[0].value,
        label: inputTypes[0].label,
      });
    }
  }, [inputTypes]);
  const allSelectableFields = [...fields, ...newFieldsArray];

  const handleSelectChange = (selectedOption, id) => {
    console.log(selectedOption, "checkokornot");

    // Save selected type (if needed elsewhere)
    setSelectedType(selectedOption);

    // Update field's type by ID
    setNewFieldsArray((prevFieldsArray) =>
      prevFieldsArray.map((item) =>
        item.id === id ? { ...item, type: selectedOption?.value } : item
      )
    );
  };


  // const handleSelectChange = (selectedOption, id) => {
  //   console.log(selectedOption, "checkokornot");
  //   setSelectedType(selectedOption);
  //   setNewFieldsArray((prevFieldsArray) =>
  //     prevFieldsArray.map((item) =>
  //       item.id === id ? { ...item, type: selectedOption.value } : item
  //     )
  //   );
  //   const _data = {
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
  //                 form: {
  //                   ...block.struct.form,
  //                   fields: block.struct.form.fields.map((field) =>
  //                     field.id === id
  //                       ? {
  //                         ...field,
  //                         type: selectedOption.value,
  //                       }
  //                       : field
  //                   ),
  //                 },
  //               },
  //             }
  //             : block
  //         ),
  //       })),
  //     },
  //   };
  //   dispatch(updateTemplateAction(_data));
  // };

  // const handleInputFieldChange = (e, id) => {
  //   setNewFieldsArray((prevFieldsArray) =>
  //     prevFieldsArray.map((item) =>
  //       item.id === id ? { ...item, initialValue: e, label: e, key: e } : item
  //     )
  //   );
  //   const _data = {
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
  //                 form: {
  //                   ...block.struct.form,
  //                   fields: block.struct.form.fields.map((field) =>
  //                     field.id === id
  //                       ? {
  //                         ...field,
  //                         initialValue: e,
  //                         label: e,
  //                         key: e,
  //                       }
  //                       : field
  //                   ),
  //                 },
  //               },
  //             }
  //             : block
  //         ),
  //       })),
  //     },
  //   };
  //   dispatch(updateTemplateAction(_data));
  // };
  const handleInputFieldChange = (value, id) => {
    setNewFieldsArray((prevFieldsArray) =>
      prevFieldsArray.map((item) =>
        item.id === id
          ? {
            ...item,
            initialValue: value,
            label: value,
            key: value,
          }
          : item
      )
    );
  };

  const handleheaderText = (value) => {

    const newValue = value;
    setleadFormModel((prev) => ({
      ...prev,
      headerText: newValue
    }));
  };
  const handleDescriptionText = (value) => {
    const newValue = value;
    setleadFormModel((prev) => ({
      ...prev,
      descriptionText: newValue
    }));

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
    //               ...block.struct,
    //               form: {
    //                 ...block.struct.form,
    //                 descriptionText: e,
    //               },
    //             },
    //           }
    //           : block
    //       ),
    //     })),
    //   },
    // };
    // dispatch(updateTemplateAction(updatedData));
  };


  const handleDButtonText = (value) => {
    const newValue = value.trim();  // Make sure to trim whitespace

    setleadFormModel((prev) => ({
      ...prev,
      buttonText: newValue,
    }));

    setErrors((prev) => ({
      ...prev,
      buttonText: false,  // Reset error for button text
      buttonTextWordCount: false,  // Reset error for word count
    }));

    console.log(newValue, "Button Text");

    validateForm();  // Trigger validation after setting the new value
  };

  const handleAddLink = (value) => {

    const newValue = value;
    setleadFormModel((prev) => ({
      ...prev,
      linkPrivacyPolicyLink: newValue
    }));
  };

  const handleChangeAdditionalText = (value) => {
    // addtionalText
    const newValue = value;
    setleadFormModel((prev) => ({
      ...prev,
      addtionalText: newValue
    }));
  };
  const handleDeleteItem = (id) => {
    // Remove the item from the local array only
    setNewFieldsArray((prevFieldsArray) =>
      prevFieldsArray.filter((item) => item.id !== id)
    );
  };

  // const handleDeleteItem = (id) => {
  //   setNewFieldsArray((prevFieldsArray) =>
  //     prevFieldsArray.filter((item) => item.id !== id)
  //   );

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
  //                 form: {
  //                   ...block.struct.form,
  //                   fields: block.struct.form.fields.filter(
  //                     (field) => field.id !== id
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
  console.log(errors, "axaxaax")
  const hanldleSaveLeadForm = () => {
    console.log("object")
    if (!validateForm()) {
      return;
    } else {
      console.log("INELSLSSLL")
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
                    // playground: {
                    //   ...block.struct.playground,
                    //   ...puzzle
                    // },
                    form: {
                      ...block.struct.form,
                      ...leadformModel
                    },
                    final: {
                      ...block.struct.final,
                      ...finalResult
                    },
                  },
                }
                : block
            ),
          })),
        },
      };
      console.log(updatedData, "updatedData")
      dispatch(updateTemplateAction(updatedData));
      setIsOpenFormModal(false)

    }
  }
  const handleDeleteImage = (cardId) => {
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
                  form: {
                    ...block.struct.form,
                    logoImage: "",
                  },
                },
              }
              : block
          ),
        })),
      },
    };

    dispatch(updateTemplateAction(updatedData));
  };
  console.log(formData?.struct?.form, "cehchccchformdTAaa");
  useEffect(() => {
    if (formData) {
      console.log(formData?.struct, "rerendereddddd");
      setfinalResult(formData?.struct?.final)
      setleadFormModel(formData?.struct?.form);
    }
  }, [formData]);
  console.log(leadformModel, "kjijii")
  const allFields = [...fields, ...newFieldsArray];
  return (
    <>
      <div className="form-option-wrap">
        <div className="form-start">
          <div className="optionsEditScreen">
            <div
              className={`options-settings ${selecteScreen === "start-screen" ? "activeTab" : ""}`}
              role="button"
              onClick={() => setSelectScreen("start-screen")}
            >
              <i class="fa-solid fa-desktop"></i>
              <p>Form</p>
            </div>
            <div
              className={`options-settings ${selecteScreen === "quests" ? "activeTab" : ""}`}
              role="button"
              onClick={() => setSelectScreen("final-screen")}
            >
              <i class="fa-solid fa-circle-question"></i>
              <p>Final Screen</p>
            </div>
          </div>
        </div>

        {selecteScreen === "start-screen" && (
          <>
            <div className="form-option-wrap">
              <div className="form-left">
                <div className="fields-output">
                  <h4 className="mb-4">Form fields</h4>
                  <div className="formFieldsList">
                    <div className="row gy-3 gx-4 mb-3">
                      {allSelectableFields.map((label, index) => (
                        <div className="col-md-4 d-flex gap-2" key={label.id}>
                          <label htmlFor={`field-${label.id}`} className="form-label font-sm fw-medium d-flex align-items-center gap-1 cursor-pointer mb-0">
                            <input
                              id={`field-${label.id}`}
                              type="checkbox"
                              className="form-check-input theme-control shadow-none m-0"
                              checked={checkedFields.includes(label.id)}
                              onChange={(e) => handleCheckboxChange(e, label.id, label)}
                            />
                            {label.label}
                          </label>
                        </div>
                      ))}

                    </div>
                    <div className="newFieldsArray">
                      {newFieldsArray.length > 0 &&
                        newFieldsArray.map((type, index) => (
                          <div className="fieldstype d-flex align-items-center justify-content-center mb-3">
                            <div className="selectBox_input w-100">
                              <label className="form-label font-sm fw-medium d-flex align-items-center gap-1 cursor-pointer">Field type</label>
                              <Select
                                key={index}
                                className="theme-select"
                                classNamePrefix="react-select"
                                defaultChecked={type.type}
                                onChange={(selected) =>
                                  handleSelectChange(selected, type.id)
                                }
                                options={inputTypes}
                                placeholder="Select input type"
                              />
                            </div>
                            <div className="input_field  w-100">
                              <label className="form-label font-sm fw-medium d-flex align-items-center gap-1 cursor-pointer">Field Name <span style={{ color: 'red' }}>*</span></label>
                              <input
                                type="text"
                                className="form-control theme-control"
                                defaultValue={type.initialValue}
                                onChange={(e) =>
                                  handleInputFieldChange(e.target.value, type.id)
                                }
                              />
                            </div>
                            <div className="deleteField">
                              <label htmlFor="" className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">&nbsp;</label>
                              <button
                                className="button button-secondary px-3 border-0"
                                onClick={() => handleDeleteItem(type.id)}
                              >
                                <i className="fa-solid fa-trash text-danger"></i>
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                    <div className="addFieldsButton mb-4">
                      <button
                        onClick={handleAddItem}
                        className="bg-transparent p-0 border-0 primary-text font-sm"
                      >
                        <i className="fa-solid fa-plus"></i> Add field
                      </button>
                    </div>
                    <div className="additionalInfo">
                      <h4 className="mb-3">Additional information</h4>

                      <div className="addInfoDetails">
                        <label className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                          Logo
                        </label>
                        <div className="d-flex align-items-start">
                          <div className="mb-3">
                            <div className="d-flex gap-2">
                              {formData?.struct?.form?.logoImage && (
                                <img
                                  src={formData?.struct?.form?.logoImage}
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
                                onClick={() => handleChangeLogo("formImage", formData?.id)}
                              >
                                {formData?.struct?.form?.logoImage
                                  ? "Change"
                                  : "Upload"}
                              </button>
                              {formData?.struct?.form?.logoImage && (
                                <button
                                  className="button button-secondary px-3 border-0 text-muted"
                                  onClick={() => handleDeleteImage(formData.id)}
                                >
                                  <i class="fa-solid fa-trash"></i>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="fields_info">
                          <div className="mb-3">
                            <label
                              className="form-label font-sm fw-medium d-flex align-items-center gap-1 cursor-pointer"
                              role="button"
                            >Header
                            </label>
                            <input
                              className="form-control theme-control"
                              type="text"
                              defaultValue={
                                leadformModel
                                  ?.headerText
                              }
                              onChange={(e) =>
                                handleheaderText(e.target.value)
                              }
                            />
                          </div>

                          <div className="mb-3">
                            <label
                              className="form-label font-sm fw-medium d-flex align-items-center gap-1 cursor-pointer"
                              role="button"
                            >Description
                            </label>
                            <textarea
                              className="form-control theme-control"
                              defaultValue={
                                leadformModel
                                  ?.descriptionText
                              }
                              onChange={(e) =>
                                handleDescriptionText(e.target.value)
                              }
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              className="form-label font-sm fw-medium d-flex align-items-center gap-1 cursor-pointer"
                              role="button"
                            >Button text <span style={{ color: 'red' }}>*</span>
                            </label>
                            <input
                              className={`form-control theme-control ${errors.buttonText || errors.buttonTextWordCount ? 'is-invalid' : ''}`}
                              defaultValue={
                                leadformModel
                                  ?.buttonText
                              }
                              onChange={(e) =>
                                handleDButtonText(e.target.value)
                              }
                            />
                            {errors.buttonText && <div className="invalid-feedback">Button text is required.</div>}
                            {errors.buttonTextWordCount && <div className="invalid-feedback">Must be No more than 20 characters .</div>}
                          </div>

                          <div className="mb-3">
                            <label
                              className="form-label font-sm fw-medium d-flex align-items-center gap-1 cursor-pointer"
                              role="button"
                            >Link to your privacy policy
                            </label>
                            <input
                              className="form-control theme-control"
                              defaultValue={
                                leadformModel
                                  ?.linkPrivacyPolicyLink
                              }
                              onChange={(e) =>
                                handleAddLink(e.target.value)
                              }
                            />
                          </div>
                          <div className="">
                            <label
                              className="form-label font-sm fw-medium d-flex align-items-center gap-1 cursor-pointer"
                              role="button"
                            >Any additional notes
                            </label>
                            <textarea
                              className="colorInput form-control theme-control"
                              defaultValue={
                                leadformModel?.addtionalText
                              }
                              onChange={(e) =>
                                handleChangeAdditionalText(e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-right scrollable-div border-start p-4">
                <h5>Approximate preview</h5>
                {console.log(finalResult, "SSSS")}
                <div className="formPreview">
                  {/* Display logo if available */}
                  {formData?.struct?.form?.logoImage && (
                    <img
                      src={formData?.struct?.form?.logoImage}
                      alt="logo"
                      className="previewLogo"
                    />
                  )}

                  {/* Display header text */}
                  <h4 className="text-center">{leadformModel?.headerText}</h4>

                  {/* Display description text */}
                  <p className="text-center">{leadformModel?.descriptionText}</p>

                  {/* Preview the checked fields */}
                  {/* <div className="fields-preview mb-4">
                    <h5>Selected Fields:</h5>
                    {checkedFields?.length > 0 ? (
                      checkedFields.map((fieldId) => {
                        const field = newFieldsArray.find(f => f.id === fieldId);
                        if (!field) return null;

                        return (
                          <label className="form-label font-sm w-100" role="button" key={field?.id}>
                            <div>
                              {field?.type !== "checkbox" && <p>{field?.label}</p>}
                              <div>
                                {field?.type === "checkbox" && (
                                  <div className="d-flex align-items-center">
                                    <input
                                      id={field?.id}
                                      type="checkbox"
                                      className="checkbox"
                                      checked={checkedFields.includes(field?.id)} // Check if the field is checked
                                      onChange={(e) => handleCheckboxChange(e, field?.id, field)} // Handle checkbox change
                                    />
                                    <label htmlFor={field?.id} className="m-1 user-select-none" role="button">
                                      {field?.label}
                                    </label>
                                  </div>
                                )}
                                {field?.type === "text_area" && <textarea className="w-100 form-control" />}
                                {field?.type === "text" && <input className="form-control theme-control" type="text" />}
                                {field?.type === "email" && <input className="form-control theme-control" type="email" />}
                                {field?.type === "phone" && <input className="form-control theme-control" type="number" />}
                              </div>
                            </div>
                          </label>
                        );
                      })
                    ) : (
                      <p>No fields selected yet.</p>
                    )}
                  </div> */}

                  {/* Additional preview fields */}
                  <div className="fields-preview mb-4">
                    {/* <h5>Selected Fields:</h5> */}
                    {checkedFields.length > 0 ? (
                      checkedFields.map((fieldId) => {
                        const field = allFields.find(f => f.id === fieldId);
                        if (!field) return null;

                        return (
                          <label className="form-label font-sm w-100" role="button" key={field.id}>
                            <div>
                              {field.type !== "checkbox" && <p>{field.label}</p>}
                              <div>
                                {field.type === "checkbox" && (
                                  <div className="d-flex align-items-center">
                                    <input
                                      id={field.id}
                                      type="checkbox"
                                      className="checkbox"
                                      checked
                                      readOnly // Just for preview; no change handler needed
                                    />
                                    <label htmlFor={field.id} className="m-1 user-select-none" role="button">
                                      {field.label}
                                    </label>
                                  </div>
                                )}
                                {field.type === "text_area" && <textarea className="w-100 form-control" />}
                                {field.type === "text" && <input className="form-control theme-control" type="text" />}
                                {field.type === "email" && <input className="form-control theme-control" type="email" />}
                                {field.type === "number" && <input className="form-control theme-control" type="number" />}
                              </div>
                            </div>
                          </label>
                        );
                      })
                    ) : (
                      <p>No fields selected yet.</p>
                    )}
                  </div>


                  {/* Submit button */}
                  <div className="submitpreview">
                    {leadformModel?.linkPrivacyPolicyLink && (
                      <div className="termsForm text-center">
                        <input id="terms" type="checkbox" />
                        <label htmlFor="terms" className="ps-2">
                          I Agree with{" "}
                          <Link to={leadformModel?.linkPrivacyPolicyLink}>
                            Privacy Policy
                          </Link>
                        </label>
                      </div>
                    )}
                    {leadformModel?.addtionalText && <p>{leadformModel.addtionalText}</p>}

                    <div className="text-center m-2">
                      <button
                        className="btn py-2 w-50"
                        style={{
                          backgroundColor: `${formData?.struct?.colorTheme && formData?.struct?.colorTheme}`,
                          color: "#fff",
                        }}
                      >
                        {leadformModel?.buttonText || "Submit"}
                      </button>
                    </div>
                  </div>
                </div>


              </div>
            </div>
          </>
        )}

        {selecteScreen === "final-screen" && (
          <ResultScreen
            setParentErros={setErrors}
            finalResult={finalResult}
            setfinalResult={setfinalResult}
            setTriggerNext={setTriggerNext}
            setErrorScreen={setErrorScreen}
            parenterror={errors}
            formData={formData}
            questions={formData?.struct?.questions}
            handleChangeImage={handleChangeLogo}
          />
        )}
      </div> <ul className="Footer_footer__bMDNk">

        <li className="Footer_footerItem__yaFNE">
          <button
            onClick={hanldleSaveLeadForm}
            className="button button-primary px-3 text-decoration-none"
          >
            Save
          </button>
        </li>
      </ul></>
  );
}

export default LeadFormModal;
