'use client'

import {
    Avatar,
    Badge,
    Box,
    Button,
    Card,
    CardActionArea,
    CardHeader,
    Divider,
    IconButton,
    Menu,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import Link from "next/link";
import { useState } from "react";

type Ref = {
    code: string;
    action: string;
};

type Notification = {
    title: string;
    message: string;
    time: string;
    ref: Ref;
};

type Prop = {
    notification: Notification[];
    notificationCount: number;
};

export default function NotificationButton({
    notificationCount,
    notification,
}: Prop) {

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
            <Tooltip title="แจ้งเตือน">
                <IconButton
                    aria-label="notification"
                    onClick={handleClick}
                >
                    <Badge
                        color="error"
                        badgeContent={notificationCount}
                        max={99}
                    >
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
            </Tooltip>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
                slotProps={{
                    paper: {
                        sx: {
                            width: {
                                xs: 320,
                                sm: 400,
                            },
                            mt: 1,
                            overflow: "hidden",
                        },
                    },
                }}
            >

                {/* Header */}
                <Box
                    sx={{
                        px: 2,
                        py: 1.5,
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: 700,
                            fontSize: 18,
                        }}
                    >
                        การแจ้งเตือน
                    </Typography>
                </Box>

                <Divider />

                {/* Notification List */}
                <Box
                    sx={{
                        maxHeight: 400,
                        overflowY: "auto",

                        "&::-webkit-scrollbar": {
                            width: 6,
                        },

                        "&::-webkit-scrollbar-thumb": {
                            borderRadius: 3,
                            // backgroundColor: "rgba(0, 0, 0, 0.2)",
                        },

                        "&::-webkit-scrollbar-track": {
                            // backgroundColor: "transparent",
                        },
                    }}
                >
                    <Stack
                    >
                        {notification.length > 0 ? (
                            notification.map((item, key) => (
                                <Card
                                    key={key}
                                    elevation={1}
                                    sx={{
                                        width: "100%",
                                        flexShrink: 0,
                                    }}
                                >
                                    <CardActionArea
                                        LinkComponent={Link}
                                        href={`${item.ref.action}/${item.ref.code}`}
                                        onClick={handleClose}
                                    >
                                        <CardHeader
                                            sx={{
                                                p: 1.5,
                                            }}
                                            avatar={
                                                <Avatar>
                                                    <PriorityHighIcon />
                                                </Avatar>
                                            }
                                            title={
                                                <Typography
                                                    sx={{
                                                        fontWeight: 600,
                                                        fontSize: 14,
                                                    }}
                                                >
                                                    {item.title}
                                                </Typography>
                                            }
                                            subheader={
                                                <Typography
                                                    sx={{
                                                        fontSize: 13,
                                                    }}
                                                >
                                                    {item.message}
                                                </Typography>
                                            }
                                        />
                                    </CardActionArea>
                                </Card>
                            ))
                        ) : (
                            <Box
                                sx={{
                                    py: 5,
                                    textAlign: "center",
                                }}
                            >
                                <Typography>
                                    ไม่มีการแจ้งเตือน
                                </Typography>
                            </Box>
                        )}
                    </Stack>
                </Box>

                <Divider />

                {/* Footer */}
                <Box
                    sx={{
                        p: 1,
                    }}
                >
                    <Button
                        fullWidth
                        onClick={() => {
                            // TODO: clear notifications
                        }}
                    >
                        ล้างการแจ้งเตือน
                    </Button>
                </Box>

            </Menu>
        </Box>
    );
}