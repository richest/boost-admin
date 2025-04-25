import { TableCell, TableRow, Typography, Skeleton } from "@mui/material";
import { DEFAULT_CSS } from "app/constants";

const _key = (index) => {
  return `key-${index}-${Math.floor(Math.random() * 99999) + 1}`;
};

function SkeltonLoader(props) {
  const rows = props.rows !== undefined ? props.rows : 2;
  const columns = props.columns !== undefined ? props.columns : 6;
  return (
    <>
      <TableRow
        sx={{ backgroundColor: DEFAULT_CSS.LOADER_BG_COLOR }}
        hover
        key={_key(0)}
      >
        <TableCell
          align="center"
          className={`as${_key(1)}`}
          variant="body1"
          colSpan={props.colSpan}
        >
          <Typography variant="subtitle2" className="user-name" noWrap>
            {props.loaderMessage}
          </Typography>
        </TableCell>
      </TableRow>
      {[...Array(rows)].map((_, rowIndex) => {
        return (
          <TableRow
            key={_key(rowIndex + 2)}
            sx={{ backgroundColor: DEFAULT_CSS.LOADER_BG_COLOR }}
          >
            {[...Array(columns)].map((_, colIndex) => {
              return (
                <TableCell key={_key(`${rowIndex}-${colIndex}`)} align="center">
                  <Typography component="div" variant="body1" sx={{ py: 0.5 }}>
                    <Skeleton animation="pulse" variant="rectangular" />
                  </Typography>
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}
    </>
  );
}
export default SkeltonLoader;
