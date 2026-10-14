import { Item } from "@/generated/prisma/client"
import { List, ListItemButton, ListItemText } from "@mui/material"

type prop = {
    materials?: Item[] | []
}

export default function ListMaterial({ materials = [] }: prop) {
    return (
        <List>
            {materials.map((material, key) => {
                return (
                    <ListItemButton
                        key={key}
                    >
                        <ListItemText>{material.name}</ListItemText>
                    </ListItemButton>
                )
            })}
        </List>
    )
};
