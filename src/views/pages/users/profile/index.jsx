import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import TabSections from "./tabSection";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  DEFAULT_APP_TITLE,
  DEFAULT_VALUE,
  RESPONSE_CODE,
  ROUTE_SLUGS,
} from "app/constants";
import { getRequest } from "app/httpClient/axiosClient";
import { USERS } from "app/config/endpoints";
import { RESPONSE_MESSAGES } from "app/constants/localizedStrings";
import { ApiErrorMessage } from "utils/helpers/function/apiErrorResonse";
import AppHelmet from "components/admin-ui/helmet";
import PageContainer from "components/admin-ui/container";
import PageBreadcrumbs from "components/admin-ui/breadcrumbs";
import ErrorSnackBar from "components/admin-ui/snackbar/errorSnackBar";
import GeneralDetails from "./generalDetails";
import { Box } from "@mui/system";

function UserProfile() {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    getUserDetails(id);
  }, []);

  async function getUserDetails(userId) {
    setLoading(true);
    setErrorMessage("");
    const LOCALE = DEFAULT_VALUE.LOCALE;

    try {
      const response = await getRequest(`${USERS.GET_USER}?id=${userId}`);
      const { status } = response;
      const { data, success } = response.data;

      if (success && status === RESPONSE_CODE[200]) {
        setUserDetails(data);
        setLoading(false);
      } else {
        setError(true);
        setErrorMessage(RESPONSE_MESSAGES[LOCALE].USER_DETAILS);
      }
    } catch (error) {
      setErrorMessage(ApiErrorMessage(error));
      setError(true);
      setLoading(false);
    }
  }

  if (isLoading) {
    return <center>Please wait...</center>;
  }

  if (isError) {
    return <ErrorSnackBar message={errorMessage} />;
  }

  if (userDetails) {
    return (
      <>
        <AppHelmet title={DEFAULT_APP_TITLE.USER_PROFILE} />
        <PageContainer
          className="page-container users-page"
          heading="User profile"
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
                  "profile",
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
          {/* <TabSections user={userDetails} getUserDetails={getUserDetails} /> */}
          <Box sx={{ px: 0, py: 4 }}>
            <GeneralDetails
              user={userDetails}
              getUserDetails={getUserDetails}
            />
          </Box>
        </PageContainer>
      </>
    );
  }
  return null;
}

export default UserProfile;
