// @mui
import PropTypes from "prop-types";
import { alpha, styled } from "@mui/material/styles";
import { Card, Typography, useTheme } from "@mui/material";

// ----------------------------------------------------------------------

import { NavLink } from "react-router-dom";
import Iconify from "components/iconify";
import SkeltonCardLoader from "components/admin-ui/loader/SkeltonCardLoader";
import { useSelector } from "react-redux";
import { ROUTE_SLUGS } from "app/constants";

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

SelectedTemplateCard.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  sx: PropTypes.object,
};

export default function SelectedTemplateCard({
  isLoading,
  title,
  icon,
  color = "primary",
  sx,
  ...other
}) {
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);

  if (isLoading && isLoading !== undefined) {
    return <SkeltonCardLoader />;
  }

  return (
    <NavLink
      style={{ textDecoration: "none" }}
    //   to={`${ROUTE_SLUGS.PRODUCT_LIST}/${title?.replace(/[\s/]+/g, '-').toLowerCase()}`}
      className={"web-content-card"}
    >
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
          {icon ? (
            <img src={icon} alt="icon" className="icon_products" />
          ) : (
            <Iconify icon="ri:ghost-2-fill" width={24} height={24} />
          )}
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
          {/* {title} */}
          Are you the soul of a party?
        </Typography>
      </Card>
    </NavLink>
  );
}
