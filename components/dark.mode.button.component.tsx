"use client"
import { useThemeMode } from "@/app/ThemeRegistry";
import { IconButton } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export default function DarkModeButton() {
    const { mode, toggleMode } = useThemeMode();
    return (
        <IconButton
            onClick={toggleMode}
        >
            {mode === "dark" ? (
                <LightModeIcon />
            ) : (
                <DarkModeIcon />
            )}
        </IconButton>
    );
};
