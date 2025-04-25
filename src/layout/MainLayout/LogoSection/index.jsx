import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// material-ui
import ButtonBase from "@mui/material/ButtonBase";

// project imports
import config from "config";
import Logo from "ui-component/Logo";
import APP_LOGO from "../../../assets/images/new-logo.svg";
import { MENU_OPEN } from "redux/customization/actions";
import { ROUTE_SLUGS } from "app/constants";

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
  const defaultId = useSelector((state) => state.customization.defaultId);
  const dispatch = useDispatch();
  return (
    <ButtonBase
      disableRipple
      onClick={() => dispatch({ type: MENU_OPEN, id: defaultId })}
      component={Link}
      to={ROUTE_SLUGS.ROOT}
    >
      {/* <Logo /> */}
      <img src={APP_LOGO} alt="logo" />
    </ButtonBase>
  );
};

export default LogoSection;
