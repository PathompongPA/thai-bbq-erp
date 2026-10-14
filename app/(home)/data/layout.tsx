import AutoBreadcrumbs from "@/components/shared/breadcrumbs/breadcrumbs.component"
import { Stack } from "@mui/material"
import React from "react"

type prop = {
    children: React.ReactNode
}
export default function Layout({ children }: prop) {
    return (
        <Stack
            sx={{
                flex: 1,
                minHeight: 0,
                height: "100%",
                width: "100%",
                padding: {
                    xs: 2
                },
            }}
            spacing={2}
        >
            <AutoBreadcrumbs />
            {children}
        </Stack>
    )

};
