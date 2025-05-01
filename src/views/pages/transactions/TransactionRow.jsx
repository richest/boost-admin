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
import moment from "moment";

function TransactionRow(props) {

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

    if (props?.enqueryList?.length === 0) {
        return (
            <DataNotFound
                colspan={ENQUIRY_TABLE_HEAD.length + 1}
                message="No support enquery found."
            />
        );
    }

    return (
        <>
            {props?.enqueryList?.map((enquer, index) => {
                const {
                    created_at,
                    user,
                    description,
                    plan,
                    id,

                    payment_method,


                    payment_status,

                    plan_id,

                    price,

                    status,

                    transaction_id,

                    updated_at,

                    user_id,

                } = enquer;
                console.log(id, "idid")
                // const message = {
                //     fullname: fullname,
                //     email: email,
                //     subject: subject,
                //     description: description,
                //     status: status,
                //     file_link: file_link,
                //     type: type,
                //     id: id,
                // };
                // const selectedUser = props.selected.indexOf(fullname) !== -1;
                return (
                    <TableRow key={index}
                        className={customization?.navType === "dark" ? "dark_tableRow" : ""}>
                        <TableCell>{`${props.srNo + index}.`}</TableCell>
                        <TableCell component="td" scope="row">
                            {/* <Typography variant="span" className="user-name" noWrap>
                                {`${id || ""}`}
                            </Typography> */}
                        </TableCell>
                        <TableCell component="td">
                            <Typography variant="span" noWrap>
                                {user?.email}
                                {/* {description} */}
                            </Typography>
                        </TableCell>
                        <TableCell className="" align="left">
                        {`${payment_method ? payment_method: "---" }`}

                        </TableCell>



                        <TableCell
                            className="enquiry-message"
                            align="left"
                            sx={{ textAlign: "left" }}
                        >
                            <Typography variant="body">
                                {plan?.name}
                            </Typography>
                        </TableCell>
                        <TableCell className="" align="left">
                            {payment_status === 1 && <Label color="success">Success</Label>}
                            {payment_status === 2 && <Label color="warning">Pending</Label>}
                            {payment_status === 3 && <Label color="error">Deleted</Label>}
                        </TableCell>
                        <TableCell className="" align="left">
                            <Typography variant="body">
                                {moment(created_at).format("DD MMMM YYYY, hh:mm A")}

                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <IconButton
                                component="label"
                                size="medium"
                                color="inherit"
                                onClick={() => props.handleActionDialog(true, enquer)}
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

export default TransactionRow;
