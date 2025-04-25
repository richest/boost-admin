import { all } from "redux-saga/effects";
import { getTemplateDetailsAction } from "views/pages/Templates/TemplateRedux/actions/drawerAction";

export default function* RootSaga() {
  yield all([getTemplateDetailsAction()]);
}
