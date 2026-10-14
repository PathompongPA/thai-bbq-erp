import { Box } from "@mui/material"
import React from "react"

type prop = {
    children: React.ReactNode
}
export default function Layout({ children }: prop) {
    return (
        <Box
            sx={{
                flex: 1,
                minHeight: 0,
                height: "100%",
                width: "100%",
                padding: {
                    xs: 2
                },
            }}
        >
            {children}
        </Box>
    )

};
