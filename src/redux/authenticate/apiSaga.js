import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  STORAGE_INDEXES,
  RESPONSE_CODE,
  DEFAULT_VALUE,
} from "../../app/constants";

import { RESPONSE_MESSAGES } from "../../app/constants/localizedStrings";

import actions from "./actions";
import { APP_ACTIONS } from "./actions";
import {
  authUserData,
  loginFailure,
  defaultInitialState,
} from "../../utils/helpers";
import {
  AUTH,
  APP_SETTINGS,
  BOOKING_HISTORY,
} from "../../app/config/endpoints";
import {
  postRequest,
  posttRequest,
  getRequest,
} from "../../app/httpClient/axiosClient";
import {
  getFromLocalStorage,
  setOnLocalStorage,
} from "../../utils/localStorage";
import { AXIOS_ERROR_CODE } from "../../app/constants";

function* login(action) {
  try {
    const { status, data } = yield call(() =>
      postRequest(AUTH.login, {
        email: action.payload.email,
        password: action.payload.password,
        device_token: action.payload.device_token,
      })
    );
    if (status === RESPONSE_CODE[200] && data.success) {
      const _data = authUserData(data);
      setOnLocalStorage(STORAGE_INDEXES.APP_STORAGE, _data);
      yield put({
        type: actions.LOGIN_SUCCESS,
        payload: _data,
        index: actions.LOGIN_SUCCESS,
      });
    } 
  } catch (error) {
    /*
     * error exceptions cases
     */
    let _errorMessage;
    const LOCALE = DEFAULT_VALUE.LOCALE;
    const { response } = error;

    if (error.code === AXIOS_ERROR_CODE.ERR_NETWORK) {
      _errorMessage = RESPONSE_MESSAGES[LOCALE].NETWORK_ERROR;
    } else if (response && response.data) {
      const { data: responseData } = response;
      if (response.status === RESPONSE_CODE[400]) {
        const { message } = responseData;
        _errorMessage = message;
      } else {
        _errorMessage = RESPONSE_MESSAGES[LOCALE].UNKNOWN_ERROR_MESSAGE;
      }
    } else {
      _errorMessage = RESPONSE_MESSAGES[LOCALE].UNKNOWN_ERROR_MESSAGE;
    }
    const data = loginFailure(_errorMessage);
    yield put({
      type: actions.LOGIN_FAILURE,
      payload: data,
      index: actions.LOGIN_FAILURE,
    });
  }
}

function* register(action) {
  try {
    const response = yield call(() => posttRequest("register", action.payload));
    yield put({ type: actions.REGISTER_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: actions.REGISTER_FAILURE });
    if (error.response.status === 422) {
      alert(error.response.data.errors.join(","));
    } else {
      alert("Something Went Wrong");
    }
  }
}

function* getAuthUser() {
  try {
    const response = yield call(() => getRequest("auth/user"));
    yield put({ type: actions.GET_AUTH_USER_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: actions.GET_AUTH_USER_FAILURE });
  }
}

function* updateProfile(action) {
  const _data = action.payload;
  setOnLocalStorage(STORAGE_INDEXES.APP_STORAGE, _data);
}

function* gettingRoles() {
  try {
    const response = yield call(() => getRequest(APP_SETTINGS.ROLE_LIST));
    const {
      status,
      data: { data, success },
    } = response;

    if (success && status === RESPONSE_CODE[200]) {
      const _data = getFromLocalStorage(STORAGE_INDEXES.APP_STORAGE);
      _data[STORAGE_INDEXES.APP_SETTINGS][STORAGE_INDEXES.ROLE_LIST] = data;
      setOnLocalStorage(STORAGE_INDEXES.APP_STORAGE, _data);
      yield put({
        type: APP_ACTIONS.GETTING_ROLES_SUCCESS,
        index: STORAGE_INDEXES.ROLE_LIST,
        payload: _data,
      });
    } else {
    }
  } catch (error) {
    //yield put({ type: actions.GET_AUTH_USER_FAILURE });
  }
}

function* logout() {
  try {
    // const { status } = yield call(() => postRequest(AUTH.LOGOUT, {}));
    // if (status === RESPONSE_CODE[200]) {
    yield put({
      type: actions.LOGOUT_SUCCESS,
      index: actions.LOGIN_FAILURE,
      payload: defaultInitialState(STORAGE_INDEXES.APP_STORAGE),
    });
    // }
  } catch (error) {
    yield put({ type: actions.LOGOUT_FAILURE });
    if (error.code === "ERR_NETWORK") {
      return false;
    } else if (error.code === "ECONNABORTED") {
      return false;
    }
    if (error.response.status === 401) {
    } else if (error.response.status === 405) {
    } else {
    }
  }
}
function* logoutAll() {
  try {
    const { status } = yield call(() => postRequest(AUTH.LOGOUT_ALL, {}));
    if (status === RESPONSE_CODE[200]) {
      yield put({
        type: actions.LOGOUT_SUCCESS,
        index: actions.LOGIN_FAILURE,
        payload: defaultInitialState(STORAGE_INDEXES.APP_STORAGE),
      });
    }
  } catch (error) {
    yield put({ type: actions.LOGOUT_FAILURE });
    if (error.code === "ERR_NETWORK") {
      return false;
    } else if (error.code === "ECONNABORTED") {
      return false;
    }
    if (error.response.status === 401) {
    } else if (error.response.status === 405) {
    } else {
    }
  }
}

export default function* rootSaga() {
  yield all([takeLatest(actions.LOGIN, login)]);
  yield all([takeLatest(actions.LOGOUT, logout)]);
  yield all([takeLatest(actions.GET_AUTH_USER, getAuthUser)]);
  yield all([takeLatest(actions.REGISTER, register)]);
  yield all([takeLatest(actions.UPDATE_PROFILE, updateProfile)]);
  yield all([takeLatest(APP_ACTIONS.GETTING_ROLES, gettingRoles)]);
  yield all([takeLatest(actions.LOGOUT_ALL, logoutAll)]);
}
