import React, { useState } from "react";
import PropTypes from "prop-types";
import { NavLink as RouterLink } from "react-router-dom";
// @mui
import { Box, List, Typography, IconButton, Stack, ListItemText } from "@mui/material";

import { DEFAULT_CSS } from "src/app/constants";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
//
import { StyledNavItem, StyledNavItemIcon } from "./styles";
import Collapse from "@material-ui/core/Collapse";
import { hasChildren } from "src/utils/helpers/function";
import { useLocation } from "react-router-dom";

// ----------------------------------------------------------------------

CollapsedNavSection.propTypes = {
  data: PropTypes.array,
};

export default function CollapsedNavSection({ data = [] }) {
  const _sx = { position: "absolute", top: "5px", right: "5px", padding: "0" };
  const MenuItem = ({ item }) => {
    const Component = hasChildren(item) ? MultiLevel : SingleLevel;
    return <Component item={item} />;
  };

  const SingleLevel = ({ item }) => {
    const { title, path, icon, info } = item;
    return (
      <>
        <StyledNavItem
          component={RouterLink}
          to={path}
          sx={{
            mt:2,
            '&.active': {
              color: DEFAULT_CSS.PRIMARY_COLOR,
              // bgcolor: 'action.selected',
              fontWeight: 'fontWeightBold',
            },
            '&:hover':{
              color: DEFAULT_CSS.PRIMARY_COLOR,
              // bgcolor: 'action.selected',
              fontWeight: 'fontWeightBold',
            }
          }}
        >
          {/* <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
          > */}
            <Box>
              <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>
              <ListItemText sx={{fontSize:'12px', textAlign:'center'}} disableTypography primary={title} />
              {info && info}
            </Box>
          {/* </Stack> */}
        </StyledNavItem>
      </>
    );
  };

  const MultiLevel = ({ item }) => {
    const { title, icon, items: children } = item;
    let _tempVar = false;

    const handleClick = () => {
      setOpen((prev) => !prev);
    };

    const location = useLocation();
    let _path = location.pathname.split("/");
    var routeToMatch = "news";
    if (_path[2]?.toLocaleLowerCase()?.indexOf(routeToMatch) !== -1) {
      _tempVar = true;
    }

    const [open, setOpen] = useState(_tempVar);
    return (
      <>
        <StyledNavItem
          onClick={handleClick}
          sx={{
            py: 3,
            "&.active": {
              color: "text.primary",
              // bgcolor: "action.selected",
              fontWeight: "fontWeightBold",
              position: "relative",
            },
          }}
        >
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            spacing={0}
          >
            <Box>
              <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>
              <IconButton sx={_sx}>
                {open ? (
                  <ExpandMoreIcon sx={{ fontSize: 18 }} />
                ) : (
                  <ChevronRightIcon sx={{ fontSize: 18 }} />
                )}
              </IconButton>
            </Box>
            <Box>
              <Typography variant="span" sx={{ fontSize: 12, color: "white" }}>
                {title}
              </Typography>
            </Box>
          </Stack>
        </StyledNavItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List>
            {children.map((child, key) => (
              <MenuItem key={key} item={child} />
            ))}
          </List>
        </Collapse>
      </>
    );
  };

  return (
    <Box>
      <List className="menulist" disablePadding sx={{ px: '5px' }}>
        {data.map((item, key) => (
          <MenuItem key={key} item={item} />
        ))}
      </List>
    </Box>
  );
}
