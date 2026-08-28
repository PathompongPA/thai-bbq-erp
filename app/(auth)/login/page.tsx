import Login from "@/components/login.component";
import { Box, Stack } from "@mui/material";

export default async function LoginPage() {

    return (
        <Box
            component={Stack}
            direction={"column"}
            sx={{
                height: "100vh"
            }}
        >
            <Login />
        </Box>
    )
};
