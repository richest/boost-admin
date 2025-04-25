import {
  getFromLocalStorage,
  setInitialTemplateState,
} from "utils/localStorage";
import {
  GET_TEMPLATE_DETAILS_REQUEST,
  GET_TEMPLATE_DETAILS_SUCCESS,
  SELECTED,
  SELECTED_SUCCESS,
  UPDATE,
  UPDATE_SUCCESS,
} from "../constants";
import { STORAGE_INDEXES } from "app/constants";

const initialState = {
  element: null,
  templateDetails: null,
};

function DrawerReducer(state = initialState, action) {
  console.log(action.payload, "checekkdskdsdsjdbsjdskdds");
  switch (action.type) {
    case SELECTED:
      return {
        ...state,
      };
    case SELECTED_SUCCESS:
      return {
        ...state,
        element: action.payload,
      };
    case GET_TEMPLATE_DETAILS_REQUEST:
      return {
        ...state,
      };
    case GET_TEMPLATE_DETAILS_SUCCESS:
      return {
        ...state,
        templateDetails: getFromLocalStorage(STORAGE_INDEXES.TEMPLATE),
      };
    case UPDATE:
      return {
        ...state,
      };
    case UPDATE_SUCCESS:
      return {
        ...state,
        templateDetails: action.payload,
      };
    default:
      return state;
  }
}

export default DrawerReducer;
