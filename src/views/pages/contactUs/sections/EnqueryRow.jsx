import { lazy } from "react";
import { TableCell, TableRow, Typography, IconButton } from "@mui/material";
import Iconify from "components/iconify";
import { ENQUIRY_TABLE_HEAD } from "app/constants/tableHeadings";
import ConnectionError from "components/admin-ui/noDataResonse/connectionError";
import SkeltonLoader from "components/admin-ui/loader/SkeltonLoader";
import DataNotFound from "components/admin-ui/noDataResonse/dataNotFound";
import { wordsCapping } from "utils/helpers/function";
import Label from "components/label";
import { useSelector } from "react-redux";

function EnqueryRow(props) {


  const customization = useSelector((state) => state.customization);
  if (props.loading) {
    return (
      <SkeltonLoader
        colSpan={ENQUIRY_TABLE_HEAD.length + 1}
        rows={5}
        columns={6}
        loaderMessage="Please wait..."
      />
    );
  }

  if (props.connectionError) {
    return (
      <ConnectionError
        colspan={ENQUIRY_TABLE_HEAD.length + 1}
        message={props.errorMessage}
      />
    );
  }

  if (props.enqueryList?.rows?.length === 0) {
    return (
      <DataNotFound
        colspan={ENQUIRY_TABLE_HEAD.length + 1}
        message="No Enquery found."
      />
    );
  }


  return (
    <>
      {props.enqueryList?.rows?.map((enquer, index) => {
        const {
          id,
          user_id,
          firstname,
          lastname,
          email,
          phonenumber,
          description,
          status,
        } = enquer;
        const message = {
          firstname: firstname,
          lastname: lastname,
          email: email,
          contactNo: phonenumber,
          description: description,
          status: status,
          id: id,
        };
        const selectedUser = props.selected.indexOf(firstname) !== -1;
        return (
          <TableRow key={id} 
          className={customization?.navType === "dark" ? "dark_tableRow" : ""}>
            <TableCell>{`${props.srNo + index}.`}</TableCell>
            <TableCell component="td" scope="row">
              <Typography variant="span" className="user-name" noWrap>
                {`${firstname} ${lastname || ""}`}
              </Typography>
            </TableCell>
            <TableCell component="td">
              <Typography variant="span" noWrap>
                {email}
              </Typography>
            </TableCell>
            <TableCell className="" align="left">
              {`${phonenumber}`}
            </TableCell>

            <TableCell className="" align="left">
              {status === 1 && <Label color="warning">Pending</Label>}
              {status === 2 && <Label color="success">Resolved</Label>}
              {status === 3 && <Label color="error">Deleted</Label>}
            </TableCell>

            <TableCell
              className="enquiry-message"
              align="left"
              sx={{ textAlign: "left" }}
            >
              <Typography variant="body">
                {description ? wordsCapping(description) : "NA"}
              </Typography>
            </TableCell>
            <TableCell align="right">
              <IconButton
                component="label"
                size="medium"
                color="inherit"
                onClick={() => props.handleActionDialog(true, message)}
              >
                <Iconify icon="carbon:view-filled" />
              </IconButton>
            </TableCell>
          </TableRow>
        );
      })}
    </>
  );
}

export default EnqueryRow;
