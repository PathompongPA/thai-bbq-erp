import { createUnit } from "@/action/unit.action";
import ButtonDialogCreate from "@/components/shared/button/button.dialog.create.component";
import { TextField } from "@mui/material";
type prop = {
    name?: string
}
export default function CreateUnitButton({ name = "" }: prop) {
    return (
        <ButtonDialogCreate
            title="เพิ่ม unit"
            onSubmit={createUnit}
        >
            <TextField
                defaultValue={name}
                name="name"
                label="ชื่อไทย"
            />
            <TextField
                name="name_en"
                label="ชื่ออังกฤษ"
            />
            <TextField
                name="symbol"
                label="สัญลักษณ์"
            />
        </ButtonDialogCreate>
    )

};
