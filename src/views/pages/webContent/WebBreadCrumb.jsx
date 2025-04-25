import { Button, Grid } from "@mui/material";
import PageBreadcrumbs from "components/admin-ui/breadcrumbs";
import Iconify from "components/iconify";
import React from "react";
import { NavLink } from "react-router-dom";

const WebBreadCrumbs = ({ breadcrumbs }) => {
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="flex-start"
      spacing={2}
    >
      <Grid item>
        <PageBreadcrumbs breadcrumbs={breadcrumbs} />
      </Grid>
      <Grid item mr={1}>
        <NavLink className="h-link" to={-1}>
          <Button
            sx={{ borderRadius: "2pt" }}
            variant="contained"
            color="primary"
            startIcon={
              <Iconify icon={"lets-icons:back"} width={24} height={24} />
            }
          >
            Back
          </Button>
        </NavLink>
      </Grid>
    </Grid>
  );
};

export default WebBreadCrumbs;
