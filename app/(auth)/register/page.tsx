import RegisterForm from "@/components/register.component";
import { Stack } from "@mui/material";

export default function RegisterPage() {
    return (
        <Stack
            component={Stack}
            direction={"column"}
            sx={{
                height: "100vh",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <RegisterForm />
        </Stack>
    )

};
