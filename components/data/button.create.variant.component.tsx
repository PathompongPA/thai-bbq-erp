"use client"
import { createProduct } from "@/action/item.action";
import { Autocomplete, Checkbox, FormControlLabel, FormGroup, Input, Slider, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography, } from "@mui/material";

import React, { useId, useState } from "react";
import type { Item_type, Warehouse_type, supplier } from "@/generated/prisma/client";
import { Attributes_type } from "@/action/attribute.action";
import ButtonDialogCreate from "../shared/button/button.dialog.create.component";

type prop = {
    itemTypes: Item_type[]
    attribute: Attributes_type[]
    warehouse_type: Warehouse_type[]
    suppliers: supplier[]
    name?: string
    titleBtn?: string
}

export default function CreateItemButton({ titleBtn = "เพิ่มรายการ", name = "", itemTypes, attribute, warehouse_type, suppliers }: prop) {

    const [dayOfInventory, setDayOfInventory] = useState<number>(30)
    const [itemtype, setItemType] = useState<Item_type>(itemTypes[0])
    const [warehouseTypeId, setWarehouseTypeId] = useState<number | undefined>(undefined)
    const [supplierId, setSupplierId] = useState<number | undefined>(undefined)

    const onChangeDayOfInventory = (e: Event, newState: number) => { setDayOfInventory(newState) }
    const onChangeItemType = (e: React.MouseEvent<HTMLElement>, state: Item_type) => setItemType(state)
    const onChangeWarehouseType = (newState: number | undefined) => { setWarehouseTypeId(newState) }
    const onChangeSupplier = (newState: number | undefined) => { setSupplierId(newState) }

    return (
        <ButtonDialogCreate
            title={titleBtn}
            onSubmit={createProduct}
        >
            <Typography>ประเภท</Typography>
            <Input name="itemTypeId" value={itemtype.id} hidden />
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
                direction={{ md: "row" }}
            >
                <TextField
                    label="ชื่อ"
                    name="name"
                    defaultValue={name}
                    fullWidth
                />

                <Input name="warehouseTypeId" value={warehouseTypeId || 0} hidden />
                <Autocomplete
                    fullWidth
                    onChange={(e, value) => { onChangeWarehouseType(value?.id) }}
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
                    onChange={(e, value) => { onChangeSupplier(value?.id) }}
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
                value={dayOfInventory}
                shiftStep={0}
                step={1}
                min={1}
                max={60}
                name="dayOfInventory"
            />

            <Typography>ข้อมูลที่ต้องการเก็บ</Typography>
            <FormGroup>
                {attribute.map((_item) => {
                    return (
                        <FormControlLabel
                            key={_item.id}
                            control={
                                <Checkbox
                                    id={`attribute-${_item.id}`}
                                    name={"attributeIds"}
                                    value={_item.id}
                                    defaultChecked
                                />
                            }
                            label={_item.name}
                        />
                    )
                }
                )}
            </FormGroup>

        </ButtonDialogCreate>
    )

};
