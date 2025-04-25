import { Grid } from "@mui/material";
import { DEFAULT_APP_TITLE, ROUTE_SLUGS } from "app/constants";
import PageBreadcrumbs from "components/admin-ui/breadcrumbs";
import PageContainer from "components/admin-ui/container";
import AppHelmet from "components/admin-ui/helmet";
import { Link } from "react-router-dom";
import WebContentCard from "./sections/WebContentCard";
import { color } from "framer-motion";

const items = [
  {
    title: "Header Footer",
    slug: ROUTE_SLUGS.HEADER_FOOTER,
    icon: "fluent:document-header-footer-16-regular",
    color: "primary",
  },
  {
    title: "Home Page",
    slug: ROUTE_SLUGS.HOME_PAGE,
    icon: "mi:home",
    color: "success",
  },

  {
    title: "About Page",
    slug: ROUTE_SLUGS.ABOUT_PAGE,
    icon: "solar:user-id-broken",
    color: "warning",
  },
  {
    title: "Education",
    slug: ROUTE_SLUGS.EDUCATION,
    icon: "streamline:quality-education",
    color: "secondary",
  },
  {
    title: "Business",
    slug: ROUTE_SLUGS.BUSINESS,
    icon: "material-symbols:business-center-outline",
    color: "error",
  },
  {
    title: "Products",
    slug: ROUTE_SLUGS.PRODUCTS,
    icon: "eos-icons:product-classes",
    color: "warning",
  },
  {
    title: "Template Gallery",
    slug: ROUTE_SLUGS.TEMPLATE_GALLERY,
    icon: "tabler:template",
    color: "primary",
  },
  {
    title: "Terms of Use",
    slug: ROUTE_SLUGS.TERMS,
    icon: "solar:shield-user-outline",
    color: "success",
  },
  {
    title: "Privacy Policy",
    slug: ROUTE_SLUGS.PRIVACY_POLICY,
    icon: "iconoir:privacy-policy",
    color: "secondary",
  },
  {
    title: "Profile Setup",
    slug: ROUTE_SLUGS.PROFILE_SETUP,
    icon: "hugeicons:profile-02",
    color: "error",
  },
  {
    title: "Quick Start",
    slug: ROUTE_SLUGS.QUICK_START,
    icon: "ph:rocket",
    color: "warning",
  },
  {
    title: "Question Bank",
    slug: ROUTE_SLUGS.QUESTION_BANK,
    icon: "mdi:question-network-outline",
    color: "primary",
  },
  {
    title: "Audio Library",
    slug: ROUTE_SLUGS.AUDIO_LIBRARY,
    icon: "icon-park-outline:audio-file",
    color: "success",
  },
  // {
  //   title: "Help Center",
  //   slug: ROUTE_SLUGS.HELP_CENTER,
  //   icon: "tdesign:help-circle",
  //   color: "success",
  // },
];

const WebContentPage = () => {
  return (
    <>
      <AppHelmet title={DEFAULT_APP_TITLE.WEB_CONTENT} />

      <PageContainer
        className="page-container users-page"
        heading="Web Content"
      >
        <PageBreadcrumbs
          breadcrumbs={[
            <Link
              style={{
                color: "rgb(99, 115, 129)",
                textDecoration: "none",
              }}
              to={ROUTE_SLUGS.DASHBOARD}
            >
              dashboard
            </Link>,

            "web content",
          ]}
        />

        <Grid container spacing={3} sx={{ pt: 2 }}>
          {items?.map((item, i) => (
            <Grid key={i} item xs={12} sm={6} md={3}>
              <WebContentCard
                path={item.slug}
                color={item.color}
                title={item.title}
                icon={item.icon}
              />
            </Grid>
          ))}
        </Grid>
      </PageContainer>
    </>
  );
};

export default WebContentPage;
