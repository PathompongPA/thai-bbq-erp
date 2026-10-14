"use client"

import { Grid, ListItemButton, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { Prisma } from "@/generated/prisma/client";

type prop = {
    item_variant: Prisma.ItemGetPayload<{
        include: {
            itemType: true,
            variants: true
        }
    }>[]
}

export default function ListProducts({ item_variant }: prop) {
    return (
        <Grid
            component={Grid}
            container
            spacing={2}
            columns={{ xs: 1, md: 4 }}
            sx={{}}
        >
            {item_variant.map((_item, key) => {
                const url = `/data/product/${_item.id}`
                return (
                    <Grid
                        key={key}
                        component={Grid}
                        size={1}
                        sx={{
                            borderRadius: 2,
                        }}
                    >
                        <ListItemButton
                            LinkComponent={Link}
                            href={url}
                            sx={{
                                display: "flex",
                                padding: 0,
                                borderRadius: 2,
                                overflow: "hidden",
                                bgcolor: "divider"
                            }} >
                            <Grid container columns={12} sx={{ width: "100%" }} spacing={2}>
                                <Grid size={5} sx={{ bgcolor: "divider", aspectRatio: 1 / 1 }}></Grid>
                                <Grid size={7} spacing={1} sx={{ paddingY: 1, alignContent: "center" }} >
                                    <Stack spacing={0}>
                                        <Typography variant="h6" >{_item.name ?? " - "} </Typography>
                                        <Typography color="textSecondary" variant="caption"> {_item.name_en ?? `${_item.name_en}`} </Typography>
                                    </Stack>
                                    <Stack spacing={0}>
                                        <Typography color="textSecondary" variant="subtitle2">{_item.variants.length ?? `${_item.variants.length} `} รูปแบบสินค้า</Typography>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </ListItemButton>
                    </Grid>
                )
            })}
        </Grid>
    )
};