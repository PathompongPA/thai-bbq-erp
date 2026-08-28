import { Box, Paper } from "@mui/material"

export default function Layout({ children }: LayoutProps<"/">) {
    return (
        <Box
            component={Paper}
            sx={{
            }}
        >
            {children}
        </Box>
    )
};
