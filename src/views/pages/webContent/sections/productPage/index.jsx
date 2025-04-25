import { Card, Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import { DEFAULT_APP_TITLE, ROUTE_SLUGS } from "app/constants";
import PageContainer from "components/admin-ui/container";
import AppHelmet from "components/admin-ui/helmet";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import WebBreadCrumbs from "../../WebBreadCrumb";
import WebProductIntro from "./intro/WebProductIntro";
import WebProductCreate from "./create/WebProductCreate";
import WebProductStart from "./easyStart/WebProductStart";
import WebProductWhat from "./whatIs/WebProductWhat";
import WebProductAction from "./action/WebProductAction";
import WebProductStandOut from "./standOut/WebProductStandOut";
import WebProductExplore from "./exploreMore/WebProductExplore";
import WebProductTeacherBusiness from "./teacherBusiness/WebProductTeacherBusiness";
import WebProductHowCreate from "./howCreate/WebProductHowCreate";
import WebProductChoose from "./choose/WebProductChoose";
import WebProductTraditional from "./crosswordTraditional/WebProductTraditional";
import WebProductVoting from "./voting/WebProductVoting";
import WebProductWhyChoose from "./whyChoose/WebProductWhyChoose";

const Cookies = () => {
  const location = useLocation();
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

  const name = location?.state?.name?.replace(/[\s/]+/g, "-").toLowerCase();

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
              Web-content
            </Link>,
            <Link
              style={{
                color: "rgb(99, 115, 129)",
                textDecoration: "none",
              }}
              to={ROUTE_SLUGS.PRODUCT_LIST}
            >
              Products-list
            </Link>,

            name,
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
              <Tab label="Create" {...a11yProps("CREATE")} />
              <Tab label="Easily Start" {...a11yProps("START")} />
              <Tab label="What is" {...a11yProps("WHAT")} />
              <Tab label="Stand Out" {...a11yProps("STAND_OUT")} />
              {/* <Tab label="Action" {...a11yProps("ACTION")} /> */}
              <Tab label="Explore More" {...a11yProps("EXPLORE")} />

              {/* Memory game */}
              <Tab
                label="For Teachers & business"
                {...a11yProps("TEACHER_BUSINESS")}
              />

              {/* crossword puzzle */}
              <Tab label="How To Create" {...a11yProps("HOW_CREATE")} />
              <Tab label="Why Choose" {...a11yProps("CHOOSE")} />
              <Tab
                label="Traditional Crossword"
                {...a11yProps("TRADITIONAL")}
              />

              {/* Rank battle */}
              <Tab label="One-Time Voting" {...a11yProps("VOTING")} />
            </Tabs>
          </Box>
          {value === "INTRO" && <WebProductIntro name={name} />}
          {value === "CREATE" && <WebProductCreate name={name} />}
          {value === "START" && <WebProductStart name={name} />}
          {value === "WHAT" && <WebProductWhat name={name} />}
          {value === "STAND_OUT" && <WebProductStandOut name={name} />}
          {/* {value === "ACTION" && <WebProductAction name={name} />} */}
          {value === "EXPLORE" && <WebProductExplore name={name} />}

          {/* Memory game */}
          {value === "TEACHER_BUSINESS" && (
            <WebProductTeacherBusiness name={name} />
          )}

          {/* crossword puzzle */}
          {value === "HOW_CREATE" && <WebProductHowCreate name={name} />}
          {value === "TRADITIONAL" && <WebProductTraditional name={name} />}
          {/* {value === "CHOOSE" && <WebProductChoose name={name} />} */}
          {value === "CHOOSE" && <WebProductWhyChoose name={name} />}

          {/* Rank battle */}
          {value === "VOTING" && <WebProductVoting name={name} />}
        </Card>
      </PageContainer>
    </>
  );
};

export default Cookies;
