import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import InventoryIcon from '@mui/icons-material/Inventory';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import FactoryIcon from '@mui/icons-material/Factory';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Link from "next/link";

type prop = {
    open: boolean
    onClose: () => void
}

export default function SideMenu({ open, onClose }: prop) {

    return (
        <Drawer
            open={open}
            onClose={onClose}
        >
            <Box
                sx={{ width: 250 }}
            >
                <List>
                    {[
                        {
                            text: "แดชบอร์ด",
                            link: "/",
                            icon: <DashboardIcon />
                        },
                        {
                            text: "มาสเตอร์เดต้า",
                            link: "/data",
                            icon: <AccountTreeIcon />
                        },
                        {
                            text: "คลังสินค้า",
                            link: "/warehouse",
                            icon: <WarehouseIcon />
                        },
                        {
                            text: "สั่งผลิต",
                            link: "/manufacturing",
                            icon: <FactoryIcon />
                        },
                        {
                            text: "สั่งซื้อ",
                            link: "/inventory",
                            icon: <InventoryIcon />
                        },
                        {
                            text: "บัญชี",
                            link: "/account",
                            icon: <AccountBalanceWalletIcon />
                        },
                    ].map((item, index) => (
                        < ListItem key={index}>
                            <ListItemButton
                                onClick={onClose}
                                LinkComponent={Link}
                                href={item.link}
                            >
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    )
};
