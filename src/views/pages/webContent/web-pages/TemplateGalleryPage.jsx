import { Grid, Typography } from "@mui/material";
import {
  DEFAULT_APP_TITLE,
  DEFAULT_VALUE,
  RESPONSE_CODE,
  ROUTE_SLUGS,
} from "app/constants";
import PageContainer from "components/admin-ui/container";
import AppHelmet from "components/admin-ui/helmet";
import { Link } from "react-router-dom";
import WebBreadCrumbs from "../WebBreadCrumb";
import { useEffect, useState } from "react";
import WebContentTemplateCard from "components/common/cards/WebContentTemplateCard";
import CreateTemplateCatagory from "components/common/cards/CreateTemplateCatagory";
import AddTemplateCatagory from "../Popup/AddTemplateCatagory";
import { TEMPLATES_CATEGORY } from "app/config/endpoints";
import { REQUEST_ACTION } from "redux/authenticate/actions";
import { ApiErrorMessage } from "utils/helpers/function/apiErrorResonse";
import { deleteRequest, getRequest } from "app/httpClient/axiosClient";
import { useDispatch } from "react-redux";
import DeletePopup from "../Popup/DeletePopup";
import toast from "react-hot-toast";

const TemplateGalleryPage = () => {
  const dispatch = useDispatch();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
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
    const userObj = categoryList.find((user) => user.id === id);
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
      } = await deleteRequest(`${TEMPLATES_CATEGORY.DELETE}/${hoveredUserId}`);
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
        data: { templateDetails },
        success,
      } = response.data;
      if (success && status === RESPONSE_CODE[200]) {
        setCategoryList(templateDetails.rows);
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
    getTemplateCategory(`${TEMPLATES_CATEGORY.LIST}`);
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
            "Template-gallery",
          ]}
        />

        <Grid container spacing={3} sx={{ pt: 2 }}>
          {categoryList?.map((item, i) => (
            <Grid key={i} item xs={12} sm={4} md={3} lg={2.4}>
              <WebContentTemplateCard
                // path={item.path}
                title={item.name}
                icon={item.icon}
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

        {openAddModal && (
          <AddTemplateCatagory
            openAddModal={openAddModal}
            setOpenAddModal={setOpenAddModal}
            categoryListCallBack={categoryListCallBack}
          />
        )}

        {deleteModal && (
          <DeletePopup
            title="template"
            cancelAction={handleCloseMenu}
            deleteAction={handleDelete}
            id={hoveredUserId}
            setIsOpen={setDeleteModal}
            isOpen={deleteModal}
          />
        )}
      </PageContainer>
    </>
  );
};

export default TemplateGalleryPage;
