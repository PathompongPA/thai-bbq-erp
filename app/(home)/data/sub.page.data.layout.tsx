import { Box, Stack, Typography } from "@mui/material"
import React from "react"
import BackButton from "../../../components/back.button.component"

export type Sub_page_data_type = {
    children?: React.ReactNode
    buttonCreate?: React.ReactNode
    title: string
    subtitle: string
}
export default function LayoutSubPageData({ buttonCreate, children, title, subtitle }: Sub_page_data_type) {
    return (
        <Box
            component={Stack}
            sx={{
                gap: 2,
                position: "sticky",
                height: "100%",
                minHeight: 0,
                top: 0,
            }}
        >
            <Stack
                direction={"row"}
                sx={{
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >
                <Stack
                    direction={"row"}
                    spacing={2}
                >
                    <BackButton />
                    <Stack >
                        <Typography variant="h4" >
                            {title}
                        </Typography>
                        <Typography
                            variant="subtitle1"
                        >
                            {subtitle}
                        </Typography>
                    </Stack>
                </Stack>

                {buttonCreate}

            </Stack>

            <Stack
                sx={{
                    height: "100%",
                    minHeight: 0,
                }}
            >
                {children}
            </Stack>

        </Box>
    )

};
