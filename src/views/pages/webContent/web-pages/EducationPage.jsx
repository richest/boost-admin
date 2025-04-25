import { DEFAULT_APP_TITLE, ROUTE_SLUGS } from "app/constants";
import PageContainer from "components/admin-ui/container";
import AppHelmet from "components/admin-ui/helmet";
import { useState } from "react";
import WebBreadCrumbs from "../WebBreadCrumb";
import { Link } from "react-router-dom";
import { Card, Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import EducationIntro from "../sections/educationPage/EducationIntro";
import EducationEngaging from "../sections/educationPage/EducationEngaging";
import EducationBlocks from "../sections/educationPage/EducationBlocks";
import EducationAvailableBlock from "../sections/educationPage/EducationAvailableBlock";
import EducationRemoteLearning from "../sections/educationPage/EducationRemoteLearning";

const Education = () => {
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
            "education",
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
              <Tab label="engaging materials" {...a11yProps("ENGAGING")} />
              <Tab label="Blocks" {...a11yProps("BLOCKS")} />
              <Tab label="remote learning" {...a11yProps("REMOTE")} />
              <Tab label="Available blocks" {...a11yProps("AVAILABLE")} />
            </Tabs>
          </Box>
          {value === "INTRO" && <EducationIntro />}
          {value === "ENGAGING" && <EducationEngaging />}
          {value === "BLOCKS" && <EducationBlocks />}
          {value === "REMOTE" && <EducationRemoteLearning />}
          {value === "AVAILABLE" && <EducationAvailableBlock />}
          
        </Card>
      </PageContainer>
    </>
  );
};

export default Education;
