"use client"
import { logout } from "@/lib/logout";
import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip } from "@mui/material"
import React, { useState } from "react"
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Link from "next/link";

export default function AccountButton() {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Box>
            <Tooltip title="โปรไฟล์">
                <IconButton
                    onClick={handleClick}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open}
                >
                    <Avatar
                        sx={{ width: 30, height: 30 }}
                    />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
            >
                <MenuItem
                    sx={{
                        width: 200,
                        gap: 2
                    }}
                    component={Link}
                    href="/profile"
                >
                    <AccountCircleIcon />
                    Profile
                </MenuItem>

                <MenuItem
                    sx={{ gap: 2 }}
                    onClick={logout}
                >
                    <LogoutIcon />
                    Logout
                </MenuItem>

            </Menu>
        </Box>
    )
};
