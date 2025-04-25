import actions from "redux/authenticate/actions";
import {
  GET_TEMPLATE_DETAILS_REQUEST,
  GET_TEMPLATE_DETAILS_SUCCESS,
  SELECTED,
  SELECTED_SUCCESS,
  UPDATE,
  UPDATE_SUCCESS,
} from "../constants";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { TEMPLATES } from "app/config/endpoints";
import {
  getRequest,
  postRequest,
  putRequest,
} from "app/httpClient/axiosClient";
import { RESPONSE_CODE, STORAGE_INDEXES } from "app/constants";
import { setOnLocalStorage } from "utils/localStorage";

export function* selectedDrawer({ payload }) {
  yield put({ type: actions.INIT_LOADER, payload: { loader: true } });
  try {
    yield put({
      type: SELECTED_SUCCESS,
      payload: payload,
    });
  } catch (error) {
    yield put({
      type: actions.FAILURE,
      payload: error,
    });
  }
}

export function* getTemplateDetails({ payload }) {
  yield put({ type: actions.INIT_LOADER, payload: { loader: true } });

  try {
    const response = yield call(() =>
      getRequest(`${TEMPLATES.GET_TEMPLATE}/${payload}`)
    );
    const {
      status,
      data: { data, success },
    } = response;

    if (status === RESPONSE_CODE[200] && success) {
      const _data = data.templateDetails;

      console.log(_data, "checkdataHrerererer");
      setOnLocalStorage(STORAGE_INDEXES.TEMPLATE, _data);
      yield put({
        type: GET_TEMPLATE_DETAILS_SUCCESS,
        payload: data.templateDetails,
      });
    }
  } catch (error) {
    console.error(error);
    yield put({
      type: actions.FAILURE,
      payload: error,
    });
  }
  yield put({ type: actions.INIT_LOADER, payload: { loader: false } });
}

export function* updateTemplate(action) {
  try {
    const _data = action.payload;
    setOnLocalStorage(STORAGE_INDEXES.TEMPLATE, _data);
    yield put({
      type: UPDATE_SUCCESS,
      payload: _data,
    });
  } catch (error) {
    console.log(error);
  }
}

export default function* rootSaga() {
  yield all([takeLatest(SELECTED, selectedDrawer)]);
  yield all([takeLatest(GET_TEMPLATE_DETAILS_REQUEST, getTemplateDetails)]);
  yield all([takeLatest(UPDATE, updateTemplate)]);
}
