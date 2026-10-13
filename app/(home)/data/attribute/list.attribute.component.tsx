import type { Attribute } from "@/generated/prisma/client"
import { ListItemButton, Stack } from "@mui/material"
type prop = {
    attributes: Attribute[]
}
export default function ListAttribute({ attributes }: prop) {
    return (
        <Stack>
            {attributes.map((_attribute, key) =>
                <ListItemButton key={key}>
                    {_attribute.name}
                </ListItemButton>
            )}
        </Stack>

    )
};
