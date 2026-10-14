import ButtonEdit from "@/components/shared/button/button.edit.component"
import { Unit } from "@/generated/prisma/client"
import { List, ListItemButton, ListItemText } from "@mui/material"

type prop = {
    units: Unit[]
}
export default function ListUnit({ units }: prop) {
    return (
        <List>
            {units.map((unit, key) => {
                return (
                    <ListItemButton key={key}>
                        <ListItemText>{unit.symbol}</ListItemText>
                        <ListItemText>{unit.name_en}</ListItemText>
                        <ListItemText>{unit.name}</ListItemText>
                        <ButtonEdit />
                    </ListItemButton>
                )
            })}
        </List>
    )

};
