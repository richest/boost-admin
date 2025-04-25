import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { REQUEST_ACTION } from "src/redux/authenticate/actions";
import { useNavigate } from "react-router-dom";
import { toPng } from "html-to-image";

// app components
import AppHelmet from "components/admin-ui/helmet";
import PageContainer from "components/admin-ui/container";
import PageBreadcrumbs from "components/admin-ui/breadcrumbs";
// ----- end of app components

// defalut constants
import {
  DEFAULT_APP_TITLE,
  RESPONSE_CODE,
  ROUTE_SLUGS,
  DEFAULT_VALUE,
} from "app/constants";
import { BLOGS, CREATED_BLOCKS, POSTS, PRODUCTS } from "app/config/endpoints";
import { ApiErrorMessage } from "utils/helpers/function/apiErrorResonse";

// ----- end of default constants

// @mui components
import Grid from "@mui/material/Grid";

import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// ----- end of @mui components

import { getRequest, putRequest } from "app/httpClient/axiosClient";
// import EditProductForm from "./editForm";
import { REQUEST_ACTION } from "redux/authenticate/actions";
import EditProductForm from "./editForm";
import { RESPONSE_MESSAGES } from "app/constants/localizedStrings";
import DrawerCover from "components/Drawers/Cover";
import CoverLayout from "./CoverLayout";
import BlockSettings from "./BlockSettings";
import toast from "react-hot-toast";
import ImageModal from "layout/ImageModel";
import PreviewModal from "../PreviewModal";
import TextImageLayout from "./TextImageLayout";
import ImageModalEdit from "./ImageModal";

function EditBlock() {
  const { slug } = useParams();
  const params = useParams();
  const dispatch = useDispatch();
  const [productDetails, setProductDetails] = useState();
  const [productList, setProductList] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [openPreviewModal, setOpenPreviewModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedBlock, setSelectedBlock] = useState("");
  const [editorText, setEditorText] = useState(
    `${productDetails?.block_json?.text}`
  );
  const [previewUrl, setPreviewUrl] = useState("");

  const [mainData, setMainData] = useState();

  const productListCallBack = () => {
    getProductDetails(slug);
  };

  async function getProductDetails(productid) {
    const LOCALE = DEFAULT_VALUE.LOCALE;
    dispatch({ type: REQUEST_ACTION.PROCESSING });

    try {
      const response = await getRequest(
        `${CREATED_BLOCKS.VIEW_BLOCk}/${productid}`
      );
      const { status } = response;
      const { data, success } = response.data;
      console.log(data, "checkdkdkdkdkds");
      if (success && status === RESPONSE_CODE[200]) {
        dispatch({ type: REQUEST_ACTION.SUCCESS, payload: { message: "" } });
        setProductDetails(data.blockDetails);
      } else {
        dispatch({
          type: REQUEST_ACTION.FAILURE,
          payload: { message: ApiErrorMessage() },
        });
      }
    } catch (error) {
      dispatch({
        type: REQUEST_ACTION.FAILURE,
        payload: { message: ApiErrorMessage(error) },
      });
    }
  }

  const handleSelectChange = async (select) => {
    const updateBlockDetails = {
      ...productDetails?.block_json,
      imageProportions: select.value,
    };
    console.log(updateBlockDetails, "selectselectselectselect");
    const payload = {
      block_json: JSON.stringify(updateBlockDetails),
    };

    try {
      dispatch({ type: REQUEST_ACTION.PROCESSING });
      const {
        status,
        data: { message },
      } = await putRequest(
        `${CREATED_BLOCKS.EDIT_BLOCk}/${productDetails.id}`,
        payload
      );
      if (status === RESPONSE_CODE[200]) {
        dispatch({
          type: REQUEST_ACTION.SUCCESS,
          payload: { message: message },
        });
        // toast.success(`${"Block updated successfully"}`);
        productListCallBack();
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

  const handleChangeMedia = (type) => {
    setOpenImageModal(true);
    setSelectedBlock(type);
  };

  const handleAddItem = async () => {
    let timeout;
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      let updateBlockDetails;
      updateBlockDetails = {
        ...productDetails?.block_json,
        imageUrl: selectedImage,
      };

      const payload = {
        block_json: JSON.stringify(updateBlockDetails),
      };

      try {
        dispatch({ type: REQUEST_ACTION.PROCESSING });
        const {
          status,
          data: { message },
        } = await putRequest(
          `${CREATED_BLOCKS.EDIT_BLOCk}/${productDetails.id}`,
          payload
        );
        if (status === RESPONSE_CODE[200]) {
          dispatch({
            type: REQUEST_ACTION.SUCCESS,
            payload: { message: message },
          });
          setOpenImageModal(false);
          productListCallBack();
          setSelectedBlock("");
          setSelectedImage(null);
        } else {
          dispatch({
            type: REQUEST_ACTION.FAILURE,
            payload: { message: ApiErrorMessage() },
          });
        }
      } catch (error) {
        dispatch({
          type: REQUEST_ACTION.FAILURE,
          payload: { message: ApiErrorMessage(error) },
        });
      }
    }, 500);
  };

  const handleSelectMedia = (image_url) => {
    setSelectedImage(image_url);
  };

  const handleChangeDarkBackground = async (e) => {
    let timeout;
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      let updateBlockDetails;
      updateBlockDetails = {
        ...productDetails?.block_json,
        darkenBackground: e,
      };

      const payload = {
        block_json: JSON.stringify(updateBlockDetails),
      };

      try {
        dispatch({ type: REQUEST_ACTION.PROCESSING });
        const {
          status,
          data: { message },
        } = await putRequest(
          `${CREATED_BLOCKS.EDIT_BLOCk}/${productDetails.id}`,
          payload
        );
        if (status === RESPONSE_CODE[200]) {
          dispatch({
            type: REQUEST_ACTION.SUCCESS,
            payload: { message: message },
          });
          setOpenImageModal(false);
          productListCallBack();
          setSelectedBlock("");
          setSelectedImage(null);
        } else {
          dispatch({
            type: REQUEST_ACTION.FAILURE,
            payload: { message: ApiErrorMessage() },
          });
        }
      } catch (error) {
        dispatch({
          type: REQUEST_ACTION.FAILURE,
          payload: { message: ApiErrorMessage(error) },
        });
      }
    }, 500);
  };

  const handeCheckLogoType = (e) => {
    let timeout;
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      let updateBlockDetails;
      updateBlockDetails = {
        ...productDetails?.block_json,
        isShowLogotype: e.target.checked,
      };

      const payload = {
        block_json: JSON.stringify(updateBlockDetails),
      };

      try {
        dispatch({ type: REQUEST_ACTION.PROCESSING });
        const {
          status,
          data: { message },
        } = await putRequest(
          `${CREATED_BLOCKS.EDIT_BLOCk}/${productDetails.id}`,
          payload
        );
        if (status === RESPONSE_CODE[200]) {
          dispatch({
            type: REQUEST_ACTION.SUCCESS,
            payload: { message: message },
          });
          setOpenImageModal(false);
          productListCallBack();
          setSelectedBlock("");
          setSelectedImage(null);
        } else {
          dispatch({
            type: REQUEST_ACTION.FAILURE,
            payload: { message: ApiErrorMessage() },
          });
        }
      } catch (error) {
        dispatch({
          type: REQUEST_ACTION.FAILURE,
          payload: { message: ApiErrorMessage(error) },
        });
      }
    }, 500);
  };

  const handleLogoWidth = (e) => {
    let timeout;
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      let updateBlockDetails;
      updateBlockDetails = {
        ...productDetails?.block_json,
        logotypeScale: e,
      };

      const payload = {
        block_json: JSON.stringify(updateBlockDetails),
      };

      try {
        dispatch({ type: REQUEST_ACTION.PROCESSING });
        const {
          status,
          data: { message },
        } = await putRequest(
          `${CREATED_BLOCKS.EDIT_BLOCk}/${productDetails.id}`,
          payload
        );
        if (status === RESPONSE_CODE[200]) {
          dispatch({
            type: REQUEST_ACTION.SUCCESS,
            payload: { message: message },
          });
          setOpenImageModal(false);
          productListCallBack();
          setSelectedBlock("");
          setSelectedImage(null);
        } else {
          dispatch({
            type: REQUEST_ACTION.FAILURE,
            payload: { message: ApiErrorMessage() },
          });
        }
      } catch (error) {
        dispatch({
          type: REQUEST_ACTION.FAILURE,
          payload: { message: ApiErrorMessage(error) },
        });
      }
    }, 500);
  };

  const handleChangePosition = (position) => {
    let timeout;
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      let updateBlockDetails;
      updateBlockDetails = {
        ...productDetails?.block_json,
        logotypePosition: position,
      };

      const payload = {
        block_json: JSON.stringify(updateBlockDetails),
      };

      try {
        dispatch({ type: REQUEST_ACTION.PROCESSING });
        const {
          status,
          data: { message },
        } = await putRequest(
          `${CREATED_BLOCKS.EDIT_BLOCk}/${productDetails.id}`,
          payload
        );
        if (status === RESPONSE_CODE[200]) {
          dispatch({
            type: REQUEST_ACTION.SUCCESS,
            payload: { message: message },
          });
          setOpenImageModal(false);
          productListCallBack();
          setSelectedBlock("");
          setSelectedImage(null);
        } else {
          dispatch({
            type: REQUEST_ACTION.FAILURE,
            payload: { message: ApiErrorMessage() },
          });
        }
      } catch (error) {
        dispatch({
          type: REQUEST_ACTION.FAILURE,
          payload: { message: ApiErrorMessage(error) },
        });
      }
    }, 500);
  };

  const handleShowButton = (e) => {
    let timeout;
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      let updateBlockDetails;
      updateBlockDetails = {
        ...productDetails?.block_json,
        isShowButton: e,
      };

      const payload = {
        block_json: JSON.stringify(updateBlockDetails),
      };

      try {
        dispatch({ type: REQUEST_ACTION.PROCESSING });
        const {
          status,
          data: { message },
        } = await putRequest(
          `${CREATED_BLOCKS.EDIT_BLOCk}/${productDetails.id}`,
          payload
        );
        if (status === RESPONSE_CODE[200]) {
          dispatch({
            type: REQUEST_ACTION.SUCCESS,
            payload: { message: message },
          });
          setOpenImageModal(false);
          productListCallBack();
          setSelectedBlock("");
          setSelectedImage(null);
        } else {
          dispatch({
            type: REQUEST_ACTION.FAILURE,
            payload: { message: ApiErrorMessage() },
          });
        }
      } catch (error) {
        dispatch({
          type: REQUEST_ACTION.FAILURE,
          payload: { message: ApiErrorMessage(error) },
        });
      }
    }, 500);
  };

  const handeAddLink = (e) => {
    let timeout;
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      let updateBlockDetails;
      updateBlockDetails = {
        ...productDetails?.block_json,
        buttonUrl: e,
      };

      const payload = {
        block_json: JSON.stringify(updateBlockDetails),
      };

      try {
        dispatch({ type: REQUEST_ACTION.PROCESSING });
        const {
          status,
          data: { message },
        } = await putRequest(
          `${CREATED_BLOCKS.EDIT_BLOCk}/${productDetails.id}`,
          payload
        );
        if (status === RESPONSE_CODE[200]) {
          dispatch({
            type: REQUEST_ACTION.SUCCESS,
            payload: { message: message },
          });
          setOpenImageModal(false);
          productListCallBack();
          setSelectedBlock("");
          setSelectedImage(null);
        } else {
          dispatch({
            type: REQUEST_ACTION.FAILURE,
            payload: { message: ApiErrorMessage() },
          });
        }
      } catch (error) {
        dispatch({
          type: REQUEST_ACTION.FAILURE,
          payload: { message: ApiErrorMessage(error) },
        });
      }
    }, 500);
  };

  const handleChangeColorInput = (e) => {
    let timeout;
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      let updateBlockDetails;
      updateBlockDetails = {
        ...productDetails?.block_json,
        buttonBackgroundColor: e,
      };

      const payload = {
        block_json: JSON.stringify(updateBlockDetails),
      };

      try {
        dispatch({ type: REQUEST_ACTION.PROCESSING });
        const {
          status,
          data: { message },
        } = await putRequest(
          `${CREATED_BLOCKS.EDIT_BLOCk}/${productDetails.id}`,
          payload
        );
        if (status === RESPONSE_CODE[200]) {
          dispatch({
            type: REQUEST_ACTION.SUCCESS,
            payload: { message: message },
          });
          setOpenImageModal(false);
          productListCallBack();
          setSelectedBlock("");
          setSelectedImage(null);
        } else {
          dispatch({
            type: REQUEST_ACTION.FAILURE,
            payload: { message: ApiErrorMessage() },
          });
        }
      } catch (error) {
        dispatch({
          type: REQUEST_ACTION.FAILURE,
          payload: { message: ApiErrorMessage(error) },
        });
      }
    }, 500);
  };

  const handleChangeColorInputPicker = (color) => {
    let timeout;
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      let updateBlockDetails;
      updateBlockDetails = {
        ...productDetails?.block_json,
        buttonBackgroundColor: color?.hex,
      };

      const payload = {
        block_json: JSON.stringify(updateBlockDetails),
      };

      try {
        dispatch({ type: REQUEST_ACTION.PROCESSING });
        const {
          status,
          data: { message },
        } = await putRequest(
          `${CREATED_BLOCKS.EDIT_BLOCk}/${productDetails.id}`,
          payload
        );
        if (status === RESPONSE_CODE[200]) {
          dispatch({
            type: REQUEST_ACTION.SUCCESS,
            payload: { message: message },
          });
          setOpenImageModal(false);
          productListCallBack();
          setSelectedBlock("");
          setSelectedImage(null);
        } else {
          dispatch({
            type: REQUEST_ACTION.FAILURE,
            payload: { message: ApiErrorMessage() },
          });
        }
      } catch (error) {
        dispatch({
          type: REQUEST_ACTION.FAILURE,
          payload: { message: ApiErrorMessage(error) },
        });
      }
    }, 500);
  };

  const handleChangeBorderRadius = (e) => {
    let timeout;
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      let updateBlockDetails;
      updateBlockDetails = {
        ...productDetails?.block_json,
        buttonBorderRadius: e,
      };
      const payload = {
        block_json: JSON.stringify(updateBlockDetails),
      };
      try {
        dispatch({ type: REQUEST_ACTION.PROCESSING });
        const {
          status,
          data: { message },
        } = await putRequest(
          `${CREATED_BLOCKS.EDIT_BLOCk}/${productDetails.id}`,
          payload
        );
        if (status === RESPONSE_CODE[200]) {
          dispatch({
            type: REQUEST_ACTION.SUCCESS,
            payload: { message: message },
          });
          setOpenImageModal(false);
          productListCallBack();
          setSelectedBlock("");
          setSelectedImage(null);
        } else {
          dispatch({
            type: REQUEST_ACTION.FAILURE,
            payload: { message: ApiErrorMessage() },
          });
        }
      } catch (error) {
        dispatch({
          type: REQUEST_ACTION.FAILURE,
          payload: { message: ApiErrorMessage(error) },
        });
      }
    }, 500);
  };
  const handleChangePositionButton = (position) => {
    let timeout;

    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      let updateBlockDetails;
      updateBlockDetails = {
        ...productDetails?.block_json,
        buttonPosition: position,
      };

      const payload = {
        block_json: JSON.stringify(updateBlockDetails),
      };

      try {
        dispatch({ type: REQUEST_ACTION.PROCESSING });
        const {
          status,
          data: { message },
        } = await putRequest(
          `${CREATED_BLOCKS.EDIT_BLOCk}/${productDetails.id}`,
          payload
        );
        if (status === RESPONSE_CODE[200]) {
          dispatch({
            type: REQUEST_ACTION.SUCCESS,
            payload: { message: message },
          });
          setOpenImageModal(false);
          productListCallBack();
          setSelectedBlock("");
          setSelectedImage(null);
        } else {
          dispatch({
            type: REQUEST_ACTION.FAILURE,
            payload: { message: ApiErrorMessage() },
          });
        }
      } catch (error) {
        dispatch({
          type: REQUEST_ACTION.FAILURE,
          payload: { message: ApiErrorMessage(error) },
        });
      }
    }, 500);
  };

  const handleChangePositionButtonTextImage = (position) => {
    let timeout;
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      let updateBlockDetails;
      updateBlockDetails = {
        ...productDetails?.block_json,
        textPosition: position,
      };

      const payload = {
        block_json: JSON.stringify(updateBlockDetails),
      };

      try {
        dispatch({ type: REQUEST_ACTION.PROCESSING });
        const {
          status,
          data: { message },
        } = await putRequest(
          `${CREATED_BLOCKS.EDIT_BLOCk}/${productDetails.id}`,
          payload
        );
        if (status === RESPONSE_CODE[200]) {
          dispatch({
            type: REQUEST_ACTION.SUCCESS,
            payload: { message: message },
          });
          setOpenImageModal(false);
          productListCallBack();
          setSelectedBlock("");
          setSelectedImage(null);
        } else {
          dispatch({
            type: REQUEST_ACTION.FAILURE,
            payload: { message: ApiErrorMessage() },
          });
        }
      } catch (error) {
        dispatch({
          type: REQUEST_ACTION.FAILURE,
          payload: { message: ApiErrorMessage(error) },
        });
      }
    }, 500);
  };
  const handleChangeText = (html) => {
    setEditorText(html);
    let timeout;
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      let updateBlockDetails;
      updateBlockDetails = {
        ...productDetails?.block_json,
        text: html,
      };

      const payload = {
        block_json: JSON.stringify(updateBlockDetails),
      };

      try {
        dispatch({ type: REQUEST_ACTION.PROCESSING });
        const {
          status,
          data: { message },
        } = await putRequest(
          `${CREATED_BLOCKS.EDIT_BLOCk}/${productDetails.id}`,
          payload
        );
        if (status === RESPONSE_CODE[200]) {
          dispatch({
            type: REQUEST_ACTION.SUCCESS,
            payload: { message: message },
          });
          setOpenImageModal(false);
          // productListCallBack();
          setSelectedBlock("");
          setSelectedImage(null);
        } else {
          dispatch({
            type: REQUEST_ACTION.FAILURE,
            payload: { message: ApiErrorMessage() },
          });
        }
      } catch (error) {
        dispatch({
          type: REQUEST_ACTION.FAILURE,
          payload: { message: ApiErrorMessage(error) },
        });
      }
    }, 1000);
  };

  const handleSaveText = () => {
    console.log(editorText, "checkeditortext");
    let updateBlockDetails;
    updateBlockDetails = {
      ...productDetails?.block_json,
      text: editorText,
    };
    console.log(updateBlockDetails, "updateyhgteeww");
    setMainData(updateBlockDetails);
  };

  const handleSaveButtonText = () => {};

  const handleChangeTextButton = (html) => {
    // setEditorText(html);
    let timeout;
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      let updateBlockDetails;
      updateBlockDetails = {
        ...productDetails?.block_json,
        buttonText: html,
      };
      const payload = {
        block_json: JSON.stringify(updateBlockDetails),
      };
      try {
        dispatch({ type: REQUEST_ACTION.PROCESSING });
        const {
          status,
          data: { message },
        } = await putRequest(
          `${CREATED_BLOCKS.EDIT_BLOCk}/${productDetails.id}`,
          payload
        );
        if (status === RESPONSE_CODE[200]) {
          dispatch({
            type: REQUEST_ACTION.SUCCESS,
            payload: { message: message },
          });
          setOpenImageModal(false);
          productListCallBack();
          setSelectedBlock("");
          setSelectedImage(null);
        } else {
          dispatch({
            type: REQUEST_ACTION.FAILURE,
            payload: { message: ApiErrorMessage() },
          });
        }
      } catch (error) {
        dispatch({
          type: REQUEST_ACTION.FAILURE,
          payload: { message: ApiErrorMessage(error) },
        });
      }
    }, 1000);
  };

  const handleCheckedTextImage = (e) => {
    let timeout;
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      let updateBlockDetails;
      updateBlockDetails = {
        ...productDetails?.block_json,
        isTransparentBackground: e.target.checked,
      };

      const payload = {
        block_json: JSON.stringify(updateBlockDetails),
      };

      try {
        dispatch({ type: REQUEST_ACTION.PROCESSING });
        const {
          status,
          data: { message },
        } = await putRequest(
          `${CREATED_BLOCKS.EDIT_BLOCk}/${productDetails.id}`,
          payload
        );
        if (status === RESPONSE_CODE[200]) {
          dispatch({
            type: REQUEST_ACTION.SUCCESS,
            payload: { message: message },
          });
          setOpenImageModal(false);
          productListCallBack();
          setSelectedBlock("");
          setSelectedImage(null);
        } else {
          dispatch({
            type: REQUEST_ACTION.FAILURE,
            payload: { message: ApiErrorMessage() },
          });
        }
      } catch (error) {
        dispatch({
          type: REQUEST_ACTION.FAILURE,
          payload: { message: ApiErrorMessage(error) },
        });
      }
    }, 500);
  };

  useEffect(() => {
    if (mainData) {
      console.log(mainData, "maindatatatatatata");
    }
  }, [mainData]);

  useEffect(() => {
    productListCallBack();
  }, [pageNo, rowsPerPage]);

  useEffect(() => {
    // reset(productDetails);
    setSelectedImage(productDetails?.icon);
    // setBlogStatus(productDetails?.status ? true : false);
  }, [productDetails]);

  const hiddenRef = useRef(null);

  const handleSaveAsImage = async () => {
    const node = document.querySelector(".preview-Cover");
    setLoading(true);
    if (node) {
      try {
        const dataUrl = await toPng(node);
        const blob = await fetch(dataUrl).then((res) => res.blob());
        console.log(blob, "checkblobas options");
        const uniqueFileName = `preview-${Date.now()}.png`;
        const file = new File([blob], uniqueFileName, { type: blob.type });

        if (file) {
          const formData = new FormData();
          formData.append("image_url", file);
          try {
            dispatch({ type: REQUEST_ACTION.PROCESSING });
            const {
              status,
              data: { message },
            } = await putRequest(
              `${CREATED_BLOCKS.PUBLISH_BLOCK}/${productDetails.id}`,
              formData
            );
            if (status === RESPONSE_CODE[200]) {
              dispatch({
                type: REQUEST_ACTION.SUCCESS,
                payload: { message: message },
              });
              setOpenImageModal(false);
              productListCallBack();
              setSelectedBlock("");
              setSelectedImage(null);
              setOpenPreviewModal(true);
            } else {
              dispatch({
                type: REQUEST_ACTION.FAILURE,
                payload: { message: ApiErrorMessage() },
              });
            }
          } catch (error) {
            dispatch({
              type: REQUEST_ACTION.FAILURE,
              payload: { message: ApiErrorMessage(error) },
            });
          }
        }
        const preview = URL.createObjectURL(file);
        setPreviewUrl(preview);

        console.log("Image saved successfully!");
      } catch (error) {
        console.error("Failed to save image:", error);
      }
    }
    setLoading(false);
  };

  const handleChangeColorTextImage = (color) => {
    console.log(color, "checkcolorcheckee");

    let timeout;
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      let updateBlockDetails;
      updateBlockDetails = {
        ...productDetails?.block_json,
        backgroundColor: color.hex,
      };

      const payload = {
        block_json: JSON.stringify(updateBlockDetails),
      };

      try {
        dispatch({ type: REQUEST_ACTION.PROCESSING });
        const {
          status,
          data: { message },
        } = await putRequest(
          `${CREATED_BLOCKS.EDIT_BLOCk}/${productDetails.id}`,
          payload
        );
        if (status === RESPONSE_CODE[200]) {
          dispatch({
            type: REQUEST_ACTION.SUCCESS,
            payload: { message: message },
          });
          setOpenImageModal(false);
          productListCallBack();
          setSelectedBlock("");
          setSelectedImage(null);
        } else {
          dispatch({
            type: REQUEST_ACTION.FAILURE,
            payload: { message: ApiErrorMessage() },
          });
        }
      } catch (error) {
        dispatch({
          type: REQUEST_ACTION.FAILURE,
          payload: { message: ApiErrorMessage(error) },
        });
      }
    }, 500);
  };
  console.log(productDetails, "mainDatamainDatamainData");

  const handleChangeColorInputTextImage = (e) => {
    let timeout;
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      let updateBlockDetails;
      updateBlockDetails = {
        ...productDetails?.block_json,
        backgroundColor: e,
      };

      const payload = {
        block_json: JSON.stringify(updateBlockDetails),
      };

      try {
        dispatch({ type: REQUEST_ACTION.PROCESSING });
        const {
          status,
          data: { message },
        } = await putRequest(
          `${CREATED_BLOCKS.EDIT_BLOCk}/${productDetails.id}`,
          payload
        );
        if (status === RESPONSE_CODE[200]) {
          dispatch({
            type: REQUEST_ACTION.SUCCESS,
            payload: { message: message },
          });
          setOpenImageModal(false);
          productListCallBack();
          setSelectedBlock("");
          setSelectedImage(null);
        } else {
          dispatch({
            type: REQUEST_ACTION.FAILURE,
            payload: { message: ApiErrorMessage() },
          });
        }
      } catch (error) {
        dispatch({
          type: REQUEST_ACTION.FAILURE,
          payload: { message: ApiErrorMessage(error) },
        });
      }
    }, 500);
  };

  const handleChangeMediaTextImage = () => {};

  return (
    <>
      <AppHelmet title={DEFAULT_APP_TITLE.EDIT_PRODUCT} />
      <PageContainer className="page-container users-page" heading="Edit block">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <Grid
              container
              justifyContent="space-between"
              alignItems="flex-start"
              spacing={2}
            >
              <Grid item>
                <PageBreadcrumbs breadcrumbs={["dashborad", "block", "edit"]} />

                {productDetails?.image_url ? (
                  <Button
                    sx={{ borderRadius: "2pt" }}
                    style={{ marginLeft: "10px" }}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      handleSaveAsImage();
                    }}
                  >
                    Preview
                  </Button>
                ) : (
                  <Button
                    sx={{ borderRadius: "2pt" }}
                    style={{ marginLeft: "10px" }}
                    variant="contained"
                    color="primary"
                    onClick={handleSaveAsImage}
                  >
                    Publish
                  </Button>
                )}
              </Grid>
              <Grid item mr={1}>
                <Link className="h-link" to={ROUTE_SLUGS.PRODUCTS_LIST}>
                  <Button
                    sx={{ borderRadius: "2pt" }}
                    variant="contained"
                    color="primary"
                    startIcon={<ArrowBackIcon />}
                  >
                    Back
                  </Button>
                </Link>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs={8} sm={4} md={9} lg={9}>
                {productDetails?.block_type === "COVER" ? (
                  <CoverLayout
                    data={productDetails?.block_json}
                    handleSave={handleSaveText}
                    handleChangeText={handleChangeText}
                    text={editorText && editorText}
                    handleSaveButtonText={handleSaveButtonText}
                    handleChangeTextButton={handleChangeTextButton}
                    hiddenRef={hiddenRef}
                  />
                ) : (
                  <TextImageLayout
                    data={productDetails?.block_json}
                    handleSave={handleSaveText}
                    handleChangeText={handleChangeText}
                    text={editorText && editorText}
                    handleSaveButtonText={handleSaveButtonText}
                    handleChangeTextButton={handleChangeTextButton}
                    hiddenRef={hiddenRef}
                  />
                )}
              </Grid>
              <Grid item xs={4} sm={4} md={3} lg={3}>
                <BlockSettings
                  data={productDetails?.block_json}
                  type={productDetails?.block_type}
                  handleSelectChange={handleSelectChange}
                  handleChangeMedia={handleChangeMedia}
                  handleChangeDarkBackground={handleChangeDarkBackground}
                  handeCheckLogoType={handeCheckLogoType}
                  handleLogoWidth={handleLogoWidth}
                  handleChangePosition={handleChangePosition}
                  handleShowButton={handleShowButton}
                  handeAddLink={handeAddLink}
                  handleChangeColorInput={handleChangeColorInput}
                  handleChangeColorInputPicker={handleChangeColorInputPicker}
                  handleChangeBorderRadius={handleChangeBorderRadius}
                  handleChangePositionButton={handleChangePositionButton}
                  handleCheckedTextImage={handleCheckedTextImage}
                  handleChangeColorTextImage={handleChangeColorTextImage}
                  handleChangeColorInputTextImage={
                    handleChangeColorInputTextImage
                  }
                  handleChangePositionButtonTextImage={
                    handleChangePositionButtonTextImage
                  }
                />
              </Grid>
            </Grid>
          </>
        )}
      </PageContainer>

      <PreviewModal
        open={openPreviewModal}
        setOpen={setOpenPreviewModal}
        image={productDetails?.image_url}
      />

      <ImageModalEdit
        open={openImageModal}
        setOpen={setOpenImageModal}
        handleSelectMedia={handleSelectMedia}
        selectedImage={selectedImage}
        handleAddItem={handleAddItem}
      />
    </>
  );
}

export default EditBlock;
