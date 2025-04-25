import CustomModal from "components/Models";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";
import { fields, inputTypes } from "../../constant";
import Select from "react-select";
import { generateShortId } from "utils/helpers";
import { updateTemplateAction } from "../../TemplateRedux/actions/drawerAction";
import { Switch } from "@mui/material";
import { color } from "framer-motion";
import { height } from "@mui/system";
import { template } from "lodash";
import MailchimpConnectButton from "../../Integration/MailChimp";
// import { Select, MenuItem } from "@mui/material";
function FormModal({
  IsOpenFormModal,
  setIsOpenFormModal,
  formData,
  selectedPage,
  handleChangeLogo,
}) {
  const [checkedFields, setCheckedFields] = useState([]);
  const [newFieldsArray, setNewFieldsArray] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [customModel, setShowCustomModel] = useState(false);
  const [buttonTextError, setButtonTextError] = useState(false);

  const [formModel, setFormModel] = useState({});
  const { templateDetails } = useSelector((state) => state.DrawerReducer);
  const label = { inputProps: { "aria-label": "Switch demo" } };
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

  useEffect(() => {
    // Initialize checked fields based on the fields data
    const checkedLabels = formData?.struct?.leadFormStruct?.form?.fields.map(
      (field) => field.id
    );
    setCheckedFields(checkedLabels);
  }, [formData]);

  const handleCheckboxChange = (e, label, data) => {
    setCheckedFields((prevCheckedFields) => {
      if (prevCheckedFields?.includes(label)) {
        return prevCheckedFields?.filter((item) => item !== label);
      } else {
        return [...prevCheckedFields, label];
      }
    });

    const _data = {
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
                  leadFormStruct: {
                    ...block?.struct?.leadFormStruct,
                    form: {
                      ...block.struct.leadFormStruct.form,
                      fields: e.target.checked
                        ? [...block?.struct.leadFormStruct.form.fields, data]
                        : block.struct.leadFormStruct.form.fields.filter(
                          (field) => field.id !== data?.id
                        ),
                    },
                  },
                },
              }
              : block
          ),
        })),
      },
    };
    dispatch(updateTemplateAction(_data));
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
    setNewFieldsArray([...newFieldsArray, addInputField]);

    const _data = {
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
                  leadFormStruct: {
                    ...block.struct.leadFormStruct,
                    form: {
                      ...block.struct.leadFormStruct.form,
                      fields: [
                        ...block.struct.leadFormStruct.form.fields,
                        addInputField,
                      ],
                    },
                  },
                },
              }
              : block
          ),
        })),
      },
    };

    dispatch(updateTemplateAction(_data));
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

  const handleSelectChange = (selectedOption, id) => {
    console.log(selectedOption, "checkokornot");
    setSelectedType(selectedOption);
    setNewFieldsArray((prevFieldsArray) =>
      prevFieldsArray.map((item) =>
        item.id === id ? { ...item, type: selectedOption.value } : item
      )
    );
    const _data = {
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
                  leadFormStruct: {
                    ...block.struct.leadFormStruct,
                    form: {
                      ...block.struct.leadFormStruct.form,
                      fields: block.struct.leadFormStruct.form.fields.map(
                        (field) =>
                          field.id === id
                            ? {
                              ...field,
                              type: selectedOption.value,
                            }
                            : field
                      ),
                    },
                  },
                },
              }
              : block
          ),
        })),
      },
    };
    dispatch(updateTemplateAction(_data));
  };
  const toggleModal = () => {
    setShowCustomModel((prev) => !prev); // Toggling the state
  };
  const handleInputFieldChange = (e, id) => {
    setNewFieldsArray((prevFieldsArray) =>
      prevFieldsArray.map((item) =>
        item.id === id ? { ...item, initialValue: e, label: e, key: e } : item
      )
    );
  };

  const handleheaderText = (e) => {
    const value = e;
    console.log("CALLING");
    setFormModel((prev) => ({
      ...prev,
      headerText: value,
    }));
  };
  console.log(formData, "formData");
  const handleDescriptionText = (e) => {
    const value = e;
    console.log("CALLING");
    setFormModel((prev) => ({
      ...prev,
      descriptionText: value,
    }));
  };

  const handleDButtonText = (e) => {
    const value = e;
    console.log(!value.trim(), "ioioiioiio");
    setButtonTextError(!value.trim());
    setFormModel((prev) => ({
      ...prev,
      buttonText: value,
    }));
  };

  const handleAddLink = (e) => {
    const value = e;
    console.log(value, "dwdwdwd");
    // setButtonTextError(!value.trim())
    setFormModel((prev) => ({
      ...prev,
      linkPrivacyPolicyLink: value,
    }));
  };

  const handleChangeAdditionalText = (e) => {
    const value = e;
    // setButtonTextError(!value.trim())
    setFormModel((prev) => ({
      ...prev,
      addtionalText: value,
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
    //               leadFormStruct: {
    //                 ...block.struct.leadFormStruct,
    //                 form: {
    //                   ...block.struct.leadFormStruct.form,
    //                   addtionalText: e,
    //                 },
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

  const handleDeleteItem = (id) => {
    setNewFieldsArray((prevFieldsArray) =>
      prevFieldsArray.filter((item) => item.id !== id)
    );

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
    //               leadFormStruct: {
    //                 ...block.struct.leadFormStruct,
    //                 form: {
    //                   ...block.struct.leadFormStruct.form,
    //                   fields: block.struct.leadFormStruct.form.fields.filter(
    //                     (field) => field.id !== id
    //                   ),
    //                 },
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
  const handleSave = () => {
    if (!formModel?.buttonText?.trim()) {
      setButtonTextError(true);
      return;
    }
    console.log(formModel, "formModelformModel");
    console.log(templateDetails, "templateDetails");
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
                  leadFormStruct: {
                    ...block.struct.leadFormStruct,
                    form: {
                      ...formModel,
                    },
                  },
                },
              }
              : block
          ),
        })),
      },
    };

    dispatch(updateTemplateAction(updatedData));
    setIsOpenFormModal(false);
  };
  console.log(formData, "formData");
  useEffect(() => {
    if (formData) {
      console.log(formData, "rerendereddddd");

      setFormModel(formData?.struct?.leadFormStruct?.form);
    }
  }, [formData, IsOpenFormModal]);
  console.log(formData?.struct, "cnewenwlnlkwndksndlnsds");

  return (
    <>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={IsOpenFormModal}
        onClose={() => setIsOpenFormModal(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
      >
        <div style={style}>
          <div className="modal-form">
            <div className="modal-header-form">
              <h3>Form options</h3>
              <button
                className="btn text-white"
                style={{ fontSize: "30px" }}
                onClick={() => setIsOpenFormModal(false)}
              >
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="modal-form-body">
              <div className="form-option-wrap">
                <div className="form-left">
                  <div className="fields-output">
                    <h4 className="mb-3">Form fields</h4>
                    <div className="formFieldsList">
                      <div className="row gy-3 gx-4 mb-3">
                        {fields.map((label, index) => (
                          <div className="col-md-4 d-flex gap-2" key={index}>
                            <label
                              htmlFor={`field-${label.id}`}
                              className="form-label font-sm fw-medium d-flex align-items-center gap-1 cursor-pointer mb-0"
                            >
                              <input
                                id={`field-${label.id}`}
                                className="form-check-input theme-control shadow-none m-0"
                                type="checkbox"
                                defaultChecked={checkedFields?.includes(
                                  label.id
                                )}
                                onChange={(e) =>
                                  handleCheckboxChange(e, label.id, label)
                                }
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
                                <label className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                                  Field type
                                </label>
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
                                <label className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                                  Field Name
                                </label>
                                <input
                                  type="text"
                                  className="form-control theme-control"
                                  defaultValue={type.initialValue}
                                  onChange={(e) =>
                                    handleInputFieldChange(
                                      e.target.value,
                                      type.id
                                    )
                                  }
                                />
                              </div>
                              <div className="deleteField">
                                <label
                                  htmlFor=""
                                  className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer"
                                >
                                  &nbsp;
                                </label>
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
                          <button
                            className="button button-primary border-0 mb-3"
                            onClick={() =>
                              handleChangeLogo("formImage", formData?.id)
                            }
                          >
                            Change
                          </button>

                          <div className="fields_info">
                            <div className="mb-3">
                              <label
                                className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer"
                                role="button"
                              >
                                Header
                              </label>
                              {console.log(
                                formModel?.headerText,
                                "formModel?.headerText"
                              )}
                              <input
                                className=" form-control theme-control"
                                type="text"
                                defaultValue={formModel?.headerText}
                                onChange={(e) =>
                                  handleheaderText(e.target.value)
                                }
                              />
                            </div>

                            <div className="mb-3">
                              <label
                                className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer"
                                role="button"
                              >
                                Description
                              </label>
                              <textarea
                                className="form-control theme-control"
                                defaultValue={formModel?.descriptionText}
                                onChange={(e) =>
                                  handleDescriptionText(e.target.value)
                                }
                              />
                            </div>

                            <div className="mb-3">
                              <label
                                className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer"
                                role="button"
                              >
                                Button text{" "}
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                className={`form-control theme-control ${buttonTextError ? "is-invalid" : ""}`}
                                defaultValue={formModel?.buttonText}
                                onChange={(e) =>
                                  handleDButtonText(e.target.value)
                                }
                              />
                              {console.log(buttonTextError, "sasasa")}
                              {buttonTextError && (
                                <div className="invalid-feedback">
                                  Button text is required.
                                </div>
                              )}
                            </div>

                            <div className="mb-3">
                              <label
                                className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer"
                                role="button"
                              >
                                Link to your privacy policy
                              </label>
                              {console.log(formModel, "formModel")}
                              <input
                                className="form-control theme-control"
                                value={formModel?.linkPrivacyPolicyLink}
                                onChange={(e) => handleAddLink(e.target.value)}
                              />
                            </div>

                            <div className="mb-3">
                              {console.log(formModel, "iopioii")}
                              <label
                                className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer"
                                role="button"
                              >
                                Any additional notes
                              </label>
                              <textarea
                                className="colorInput form-control theme-control"
                                defaultValue={formModel?.addtionalText}
                                onChange={(e) =>
                                  handleChangeAdditionalText(e.target.value)
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/*  */}
                      <h3 className="">Integrations</h3>
                      <div className="maindiv">
                        <div className="MailChimpIntegrations_MailchimpIntegrations__vUrTG">
                          <div className="MailChimpIntegrations_group__PxJ26">
                            <img
                              src="data:image/png;base64,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"
                              alt=""
                            />
                            <p> MailChimp</p>
                          </div>
                          <div className="MailChimpIntegrations_group__PxJ26">
                            <Switch {...label} defaultChecked />
                            <p>status</p>:<p>Inactive</p>
                          </div>
                          {/* <button  className="button button-primary px-3 text-decoration-none">
                            Set up 
                          </button> */}
                          <MailchimpConnectButton />
                        </div>
                        {/* below is webhook */}
                      </div>
                      <div className="MailChimpIntegrations_MailchimpIntegrations__vUrTG">
                        <div className="MailChimpIntegrations_group__PxJ26">
                          <img
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAdFSURBVHgB7VkJcFNVFD0/yU/SJm3TDVBAoeKCWwEpm+w7CmVQR2QQLJsyCBRGGBeQVZERhl1BEZBVB8qOIEtBGRaHfZF9aVkKpWtI0qRp8v/3vge0JJM0aVmGznhmOpNpfvLPv/fce899EUBQ0qrUgKBeRC/r0J8JTxyUdVDk4ULNzHThLtmjeCKJesAMRaqrgqCZjiefLIOJqUBQ0qsqqDgwq1CxYKpohFHhCGvwgFCoAvYfcWLpGgdOnnVBIwL93jegZ7dQqATvi+lPwAOh/ITp5qcvujF2ugUHjhehfTMdhvQxwmqTMW6GBW63gu5dQnH8jAvrtjmw73ARMjJlhOiBJm9oMTY5HNWeUqOsKHeXSNlciOTxZnRurce44WF4qlLJzQ+dKELigFzEmNT497yLZ8EbdV4WkboiBlFlLKOyR5hu/uUUC5atsWP5zEi0bKTzePvyVTfGUNQzs2TcvCX7/Zpjp124kiE9WsI2u4yx06zYc6gI25ZFo3Ytsfg9SVawcpMDI76x4EaWFPC7dFoBhtCyC7pMj/f9PBu27nZi9dwoD7K3rTIGfmVG7+Fm6Cjg4WEqtG2qw6e9DVD7uUO9V0XEPfMINTx5rhXL19mxdWkMnr5Pr7dyZHTpm4ODJ1wY1teIYf2MOEW6FSh4GZkS0q9LOEHdY+c+Jwrsd27FuscO0m+rxjqUFUFJ4uQ5Fxb8XoCUedEeZC9dcaNz3zxcu+EmogZe9e98kouL6W5YbCVxYARV6pL0J9ODeWv/oRHOzpPRfXA+Zo03Ib52iQxY9Lp9nIezl1yoWkWNxSkO5N/2XWQkb8juu9Elibz2ksgzUB4E1PDUn62oVlmNji30xf9jbWrgKDOP/D3y/sjeQ3WK/sIpkRjykQGT5lghy+XzXKVG+NR5NxatslNHiPGIyBR6iE2phT4/I2oEdGqto+GgQ16+xAfJC3EieiSGonKMCmaLHhtTs3H4pAsJ8Vo8VMILVxbg7VZ6xL9UIoW0a27MXGjzeT17qDkTIjCgh8Fnyh2FCiKMAqpXUfEenBCPh0eYpf23DWw4RHncfM7iAtzwMxBejNP4Jcsw7RcbXSMiIlwFu6N8kvCr4bRrEjSU3vsLjUXl1xS7v4+gUV1tMdlCp4KbbIDcx0tDnSJ1byHv08xjnLvke2yXBr8Rdrpk3vTFu1fcpFH745IC5Jn9F1dm9p33btySMHW+DbKk0HDQYHCSkbe2Qb0MZJhccLkUjJ9pRaekPDRtoMWMryOCHtF+r4qrpuFPvynViYPkxhISs6hYHGhON9DrfOd890En0jPc3AiNGRqGZ6tqUIkKjZE9dspFGpaxYr0dTRN02E6FvG1pNBwkjYmzrAgWpU66A8dd6JmchyyaZqyYEtvpkU8R1hHht5JyuYHxRouGOqyeF4XoSM9YpO514pmn1XiuhsbDJ2/Y4eAjf09KLIJBqXloEC+iz3sGbgVbNdGh17B89BmZj71kfiaNDOfEvbH7gBMbiYQ32rypw/M1PcmySTlpto3742ARcNKl09ht0UiLs2TWZ08w0RiWuCEfkxyGyHCBdOuZIDZyuyeG+P0+JrMM0jjzJZt3FaJhPZGKT4Kb9K5RBx5/AQkbQgRucJj7YthH0W3fXA+tKPAu4o3PBhgRolPhfJqbyyA2SgUtBdBiVXCFjBBbp3LyFXRsqUfK3GiEGQQ81/wWfqB2yTxGIAQsza5tQ7Bmi6O4OzSm9P1ztAhpVyXctnh2DBahdrQqSdTNPiT5sC5zM1ui7EhkhmS8+qKIORMjsX9tLMYNC+MPw0b0lsXRWLnZQa8REAEJN2uo5cXGVh6muaqVVRiaZMC0BTZYCzzlYIoQeOSZ0Wcd4QK5NtbiGClDiAoNqE/XqKaGREaISWzpWjsZ/zvRN+gFCEF0toCSYFGaOc6Ez7+zoH6XLNSqIZJHkHGZRrQ3bGQpmRbDjCqKtB52shtJ74ZwN8e25TRan9b+WcR9RO1aGjJCRl64m3c5uKEPxsCVaQllriyVjPig0eZiM+6NrUuiucaZGWO9d+1WB5dFKEWwZnUNGtbRov7rIs8EA9sBX+uQhQPrY/HKC2JADuXamoeONWM2FYkvtKQt4o+FUQgNCZzfqzTqE/vn8iwe2lQpKI9crpOf0TTF4qr73sf+3u/EiG8tcBaVHoc9NBW79MvhxwBTR0cEbejLfS5x+oIbHXrl4Hqm7w05gYYOa3H1XhFpPKtp0xCQnSvhCMlkGRXbhu2FvCfPn2xC/w8MCBYPdNx6hir9i8kW7jF8uS4WNdbHw4x3wsf88G2Lwg0c2/9+mmRCO+rvohj8vvTA58NOspGrqIfOWmTj1V/a5sMeIDZaja7UJkcNZuboMR5VeaOAei9L9869RTRYnHxztlEnYQcmlWNVePl5EU3ra9G5jZ5WpbITfeiEHxf+P9B+1GCEzahAYISPoaJAUdZXvB8W2c+h7AU1jHV4MsEk+xfjyLj+B0+BHMixZwouAAAAAElFTkSuQmCC"
                            alt=""
                          />
                          <p> Webhook</p>
                        </div>
                        <div className="MailChimpIntegrations_group__PxJ26">
                          <Switch {...label} defaultChecked />
                          <p>status</p>:<p>Inactive</p>
                        </div>
                        <button
                          onClick={toggleModal}
                          className="button button-primary px-3 text-decoration-none"
                        >
                          Set up
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-right scrollable-div border-start p-4">
                  <h5>Approximate preview</h5>

                  <div className="formPreview">
                    {formData?.struct?.form?.logoImage && (
                      <img
                        src={formData?.struct?.form?.logoImage}
                        alt="logo"
                        className="previewLogo"
                      />
                    )}
                    {formModel?.headerText && (
                      <h4 className="text-center">
                        {/* {formData?.struct?.leadFormStruct?.form?.headerText} */}
                        {formModel?.headerText}
                      </h4>
                    )}
                    <p className="text-center">{formModel?.descriptionText}</p>
                    <div className="fields-preview mb-4">
                      {formData?.struct?.leadFormStruct?.form?.fields?.map(
                        (field) => (
                          <label
                            className="form-label font-sm w-100"
                            role="button"
                          >
                            <div>
                              {field?.type !== "checkbox" && (
                                <p>{field?.label}</p>
                              )}
                              <div>
                                {field?.type === "checkbox" && (
                                  <div className="d-flex ">
                                    <input
                                      id={field?.id}
                                      type="checkbox"
                                      className="checkbox "
                                    />
                                    <label
                                      htmlFor={field?.id}
                                      className="m-1 user-select-none"
                                      role="button"
                                    >
                                      {field?.label}
                                    </label>
                                  </div>
                                )}
                                {field?.type === "text_area" && (
                                  <textarea className="w-100 form-control" />
                                )}
                                {field?.type === "text" && (
                                  <input
                                    className="form-control theme-control"
                                    type={field?.type}
                                  />
                                )}
                                {field?.type === "email" && (
                                  <input
                                    className="form-control theme-control"
                                    type={field?.type}
                                  />
                                )}
                                {field?.type === "number" && (
                                  <input
                                    className="form-control theme-control"
                                    type="number"
                                  />
                                )}
                              </div>
                            </div>
                          </label>
                        )
                      )}
                    </div>
                    {console.log(formModel?.linkPrivacyPolicyLink, "dadadad")}
                    <div className="submitpreview">
                      {formModel?.linkPrivacyPolicyLink && (
                        <div className="termsForm text-center">
                          <input id="terms" type="checkbox" />
                          <label htmlFor="terms" className="ps-2">
                            I Agree with{" "}
                            <Link to={formModel?.linkPrivacyPolicyLink}>
                              Privacy Policy
                            </Link>
                          </label>
                        </div>
                      )}
                      {console.log(formModel, "iopioioio")}
                      {/* {formModel.addtionalText && (
                        <p>
                          {formModel?.addtionalText}
                        </p>
                      )} */}
                      {formModel?.addtionalText}

                      <div className="text-center m-2">
                        <button
                          className="btn py-2 w-50"
                          style={{
                            backgroundColor: `#000`,
                            color: "#fff",
                          }}
                        >
                          {formModel?.buttonText || "Submit"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ul className="Footer_footer__bMDNk">
            {/* {selecteScreen !== "results" && (
          <li className="Footer_footerItem__yaFNE">
            {selecteScreen !== "quests" && <button className="button button-primary outline px-3" onClick={handleNext}>Next</button>}
          </li>
        )} */}
            <li className="Footer_footerItem__yaFNE">
              <button
                type="submit"
                onClick={() => handleSave()}
                className="button button-primary px-3 text-decoration-none"
              >
                Save
              </button>
            </li>
          </ul>
        </div>
      </Modal>
      <CustomModal open={customModel}>
        <div className="" style={style}>
          <div className="modal-form" style={{ height: "800px" }}>
            <div className="modal-header-form">
              <h3>Webhooks integration</h3>
              <button
                className="btn text-white"
                style={{ fontSize: "30px" }}
                onClick={() => setShowCustomModel(false)}
              >
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="p-4 modal-form-body">
              <div className="form-left">
                <div className="fields-output">
                  <div className={`formFieldsList}`}>
                    <div className="additionalInfo">
                      <div className="fields_info d-flex align-items-center gap-3">
                        <div className="image-container">
                          <img src="" alt="Webhook" className="webhook-image" />
                        </div>

                        <div className="d-flex flex-column flex-grow-1">
                          <label
                            className="form-label font-sm fw-medium d-block"
                            role="button"
                          >
                            Webhook URL
                          </label>

                          <div className="d-flex align-items-center gap-2">
                            <input
                              className="form-control theme-control input-field"
                              type="text"
                              style={{ width: "100%" }}
                            />

                            <button className="button button-secondary px-3">
                              Add
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="buttons_save d-flex gap-2 align-items-center mt-4">
                <button
                  className="button button-secondary border-0"
                // onClick={() => setopenPinModal(false)}
                >
                  Cancel
                </button>

                <button
                  className="button button-primary border-0"
                // onClick={() => handleSaveModal(pinData.id)}
                >
                  Save
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </CustomModal>
    </>
  );
}

export default FormModal;
