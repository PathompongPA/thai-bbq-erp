"use client"
import { TextField } from "@mui/material"
import ButtonDialogCreate from "@/components/shared/button/button.dialog.create.component"
import { createWarehouseType } from "@/action/warehouse.type.action"

type prop = {
    title?: string
    name?: string
}

export default function CreateWarehouseTypeButton({ title = "เพิ่มประเภทการจัดเก็บ", name }: prop) {
    return (
        <ButtonDialogCreate
            title={title}
            onSubmit={createWarehouseType}
        >
            <TextField
                name="name"
                label="ชื่อ"
                defaultValue={name}
            />
        </ButtonDialogCreate>
    )

};
