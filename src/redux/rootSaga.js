import { all } from "redux-saga/effects";
import authenticateSaga from "./authenticate/apiSaga";
import rootSagaImages from "layout/ImageModel/imagesRedux/SagaImageFunctions";
import rootSaga from "views/pages/Templates/TemplateRedux/SagaFunctions";

export default function* rootSagaMain() {
  yield all([authenticateSaga(), rootSaga(), rootSagaImages()]);
}
