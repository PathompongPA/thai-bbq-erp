import { createSupplier } from "@/action/supplier.action";
import ButtonDialogCreate from "@/components/shared/button/button.dialog.create.component";
import { TextField } from "@mui/material";

export default function CreateSupplierButton() {
    return (
        <ButtonDialogCreate
            title="เพิ่ม Supplier"
            onSubmit={createSupplier}
        >
            <TextField
                label="ชื่อ"
                name="name"
            />
        </ButtonDialogCreate>
    )
};
