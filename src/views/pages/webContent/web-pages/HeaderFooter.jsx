import React, { useState } from "react";
import { Box, Card, Tab, Tabs } from "@mui/material";
import AppHelmet from "components/admin-ui/helmet";
import { DEFAULT_APP_TITLE, ROUTE_SLUGS } from "app/constants";
import PageContainer from "components/admin-ui/container";
import WebBreadCrumbs from "../WebBreadCrumb";
import { Link } from "react-router-dom";
import HeaderFooterLogo from "../sections/WebLogo";
import WebFooterCopyright from "../sections/WebFooterCopyright";

const HeaderFooter = () => {
  const [value, setValue] = useState("LOGO");
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
        heading={DEFAULT_APP_TITLE.WEB_CONTENT}
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
            "Header-Footer",
          ]}
        />
        <Card sx={{ mt: 4, boxShadow: 3 }}>
          <Box>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Logo" {...a11yProps("LOGO")} />
              <Tab label="Description & Copyright" {...a11yProps("SUBTITLE")} />
            </Tabs>
          </Box>
          {value === "LOGO" && <HeaderFooterLogo />}
          {value === "SUBTITLE" && <WebFooterCopyright />}
        </Card>
      </PageContainer>
    </>
  );
};

export default HeaderFooter;
