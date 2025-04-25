import React, { useEffect } from "react";
import PreviewTemplate from "./Preview";
import { useParams } from "react-router-dom";
import { getTemplateDetailsAction } from "./TemplateRedux/actions/drawerAction";
import { useDispatch, useSelector } from "react-redux";
import TeamplateHeader from "./create-new-template/sections/TeamplateHeader";
import { Card, Grid } from "@mui/material";

function PreviewTemplatePage() {
  const { name } = useParams();
  const customization = useSelector((state) => state.customization);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTemplateDetailsAction(name));
  }, []);

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="flex-start"
      spacing={2}
      my={2}
    >
      <TeamplateHeader />
      <Grid item md={12} className="ps-0">
        <Card
          className="profile-right-section"
          sx={{
            // p: 3,
            boxShadow: 1,
            background: customization.navType === "dark" ? "#103C65" : "#fff",
          }}
        >
          <PreviewTemplate />
        </Card>
      </Grid>
    </Grid>
  );
}

export default PreviewTemplatePage;
