import { getItems } from "@/action/item.action";
import Login from "@/components/login.component";
import { Box, Stack } from "@mui/material";

export default async function LoginPage() {
    const some = await getItems()

    console.log("some : ", some);
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
