import React, { useEffect, useState } from "react";
import CustomModal from "components/Models";
import { Box, Grid } from "@mui/material";

function PreviewModal({ image, open, setOpen }) {
  return (
    <div>
      <CustomModal open={open} handleClose={() => setOpen(false)}>
        <Grid container spacing={2} className="modal-grid">
          <Grid item xs={12}>
            <Box sx={{ marginTop: "20px", marginLeft: "10px" }}>
              <div className="previewImage">
                <img src={image} alt="preview-image"  className="w-100"/>
              </div>
            </Box>
          </Grid>
        </Grid>
      </CustomModal>
    </div>
  );
}

export default PreviewModal;
