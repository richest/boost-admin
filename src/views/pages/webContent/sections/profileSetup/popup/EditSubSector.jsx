import React, { useEffect, useState } from "react";
import {
  Popover,
  TextField,
  Box,
  Typography,
  Grid,
  FormHelperText,
  Stack,
  Avatar,
  Tooltip,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { VALIDATION_MESSAGE } from "app/constants/regexRules";
import { useDispatch, useSelector } from "react-redux";
import { DEFAULT_CSS, RESPONSE_CODE } from "app/constants";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { LoadingButton } from "@mui/lab";
import Iconify from "components/iconify";
import { REQUEST_ACTION } from "redux/authenticate/actions";
import { putRequest } from "app/httpClient/axiosClient";
import { ApiErrorMessage } from "utils/helpers/function/apiErrorResonse";
import { SECTOR, SUB_SECTOR, TEMPLATES_CATEGORY } from "app/config/endpoints";
import toast from "react-hot-toast";

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required(`${VALIDATION_MESSAGE.NAME.REQUIRED}`)
    .max(30, `${VALIDATION_MESSAGE.NAME.MAX_LENGTH}`),
  description: yup.string(),
});

const EditSubSector = ({
  openEditModal,
  setOpenEditModal,
  categoryData,
  categoryListCallBack,
  sectorId,
}) => {
  const customization = useSelector((state) => state.customization);
  const buttonRef = React.useRef(null);
  const { loader, message, messageType } = useSelector(
    (state) => state.request
  );
  const dispatch = useDispatch();

  const [isHovering, setIsHovering] = useState(false);
  const {
    register,
    setValue,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(validationSchema),
  });

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    if (!loader) {
      setIsHovering(false);
    }
  };

  const editCategory = async (data) => {
    const payloadData = {
      name: data.name,
      description: data.description,
      sector_id: sectorId,
    };

    try {
      dispatch({ type: REQUEST_ACTION.PROCESSING });

      const {
        status,
        data: { message },
      } = await putRequest(
        `${SUB_SECTOR.UPDATE}/${categoryData?.id}`,
        payloadData
      );
      if (status === RESPONSE_CODE[200]) {
        dispatch({
          type: REQUEST_ACTION.SUCCESS,
          payload: { message: message },
        });
        toast.success(message);
        setOpenEditModal(false);
        categoryListCallBack();
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
    }
  };

  useEffect(() => {
    if (categoryData) {
      setValue("name", categoryData?.name);
      setValue("description", categoryData?.description);
    }
  }, [categoryData, setValue]);

  return (
    <>
      <Popover
        open={openEditModal}
        anchorEl={buttonRef.current}
        onClose={() => {
          setOpenEditModal(false);
        }}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      >
        <Box
          sx={{
            padding: 2,
            width: 300,
            background: customization.navType === "dark" ? "#103C65" : "#fff",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h4" gutterBottom pb={4}>
              Edit sector
            </Typography>
            <Iconify
              sx={{ cursor: "pointer" }}
              onClick={() => setOpenEditModal(false)}
              icon="maki:cross"
              width={20}
              height={20}
            />
          </Box>
          <Grid container spacing={2} mb={3}>
            <form onSubmit={handleSubmit(editCategory)} noValidate>
              <Grid item md={12} mt={4}>
                <Grid mb={2}>
                  <TextField
                    {...register("name")}
                    label="Name*"
                    // disabled={loader}
                    error={!!errors.name}
                    helperText={errors.name ? errors.name.message : ""}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>

                <Grid mb={2}>
                  <TextField
                    {...register("description")}
                    label="Description*"
                    // disabled={loader}
                    error={!!errors.description}
                    helperText={
                      errors.description ? errors.description.message : ""
                    }
                    variant="outlined"
                    fullWidth
                  />
                </Grid>

                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  mt={2}
                >
                  <LoadingButton
                    loading={loader ? true : false}
                    size="medium"
                    type="submit"
                    loadingPosition="end"
                    variant="contained"
                  >
                    {loader ? "PLEASE WAIT..." : "UPDATE"}
                  </LoadingButton>
                </Stack>
              </Grid>
            </form>
          </Grid>
        </Box>
      </Popover>
    </>
  );
};

export default EditSubSector;
