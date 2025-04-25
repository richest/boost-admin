import { lazy } from "react";
import { TableCell, TableRow, Typography, IconButton } from "@mui/material";

import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import WatchLaterTwoToneIcon from "@mui/icons-material/WatchLaterTwoTone";

import { USER_TABLE_HEAD } from "app/constants/tableHeadings";
import {
  DEFAULT_CSS,
  DEFAULT_VALUE,
  USER_BEHAVIOUR_LIST,
  USER_ROLES,
} from "app/constants";
import { userBehaviour } from "utils/helpers/function";
import Iconify from "components/iconify";
import Label from "components/label";
import ConnectionError from "components/admin-ui/noDataResonse/connectionError";
import SkeltonLoader from "components/admin-ui/loader/SkeltonLoader";
import DataNotFound from "components/admin-ui/noDataResonse/dataNotFound";
import { useSelector } from "react-redux";

function UserListRow(props) {
  const customization = useSelector((state) => state.customization);
  if (props.loading) {
    return (
      <SkeltonLoader
        colSpan={USER_TABLE_HEAD.length + 1}
        rows={5}
        columns={7}
        loaderMessage="Please wait..."
      />
    );
  }

  if (props.connectionError) {
    return (
      <ConnectionError
        colspan={USER_TABLE_HEAD.length + 1}
        message={props.errorMessage}
      />
    );
  }

  if (props.userList.length === 0) {
    return (
      <DataNotFound
        colspan={USER_TABLE_HEAD.length + 1}
        message="Users not found."
      />
    );
  }

  console.log("userList---", props.userList)

  return (
    <>
      {props.userList.map((user, index) => {
        const { id, name, email, isVerified, user_profile_detail, status } =
          user;
        // const selectedUser = props.selected.indexOf(name) !== -1;
        const userLabel = userBehaviour(USER_BEHAVIOUR_LIST.STATUS, status);
        return (
          <TableRow
            key={index}
            className={customization?.navType === "dark" ? "dark_tableRow" : ""}
          >
            {/* <TableCell padding="checkbox">
                        <Checkbox checked={selectedUser} onChange={(event) => false} />
                    </TableCell> */}
            <TableCell>{`${props.srNo + index}.`}</TableCell>
            <TableCell component="td" scope="row">
              <Typography variant="" className="user-name captialize" noWrap>
                {user_profile_detail?.lastName
                  ? `${user_profile_detail?.firstName} ${user_profile_detail?.lastName}`
                  : user_profile_detail?.firstName || "---"}
              </Typography>
            </TableCell>
            <TableCell component="td">
              <Typography variant="" noWrap>
                {email}
              </Typography>
            </TableCell>
            {/* <TableCell className="role-name" align="left">
              {user_has_role.role.roleName}
            </TableCell> */}
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
            <TableCell align="right">
              <IconButton
                size="small"
                color="inherit"
                onClick={(event) => props.handleOpenMenu(event, id)}
              >
                <Iconify icon={"eva:more-vertical-fill"} />
              </IconButton>
            </TableCell>
          </TableRow>
        );
      })}
    </>
  );
}

export default UserListRow;
