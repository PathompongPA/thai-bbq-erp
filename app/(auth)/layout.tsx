import { Box, Stack } from "@mui/material"

export default function Layout({ children }: LayoutProps<"/">) {
    return (
        <Stack sx={{}}>
            {children}
        </Stack>
    )
};
