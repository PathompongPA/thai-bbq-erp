"use client"

import { Register } from "@/action/auth.action";
import { Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import Link from "next/link";

export default function RegisterForm() {
    return (
        <Box
            component={Paper}
            sx={{
                padding: 2,
                gap: 2,
            }}
        >
            <form action={Register} >
                <Stack
                    sx={{
                        gap: 2,
                        padding: 2,
                    }}
                >

                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 800,
                            textAlign: "center"
                        }}
                    >
                        สร้างบัญชี
                    </Typography>

                    <Stack
                        sx={{ gap: 2 }}
                    >


                        <TextField
                            name="name"
                            label="ชื่อ"
                            variant="filled"
                            size="small"
                        />

                        <TextField
                            name="lastName"
                            label="นามสกุล"
                            variant="filled"
                            size="small"
                        />

                        <TextField
                            name="email"
                            label="อีเมล์"
                            variant="filled"
                            size="small"
                        />

                        <TextField
                            name="password"
                            label="รหัสผ่าน"
                            variant="filled"
                            size="small"
                            type="password"
                        />
                    </Stack>

                    <Stack
                        sx={{
                            gap: 2
                        }}
                    >
                        <Button
                            variant="contained"
                            type="submit"
                        >
                            ยืนยัน
                        </Button>

                        <Button
                            LinkComponent={Link}
                            href="/login"
                            size="small"
                        >
                            เข้าสู่ระบบ
                        </Button>
                    </Stack>

                </Stack>
            </form>
        </Box>
    )

};
