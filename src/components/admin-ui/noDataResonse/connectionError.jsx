import { Grid, TableCell, TableRow, Typography } from "@mui/material";
import ErrorOutlineTwoToneIcon from "@mui/icons-material/ErrorOutlineTwoTone";
import { DEFAULT_CSS } from "app/constants";
function ConnectionError(props) {
  return (
    <>
      <TableRow>
        <TableCell
          sx={{
            padding: "30px !important",
            backgroundColor: DEFAULT_CSS.LOADER_BG_COLOR,
          }}
          colSpan={props.colspan}
        >
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <ErrorOutlineTwoToneIcon
              sx={{ mr: 1, color: DEFAULT_CSS.ERROR_MSG_COLOR, fontSize: 30 }}
            />
            <Typography
              variant="subtitle2"
              color={DEFAULT_CSS.ERROR_MSG_COLOR}
              className="data-name"
              noWrap
            >
              {props.message}
            </Typography>
          </Grid>
        </TableCell>
      </TableRow>
    </>
  );
}

export default ConnectionError;
