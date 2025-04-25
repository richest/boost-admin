import { useDispatch, useSelector } from "react-redux";
import "react-quill/dist/quill.snow.css";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, StyledEngineProvider } from "@mui/material";

import themes from "themes";

import NavigationScroll from "layout/NavigationScroll";
import AppRoutes from "routes";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { SET_MENU } from "redux/customization/actions";

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth || {});
  const customization = useSelector((state) => state.customization);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    NProgress.start();
    NProgress.done();
    return () => {
      NProgress.done();
    };
  }, [location]);

  useEffect(() => {
    if (location?.pathname.includes("/dashboard/templates/create")) {
      dispatch({ type: SET_MENU, opened: false });
    }
  }, [location]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          <AppRoutes isAuthenticated={isAuthenticated} />
        </NavigationScroll>
        <Toaster position="top-center" />
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
