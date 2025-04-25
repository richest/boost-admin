import { lazy } from "react";
import { TableCell, TableRow, Typography } from "@mui/material";

import Label from "components/label";
import ConnectionError from "components/admin-ui/noDataResonse/connectionError";
import { PAYMENT_TABLE_HEAD } from "app/constants/tableHeadings";
import { useSelector } from "react-redux";
import { DEFAULT_CSS } from "app/constants";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import WatchLaterTwoToneIcon from "@mui/icons-material/WatchLaterTwoTone";

const DataNotFound = lazy(
  () => import("components/admin-ui/noDataResonse/dataNotFound")
);
const SkeltonLoader = lazy(
  () => import("components/admin-ui/loader/SkeltonLoader")
);

function DataListRow(props) {
  const customization = useSelector((state) => state.customization);
  if (props.loading) {
    return (
      <SkeltonLoader
        colSpan={PAYMENT_TABLE_HEAD.length + 1}
        rows={5}
        columns={8}
        loaderMessage="Please wait..."
      />
    );
  }

  if (props.connectionError) {
    return (
      <ConnectionError
        colspan={PAYMENT_TABLE_HEAD.length + 1}
        message={props.errorMessage}
      />
    );
  }

  if (props.paymentList.length === 0) {
    return (
      <DataNotFound
        colspan={PAYMENT_TABLE_HEAD.length + 1}
        message="No Payment found."
      />
    );
  }

  return (
    <>
      {props.paymentList.map((enquer, index) => {
        const { id, name, email, isVerified, user_profile_detail, status } =
          enquer;
        return (
          <TableRow
            key={id}
            className={customization?.navType === "dark" ? "dark_tableRow" : ""}
          >
            <TableCell>{`${props.srNo + index}.`}</TableCell>
            <TableCell component="td" scope="row">
              <Typography variant="span" className="user-name" noWrap>
                {user_profile_detail?.lastName
                  ? `${user_profile_detail?.firstName} ${user_profile_detail?.lastName}`
                  : user_profile_detail?.firstName || "---"}
              </Typography>
            </TableCell>
            <TableCell component="td" scope="row">
              <Typography variant="span" className="user-name" noWrap>
                {email}
              </Typography>
            </TableCell>
            <TableCell align="left" sx={{ textAlign: "center" }}>
              {isVerified === 1 ? (
                <CheckCircleTwoToneIcon
                  sx={{ color: DEFAULT_CSS.SUCCESS_COLOR, fontSize: "20px" }}
                />
              ) : (
                <WatchLaterTwoToneIcon
                  sx={{ color: DEFAULT_CSS.WARNING_COLOR, fontSize: "20px" }}
                />
              )}
            </TableCell>
            <TableCell
              align="left"
              className="uppercase"
              sx={{ textAlign: "center" }}
            >
              <Label color={status === 1 ? "success" : "warning"}>
                {status === 1 ? "Active" : "Inactive"}
              </Label>
            </TableCell>
          </TableRow>
        );
      })}
    </>
  );
}

export default DataListRow;
