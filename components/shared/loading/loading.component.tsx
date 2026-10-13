import { CircularProgress, Modal } from "@mui/material";

type prop = {
    open?: boolean
}

export default function Loading({ open = false }: prop) {
    return (
        <Modal
            open={open}
        >
            <CircularProgress />
        </Modal>
    )

};
