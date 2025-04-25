import React, { useEffect, useState } from "react";
import { Card, Table, TableBody, TableContainer } from "@mui/material";
import DataListHead from "./section/DataListHead";
import DataListRow from "./section/DataListRow";
import {  USER_TABLE_HEAD_DASHBOARD } from "app/constants/tableHeadings";
import {  USERS_PRM } from "app/constants/paginations";
import {  USERS } from "app/config/endpoints";
import { ApiErrorMessage } from "utils/helpers/function/apiErrorResonse";
import { RESPONSE_MESSAGES } from "app/constants/localizedStrings";
import { DEFAULT_VALUE, RESPONSE_CODE } from "app/constants";
import { getRequest } from "app/httpClient/axiosClient";
import Scrollbar from "components/scrollbar/Scrollbar";
import { useSelector } from "react-redux";

const DataListTable = () => {
  const customization = useSelector((state) => state.customization);
  const [srNo, setSrNo] = useState(1);
  const [paymentList, setPaymentList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [connectionError, setConnectionError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userTypeSelection, setUserTypeSelection] = useState(null);
  const handleUserTypeSelection = (event, roleId = null) => {
    setUserTypeSelection(roleId !== null ? roleId : null);
    setSrNo(1);
  };
  // useEffect(() => {
  //   async function getEnqueries(url) {
  //     setLoading(true);
  //     let _errorMessage;
  //     const LOCALE = DEFAULT_VALUE.LOCALE;
  //     try {
  //       const response = await getRequest(url);
  //       const { status } = response;
  //       const {
  //         data: { rows },
  //         success,
  //       } = response.data;
  //       if (success && status === RESPONSE_CODE[200]) {
  //         setPaymentList(rows);
  //         setLoading(false);
  //         setConnectionError(false);
  //       } else {
  //         setErrorMessage(RESPONSE_MESSAGES[LOCALE].FETCHING_USERS_LIST);
  //       }
  //     } catch (error) {
  //       _errorMessage = ApiErrorMessage(error);
  //       setConnectionError(true);
  //       setErrorMessage(_errorMessage);
  //       setLoading(false);
  //     }
  //   }
  //   const roleId = userTypeSelection !== null ? userTypeSelection : "";
  //   getEnqueries(
  //     `${PATMENT.LIST}?${COMMON_PAGINATION.PAGE_NO.KEY}=1&${COMMON_PAGINATION.ROWS_PER_PAGE.KEY}=6&payment_status=${roleId}`
  //   );
  // }, [userTypeSelection]);

  useEffect(() => {
    async function getUsers(url) {
      setLoading(true);
      let _errorMessage;
      const LOCALE = DEFAULT_VALUE.LOCALE;
      try {
        const response = await getRequest(url);
        const { status } = response;
        const {
          data: { userList },
          success,
        } = response.data;
        if (success && status === RESPONSE_CODE[200]) {
          setPaymentList(userList);
          setLoading(false);
          setConnectionError(false);
        } else {
          setErrorMessage(RESPONSE_MESSAGES[LOCALE].FETCHING_USERS_LIST);
        }
      } catch (error) {
        _errorMessage = ApiErrorMessage(error);
        setConnectionError(true);
        setErrorMessage(_errorMessage);
        setLoading(false);
      }
    }
    getUsers(
      `${USERS.LIST}?${USERS_PRM.PAGE_NO.KEY}=${1}&${USERS_PRM.ROWS_PER_PAGE.KEY}=${6}`
    );
  }, []);

  return (
    <Card className={customization?.navType === "dark" ? "dark_card card-section" : "card-section"} sx={{ mt: 4, boxShadow: 3 }}>
      <h3 style={{ padding: "10px", fontWeight: "500" }}>Recent Users</h3>
      <Scrollbar>
        <TableContainer>
          <Table className="list-table">
            <DataListHead
              headLabel={USER_TABLE_HEAD_DASHBOARD}
              rowCount={0}
              onUserTypeSelection={handleUserTypeSelection}
            />
            <TableBody>
              <DataListRow
                loading={isLoading}
                connectionError={connectionError}
                errorMessage={errorMessage}
                paymentList={paymentList}
                srNo={srNo}
              />
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
    </Card>
  );
};

export default DataListTable;
