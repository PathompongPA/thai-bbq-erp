"use client"

import { Button, Tooltip } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter()
    const onClick = () => router.back()

    return (
        <Tooltip title="ย้อนกลับ" >
            <Button onClick={onClick}>
                <ArrowBackIosNewIcon
                    fontSize="small"
                    color="action"
                />
            </Button>
        </Tooltip>
    )
};
