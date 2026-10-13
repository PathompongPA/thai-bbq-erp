"use client"

import { createItemVariant } from "@/action/item.variant.action";
import ButtonDialogCreate from "@/components/shared/button/button.dialog.create.component";
import { Attribute } from "@/generated/prisma/client";
import { Slider, TextField, Typography } from "@mui/material";
import { useState } from "react";

type prop = {
    itemId: number | undefined,
    itemName: string | undefined | null
    attributes: (Attribute | null)[]
}

export default function CreateItemVariantButton({ itemId, itemName, attributes }: prop) {
    const [minimumStock, setMinimumStock] = useState<number>(20)

    const changeMinimumStock = (e: Event, newValue: number) => setMinimumStock(newValue)

    return (
        <ButtonDialogCreate
            title="รุ่นย่อย"
            onSubmit={createItemVariant}
        >
            <TextField
                value={itemId}
                name="itemId"
                hidden
            />

            <TextField
                variant="filled"
                value={itemName}
                name="itemName"
                label="สินค้า"
                disabled
            />

            <Typography>ข้อมูล</Typography>
            {attributes.map((_item, key) =>
                <TextField
                    key={key}
                    label={_item?.name}
                    name={`attribute_${_item?.id}`}
                    defaultValue={_item?.name}
                />
            )}

            <TextField
                type="number"
                label="ราคา"
                name="price"
                defaultValue={129}
            />

            <Typography>สต๊อกขั้นต่ำ {minimumStock ?? 0} ชิ้น</Typography>
            <TextField
                hidden
                name="minimumStock"
            />
            <Slider
                value={minimumStock ?? 0}
                onChange={changeMinimumStock}
                step={1}
                max={100}
            />

        </ButtonDialogCreate>
    )
};
