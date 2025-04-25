import CustomModal from "components/Models";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { updateTemplateAction } from "../../TemplateRedux/actions/drawerAction";
// import { Select, MenuItem } from "@mui/material";
function InternalPageModal({
  IsOpenFormModal,
  setIsOpenFormModal,
  formData,
  selectedPage,
  handleChangeLogo,
  handleSelectLink,
}) {
  const [passwordString, setPasswordString] = useState("");
  const [settingsData, setSettingsaData] = useState({});
  const { templateDetails } = useSelector((state) => state.DrawerReducer);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 900,
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
    setIsOpenFormModal(false);
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
  console.log(formData, "sdsdsdssettingsData");

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
            <h3 className="text-start mb-0">Select internal page</h3>
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
              {templateDetails?.project_structure?.pages?.map((page) => (
                <div
                  className="m-4"
                  onClick={() => handleSelectLink(page.id)}
                  role="button"
                >
                  {page.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default InternalPageModal;
