import { Box, CircularProgress, Dialog, Modal } from "@mui/material";

type prop = {
    open?: boolean
}

export default function Loading({ open = false }: prop) {
    return (
        <Dialog
            open={open}
            slotProps={{
                paper: {
                    elevation: 0,
                    sx: {
                        backgroundColor: "transparent",
                        boxShadow: "none",
                    },
                },
            }}
        >

            <CircularProgress />
        </Dialog>
    )

};
