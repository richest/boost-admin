export const BASEURL = import.meta.env.VITE_APP_HOST_URL;
export const PREFIX = "/admin";
export const SAMPLE_API = `${BASEURL}${PREFIX}/sample-api`;
export const COMMON_ENDPOINTS = {
  UPLOAD_FILE: `${BASEURL}${PREFIX}/upload-image`,
};

export const AUTH = {
  login: `${BASEURL}${PREFIX}/login`,
  LOGIN: `${BASEURL}${PREFIX}/login`,
  LOGOUT_ALL: `${BASEURL}${PREFIX}/logout-all-devices`,
  LOGOUT: `${BASEURL}${PREFIX}/logout`,
  FORGOT_PASSWORD: `${BASEURL}${PREFIX}/forgot-password`,
  RESET_PASSWORD: `${BASEURL}${PREFIX}/reset-password`,
  UPDATE_PASSWORD: `${BASEURL}${PREFIX}/update-password`,
  UPDATE_PROFILE_IMAGE: `${BASEURL}${PREFIX}/update-profile-image`,
  REMOVE_PROFILE_IMAGE: `${BASEURL}${PREFIX}/remove-profile-image`,
  UPDATE_PROFILE: `${BASEURL}${PREFIX}/update-profile`,
};

export const COUNTS = {
  GET_COUNTS: `${BASEURL}${PREFIX}/counts`,
};

export const USERS = {
  CREATE: `${BASEURL}${PREFIX}/add-user`,
  LIST: `${BASEURL}${PREFIX}/fetch-all-users`,
  SEARCH_USER: `${BASEURL}${PREFIX}/search-user`,
  AGGREGATES: `${BASEURL}${PREFIX}/users-count`,
  GET_USER: `${BASEURL}${PREFIX}/get-user`,
  PROFILE_VERIFY: `${BASEURL}${PREFIX}/verify-guide-profile`,
  UPDATE_STATUS: `${BASEURL}${PREFIX}/update-status`,
  DELETE_USER: `${BASEURL}${PREFIX}/delete-user`,
  UNDO_DELETE_USER: `${BASEURL}${PREFIX}/undo-delete-single-user`,
  UPDATE_USER_DETAILS: `${BASEURL}${PREFIX}/update-user-details`,
  UPDATE_USER_TYPE: `${BASEURL}${PREFIX}/toggle-user-role`,
  UPDATE_USER_PROFILE_IMAGE: `${BASEURL}${PREFIX}/update-user-profile-image`,
  REMOVE_USER_PROFILE_IMAGE: `${BASEURL}${PREFIX}/delete-user-profile-image`,
  VALIDATE_START_TAG: `${BASEURL}${PREFIX}/add-star-tag`,
  UPDATE_POST: `${BASEURL}${PREFIX}/update-post`,
};

export const PRODUCTS = {
  CREATE: `${BASEURL}/products/create`,
  LIST: `${BASEURL}/products/all-products`,
  LIST_TYPE: `${BASEURL}/products/all-product-type`,
  GET_PRODUCT: `${BASEURL}/products/get`,
  UPDATE: `${BASEURL}/products/update`,
  DELETE: `${BASEURL}/products/delete`,
};

export const TEMPLATES = {
  CREATE: `${BASEURL}/templates/create`,
  LIST: `${BASEURL}/templates/all-admin-templates`,
  GET_TEMPLATE: `${BASEURL}/templates/get`,
  UPDATE: `${BASEURL}/templates/update`,
  DELETE: `${BASEURL}/templates/delete`,
  UPLOADIMAGE: `${BASEURL}/templates/update-details`,

};

export const TEMPLATES_CATEGORY = {
  CREATE: `${BASEURL}/category/create`,
  LIST: `${BASEURL}/category/all-categories`,
  GET_TEMPLATE: `${BASEURL}/category/get`,
  UPDATE: `${BASEURL}/category/update`,
  DELETE: `${BASEURL}/category/delete`,
};
export const SECTOR = {
  CREATE: `${BASEURL}/sector/create`,
  LIST: `${BASEURL}/sector/all-sectors`,
  GET_SECTOR: `${BASEURL}/sector/get`,
  UPDATE: `${BASEURL}/sector/update`,
  DELETE: `${BASEURL}/sector/delete`,
};

export const SUB_SECTOR = {
  CREATE: `${BASEURL}/sub-sector/create`,
  LIST: `${BASEURL}/sub-sector/all-sectors`,
  GET_SUB_SECTOR: `${BASEURL}/sub-sector/get`,
  UPDATE: `${BASEURL}/sub-sector/update`,
  DELETE: `${BASEURL}/sub-sector/delete`,
};

export const SUPPORT_ENQUERIES = {
  LIST: `${BASEURL}/support/all-inquires`,
  DELETE: `${BASEURL}/support`,
  UPDATE: `${BASEURL}/support/update`,
};
export const CONTACT_ENQUERIES = {
  LIST: `${BASEURL}/contact-inquiry/all-inquires`,
  DELETE: `${BASEURL}/contact-inquiry`,
  UPDATE: `${BASEURL}/contact-inquiry/update`,
};

export const BLOGS = {
  CREATE: `${BASEURL}${PREFIX}/create-blog`,
  LIST: `${BASEURL}${PREFIX}/get-blogs`,
  GET_BLOG: `${BASEURL}${PREFIX}/get-blog`,
  UPDATE: `${BASEURL}${PREFIX}/update-blog`,
  DELETE: `${BASEURL}${PREFIX}/delete-blog`,
};
export const POSTS = {
  CREATE: `${BASEURL}${PREFIX}/create-post`,
  LIST: `${BASEURL}${PREFIX}/get-posts`,
  GET_POST: `${BASEURL}${PREFIX}/get-post-detail`,
  UPDATE: `${BASEURL}${PREFIX}/update-post`,
  DELETE: `${BASEURL}${PREFIX}/delete-post`,
  STATUS: `${BASEURL}${PREFIX}/change-status`,
};
export const ENQUERIES = {
  LIST: `${BASEURL}${PREFIX}/fetch-enqueries`,
};
export const WEB_CONTENT = {
  GET: `${BASEURL}/content/get-web-content`,
  UPDATE: `${BASEURL}/content/update-web-content`,
  UPLOAD_IMAGE: `${BASEURL}${PREFIX}/upload-image`,
  DELETE_IMAGE: `${BASEURL}${PREFIX}/delete-image`,
  UPLOAD_AUDIO: `${BASEURL}/audio/create`,
  DELETE_AUDIO: `${BASEURL}/audio/delete`
};
export const MESSAGES = {
  INBOX: `${BASEURL}${PREFIX}/inbox-chat-list`,
  SENT: `${BASEURL}${PREFIX}/sent-chat-list`,
  LIST: `${BASEURL}${PREFIX}/eligible-chat-users`,
  COMPOSE: `${BASEURL}${PREFIX}/send-compose-message`,
  DELETE: `${BASEURL}${PREFIX}/delete-chat-list`,
  CHAT: `${BASEURL}${PREFIX}/get-chat-messages`,
  REPLY: `${BASEURL}${PREFIX}/reply-chat`,
  VOICE_MESSAGE: `${BASEURL}${PREFIX}/send-voice-message`,
};
export const USERS_CHAT = {
  LIST: `${BASEURL}${PREFIX}/users-chat-list`,
  CHAT: `${BASEURL}${PREFIX}/user-chat-list-messages`,
};
export const FINDGUIDE = {
  LIST: `${BASEURL}${PREFIX}/find-guide-enqueries`,
};
export const PATMENT = {
  LIST: `${BASEURL}${PREFIX}/payment-history`,
};
export const WITHDRAW = {
  LIST: `${BASEURL}${PREFIX}/withdraw-request-list`,
  GET_REQUEST: `${BASEURL}${PREFIX}/withdraw-request?request_id=`,
  UPDATE: `${BASEURL}${PREFIX}/withdraw-request-update`,
};

export const APP_SETTINGS = {
  ROLE_LIST: `${BASEURL}${PREFIX}/fetch-role`,
};

export const MEDIA_LIBRARY = {
  CREATE_MEDIA: `${BASEURL}/user-library/create`,
  MEDIA_LIST: `${BASEURL}/user-library/all-media`,
  MEDIA_LIST_AUDIO_CATEGORY: `${BASEURL}/content/get-web-content?key=AUDIO_LIBRARY`,
  PIXBY_LIST: `${BASEURL}/user-library/get-pixby-images`,
};

export const CREATED_BLOCKS = {
  GET_ALL_COVERS: `${BASEURL}/blocks/all-blocks`,
  VIEW_BLOCk: `${BASEURL}/blocks/get`,
  EDIT_BLOCk :`${BASEURL}/blocks/update`,
  PUBLISH_BLOCK :`${BASEURL}/blocks/publish`,
  CREATE_BLOCK :`${BASEURL}/blocks/create`
};

export const BOOKING_HISTORY = {
  HISTORY: `${BASEURL}${PREFIX}/booking-list`,
  VIEW: `${BASEURL}${PREFIX}/booking-view`,
};
export const ITINERARY = {
  LIST: `${BASEURL}${PREFIX}/itinerary-list`,
  LIST_ALL: `${BASEURL}${PREFIX}/see-all-itinerary`,
  VIEW: `${BASEURL}${PREFIX}/booking-view`,
};

export const COMMISSION = {
  GET: `${BASEURL}/user/get-social-links`,
  UPDATE: `${BASEURL}${PREFIX}/update-app-setting`,
};

export const DESTINATION = {
  GET_DESTINATIONS: `${BASEURL}${PREFIX}/get-popular-destinations`,
  CREATE: `${BASEURL}${PREFIX}/create-popular-destinations`,
  UPDATE: `${BASEURL}${PREFIX}/update-popular-destinations`,
  DELETE: `${BASEURL}${PREFIX}/delete-popular-destinations`,
  VIEW: `${BASEURL}${PREFIX}/view-popular-destination`,
};

export const profile = {
  //'abc':'/xyz/',
};

export const DELETE_ACCOUNT = {
  LIST: `${BASEURL}${PREFIX}/get-deleted-account`,
};

export const WAITING_TRAVELLERS = {
  LIST: `${BASEURL}${PREFIX}/fetch-waiting-list-travellers`,
  TOGGLE: `${BASEURL}${PREFIX}/toggle-waiting-list`,
  ALL_TOGGLE: `${BASEURL}${PREFIX}/toggle-waiting-all-traveller`,
};

export const GUIDE_ACTIVITIES = {
  LIST: `${BASEURL}${PREFIX}/get-activities`,
  CREATE: `${BASEURL}${PREFIX}/create-activity`,
  GET: `${BASEURL}${PREFIX}/get-activity`,
  UPDATE: `${BASEURL}${PREFIX}/update-activity`,
  DELETE: `${BASEURL}${PREFIX}/delete-activity`,
};
export const IMAGE_UPLOAD = {
  UPLOADIMAGE: `${BASEURL}${PREFIX}/update-details`,
};

