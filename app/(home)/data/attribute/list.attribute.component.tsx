import type { Prisma } from "@/generated/prisma/client"
import { Grid, ListItemButton, Stack, Typography } from "@mui/material"
type prop = {
    attributes: Prisma.AttributeGetPayload<{
        include: {
            item_attribute: true,
            variantAttribute: true,
            attributeValue: true
        }
    }>[] | null
}
export default function Attributes({ attributes }: prop) {
    return (
        <Grid spacing={2} container columns={{ xs: 2, md: 5 }}>
            {attributes?.map((_attribute, key) =>
                <Grid key={key} size={1}>
                    <ListItemButton key={key} sx={{ borderRadius: 2, p: 2, bgcolor: "divider" }}>
                        <Stack spacing={1}>
                            <Typography variant="h6" color="textPrimary"> {_attribute.name ?? " - "} </Typography>
                            <Typography variant="caption" color="textSecondary"> {_attribute.code ?? " - "} </Typography>
                            <Typography color="textDisabled"> {_attribute.attributeValue.length} รายการ </Typography>
                        </Stack>
                    </ListItemButton>
                </Grid>
            )}
        </Grid>

    )
};
