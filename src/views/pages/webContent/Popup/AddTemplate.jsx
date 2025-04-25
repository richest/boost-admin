import React, { useState } from "react";
import {
  Popover,
  Box,
  Typography,
  Grid,
  ListItemText,
  Avatar,
  ListItemAvatar,
  ListItemButton,
  Checkbox,
  ListItem,
  List,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";
import Iconify from "components/iconify";
import { LoadingButton } from "@mui/lab";

const AddTemplateModal = ({ openAddModal, setOpenAddModal }) => {
  const customization = useSelector((state) => state.customization);
  const buttonRef = React.useRef(null);
  const { loader, message, messageType } = useSelector(
    (state) => state.request
  );
  const [checked, setChecked] = useState([1]);

  const data = [
    {
      id: 0,
      label: "Sports channel",
      avatarUrl:
        "https://fastly.picsum.photos/id/237/536/354.jpg?hmac=i0yVXW1ORpyCZpQ-CknuyV-jbtU7_x9EBQVhvT5aRr0",
    },
    {
      id: 1,
      label: "Halloween – Find 10 spiders",
      avatarUrl:
        "https://fastly.picsum.photos/id/237/536/354.jpg?hmac=i0yVXW1ORpyCZpQ-CknuyV-jbtU7_x9EBQVhvT5aRr0",
    },
    {
      id: 2,
      label: "Classic crossword",
      avatarUrl:
        "https://fastly.picsum.photos/id/237/536/354.jpg?hmac=i0yVXW1ORpyCZpQ-CknuyV-jbtU7_x9EBQVhvT5aRr0",
    },
    {
      id: 3,
      label: "Einstein vs. Tesla: Genius Minds in Comparison",
      avatarUrl:
        "https://fastly.picsum.photos/id/237/536/354.jpg?hmac=i0yVXW1ORpyCZpQ-CknuyV-jbtU7_x9EBQVhvT5aRr0",
    },
  ];

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <>
      <Popover
        open={openAddModal}
        anchorEl={buttonRef.current}
        onClose={() => {
          setOpenAddModal(false);
        }}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      >
        <Box
          sx={{
            padding: 2,
            width: 300,
            background: customization.navType === "dark" ? "#103C65" : "#fff",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h4" gutterBottom pb={4}>
              Add template to category
            </Typography>
            <Iconify
              sx={{ cursor: "pointer" }}
              onClick={() => setOpenAddModal(false)}
              icon="maki:cross"
              width={20}
              height={20}
            />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <LoadingButton
              loading={loader ? true : false}
              size="small"
              type="submit"
              loadingPosition="end"
              variant="contained"
            >
              {loader ? "PLEASE WAIT..." : "ADD"}
            </LoadingButton>
          </Box>

          <List
            dense
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {data.map((item) => {
              const labelId = `checkbox-list-secondary-label-${item.id}`;
              return (
                <ListItem
                  key={item.id}
                  secondaryAction={
                    <Checkbox
                      edge="end"
                      onChange={handleToggle(item.id)}
                      checked={checked.includes(item.id)}
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  }
                  disablePadding
                >
                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar alt={item.label} src={item.avatarUrl} />
                    </ListItemAvatar>
                    <ListItemText id={labelId} primary={item.label} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Popover>
    </>
  );
};

export default AddTemplateModal;
