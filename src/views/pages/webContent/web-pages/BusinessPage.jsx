import { DEFAULT_APP_TITLE, ROUTE_SLUGS } from "app/constants";
import PageContainer from "components/admin-ui/container";
import AppHelmet from "components/admin-ui/helmet";
import { useState } from "react";
import WebBreadCrumbs from "../WebBreadCrumb";
import { Link } from "react-router-dom";
import { Card, Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import BusinessIntro from "../sections/businessPage/BusinessInro";
import BusinessGamification from "../sections/businessPage/BusinessGamification";
import BusinessPerfectScreen from "../sections/businessPage/BusinessPerfectScreen";
import BusinessSurprise from "../sections/businessPage/BusinessSurprise";
import BusinessSaveTime from "../sections/businessPage/BusinessSaveTime";
import BusinessIntergrations from "../sections/businessPage/BusinessIntegrations";
import BusinessBlocks from "../sections/businessPage/BusinessBlocks";

const Business = () => {
  const [value, setValue] = useState("INTRO");
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
            "business",
          ]}
        />
        <Card sx={{ mt: 4, boxShadow: 3 }}>
          <Box>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="basic tabs example"
            >
              <Tab label="Introduction" {...a11yProps("INTRO")} />
              <Tab
                label="Gamification & interactive"
                {...a11yProps("GAMIFICATION")}
              />
              <Tab label="blocks" {...a11yProps("BLOCKS")} />

              <Tab label="Perfect screens" {...a11yProps("PERFECT")} />
              <Tab label="Save time" {...a11yProps("SAVETIME")} />
              <Tab label="Integrations" {...a11yProps("INTERFATIONS")} />
              <Tab label="surprise audience" {...a11yProps("SURPRISE")} />
            </Tabs>
          </Box>
          {value === "INTRO" && <BusinessIntro />}
          {value === "GAMIFICATION" && <BusinessGamification />}
          {value === "BLOCKS" && <BusinessBlocks />}
          {value === "PERFECT" && <BusinessPerfectScreen />}
          {value === "SAVETIME" && <BusinessSaveTime />}
          {value === "INTERFATIONS" && <BusinessIntergrations />}
          {value === "SURPRISE" && <BusinessSurprise />}
        </Card>
      </PageContainer>
    </>
  );
};

export default Business;
