import { CONSLE_ACTION } from "../authenticate/actions";
const initialState = {
  visibility: import.meta.env.VITE_APP_CONSOLE_LOG_VISIBILY?.toLowerCase() === 'true'?true:false,
  position: 'swipe-down',
  logs: {},
}

function ConsoleReducer(STATE = initialState, action, reducerType = null) {
  switch (action.type) {
    case CONSLE_ACTION.RE_POSITION:
      return { ...STATE, position: action.payload.position }
    case CONSLE_ACTION.LOGS:
      return { ...STATE, logs: action.payload.logs }
    default:
      return {...STATE};
  }
}

export default ConsoleReducer;