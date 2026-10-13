"use client";

import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    useMediaQuery,
    useTheme,
} from "@mui/material";

import InventoryIcon from "@mui/icons-material/Inventory";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import FactoryIcon from "@mui/icons-material/Factory";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

import Link from "next/link";

type Props = {
    open: boolean;
    onClose: () => void;
};

const SIDEBAR_WIDTH = 250;

export default function SideMenu({ open, onClose }: Props) {
    const theme = useTheme();

    const isMobile = useMediaQuery(
        theme.breakpoints.down("sm")
    );

    const menu = (
        <List >
            {item.map((item, index) => (
                <ListItem key={index} disablePadding>
                    <ListItemButton
                        component={Link}
                        href={item.link}
                        onClick={isMobile ? onClose : undefined}
                    >
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>

                        <ListItemText
                            primary={item.text}
                        />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    );

    /*
     * Mobile
     * Drawer ลอยออกมาจากด้านข้าง
     */
    if (isMobile) {
        return (
            <Drawer
                variant="temporary"
                open={open}
                onClose={onClose}
            >
                <Box sx={{ width: SIDEBAR_WIDTH }}>
                    {menu}
                </Box>
            </Drawer>
        );
    }

    /*
     * Desktop
     * ไม่ใช้ Drawer
     * ให้ Sidebar เป็น flex item จริง ๆ
     */
    return (
        <Box
            sx={{
                width: open ? SIDEBAR_WIDTH : 0,
                flexShrink: 0,
                overflow: "hidden",

                transition: theme.transitions.create("width", {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            }}
        >
            <Box
                sx={{
                    width: SIDEBAR_WIDTH,
                    height: "100%",
                    borderRight: 1,
                    borderColor: "divider",
                    overflow: "hidden",
                }}
            >
                {menu}
            </Box>
        </Box>
    );
}

const item = [
    {
        text: "demo",
        link: "/demo",
        icon: <DashboardIcon />,
    },
    {
        text: "แดชบอร์ด",
        link: "/",
        icon: <DashboardIcon />,
    },
    {
        text: "มาสเตอร์เดต้า",
        link: "/data",
        icon: <AccountTreeIcon />,
    },
    {
        text: "คลังสินค้า",
        link: "/warehouse",
        icon: <WarehouseIcon />,
    },
    {
        text: "สั่งผลิต",
        link: "/manufacturing",
        icon: <FactoryIcon />,
    },
    {
        text: "สั่งซื้อ",
        link: "/inventory",
        icon: <InventoryIcon />,
    },
    {
        text: "บัญชี",
        link: "/account",
        icon: <AccountBalanceWalletIcon />,
    },
];