import { Box } from "@mui/material";
import DemoComponent from "./demo.component";

export default function DemoPage() {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                color: "text.primary",
                padding: 4
            }}
        >
            <DemoComponent />
        </Box>
    )

};
