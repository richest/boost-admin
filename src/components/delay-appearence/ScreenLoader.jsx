import CircularProgress from "@mui/material/CircularProgress";
import { Grid } from "@mui/material";
// import LinearProgress from '@mui/material/LinearProgress';
function ScreenLoader() {
  return (
    <Grid className="screen-loader" item xs={4} style={{ textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" , height: "100vh"}}>
      <CircularProgress disableShrink />
    </Grid>
  );
}
export default ScreenLoader;
