import React, { useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DEFAULT_APP_TITLE, ROUTE_SLUGS } from "app/constants";
import PageContainer from "components/admin-ui/container";
import AppHelmet from "components/admin-ui/helmet";
import { Link } from "react-router-dom";
import WebBreadCrumbs from "views/pages/webContent/WebBreadCrumb";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import { Icon } from "@iconify/react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const validationSchema = yup.object().shape({
  sections: yup.array().of(
    yup.object().shape({
      title: yup.string().trim().required("Title is required."),
      monthDiscountedPrice: yup
        .string()
        .trim()
        .required("Discounted price is required."),
      monthActualPrice: yup
        .string()
        .trim()
        .required("Actual price is required."),
      annualDiscountedPrice: yup
        .string()
        .trim()
        .required("Discounted price is required."),
      annualActualPrice: yup
        .string()
        .trim()
        .required("Actual price is required."),
      best_for: yup.string().trim().required("Description is required."),
      activeProjects: yup.string().trim().required("This field is required."),
      storageSize: yup.string().trim().required("This field is required."),
      leadContacts: yup.string().trim().required("This field is required."),
      teamMembers: yup.string().trim().required("This field is required."),
      additonalMemberPrice: yup
        .string()
        .trim()
        .required("This field is required."),
      projectTypes: yup.boolean(),
      fullCustomization: yup.boolean(),
      basicStatistics: yup.boolean(),
      adFree: yup.boolean(),
      unsplashImage: yup.boolean(),
      googleAnalytics: yup.boolean(),
      customProjectID: yup.boolean(),
      integrations: yup.boolean(),
      customDomains: yup.boolean(),
      customStyles: yup.boolean(),
      advancedStatistics: yup.boolean(),
      whiteLabel: yup.boolean(),
      teamTraining: yup.boolean(),
      techSupport: yup.boolean(),
      addMembers: yup.boolean(),
    })
  ),
});

function PlansContent() {
  const {
    register,
    setValue,
    handleSubmit,
    trigger,
    watch,
    control,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      sections: [
        {
          title: "",
          monthDiscountedPrice: "",
          monthActualPrice: "",
          annualDiscountedPrice: "",
          annualActualPrice: "",
          best_for: "",
          activeProjects: "",
          storageSize: "",
          leadContacts: "",
          teamMembers: "",
          additonalMemberPrice: "",
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections",
  });

  const { loader } = useSelector((state) => state.request);

  const updateContent = (data) => {
    console.log("dfasdfasd-----", data);
  };

  return (
    <>
      <AppHelmet title={DEFAULT_APP_TITLE.PLANS} />

      <PageContainer
        className="page-container users-page"
        heading="Plans Content"
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
              to={ROUTE_SLUGS.PLANS_CONTENT}
            >
              Plans
            </Link>,
          ]}
        />

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
                      <Grid item md={6} key={item.id}>
                        <Typography variant="h3" mb={2}>
                          Plans
                        </Typography>
                        <Typography
                          variant="h5"
                          mb={2}
                        >{`Section ${index + 1}`}</Typography>
                        <Grid mb={4}>
                          <TextField
                            {...register(`sections[${index}].title`)}
                            label="Title*"
                            disabled={loader}
                            error={!!errors?.sections?.[index]?.title}
                            helperText={
                              errors?.sections?.[index]?.title?.message
                            }
                            name={`sections[${index}].title`}
                            variant="outlined"
                            fullWidth
                          />
                        </Grid>

                        <Grid mb={4}>
                          <TextField
                            {...register(
                              `sections[${index}].monthDiscountedPrice`
                            )}
                            label="Monthly Discounted Price*"
                            disabled={loader}
                            error={
                              !!errors?.sections?.[index]?.monthDiscountedPrice
                            }
                            helperText={
                              errors?.sections?.[index]?.monthDiscountedPrice
                                ?.message
                            }
                            name={`sections[${index}].monthDiscountedPrice`}
                            variant="outlined"
                            fullWidth
                          />
                        </Grid>

                        <Grid mb={4}>
                          <TextField
                            {...register(`sections[${index}].monthActualPrice`)}
                            label="Monthly Actual Price*"
                            disabled={loader}
                            error={
                              !!errors?.sections?.[index]?.monthActualPrice
                            }
                            helperText={
                              errors?.sections?.[index]?.monthActualPrice
                                ?.message
                            }
                            name={`sections[${index}].monthActualPrice`}
                            variant="outlined"
                            fullWidth
                          />
                        </Grid>

                        <Grid mb={4}>
                          <TextField
                            {...register(
                              `sections[${index}].annualDiscountedPrice`
                            )}
                            label="Annually Discounted Price*"
                            disabled={loader}
                            error={
                              !!errors?.sections?.[index]?.annualDiscountedPrice
                            }
                            helperText={
                              errors?.sections?.[index]?.annualDiscountedPrice
                                ?.message
                            }
                            name={`sections[${index}].annualDiscountedPrice`}
                            variant="outlined"
                            fullWidth
                          />
                        </Grid>

                        <Grid mb={4}>
                          <TextField
                            {...register(
                              `sections[${index}].annualActualPrice`
                            )}
                            label="Annually Actual Price*"
                            disabled={loader}
                            error={
                              !!errors?.sections?.[index]?.annualActualPrice
                            }
                            helperText={
                              errors?.sections?.[index]?.annualActualPrice
                                ?.message
                            }
                            name={`sections[${index}].annualActualPrice`}
                            variant="outlined"
                            fullWidth
                          />
                        </Grid>

                        <Grid mb={4}>
                          <div
                            className={
                              errors?.sections?.[index]?.best_for
                                ? "errorCkEditor description_div"
                                : "description_div"
                            }
                          >
                            <CKEditor
                              editor={ClassicEditor}
                              data={item.best_for}
                              onChange={(event, editor) => {
                                setValue(
                                  `sections[${index}].best_for`,
                                  editor.getData()
                                );
                                trigger(`sections[${index}].best_for`);
                              }}
                              config={{
                                placeholder: "Best For*",
                                toolbar: {
                                  items: [
                                    "heading",
                                    "|",
                                    "bold",
                                    "italic",
                                    "link",
                                    "bulletedList",
                                    "numberedList",
                                    "|",
                                    "blockQuote",
                                    "insertTable",
                                    "|",
                                    "undo",
                                    "redo",
                                  ],
                                },
                              }}
                              onReady={(editor) => {
                                editor.editing.view.change((writer) => {
                                  writer.setStyle(
                                    "height",
                                    "100%",
                                    editor.editing.view.document.getRoot()
                                  );
                                });
                              }}
                            />
                          </div>
                          {errors?.sections?.[index]?.best_for && (
                            <FormHelperText error>
                              {errors.sections[index].best_for.message}
                            </FormHelperText>
                          )}
                        </Grid>

                        <Typography variant="h3" mb={2}>
                          Features
                        </Typography>

                        <Grid mb={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                {...register(`sections[${index}].projectTypes`)}
                                checked={
                                  !!watch(`sections[${index}].projectTypes`)
                                }
                                onChange={(e) =>
                                  setValue(
                                    `sections[${index}].projectTypes`,
                                    e.target.checked,
                                    {
                                      shouldValidate: true,
                                    }
                                  )
                                }
                              />
                            }
                            label="All Project Types"
                            labelPlacement="start"
                          />
                        </Grid>
                        <Grid mb={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                {...register(
                                  `sections[${index}].fullCustomization`
                                )}
                                checked={
                                  !!watch(
                                    `sections[${index}].fullCustomization`
                                  )
                                }
                                onChange={(e) =>
                                  setValue(
                                    `sections[${index}].fullCustomization`,
                                    e.target.checked,
                                    {
                                      shouldValidate: true,
                                    }
                                  )
                                }
                              />
                            }
                            label="Full Customization"
                            labelPlacement="start"
                          />
                        </Grid>
                        <Grid mb={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                {...register(
                                  `sections[${index}].basicStatistics`
                                )}
                                checked={
                                  !!watch(`sections[${index}].basicStatistics`)
                                }
                                onChange={(e) =>
                                  setValue(
                                    `sections[${index}].basicStatistics`,
                                    e.target.checked,
                                    {
                                      shouldValidate: true,
                                    }
                                  )
                                }
                              />
                            }
                            label="Basic Statistics"
                            labelPlacement="start"
                          />
                        </Grid>
                        <Grid mb={2}>
                          <TextField
                            {...register(`sections[${index}].activeProjects`)}
                            label="Active Projects*"
                            disabled={loader}
                            error={!!errors?.sections?.[index]?.activeProjects}
                            helperText={
                              errors?.sections?.[index]?.activeProjects?.message
                            }
                            name={`sections[${index}].activeProjects`}
                            variant="outlined"
                            fullWidth
                          />
                        </Grid>
                        <Grid mb={2}>
                          <TextField
                            {...register(`sections[${index}].storageSize`)}
                            label="Storage Size*"
                            disabled={loader}
                            error={!!errors?.sections?.[index]?.storageSize}
                            helperText={
                              errors?.sections?.[index]?.storageSize?.message
                            }
                            name={`sections[${index}].storageSize`}
                            variant="outlined"
                            fullWidth
                          />
                        </Grid>
                        <Grid mb={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                              {...register(
                                `sections[${index}].adFree`
                              )}
                                checked={!!watch(`sections[${index}].adFree`)}
                                onChange={(e) =>
                                  setValue(
                                    `sections[${index}].adFree`,
                                    e.target.checked,
                                    {
                                      shouldValidate: true,
                                    }
                                  )
                                }
                              />
                            }
                            label="Ad-Free for Active Projects"
                            labelPlacement="start"
                          />
                        </Grid>
                        <Grid mb={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                              {...register(
                                `sections[${index}].unsplashImage`
                              )}
                                checked={
                                  !!watch(`sections[${index}].unsplashImage`)
                                }
                                onChange={(e) =>
                                  setValue(
                                    `sections[${index}].unsplashImage`,
                                    e.target.checked,
                                    {
                                      shouldValidate: true,
                                    }
                                  )
                                }
                              />
                            }
                            label="Unsplash Image Library"
                            labelPlacement="start"
                          />
                        </Grid>
                        <Grid mb={2}>
                          <TextField
                            {...register(`sections[${index}].leadContacts`)}
                            label="Lead Contacts / Month*"
                            disabled={loader}
                            error={!!errors?.sections?.[index]?.leadContacts}
                            helperText={
                              errors?.sections?.[index]?.leadContacts?.message
                            }
                            name={`sections[${index}].leadContacts`}
                            variant="outlined"
                            fullWidth
                          />
                        </Grid>
                        <Grid mb={2}>
                          <TextField
                            {...register(`sections[${index}].teamMembers`)}
                            label="Team Members*"
                            disabled={loader}
                            error={!!errors?.sections?.[index]?.teamMembers}
                            helperText={
                              errors?.sections?.[index]?.teamMembers?.message
                            }
                            name={`sections[${index}].teamMembers`}
                            variant="outlined"
                            fullWidth
                          />
                        </Grid>
                        <Grid mb={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                              {...register(
                                `sections[${index}].googleAnalytics`
                              )}
                                checked={
                                  !!watch(`sections[${index}].googleAnalytics`)
                                }
                                onChange={(e) =>
                                  setValue(
                                    `sections[${index}].googleAnalytics`,
                                    e.target.checked,
                                    {
                                      shouldValidate: true,
                                    }
                                  )
                                }
                              />
                            }
                            label="Google Analytics"
                            labelPlacement="start"
                          />
                        </Grid>
                        <Grid mb={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                              {...register(
                                `sections[${index}].customProjectID`
                              )}
                                checked={
                                  !!watch(`sections[${index}].customProjectID`)
                                }
                                onChange={(e) =>
                                  setValue(
                                    `sections[${index}].customProjectID`,
                                    e.target.checked,
                                    {
                                      shouldValidate: true,
                                    }
                                  )
                                }
                              />
                            }
                            label="Custom Project ID"
                            labelPlacement="start"
                          />
                        </Grid>
                        <Grid mb={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                              {...register(
                                `sections[${index}].integrations`
                              )}
                                checked={
                                  !!watch(`sections[${index}].integrations`)
                                }
                                onChange={(e) =>
                                  setValue(
                                    `sections[${index}].integrations`,
                                    e.target.checked,
                                    {
                                      shouldValidate: true,
                                    }
                                  )
                                }
                              />
                            }
                            label="Integrations"
                            labelPlacement="start"
                          />
                        </Grid>
                        <Grid mb={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                              {...register(
                                `sections[${index}].customDomains`
                              )}
                                checked={
                                  !!watch(`sections[${index}].customDomains`)
                                }
                                onChange={(e) =>
                                  setValue(
                                    `sections[${index}].customDomains`,
                                    e.target.checked,
                                    {
                                      shouldValidate: true,
                                    }
                                  )
                                }
                              />
                            }
                            label="Custom Domains"
                            labelPlacement="start"
                          />
                        </Grid>
                        <Grid mb={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                              {...register(
                                `sections[${index}].customStyles`
                              )}
                                checked={
                                  !!watch(`sections[${index}].customStyles`)
                                }
                                onChange={(e) =>
                                  setValue(
                                    `sections[${index}].customStyles`,
                                    e.target.checked,
                                    {
                                      shouldValidate: true,
                                    }
                                  )
                                }
                              />
                            }
                            label="Custom CSS Styles"
                            labelPlacement="start"
                          />
                        </Grid>
                        <Grid mb={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                              {...register(
                                `sections[${index}].advancedStatistics`
                              )}
                                checked={
                                  !!watch(
                                    `sections[${index}].advancedStatistics`
                                  )
                                }
                                onChange={(e) =>
                                  setValue(
                                    `sections[${index}].advancedStatistics`,
                                    e.target.checked,
                                    {
                                      shouldValidate: true,
                                    }
                                  )
                                }
                              />
                            }
                            label="Advanced Statistics"
                            labelPlacement="start"
                          />
                        </Grid>
                        <Grid mb={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                              {...register(
                                `sections[${index}].whiteLabel`
                              )}
                                checked={
                                  !!watch(`sections[${index}].whiteLabel`)
                                }
                                onChange={(e) =>
                                  setValue(
                                    `sections[${index}].whiteLabel`,
                                    e.target.checked,
                                    {
                                      shouldValidate: true,
                                    }
                                  )
                                }
                              />
                            }
                            label="White Label"
                            labelPlacement="start"
                          />
                        </Grid>
                        <Grid mb={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                              {...register(
                                `sections[${index}].teamTraining`
                              )}
                                checked={
                                  !!watch(`sections[${index}].teamTraining`)
                                }
                                onChange={(e) =>
                                  setValue(
                                    `sections[${index}].teamTraining`,
                                    e.target.checked,
                                    {
                                      shouldValidate: true,
                                    }
                                  )
                                }
                              />
                            }
                            label="Team Training"
                            labelPlacement="start"
                          />
                        </Grid>
                        <Grid mb={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                              {...register(
                                `sections[${index}].techSupport`
                              )}
                                checked={
                                  !!watch(`sections[${index}].techSupport`)
                                }
                                onChange={(e) =>
                                  setValue(
                                    `sections[${index}].techSupport`,
                                    e.target.checked,
                                    {
                                      shouldValidate: true,
                                    }
                                  )
                                }
                              />
                            }
                            label="Priority Tech. Support"
                            labelPlacement="start"
                          />
                        </Grid>
                        <Grid mb={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                              {...register(
                                `sections[${index}].addMembers`
                              )}
                                checked={
                                  !!watch(`sections[${index}].addMembers`)
                                }
                                onChange={(e) =>
                                  setValue(
                                    `sections[${index}].addMembers`,
                                    e.target.checked,
                                    {
                                      shouldValidate: true,
                                    }
                                  )
                                }
                              />
                            }
                            label="Add Members"
                            labelPlacement="start"
                          />
                        </Grid>
                        <Grid mb={2}>
                          <TextField
                            {...register(
                              `sections[${index}].additonalMemberPrice`
                            )}
                            label="Additonal Member Price*"
                            disabled={loader}
                            error={
                              !!errors?.sections?.[index]?.additonalMemberPrice
                            }
                            helperText={
                              errors?.sections?.[index]?.additonalMemberPrice
                                ?.message
                            }
                            name={`sections[${index}].additonalMemberPrice`}
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
                              variant="outlined"
                              onClick={() => {
                                remove(index);
                              }}
                              color="error"
                            >
                              Remove Section
                            </Button>
                          </Grid>
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
                      onClick={() =>
                        append({
                          title: "",
                          url: "",
                          description: "",
                          introImage: null,
                        })
                      }
                    >
                      <Icon icon="basil:add-outline" width="32" height="32" />
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
}

export default PlansContent;
