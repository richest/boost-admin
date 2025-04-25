import { DEFAULT_APP_TITLE, ROUTE_SLUGS } from "app/constants";
import AppHelmet from "components/admin-ui/helmet";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import WebBreadCrumbs from "../WebBreadCrumb";
import PageContainer from "components/admin-ui/container";
import { Card, Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import QuickStart from "../sections/quickStart/QuickStart";
import ShortTutorial from "../sections/quickStart/ShortTutorial";

function QuickStartSection() {
  const [value, setValue] = useState("QUICK_START");
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
              {DEFAULT_APP_TITLE.WEB_CONTENT}
            </Link>,

            DEFAULT_APP_TITLE.QUICK_START,
          ]}
        />

        <Card sx={{ mt: 4, boxShadow: 3 }}>
          <Box>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Quick start" {...a11yProps("QUICK_START")} />
              <Tab label="Shot tutorial" {...a11yProps("TUTORIAL")} />
            </Tabs>
          </Box>
          {value === "QUICK_START" && <QuickStart />}
          {value === "TUTORIAL" && <ShortTutorial />}
        </Card>
      </PageContainer>
    </>
  );
}

export default QuickStartSection;
