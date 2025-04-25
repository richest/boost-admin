import React, { useEffect, useState } from "react";
import {
  DEFAULT_APP_TITLE,
  DEFAULT_VALUE,
  RESPONSE_CODE,
  ROUTE_SLUGS,
} from "app/constants";
import { Link } from "react-router-dom";
import WebBreadCrumbs from "../WebBreadCrumb";
import PageContainer from "components/admin-ui/container";
import AppHelmet from "components/admin-ui/helmet";
import { Grid } from "@mui/material";
import CreateTemplateCatagory from "components/common/cards/CreateTemplateCatagory";
import CreateNewSector from "../sections/profileSetup/popup/CreateNewSector";
import { useDispatch } from "react-redux";
import { REQUEST_ACTION } from "redux/authenticate/actions";
import { deleteRequest, getRequest } from "app/httpClient/axiosClient";
import { ApiErrorMessage } from "utils/helpers/function/apiErrorResonse";
import { SECTOR } from "app/config/endpoints";
import WebContentTemplateCard from "components/common/cards/WebContentTemplateCard";
import WebContentSectorCard from "../sections/profileSetup/popup/WebContentSectorCard";
import toast from "react-hot-toast";
import DeletePopup from "../Popup/DeletePopup";

function ProfileSetup() {
  const dispatch = useDispatch();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [sectorList, setSectorList] = useState([]);
  const [hoveredUserId, setHoveredUserId] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);

  const handlePopoverOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setHoveredUserId(id);
  };

  const handleOpenMenu = (id) => {
    const userObj = sectorList.find((user) => user.id === id);
    // setOpen(event.currentTarget);
    setHoveredUserId(id);
    // setHoveredUserObj(userObj);
  };

  const handleCloseMenu = () => {
    // setOpen(null);
    // setOpenUndo(null);
    setHoveredUserId(null);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    try {
      dispatch({ type: REQUEST_ACTION.PROCESSING });
      const {
        status,
        data: { message },
      } = await deleteRequest(`${SECTOR.DELETE}/${hoveredUserId}`);
      if (status === RESPONSE_CODE[200]) {
        dispatch({
          type: REQUEST_ACTION.SUCCESS,
          payload: { message: message },
        });
        toast.success(message);
        setDeleteModal(false);
        categoryListCallBack();
      } else {
        dispatch({
          type: REQUEST_ACTION.FAILURE,
          payload: { message: ApiErrorMessage() },
        });
        toast.success(message);
      }
      handlePopoverClose();
    } catch (error) {
      dispatch({
        type: REQUEST_ACTION.FAILURE,
        payload: { message: ApiErrorMessage(error) },
      });
      toast.error(`${error.response.data.message}`);
      handlePopoverClose();
    }
  };
  async function getTemplateCategory(url) {
    // setLoading(true);
    dispatch({ type: REQUEST_ACTION.INIT_LOADER, payload: { loader: true } });
    let _errorMessage;
    const LOCALE = DEFAULT_VALUE.LOCALE;
    try {
      const response = await getRequest(url);
      const { status } = response;
      const {
        data: { sectorsDetails },
        success,
      } = response.data;
      if (success && status === RESPONSE_CODE[200]) {
        setSectorList(sectorsDetails.rows);
        dispatch({
          type: REQUEST_ACTION.INIT_LOADER,
          payload: { loader: false },
        });
      } else {
        dispatch({
          type: REQUEST_ACTION.FAILURE,
          payload: { message: ApiErrorMessage() },
        });
      }
    } catch (error) {
      _errorMessage = ApiErrorMessage(error);
      dispatch({
        type: REQUEST_ACTION.FAILURE,
        payload: { message: _errorMessage },
      });
    }
  }
  const categoryListCallBack = () => {
    getTemplateCategory(`${SECTOR.LIST}`);
  };

  useEffect(() => {
    categoryListCallBack();
  }, [pageNo, rowsPerPage]);

  return (
    <>
      <AppHelmet title={DEFAULT_APP_TITLE.WEB_CONTENT} />

      <PageContainer
        className="page-container users-page"
        heading="Web Content"
      >
        <WebBreadCrumbs
          breadcrumbs={[
            <Link
              style={{
                color: "rgb(99, 115, 129)",
                textDecoration: "none",
              }}
              to={ROUTE_SLUGS.DASHBOARD}
            >
              dashboard
            </Link>,
            <Link
              style={{
                color: "rgb(99, 115, 129)",
                textDecoration: "none",
              }}
              to={ROUTE_SLUGS.WEB_CONTENT}
            >
              Web-content
            </Link>,
            "profile-setup sector",
          ]}
        />

        <Grid container spacing={3} sx={{ pt: 2 }}>
          {sectorList?.map((item, i) => (
            <Grid key={i} item xs={12} sm={4} md={3} lg={2.4}>
              <WebContentSectorCard
                // path={item.path}
                title={item.name}
                icon={item.thumbnail}
                id={item?.id}
                hoveredUserId={hoveredUserId}
                handleOpenMenu={handleOpenMenu}
                handlePopoverOpen={handlePopoverOpen}
                handlePopoverClose={handlePopoverClose}
                anchorEl={anchorEl}
                categoryListCallBack={categoryListCallBack}
                setDeleteModal={setDeleteModal}
              />
            </Grid>
          ))}

          <Grid item xs={12} sm={4} md={3} lg={2.4}>
            <CreateTemplateCatagory setOpenAddModal={setOpenAddModal} />
          </Grid>
        </Grid>
      </PageContainer>
      {openAddModal && (
        <CreateNewSector
          openAddModal={openAddModal}
          setOpenAddModal={setOpenAddModal}
          categoryListCallBack={categoryListCallBack}
        />
      )}
      {deleteModal && (
        <DeletePopup
          title="Sector"
          cancelAction={handleCloseMenu}
          deleteAction={handleDelete}
          id={hoveredUserId}
          setIsOpen={setDeleteModal}
          isOpen={deleteModal}
        />
      )}
    </>
  );
}

export default ProfileSetup;
