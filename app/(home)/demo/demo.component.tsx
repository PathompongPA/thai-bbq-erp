"use client"
import { Box, TextField } from "@mui/material";
import ButtonDialogCreate from "../../../components/shared/button/button.dialog.create.component";
import DemoAction from "@/action/demo.action";

export default function Demo() {


    return (
        <Box>
            <ButtonDialogCreate
                onSubmit={DemoAction}
            >
                <TextField
                    label="demo"
                    name="demo"
                />

            </ButtonDialogCreate>
        </Box>
    )

};
