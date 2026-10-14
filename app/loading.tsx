
"use client";

import { Box, Typography } from "@mui/material";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { keyframes } from "@mui/system";

const appear = keyframes`
    from {
        opacity: 0;
        transform: translateY(5px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const progress = keyframes`
    0% { transform: translateX(-110%); }
    100% { transform: translateX(310%); }
`;

export default function Loading() {
    return (
        <Box
            role="status"
            aria-live="polite"
            sx={{
                minHeight: "100dvh",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                bgcolor: "background.default",
                color: "text.primary",
                px: 3,
                animation: `${appear} 250ms ease-out both`,
                "@media (prefers-reduced-motion: reduce)": {
                    animation: "none",
                    "& *": {
                        animation: "none !important",
                    },
                },
            }}
        >
            {/* Brand */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    mb: 5,
                }}
            >
                <LocalFireDepartmentIcon
                    sx={{
                        fontSize: 46,
                        color: "#FF8800",
                        mb: 1.5,
                    }}
                />

                <Typography
                    component="h1"
                    sx={{
                        fontSize: { xs: 32, sm: 38 },
                        fontWeight: 900,
                        letterSpacing: { xs: 3, sm: 5 },
                        lineHeight: 1.15,
                    }}
                >
                    THAI BBQ
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        mt: 1.5,
                    }}
                >
                    <Box
                        sx={{
                            width: 22,
                            height: 1.5,
                            bgcolor: "#FF8800",
                        }}
                    />

                    <Typography
                        sx={{
                            fontSize: 12,
                            fontWeight: 800,
                            color: "#FF8800",
                            letterSpacing: 5,
                            pl: 0.5,
                        }}
                    >
                        1999
                    </Typography>

                    <Box
                        sx={{
                            width: 22,
                            height: 1.5,
                            bgcolor: "#FF8800",
                        }}
                    />
                </Box>
            </Box>

            {/* Loading status */}
            <Box
                sx={{
                    width: "100%",
                    maxWidth: 230,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1.75,
                }}
            >
                <Typography
                    sx={{
                        fontSize: 13,
                        fontWeight: 500,
                        color: "text.secondary",
                        letterSpacing: 0.3,
                    }}
                >
                    กำลังเตรียมระบบ
                </Typography>

                <Box
                    sx={{
                        width: "100%",
                        height: 3,
                        overflow: "hidden",
                        borderRadius: 10,
                        bgcolor: "action.hover",
                    }}
                >
                    <Box
                        sx={{
                            width: "35%",
                            height: "100%",
                            bgcolor: "#FF8800",
                            borderRadius: 10,
                            animation: `${progress} 1.2s ease-in-out infinite`,
                        }}
                    />
                </Box>
            </Box>

            {/* Footer */}
            <Typography
                sx={{
                    position: "absolute",
                    bottom: 28,
                    fontSize: 10,
                    fontWeight: 500,
                    letterSpacing: 1.5,
                    color: "text.disabled",
                }}
            >
                BUSINESS MANAGEMENT SYSTEM
            </Typography>
        </Box>
    );
}
