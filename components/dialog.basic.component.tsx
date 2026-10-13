import { Action_State_interface } from "@/action";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";

import React from "react";
export interface Children {
    children?: React.ReactNode
}
export interface Dialog_basic_prop extends Children {
    onToggle: () => void
    isOpen: boolean
    title: string
    iconAction?: React.ReactNode
    onAction?: (state: Action_State_interface, formdata: FormData) => Promise<Action_State_interface>
}
export default function DialogBasic({ children, onToggle, isOpen = true, title, iconAction }: Dialog_basic_prop) {
    return (
        <Dialog
            open={isOpen}
            onClose={onToggle}
        >
            <DialogTitle >
                {title}
                {iconAction &&
                    <IconButton>
                        {iconAction}
                    </IconButton>
                }
            </DialogTitle>

            <DialogContent>
                {children}
            </DialogContent>

        </Dialog>
    )

};
