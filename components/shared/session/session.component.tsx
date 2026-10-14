"use client"

import { Grid, GridProps, Typography } from "@mui/material"
import React from "react"

type prop = {
    children?: React.ReactNode
    button?: React.ReactNode

    title?: string
    variant?: "header" | "body" | "footer"
    columns?: GridProps["columns"]
}

export default function Session({
    children,
    columns = 1,
    title = "",
    variant = "body",
    button

}: prop) {
    return (
        <Grid columns={1} spacing={{ xs: 2, md: 2 }} container sx={{ py: variant === "header" ? 0 : 2 }}>
            {title &&
                <Grid size={1} container columns={12}  >
                    <Grid size={{ xs: 6, md: 10 }} >
                        <Typography
                            variant="subtitle1"
                        >
                            {title}
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 6, md: 2 }} sx={{ display: "flex", justifyContent: "end" }} >
                        {button}
                    </Grid>
                </Grid>
            }
            {children &&
                <Grid
                    container
                    size={1}
                    columns={columns}
                    sx={{
                        p: 2,
                        borderRadius: 2,
                        border: 1,
                        borderColor: "divider",
                    }}
                >
                    {children}
                </Grid>
            }
        </Grid>
    )

};
