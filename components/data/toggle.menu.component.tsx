"use client"
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";
import type { MouseEvent } from "react";

const mockupToggleButton = [
    {
        title: "สินค้า",
        value: "product"
    },
    {
        title: "วัตถุดิบ",
        value: "material"
    },
    {
        title: "ของใช้",
        value: "wares"
    },
    {
        title: "",
        value: ""
    },
    {
        title: "",
        value: ""
    },
]

export default function ToggleMenu() {

    const [value, setValue] = useState(mockupToggleButton[0].value)
    const toggleValue = (
        e: MouseEvent<HTMLElement>, newValue: string) => {
        setValue(newValue)
    }
    return (
        <ToggleButtonGroup
            value={value}
            exclusive
            onChange={toggleValue}
        >
            {mockupToggleButton.map(
                (item, key) => (
                    <ToggleButton
                        key={key}
                        value={item.value}
                    >
                        {item.title}
                    </ToggleButton>
                )
            )}
        </ToggleButtonGroup>
    )
};
