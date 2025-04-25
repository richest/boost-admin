import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";
import { useTheme } from '@mui/material/styles';

import { useSelector } from "react-redux";

function ActionDialog(props) {
  const { setIsOpen, cancelAction, deleteAction } = props;
  const { loader } = useSelector((state) => state.request);
  const open = true;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = (event, reason) => {
    if (reason && reason === "backdropClick") return;
    setIsOpen(false);
    if (!!cancelAction) cancelAction();
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">Delete product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Stack direction="row" spacing={2}>
            <Button disabled={loader} variant="outlined" onClick={handleClose}>
              CANCEL
            </Button>
            <LoadingButton
              loading={loader}
              size="small"
              type="submit"
              color="error"
              loadingPosition="start"
              startIcon={<DeleteOutlineRoundedIcon />}
              variant="contained"
              onClick={() => (!!deleteAction ? deleteAction() : false)}
            >
              {loader ? "DELETING..." : "DELETE"}
            </LoadingButton>
          </Stack>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default ActionDialog;
