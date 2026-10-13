import type { Warehouse_type } from "@/generated/prisma/client";
import { List, ListItemButton, ListItemText } from "@mui/material";
import ButtonDeleteWarehouseType from "./button.delete.warehouse.type";
import ButtonEditWarehouseType from "./button.edit.warehouse.type";

type prop = {
    items: Warehouse_type[]
    search: string
}

export default function ListWarehouseType({ items }: prop) {

    // const title_button_create_warehouse_type = `เพิ่ม "${search}" ใหม่`

    return (
        <List>
            {items.map((item, key) => {
                return (
                    <ListItemButton
                        key={key}
                    >
                        <ListItemText
                            // primary={item.id}
                            // secondary={item.name}
                            primary={item.name}

                        />

                        <ButtonEditWarehouseType />
                        <ButtonDeleteWarehouseType id={item.id} name={item.name} />

                    </ListItemButton>
                )
            })}
        </List>
    )
};
