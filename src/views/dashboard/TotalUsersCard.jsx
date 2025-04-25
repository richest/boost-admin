import PropTypes from "prop-types";
import React from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// project imports
import MainCard from "ui-component/cards/MainCard";
import SkeletonEarningCard from "ui-component/cards/Skeleton/EarningCard";

// assets
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const TotalUsersCard = ({ isLoading, counts, title, icon, url }) => {
  const theme = useTheme();

  return (
    <>
      {isLoading ? (
        <SkeletonEarningCard />
      ) : (
        <MainCard
          border={false}
          content={false}
          sx={{
            bgcolor: theme.palette.primary.main,
            color: "#fff",
            overflow: "hidden",
            position: "relative",
            // "&:after": {
            //   content: '""',
            //   position: "absolute",
            //   width: 210,
            //   height: 210,
            //   background: theme.palette.primary[200],
            //   borderRadius: "50%",
            //   top: { xs: -105, sm: -85 },
            //   right: { xs: -140, sm: -95 },
            // },
            // "&:before": {
            //   content: '""',
            //   position: "absolute",
            //   width: 210,
            //   height: 210,
            //   background: theme.palette.secondary[800],
            //   borderRadius: "50%",
            //   top: { xs: -155, sm: -125 },
            //   right: { xs: -70, sm: -15 },
            //   opacity: 0.5,
            // },
          }}
        >
          <Box sx={{ p: 2.25 }}>
            <Link style={{ textDecoration: "none" }} to={url}>
              <Grid container direction="column" sx={{ alignItems: "center" }}>
                <Grid item>
                  <Grid container justifyContent="space-between">
                    <Grid item>
                      <Avatar
                        variant="rounded"
                        sx={{
                          ...theme.typography.commonAvatar,
                          ...theme.typography.largeAvatar,
                          bgcolor: "primary.main",
                          mt: 1,
                        }}
                      >
                        <Icon
                          icon={icon}
                          width="38"
                          height="38"
                          style={{ color: "#fff" }}
                        />
                      </Avatar>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container alignItems="center">
                    <Grid item>
                      <Typography
                        sx={{
                          fontSize: "2.125rem",
                          fontWeight: 500,
                          mr: 1,
                          mt: 1.75,
                          mb: 0.75,
                          color: theme.palette.primary.light,
                        }}
                      >
                        {counts}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item sx={{ mb: 1.25 }}>
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      fontWeight: 500,
                      color: theme.palette.primary.light,
                    }}
                  >
                    {title}
                  </Typography>
                </Grid>
              </Grid>
            </Link>
          </Box>
        </MainCard>
      )}
    </>
  );
};

TotalUsersCard.propTypes = {
  isLoading: PropTypes.bool,
};

export default TotalUsersCard;
