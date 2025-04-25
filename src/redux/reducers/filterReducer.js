import {
  setOnLocalStorage,
  setFilterInitialState,
} from "../../utils/localStorage";
import { FILTER_OPTIONS } from "../authenticate/actions";
import { STORAGE_INDEXES } from "../../app/constants";
const initialState = setFilterInitialState();

function filterReducer(STATE = initialState, action, reducerType = null) {
  let _STATE;
  switch (action.type) {
    case FILTER_OPTIONS.USERS:
      _STATE = { ...STATE, user: action.payload.value };
      setOnLocalStorage(STORAGE_INDEXES.FILTER_OPTION_STORAGE_KEY, _STATE);
      return _STATE;
    case FILTER_OPTIONS.BLOGS:
      _STATE = { ...STATE, blog: action.payload.value };
      setOnLocalStorage(STORAGE_INDEXES.FILTER_OPTION_STORAGE_KEY, _STATE);
      return _STATE;
    case FILTER_OPTIONS.DESTINATION:
      _STATE = { ...STATE, destination: action.payload.value };
      setOnLocalStorage(STORAGE_INDEXES.FILTER_OPTION_STORAGE_KEY, _STATE);
      return _STATE;
    case FILTER_OPTIONS.CONTACT_US:
      _STATE = { ...STATE, contact_us: action.payload.value };
      setOnLocalStorage(STORAGE_INDEXES.FILTER_OPTION_STORAGE_KEY, _STATE);
      return _STATE;
    case FILTER_OPTIONS.ENQUERY:
      _STATE = { ...STATE, enquery: action.payload.value };
      setOnLocalStorage(STORAGE_INDEXES.FILTER_OPTION_STORAGE_KEY, _STATE);
      return _STATE;
    case FILTER_OPTIONS.BOOKING:
      _STATE = { ...STATE, booking: action.payload.value };
      setOnLocalStorage(STORAGE_INDEXES.FILTER_OPTION_STORAGE_KEY, _STATE);
      return _STATE;
    case FILTER_OPTIONS.WTDR_REQUEST:
      _STATE = { ...STATE, wtdr_request: action.payload.value };
      setOnLocalStorage(STORAGE_INDEXES.FILTER_OPTION_STORAGE_KEY, _STATE);
      return _STATE;
    case FILTER_OPTIONS.PAYMENT:
      _STATE = { ...STATE, payment: action.payload.value };
      setOnLocalStorage(STORAGE_INDEXES.FILTER_OPTION_STORAGE_KEY, _STATE);
      return _STATE;
    case FILTER_OPTIONS.ITINERARY:
      _STATE = { ...STATE, itinerary: action.payload.value };
      setOnLocalStorage(STORAGE_INDEXES.FILTER_OPTION_STORAGE_KEY, _STATE);
      return _STATE;
    case FILTER_OPTIONS.WAITING_LIST:
      _STATE = { ...STATE, waiting_list: action.payload.value };
      setOnLocalStorage(STORAGE_INDEXES.FILTER_OPTION_STORAGE_KEY, _STATE);
      return _STATE;
    default:
      return STATE;
  }
}

export default filterReducer;
