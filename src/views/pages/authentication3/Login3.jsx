import { Link } from "react-router-dom";

// material-ui
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

// project imports
import AuthWrapper1 from "../AuthWrapper1";
import AuthCardWrapper from "../AuthCardWrapper";
import AuthLogin from "../authentication/AuthLogin";
import { Helmet } from "react-helmet-async";
import { APP_NAME, ROUTE_SLUGS } from "app/constants";
import AppLogo from "../../../assets/images/new-logo.svg";

// ================================|| AUTH3 - LOGIN ||================================ //

const Login = () => {
  const downMD = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <>
      <Helmet>
        <title> Login | {APP_NAME} </title>
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
                      <Link to={ROUTE_SLUGS.ROOT} aria-label="logo">
                        {/* <Logo /> */}
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
                              color="primary.main"
                              gutterBottom
                              variant={downMD ? "h3" : "h2"}
                            >
                              Hi, Welcome Back
                            </Typography>
                            <Typography
                              variant="caption"
                              fontSize="16px"
                              textAlign={{ xs: "center", md: "inherit" }}
                            >
                              Enter your credentials to continue
                            </Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <AuthLogin />
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

export default Login;
