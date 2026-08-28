"use client"
import { AppBar, Box, Button, IconButton, Stack, Tooltip, Typography } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import SideMenu from "./side.menu.component";
import Link from "next/link";
import AccountButton from "./account.button.component";
import NotificationButton from "./notification.button.component";
import DarkModeButton from "./dark.mode.button.component";

const mockupNotification = [
    {
        title: "ระบบสั่งผลิต",
        message: "สร้างคำสั่งผลิต MO-29082026-001",
        time: "",
        ref: {
            code: "MO-29082026-001",
            action: "/manufacturing"
        }
    },
    {
        title: "ระบบคลังสินค้า",
        message: "นำเข้าสินค้า IN-29082026-002",
        time: "",
        ref: {
            code: "IN-29082026-002",
            action: "/warehouse"
        }
    },
    {
        title: "ระบบสั่งซื้อ",
        message: "คำสั่งซื้อ PO-29082026-007",
        time: "",
        ref: {
            code: "PO-29082026-007",
            action: "/inventory"
        }
    },
    {
        title: "ระบบสั่งซื้อ",
        message: "คำสั่งซื้อ PO-29082026-007",
        time: "",
        ref: {
            code: "PO-29082026-007",
            action: "/inventory"
        }
    },
]

export default function Navbar() {
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const toggleOpenMenu = () => setIsOpenMenu(!isOpenMenu)
    const notificationCount = mockupNotification.length
    return (
        <div className="">
            <AppBar>
                <Stack
                    direction={"row"}
                    sx={{
                        padding: 1,
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%"
                    }} >
                    <Box component={Stack} direction={"row"} >

                        <Tooltip title="เมนู">
                            <IconButton
                                onClick={toggleOpenMenu}
                                sx={{
                                    color: "white"
                                }}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="หน้าหลัก">
                            <Button
                                href="/"
                                LinkComponent={Link}
                                variant="text"
                            >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 600,
                                        color: "white"
                                    }}
                                >
                                    Thai bbq 1999
                                </Typography>
                            </Button>
                        </Tooltip>

                    </Box>

                    <Box
                        component={Stack}
                        direction={"row"}
                        spacing={1}
                    >
                        <DarkModeButton />
                        <NotificationButton notificationCount={notificationCount} notification={mockupNotification} />
                        <AccountButton />
                    </Box>
                </Stack>

                <SideMenu open={isOpenMenu} onClose={toggleOpenMenu} />

            </AppBar>
        </div>
    )

};
