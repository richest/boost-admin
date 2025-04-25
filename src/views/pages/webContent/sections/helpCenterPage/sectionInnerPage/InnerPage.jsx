import React, { useCallback, useEffect, useState } from "react";
import AppHelmet from "components/admin-ui/helmet";
import { Link, useLocation } from "react-router-dom";
import {
  DEFAULT_APP_TITLE,
  DEFAULT_CSS,
  RESPONSE_CODE,
  ROUTE_SLUGS,
} from "app/constants";
import PageContainer from "components/admin-ui/container";
import WebBreadCrumbs from "views/pages/webContent/WebBreadCrumb";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { WEB_CONTENT } from "app/config/endpoints";
import { REQUEST_ACTION } from "redux/authenticate/actions";
import { ApiErrorMessage } from "utils/helpers/function/apiErrorResonse";
import { RESPONSE_MESSAGES } from "app/constants/localizedStrings";
import { getRequest, putRequest } from "app/httpClient/axiosClient";
import toast from "react-hot-toast";
import {
  Button,
  Card,
  Grid,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { Box } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import SendIcon from "@mui/icons-material/Send";

const validationSchema = yup.object().shape({
  maintitle: yup.string().trim().required("Title is required."),
  section: yup.array().of(
    yup.object().shape({
      title: yup.string().trim().required("Title is required."),
    })
  ),
});

export default function InnerPage() {
  const location = useLocation();
  const apiKey = location?.state?.name?.replace(/[\s/&]+/g, "-").toLowerCase();
  const dispatch = useDispatch();
  const { loader } = useSelector((state) => state.request);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    setValue,
    handleSubmit,
    trigger,
    control,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      section: [
        {
          title: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "section",
  });

  const updateContent = async (data) => {
    const payload = {
      key: "HELP_CENTER",
      section: apiKey,
      value: JSON.stringify({
        maintitle: data.maintitle,
        section: data.section,
      }),
      status: 1,
    };

    try {
      dispatch({ type: REQUEST_ACTION.PROCESSING });
      const {
        status,
        data: { message },
      } = await putRequest(WEB_CONTENT.UPDATE, payload);
      if (status === RESPONSE_CODE[200]) {
        dispatch({
          type: REQUEST_ACTION.SUCCESS,
          payload: { message: message },
        });
        toast.success(message);
        getContent();
      } else {
        throw new Error(ApiErrorMessage());
      }
    } catch (error) {
      dispatch({
        type: REQUEST_ACTION.FAILURE,
        payload: { message: error.message },
      });
    }
  };

  const getWebContent = async (url) => {
    dispatch({ type: REQUEST_ACTION.INIT_LOADER, payload: { loader: true } });
    try {
      const response = await getRequest(url);
      const { statusCode, data, success } = response.data;
      if (success && statusCode === RESPONSE_CODE[200]) {
        const parseValue = JSON.parse(data?.value);
        const { section, maintitle } = parseValue;
        setValue("maintitle", maintitle);
        setValue("section", section);
      } else {
        throw new Error(RESPONSE_MESSAGES.DEFAULT.FETCHING_USERS_LIST);
      }
    } catch (error) {
      setErrorMessage(ApiErrorMessage(error));
    } finally {
      dispatch({
        type: REQUEST_ACTION.INIT_LOADER,
        payload: { loader: false },
      });
    }
  };

  const getContent = useCallback(() => {
    getWebContent(`${WEB_CONTENT.GET}?key=HELP_CENTER&section=${apiKey}`);
  }, []);

  useEffect(() => {
    getContent();
  }, [getContent]);

  return (
    <>
      <AppHelmet title={DEFAULT_APP_TITLE.WEB_CONTENT} />

      <PageContainer
        className="page-container users-page"
        heading="Web Content"
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
              to={ROUTE_SLUGS.HELP_CENTER}
            >
              Help-center
            </Link>,
            location?.state?.name,
          ]}
        />
        <Grid container spacing={2} my={2}>
          <Grid item md={12}>
            <Card className="profile-right-section" sx={{ p: 3 }}>
              <form onSubmit={handleSubmit(updateContent)} noValidate>
                <Grid mb={2}>
                  <TextField
                    {...register(`maintitle`)}
                    label="Title*"
                    disabled={loader}
                    error={!!errors?.maintitle}
                    helperText={errors?.maintitle?.message || ""}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid container spacing={2} my={2}>
                  {fields.map((field, index) => (
                    <Grid item md={6} key={field.id}>
                      <Link
                        // state={{ name: field?.title }}
                        // to={`${ROUTE_SLUGS.HELP_CENTER}/${field?.title?.replace(/[\s/]+/g, "-").toLowerCase()}`}
                        style={{
                          textDecoration: "none",
                          display: "flex",
                          alignItems: "center",
                          paddingBottom: "10px",
                        }}
                      >
                        <Typography variant="h5">
                          Article {index + 1}
                        </Typography>
                        <Icon
                          icon="gg:arrow-right"
                          width="28"
                          height="28"
                          color="#121926"
                        />
                      </Link>
                      <Box
                        sx={{
                          border: "1px solid #bfc0c2",
                          borderRadius: "12px",
                          padding: "15px 10px",
                          position: "relative",
                        }}
                      >
                        {fields.length > 1 && (
                          <Tooltip placement="top" title="Click to remove card">
                            <CancelTwoToneIcon
                              sx={{
                                color: DEFAULT_CSS.ERROR_MSG_COLOR,
                                position: "absolute",
                                right: "-5px",
                                top: "-5px",
                                zIndex: "99",
                                cursor: "pointer",
                                fontSize: "18px",
                                background: "#fff",
                                borderRadius: "50%",
                              }}
                              onClick={() => {
                                remove(index);
                              }}
                            />
                          </Tooltip>
                        )}
                        <Grid mb={2}>
                          <TextField
                            {...register(`section[${index}].title`)}
                            label="Title*"
                            disabled={loader}
                            error={!!errors?.section?.[index]?.title}
                            helperText={
                              errors?.section?.[index]?.title?.message || ""
                            }
                            variant="outlined"
                            fullWidth
                          />
                        </Grid>
                      </Box>
                    </Grid>
                  ))}
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    mt={2}
                  >
                    <Button
                      onClick={() =>
                        append({ title: "", subtitle: "", icon: null })
                      }
                      type="button"
                    >
                      <Icon icon="basil:add-outline" width="32" height="32" />
                    </Button>
                  </Grid>
                </Grid>

                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  mt={2}
                >
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    endIcon={<SendIcon />}
                    loading={loader}
                    sx={{ mt: 2 }}
                  >
                    {loader ? "PLEASE WAIT..." : "SUBMIT"}
                  </LoadingButton>
                </Stack>
              </form>
            </Card>
          </Grid>
        </Grid>
      </PageContainer>
    </>
  );
}
