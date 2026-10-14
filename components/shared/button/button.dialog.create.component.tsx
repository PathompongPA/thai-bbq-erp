"use client"

import useDialog from "@/hooks/dialog.hook"
import { Box, Button, Tooltip } from "@mui/material"
import DialogForm from "../dialog/dialog.form.component"
import AddIcon from '@mui/icons-material/Add';
import { Action_State_interface } from "@/action";
import EditIcon from '@mui/icons-material/Edit';

type prop = {
    title?: string
    children?: React.ReactNode
    onSubmit: (state: Action_State_interface, formdata: FormData) => Promise<Action_State_interface>
    variant?: "create" | "update"
}

export default function ButtonDialogForm({ title = "เพิ่มรายการ", variant = "create", onSubmit, children }: prop) {
    const { isOpen, on } = useDialog()
    return (
        <Box >
            <Tooltip title="สร้างรายการ">
                <Button
                    fullWidth
                    onClick={on.open}
                    variant="outlined"
                    endIcon={
                        variant === "create" ?
                            <AddIcon fontSize="large" /> :
                            <EditIcon />
                    }
                >
                    {title}
                </Button>
            </Tooltip>

            <DialogForm
                title={title}
                onSubmit={onSubmit}
                onToggle={on.toggle}
                onClose={on.close}
                isOpen={isOpen}
            >
                {children}
            </DialogForm>
        </Box >
    )
};
