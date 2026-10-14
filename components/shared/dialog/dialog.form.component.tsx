"use client"
import { action_init_state, Action_State_interface } from "@/action"
import { Backdrop, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, Stack } from "@mui/material"
import { useRouter } from "next/navigation"
import React, { useActionState, useEffect } from "react"

type props = {
    title: string
    children?: React.ReactNode
    isOpen: boolean
    onSubmit: (
        state: Action_State_interface,
        formdata: FormData
    ) => Promise<Action_State_interface>
    onToggle?: () => void
    onClose?: () => void
}

export default function DialogForm({ title, children, isOpen = false, onSubmit, onClose }: props) {

    const [state, formAction, padding] = useActionState(onSubmit, action_init_state)
    const router = useRouter()

    useEffect(() => {
        if (state.success && padding) {
            onClose?.(); router.refresh()
        }
    }, [onClose, padding, router, state.success])


    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            maxWidth="md"
            fullWidth
        >
            <form action={formAction} className="p-2">

                <DialogTitle> {title}</DialogTitle>

                <DialogContent >
                    <Stack sx={{ gap: 2, py: 1 }}>
                        {children}
                    </Stack>
                    {!state.success &&
                        <FormControl error >
                            < FormHelperText >
                                {String(state.error)}
                            </FormHelperText>
                        </FormControl>
                    }
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={onClose}
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

                <Backdrop
                    open={padding}
                    sx={{ position: "absolute", zIndex: 1 }}

                >
                    <CircularProgress />
                </Backdrop>

            </form>
        </Dialog >
    )

};
