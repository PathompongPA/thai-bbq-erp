import { requireUser } from "@/lib/auth"
import { Paper, Stack } from "@mui/material"
import HomeShell from "./shell"

export default async function Layout({ children }: { children: React.ReactNode }) {
    await requireUser()
    return (
        <Paper
            component={Stack}
            direction={"column"}
            sx={{
                maxHeight: "100%",
                height: "100%",
            }}
        >
            <HomeShell>
                {children}
            </HomeShell>
        </Paper>
    )
};
