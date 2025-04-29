import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch, useSelector } from "react-redux";
import { getTemplateDetailsAction, updateTemplateAction } from "../../TemplateRedux/actions/drawerAction";
import { TEMPLATES } from "app/config/endpoints";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { REQUEST_ACTION } from "redux/authenticate/actions";
import { RESPONSE_CODE } from "app/constants";
import { ApiErrorMessage } from "utils/helpers/function/apiErrorResonse";
import { putRequest } from "app/httpClient/axiosClient";
import { getTemplateDetails } from "../../TemplateRedux/SagaFunctions";

function TeamplateHeader({ setShowTemplatePreview }) {
  const { templateDetails } = useSelector((state) => state.DrawerReducer);
  const { name } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [templateName, setTemplateName] = useState(templateDetails?.name);
  const [published, setPublished] = useState({})
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  // const { id } = useParams()
  console.log(name, "GETTINGIDDI")
  const handleClick = () => {
    setIsEditing(true);
  };

  const dispatch = useDispatch();

  const handleEditTemplate = async () => {
    const payload = {
      title: templateName,
    };
    try {
      dispatch({ type: REQUEST_ACTION.PROCESSING });
      const {
        status,
        data: { message },
      } = await putRequest(`${TEMPLATES.UPDATE}/${name}`, payload);
      if (status === RESPONSE_CODE[200]) {
        dispatch({
          type: REQUEST_ACTION.SUCCESS,
          payload: { message: message },
        });
      } else {
        dispatch({
          type: REQUEST_ACTION.FAILURE,
          payload: { message: ApiErrorMessage() },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: REQUEST_ACTION.FAILURE,
        payload: { message: ApiErrorMessage(error) },
      });
    }
  };
  console.log(templateDetails, "templateDetailstemplateDetails")
  const handleChange = (event) => {
    setTemplateName(event.target.value);
    const _data = {
      ...templateDetails,
      name: event.target.value,
    };
    dispatch(updateTemplateAction(_data));
  };

  const handleBlur = () => {
    setIsEditing(false);
    handleEditTemplate();
  };
  const navigate = useNavigate()
  // useEffect(() => {
  //   if (debounceTimeout) {
  //     clearTimeout(debounceTimeout);
  //   }

  //   // Create a new timeout to trigger after user stops typing (debounced)
  //   const timeout = setTimeout(() => {
  //     handleEditTemplate();
  //   }, 1000); // Wait for 1 second after user stops typing

  //   setDebounceTimeout(timeout);

  //   // Cleanup on component unmount
  //   return () => clearTimeout(timeout);
  // }, [templateName]);

  console.log(templateDetails?.published, "templateNametryuopotemplateNametemplateName");
  // publish/:template_id put
  const handlePublish = async (status) => {
    console.log(status, "cheddjddsdssds")
    const payload = {
      published: status,
    };
    try {
      dispatch({ type: REQUEST_ACTION.PROCESSING });
      const {
        status,
        data: { message },
      } = await putRequest(`${TEMPLATES.PUBLISH_TEMPLATE}/${name}`, payload);
      if (status === RESPONSE_CODE[200]) {
        console.log(name, "namejabjkeasbbakdadadad")
        dispatch(getTemplateDetailsAction(name));
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: REQUEST_ACTION.FAILURE,
        payload: { message: ApiErrorMessage(error) },
      });
    }
  };

  const handleSaveExit = () => {
    navigate(-1);
  };
  useEffect(() => {
    setPublished(templateDetails)
  }, [templateDetails])
  console.log(published, "checsdjsndjksdksdkjsbdjksbfkjsbfsksfsfsfs")
  return (
    <header className="editor-header w-100">
      <div className="header-wrap">
        <div className="head-left">
          <Button
            onClick={handleSaveExit}
            className="button button-primary  px-3"
            variant="contained"
            color="primary"
            startIcon={<ArrowBackIcon />}
          >
            <span>Save &amp; Exit</span>
          </Button>
          {isEditing ? (
            <input
              type="text"
              value={templateName}
              onChange={handleChange}
              onBlur={handleBlur}
              autoFocus
              className="template-name-input"
            />
          ) : (
            <p className="mb-0" onClick={handleClick}>
              {templateName}
            </p>
          )}
        </div>
        <div className="head-center tab-menu">
          <button
            onClick={() => setShowTemplatePreview("editor")}
            data-rel="tab-1"
            className="active bg-transparent border-0"
          >
            Editor
          </button>
          <i className="fa-regular fa-arrow-right-long"></i>
          <button
            onClick={() => setShowTemplatePreview("edit-details")}
            data-rel="tab-2"
            className=" bg-transparent border-0"
          >
            Edit template Details
          </button>
          {/* <i className="fa-regular fa-arrow-right-long"></i> */}
          {/* <button href="javascript:void(0)" data-rel="tab-3" className="bg-transparent border-0">
            Sharing options
          </button> */}
        </div>
        <div className="head-right text-end">
          <div className="button-group gap-2 justify-content-end">
            <button
              onClick={() => setShowTemplatePreview("preview")}
              className="button button-primary outline px-3"
            >
              <i className="fa-regular fa-eye"></i> <span>Preview</span>
            </button>
            {console.log(published?.published, "published")}
            {templateDetails?.published === 1 ? <a
              onClick={() => handlePublish(0)}
              type="button"
              href="javascript:void(0)"
              className="button button-primary px-3 text-decoration-none"
            >
              <i className="fa-regular fa-check"></i> <span>Draft</span>
            </a> : <a
              onClick={() => handlePublish(1)}
              type="button"
              href="javascript:void(0)"
              className="button button-primary px-3 text-decoration-none"
            >
              <i className="fa-regular fa-check"></i> <span>Publish</span>
            </a>}

          </div>
        </div>
      </div>
    </header>
  );
}

export default TeamplateHeader;
