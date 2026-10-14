import { requireUser } from "@/lib/auth"
import { Box, Stack } from "@mui/material"
import HomeShell from "./shell"

export default async function Layout({ children }: { children: React.ReactNode }) {
    await requireUser()
    return (
        <Box
            component={Stack}
            direction={"column"}
            sx={{
                minHeight: "100vh",
                height: "screen",
            }}
        >
            <HomeShell>
                {children}
            </HomeShell>
        </Box>
    )
};
