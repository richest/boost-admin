// assets
import {
  IconDashboard,
  IconUser,
  IconArticle,
  IconMessages,
  IconMessage,
  IconQuotes,
  IconSitemap,
  IconCashBanknote,
  IconUserX,
  IconTemplate,
  IconBrandProducthunt,
  IconTemplateOff,
  IconInfoCircle,
  IconHeadphones,
  IconSettings,
  IconMailCheck,
  IconBrandStripe,
  IconBlockquote
} from "@tabler/icons-react";
import { AUTH_ROUTE_SLUGS } from "app/constants";

// constant
const icons = {
  IconDashboard,
  IconUser,
  IconArticle,
  IconMessages,
  IconMessage,
  IconQuotes,
  IconSitemap,
  IconCashBanknote,
  IconUserX,
  IconTemplate,
  IconBrandProducthunt,
  IconTemplateOff,
  IconInfoCircle,
  IconHeadphones,
  IconSettings,
  IconMailCheck,
  IconBrandStripe,
  IconBlockquote
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: "dashboard",
  type: "group",
  children: [
    {
      id: "app",
      title: "Dashboard",
      type: "item",
      url: AUTH_ROUTE_SLUGS.APP,
      icon: icons.IconDashboard,
      breadcrumbs: false,
    },
    {
      id: "users",
      title: "Users",
      type: "item",
      url: AUTH_ROUTE_SLUGS.USERS.ROOT,
      icon: icons.IconUser,
      breadcrumbs: false,
    },
    {
      id: "website",
      title: "Website",
      type: "item",
      url: AUTH_ROUTE_SLUGS.WEB_CONTENT.ROOT,
      icon: icons.IconSitemap,
      breadcrumbs: false,
    },
    {
      id: "products",
      title: "Products",
      type: "item",
      url: AUTH_ROUTE_SLUGS.PRODUCTS.ROOT,
      icon: icons.IconBrandProducthunt,
      breadcrumbs: false,
    },
    // {
    //   id: "blocks",
    //   title: "Blocks",
    //   type: "item",
    //   url: AUTH_ROUTE_SLUGS.BLOCKS.ROOT,
    //   icon: icons.IconBlockquote,
    //   breadcrumbs: false,
    // },
    {
      id: "payments",
      title: "PAYMENTS",
      type: "item",
      url: AUTH_ROUTE_SLUGS.PAYMENTS.ROOT,
      icon: icons.IconBlockquote,
      breadcrumbs: false,
    },
    {
      id: "templates",
      title: "Templates",
      type: "item",
      url: AUTH_ROUTE_SLUGS.TEMPLATES.ROOT,
      icon: icons.IconTemplateOff,
      breadcrumbs: false,
    },
    // {
    //   id: "plans",
    //   title: "Plans",
    //   type: "item",
    //   url: AUTH_ROUTE_SLUGS.PLANS.ROOT,
    //   icon: icons.IconBrandStripe,
    //   breadcrumbs: false,
    // },
    {
      id: "contact",
      title: "Contact Us",
      type: "item",
      url: AUTH_ROUTE_SLUGS.CONTACT,
      icon: icons.IconInfoCircle,
      breadcrumbs: false,
    },
    {
      id: "support",
      title: "Support",
      type: "item",
      url: AUTH_ROUTE_SLUGS.SUPPORT,
      icon: icons.IconHeadphones,
      breadcrumbs: false,
    },
    // {
    //   id: "subscription",
    //   title: "Email Subscription",
    //   type: "item",
    //   url: AUTH_ROUTE_SLUGS.SUBSCRIPTION,
    //   icon: icons.IconMailCheck,
    //   breadcrumbs: false,
    // },
    {
      id: "settings",
      title: "Settings",
      type: "item",
      url: AUTH_ROUTE_SLUGS.SETTINGS,
      icon: icons.IconSettings,
      breadcrumbs: false,
    },
  ],
};

export default dashboard;
