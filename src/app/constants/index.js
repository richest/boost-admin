import { WEB_CONTENT } from "app/config/endpoints";

export const APP_NAME = "Boost Platform Admin";
export const REDIRECT_UNAUTH_ROUTE = "/login";
export const REDIRECT_AUTH_ROUTE = "/dashboard/app";
export const REDIRECT_DEFAULT_ROUTE = "/dashboard/app";
export const DEFAULT_VIDEO_URL = import.meta.env.VITE_APP_DEFAULT_VIDEO_URL
export const MAILCHIM_CLIENT_KEY = import.meta.env.VITE_APP_MAILCHIM_CLIENT_KEY
export const MAILCHIM_CLIENT_SECRET = import.meta.env.VITE_APP_MAILCHIM_CLIENT_SECRET

export const AXIOS_ERROR_CODE = {
  ERR_NETWORK: "ERR_NETWORK",
  ECONNABORTED: "ECONNABORTED",
  ERR_BAD_REQUEST: "ERR_BAD_REQUEST",
  ERR_CANCELED: "ERR_CANCELED",
};
export const IMAGES = {
  LOGO: "/assets/images/logo.svg",
};

export const RESPONSE_CODE = {
  200: 200,
  400: 400,
  404: 404,
  500: 500,
  401: 401,
};

export const STORAGE_INDEXES = {
  IS_AUTHENTICATED: "isAuthenticated",
  ACCESS_TOKEN: "access_token",
  LOADER: "loader",
  EMAIL: "email",
  NAME: "name",
  FIRST_NAME: "firstName",
  LAST_NAME: "lastName",
  AUTH: "auth",
  ERROR_MESSAGE: "errorMessage",
  USER_ID: "id",
  USER_ROLE: "role_name",
  PASSWORD: "password",
  APP_STORAGE: "tg_app_storage",
  TEMPLATE: "templateDetails",
  APP_SETTINGS_STORAGE: "tg_app_settings",
  NAV_SETTINGS: "tg_nav_settings",
  USER_DETAILS: "userDetails",
  LOCALE: "locale",
  PROFILE_PICTURE: "profile_picture",
  PAGE_NO: "page_no",
  NUMBER_OF_ROWS: "number_of_rows",
  APP_SETTINGS: "app_settings",
  ROLE_LIST: "role_list",
  ROLE_ID: "role_id",
  SEARCH_TEXT: "search_text",
  FILTER_STATUS: "filter_status",
  BOOKING_HISTORY: "booking_history",
  FILTER_OPTION_STORAGE_KEY: "tg_filter_option",
  PHONE: "phone",
  COUNTRY_DIAL_CODE: "country_code",
  COUNTRY_ISO: "country_code_iso",
};

export const USER_ROLES = {
  ADMIN: "Admin",
  SUB_ADMIN: "Sub Admin",
  TRAVELLER: "traveller",
  GUIDE: "guide",
};

export const DEFAULT_VALUE = {
  LOCALE: "en",
  LOGO: "/assets/images/new-logo.svg",
  NA: "NA",
  COUNTRY_ISO: "us",
  COUNTRY_DIAL_CODE: "+1",
  FLAG_CDN_W20: "https://flagcdn.com/w20/",
  FLAG_CDN_W40: "https://flagcdn.com/w40/",
};
export const USER_BEHAVIOUR_TYPE = {
  STATUS: {
    0: { className: "warning", value: "inactive" },
    1: { className: "success", value: "active" },
    2: { className: "error", value: "suspended" },
    3: { className: "error", value: "removed" },
  },
  VERIFIED: {
    0: "not verified",
    1: "verified",
  },
  AVAILABILITY: {
    0: { className: "default", value: "not-available" },
    1: { className: "success", value: "available" },
  },
};

export const WITHDRAW_BEHAVIOUR_TYPE = {
  APPROVED: { className: "success", value: "paid" },
  REJECTED: { className: "error", value: "rejected" },
  HOLD: { className: "warning", value: "on hold" },
  PENDING: { className: "warning", value: "pending" },
  IN_PROGRESS: { className: "warning", value: "in progress" },
  PENDING_FROM_BANK_SIDE: {
    className: "warning",
    value: "pending from bank side",
  },
};
export const WITHDRAW_REQUEST_STATUS = [
  { key: "APPROVED", value: "Paid" },
  { key: "REJECTED", value: "Rejected" },
  { key: "HOLD", value: "On hold" },
  { key: "PENDING", value: "Pending" },
  { key: "IN_PROGRESS", value: "In progress" },
  { key: "PENDING_FROM_BANK_SIDE", value: "Pending from bank side" },
];

export const BLOG_BEHAVIOUR_TYPE = {
  STATUS: {
    0: { className: "error", value: "un-published" },
    1: { className: "success", value: "published" },
  },
  FILTER: [
    { value: 0, name: "un-published" },
    { value: 1, name: "published" },
  ],
};
export const DESTINATION_BEHAVIOUR_TYPE = {
  STATUS: {
    0: { className: "error", value: "Inactive" },
    1: { className: "success", value: "Active" },
  },
  FILTER: [
    { value: 0, name: "Inactive" },
    { value: 1, name: "Active" },
  ],
};
export const PAYMENT_BEHAVIOUR_TYPE = {
  STATUS: {
    0: { className: "error", value: "Failed" },
    1: { className: "success", value: "Success" },
    2: { className: "success", value: "Pending" },
  },
  FILTER: [
    { value: 0, name: "Failed" },
    { value: 1, name: "Success" },
    { value: 2, name: "Pending" },
  ],
};
export const BOOKINK_BEHAVIOUR_TYPE = {
  FILTER: [
    { value: [0, 2, 4, 6, 8], name: "Ongoing" },
    { value: [4], name: "Paid" },
    { value: [1, 3, 5, 7, 9], name: "Cancelled" },
  ],
};

export const FRONTEND_WEB_FORMS = {
  1: "contact form",
  2: "enquiry form",
  NA: "na",
};

export const USER_BEHAVIOUR_LIST = {
  STATUS: "status",
  AVAILABILITY: "availability",
  VERIFIED: "verified",
};

export const DEFAULT_CSS = {
  BG: "#e2f6fc",
  LOADER_BG_COLOR_OG: "#e2f6fc",
  LOADER_BG_COLOR: "#fff",
  DARK_BG: "#354054",
  PRIMARY_COLOR: "#20A2B8",
  SUCCESS_MSG_COLOR: "#4caf50",
  ERROR_MSG_COLOR: "#FF4842",
  WARNING_COLOR: "#ffab00",
  SUCCESS_COLOR: "#36b37e",
};

export const ROUTE_SLUGS = {
  ROOT: "/",
  LOGIN: "/login",
  FORGOT_PASS: "/forgot-password",
  RESET_PASS: "/reset-password",
  PROFILE: "/profile",
  USER_PROFILE: "profile",
  DASHBOARD: "/dashboard/app",
  PAYMENTS: "/dashboard/payments",
  USERS: "/dashboard/users",
  USER_CREATE: "/dashboard/users/create",
  PRODUCTS_CREATE: "/dashboard/products/create",
  TEMPLATE_CREATE: "/dashboard/templates/create",
  SELECT_PRODUCT: "/dashboard/templates/select-product",
  BLOGS: "/dashboard/blogs",
  POSTS: "/dashboard/posts",
  ENQUERIES: "/dashboard/enqueries",
  BLOG_CREATE: "/dashboard/blogs/create",
  BOOKING_HISTORY: "/dashboard/booking-history",
  WITHDRAW_REQUEST: "/dashboard/withdraw-request",
  DESTINATION: "/dashboard/destinations",
  DESTINATION_CREATE: "/dashboard/destinations/create",
  WEB_CONTENT: "/dashboard/web-content",
  PRODUCT_LIST: "/dashboard/web-content/products",
  HOME_PAGE: "/dashboard/web-content/home-page",
  ABOUT_PAGE: "/dashboard/web-content/about-page",
  HEADER_FOOTER: "/dashboard/web-content/header-footer",
  EDUCATION: "/dashboard/web-content/education",
  BUSINESS: "/dashboard/web-content/business",
  PRODUCTS_LIST: "/dashboard/products",
  TEMPLATE_LIST: "/dashboard/templates",
  BLOCKS: "/dashboard/block/list",
  PRODUCTS: "/dashboard/web-content/product",

  TEMPLATE_GALLERY: "/dashboard/web-content/template-gallery",

  HELP_CENTER: "/dashboard/web-content/help-center",

  TERMS: "/dashboard/web-content/terms",

  PRIVACY_POLICY: "/dashboard/web-content/privacy-policy",

  PROFILE_SETUP: "/dashboard/web-content/profile-setup",

  QUICK_START: "/dashboard/web-content/quick-start",
  QUESTION_BANK: "/dashboard/web-content/question-bank",
  AUDIO_LIBRARY: "/dashboard/web-content/audio-library",

  CONTACT: "/dashboard/contact",
  SUPPORT: "/dashboard/support",
  PLANS_CONTENT: "/dashboard/plans",
};

export const AUTH_ROUTE_SLUGS = {
  ROOT: "/",
  APP: "app",
  DASHBOARD: "dashboard",
  ENQUERIES: "enqueries",
  CONTACT: "contact",
  PLANS: "plans",
  SUPPORT: "support",
  SUBSCRIPTION: "subscription",
  SETTINGS: "settings",
  BOOKING_HISTORY: "booking-history",
  posts: "posts",
  ITINERARY: "itinerary",
  WITHDRAW_REQUEST: "withdraw-request",
  MESSAGES: "messages",
  USERS: {
    ROOT: "users",
    CREATE_NEW: "users/create",
    PROFILE: "users/profile",
  },
  TEMPLATES: {
    ROOT: "templates",
    CREATE_NEW: "templates/create",
    PREVIEW: "templates/preview",
    VIEW: "templates/get-template",
    CHOOSE_PRODUCT: "templates/select-product",
  },
  PLANS: {
    ROOT: "plans",
    CREATE_NEW: "plans/create",
    VIEW: "plans/get-plan",
    CHOOSE_PLAN: "plans/select-plan",
  },
  BLOCKS: {
    ROOT: "blocks",
    CREATE_NEW: "blocks/create",
    VIEW: "blocks/view-block",
    CHOOSE_BLOCK: "blokcs/select-block",
  },
  PRODUCTS: {
    ROOT: "products",
    CREATE_NEW: "products/create",
    VIEW: "products/details",
  },
  PAYMENTS: {
    ROOT: "payments",
    DETAILS: "payments/details",
  },
  BLOGS: {
    ROOT: "blogs",
    CREATE_NEW: "blogs/create",
    EDIT: "blogs/edit",
  },
  POSTS: {
    ROOT: "posts",
    CREATE_NEW: "post/create",
    EDIT: "post/edit",
  },

  DESTINATION: {
    ROOT: "destinations",
    CREATE_NEW: "destinations/create",
    EDIT: "destinations/edit",
  },
  WEB_CONTENT: {
    ROOT: "web-content",
    HOME_PAGE: "web-content/home-page",
    ABOUT_PAGE: "web-content/about-page",
    EDUCATION: "web-content/education",
    BUSINESS: "web-content/business",
    PRODUCTS: "web-content/product",

    TEMPLATE_GALLERY: "web-content/template-gallery",

    HELP_CENTER: "/dashboard/web-content/help-center",

    TERMS: "web-content/terms",

    PRIVACY_POLICY: "web-content/privacy-policy",

    PROFILE_SETUP: "web-content/profile-setup",

    QUICK_START: "web-content/quick-start",
    QUESTION_BANK: {
      ROOT: "web-content/question-bank",
      CREATE_CATEGORY: "web-content/question-bank/create-category"
    },
    AUDIO_LIBRARY: "web-content/audio-library",

    ABOUT_US: "web-content/about-us",
    CONTACT_US: "web-content/contact-us",
    TRAVELLERS: "web-content/travellers",
    GUIDE: "web-content/guide",
    HEADER_FOOTER: "web-content/header-footer",
    WAITING_TRAVELLER: "web-content/waiting-traveller",

  },
  
};

export const DEFAULT_APP_TITLE = {
  DASHBOARD: "Dashboard",
  PROFILE: "Profile",
  USERS: "Users",
  CREATE_USER: "Create new user",
  CREATE_PRODUCT: "Create new product",
  CREATE_PRODUCT: "Create new block",
  CREATE_TEMPLATE: "Create new template",
  USER_PROFILE: "User profile",
  CONTACT: "Contact Us",
  SUPPORT: "Support",
  SUBSCRIPTION: "Subscription",
  SETTING: "Account Settings",
  ENQUERIES: "Enquires",
  PRODUCTS: "Products",
  PLANS: "Plans",
  QUESTION_BANK: "Question Bank",
  AUDIO_LIBRARY: "Audio Library",
  SELECT_PRODUCT: "Select Product",
  TEMPLATES: "Templates",
  PAYMENTS: "Payments",
  BLOGS: "Blogs",
  CREATE_BLOG: "Create new blog",
  CREATE_POST: "Create new POST",
  EDIT_BLOG: "Edit blog",
  EDIT_PRODUCT: "Edit product",
  EDIT_POST: "Edit posts",
  WITHDRAW_REQUEST: "Withdraw request",
  EDIT_WITHDRAW_REQUEST: "Edit Withdraw request",
  BOOKING_HISTORY: "Booking History",
  POSTS: "Posts",
  ITINERARY: "Itinerary",
  WEB_CONTENT: "Web Content",
  DESTINATION: "Popular Destination",
  MESSAGES: "Messages",
  USERS_CHAT: "User's Chat",
  HOME_PAGE: "Home Page",
  ABOUT_US: "About us",
  TRAVELLERS: "For Travellers",
  GUIDE: "For Guide",
  CONTACT_US: "Contact us",
  PRIVACY_POLICY: "Privacy & Policy",
  PROFILE_SETUP: "Profile Setup",
  QUICK_START: "Quick Start",
  DELETED_ACCOUNT: "Deleted Account",
  WAITING_TRAVELLER: "Waiting Travellers",
  GUIDE_ACTIVITIES: "Activities",
  CREATE_GUIDE_ACTIVITY: "Create new activity",
  EDIT_GUIDE_ACTIVITY: "Edit activity",
};

export const USER_STATUS = {
  DEFAULT: 0,
  ACTIVE: 1,
  SUSPENDED: 2,
  REMOVED: 3,
  DELETED: 3,
};
