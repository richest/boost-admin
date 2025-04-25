import { APP_ACTIONS } from "../authenticate/actions";
import { navSettingsInitialState } from "../../utils/localStorage";
import { STORAGE_INDEXES } from "../../app/constants";

// const initialState = {
//     navWidth: 280,
//     isNavCollapsed: false,
//     isDesktop: true,
// }

function AppReducer(
  STATE = navSettingsInitialState(),
  action,
  reducerType = null
) {
  let _STATE;
  switch (action.type) {
    case APP_ACTIONS.INIT_NAV:
      _STATE = { navWidth: 280, isNavCollapsed: false, isDesktop: true };
      localStorage.setItem(
        STORAGE_INDEXES.NAV_SETTINGS,
        JSON.stringify(_STATE)
      );
      return _STATE;
    case APP_ACTIONS.OPEN_NAV:
      _STATE = { navWidth: 280, isNavCollapsed: false, isDesktop: true };
      localStorage.setItem(
        STORAGE_INDEXES.NAV_SETTINGS,
        JSON.stringify(_STATE)
      );
      return _STATE;
    case APP_ACTIONS.CLOSE_NAV:
      _STATE = { navWidth: 80, isNavCollapsed: true, isDesktop: false };
      localStorage.setItem(
        STORAGE_INDEXES.NAV_SETTINGS,
        JSON.stringify(_STATE)
      );
      return _STATE;
    default:
      return STATE;
  }
}

export default AppReducer;
