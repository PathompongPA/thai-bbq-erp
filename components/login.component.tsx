"use client"
import { login } from "@/action/auth.action";
import { Box, Button, FormControl, IconButton, InputAdornment, Paper, Stack, TextField, Typography } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import Link from "next/link";

export default function Login() {

    const [showPassword, setShowPassword] = useState(false);
    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center"
            }}
            component={FormControl}
        >
            <form action={login}>
                <Paper
                    sx={{
                        padding: 4,
                        gap: 2
                    }}
                    component={Stack}
                >
                    <Typography
                        variant="h5"
                        sx={{ fontWeight: 800, textAlign: "center" }}
                    >
                        เข้าสู่ระบบ
                    </Typography>
                    <TextField
                        label="user"
                        placeholder="email"
                        size="small"
                        variant="filled"
                        name="user"
                    />
                    <TextField
                        label="password"
                        placeholder="password"
                        size="small"
                        variant="filled"
                        name="password"
                        type={`${showPassword ? "text" : "password"}`}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword((prev) => !prev)}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />

                    <Button
                        variant="contained"
                        type="submit"
                    >
                        เข้าสู่ระบบ
                    </Button>
                    <Button
                        LinkComponent={Link}
                        href="/register"
                    >
                        สร้างบัญชี
                    </Button>

                </Paper>
            </form>
        </Box>

    )
};
