"use client"
import Navbar from "@/components/navbar.component"
import SideMenu from "@/components/side.menu.component"
import useSideBar from "@/hooks/side.bar.hook"
import { Box, Stack } from "@mui/material"
import React from "react"

export type Layout_prop = {
    children: React.ReactNode
}
export default function HomeShell({ children }: Layout_prop) {
    const { open, on } = useSideBar({ default_open: true })
    return (
        <Stack
            direction={"column"}
            sx={{ minHeight: 0, height: "100%", width: "100%" }}
        >
            <Navbar onClick={on.toggle} />

            <Stack
                direction={"row"}

                sx={{
                    flex: 1,
                    minHeight: 0,
                    height: "100%",
                    width: "100%",
                }}
            >
                <SideMenu
                    open={open}
                    onClose={on.toggle}
                />
                <Box
                    sx={{ width: "100%" }}
                >
                    {children}
                </Box>
            </Stack>
        </Stack>
    )

};
