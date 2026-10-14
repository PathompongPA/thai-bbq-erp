"use client"

import { updateItemVariant } from "@/action/item.variant.action";
import ButtonDialogForm from "@/components/shared/button/button.dialog.create.component";
import { Item_Variant, Prisma } from "@/generated/prisma/client";
import { Slider, TextField, Typography } from "@mui/material";
import { useState } from "react";
type ItemAttributeWithInclude = Prisma.Item_attributeGetPayload<{
    include: { attribute: true }
}>
type prop = {
    itemId: number | undefined,
    itemName: string | undefined | null
    itemAttributes: (ItemAttributeWithInclude | null)[]
    variantAttribute: Prisma.VariantAttributeGetPayload<{ include: { attribute: true } }>[]
    itemVariant: Item_Variant | null
}

export default function EditItemVariant({ itemVariant, itemId, itemName, itemAttributes, variantAttribute }: prop) {
    const [minimumStock, setMinimumStock] = useState<number>(20)

    const changeMinimumStock = (e: Event, newValue: number) => setMinimumStock(newValue)

    return (
        <ButtonDialogForm
            title="แก้ไขข้อมูล"
            variant="update"
            onSubmit={updateItemVariant}
        >
            <TextField value={itemId} name="itemId" hidden />
            <TextField value={itemVariant?.id} name="variantId" hidden />

            <TextField
                variant="filled"
                value={itemName}
                name="itemName"
                label="สินค้า"
                disabled
            />

            <TextField
                type="number"
                label="ราคา"
                name="price"
                defaultValue={itemVariant?.price}
            />

            <Typography>ข้อมูล</Typography>
            {itemAttributes.map((_itemAttribute, key) => {
                const value = variantAttribute.filter((_variantAttribute) =>
                    _variantAttribute.attribute?.id === _itemAttribute?.attribute?.id
                )[0]?.value
                return (
                    <TextField
                        key={key}
                        label={_itemAttribute?.attribute?.name}
                        name={`attribute_${_itemAttribute?.attribute?.id}`}
                        defaultValue={value}
                    />
                )
            })}

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
