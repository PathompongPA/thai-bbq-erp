"use client"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

export type form_dialog = {
    open: boolean
    onToggle: () => void
}
export default function FormDemo({ open, onToggle }: form_dialog) {
    const mockup = [
        {
            name: "name",
            type: "text",
            label: "ชื่อ"
        },
        {
            name: "name",
            type: "text",
            label: "text"
        },
    ]
    return (
        <Dialog
            open={open}
            onClose={onToggle}
            sx={{
            }}
        >
            <DialogTitle >
                asdf
            </DialogTitle>

            <form>
                <DialogContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1
                    }}
                >
                    {mockup.map((item, key) => {
                        return (
                            <TextField
                                key={key}
                                name={item.name}
                                type={item.type}
                                label={item.label}
                            />
                        )
                    })}
                </DialogContent>
            </form>
            <DialogActions>
                <Button
                    onClick={onToggle}
                >
                    ยกเลิก
                </Button>
                <Button
                    variant="contained"
                    type="submit"
                >
                    บันทึก
                </Button>

            </DialogActions>
        </Dialog>
    )
};
