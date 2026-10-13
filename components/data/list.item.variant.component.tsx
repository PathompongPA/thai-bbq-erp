"use client"
import { List, ListItemButton, ListItemText } from "@mui/material";
import { ITEM_VARIANTS } from "@/action/item.action";
import Link from "next/link";

type prop = {
    item_variant: ITEM_VARIANTS[]
}

export default function ListProducts({ item_variant }: prop) {
    return (
        <List>
            {item_variant.map((_item, key) => {
                const link = `/data/product/${_item.id}`
                return (
                    <ListItemButton key={key} LinkComponent={Link} href={link}>
                        <ListItemText primary={_item.name}></ListItemText>
                    </ListItemButton>
                )
            })}
        </List>
    )

};
