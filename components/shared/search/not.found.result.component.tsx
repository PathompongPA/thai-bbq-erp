"use client"

import { Stack, Typography } from "@mui/material"
import ClearSearchButton from "./clear.search.button.component"
import React from "react"
type prop = {
    ButtonCreate: React.ReactNode
    Search: string
}

export default function NotFoundResult({ ButtonCreate, Search }: prop) {
    return (
        <Stack
            direction={"column"}
            spacing={3}
            sx={{ justifyContent: "center", alignItems: "center", p: 4, height: "100%" }}
        >
            <Typography variant="h3" > ไม่พบข้อมูล </Typography>

            <Typography variant="h6"> {` ไม่มีรายการที่ตรงกับ "${Search}" `} </Typography>

            <Stack spacing={1}>
                {ButtonCreate}
                <ClearSearchButton />
            </Stack>

        </Stack>
    )

};
