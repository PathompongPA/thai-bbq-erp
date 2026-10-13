import { Item_Variant } from "@/generated/prisma/client"
import { List, ListItemButton, ListItemText } from "@mui/material"

type prop = {
    variants: Item_Variant[] | []
}
export default function ListVariantItems({ variants }: prop) {
    return variants.length > 0 && (
        <List>
            {!!variants?.map((_item, key) => {
                const title = _item.sku
                return (
                    <ListItemButton key={key}>
                        <ListItemText
                            primary={title}
                        />
                    </ListItemButton>
                )
            })}
        </List>
    )

};
