import { TOKEN_ACTION } from "../authenticate/actions";

function TokenReducer(state = '', action) {
  switch (action.type) {
    case TOKEN_ACTION.DEVICE_TOKEN:
      return action.payload
    default:
      return state;
  }
}

export default TokenReducer;