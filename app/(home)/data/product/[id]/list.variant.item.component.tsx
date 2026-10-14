'use client'

import { Prisma } from "@/generated/prisma/client"
import { Grid, ListItemButton, Stack, Typography, } from "@mui/material"
import Link from "next/link"
type itemIncludeItemtype = Prisma.ItemGetPayload<{
    include: {
        itemType: true
    }
}>
type prop = {
    itemVariants: Prisma.Item_VariantGetPayload<
        {
            include: {
                variantAttribute: {
                    include: {
                        attribute: true
                    }
                }
            }
        }>[] | null
    item: itemIncludeItemtype | null
    itemAttributes: Prisma.Item_attributeGetPayload<{
        include: {
            attribute: true
        }
    }>[] | null
}
export default function ListVariantItems({ item, itemVariants, itemAttributes }: prop) {
    return itemVariants && itemVariants?.length > 0 ? (
        <Grid container columns={{ xs: 1, md: 4 }} size={1} spacing={1} >
            {itemVariants?.map((_variant, key) => {
                const url = `/data/product/${item?.id}/variant/${_variant.id}`
                return (
                    <Grid key={key} size={1} sx={{}}>
                        <ListItemButton LinkComponent={Link} href={url} sx={{ borderRadius: 2, bgcolor: _variant.isActive ? "divider" : "action.selected", }}>
                            <Stack >
                                <Typography variant="caption" color={_variant?.isActive ? "success" : "textDisabled"}>{_variant?.isActive ? "เปิดใช้งาน" : "ปิดใช้งาน"}</Typography>
                                {itemAttributes?.map((_itemAttribute, key) => {
                                    const value = _variant.variantAttribute.filter((_variantAtt) => _variantAtt.attribute?.id === _itemAttribute?.attribute?.id)[0]?.value
                                    return (
                                        <Typography color={_variant.isActive ? "textPrimary" : "textDisabled"} key={key}>{_itemAttribute.attribute?.name} : {value ? value : " - "}</Typography>
                                    )
                                })}
                                <Typography variant="caption" color="textDisabled">{item?.name}</Typography>
                            </Stack>
                        </ListItemButton>
                    </Grid>
                )
            })}
        </Grid >
    ) : (
        <Typography color="textDisabled" sx={{ width: "100%", padding: 2 }} align="center" >ยังไม่มีรุ่นย่อย</Typography>
    )

};

