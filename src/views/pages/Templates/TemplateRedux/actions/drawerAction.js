import { GET_TEMPLATE_DETAILS_REQUEST, SELECTED, UPDATE } from "../constants";

export const drawerAction = (data) => ({
  type: SELECTED,
  payload: data,
});

export const getTemplateDetailsAction = (id) => ({
  type: GET_TEMPLATE_DETAILS_REQUEST,
  payload: id,
});

export const updateTemplateAction = (data) => ({
  type: UPDATE,
  payload: data,
});
