import { Grid, Stack } from "@mui/material";
import React from "react";

type prop = {
    children: React.ReactNode
}

export default function SubSession({ children }: prop) {
    return (
        <Grid size={1} spacing={1}>
            <Stack spacing={1}>
                {children}
            </Stack>
        </Grid>
    )
};
