import { useState, useRef, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// material-ui
import { useTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Typography from "@mui/material/Typography";

// third-party
import PerfectScrollbar from "react-perfect-scrollbar";

// project imports
import MainCard from "ui-component/cards/MainCard";
import Transitions from "ui-component/extended/Transitions";
import User1 from "assets/images/users/default-user.jpg";

// assets
import { IconLogout, IconSettings } from "@tabler/icons-react";
import { logout } from "redux/authenticate/actions";
import { AUTH_ROUTE_SLUGS } from "app/constants";

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);
  const { email, firstName, lastName } = useSelector(
    (state) => state.auth || {}
  );

  const _AUTH_USER = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListItemClick = () => {
    // navigate();
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Chip
        sx={{
          height: "48px",
          alignItems: "center",
          borderRadius: "27px",
          transition: "all .2s ease-in-out",
          borderColor: theme.palette.primary.main,
          backgroundColor:
            customization.navType === "dark"
              ? theme.palette.dark[800]
              : theme.palette.primary.light,
          '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: theme.palette.primary.main,
            background: `${theme.palette.primary.main}!important`,
            color: theme.palette.primary.light,
            "& svg": {
              stroke: theme.palette.primary.light,
            },
          },
          "& .MuiChip-label": {
            lineHeight: 0,
          },
        }}
        icon={
          <Avatar
            src={_AUTH_USER?.profile_picture || User1}
            sx={{
              ...theme.typography.mediumAvatar,
              margin: "8px 0 8px 8px !important",
              cursor: "pointer",
            }}
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            color="inherit"
          />
        }
        label={
          <IconSettings
            stroke={1.5}
            size="1.5rem"
            color={theme.palette.primary.main}
          />
        }
        variant="outlined"
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="primary"
      />
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 14],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions in={open} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard
                  border={false}
                  elevation={16}
                  content={false}
                  boxShadow
                  shadow={theme.shadows[16]}
                  sx={{
                    backgroundColor:
                      customization.navType === "dark"
                        ? theme.palette.dark[800]
                        : theme.palette.primary.light,
                  }}
                >
                  <PerfectScrollbar
                    style={{
                      height: "100%",
                      overflowX: "hidden",
                    }}
                  >
                    <Box sx={{ p: 2, pt: 0 }}>
                      <Card
                        sx={{
                          // bgcolor: theme.palette.primary.light,
                          backgroundColor:
                            customization.navType === "dark"
                              ? theme.palette.dark[800]
                              : theme.palette.primary.light,
                        }}
                      >
                        <CardContent>
                          <Grid container spacing={2} direction="column">
                            <Grid item>
                              <Grid
                                item
                                container
                                alignItems="center"
                                justifyContent="space-between"
                              >
                                <Grid item>
                                  <Typography
                                    component="span"
                                    variant="h4"
                                    sx={{
                                      fontWeight: 400,
                                      color:
                                        customization.navType === "dark"
                                          ? theme.palette.primary.light
                                          : theme.palette.dark[800],
                                    }}
                                  >
                                    {lastName
                                      ? `${firstName} ${lastName}`
                                      : firstName}
                                  </Typography>
                                  <Typography
                                    variant="subtitle1"
                                    sx={{
                                      color:
                                        customization.navType === "dark"
                                          ? theme.palette.primary.light
                                          : theme.palette.dark[800],
                                    }}
                                  >
                                    {email}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                      <Divider />
                      <List
                        component="nav"
                        sx={{
                          width: "100%",
                          maxWidth: 350,
                          minWidth: 300,
                          backgroundColor:
                            customization.navType === "dark"
                              ? theme.palette.dark[800]
                              : theme.palette.primary.light,
                          borderRadius: "10px",
                          [theme.breakpoints.down("md")]: {
                            minWidth: "100%",
                          },
                          "& .MuiListItemButton-root": {
                            mt: 0.5,
                          },
                        }}
                      >
                        <Link
                          style={{ textDecoration: "none" }}
                          to={AUTH_ROUTE_SLUGS.SETTINGS}
                        >
                          <ListItemButton
                            sx={{
                              borderRadius: `${customization.borderRadius}px`,
                            }}
                            onClick={() => handleListItemClick()}
                          >
                            <ListItemIcon>
                              <IconSettings stroke={1.5} size="1.3rem" />
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color:
                                      customization.navType === "light"
                                        ? theme.palette.dark[800]
                                        : theme.palette.primary.light,
                                  }}
                                >
                                  Account Settings
                                </Typography>
                              }
                            />
                          </ListItemButton>
                        </Link>
                        <ListItemButton
                          sx={{
                            borderRadius: `${customization.borderRadius}px`,
                          }}
                          onClick={handleLogout}
                        >
                          <ListItemIcon>
                            <IconLogout stroke={1.5} size="1.3rem" />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography
                                variant="body2"
                                sx={{
                                  color:
                                    customization.navType === "light"
                                      ? theme.palette.dark[800]
                                      : theme.palette.primary.light,
                                }}
                              >
                                Logout
                              </Typography>
                            }
                          />
                        </ListItemButton>
                        {/* <ListItemButton
                          sx={{
                            borderRadius: `${customization.borderRadius}px`,
                          }}
                          onClick={handleAllLogout}
                        >
                          <ListItemIcon>
                            <IconLogout stroke={1.5} size="1.3rem" />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography
                                variant="body2"
                                sx={{
                                  color:
                                    customization.navType === "light"
                                      ? theme.palette.dark[800]
                                      : theme.palette.primary.light,
                                }}
                              >
                                Logout From All Devices
                              </Typography>
                            }
                          />
                        </ListItemButton> */}
                      </List>
                    </Box>
                  </PerfectScrollbar>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  );
};

export default ProfileSection;
