import { createTheme } from "@mui/material/styles";

// assets
import colors from "assets/scss/_themes-vars.module.scss";

// project imports
import componentStyleOverrides from "./compStyleOverride";
import themePalette from "./palette";
import themeTypography from "./typography";

/**
 * Represent theme style and structure as per Material-UI
 * @param {JsonObject} customization customization parameter object
 */

export const theme = (customization) => {
  const color = colors;
  const mode = customization.navType;
  
  const themeOption = {
    colors: color,
    heading: color.grey900,
    paper: color.paper,
    // backgroundDefault: color.paper,
    // background: color.primaryLight,
    backgroundDefault:
      mode === "dark" ? color.darkBackground : color.lightBackground,
    background: mode === "dark" ? color.darkBackground : color.primaryLight,
    darkTextPrimary: color.grey700,
    darkTextSecondary: color.grey500,
    textDark: color.grey900,
    menuSelected: color.primaryLight,
    menuSelectedBack: "#20A2B8",
    divider: color.grey200,
    customization,
  };

  const themeOptions = {
    direction: "ltr",
    // palette: themePalette(themeOption),
    palette: themePalette({ ...themeOption, customization: { navType: mode } }),
    mixins: {
      toolbar: {
        minHeight: "48px",
        padding: "8px",
        "@media (min-width: 600px)": {
          minHeight: "48px",
        },
      },
    },
    typography: themeTypography(themeOption),
  };

  const themes = createTheme(themeOptions);
  themes.components = componentStyleOverrides(themeOption);

  return themes;
};

export default theme;
