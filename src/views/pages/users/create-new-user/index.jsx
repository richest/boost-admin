import { Button, Grid } from "@mui/material";
import { DEFAULT_APP_TITLE, ROUTE_SLUGS } from "app/constants";
import PageBreadcrumbs from "components/admin-ui/breadcrumbs";
import PageContainer from "components/admin-ui/container";
import AppHelmet from "components/admin-ui/helmet";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import UserForm from "./UserForm";

const CreateNewUser = () => {
  return (
    <>
      <AppHelmet title={DEFAULT_APP_TITLE.CREATE_USER} />
      <PageContainer
        className="page-container users-page"
        heading="Create new user"
      >
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
                <Link
                  style={{
                    color: "rgb(99, 115, 129)",
                    textDecoration: "none",
                  }}
                  to={ROUTE_SLUGS.USERS}
                >
                  users
                </Link>,
                "create new",
              ]}
            />
          </Grid>
          <Grid item mr={1}>
            <Link className="h-link" to={ROUTE_SLUGS.USERS}>
              <Button
                sx={{ borderRadius: "2pt" }}
                variant="contained"
                color="primary"
                startIcon={<ArrowBackIcon />}
              >
                Back
              </Button>
            </Link>
          </Grid>
        </Grid>
        <UserForm/>
      </PageContainer>
    </>
  );
};

export default CreateNewUser;
