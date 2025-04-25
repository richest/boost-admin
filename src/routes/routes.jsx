import { lazy } from "react";
import { ROUTE_SLUGS, AUTH_ROUTE_SLUGS } from "../app/constants";

export const ProtectedRoutes = [
  {
    slug: ROUTE_SLUGS.ROOT,
    component: lazy(() => import("../views/pages/authentication3/Login3")),
    exact: true,
  },
  {
    slug: ROUTE_SLUGS.LOGIN,
    component: lazy(() => import("../views/pages/authentication3/Login3")),
    exact: true,
  },
  {
    slug: ROUTE_SLUGS.FORGOT_PASS,
    component: lazy(
      () => import("../views/pages/authentication3/ForgetPassword")
    ),
    exact: true,
  },
  {
    slug: ROUTE_SLUGS.RESET_PASS,
    parameter: "/:token",
    component: lazy(
      () => import("../views/pages/authentication3/ResetPassword")
    ),
    exact: true,
  },
];

export const AuthorizedRoutes = [
  {
    slug: AUTH_ROUTE_SLUGS.ROOT,
    component: lazy(() => import("../layout/MainLayout")),
    exact: true,
  },
  {
    slug: AUTH_ROUTE_SLUGS.DASHBOARD,
    component: lazy(() => import("../layout/MainLayout")),
    children: [
      // {
      //   path: 'app',
      //   component: lazy(() => import('../pages/DashboardAppPage')),
      // },
      {
        path: AUTH_ROUTE_SLUGS.APP,
        component: lazy(() => import("../views/dashboard")),
      },
      //   {
      //     path: AUTH_ROUTE_SLUGS.PROFILE,
      //     component: lazy(() => import("../pages/dashboard/adminProfile")),
      //   },
      {
        path: AUTH_ROUTE_SLUGS.USERS.ROOT,
        component: lazy(() => import("../views/pages/users")),
      },
      {
        path: AUTH_ROUTE_SLUGS.USERS.ROOT,
        parameter: "/:id",
        component: lazy(() => import("../views/pages/users/profile")),
      },
      {
        path: AUTH_ROUTE_SLUGS.USERS.CREATE_NEW,
        component: lazy(() => import("../views/pages/users/create-new-user")),
      },
      {
        path: AUTH_ROUTE_SLUGS.WEB_CONTENT.ROOT,
        component: lazy(() => import("../views/pages/webContent")),
      },
      {
        path: AUTH_ROUTE_SLUGS.PRODUCTS.ROOT,
        component: lazy(() => import("../views/pages/Products")),
      },
      {
        path: AUTH_ROUTE_SLUGS.PRODUCTS.CREATE_NEW,
        component: lazy(
          () => import("../views/pages/Products/create-new-product")
        ),
      },
      {
        path: AUTH_ROUTE_SLUGS.PRODUCTS.ROOT,
        parameter: "/:id",
        component: lazy(() => import("../views/pages/Products/edit-product")),
        exact: true,
      },
      {
        path: AUTH_ROUTE_SLUGS.TEMPLATES.ROOT,
        component: lazy(() => import("../views/pages/Templates")),
        exact: true,
      },
      {
        path: AUTH_ROUTE_SLUGS.TEMPLATES.CREATE_NEW,
        parameter: "/:name",
        component: lazy(
          () => import("../views/pages/Templates/create-new-template")
        ),
      },
      {
        path: AUTH_ROUTE_SLUGS.TEMPLATES.PREVIEW,
        parameter: "/:name",
        component: lazy(
          () => import("../views/pages/Templates/PreviewTemplate")
        ),
      },
      {
        path: AUTH_ROUTE_SLUGS.WEB_CONTENT.HEADER_FOOTER,
        component: lazy(
          () => import("../views/pages/webContent/web-pages/HeaderFooter")
        ),
      },
      {
        path: AUTH_ROUTE_SLUGS.WEB_CONTENT.HOME_PAGE,
        component: lazy(
          () => import("../views/pages/webContent/web-pages/HomePage")
        ),
      },
      {
        path: AUTH_ROUTE_SLUGS.WEB_CONTENT.ABOUT_PAGE,
        component: lazy(
          () => import("../views/pages/webContent/web-pages/AboutPage")
        ),
      },
      {
        path: AUTH_ROUTE_SLUGS.WEB_CONTENT.EDUCATION,
        component: lazy(
          () => import("../views/pages/webContent/web-pages/EducationPage")
        ),
      },
      {
        path: AUTH_ROUTE_SLUGS.WEB_CONTENT.BUSINESS,
        component: lazy(
          () => import("../views/pages/webContent/web-pages/BusinessPage")
        ),
      },

      // product ***************************************************************
      {
        path: AUTH_ROUTE_SLUGS.WEB_CONTENT.PRODUCTS,
        component: lazy(
          () => import("../views/pages/webContent/web-pages/ProductPage")
        ),
      },
      {
        path: AUTH_ROUTE_SLUGS.WEB_CONTENT.PRODUCTS,
        parameter: "/:slug",
        component: lazy(
          () => import("../views/pages/webContent/sections/productPage")
        ),
      },

      // template ***************************************************************

      {
        path: AUTH_ROUTE_SLUGS.WEB_CONTENT.TEMPLATE_GALLERY,
        component: lazy(
          () =>
            import("../views/pages/webContent/web-pages/TemplateGalleryPage")
        ),
      },
      {
        path: AUTH_ROUTE_SLUGS.TEMPLATES.CHOOSE_PRODUCT,
        component: lazy(() => import("../views/pages/Templates/ChooseProduct")),
      },
      {
        path: AUTH_ROUTE_SLUGS.WEB_CONTENT.TEMPLATE_GALLERY,
        parameter: "/:slug",
        component: lazy(
          () => import("../views/pages/webContent/sections/templateGalleryPage")
        ),
      },
      {
        path: AUTH_ROUTE_SLUGS.WEB_CONTENT.QUICK_START,
        component: lazy(
          () => import("../views/pages/webContent/web-pages/QuickStartSection")
        ),
      },
      // help center ***********************************************
      {
        path: AUTH_ROUTE_SLUGS.WEB_CONTENT.HELP_CENTER,
        component: lazy(
          () => import("../views/pages/webContent/web-pages/HelpCenterPage")
        ),
      },
      {
        path: AUTH_ROUTE_SLUGS.WEB_CONTENT.HELP_CENTER,
        parameter: "/:slug",
        component: lazy(
          () =>
            import(
              "../views/pages/webContent/sections/helpCenterPage/sectionInnerPage/InnerPage"
            )
        ),
      },

      {
        path: AUTH_ROUTE_SLUGS.WEB_CONTENT.TERMS,
        component: lazy(
          () => import("../views/pages/webContent/web-pages/Terms")
        ),
      },

      {
        path: AUTH_ROUTE_SLUGS.WEB_CONTENT.PRIVACY_POLICY,
        component: lazy(
          () => import("../views/pages/webContent/web-pages/PrivacyPolicy")
        ),
      },

      {
        path: AUTH_ROUTE_SLUGS.WEB_CONTENT.PROFILE_SETUP,
        component: lazy(
          () => import("../views/pages/webContent/web-pages/ProfileSetup")
        ),
      },
      {
        path: AUTH_ROUTE_SLUGS.WEB_CONTENT.PROFILE_SETUP,
        parameter: "/:slug",
        component: lazy(
          () =>
            import("../views/pages/webContent/sections/profileSetup/innerPage")
        ),
      },
      {
        path: AUTH_ROUTE_SLUGS.CONTACT,
        component: lazy(() => import("../views/pages/contactUs")),
      },
      {
        path: AUTH_ROUTE_SLUGS.PLANS.ROOT,
        component: lazy(() => import("../views/pages/Plans")),
      },
      {
        path: AUTH_ROUTE_SLUGS.PLANS.ROOT,
        parameter: "/:slug",
        component: lazy(() => import("../views/pages/Plans/innerPage")),
      },
      {
        path: AUTH_ROUTE_SLUGS.BLOCKS.ROOT,
        component: lazy(() => import("../views/pages/Blocks")),
      },
      {
        path: AUTH_ROUTE_SLUGS.BLOCKS.ROOT,
        parameter: "/:slug",
        component: lazy(() => import("../views/pages/Blocks/BlockList")),
      },
      {
        path: AUTH_ROUTE_SLUGS.BLOCKS.CREATE_NEW,
        parameter: "/:slug",
        component: lazy(() => import("../views/pages/Blocks/create-new-block")),
      },
      {
        path: AUTH_ROUTE_SLUGS.BLOCKS.VIEW,
        parameter: "/:slug",
        component: lazy(() => import("../views/pages/Blocks/edit-block")),
      },
      {
        path: AUTH_ROUTE_SLUGS.SUPPORT,
        component: lazy(() => import("../views/pages/support")),
      },
      {
        path: AUTH_ROUTE_SLUGS.SUBSCRIPTION,
        component: lazy(() => import("../views/pages/subscription")),
      },

      {
        path: AUTH_ROUTE_SLUGS.WEB_CONTENT.QUESTION_BANK.ROOT,
        component: lazy(
          () => import("../views/pages/webContent/web-pages/QuestionPage")
        ),
      },

      {
        path: AUTH_ROUTE_SLUGS.WEB_CONTENT.QUESTION_BANK.ROOT,
        parameter: "/:slug",
        component: lazy(
          () =>
            import(
              "../views/pages/webContent/sections/questionBank/questionBankDetails"
            )
        ),
      },

      {
        path: AUTH_ROUTE_SLUGS.WEB_CONTENT.AUDIO_LIBRARY,
        component: lazy(
          () => import("../views/pages/webContent/web-pages/AudioLibraryPage")
        ),
      },

      {
        path: AUTH_ROUTE_SLUGS.WEB_CONTENT.AUDIO_LIBRARY,
        parameter: "/:slug",
        component: lazy(
          () =>
            import(
              "../views/pages/webContent/sections/audioLibrary/AudioLibraryDetailPage"
            )
        ),
      },

      {
        path: AUTH_ROUTE_SLUGS.SETTINGS,
        component: lazy(() => import("../views/pages/settings")),
      },
    ],
  },
];
