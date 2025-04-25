import { STORAGE_INDEXES } from "../../app/constants";
export function defaultInitialState(LOCAL_STORAGE_KEY) {
  localStorage.clear();
  let DEFAULT_INITIAL_STATES = {};
  DEFAULT_INITIAL_STATES[STORAGE_INDEXES.IS_AUTHENTICATED] = false;
  DEFAULT_INITIAL_STATES[STORAGE_INDEXES.LOADER] = false;
  DEFAULT_INITIAL_STATES[STORAGE_INDEXES.EMAIL] = null;
  DEFAULT_INITIAL_STATES[STORAGE_INDEXES.NAME] = null;
  DEFAULT_INITIAL_STATES[STORAGE_INDEXES.FIRST_NAME] = null;
  DEFAULT_INITIAL_STATES[STORAGE_INDEXES.LAST_NAME] = null;
  DEFAULT_INITIAL_STATES[STORAGE_INDEXES.ERROR_MESSAGE] = { auth: null };
  DEFAULT_INITIAL_STATES[STORAGE_INDEXES.ACCESS_TOKEN] = null;
  DEFAULT_INITIAL_STATES[STORAGE_INDEXES.USER_ID] = 0;
  DEFAULT_INITIAL_STATES[STORAGE_INDEXES.USER_ROLE] = null;
  DEFAULT_INITIAL_STATES[STORAGE_INDEXES.PROFILE_PICTURE] = null;
  DEFAULT_INITIAL_STATES[STORAGE_INDEXES.PHONE] = null;
  DEFAULT_INITIAL_STATES[STORAGE_INDEXES.COUNTRY_DIAL_CODE] = null;
  DEFAULT_INITIAL_STATES[STORAGE_INDEXES.COUNTRY_ISO] = null;

  let APP_SETTINGS = {};
  APP_SETTINGS[STORAGE_INDEXES.ROLE_LIST] = {};
  DEFAULT_INITIAL_STATES[STORAGE_INDEXES.APP_SETTINGS] = APP_SETTINGS;
  localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify(DEFAULT_INITIAL_STATES)
  );
  return DEFAULT_INITIAL_STATES;
}



export function defaultTemplateState(LOCAL_STORAGE_KEY) {
  localStorage.clear();
  let DEFAULT_INITIAL_STATES = {};
  DEFAULT_INITIAL_STATES[STORAGE_INDEXES.TEMPLATE] = null;

  let APP_SETTINGS = {};
  APP_SETTINGS[STORAGE_INDEXES.ROLE_LIST] = {};
  DEFAULT_INITIAL_STATES[STORAGE_INDEXES.APP_SETTINGS] = APP_SETTINGS;
  localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify(DEFAULT_INITIAL_STATES)
  );
  return DEFAULT_INITIAL_STATES;
}

export function authUserData({ data }) {
  let AUTH_USER_DATA = {};
  // const profileImage = data[STORAGE_INDEXES.PROFILE_PICTURE];
  const profileImage = data?.profilePicture;
  AUTH_USER_DATA[STORAGE_INDEXES.IS_AUTHENTICATED] = true;
  AUTH_USER_DATA[STORAGE_INDEXES.LOADER] = false;
  AUTH_USER_DATA[STORAGE_INDEXES.EMAIL] = data[STORAGE_INDEXES.EMAIL];
  AUTH_USER_DATA[STORAGE_INDEXES.NAME] = data[STORAGE_INDEXES.NAME];
  AUTH_USER_DATA[STORAGE_INDEXES.FIRST_NAME] = data[STORAGE_INDEXES.FIRST_NAME];
  AUTH_USER_DATA[STORAGE_INDEXES.LAST_NAME] = data[STORAGE_INDEXES.LAST_NAME];
  AUTH_USER_DATA[STORAGE_INDEXES.ERROR_MESSAGE] = { auth: null };
  AUTH_USER_DATA[STORAGE_INDEXES.ACCESS_TOKEN] =
    data[STORAGE_INDEXES.ACCESS_TOKEN];
  AUTH_USER_DATA[STORAGE_INDEXES.PHONE] = data[STORAGE_INDEXES.PHONE];
  AUTH_USER_DATA[STORAGE_INDEXES.COUNTRY_DIAL_CODE] =
    data[STORAGE_INDEXES.COUNTRY_DIAL_CODE];

  AUTH_USER_DATA[STORAGE_INDEXES.COUNTRY_ISO] =
    data[STORAGE_INDEXES.COUNTRY_ISO];
  AUTH_USER_DATA[STORAGE_INDEXES.USER_ID] = data[STORAGE_INDEXES.USER_ID];
  AUTH_USER_DATA[STORAGE_INDEXES.USER_ROLE] = data[STORAGE_INDEXES.USER_ROLE];
  AUTH_USER_DATA[STORAGE_INDEXES.PROFILE_PICTURE] =
    profileImage !== undefined ? profileImage : null;
  let APP_SETTINGS = {};
  APP_SETTINGS[STORAGE_INDEXES.ROLE_LIST] = {};
  AUTH_USER_DATA[STORAGE_INDEXES.APP_SETTINGS] = APP_SETTINGS;
  return AUTH_USER_DATA;
}

export function loginFailure(errorMessage) {
  let AUTH_USER_DATA = {};
  AUTH_USER_DATA[STORAGE_INDEXES.IS_AUTHENTICATED] = false;
  AUTH_USER_DATA[STORAGE_INDEXES.LOADER] = false;
  AUTH_USER_DATA[STORAGE_INDEXES.EMAIL] = null;
  AUTH_USER_DATA[STORAGE_INDEXES.NAME] = null;
  AUTH_USER_DATA[STORAGE_INDEXES.FIRST_NAME] = null;
  AUTH_USER_DATA[STORAGE_INDEXES.LAST_NAME] = null;
  AUTH_USER_DATA[STORAGE_INDEXES.ERROR_MESSAGE] = { auth: errorMessage };
  AUTH_USER_DATA[STORAGE_INDEXES.ACCESS_TOKEN] = null;
  AUTH_USER_DATA[STORAGE_INDEXES.USER_ID] = 0;
  AUTH_USER_DATA[STORAGE_INDEXES.USER_ROLE] = null;
  AUTH_USER_DATA[STORAGE_INDEXES.PHONE] = null;
  AUTH_USER_DATA[STORAGE_INDEXES.COUNTRY_DIAL_CODE] = null;
  AUTH_USER_DATA[STORAGE_INDEXES.COUNTRY_ISO] = null;
  return AUTH_USER_DATA;
}

export function defaultNavInitialState(LOCAL_STORAGE_KEY) {
  const DEFAULT_NAV_SETTINGS = {
    navWidth: 280,
    isNavCollapsed: false,
    isDesktop: true,
  };
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_NAV_SETTINGS));

  return DEFAULT_NAV_SETTINGS;
}

export function defaultFlterInitialState(LOCAL_STORAGE_KEY) {
  let DEFAULT_INITIAL_STATES = {
    user: {
      role_id: null,
      page_no: 0,
      number_of_rows: 10,
      search_text: null,
      srNo: 1,
    },
    blog: {
      status: "",
      page_no: 0,
      number_of_rows: 10,
      search_text: null,
      srNo: 1,
    },
    destination: {
      destination_status: "",
      page_no: 0,
      number_of_rows: 10,
      search_text: null,
      srNo: 1,
    },
    contact_us: {
      page_no: 0,
      number_of_rows: 10,
      search_text: null,
      srNo: 1,
    },
    enquery: { page_no: 0, number_of_rows: 10, search_text: null, srNo: 1 },
    booking: { page_no: 0, number_of_rows: 10, search_text: null, srNo: 1 },
    wtdr_request: {
      status: "",
      page_no: 0,
      number_of_rows: 10,
      search_text: null,
      srNo: 1,
    },
    payment: {
      status: "",
      page_no: 0,
      number_of_rows: 10,
      search_text: null,
      srNo: 1,
    },
    waiting_list: {
      status: "",
      page_no: 0,
      number_of_rows: 10,
      search_text: null,
      srNo: 1,
    },
  };

  localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify(DEFAULT_INITIAL_STATES)
  );
  return DEFAULT_INITIAL_STATES;
}


export const generateShortId = (length = 8) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};