import {
    Button,
    Card,
    Divider,
    FormHelperText,
    Grid,
    MenuItem,
    Popover,
    Stack,
    Table,
    TableBody,
    TableContainer,
    TablePagination,
    Typography,
} from "@mui/material";
import {
    DEFAULT_APP_TITLE,
    DEFAULT_VALUE,
    RESPONSE_CODE,
    ROUTE_SLUGS,
} from "app/constants";
import PageBreadcrumbs from "components/admin-ui/breadcrumbs";
import PageContainer from "components/admin-ui/container";
import AppHelmet from "components/admin-ui/helmet";
import Scrollbar from "components/scrollbar/Scrollbar";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TRANSACTIONS_TABLE_HEAD } from "app/constants/tableHeadings";
import useSearchDebounce from "utils/hooks/textDebounce";
import { COMMON_PAGINATION } from "app/constants/paginations";

import { ApiErrorMessage } from "utils/helpers/function/apiErrorResonse";
import { RESPONSE_MESSAGES } from "app/constants/localizedStrings";
import { FILTER_OPTIONS } from "redux/authenticate/actions";
import {
    deleteRequest,
    getRequest,
    putRequest,
} from "app/httpClient/axiosClient";
import { PAYMENTS, SUPPORT_ENQUERIES } from "app/config/endpoints";
import AntSwitch from "components/admin-ui/switch/antSwitch";
import { Box } from "@mui/system";
import PersonIcon from "@mui/icons-material/Person";
import CustomModal from "components/Models";
import Iconify from "components/iconify";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import DescriptionIcon from "@mui/icons-material/Description";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import { REQUEST_ACTION } from "redux/authenticate/actions";
import toast from "react-hot-toast";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import MergeTypeIcon from "@mui/icons-material/MergeType";
import SubjectIcon from "@mui/icons-material/Subject";
import TransactionRow from "./TransactionRow";
import TransactionHead from "./TransactionHead";

function Transaction() {
    const customization = useSelector((state) => state.customization);
    const { contact_us: contactFilterOption } = useSelector(
        (state) => state.filterOptions
    );

    let ENQUERY_LIST = [];
    const dispatch = useDispatch();

    const [open, setOpen] = useState(null);
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("name");
    const [selected, setSelected] = useState([]);
    const [pageNo, setPageNo] = useState(contactFilterOption.page_no);
    const [srNo, setSrNo] = useState(contactFilterOption.srNo);
    const [rowsPerPage, setRowsPerPage] = useState(
        contactFilterOption.number_of_rows
    );
    const [searchText, setSearchText] = useState("");
    const [searchTextDebounce, setSearchTextDebounce] = useSearchDebounce();
    const [enquiriesCount, setEnquiriesCount] = useState(0);
    const [isLoading, setLoading] = useState(false);
    const [connectionError, setConnectionError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [enqueryList, setEnqueryList] = useState([]);
    const [actionDialog, setActionDialog] = useState(false);
    const [hoveredContent, setHoveredContent] = useState("");
    const [isSolved, setIsSolved] = useState(
        hoveredContent?.status === 1 ? false : true
    );
    console.log(actionDialog, "actionDialogsadsdssd")
    console.log(enqueryList, "enqueryList")
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = ENQUERY_LIST.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };
    const handleSerchInputChange = (event) => {
        const value = event.target.value === undefined ? "" : event.target.value;
        setSearchText(value);
        setSearchTextDebounce(value);
    };
    const handleChangePage = (event, newPage) => {
        setPageNo(newPage);
        setSrNo(rowsPerPage * newPage + 1);
    };
    const handleChangeRowsPerPage = (event) => {
        setPageNo(0);
        setRowsPerPage(parseInt(event.target.value, 10));
        setSrNo(1);
    };
    const handleActionDialog = (status, message = "") => {
        setActionDialog(status);
        setHoveredContent(message);
    };
    const handleCloseMenu = () => {
        setOpen(null);
    };

    const handleChangeStatus = async () => {
        const statusValue = isSolved ? 1 : 2;
        const payload = {
            fullname: hoveredContent.fullname,
            email: hoveredContent.email,
            subject: hoveredContent.subject,
            type: hoveredContent.type,
            description: hoveredContent.description,
            file_link: hoveredContent.file_link,
            status: statusValue,
        };
        try {
            dispatch({ type: REQUEST_ACTION.PROCESSING });
            const {
                status,
                data: { message },
            } = await putRequest(
                `${SUPPORT_ENQUERIES.UPDATE}/${hoveredContent.id}`,
                payload
            );
            if (status === RESPONSE_CODE[200]) {
                dispatch({
                    type: REQUEST_ACTION.SUCCESS,
                    payload: { message: message },
                });
                toast.success(message);
                setActionDialog(false);
                getEnqueries();
            } else {
                dispatch({
                    type: REQUEST_ACTION.FAILURE,
                    payload: { message: ApiErrorMessage() },
                });
            }
            window.scrollTo(0, 0);
        } catch (error) {
            dispatch({
                type: REQUEST_ACTION.FAILURE,
                payload: { message: ApiErrorMessage(error) },
            });
        }
    };

    const handleDeleteEnquiry = async (id) => {
        try {
            dispatch({ type: REQUEST_ACTION.PROCESSING });
            const {
                status,
                data: { message },
            } = await deleteRequest(`${SUPPORT_ENQUERIES.DELETE}/${id}`);

            if (status === RESPONSE_CODE[200]) {
                dispatch({
                    type: REQUEST_ACTION.SUCCESS,
                    payload: { message: message },
                });
                toast.success(message);
                setActionDialog(false);
                getEnqueries();
            } else {
                dispatch({
                    type: REQUEST_ACTION.FAILURE,
                    payload: { message: ApiErrorMessage() },
                });
            }

            handleCloseMenu();
            handleActionDialog(false);
        } catch (error) {
            dispatch({
                type: REQUEST_ACTION.FAILURE,
                payload: { message: ApiErrorMessage(error) },
            });
            toast.error(`${error.response.data.message}`);
            handleCloseMenu();
            handleActionDialog(false);
        }
    };

    async function getEnqueries() {
        const _pageNo = pageNo + 1;
        setLoading(true);
        let _errorMessage;
        const LOCALE = DEFAULT_VALUE.LOCALE;
        try {
            const response = await getRequest(
                `${PAYMENTS.PAYMENT}?${COMMON_PAGINATION.PAGE_NO.KEY}=${_pageNo}&${COMMON_PAGINATION.ROWS_PER_PAGE.KEY}=${rowsPerPage}&${COMMON_PAGINATION.SEARCH_TEXT.KEY}=${searchText}`
            );
            const { status } = response;
            const {
                data: { paymentDetails },
                success,
            } = response.data;
            if (success && status === RESPONSE_CODE[200]) {
                setEnqueryList(paymentDetails?.rows);
                setLoading(false);
                setConnectionError(false);
                setEnquiriesCount(paymentDetails?.count);
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

    useEffect(() => {
        getEnqueries();
    }, [pageNo, rowsPerPage, searchTextDebounce]);

    return (
        <>
            <AppHelmet title={DEFAULT_APP_TITLE.SUPPORT} />
            <PageContainer
                className="page-container users-page"
                heading={DEFAULT_APP_TITLE.PAYMENTS}
            >
                <PageBreadcrumbs
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

                        "Payments",
                    ]}
                />
                <Card
                    sx={{ mt: 4, boxShadow: 3 }}
                    className={customization?.navType === "dark" ? "dark_card" : ""}
                >
                    <Scrollbar>
                        <TableContainer>
                            <Table className="list-table">
                                <TransactionHead
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TRANSACTIONS_TABLE_HEAD}
                                    rowCount={0}
                                    numSelected={selected.length}
                                    onRequestSort={handleRequestSort}
                                    onSelectAllClick={handleSelectAllClick}
                                    handleSerchInputChange={handleSerchInputChange}
                                    searchText={searchText}
                                    handleClearSearchInput={handleSerchInputChange}
                                />
                                <TableBody>
                                    <TransactionRow
                                        loading={isLoading}
                                        connectionError={connectionError}
                                        errorMessage={errorMessage}
                                        enqueryList={enqueryList}
                                        selected={selected}
                                        handleActionDialog={handleActionDialog}
                                        srNo={srNo}
                                    />
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={COMMON_PAGINATION.ROWS_PER_PAGE_OPTIONS}
                            component="div"
                            className={
                                customization?.navType === "dark" ? "dark_pagination" : ""
                            }
                            count={enquiriesCount}
                            rowsPerPage={rowsPerPage}
                            page={pageNo}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Scrollbar>
                </Card>
            </PageContainer>
            <Popover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                PaperProps={{
                    sx: {
                        p: 1,
                        width: 140,
                        "& .MuiMenuItem-root": {
                            px: 1,
                            typography: "body2",
                            borderRadius: 0.75,
                        },
                    },
                }}
            >
                <MenuItem>
                    <Iconify
                        icon={"material-symbols:supervised-user-circle"}
                        sx={{ mr: 2 }}
                    />
                    View
                </MenuItem>
            </Popover>
            {actionDialog && (
                <CustomModal open={setActionDialog} handleClose={handleCloseMenu}>
                    <Box
                        sx={{ p: 5 }}
                        className={customization?.navType === "dark" ? "dark_Modal" : ""}
                    >
                        <Typography
                            variant="h4"
                            color="primary"
                            align="center"
                            sx={{ mb: 2 }}
                        >
                            Details
                        </Typography>
                        <Divider sx={{ mb: 3 }} />

                        <Grid container spacing={2} sx={{ mb: 2 }}>
                            <Grid item xs={12} sm={6}>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <PersonIcon color="primary" />
                                    <Typography variant="body1">
                                        <strong>Name:</strong> {hoveredContent.user.user_profile_detail.firstName}
                                    </Typography>
                                </Stack>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <EmailIcon color="primary" />
                                    <Typography variant="body1">
                                        <strong>Email:</strong> {hoveredContent.user.email}
                                    </Typography>
                                </Stack>
                            </Grid>



                            <Grid item xs={12} sm={6}>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    {console.log(hoveredContent, "hoveredContent")}
                                    {hoveredContent.payment_status === 2 ? (
                                        <AccessTimeFilledIcon color="warning" />
                                    ) : (
                                        <CheckCircleIcon color="success" />
                                    )}
                                    <Typography variant="body1">
                                        <strong>Status:</strong>{" "}
                                        {hoveredContent.payment_status === 2 ? "Pending" : "Success"}
                                    </Typography>
                                </Stack>
                            </Grid>



                            {/* {hoveredContent.file_link && (
                                <Grid item xs={12}>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <PermMediaIcon color="primary" />
                                        <Typography variant="body1">
                                            <strong>Media:</strong>
                                        </Typography>
                                    </Stack>
                                    <Box height={200} width={200}>
                                        <img
                                            style={{
                                                height: "100%",
                                                width: "100%",
                                                objectFit: "cover",
                                            }}
                                            src={hoveredContent.file_link}
                                            alt="media"
                                        />
                                    </Box>
                                </Grid>
                            )} */}
                        </Grid>
                        {/* <Stack
                            direction="row"
                            justifyContent="end"
                            alignItems="center"
                            my={2}
                        >
                            <Box
                                className={
                                    customization?.navType === "dark" ? "dark_status" : ""
                                }
                            >
                                <Typography variant="h5">Change Status</Typography>
                                <FormHelperText>
                                    Pending to Solved and vice versa
                                </FormHelperText>
                            </Box>
                            <Box px={2}>
                                <AntSwitch
                                    onChange={(event) => {
                                        setIsSolved(event.target.checked);
                                        handleChangeStatus();
                                    }}
                                    checked={isSolved}
                                    sx={{ variant: "success" }}
                                />
                            </Box>
                        </Stack> */}
                        <Stack direction="row" justifyContent="end" spacing={2}>
                            {/* <Button
                                disabled={isLoading}
                                variant="outlined"
                                color="error"
                                onClick={() => handleDeleteEnquiry(hoveredContent.id)}
                            >
                                Delete
                            </Button> */}
                            <Button
                                disabled={isLoading}
                                variant="outlined"
                                onClick={() => setActionDialog(false)}
                            >
                                Close
                            </Button>
                        </Stack>
                    </Box>
                </CustomModal>
            )}
        </>
    );
}

export default Transaction;
