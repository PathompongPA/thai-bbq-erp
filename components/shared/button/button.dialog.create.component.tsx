"use client"

import useDialog from "@/hooks/dialog.hook"
import { Box, Button, Tooltip } from "@mui/material"
import DialogForm from "../dialog/dialog.form.component"
import AddIcon from '@mui/icons-material/Add';
import { Action_State_interface } from "@/action";

type prop = {
    title?: string
    children?: React.ReactNode
    onSubmit: (state: Action_State_interface, formdata: FormData) => Promise<Action_State_interface>
}

export default function ButtonDialogCreate({ title = "เพิ่มรายการ", onSubmit, children }: prop) {
    const { isOpen, on } = useDialog()
    return (
        <Box >
            <Tooltip title="สร้างรายการ">
                <Button
                    fullWidth
                    onClick={on.open}
                    sx={{ gap: 1 }}
                    variant="contained"
                >
                    <AddIcon />
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
        </Box>
    )
};
