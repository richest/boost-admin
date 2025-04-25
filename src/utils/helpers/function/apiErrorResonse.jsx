import { AXIOS_ERROR_CODE, DEFAULT_VALUE, STORAGE_INDEXES, RESPONSE_CODE } from "../../../app/constants";
import { RESPONSE_MESSAGES } from "../../../app/constants/localizedStrings";
import { defaultInitialState } from "..";

export const ApiErrorMessage = (error) => {
    const LOCALE = DEFAULT_VALUE.LOCALE
    if (!error) return RESPONSE_MESSAGES[LOCALE].UNKNOWN_ERROR_MESSAGE;
    let errorMessage;
    if (error.code === AXIOS_ERROR_CODE.ERR_NETWORK) {
        return RESPONSE_MESSAGES[LOCALE].NETWORK_ERROR;
    } else if (error.code === AXIOS_ERROR_CODE.ECONNABORTED) {
        return RESPONSE_MESSAGES[LOCALE].ECONNABORTED;
    } else if (error.code === AXIOS_ERROR_CODE.ERR_BAD_REQUEST) {
        const { statusCode } = error.response.data;
        if (statusCode === RESPONSE_CODE[401]) {
            defaultInitialState(STORAGE_INDEXES.APP_STORAGE)
            window.location.href = "/"
        }
        return `${error.response.data?.message}`;
    } else {
        const { response } = error;

        if (response && response.data) {
            const { data: responseData } = response;
            if (response.status === RESPONSE_CODE[400]) {
                const { message } = responseData;
                return message;
            } else if (response.status === RESPONSE_CODE[404]) {
                return RESPONSE_MESSAGES[LOCALE].NOT_FOUND_404;
            } else if (response.status === RESPONSE_CODE[500]) {
                return RESPONSE_MESSAGES[LOCALE].INTERNAL_SERVER_ERROR;
            } else if (response.status === RESPONSE_CODE[401]) {
                defaultInitialState(STORAGE_INDEXES.APP_STORAGE)
                window.location.href = "/"
                return RESPONSE_MESSAGES[LOCALE].SESSION_EXPIRE_MESSAGE;
            }
        } else {
            return RESPONSE_MESSAGES[LOCALE].UNKNOWN_ERROR_MESSAGE;
        }
    }
    return errorMessage;
}