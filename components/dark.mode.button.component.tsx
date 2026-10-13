"use client"
import { useThemeMode } from "@/app/ThemeRegistry";
import { IconButton, Tooltip } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export default function DarkModeButton() {
    const { mode, toggleMode } = useThemeMode();
    return (
        <Tooltip
            title="เปรียนธีม"
            sx={{
                aspectRatio: "1 / 1"
            }}
        >
            <IconButton
                onClick={toggleMode}
            >
                {mode === "dark" ? (
                    <LightModeIcon />
                ) : (
                    <DarkModeIcon />
                )}
            </IconButton>
        </Tooltip>
    );
};
