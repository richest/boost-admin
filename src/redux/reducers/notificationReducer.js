import { NOTIFICATION_ACTION } from "../authenticate/actions";
const initialState = {
    data: {
        typeMode: '',
    }
}

function NotificationReducer(STATE = initialState, action, reducerType = null) {
    switch (action.type) {
        case NOTIFICATION_ACTION.SET:
            STATE = action.payload
            return STATE;

        default:
            return STATE;
    }
}

export default NotificationReducer;