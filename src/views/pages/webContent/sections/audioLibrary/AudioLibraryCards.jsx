// @mui
import PropTypes from "prop-types";
import { alpha, styled } from "@mui/material/styles";
import { Card, Typography, useTheme } from "@mui/material";

// ----------------------------------------------------------------------

import { NavLink } from "react-router-dom";
import Iconify from "components/iconify";
import SkeltonCardLoader from "components/admin-ui/loader/SkeltonCardLoader";
import { useSelector } from "react-redux";

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

AudioLibraryCards.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  sx: PropTypes.object,
};

export default function AudioLibraryCards({
  isLoading,
  path,
  title,
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
      to={path}
      state={{ category: title.replace(/[\s/]+/g, "-").toLowerCase() }}
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
        {/* <StyledIcon
          sx={{
            color: (theme) => theme.palette[color].dark,
            backgroundImage: (theme) =>
              `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
                theme.palette[color].dark,
                0.24
              )} 100%)`,
          }}
        >
          <Iconify icon={icon} width={24} height={24} />
        </StyledIcon> */}

        <Iconify
          icon="lsicon:folder-filled"
          width={30}
          height={30}
          style={{ color: "#20a2b8" }}
        />

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
