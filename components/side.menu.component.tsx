"use client";

import {
    Box,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    Tooltip,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import FactoryIcon from "@mui/icons-material/Factory";
import InventoryIcon from "@mui/icons-material/Inventory";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

import Link from "next/link";

type Props = {
    open: boolean;
    onClose: () => void;
    onToggle: () => void;
};

const SIDEBAR_WIDTH = 250;

const items = [
    { text: "Demo", link: "/demo", icon: <DashboardIcon color="info" /> },
    { text: "แดชบอร์ด", link: "/", icon: <DashboardIcon /> },
    { text: "มาสเตอร์เดต้า", link: "/data", icon: <AccountTreeIcon /> },
    { text: "คลังสินค้า", link: "/warehouse", icon: <WarehouseIcon /> },
    { text: "สั่งผลิต", link: "/manufacturing", icon: <FactoryIcon /> },
    { text: "สั่งซื้อ", link: "/inventory", icon: <InventoryIcon /> },
    { text: "บัญชี", link: "/account", icon: <AccountBalanceWalletIcon /> },
];

export default function SideMenu({ open, onToggle }: Props) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const menu = (
        <List sx={{ paddingX: 0 }}   >
            {items.map((item, key) => (
                <Tooltip key={key} title={item.text}>
                    <ListItemButton
                        component={Link}
                        href={item.link}
                        sx={{ padding: 2 }}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <Typography variant="subtitle2">{item.text}</Typography>
                    </ListItemButton>
                </Tooltip>
            ))}
        </List>
    );

    if (isMobile) {
        return (
            <Drawer
                anchor="left"
                open={!open}
                onToggle={onToggle}
                onClick={onToggle}
                onClose={onToggle}
                ModalProps={{
                    keepMounted: false,
                }}
                sx={{
                    "& .MuiDrawer-paper": {
                        width: SIDEBAR_WIDTH,
                        maxWidth: "70vw",
                        boxSizing: "border-box",
                    },
                }}
            >
                {menu}
            </Drawer>
        );
    }

    return (
        <Box
            component="aside"
            sx={{
                padding: 0,
                width: open ? SIDEBAR_WIDTH : 0,
                flex: "0 0 auto",
                overflow: "hidden",
                transition: theme.transitions.create("width", {
                    duration: theme.transitions.duration.standard,
                }),
            }}
        >
            <Box
                sx={{
                    width: SIDEBAR_WIDTH,
                    height: "100%",
                    boxSizing: "border-box",
                    borderRight: open ? 1 : 0,
                    borderColor: "divider",
                    overflowY: "auto",
                    visibility: open ? "visible" : "hidden",
                    padding: 0,
                    paddingTop: 8
                }}
            >
                {menu}
            </Box>
        </Box>
    );
}
