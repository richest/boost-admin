// material-ui
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

// ==============================|| LOADER ||============================== //

const Loader = () => (
  <Box
    sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      zIndex: 1301,
      width: "100%",
      height: "100vh",
    }}
  >
    <LinearProgress color="primary" />
  </Box>
);

export default Loader;
