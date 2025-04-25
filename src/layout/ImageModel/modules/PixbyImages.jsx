import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import CheckIcon from "@mui/icons-material/Check";
function PixbyImages({
  isLoading,
  data,
  handleSearch,
  handleSelectMedia,
  handlecheckMedia,
  activeImage,
}) {
  console.log(activeImage, "data in component pixby");
  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={12}>
          <Typography variant="h6">Pixabay</Typography>
        </Grid>
        <Grid item xs={12} md={12}>
          <ZoomOutIcon />
          <TextField
            placeholder="Search"
            variant="outlined"
            fullWidth
            onChange={(e) => handleSearch(e)}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} style={{ marginTop: "20px" }}>
        {!data?.hits?.length && <p>No Data found</p>}

        {data?.hits?.map(({ id, largeImageURL, tags }, index) => (
          <Grid key={id} item xs={12} sm={6} md={4}>
            <Card>
              {isLoading ? (
                <Skeleton
                  variant="circular"
                  animation="wave"
                  width={210}
                  height={118}
                />
              ) : (
                <div className="media-selected">
                  <label
                    className={activeImage === id ? "checked-label" : ""}
                    htmlFor={`selected-media?id=${id}`}
                  >
                    <div className="check-icon">
                      <CheckIcon color="#fff" />
                    </div>
                    <CardMedia
                      component="img"
                      height="140"
                      image={largeImageURL}
                      alt={tags}
                      className={activeImage === id ? "checkedClass" : ""}
                      style={{ cursor: "pointer" }}
                      onClick={() => handleSelectMedia(largeImageURL)}
                    />
                  </label>
                  <input
                    onChange={() => handlecheckMedia(id)}
                    id={`selected-media?id=${id}`}
                    type="checkbox"
                    style={{ display: "none" }}
                    checked={activeImage === id}
                  />
                </div>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default PixbyImages;
