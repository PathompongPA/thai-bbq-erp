"use client"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"

type prop = {
    form_name: string
    title?: string
    content?: string
    open?: boolean
    onToggle: () => void
    onClose: () => void
}

export default function DialogConfirm(
    {
        title = "หัวข้อ",
        content = "เนื้อหาที่ต้องการระบุ",
        open = false,
        onToggle,
        onClose,
        form_name
    }
        : prop) {
    return (
        <Dialog
            open={open}
            onToggle={onToggle}
            onClose={onClose}
            maxWidth="xs"
            sx={{
                p: 4,
                gap: 4
            }}
        >

            <DialogTitle>{title}</DialogTitle>

            <DialogContent> {content} </DialogContent>

            <DialogActions>
                <Button
                    onClick={onClose}
                >
                    ยกเลิก
                </Button>
                <Button
                    onClick={onClose}
                    variant="contained"
                    color="error"
                    type="submit"
                    form={form_name}
                >
                    ลบ
                </Button>
            </DialogActions>

        </Dialog >
    )
};
