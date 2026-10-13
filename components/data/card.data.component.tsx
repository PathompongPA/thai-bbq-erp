"use client"
import { Card, CardActionArea, CardHeader, CardMedia } from "@mui/material";
import Link from "next/link";
import type { card_data } from "./list.data.component";

type prop = {
    item: card_data
}
export default function CardData({ item }: prop) {
    const { title, subtitle, path } = item
    return (
        <Card >
            <CardActionArea
                component={Link}
                href={path}
            >
                <CardMedia
                    sx={{
                        height: 140,
                        bgcolor: "primary.main"
                    }}
                />
                <CardHeader
                    subheader={subtitle}
                    title={title}
                />
            </CardActionArea>
        </Card>
    )

};
