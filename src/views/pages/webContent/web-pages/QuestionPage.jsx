import {
  Button,
  Card,
  Grid,
  Skeleton,
  Stack,
  TextField,
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
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { WEB_CONTENT } from "app/config/endpoints";
import { REQUEST_ACTION } from "redux/authenticate/actions";
import { ApiErrorMessage } from "utils/helpers/function/apiErrorResonse";
import { RESPONSE_MESSAGES } from "app/constants/localizedStrings";
import { getRequest, putRequest } from "app/httpClient/axiosClient";
import toast from "react-hot-toast";
import { Box } from "@mui/system";
import QuestionCategoryCards from "../sections/questionBank/QuestionCategoryCards";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const validationSchema = yup.object().shape({
  categories: yup.array().of(
    yup.object().shape({
      title: yup.string().trim().required(`Title is required.`),
    })
  ),
});

const QuestionBankPage = () => {
  const dispatch = useDispatch();
  const { loader } = useSelector((state) => state.request);
  const [errorMessage, setErrorMessage] = useState("");
  const [categories, setCategories] = useState([]);

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
      categories: [
        {
          title: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "categories",
  });

  const updateContent = async (data) => {
    let payload = {
      key: "QUESTION_BANK",
      section: "CATEGORY",
      value: JSON.stringify({
        categories: data.categories,
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
  };

  async function getWebContent(url) {
    // NProgress.start();
    dispatch({ type: REQUEST_ACTION.INIT_LOADER, payload: { loader: true } });
    let _errorMessage;
    const LOCALE = DEFAULT_VALUE.LOCALE;
    try {
      const response = await getRequest(url);
      const { status } = response;
      const { data, success } = response.data;
      if (success && status === RESPONSE_CODE[200]) {
        const parseValue = JSON.parse(data?.value);
        const { categories } = parseValue;
        setValue("categories", categories);
        setCategories(categories);
      } else {
        setErrorMessage(RESPONSE_MESSAGES[LOCALE].FETCHING_USERS_LIST);
      }
      // NProgress.done();
    } catch (error) {
      // NProgress.done();

      _errorMessage = ApiErrorMessage(error);
    }
    dispatch({ type: REQUEST_ACTION.INIT_LOADER, payload: { loader: false } });
    // NProgress.done();
  }
  const getContent = () => {
    getWebContent(`${WEB_CONTENT.GET}?key=QUESTION_BANK&section=CATEGORY`);
  };

  useEffect(() => {
    getContent();
  }, []);

  return (
    <>
      <AppHelmet title={DEFAULT_APP_TITLE.QUESTION_BANK} />
      <PageContainer
        className="page-container users-page"
        heading={DEFAULT_APP_TITLE.QUESTION_BANK}
      >
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
                to={ROUTE_SLUGS.WEB_CONTENT}
              >
                web content
              </Link>,

                "Question Bank Category",
              ]}
            />
          </Grid>
          <Grid item mr={1}>
            <Link className="h-link" to={ROUTE_SLUGS.WEB_CONTENT}>
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



        <Typography pt={4} variant="h3">
          Categories
        </Typography>

        {loader ? (
          <Skeleton variant="rectangular" width="100%" height={110} />
        ) : (
          <Grid container spacing={3} sx={{ pt: 2 }}>
            {categories.map((item, i) => {
              return (
                <Grid key={i} item xs={12} sm={4} md={3} lg={2.4}>
                  <QuestionCategoryCards
                    path={`${ROUTE_SLUGS.QUESTION_BANK}/${item.title.replace(/[\s/]+/g, "-").toLowerCase()}`}
                    title={item.title}
                  />
                </Grid>
              );
            })}
          </Grid>
        )}

        <Card sx={{ mt: 4, boxShadow: 3 }}>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={2}
            my={2}
          >
            <Grid item md={12}>
              <Typography px={3} variant="h4">
                Add or update category
              </Typography>
              <Card className="profile-right-section" sx={{ p: 3 }}>
                <form onSubmit={handleSubmit(updateContent)} noValidate>
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    spacing={2}
                    my={2}
                  >
                    {fields.map((item, index) => (
                      <Grid item xs={12} sm={6} md={4} key={item.id}>
                        {loader ? (
                          <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={118}
                          />
                        ) : (
                          <>
                            <Box sx={{ mb: 2 }}>
                              <Typography variant="h5">{`Category ${index + 1}`}</Typography>
                            </Box>
                            <Grid mb={4}>
                              <TextField
                                {...register(`categories[${index}].title`)}
                                label="Title*"
                                disabled={loader}
                                error={!!errors?.categories?.[index]?.title}
                                helperText={
                                  errors?.categories?.[index]?.title?.message
                                }
                                name={`categories[${index}].title`}
                                variant="outlined"
                                fullWidth
                              />
                            </Grid>

                            {fields.length > 1 && (
                              <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                // spacing={2}
                                mt={2}
                              >
                                <Button
                                  type="button"
                                  size="medium"
                                  startIcon={<DeleteIcon />}
                                  variant="outlined"
                                  onClick={() => {
                                    remove(index);
                                  }}
                                  color="error"
                                >
                                  Category
                                </Button>
                              </Grid>
                            )}
                          </>
                        )}
                      </Grid>
                    ))}
                  </Grid>

                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    // spacing={2}
                    mt={2}
                  >
                    <Button
                      type="button"
                      size="medium"
                      startIcon={<AddIcon />}
                      variant="outlined"
                      onClick={() =>
                        append({
                          title: "",
                        })
                      }
                    >
                      Category
                    </Button>
                  </Grid>

                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    my={2}
                  >
                    <LoadingButton
                      loading={loader ? true : false}
                      size="medium"
                      type="submit"
                      loadingPosition="end"
                      endIcon={<SendIcon />}
                      variant="contained"
                    >
                      {loader ? "PLEASE WAIT..." : "SUBMIT"}
                    </LoadingButton>
                  </Stack>
                </form>
              </Card>
            </Grid>
          </Grid>
        </Card>
      </PageContainer>
    </>
  );
};

export default QuestionBankPage;
