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

import { Link, NavLink } from "react-router-dom";
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
  handleCreateTemplate,
  ...other
}) {
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);

  const open = Boolean(anchorEl);

  if (isLoading && isLoading !== undefined) {
    return <SkeltonCardLoader />;
  }

  return (
    <Button
      style={{ textDecoration: "none" }}
      // to={`/dashboard/templates/create/${title
      //   .replace(/[\s/]+/g, "-")
      //   .toLowerCase()}`}
      onClick={()=>handleCreateTemplate(id, title)}
      className={"web-content-card w-100"}
      sx={{width: '100%', display: 'block'}}
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
        className="w-100"
        {...other}
      >
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
    </Button>
  );
}
