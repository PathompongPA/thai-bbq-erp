import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";

export default function NotFound() {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
                bgcolor: "background.default",
                color: "text.primary"
            }}
        >
            <Typography
                sx={{ fontWidth: 800 }}
                variant="h1"
            >
                404
            </Typography>

            <Typography variant="h5">
                Page Not Found
            </Typography>

            <Typography variant="h6" >
                ไม่พบหน้าที่คุณกำลังค้นหา
            </Typography>

            <Link
                href="/"
            >
                <Button
                    variant="text"
                >
                    กลับหน้าหลัก
                </Button>
            </Link>
        </Box>
    );
}