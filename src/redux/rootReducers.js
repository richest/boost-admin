import { combineReducers } from "redux";
import authenticateReducer from "./authenticate/reducer";
import RequestReducer from "./reducers/requestReducer";
import ConsoleReducer from "./reducers/consoleReducer";
import AppReducer from "./reducers/appReducer";
import filterReducer from "./reducers/filterReducer";
import TokenReducer from "./reducers/tokenReducer";
import NotificationReducer from "./reducers/notificationReducer";
import customizationReducer from "./customization/customizationReducer";
import DrawerReducer from "views/pages/Templates/TemplateRedux/reducers/drawerReducer";
import ImagesReducer from "layout/ImageModel/imagesRedux/reducers/drawerReducer";

const rootReducer = combineReducers({
  auth: authenticateReducer,
  request: RequestReducer,
  console: ConsoleReducer,
  app: AppReducer,
  filterOptions: filterReducer,
  device_token: TokenReducer,
  notification: NotificationReducer,
  customization: customizationReducer,
  DrawerReducer: DrawerReducer,
  ImagesReducer: ImagesReducer,
});

export default rootReducer;
