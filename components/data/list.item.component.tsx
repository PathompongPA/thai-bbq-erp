"use client"
import { Box, Card, CardHeader, CardMedia, } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';

import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";
import type { MouseEvent } from "react";
import CreateItemButton from "./button.create.variant.component";
import { Item, Item_type } from "@/generated/prisma/client";
import { Attributes_type, getAttributes } from "@/action/attribute.action";

type props = {
    items: Item[]
    itemType: Item_type[]
}
export default function ListItems({ items, itemType }: props) {

    const [value, setValue] = useState(itemType[0].id)
    const toggleValue = (
        e: MouseEvent<HTMLElement>, newValue: string) => {
        setValue(newValue)
    }
    return (
        <Box className="">
            <ToggleButtonGroup
                value={value}
                exclusive
                onChange={toggleValue}
            >
                {itemType.map(
                    (item, key) => (
                        <ToggleButton
                            key={key}
                            value={item.id}
                        >
                            {item.name}
                        </ToggleButton>
                    )
                )}
                <CreateItemButton itemType={itemType} />
            </ToggleButtonGroup>

            <Box
                sx={{
                    maxHeight: "70vh",
                    overflowY: "auto"
                }}
            >
                {
                    items.map((item, key) => (
                        <Card key={key}>
                            <CardHeader
                                avatar={
                                    <InfoIcon />
                                }
                                title={item.name}
                                subheader={`รสชาติ ${item.flavor} ขนาด ${item.size}`}
                            />
                            <CardMedia />
                        </Card>
                    ))
                }

            </Box>

            <Box></Box>
        </Box>

    )

};
