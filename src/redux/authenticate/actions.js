const actions = {
  LOGIN: "LOGIN",
  INIT_LOADER: "INIT_LOADER",
  FAILURE: "FAILURE",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",
  AUTH_MESSAGE: "AUTH_MESSAGE",
  GET_AUTH_USER: "GET_AUTH_USER",
  GET_AUTH_USER_SUCCESS: "GET_AUTH_USER_SUCCESS",
  GET_AUTH_USER_FAILURE: "GET_AUTH_USER_FAILURE",
  LOGOUT: "LOGOUT",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
  LOGOUT_FAILURE: "LOGOUT_FAILURE",
  LOGOUT_ALL: "LOGOUT_ALL",
  LOGOUT_ALL_SUCCESS: "LOGOUT_ALL_SUCCESS",
  LOGOUT_ALL_FAILURE: "LOGOUT_ALL_FAILURE",
  REGISTER: "REGISTER",
  REGISTER_SUCCESS: "REGISTER_SUCCESS",
  REGISTER_FAILURE: "REGISTER_FAILURE",
  UPDATE_PROFILE: "UPDATE_PROFILE",
};

export default actions;

export const login = (
  email,
  password,
  device_token,
  loader,
  isAuthenticated
) => ({
  type: actions.LOGIN,
  index: actions.LOGIN,
  payload: { email, password, device_token, loader, isAuthenticated },
});

export const logout = () => ({
  type: actions.LOGOUT,
  index: actions.LOGOUT,
  payload: null,
});
export const logoutAll = () => ({
  type: actions.LOGOUT_ALL,
  index: actions.LOGOUT_ALL,
  payload: null,
});

export const APP_ACTIONS = {
  ROLES: "ROLES",
  GETTING_ROLES: "GETTING_ROLES",
  GETTING_ROLES_SUCCESS: "GETTING_ROLES_SUCCESS",
  INIT_NAV: "INIT_NAV",
  OPEN_NAV: "OPEN_NAV",
  CLOSE_NAV: "CLOSE_NAV",
};

export const gettingRoles = (payload) => ({
  type: APP_ACTIONS.GETTING_ROLES,
  index: APP_ACTIONS.GETTING_ROLES,
  payload: payload,
});
export const gettingToken = (payload) => ({
  type: TOKEN_ACTION.DEVICE_TOKEN,
  payload: payload,
});

export const REQUEST_ACTION = {
  INIT: "INIT",
  PROCESSING: "PROCESSING",
  FAILURE: "FAILURE",
  SUCCESS: "SUCCESS",
  INIT_LOADER: "INIT_LOADER",
};
export const NOTIFICATION_ACTION = {
  INIT: "INIT",
  SET: "SET",
};

export const CONSLE_ACTION = {
  INIT: "INIT",
  RE_POSITION: "RE_POSITION",
  LOGS: "LOGS",
};

export const FILTER_OPTIONS = {
  USERS: "USERS",
  BLOGS: "BLOGS",
  DESTINATION: "DESTINATION",
  CONTACT_US: "CONTACT_US",
  ENQUERY: "ENQUERY",
  BOOKING: "BOOKING",
  ITINERARY: "ITINERARY",
  WTDR_REQUEST: "WTDR_REQUEST",
  PAYMENT: "PAYMENT",
  INIT: "INIT",
  RE_POSITION: "RE_POSITION",
  LOGS: "LOGS",
  WAITING_LIST: "WAITING_LIST",
};
export const TOKEN_ACTION = {
  DEVICE_TOKEN: "DEVICE_TOKEN",
};
