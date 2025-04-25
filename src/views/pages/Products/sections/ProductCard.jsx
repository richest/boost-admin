// @mui
import PropTypes from "prop-types";
import { alpha, styled } from "@mui/material/styles";
import {
  Card,
  Typography,
  useTheme,
  Popover,
  IconButton,
  Button,
  Tooltip,
} from "@mui/material";

// ----------------------------------------------------------------------

import { Link, NavLink, useNavigate } from "react-router-dom";
import Iconify from "components/iconify";
import SkeltonCardLoader from "components/admin-ui/loader/SkeltonCardLoader";
import { useSelector } from "react-redux";
import { useState } from "react";
import { ROUTE_SLUGS } from "app/constants";
import { padding } from "@mui/system";

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

ProductCard.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  sx: PropTypes.object,
};

export default function ProductCard({
  isLoading,
  path,
  title,
  icon,
  color = "primary",
  sx,
  handleDelete,
  handleOpenMenu,
  handlePopoverOpen,
  handlePopoverClose,
  id,
  hoveredUserId,
  anchorEl,
  ...other
}) {
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);
  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  if (isLoading && isLoading !== undefined) {
    return <SkeltonCardLoader />;
  }

  return (
    <NavLink
      style={{ textDecoration: "none" }}
      to={"#"}
      className={"web-content-card"}
    >
      <Card
        sx={{
          py: 5,
          boxShadow: 1,
          textAlign: "center",
          background:
            customization.navType === "dark"
              ? "#103C65"
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
        >
          <div className="product_menu_item">
            <Link
              to={`${ROUTE_SLUGS.PRODUCTS_LIST}/${hoveredUserId}`}
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
            {/* <Link
              variant="contained"
              color="secondary"
              fullWidth
              style={{padding: "5px 0"}}
            >
              <Tooltip title="View" arrow placement="right">
                <Iconify
                  icon="eva:eye-outline"
                  sx={{ color: "rgb(52 153 193)" }}
                />
              </Tooltip>
            </Link> */}
            <Link
              onClick={() => {
                handleDelete();
                handlePopoverClose();
              }}
              variant="contained"
              color="success"
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
        {/* Styled Icon with popover trigger */}
        <StyledIcon
          className="product_card_icon"
          // Open popover on click
          sx={{
            color: (theme) => theme.palette[color].light,
            backgroundImage: (theme) =>
              `linear-gradient(135deg, ${alpha(theme.palette[color].light, 0)} 0%, ${alpha(
                theme.palette[color].light,
                0.24
              )} 100%)`,
          }}
        >
          {icon ? (
            <img src={icon} alt="icon" className="icon_products" />
          ) : (
            <Iconify icon="eva:more-vertical-outline" width={24} height={70} />
          )}
        </StyledIcon>

        {/* Popover component */}

        <Typography
          variant="h4"
          sx={{
            color:
              customization.navType === "dark"
                ? theme.palette.primary.light
                : "#0e1522",
          }}
        >
          {title}
        </Typography>
      </Card>
    </NavLink>
  );
}
