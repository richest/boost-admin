// @mui
import PropTypes from "prop-types";
import { alpha, styled } from "@mui/material/styles";
import {
    Card,
    Typography,
    useTheme,
    Popover,
    IconButton,
    Button,
    Tooltip,
} from "@mui/material";

// ----------------------------------------------------------------------

import { Link, NavLink } from "react-router-dom";
import Iconify from "components/iconify";
import SkeltonCardLoader from "components/admin-ui/loader/SkeltonCardLoader";
import { useSelector } from "react-redux";
import { useState } from "react";
import { ROUTE_SLUGS } from "app/constants";

const StyledIcon = styled("div")(({ theme }) => ({
    margin: "auto",
    display: "flex",
    borderRadius: "50%",
    alignItems: "center",
    width: theme.spacing(8),
    height: theme.spacing(8),
    justifyContent: "center",
    marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

ProductTemplateCard.propTypes = {
    color: PropTypes.string,
    icon: PropTypes.string,
    title: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    sx: PropTypes.object,
};

export default function ProductTemplateCard({
    isLoading,
    path,
    title,
    icon,
    data,
    color = "primary",
    sx,
    handleDelete,
    handleOpenMenu,
    handlePopoverOpen,
    handlePopoverClose,
    id,
    uniqueId,
    anchorEl,
    ...other
}) {
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);
    console.log(uniqueId, "uniqueId")
    const open = Boolean(anchorEl[id]);

    if (isLoading && isLoading !== undefined) {
        return <SkeltonCardLoader />;
    }
    console.log(data?.preview_image, "ododduiowud")
    return (
        <NavLink
            style={{ textDecoration: "none" }}
            to={"#"}
            className={"web-content-card"}
        >
            <Card
                sx={{
                    py: 5,
                    boxShadow: 1,
                    textAlign: "center",
                    background:
                        customization.navType === "dark"
                            ? "#103C65"
                            : theme.palette.primary.light,
                    ...sx,
                }}
                {...other}
            >
                <IconButton onClick={(event) => handlePopoverOpen(event, id)} sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                }}>
                    <Iconify icon="eva:more-vertical-outline" width={24} height={24} />
                </IconButton>

                <Popover
                    open={open}
                    anchorEl={anchorEl[id]}
                    onClose={() => handlePopoverClose(id)}
                    anchorOrigin={{
                        vertical: "center",
                        horizontal: "center",
                    }}
                    transformOrigin={{
                        vertical: "center",
                        horizontal: "center",
                    }}
                >
                    <div className="product_menu_item" style={{ padding: theme.spacing(2) }}>
                        <Link
                            to={`/dashboard/templates/create/${uniqueId?.replace(/[\s/]+/g, "-").toLowerCase()}`}
                            variant="contained"
                            color="primary"
                        >
                            <Tooltip title="Edit" arrow placement="right">
                                <Iconify
                                    icon="eva:edit-outline"
                                    sx={{ color: "rgba(0, 0, 0, 0.54)" }}
                                />
                            </Tooltip>
                            {/* <Iconify icon="eva:edit-outline" />
              Edit */}
                        </Link>
                        {/* <Link
              variant="contained"
              color="secondary"
              fullWidth
              sx={{ mt: 1 }}
            >
              <Tooltip title="View templates" arrow placement="right">
                <Iconify icon="eva:eye-outline"
                  sx={{ color: "rgba(0, 0, 0, 0.54)" }} />
              </Tooltip>

            </Link> */}
                        <Link
                            onClick={handleDelete}
                            variant="contained"
                            color="success"
                            sx={{ mt: 1 }}
                        >
                            <Tooltip title="Delete" arrow placement="right">
                                <Iconify
                                    icon="eva:trash-2-outline"
                                    sx={{ color: "rgb(189 51 51)" }}
                                />
                            </Tooltip>
                        </Link>
                    </div>
                </Popover>
                {/* Styled Icon with popover trigger */}
                <StyledIcon
                    // Open popover on click
                    sx={{
                        color: (theme) => theme.palette[color].light,
                        backgroundImage: (theme) =>
                            `linear-gradient(135deg, ${alpha(theme.palette[color].light, 0)} 0%, ${alpha(
                                theme.palette[color].light,
                                0.24
                            )} 100%)`,
                    }}
                >
                    <img
                        src={
                            data?.preview_image ||
                            "https://res.cloudinary.com/dwl5gzbuz/image/upload/v1738148606/project-thumb_laxubz.png"
                        }
                        alt="icon"
                        style={{
                            borderRadius: 50,
                            objectFit: 'cover'
                        }}
                        className="icon_products"
                    />
                </StyledIcon>

                {/* Popover component */}

                <Typography
                    variant="h4"
                    sx={{
                        color:
                            customization.navType === "dark"
                                ? theme.palette.primary.light
                                : "#0e1522",
                    }}
                >
                    {title}
                </Typography>
            </Card>
        </NavLink>
    );
}
