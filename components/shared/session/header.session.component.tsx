import { Box, Grid, Stack, Typography } from "@mui/material";
import React from "react";

type prop = {
    children?: React.ReactNode
    button?: React.ReactNode
    tag?: React.ReactNode

    title?: string | undefined | null
    subTitle?: string | undefined | null
}

export default function HeaderSession({ children, title, subTitle, button, tag }: prop) {
    return (
        <Grid sx={{}} size={1} columns={1} >
            <Grid sx={{}} container columns={12} size={1}>
                <Grid size={{ xs: 10, md: 10 }} sx={{}}>
                    <Typography component={Grid} size={10} variant="h5" >{title}</Typography>
                    <Typography variant="subtitle1" color="textDisabled" >{subTitle}</Typography>
                    {tag &&
                        (<Box>
                            {tag}
                        </Box>
                        )}
                </Grid>
                {button &&
                    <Grid
                        size={{ xs: 2, md: 2 }}
                        sx={{
                            display: 'flex',
                            justifyContent: "end",
                            alignItems: "center"
                        }}
                    >
                        {button}
                    </Grid>
                }
            </Grid>
            {children}
        </Grid >
    )
};
