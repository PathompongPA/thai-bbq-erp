"use client"
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useActionState, useEffect, useId, useState } from "react";
import { deleteWarehouseType } from "@/action/warehouse.type.action";
import { action_init_state } from "@/action";
import { useRouter } from "next/navigation";
import DialogConfirm from "@/components/shared/dialog/dialog.confirm.component";

type prop = {
    id: number
    name: string
}

export default function ButtonDeleteWarehouseType({ id, name }: prop) {
    const [openConfirm, setOpenConfirm] = useState(false)

    const [state, action, padding] = useActionState(deleteWarehouseType, action_init_state)
    const router = useRouter()

    useEffect(() => {
        if (state.success && padding) { router.refresh() }
    }, [padding, router, state.success])

    const form_name = useId()
    return (
        <form action={action} id={form_name} >
            <input name="id" type="text" defaultValue={id} hidden />
            <IconButton onClick={() => setOpenConfirm(true)} >
                <DeleteIcon />
            </IconButton>
            <DialogConfirm
                title="ยืนยันการลบ"
                content={`คุณต้องการทำการลบ '${name}' `}
                open={openConfirm}
                onToggle={() => setOpenConfirm(!openConfirm)}
                onClose={() => setOpenConfirm(false)}
                form_name={form_name}
            />

        </form >
    )

};
