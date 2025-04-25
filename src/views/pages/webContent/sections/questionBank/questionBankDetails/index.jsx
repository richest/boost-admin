import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AppHelmet from "components/admin-ui/helmet";
import {
  DEFAULT_APP_TITLE,
  DEFAULT_VALUE,
  RESPONSE_CODE,
  ROUTE_SLUGS,
} from "app/constants";
import PageContainer from "components/admin-ui/container";
import {
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import PageBreadcrumbs from "components/admin-ui/breadcrumbs";
import { Link, useLocation } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
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
import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const validationSchema = yup.object().shape({
  questions: yup.array().of(
    yup.object().shape({
      title: yup.string().trim().required("Question is required."),
      answers: yup.array().of(
        yup.object().shape({
          answer: yup.string().trim().required("Answer is required."),
          option: yup.boolean().required("Option is required."),
        })
      ),
    })
  ),
});

function QuestionBankDetails() {
  const dispatch = useDispatch();
  const location = useLocation();
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
      questions: [
        {
          title: "",
          answers: [{ answer: "", option: false }],
        },
      ],
    },
  });

  const {
    fields: questionFields,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control,
    name: "questions",
  });

  const updateContent = async (data) => {
    let payload = {
      key: "QUESTION_BANK",
      section: location?.state?.category,
      value: JSON.stringify({
        questions: data.questions,
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
    dispatch({ type: REQUEST_ACTION.INIT_LOADER, payload: { loader: true } });
    let _errorMessage;
    const LOCALE = DEFAULT_VALUE.LOCALE;
    try {
      const response = await getRequest(url);
      const { status } = response;
      const { data, success } = response.data;
      if (success && status === RESPONSE_CODE[200]) {
        const parseValue = JSON.parse(data?.value);
        const { questions } = parseValue;
        setValue("questions", questions);
      } else {
        setErrorMessage(RESPONSE_MESSAGES[LOCALE].FETCHING_USERS_LIST);
      }
    } catch (error) {
      _errorMessage = ApiErrorMessage(error);
    }
    dispatch({ type: REQUEST_ACTION.INIT_LOADER, payload: { loader: false } });
  }

  const getContent = () => {
    getWebContent(
      `${WEB_CONTENT.GET}?key=QUESTION_BANK&section=${location?.state?.category}`
    );
  };

  useEffect(() => {
    getContent();
  }, []);

  return (
    <>
      <AppHelmet title={DEFAULT_APP_TITLE.QUESTION_BANK} />
      <PageContainer
        className="page-container users-page"
        heading="Add Questions"
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
                  style={{ color: "rgb(99, 115, 129)", textDecoration: "none" }}
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
                <Link
                  style={{ color: "rgb(99, 115, 129)", textDecoration: "none" }}
                  to={ROUTE_SLUGS.QUESTION_BANK}
                >
                  Question bank
                </Link>,
                location?.state?.category,
              ]}
            />
          </Grid>
          <Grid item mr={1}>
            <Link className="h-link" to={ROUTE_SLUGS.QUESTION_BANK}>
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
                Add or update Questions
              </Typography>
              <Card className="profile-right-section" sx={{ p: 3 }}>
                <form onSubmit={handleSubmit(updateContent)} noValidate>
                  {questionFields.map((questionItem, index) => {
                    return (
                      <div key={questionItem.id}>
                        {loader ? (
                          <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={118}
                          />
                        ) : (
                          <>
                            <Box sx={{ mb: 2 }}>
                              <Typography variant="h5">{`Question ${index + 1}`}</Typography>
                            </Box>
                            <Grid mb={4}>
                              <TextField
                                {...register(`questions[${index}].title`)}
                                label="Question*"
                                disabled={loader}
                                error={!!errors?.questions?.[index]?.title}
                                helperText={
                                  errors?.questions?.[index]?.title?.message
                                }
                                variant="outlined"
                                fullWidth
                              />
                            </Grid>

                            <AnswersFieldArray
                              index={index}
                              control={control}
                              register={register}
                              errors={errors}
                              setValue={setValue}
                            />

                            {questionFields.length > 1 && (
                              <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                mt={2}
                              >
                                <Button
                                  type="button"
                                  size="medium"
                                  startIcon={<DeleteIcon />}
                                  variant="outlined"
                                  onClick={() => removeQuestion(index)}
                                  color="error"
                                >
                                  Question
                                </Button>
                              </Grid>
                            )}
                          </>
                        )}
                      </div>
                    );
                  })}

                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    mt={2}
                  >
                    <Button
                      type="button"
                      size="medium"
                      startIcon={<AddIcon />}
                      variant="outlined"
                      onClick={() =>
                        appendQuestion({
                          title: "",
                          answers: [{ answer: "", option: false }],
                        })
                      }
                    >
                      Question
                    </Button>
                  </Grid>

                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    my={2}
                  >
                    <LoadingButton
                      loading={loader}
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
}

const AnswersFieldArray = ({ index, control, register, errors, setValue }) => {
  const {
    fields: answerFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: `questions[${index}].answers`,
  });

  const handleCheckboxChange = (answerIndex, isChecked) => {
    setValue(
      `questions[${index}].answers`,
      answerFields.map((answer, i) => {
        if (i === answerIndex) {
          return { ...answer, option: isChecked };
        }
        return { ...answer, option: false };
      })
    );
  };

  return (
    <>
      {answerFields.map((answerItem, answerIndex) => (
        <Grid container spacing={2} key={answerItem.id} alignItems="center">
          <Grid item xs={12} md={7} lg={6}>
            <Grid mb={2}>
              <TextField
                {...register(
                  `questions[${index}].answers[${answerIndex}].answer`
                )}
                label="Answer*"
                error={
                  !!errors?.questions?.[index]?.answers?.[answerIndex]?.answer
                }
                helperText={
                  errors?.questions?.[index]?.answers?.[answerIndex]?.answer
                    ?.message
                }
                variant="outlined"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={!!answerItem.option}
                          onChange={(e) =>
                            handleCheckboxChange(answerIndex, e.target.checked)
                          }
                          color="primary"
                        />
                      }
                      labelPlacement="end"
                    />
                  ),
                }}
              />
            </Grid>
          </Grid>

          {answerFields?.length > 2 && (
            <Grid item xs={12} md={2}>
              <Button
                type="button"
                size="medium"
                startIcon={<DeleteIcon />}
                variant="outlined"
                onClick={() => remove(answerIndex)}
                color="error"
              >
                Answer
              </Button>
            </Grid>
          )}
        </Grid>
      ))}

      {answerFields?.length < 4 && (
        <Grid container mt={2}>
          <Button
            type="button"
            size="medium"
            startIcon={<AddIcon />}
            variant="outlined"
            onClick={() => append({ answer: "", option: false })}
          >
            Answer
          </Button>
        </Grid>
      )}
    </>
  );
};

export default QuestionBankDetails;
