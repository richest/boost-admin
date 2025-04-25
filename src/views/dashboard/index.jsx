import { useEffect, useState } from "react";

// material-ui
import Grid from "@mui/material/Grid";

import { gridSpacing } from "redux/customization/constant";
import TotalUsersCard from "./TotalUsersCard";
import DataListTable from "./DataListTable";
import AppHelmet from "components/admin-ui/helmet";
import {
  DEFAULT_APP_TITLE,
  DEFAULT_VALUE,
  RESPONSE_CODE,
  ROUTE_SLUGS,
} from "app/constants";
import { useDispatch } from "react-redux";
import { REQUEST_ACTION } from "redux/authenticate/actions";
import { ApiErrorMessage } from "utils/helpers/function/apiErrorResonse";
import { getRequest } from "app/httpClient/axiosClient";
import { COUNTS } from "app/config/endpoints";

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const [counts, setCounts] = useState();

  const dispatch = useDispatch();

  async function getCounts(url) {
    setLoading(true);
    dispatch({ type: REQUEST_ACTION.INIT_LOADER, payload: { loader: true } });
    let _errorMessage;
    const LOCALE = DEFAULT_VALUE.LOCALE;
    try {
      const response = await getRequest(url);
      const { status } = response;
      const { data, success } = response.data;
      if (success && status === RESPONSE_CODE[200]) {
        setCounts(data);
        setLoading(false);
        dispatch({
          type: REQUEST_ACTION.INIT_LOADER,
          payload: { loader: false },
        });
      } else {
        dispatch({
          type: REQUEST_ACTION.FAILURE,
          payload: { message: ApiErrorMessage() },
        });
      }
    } catch (error) {
      setLoading(false);
      dispatch({
        type: REQUEST_ACTION.FAILURE,
        payload: { message: _errorMessage },
      });
    }
  }

  useEffect(() => {
    getCounts(`${COUNTS.GET_COUNTS}`);
  }, []);

  return (
    <>
      <AppHelmet title={DEFAULT_APP_TITLE.DASHBOARD} />

      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item lg={3} md={6} sm={6} xs={12}>
              <TotalUsersCard
                isLoading={isLoading}
                counts={counts?.totalUsers}
                title="Total Users"
                icon="mdi:users-group"
                url={ROUTE_SLUGS.USERS}
              />
            </Grid>
            <Grid item lg={3} md={6} sm={6} xs={12}>
              <TotalUsersCard
                isLoading={isLoading}
                counts={counts?.totalContactEnquiries}
                title="Total Contact Enquiries"
                icon="material-symbols:contact-support-rounded"
                url={ROUTE_SLUGS.CONTACT}
              />
            </Grid>
            <Grid item lg={3} md={12} sm={12} xs={12}>
              <TotalUsersCard
                isLoading={isLoading}
                counts={counts?.totalSupportEnquiries}
                title="Total Support Enquiries"
                icon="fluent:person-support-28-filled"
                url={ROUTE_SLUGS.SUPPORT}
              />
            </Grid>
            <Grid item lg={3} md={12} sm={12} xs={12}>
              <TotalUsersCard
                isLoading={isLoading}
                counts={0}
                title="Total Payments"
                icon="fluent:payment-16-filled"
                url="#"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <DataListTable />
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
