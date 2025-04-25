import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";

import { useSelector } from "react-redux";
import Iconify from "components/iconify";

export function ActionUndo(props) {
  const { setIsOpen, cancelAction, undoAction } = props;
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
        <DialogTitle id="responsive-dialog-title">{"Delete user"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to recover this user?
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
              startIcon={
                <Iconify icon={"iconoir:undo-circle"} sx={{ mr: 2 }} />
              }
              variant="contained"
              onClick={() => (!!undoAction ? undoAction() : false)}
            >
              {loader ? "Recovering..." : "Undo"}
            </LoadingButton>
          </Stack>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default ActionUndo;
