import Navbar from "@/components/navbar.component"
import { requireUser } from "@/lib/auth"
import { Paper, Stack } from "@mui/material"

export default async function Layout({ children }: { children: React.ReactNode }) {
    await requireUser()
    return (
        <Paper
            component={Stack}
            direction={"column"}
            sx={{
                height: "100vh",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Navbar />
            {children}
        </Paper>
    )
};
