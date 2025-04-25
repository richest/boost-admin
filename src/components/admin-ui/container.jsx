import { Container, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";

function PageContainer(props) {
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);
  const { heading, children } = props;
  return (
    <>
      <Container
        maxWidth="xl"
        sx={{ padding: "5px 10px 0 !important" }}
        {...props}
      >
        {heading ? (
          <Typography
            variant="h3"
            sx={{
              mb: 0.5,
              color:
                customization.navType === "dark"
                  ? theme.palette.primary.light
                  : "inherit",
            }}
          >
            {heading}
          </Typography>
        ) : (
          ""
        )}
        {children}
      </Container>
    </>
  );
}
export default PageContainer;
