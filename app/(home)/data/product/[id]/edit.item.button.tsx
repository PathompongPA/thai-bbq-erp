"use client"

import { Autocomplete, Checkbox, FormControlLabel, FormGroup, Input, Slider, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography, } from "@mui/material";

import React, { useState } from "react";
import type { Item_type, Prisma, Warehouse_type, supplier } from "@/generated/prisma/client";
import { Attributes_type } from "@/action/attribute.action";
import ButtonDialogForm from "@/components/shared/button/button.dialog.create.component";
import { updateProduct } from "@/action/product.variant.action";
type ItemWithData = Prisma.ItemGetPayload<{
    include: {
        itemType: true,
        warehouseType: true,
        supplier: true,
        item_attributes: true

    }
}>

type prop = {
    item: ItemWithData | null,
    itemTypes: Item_type[]
    attribute: Attributes_type[]
    warehouse_type: Warehouse_type[]
    suppliers: supplier[]
    name?: string
}

export default function EditProductButton({ item, itemTypes, attribute, warehouse_type, suppliers, }: prop) {

    const [dayOfInventory, setDayOfInventory] = useState<number | null | undefined>(item?.day_of_inventory)
    const [itemtype, setItemType] = useState<Item_type | null | undefined>(item?.itemType)
    const [warehouseTypeId, setWarehouseTypeId] = useState<number | null | undefined>(item?.warehouse_typeId)
    const [supplierId, setSupplierId] = useState<number | null | undefined>(item?.supplierId)

    const onChangeDayOfInventory = (e: Event, newState: number) => { setDayOfInventory(newState) }
    const onChangeItemType = (e: React.MouseEvent<HTMLElement>, state: Item_type) => setItemType(state)
    const onChangeWarehouseType = (newState: number | null) => { setWarehouseTypeId(newState) }
    const onChangeSupplier = (newState: number | null) => { setSupplierId(newState) }

    const titleBtn = "แก้ไขข้อมูล"
    console.log(item?.item_attributes);
    return (
        <ButtonDialogForm
            variant="update"
            title={titleBtn}
            onSubmit={updateProduct}
        >
            <Input name="itemId" value={item?.id} hidden />
            <Typography>ประเภท</Typography>
            <Input name="itemTypeId" value={itemtype?.id} hidden />
            <ToggleButtonGroup
                value={itemtype}
                onChange={onChangeItemType}
                color="primary"
                size="small"
                exclusive
                fullWidth
            >
                {itemTypes.map((_item, key) =>
                    <ToggleButton
                        key={key}
                        value={_item}
                        color="primary"
                    >
                        {_item.name}
                    </ToggleButton>
                )}
            </ToggleButtonGroup>


            <Typography> ข้อมูล</Typography>
            <Stack
                spacing={{ xs: 1, sm: 1 }}
            // direction={{ xs: "row" }}
            >
                <TextField
                    required
                    label="ชื่อภาษาไทย"
                    name="name"
                    defaultValue={item?.name}
                    fullWidth
                />

                <TextField
                    label="ชื่ออังกฤษ"
                    name="name_en"
                    defaultValue={item?.name_en}
                    fullWidth
                />

                <TextField
                    label="ชื่อย่อ"
                    name="code"
                    defaultValue={item?.code}
                    fullWidth
                />


                <Input name="warehouseTypeId" value={warehouseTypeId || 0} hidden />
                <Autocomplete
                    fullWidth
                    defaultValue={item?.warehouseType}
                    onChange={(e, value) => { onChangeWarehouseType(Number(value?.id)) }}
                    options={warehouse_type}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="ประเภทการจัดเก็บ"
                            required
                        />
                    )}
                />

                <Input name="supplierId" value={supplierId || 0} hidden />
                <Autocomplete
                    fullWidth
                    defaultValue={item?.supplier}
                    onChange={(e, value) => { onChangeSupplier(Number(value?.id)) }}
                    options={suppliers}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="ซัพพลายเออร์"
                            required
                        />
                    )}
                />

            </Stack>

            <Typography> อายุในการเก็บ ({dayOfInventory} วัน)</Typography>
            <Slider
                aria-label="Temperature"
                onChange={onChangeDayOfInventory}
                value={dayOfInventory || 0}
                shiftStep={0}
                step={1}
                min={1}
                max={60}
                name="dayOfInventory"
            />

            <Typography>ข้อมูลที่ต้องการเก็บ</Typography>
            <FormGroup>
                {attribute.map((_attribute, key) => {
                    console.log(_attribute.id === item?.item_attributes[key]?.id, _attribute.id, item?.item_attributes[key]?.attributeId, key);
                    return (
                        <FormControlLabel
                            key={_attribute.id}
                            control={
                                <Checkbox
                                    id={`attribute-${_attribute.id}`}
                                    name={"attributeIds"}
                                    value={_attribute.id}
                                    defaultChecked={
                                        item?.item_attributes.some(
                                            (_itemAttribute) =>
                                                _itemAttribute.attributeId === _attribute.id
                                        ) ?? false
                                    }
                                />
                            }
                            label={_attribute.name}
                        />
                    )
                }
                )}
            </FormGroup>

        </ButtonDialogForm>
    )


};
