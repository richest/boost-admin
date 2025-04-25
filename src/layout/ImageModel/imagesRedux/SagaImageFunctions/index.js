import actions from "redux/authenticate/actions";
import { GET_IMAGES_LIST } from "../constants";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { getRequest } from "app/httpClient/axiosClient";
import { MEDIA_LIBRARY } from "app/config/endpoints";

export function* getMediaImages() {
  alert("called Images")
  yield put({ type: actions.INIT_LOADER, payload: { loader: true } });
  try {
    const response = yield call(() => getRequest(MEDIA_LIBRARY.MEDIA_LIST));
    const {
      status,
      data: { data, success },
    } = response;
    if (status === RESPONSE_CODE[200] && data.success) {
      // const _data = authUserData(data);
      // setOnLocalStorage(STORAGE_INDEXES.APP_STORAGE, _data);
      console.log("data ok")
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: actions.FAILURE,
      payload: error,
    });
  }
}

export default function* rootSaga() {
  yield all([takeLatest(GET_IMAGES_LIST, getMediaImages())]);
}
