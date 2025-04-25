import { REQUEST_ACTION } from "../authenticate/actions";
const initialState = {
  loader: false,
  message: null,
  messageType: null,
};

function RequestReducer(STATE = initialState, action, reducerType = null) {
  switch (action.type) {
    case REQUEST_ACTION.PROCESSING:
      return {
        loader: true,
        message: null,
        messageType: null,
      };

    case REQUEST_ACTION.FAILURE:
      return {
        loader: false,
        message: action.payload.message,
        messageType: "error",
      };

    case REQUEST_ACTION.SUCCESS:
      return {
        loader: false,
        message: action.payload.message,
        messageType: "success",
      };

    case REQUEST_ACTION.INIT_LOADER:
      return { ...STATE, loader: action.payload.loader };

    default:
      return initialState;
  }
}

export default RequestReducer;
