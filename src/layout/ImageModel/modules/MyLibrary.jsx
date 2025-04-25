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
import Search from "@mui/icons-material/Search";
import CheckIcon from "@mui/icons-material/Check";

function MyLibrary({
  isLoading,
  data,
  handlecheckMedia,
  activeImage,
  handleSearch,
  selectedImage,
  setSelectedImage,
  handleSelectMedia,
}) {
  return (
    <>
      <Grid container spacing={2} alignItems="center" className="modal-grid-wrap">
        <Grid item xs={12} md={12}>
          <Typography variant="h6">My library</Typography>
        </Grid>
        <Grid item xs={12} md={12}>
          <div className="position-relative">
            <Search
              sx={{
                position: "absolute",
                top: "50%",
                zIndex: 2,
                transform: "translateY(-50%)",
                right: 15,
              }}
            />
            <TextField
              placeholder="Search"
              variant="outlined"
              fullWidth
              // className="ps-5"
              onChange={(e) => handleSearch(e)}
            />
          </div>
        </Grid>
      </Grid>

      <Grid container spacing={2} style={{ marginTop: "20px" }}>
        {!data.length && <p>No Data found</p>}

        {data.map(({ media_url, id, name }) => (
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
                <>
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
                        image={media_url}
                        alt={name}
                        onClick={() => handleSelectMedia(media_url)}
                      />
                      <input
                        onChange={() => handlecheckMedia(id)}
                        id={`selected-media?id=${id}`}
                        type="checkbox"
                        style={{ display: "none" }}
                        checked={activeImage === id}
                      />
                    </label>
                  </div>

                  <CardContent className="p-0 pt-1">
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      className="small"
                    >
                      {name}
                    </Typography>
                  </CardContent>
                </>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default MyLibrary;
