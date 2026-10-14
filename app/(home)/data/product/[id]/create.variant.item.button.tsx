"use client"

import { createItemVariant } from "@/action/item.variant.action";
import ButtonDialogForm from "@/components/shared/button/button.dialog.create.component";
import { Prisma } from "@/generated/prisma/client";
import { Slider, TextField, Typography } from "@mui/material";
import { useState } from "react";

type prop = {
    itemId: number | undefined,
    itemName: string | undefined | null
    itemAttribute: Prisma.Item_attributeGetPayload<{ include: { attribute: true } }>[] | null
}

export default function CreateItemVariantButton({ itemId, itemName, itemAttribute }: prop) {
    const [minimumStock, setMinimumStock] = useState<number>(20)

    const changeMinimumStock = (e: Event, newValue: number) => setMinimumStock(newValue)

    return (
        <ButtonDialogForm
            title="รูปแบบสินค้า"
            onSubmit={createItemVariant}
        >
            <TextField value={itemId} name="itemId" hidden />

            <TextField
                variant="filled"
                value={itemName}
                name="itemName"
                label="สินค้า"
                disabled
            />

            <Typography>ข้อมูล</Typography>
            {itemAttribute?.map((_itemAttribute, key) =>
                <TextField
                    key={key}
                    label={_itemAttribute?.attribute?.name}
                    name={`attribute_${_itemAttribute?.attribute?.id}`}
                    required
                />
            )}

            <TextField
                type="number"
                label="ราคา"
                name="price"
                defaultValue={0}
            />

            <Typography>สต๊อกขั้นต่ำ {minimumStock ?? 0} ชิ้น</Typography>
            <TextField
                hidden
                value={minimumStock}
                name="minimumStock"
            />
            <Slider
                value={minimumStock ?? 0}
                onChange={changeMinimumStock}
                step={1}
                max={100}
            />

        </ButtonDialogForm>
    )
};
