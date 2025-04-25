import CustomModal from "components/Models";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { updateTemplateAction } from "../../TemplateRedux/actions/drawerAction";
import DeleteIcon from "@mui/icons-material/Delete";
// import { Select, MenuItem } from "@mui/material";
function TimeUpPageModal({
  IsOpenFormModal,
  setIsOpenFormModal,
  formData,
  selectedPage,
  setOpen,
  setIsEditMedia,
  setIsEditMediaTypeDetails,
  selectedImage,
  handleChangeLogo,
}) {
  const [checkedFields, setCheckedFields] = useState([]);
  const [newFieldsArray, setNewFieldsArray] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [passwordString, setPasswordString] = useState("");
  const [headerError, setHeaderError] = useState(false);
  // const [settingsData, setSettingsaData] = useState({});
  const [settingsData, setSettingsaData] = useState({
    imageSrc: formData?.struct?.timeIsUpScreen?.imageSrc || "", // Set initial state
  });

  console.log(settingsData, "settingsDatasettingsData");
  const { templateDetails } = useSelector((state) => state.DrawerReducer);
  console.log(templateDetails, "dwdwdwd");
  console.log(settingsData, "settingsData");
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
  console.log(formData, "formDataformData");
  const handleCancel = () => {
    setSettingsaData(formData?.struct?.timeIsUpScreen || {});
    // handleCancel....
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
    //               timeIsUpScreen: {
    //                 ...block.struct.timeIsUpScreen, // Keep the existing timeIsUpScreen fields
    //                 ...settingsData,
    //               },
    //             },
    //           }
    //           : block
    //       ),
    //     })),
    //   },
    // };
    // // settingsData
    // dispatch(updateTemplateAction(updatedData));
    setIsOpenFormModal(false);
  };
  console.log(selectedImage, "selectedImage8686");
  useEffect(() => {
    // Log whenever settingsData changes
    console.log(settingsData, "Updated settingsData");
  }, [settingsData]); // This will run whenever settingsData changes

  // const handleChangeLogo = (selected, id) => {
  //   console.log(selected, id, selectedImage, "handleChangeLogo");

  //   // Update the local state to reflect the change
  //   setSettingsaData((prev) => ({
  //     ...prev,
  //     imageSrc: selectedImage,  // Assuming `selected` contains the new image URL
  //   }));

  //   // Optionally open a media selection modal
  //   setOpen(true);
  //   setIsEditMedia(true);
  //   setIsEditMediaTypeDetails((prev) => ({
  //     ...prev,
  //     type: "logo",  // This could be specific to the logo change
  //     id: id,
  //     isLogoCover: true,
  //   }));
  // };
  // const handleChangeLogo = (selected, id) => {
  //   console.log(selected, id, selectedImage, "handleChangeLogo");
  //   console.log("RENDERINGGGGGGG")
  //   // Update the local state to reflect the change
  //   setSettingsaData((prev) => ({
  //     ...prev,
  //     imageSrc: selectedImage,  // Assuming `selected` contains the new image URL
  //   }));

  //   // Optionally open a media selection modal
  //   setOpen(true);
  //   setIsEditMedia(true);
  //   setIsEditMediaTypeDetails((prev) => ({
  //     ...prev,
  //     type: "logo",  // This could be specific to the logo change
  //     id: id,
  //     isLogoCover: true,
  //   }));
  // };
  const handleClearAll = () => {
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
                    passwordList: [],
                  },
                }
              : block
          ),
        })),
      },
    };

    dispatch(updateTemplateAction(updatedData));
  };

  const handleCallToActionButton = (e) => {
    setSettingsaData((prev) => ({
      ...prev,
      isActionButton: e,
    }));
  };

  const handleDeleteImage = (e) => {
    console.log(e, "uriwurwiruwir");
    const updatedData = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        pages: templateDetails.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === formData?.id // Block where the form exists
              ? {
                  ...block,
                  struct: {
                    ...block.struct,
                    timeIsUpScreen: {
                      ...block.struct.timeIsUpScreen,
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
  };
  const handleDeleteSelected = (password) => {
    console.log(password, "celeldledede");
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
                    passwordList: block.struct.passwordList.filter(
                      (item) => item !== password
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

  const handleDescriptionText = (e) => {
    console.log(e, "eee");
    setSettingsaData((prev) => ({
      ...prev,
      description: e,
    }));
    console.log(templateDetails, "templateDetails");
    // const updatedData = {
    //   ...templateDetails,
    //   project_structure: {
    //     ...templateDetails.project_structure,
    //     pages: templateDetails.project_structure.pages.map((page) => ({
    //       ...page,
    //       blocks: page.blocks.map((block) =>
    //         block.id === formData?.id // Block where the form exists
    //           ? {
    //             ...block,
    //             struct: {
    //               ...block.struct,
    //               timeIsUpScreen: {
    //                 ...block.struct.timeIsUpScreen,
    //                 description: e,

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
  const handleheaderText = (e) => {
    const value = e;
    setHeaderError(!value.trim()); // Set error if empty
    setSettingsaData((prev) => ({
      ...prev,
      header: value,
    }));
  };

  // const handleheaderText = (e) => {
  //   setSettingsaData((prev) => ({
  //     ...prev,
  //     header: e,
  //   }));
  //   console.log(e, "eee")
  //   console.log(templateDetails, "templateDetails")
  //   // const updatedData = {
  //   //   ...templateDetails,
  //   //   project_structure: {
  //   //     ...templateDetails.project_structure,
  //   //     pages: templateDetails.project_structure.pages.map((page) => ({
  //   //       ...page,
  //   //       blocks: page.blocks.map((block) =>
  //   //         block.id === formData?.id // Block where the form exists
  //   //           ? {
  //   //             ...block,
  //   //             struct: {
  //   //               ...block.struct,
  //   //               timeIsUpScreen: {
  //   //                 ...block.struct.timeIsUpScreen,
  //   //                 header: e,

  //   //               },
  //   //             },
  //   //           }
  //   //           : block
  //   //       ),
  //   //     })),
  //   //   },
  //   // };
  //   // dispatch(updateTemplateAction(updatedData));
  // };
  const handleAddButtonText = (e) => {
    console.log(e, "eee");
    console.log(templateDetails, "templateDetails");
    setSettingsaData((prev) => ({
      ...prev,
      actionButtonText: e,
    }));
    // const updatedData = {
    //   ...templateDetails,
    //   project_structure: {
    //     ...templateDetails.project_structure,
    //     pages: templateDetails.project_structure.pages.map((page) => ({
    //       ...page,
    //       blocks: page.blocks.map((block) =>
    //         block.id === formData?.id // Block where the form exists
    //           ? {
    //             ...block,
    //             struct: {
    //               ...block.struct,
    //               timeIsUpScreen: {
    //                 ...block.struct.timeIsUpScreen,
    //                 actionButtonText: e,

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
  const handleAddButtonLink = (e) => {
    console.log(e, "eee");
    setSettingsaData((prev) => ({
      ...prev,
      actionButtonLink: e,
    }));
    console.log(templateDetails, "templateDetails");
    // const updatedData = {
    //   ...templateDetails,
    //   project_structure: {
    //     ...templateDetails.project_structure,
    //     pages: templateDetails.project_structure.pages.map((page) => ({
    //       ...page,
    //       blocks: page.blocks.map((block) =>
    //         block.id === formData?.id // Block where the form exists
    //           ? {
    //             ...block,
    //             struct: {
    //               ...block.struct,
    //               timeIsUpScreen: {
    //                 ...block.struct.timeIsUpScreen,
    //                 actionButtonLink: e,

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
  console.log(templateDetails, "templateDetails");
  const handleSave = () => {
    if (!settingsData?.header?.trim()) {
      setHeaderError(true);
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
                    timeIsUpScreen: {
                      ...block.struct.timeIsUpScreen,
                      ...settingsData,
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
  useEffect(() => {
    if (selectedImage) {
      setOpen(true);
      setIsEditMedia(true);
      console.log(selectedImage, "selectedImage090");
      // When selectedImage changes, update the state to reflect the new image
      setSettingsaData((prev) => ({
        ...prev,
        imageSrc: selectedImage, // Set the selected image
      }));
    }
  }, [selectedImage]);
  useEffect(() => {
    if (formData) {
      setSettingsaData(formData.struct?.timeIsUpScreen);
    }
  }, [formData]);
  console.log(formData, "timeupdapageforem");
  return (
    <Modal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      open={IsOpenFormModal}
      // onClose={() => setIsOpenFormModal(false)}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
    >
      <div style={style}>
        <div className="modal-form">
          <div className="modal-header-form">
            <h3 className="">“Time is up” Page</h3>
            {/* <buttonaa a
              className="btn text-white"
              style={{ fontSize: "30px" }}
              onClick={() => setIsOpenFormModal(false)}
            >
              <i class="fa-solid fa-xmark"></i>
            </button> */}
          </div>
          <div className="modal-form-body">
            <div className="form-option-wrap">
              <>
                <div className="form-left">
                  <div className="fields-output">
                    <p>The user will see this page if the game time is up.</p>
                    <div className={`formFieldsList`}>
                      <div className="additionalInfo">
                        <div className="fields_info">
                          <div className="mb-3">
                            <label
                              className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer"
                              role="button"
                            >
                              Header <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                              className={`form-control theme-control ${headerError ? "is-invalid" : ""}`}
                              value={settingsData?.header}
                              autoFocus={headerError}
                              onChange={(e) => handleheaderText(e.target.value)}
                            />
                            {headerError && (
                              <div className="invalid-feedback">
                                Header is required.
                              </div>
                            )}
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
                              value={settingsData?.description}
                              onChange={(e) =>
                                handleDescriptionText(e.target.value)
                              }
                            />
                          </div>

                          <div
                            className="d-flex w-100 gap-3 mb-3"
                            role="button"
                          >
                            <div>
                              <label class="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">
                                Cover
                              </label>
                              <div className="coverchangeImage">
                                <img
                                  src={settingsData?.imageSrc}
                                  alt="Cover Image"
                                  className="coverImage"
                                />
                                <button
                                  className="button button-primary border-0 font-sm"
                                  onClick={() =>
                                    handleChangeLogo(
                                      "final-result-image",
                                      formData?.id
                                    )
                                  }
                                >
                                  Change
                                </button>
                              </div>
                            </div>

                            <div className="w-100">
                              <label className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer"></label>

                              <DeleteIcon onClick={() => handleDeleteImage()} />
                            </div>
                            {console.log(
                              formData?.struct?.timeIsUpScreen?.isActionButton,
                              "sqsqdqd"
                            )}
                          </div>
                          <label
                            className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer"
                            role="button"
                          >
                            <input
                              type="checkbox"
                              id="calltoactionbutton"
                              className="form-check-input theme-control shadow-none m-0"
                              onChange={(e) =>
                                handleCallToActionButton(e.target.checked)
                              }
                              checked={settingsData?.isActionButton}
                            />
                            Call to action button
                          </label>
                          {settingsData?.isActionButton && (
                            <div className="d-flex justify-content-between gap-1">
                              {" "}
                              {/* Reduced gap here */}
                              <div
                                className="d-flex flex-column"
                                style={{ width: "48%" }}
                              >
                                {" "}
                                {/* Control the width of each input */}
                                <label className="form-label font-sm fw-medium">
                                  Button text
                                </label>
                                <input
                                  className="form-control theme-control"
                                  defaultValue={settingsData?.actionButtonText}
                                  onChange={(e) =>
                                    handleAddButtonText(e.target.value)
                                  }
                                />
                              </div>
                              <div
                                className="d-flex flex-column"
                                style={{ width: "48%" }}
                              >
                                {/* Internal page */}
                                <label className="form-label font-sm fw-medium">
                                  Link
                                </label>
                                <input
                                  className="form-control theme-control"
                                  defaultValue={settingsData?.actionButtonLink}
                                  onChange={(e) =>
                                    handleAddButtonLink(e.target.value)
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
                <div className="form-right border-start py-4">
                  <h5>Approximate preview</h5>
                  <div className={`formPreview cover_modal`}>
                    {console.log(settingsData?.imageSrc, "dwwdwdw")}
                    {settingsData?.imageSrc && (
                      <img
                        src={settingsData?.imageSrc}
                        alt="logo"
                        className="coverImage"
                      />
                    )}

                    {settingsData?.header && (
                      <h4 className="text-center mt-3">
                        {settingsData?.header}
                      </h4>
                    )}

                    {/* {formData?.struct?.timeIsUpScreen?.description && (
                      <p className="text-center">
                        {formData?.struct?.timeIsUpScreen?.description}
                      </p>
                    )} */}
                    {settingsData?.description && (
                      <h4 className="text-center mt-3">
                        {settingsData?.description}
                      </h4>
                    )}
                    {console.log(formData, "scscscsc", settingsData)}
                    <div className="submitpreview">
                      {settingsData?.actionButtonText && (
                        <div className="text-center m-2">
                          <button
                            className="btn py-2"
                            style={{
                              backgroundColor: `${formData?.struct?.colorTheme}`,
                              color: "#fff",
                            }}
                          >
                            {console.log(
                              settingsData?.actionButtonText,
                              "settingsData?.actionButtonText"
                            )}
                            {settingsData?.actionButtonText || "Start"}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            </div>
          </div>
        </div>
        <ul className="Footer_footer__bMDNk">
          <li className="Footer_footerItem__yaFNE">
            <button
              className="button button-primary outline px-3"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </li>

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
  );
}

export default TimeUpPageModal;
