// @mui
import PropTypes from "prop-types";
import { alpha, styled } from "@mui/material/styles";
import {
  Card,
  IconButton,
  Popover,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";

// ----------------------------------------------------------------------

import { Link, NavLink } from "react-router-dom";
import Iconify from "components/iconify";
import SkeltonCardLoader from "components/admin-ui/loader/SkeltonCardLoader";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import EditTemplateCatagory from "views/pages/webContent/Popup/EditTemplateCategory";
import { TEMPLATES_CATEGORY } from "app/config/endpoints";
import { REQUEST_ACTION } from "redux/authenticate/actions";
import { ApiErrorMessage } from "utils/helpers/function/apiErrorResonse";
import { DEFAULT_VALUE, RESPONSE_CODE, ROUTE_SLUGS } from "app/constants";
import { deleteRequest, getRequest } from "app/httpClient/axiosClient";
import toast from "react-hot-toast";
import { Box } from "@mui/system";

const StyledIcon = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
  marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

WebContentTemplateCard.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  sx: PropTypes.object,
};

export default function WebContentTemplateCard({
  isLoading,
  path,
  title,
  icon,
  color = "primary",
  sx,
  handleOpenMenu,
  handlePopoverOpen,
  handlePopoverClose,
  id,
  hoveredUserId,
  anchorEl,
  categoryListCallBack,
  setDeleteModal,
  ...other
}) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const customization = useSelector((state) => state.customization);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [categoryData, setCategoryData] = useState("");
  const open = Boolean(anchorEl);
  if (isLoading && isLoading !== undefined) {
    return <SkeltonCardLoader />;
  }

  async function getTemplateCategory(url) {
    // setLoading(true);
    dispatch({ type: REQUEST_ACTION.INIT_LOADER, payload: { loader: true } });
    let _errorMessage;
    const LOCALE = DEFAULT_VALUE.LOCALE;
    try {
      const response = await getRequest(url);
      const { status } = response;
      const {
        data: { productDetails },
        success,
      } = response.data;
      if (success && status === RESPONSE_CODE[200]) {
        setCategoryData(productDetails);
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
  const handleOpenEditModal = () => {
    setOpenEditModal(true);
    getTemplateCategory(`${TEMPLATES_CATEGORY.GET_TEMPLATE}/${hoveredUserId}`);
  };

  return (
    <>
      <Box className={"web-content-card"}>
        <Card
          sx={{
            py: 5,
            boxShadow: 1,
            textAlign: "center",
            background:
              customization.navType === "dark"
                ? "#0e1522"
                : theme.palette.primary.light,
            ...sx,
          }}
          {...other}
        >
          <IconButton
            className="card_menu_icon"
            onClick={(event) => handlePopoverOpen(event, id)}
          >
            <Iconify icon="eva:more-vertical-outline" width={24} height={24} />
          </IconButton>

          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{
              vertical: "center",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "center",
              horizontal: "center",
            }}
            sx={{
              boxShadow: 8,
            }}
          >
            <div className="product_menu_item">
              <Link
                onClick={() => {
                  handleOpenEditModal();
                  handlePopoverClose();
                }}
                variant="contained"
                color="primary"
              >
                <Tooltip title="Edit" arrow placement="right">
                  <Iconify
                    icon="eva:edit-outline"
                    sx={{ color: "rgba(0, 0, 0, 0.54)" }}
                  />
                </Tooltip>
              </Link>
              <Link
                onClick={() => {setDeleteModal(true)
                  handlePopoverClose()
                }}
                variant="contained"
                color="success"
                style={{ paddingTop: "5px" }}
              >
                <Tooltip title="Delete" arrow placement="right">
                  <Iconify
                    icon="eva:trash-2-outline"
                    sx={{ color: "rgb(189 51 51)" }}
                  />
                </Tooltip>
              </Link>
            </div>
          </Popover>
          <NavLink
            style={{ textDecoration: "none" }}
            // to={`${ROUTE_SLUGS.TEMPLATE_GALLERY}/${title?.replace(/[\s/]+/g, "-").toLowerCase()}`}
            to={`#`}
            state={{ name: title }}
          >
            <StyledIcon
              sx={{
                color: (theme) => theme.palette[color].dark,
                backgroundImage: (theme) =>
                  `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
                    theme.palette[color].dark,
                    0.24
                  )} 100%)`,
              }}
            >
              {/* <Iconify icon={icon} width={24} height={24} /> */}
              <img src={icon} alt="icon" />
            </StyledIcon>

            <Typography
              variant="h5"
              sx={{
                color:
                  customization.navType === "dark"
                    ? theme.palette.primary.light
                    : "#0e1522",
              }}
            >
              {title}
            </Typography>
          </NavLink>
        </Card>
      </Box>
      <EditTemplateCatagory
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
        categoryData={categoryData}
        categoryListCallBack={categoryListCallBack}
      />
    </>
  );
}
