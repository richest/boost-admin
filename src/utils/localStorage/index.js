import { STORAGE_INDEXES } from "../../app/constants";
import { defaultFlterInitialState, defaultInitialState, defaultTemplateState } from "../helpers";
import { defaultNavInitialState } from "../helpers";
export function setOnLocalStorage(index, data) {
  data = JSON.stringify(data);
  return localStorage.setItem(index, data);
}

export function removeFromLocalStorage(key) {
  return localStorage.removeItem(key);
}

export function getFromLocalStorage(index) {
  return JSON.parse(localStorage.getItem(index));
}

export function setInitialState() {
  const _initialStates = JSON.parse(
    localStorage.getItem(STORAGE_INDEXES.APP_STORAGE)
  );
  return _initialStates === null
    ? defaultInitialState(STORAGE_INDEXES.APP_STORAGE)
    : _initialStates;
}


export function setInitialTemplateState() {
    const _initialStates = JSON.parse(
      localStorage.getItem(STORAGE_INDEXES.TEMPLATE)
    );
    return _initialStates === null
      ? defaultTemplateState(STORAGE_INDEXES.TEMPLATE)
      : _initialStates;
  }

export function setFilterInitialState() {
  const _initialStates = JSON.parse(
    localStorage.getItem(STORAGE_INDEXES.FILTER_OPTION_STORAGE_KEY)
  );
  return _initialStates === null
    ? defaultFlterInitialState(STORAGE_INDEXES.FILTER_OPTION_STORAGE_KEY)
    : _initialStates;
}

export function getInitialState() {
  return JSON.parse(localStorage.getItem(STORAGE_INDEXES.APP_STORAGE));
}

export function navSettingsInitialState() {
  const _initialStates = JSON.parse(
    localStorage.getItem(STORAGE_INDEXES.NAV_SETTINGS)
  );
  return _initialStates === null
    ? defaultNavInitialState(STORAGE_INDEXES.NAV_SETTINGS)
    : _initialStates;
}
