import { Card, Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import { DEFAULT_APP_TITLE, ROUTE_SLUGS } from "app/constants";
import { useState } from "react";
import { Link } from "react-router-dom";
import WebBreadCrumbs from "../WebBreadCrumb";
import PageContainer from "components/admin-ui/container";
import AppHelmet from "components/admin-ui/helmet";
import WebHomeIntro from "../sections/homePage/WebHomeIntro";
import WebHomeGamify from "../sections/homePage/WebHomeGamify";
import WebHomeInteractive from "../sections/homePage/WebHomeInteractive";
import WebHomeTurn from "../sections/homePage/WebHomeTurn";
import WebHomeBenefit from "../sections/homePage/WebHomeBenefit";
import WebHomeBoostWorks from "../sections/homePage/WebHomeBoostWorks";
import WebHomeContentCreation from "../sections/homePage/WebHomeContentCreation";
import WebHomeActivities from "../sections/homePage/WebHomeActivities";
import WebHomeJoinNow from "../sections/homePage/WebHomeJoinNow";
import WebHomeFeatures from "../sections/homePage/WebHomeFeatures";

const HomePage = () => {
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
            "Home-Page",
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
              <Tab label="Introduction" {...a11yProps("INTRO")} />
              <Tab label="Gamify Everything" {...a11yProps("GAMIFY")} />
              <Tab label="Interactive" {...a11yProps("INTERACTIVE")} />
              <Tab label="Turn content to game" {...a11yProps("TURN")} />
              <Tab label="Benefit" {...a11yProps("BENEFIT")} />
              <Tab label="Boost Works" {...a11yProps("WORKS")} />
              <Tab label="Content creation" {...a11yProps("CREATION")} />
              <Tab
                label="Activities & combinations"
                {...a11yProps("ACTIVITY")}
              />
              <Tab label="Core features" {...a11yProps("FEATURES")} />
              <Tab label="Join now" {...a11yProps("JOIN")} />
            </Tabs>
          </Box>
          {value === "INTRO" && <WebHomeIntro />}
          {value === "GAMIFY" && <WebHomeGamify />}
          {value === "INTERACTIVE" && <WebHomeInteractive />}
          {value === "TURN" && <WebHomeTurn />}
          {value === "BENEFIT" && <WebHomeBenefit />}
          {value === "WORKS" && <WebHomeBoostWorks />}
          {value === "CREATION" && <WebHomeContentCreation />}
          {value === "ACTIVITY" && <WebHomeActivities />}
          {value === "FEATURES" && <WebHomeFeatures />}
          {value === "JOIN" && <WebHomeJoinNow />}
        </Card>
      </PageContainer>
    </>
  );
};

export default HomePage;
