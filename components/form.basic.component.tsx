import { Button, DialogActions, FormControl, FormHelperText, Stack } from "@mui/material";
import { Children } from "./dialog.basic.component";
import { useActionState } from "react";
import { action_init_state, Action_State_interface } from "@/action";

export interface Form_basic_interface extends Children {
    action: (state: Action_State_interface, formdata: FormData) => Promise<Action_State_interface>,
    onToggle: () => void
}

export default function FormBasic({ children, action, onToggle }: Form_basic_interface) {

    const action2 = async (
        state: Action_State_interface,
        formData: FormData,
    ): Promise<Action_State_interface> => {
        const result = await action(state, formData);

        if (result.success) {
            onToggle?.()
        }

        return result;
    };

    const [state, formAction, padding] = useActionState(action2, action_init_state)

    return (
        <form action={formAction} className=" gap-1 flex flex-col">
            <Stack
                direction={"column"}
                sx={{
                    gap: 2,
                    p: 1
                }}
            >
                {children}
                {
                    !state.success &&
                    <FormControl error>
                        <FormHelperText>{String(state.error)}</FormHelperText>
                    </FormControl>
                }
            </Stack>

            <DialogActions>
                <Button
                    loading={padding}
                    type="submit"
                    variant="contained"
                >
                    บันทึก
                </Button>
                <Button
                    onClick={onToggle}
                >
                    ยกเลิก
                </Button>
            </DialogActions>
        </form>
    )

};
