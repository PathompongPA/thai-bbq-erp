"use client"
import { action_init_state, Action_State_interface } from "@/action"
import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button, Chip, TextField, } from "@mui/material"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

type prop = {
    isActive: true | false | undefined
    onSubmit: (state: Action_State_interface, formdata: FormData) => Promise<Action_State_interface>
    id: number
    name: string
}
export default function ChipToggleActive({ onSubmit, isActive = true, id, name }: prop) {

    const [state, formAction, padding] = useActionState(onSubmit, action_init_state)

    const router = useRouter()
    useEffect(() => {
        if (state.success && padding) {
            router.refresh()
        }
    }, [padding, router, state.success])

    console.log("padding : ", padding);

    return (
        <form action={formAction}>
            <TextField name={name} value={id} hidden />
            <Button type="submit" variant="text" sx={{ p: 0, }} loading={padding} disabled={padding} >
                {isActive ?
                    <Chip
                        label="ใช้งาน"
                        color="success"
                        variant="outlined"
                        size="medium"
                        icon={<CheckCircleIcon />}
                    /> :
                    <Chip
                        disabled

                        label="ปิดการใช้งาน"
                        color="default"
                        variant="outlined"
                        size="medium"
                        icon={<CancelIcon />}
                    />
                }
            </Button>
        </form>
    )

};
