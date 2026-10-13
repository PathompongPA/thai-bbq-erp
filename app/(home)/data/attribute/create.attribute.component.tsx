import { createAttribute } from "@/action/attribute.action";
import ButtonDialogCreate from "@/components/shared/button/button.dialog.create.component";
import { TextField } from "@mui/material";

export default function CreateAttributeButton() {
    return (
        <ButtonDialogCreate
            onSubmit={createAttribute}
        >
            <TextField
                name="AttributeName"
                label="คุณสมบัติ"
            />

        </ButtonDialogCreate>
    )

};
