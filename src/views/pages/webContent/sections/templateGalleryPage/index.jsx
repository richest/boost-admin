import { Card, Grid } from "@mui/material";
import { DEFAULT_APP_TITLE, ROUTE_SLUGS } from "app/constants";
import PageContainer from "components/admin-ui/container";
import AppHelmet from "components/admin-ui/helmet";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import WebBreadCrumbs from "views/pages/webContent/WebBreadCrumb";
import SelectedTemplateCard from "components/common/cards/SelectedTemplateCard";
import AddTemplates from "components/common/cards/AddTemplates";
import AddTemplateModal from "views/pages/webContent/Popup/AddTemplate";

export default function PsychologyPage() {
  const customization = useSelector((state) => state.customization);
  const location = useLocation();
  const [openAddModal, setOpenAddModal] = useState(false);

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
              to={ROUTE_SLUGS.TEMPLATE_GALLERY}
            >
              Template-gallery
            </Link>,

            location?.state?.name,
          ]}
        />

        <Card
          sx={{ mt: 4, boxShadow: 3 }}
          className={customization?.navType === "dark" ? "dark_card" : ""}
        ></Card>
        <Grid container spacing={3} sx={{ pt: 2 }}>
          <Grid item xs={12} sm={4} md={3} lg={2.4}>
            <SelectedTemplateCard />
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={2.4}>
            <AddTemplates setOpenAddModal={setOpenAddModal} />
          </Grid>
        </Grid>

        {openAddModal && (
          <AddTemplateModal
            openAddModal={openAddModal}
            setOpenAddModal={setOpenAddModal}
          />
        )}
      </PageContainer>
    </>
  );
}
