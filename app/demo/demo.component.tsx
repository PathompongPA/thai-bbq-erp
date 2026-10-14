"use client"

import { Button, Stack } from "@mui/material";
import { useState } from "react";

export default function DemoComponent() {
    const [state, setState] = useState(false)

    const onToggle = () => {
        setState((_state) => !_state)
    }

    return (
        <Stack>
            <Button
                variant="contained"
                onClick={onToggle}
            >
                open
            </Button>
            {`state :${state}`}
            {state && (
                "as;dkfja;slkjdf"
            )}
        </Stack>
    )

};
