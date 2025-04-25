import { Grid } from "@mui/material";
import { DEFAULT_APP_TITLE, ROUTE_SLUGS } from "app/constants";
import PageBreadcrumbs from "components/admin-ui/breadcrumbs";
import PageContainer from "components/admin-ui/container";
import AppHelmet from "components/admin-ui/helmet";
import { Link } from "react-router-dom";
import PlanCard from "./sections/PlanCard";

const plansList = [
  // {
  //   name: "All Plans",
  //   slug: "all-plans",
  //   icon: "stash:plan",
  //   color: "primary",
  //   id: 1,
  // },
  {
    name: "Personal",
    slug: "personal",
    icon: "solar:document-linear",
    color: "secondary",
    id: 2,
  },
  {
    name: "Teams",
    slug: "teams",
    icon: "proicons:document",
    color: "warning",
    id: 3,
  },
  {
    name: "Enterprise",
    slug: "enterprise",
    icon: "typcn:document-text",
    color: "error",
    id: 4,
  },
];

const Plans = () => {
  return (
    <>
      <AppHelmet title={DEFAULT_APP_TITLE.PLANS} />
      <PageContainer className="page-container users-page" heading="Plans">
        <Grid
          container
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={2}
        >
          <Grid item>
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

                "Plans",
              ]}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ pt: 2 }}>
          {plansList.map((product) => {
            return (
              <Grid key={product.id} item xs={12} sm={4} md={3}>
                <PlanCard
                  path={`${ROUTE_SLUGS.PLANS_CONTENT}/${product.slug}`}
                  color={product.color}
                  title={product.name}
                  icon={product.icon}
                  id={product?.id}
                />
              </Grid>
            );
          })}
        </Grid>
      </PageContainer>
    </>
  );
};

export default Plans;
