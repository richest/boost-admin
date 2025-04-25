import React, { useState } from "react";
import { DEFAULT_APP_TITLE, ROUTE_SLUGS } from "app/constants";
import AppHelmet from "components/admin-ui/helmet";
import PageContainer from "components/admin-ui/container";
import { Link } from "react-router-dom";
import WebBreadCrumbs from "../WebBreadCrumb";
import { Card, Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import HelpCenterSections from "../sections/helpCenterPage/sections/HelpCenterSections";
import HelpCenterTrending from "../sections/helpCenterPage/trending/HelpCenterTrending";

function HelpCenterPage() {
  const [value, setValue] = useState("SECTION");
  function a11yProps(title) {
    return {
      value: title,
      id: `content-tab-${title}`,
      "aria-controls": `content-tabpanel-${title}`,
    };
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <AppHelmet title={DEFAULT_APP_TITLE.WEB_CONTENT} />

      <PageContainer
        className="page-container users-page"
        heading="Web Content"
      >
        <WebBreadCrumbs
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
              to={ROUTE_SLUGS.WEB_CONTENT}
            >
              Web-content
            </Link>,

            "help-center",
          ]}
        />

        <Card sx={{ mt: 4, boxShadow: 3 }}>
          <Box>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              <Tab label="Sections" {...a11yProps("SECTION")} />
              <Tab label="Trending Articles" {...a11yProps("TRENDING")} />
            </Tabs>
          </Box>
          {value === "SECTION" && <HelpCenterSections />}
          {value === "TRENDING" && <HelpCenterTrending />}
        </Card>
      </PageContainer>
    </>
  );
}

export default HelpCenterPage;
