import CustomModal from "components/Models";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { updateTemplateAction } from "../../TemplateRedux/actions/drawerAction";
// import { Select, MenuItem } from "@mui/material";
function PassswordModal({
  IsOpenFormModal,
  setIsOpenFormModal,
  formData,
  selectedPage,
  handleChangeLogo,
}) {
  const [checkedFields, setCheckedFields] = useState([]);
  const [newFieldsArray, setNewFieldsArray] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [passwordString, setPasswordString] = useState("");
  const [settingsData, setSettingsaData] = useState({});
  const { templateDetails } = useSelector((state) => state.DrawerReducer);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    backgroundColor: "#fff",
    boxShadow: 24,
    borderRadius: "12px",
    p: 4,
  };

  const dispatch = useDispatch();

  const handleCancelPassword = (e) => {
    // e.preventDefault();

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
    setIsOpenFormModal(false)
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();

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
                  passwordList: [
                    ...block.struct.passwordList,
                    passwordString,
                  ],
                },
              }
              : block
          ),
        })),
      },
    };

    dispatch(updateTemplateAction(updatedData));
    setPasswordString("");
    
  };

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

  useEffect(() => {
    if (formData) {
      setSettingsaData(formData);
    }
  }, [formData]);

  return (
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
            <h3 className="text-start mb-0">Privacy</h3>
            <button
              className="btn text-white"
              style={{ fontSize: "30px" }}
              onClick={() => setIsOpenFormModal(false)}
            >
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div className="modal-form-body">
            <div className="form-option-wrap py-4 px-4">
              <div className="">
                <div className="fields-output">
                  <h4 className="h5 mb-4">
                    As a password, you can use a keyword, email address or a set
                    of numbers. To add multiple passwords, separate them with a
                    comma or space.
                  </h4>
                  <div className="formFieldsList text-center">
                    <div className="row gy-3 gx-4 mb-3">
                      <div className="addpasswordField">
                        <form onSubmit={handleFormSubmit}>
                          <label className="form-label font-sm fw-medium d-flex align-items-center gap-2 cursor-pointer">Add Password</label>
                          <div className="d-flex gap-2 align-items">
                            <input
                              type="text"
                              onChange={(e) =>
                                setPasswordString(e.target.value)
                              }
                              defaultValue={passwordString}
                              className="form-control theme-control"
                            />
                            <button
                              type="submit"
                              className="button button-primary border-0"
                              disabled={!passwordString ? true : false}
                            >
                              Add
                            </button>
                          </div>
                        </form>

                        <div className="showlistpassword">
                          {settingsData?.struct?.passwordList?.length !== 0 &&
                            (
                              <div className="list-header d-flex justify-content-between">
                                <p>
                                  Active passwords{" "}
                                  {settingsData?.struct?.passwordList?.length}
                                </p>

                                <button className="btn" onClick={handleClearAll}>
                                  Clear All
                                </button>
                              </div>
                            )}

                          {settingsData?.struct?.passwordList?.length !== 0 ? (
                            <>
                              {settingsData?.struct?.passwordList?.map(
                                (password) => (
                                  <div>
                                    <div className="list-body d-flex justify-content-between">
                                      <p>{password}</p>
                                      <button
                                        className="btn"
                                        onClick={() =>
                                          handleDeleteSelected(password)
                                        }
                                      >
                                        <i class="fa-solid fa-xmark"></i>
                                      </button>
                                    </div>
                                  </div>
                                )
                              )}
                            </>
                          ) : (
                            <div className="mt-4">
                              <i class="fa-solid fa-lock-open h3 mb-1 primary-text"></i>
                              <p className="mb-0 font-sm fw-medium">This project is not password protected</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul className="Footer_footer__bMDNk">

          <li className="Footer_footerItem__yaFNE">
            {/* {selecteScreen !== "quests" &&  */}


            <button className="button button-primary outline px-3" onClick={handleCancelPassword}>Cancel</button>
          </li>

          <li className="Footer_footerItem__yaFNE">
            <button
              type="submit"
              onClick={() =>{
                setIsOpenFormModal(false)
                setPasswordString("")
              }}
              
              // onClick={() => handleSubmit(onSubmit)()}
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

export default PassswordModal;
