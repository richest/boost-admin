import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Grid,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
} from "@mui/material";
import {
  DEFAULT_APP_TITLE,
  DEFAULT_VALUE,
  RESPONSE_CODE,
  ROUTE_SLUGS,
  USER_STATUS,
} from "app/constants";
import AddIcon from "@mui/icons-material/Add";

import PageBreadcrumbs from "components/admin-ui/breadcrumbs";
import PageContainer from "components/admin-ui/container";
import AppHelmet from "components/admin-ui/helmet";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { gridSpacing } from "redux/customization/constant";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import TextErrorMessage from "components/admin-ui/textErrorMessage";
import Scrollbar from "components/scrollbar/Scrollbar";
import UserListHead from "./sections/TemplateListHead";
import { TEMPLATE_TABLE_HEAD } from "app/constants/tableHeadings";
import { useDispatch, useSelector } from "react-redux";
import { FILTER_OPTIONS, REQUEST_ACTION } from "redux/authenticate/actions";
import { ApiErrorMessage } from "utils/helpers/function/apiErrorResonse";
import { RESPONSE_MESSAGES } from "app/constants/localizedStrings";
import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
  putRequest,
} from "app/httpClient/axiosClient";
import { USERS_PRM } from "app/constants/paginations";
import {
  CREATED_BLOCKS,
  PRODUCTS,
  TEMPLATES,
  USERS,
} from "app/config/endpoints";
import useSearchDebounce from "utils/hooks/textDebounce";
// import ProductCard from "./sections/ProductCard";
import ActionDialog from "./dialogs";
import toast from "react-hot-toast";
import BlockCard from "./sections/BlockCard";

const AllBlocksList = () => {
  const { user: userFilterOption } = useSelector(
    (state) => state.filterOptions
  );
  const location = useLocation();
  console.log(location, "locationsjhs");
  const dispatch = useDispatch();
  const [open, setOpen] = useState(null);
  const [openUndo, setOpenUndo] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(
    userFilterOption.number_of_rows
  );

  const [pageNo, setPageNo] = useState(userFilterOption.page_no);
  const [srNo, setSrNo] = useState(userFilterOption.srNo);
  const [totalUsersCount, setProductCount] = useState(0);
  const [productList, setProductList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userTypeSelection, setUserTypeSelection] = useState(
    userFilterOption.role_id
  );
  const [hoveredUserId, setHoveredUserId] = useState(null);
  const [hoveredUserObj, setHoveredUserObj] = useState({});
  const [searchText, setSearchText] = useState("");
  const [searchTextDebounce, setSearchTextDebounce] = useSearchDebounce();
  const [actionDialog, setActionDialog] = useState(false);
  const [actionUndo, setActionUndo] = useState(false);

  const navigate = useNavigate();
  let USERLIST = [];

  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setHoveredUserId(id);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleOpenMenu = (id) => {
    const userObj = productList.find((user) => user.id === id);
    // setOpen(event.currentTarget);
    setHoveredUserId(id);
    setHoveredUserObj(userObj);
  };

  const handleActionDialog = (status) => {
    setActionDialog(status);
  };
  const handleActionUndo = (status) => {
    setActionUndo(status);
  };

  const handleCloseMenu = () => {
    setOpen(null);
    setOpenUndo(null);
    setHoveredUserId(null);
  };

  const handleChangePage = (event, newPage) => {
    setPageNo(newPage);
    // setSrNo(rowsPerPage * newPage + 1);
  };

  const deleteProduct = async () => {
    try {
      dispatch({ type: REQUEST_ACTION.PROCESSING });
      const {
        status,
        data: { message },
      } = await deleteRequest(`${PRODUCTS.DELETE}/${hoveredUserId}`);

      if (status === RESPONSE_CODE[200]) {
        dispatch({
          type: REQUEST_ACTION.SUCCESS,
          payload: { message: message },
        });
        toast.success("Product deleted successfull.");
        blockListCallBack();
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

  const blockListCallBack = () => {
    let blockType;
    blockType = location?.pathname?.includes("text-image")
      ? "TEXT-IMAGE"
      : "COVER";
    console.log(blockType, "chekcehhhetete");
    getBlocks(`${CREATED_BLOCKS.GET_ALL_COVERS}?type=${blockType}`);
  };

  async function getBlocks(url) {
    setLoading(true);
    dispatch({ type: REQUEST_ACTION.INIT_LOADER, payload: { loader: true } });
    let _errorMessage;
    const LOCALE = DEFAULT_VALUE.LOCALE;
    try {
      const response = await getRequest(url);
      const { status } = response;
      const {
        data: {
          blockDetails: { rows },
        },

        success,
      } = response.data;

      if (status === RESPONSE_CODE[200]) {
        setProductList(rows);
        setLoading(false);
        setConnectionError(false);
        setProductCount(totalCounts);
        dispatch({
          type: REQUEST_ACTION.INIT_LOADER,
          payload: { loader: false },
        });
      } else {
        setErrorMessage(RESPONSE_MESSAGES[LOCALE].FETCHING_USERS_LIST);
        dispatch({
          type: REQUEST_ACTION.FAILURE,
          payload: { message: ApiErrorMessage() },
        });
      }
    } catch (error) {
      _errorMessage = ApiErrorMessage(error);
      setConnectionError(true);
      setErrorMessage(_errorMessage);
      setLoading(false);
      dispatch({
        type: REQUEST_ACTION.FAILURE,
        payload: { message: _errorMessage },
      });
    }
  }

  const deleteDialog = () => {
    setActionDialog(true);
  };

  const handleCreateTemplate = async (id, title) => {
    const payload = {
      product_id: id,
    };
    try {
      dispatch({ type: REQUEST_ACTION.PROCESSING });
      const {
        status,
        data: {
          message,
          data: { unique_id },
        },
      } = await postRequest(TEMPLATES.CREATE, payload);

      if (status === RESPONSE_CODE[200]) {
        dispatch({
          type: REQUEST_ACTION.SUCCESS,
          payload: { message: message },
        });
        toast.success(message);
        navigate(
          `/dashboard/templates/create/${unique_id
            .replace(/[\s/]+/g, "-")
            .toLowerCase()}`
        );
      } else {
        dispatch({
          type: REQUEST_ACTION.FAILURE,
          payload: { message: ApiErrorMessage() },
        });
        toast.error(message);
      }
    } catch (error) {
      dispatch({
        type: REQUEST_ACTION.FAILURE,
        payload: { message: ApiErrorMessage(error) },
      });
      toast.error(error);
    }
  };

  const handleCreateBlock = async () => {
    const cover_block_json = {
      text: "<p style=\"font-size: 48px; color: white; font-family: 'Playfair Display';\"><strong>Default title</strong></p><p style=\"font-size: 16px; color: white; font-family: 'Ubuntu';\">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga beatae ea voluptatum architecto vero temporibus illum fugiat.</p>",
      imageUrl:
        "https://res.cloudinary.com/dwl5gzbuz/image/upload/v1736856440/low-angle-greyscale-shot-two-propellers-plane-ready-takeoff_mpvpsi.jpg",
      buttonUrl: "https://boostplatform.app/",
      buttonText:
        "<p style=\"text-align: center; font-size: 16px; line-height: 1.5; color: black; font-family: 'Roboto';\">Read</p>",
      logotypeUrl:
        "https://res.cloudinary.com/dwl5gzbuz/image/upload/v1736856628/logo_elep97.png",
      isShowButton: true,
      logotypeScale: 15,
      buttonPosition: "left",
      isShowLogotype: true,
      darkenBackground: 35,
      imageProportions: "3|2",
      logotypePosition: "left",
      buttonBorderRadius: 9,
      buttonBackgroundColor: "#ffffff",
    };

    const text_block_json = {
      text: '<p><strong style="color: rgb(255, 255, 255); font-size: 36px; line-height: 1.5;">Your Heading</strong></p> <p><span style="color: rgb(255, 255, 255);font-size: 14px;line-height: 1.5;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia, felis sit amet facilisis placerat, neque dui accumsan risus, eget maximus urna justo eget nulla. Nullam non purus sit amet felis mollis aliquet. Quisque id orci magna. Integer sit amet odio lectus. Integer id velit velit. Mauris quis orci eu metus tempus posuere.</span></p>',
      imageUrl: "https://media.interacty.me/2902765",
      buttonUrl: "https://interacty.me",
      buttonText:
        '<p className="ql-align-center"><span style="color: rgb(255, 255, 255); font-size: 20px; line-height: 1.5; font-family: Roboto;">Button</span></p>',
      isShowButton: true,
      textPosition: "right",
      backgroundColor: "#2a9d8f",
      imageProportions: "1|1",
      buttonBorderRadius: 4,
      buttonBackgroundColor: "#264653",
      isTransparentBackground: false,
    };

    let blockType, block_json;

    block_json = location?.pathname?.includes("text-image")
      ? text_block_json
      : cover_block_json;
    blockType = location?.pathname?.includes("text-image")
      ? "TEXT-IMAGE"
      : "COVER";
    const payload = {
      block_type: blockType,
      block_json: JSON.stringify(block_json),
      title: "Your heading",
    };
    try {
      dispatch({ type: REQUEST_ACTION.PROCESSING });
      const {
        status,
        data: { message, data },
      } = await postRequest(CREATED_BLOCKS.CREATE_BLOCK, payload);

      if (status === RESPONSE_CODE[200]) {
        dispatch({
          type: REQUEST_ACTION.SUCCESS,
          payload: { message: message },
        });
        toast.success(message);
        navigate(`/dashboard/blocks/view-block/${data?.id}`);
      } else {
        dispatch({
          type: REQUEST_ACTION.FAILURE,
          payload: { message: ApiErrorMessage() },
        });
        toast.error(message);
      }
    } catch (error) {
      dispatch({
        type: REQUEST_ACTION.FAILURE,
        payload: { message: ApiErrorMessage(error) },
      });
      toast.error(error);
    }
  };

  useEffect(() => {
    blockListCallBack();
  }, [pageNo, rowsPerPage, userTypeSelection, searchTextDebounce]);

  return (
    <>
      <AppHelmet title={DEFAULT_APP_TITLE.SELECT_PRODUCT} />
      <PageContainer className="page-container users-page" heading="All Blocks">
        <Grid
          container
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={2}
        >
          <Grid item>
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
                <Link
                  style={{
                    color: "rgb(99, 115, 129)",
                    textDecoration: "none",
                  }}
                  to={ROUTE_SLUGS.BLOCKS}
                >
                  Blocks
                </Link>,
                "List",
              ]}
            />
          </Grid>
          <Grid
            container
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={2}
          >
            <Grid item>
              <Link className="" to={ROUTE_SLUGS.TEMPLATE_LIST}>
                <Button
                  sx={{ borderRadius: "2pt" }}
                  variant="contained"
                  color="primary"
                  startIcon={<ReplyAllIcon />}
                >
                  Back
                </Button>
              </Link>
            </Grid>
            <Grid item mr={1}>
              <Button
                sx={{ borderRadius: "2pt" }}
                variant="contained"
                onClick={handleCreateBlock}
                color="primary"
                startIcon={<AddIcon />}
              >
                New Block
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ pt: 2 }}>
          {productList.map((product) => (
            <Grid key={product.id} item xs={12} sm={4} md={4} lg={2.4}>
              <BlockCard
                path={`/dashboard/blocks/view-block/${product?.id}`}
                color="primary"
                title={product.title}
                icon={product.icon}
                id={product?.id}
                hoveredUserId={hoveredUserId}
                handleOpenMenu={handleOpenMenu}
                handlePopoverOpen={handlePopoverOpen}
                handlePopoverClose={handlePopoverClose}
                handleDelete={deleteDialog}
                anchorEl={anchorEl}
                handleCreateTemplate={handleCreateTemplate}
              />
            </Grid>
          ))}
        </Grid>
      </PageContainer>

      {actionDialog && (
        <ActionDialog
          cancelAction={handleCloseMenu}
          deleteAction={deleteProduct}
          id={hoveredUserId}
          setIsOpen={setActionDialog}
          isOpen={actionDialog}
        />
      )}
    </>
  );
};

export default AllBlocksList;
