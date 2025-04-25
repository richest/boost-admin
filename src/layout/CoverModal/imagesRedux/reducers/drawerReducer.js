import { GET_IMAGES_LIST } from "../constants";

const initialState = {
  mediaLibrary: null,
};
function ImagesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_IMAGES_LIST:
      return {
        mediaLibrary: action.payload,
      };
    default:
      return initialState;
  }
}

export default ImagesReducer;
