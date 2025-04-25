import { Link } from "react-router-dom";

// material-ui
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// project imports
import AuthWrapper1 from "../AuthWrapper1";
import AuthCardWrapper from "../AuthCardWrapper";
import { Helmet } from "react-helmet-async";
import { APP_NAME } from "app/constants";
import AppLogo from "../../../assets/images/new-logo.svg";
import AuthReset from "../authentication/AuthReset";

const ResetPassword = () => {
  return (
    <>
      <Helmet>
        <title> Reset-Password | {APP_NAME} </title>
      </Helmet>
      <AuthWrapper1>
        <Grid
          container
          direction="column"
          justifyContent="flex-end"
          sx={{ minHeight: "100vh" }}
        >
          <Grid item xs={12}>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              sx={{ minHeight: "calc(100vh - 68px)" }}
            >
              <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                <AuthCardWrapper>
                  <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Grid item sx={{ mb: 2 }}>
                      <Link to="#" aria-label="logo">
                        <img
                          className="mauto"
                          width="200"
                          src={AppLogo}
                          alt="logo"
                        />
                      </Link>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid
                        container
                        direction={{ xs: "column-reverse", md: "row" }}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Grid item>
                          <Stack
                            alignItems="center"
                            justifyContent="center"
                            spacing={1}
                          >
                            <Typography
                              variant="caption"
                              fontSize="16px"
                              textAlign={{ xs: "center", md: "inherit" }}
                            >
                              Enter your new password to continue
                            </Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <AuthReset/>
                    </Grid>
                  </Grid>
                </AuthCardWrapper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </AuthWrapper1>
    </>
  );
};

export default ResetPassword;
