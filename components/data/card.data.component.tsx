"use client"
import { ListItemButton, Stack, Typography } from "@mui/material";
import Link from "next/link";
import type { card_data } from "./list.data.component";

type prop = {
    item: card_data
}

export default function CardData({ item }: prop) {
    const { title, subtitle, path, icon } = item
    return (
        <ListItemButton
            LinkComponent={Link}
            href={path}
            sx={{
                bgcolor: "divider",
                borderRadius: 2,
                padding: 2
            }}
        >
            <Stack
                sx={{ gap: 1 }}
            >
                {icon}
                <Typography
                    variant="h6"
                >
                    {title}
                </Typography>
                <Typography
                    variant="subtitle1"
                    color="textDisabled"
                >{subtitle}</Typography>
            </Stack>
        </ListItemButton>
    )

};
