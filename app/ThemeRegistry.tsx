"use client";
import { createContext, useContext, useState } from "react";
import { getTheme } from "@/theme/theme";
import { ThemeProvider } from "@mui/material/styles";

const ThemeModeContext = createContext<{
    mode: "light" | "dark";
    toggleMode: () => void;
}>({
    mode: "light",
    toggleMode: () => { },
});

export const useThemeMode = () => useContext(ThemeModeContext);

export default function ThemeRegistry({
    children,
}: {
    children: React.ReactNode;
}) {
    const [mode, setMode] = useState<"light" | "dark">("dark");

    const toggleMode = () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
    };

    return (
        <ThemeModeContext.Provider value={{ mode, toggleMode }}>
            <ThemeProvider theme={getTheme(mode)}>
                {children}
            </ThemeProvider>
        </ThemeModeContext.Provider>
    );
}