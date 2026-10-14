import { createAttribute } from "@/action/attribute.action";
import ButtonDialogForm from "@/components/shared/button/button.dialog.create.component";
import { TextField } from "@mui/material";

export default function CreateAttributeButton() {
    return (
        <ButtonDialogForm
            onSubmit={createAttribute}
        >
            <TextField
                name="AttributeName"
                label="คุณสมบัติ"
            />

        </ButtonDialogForm>
    )

};
