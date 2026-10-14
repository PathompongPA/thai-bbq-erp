"use client";

import {
    createContext,
    useContext,
    useMemo,
    useState,
    type ReactNode,
} from "react";

import {
    CssBaseline,
    ThemeProvider,
} from "@mui/material";

import { createTheme } from "@mui/material/styles";

type ThemeMode = "light" | "dark";

type ThemeModeContextType = {
    mode: ThemeMode;
    toggleMode: () => void;
};

const ThemeModeContext = createContext<ThemeModeContextType>({
    mode: "dark",
    toggleMode: () => { },
});

export const useThemeMode = () => useContext(ThemeModeContext);

export default function ThemeRegistry({
    children,
}: {
    children: ReactNode;
}) {
    const [mode, setMode] = useState<ThemeMode>("dark");

    const toggleMode = () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
    };
    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    primary: {
                        main: "#E87522",
                    },
                    secondary: {
                        main: "#A33B24"
                    },
                    background: {
                        default: mode === "dark" ? "#171615" : "#dedede",
                        paper: mode === "dark" ? "#1f1e1e" : "#dedede",
                    },
                    text: {
                        primary: mode === "dark" ? "#F5F0E8" : "#212121",
                        secondary: mode === "dark" ? "#BDBDBD" : "#666666",
                    },
                },
                components: {
                    MuiTypography: {
                        styleOverrides: {
                            root: {}
                        }
                    },
                    MuiListItemButton: {
                        styleOverrides: {
                            root: {}
                        }
                    },
                    MuiButton: {
                        styleOverrides: {
                            root: {
                                borderRadius: 24
                            }
                        }
                    },
                    MuiOutlinedInput: {
                        styleOverrides: {
                            root: {
                                borderRadius: 8
                            }
                        }
                    },
                    MuiFilledInput: {
                        styleOverrides: {
                            root: {
                                borderRadius: 8
                            }
                        }
                    },
                    MuiCssBaseline: {
                        styleOverrides: {
                            html: {
                                width: "100%",
                                minHeight: "100%",
                            },
                            body: {
                                margin: 0,
                                width: "100%",
                                minHeight: "100vh",
                                backgroundColor:
                                    mode === "dark" ? "#171615" : "#F6F3EE",
                                color: mode === "dark" ? "#F5F0E8" : "#212121",
                            },
                            "#__next": {
                                minHeight: "100vh",
                            },
                        },
                    },
                },
            }),
        [mode]
    );

    const contextValue = useMemo(
        () => ({
            mode,
            toggleMode,
        }),
        [mode]
    );

    return (
        <ThemeModeContext.Provider value={contextValue}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeModeContext.Provider>
    );
}
