import { makeStyles } from "@mui/material";

export const useStyles = makeStyles((theme) => ({
  avatarContainer: {
    position: "relative",
  },
  avatarOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    opacity: 0,
    transition: "opacity 0.2s ease-in-out",
  },
  avatarContainerHovered: {
    "& $avatarOverlay": {
      opacity: 1,
    },
  },
  avatarButton: {
    color: theme.palette.common.white,
  },
  uploadText: {
    color: theme.palette.common.white,
    marginLeft: theme.spacing(1),
  },
}));
