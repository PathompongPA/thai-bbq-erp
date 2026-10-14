
"use client";

import { useEffect, useState } from "react";
import {
    Box,
    CircularProgress,
    Typography,
} from "@mui/material";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

export default function SplashScreen() {
    const [show, setShow] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const fadeTimer = setTimeout(() => {
            setFadeOut(true);
        }, 2500);

        const removeTimer = setTimeout(() => {
            setShow(false);
        }, 3000);

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(removeTimer);
        };
    }, []);

    if (!show) return null;

    return (
        <Box
            sx={{
                position: "fixed",
                inset: 0,
                zIndex: 99999,
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "#101010",
                color: "#fff",
                opacity: fadeOut ? 0 : 1,
                transform: fadeOut ? "scale(1.04)" : "scale(1)",
                transition:
                    "opacity 500ms ease, transform 500ms ease",
                pointerEvents: fadeOut ? "none" : "auto",
            }}
        >
            {/* Background glow */}
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    background: `
                        radial-gradient(
                            ellipse at 50% 40%,
                            rgba(255, 136, 0, 0.09),
                            transparent 45%
                        ),
                        linear-gradient(
                            135deg,
                            #171717 0%,
                            #0D0D0D 60%,
                            #15110D 100%
                        )
                    `,
                }}
            />

            {/* Decorative orange glow */}
            <Box
                sx={{
                    position: "absolute",
                    width: { xs: 220, md: 420 },
                    height: { xs: 220, md: 420 },
                    borderRadius: "50%",
                    left: { xs: -130, md: -220 },
                    bottom: { xs: -100, md: -250 },
                    background:
                        "radial-gradient(circle, rgba(255,136,0,0.28), transparent 70%)",
                    filter: "blur(15px)",
                }}
            />

            {/* Decorative flame shapes */}
            <LocalFireDepartmentIcon
                sx={{
                    position: "absolute",
                    right: { xs: -35, md: 30 },
                    top: { xs: "8%", md: "10%" },
                    fontSize: { xs: 150, md: 260 },
                    color: "#FF8800",
                    opacity: 0.045,
                    transform: "rotate(15deg)",
                }}
            />

            {/* Main content */}
            <Box
                sx={{
                    position: "relative",
                    zIndex: 1,
                    width: "100%",
                    px: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                }}
            >
                {/* Brand logo */}
                <Box
                    sx={{
                        width: 76,
                        height: 76,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 1.5,
                    }}
                >
                    <LocalFireDepartmentIcon
                        sx={{
                            fontSize: 76,
                            color: "#FF8800",
                            filter:
                                "drop-shadow(0 0 20px rgba(255,136,0,0.18))",
                        }}
                    />
                </Box>

                <Typography
                    sx={{
                        fontSize: { xs: 32, md: 46 },
                        fontWeight: 900,
                        letterSpacing: { xs: 2, md: 4 },
                        lineHeight: 1.15,
                    }}
                >
                    THAI BBQ
                </Typography>

                {/* Brand divider */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        mt: 1,
                    }}
                >
                    <Box
                        sx={{
                            width: 36,
                            height: 2,
                            bgcolor: "#FF8800",
                        }}
                    />

                    <Typography
                        sx={{
                            color: "#FF8800",
                            fontWeight: 800,
                            letterSpacing: 5,
                            pl: 0.5,
                        }}
                    >
                        1999
                    </Typography>

                    <Box
                        sx={{
                            width: 36,
                            height: 2,
                            bgcolor: "#FF8800",
                        }}
                    />
                </Box>

                {/* System name */}
                <Typography
                    sx={{
                        mt: 4,
                        fontSize: { xs: 20, md: 26 },
                        fontWeight: 400,
                        letterSpacing: 1,
                        color: "#F5F5F5",
                    }}
                >
                    ERP System
                </Typography>

                <Typography
                    sx={{
                        mt: 2.5,
                        fontSize: { xs: 18, md: 22 },
                        fontWeight: 700,
                    }}
                >
                    กำลังเตรียมระบบ
                </Typography>

                <Typography
                    sx={{
                        mt: 0.75,
                        fontSize: { xs: 12, md: 15 },
                        color: "#A3A3A3",
                    }}
                >
                    กรุณารอสักครู่ ระบบกำลังเตรียมความพร้อม...
                </Typography>

                {/* Loading indicator */}
                <CircularProgress
                    size={80}
                    thickness={3}
                    sx={{
                        mt: 4,
                        color: "#FF8800",
                        "& .MuiCircularProgress-circle": {
                            strokeLinecap: "round",
                        },
                    }}
                />
            </Box>

            {/* Footer tagline */}
            <Box
                sx={{
                    position: "absolute",
                    bottom: { xs: 28, md: 42 },
                    left: 0,
                    right: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: { xs: 1, md: 2 },
                    px: 2,
                }}
            >
                <Box
                    sx={{
                        width: { xs: 18, md: 42 },
                        height: 1.5,
                        bgcolor: "#FF8800",
                    }}
                />

                <Typography
                    sx={{
                        fontSize: { xs: 8, md: 11 },
                        letterSpacing: { xs: 1, md: 2 },
                        color: "#A3A3A3",
                        whiteSpace: "nowrap",
                    }}
                >
                    GOOD FOOD
                </Typography>

                <Box
                    sx={{
                        width: 4,
                        height: 4,
                        borderRadius: "50%",
                        bgcolor: "#FF8800",
                    }}
                />

                <Typography
                    sx={{
                        fontSize: { xs: 8, md: 11 },
                        letterSpacing: { xs: 1, md: 2 },
                        color: "#A3A3A3",
                        whiteSpace: "nowrap",
                    }}
                >
                    GOOD PEOPLE
                </Typography>

                <Box
                    sx={{
                        width: 4,
                        height: 4,
                        borderRadius: "50%",
                        bgcolor: "#FF8800",
                    }}
                />

                <Typography
                    sx={{
                        fontSize: { xs: 8, md: 11 },
                        letterSpacing: { xs: 0.5, md: 1.5 },
                        color: "#A3A3A3",
                        whiteSpace: "nowrap",
                    }}
                >
                    BETTER TOGETHER
                </Typography>

                <Box
                    sx={{
                        width: { xs: 18, md: 42 },
                        height: 1.5,
                        bgcolor: "#FF8800",
                    }}
                />
            </Box>
        </Box>
    );
}
