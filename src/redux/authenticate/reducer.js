import actions from "./actions.js";
import { setInitialState } from "../../utils/localStorage";

const initialState = setInitialState();
function Reducer(state = initialState, action) {
  if (action.index !== undefined) {
    if (action.index === actions.LOGIN) {
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
        loader: true,
      };
    }
    return action.payload;
  }
  return state;
}

export default Reducer;
