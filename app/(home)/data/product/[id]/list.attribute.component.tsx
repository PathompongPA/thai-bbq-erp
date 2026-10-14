"use client"
import { Prisma } from "@/generated/prisma/client";
import { Button, Grid, List, Tooltip } from "@mui/material";
import Link from "next/link";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

type ItemAttributeWithInclude = Prisma.Item_attributeGetPayload<{
    include: {
        attribute: true
    }
}>

type prop = {
    attributes: ItemAttributeWithInclude[]
}

export default function AttributesItem({ attributes }: prop) {
    return (
        <List component={Grid} size={1} container spacing={1} sx={{ p: 0 }}>
            {attributes.map((_attribute, key) => {
                const url = `/data/attribute/${_attribute.attribute?.id}`
                return (
                    <Tooltip title={_attribute.attribute?.name} key={key}>
                        <Button
                            LinkComponent={Link}
                            href={url}
                            variant="outlined"
                            color="primary"
                            endIcon={<ArrowForwardIcon fontSize="small" />}
                        >
                            {_attribute.attribute?.name}
                        </Button>
                    </Tooltip>
                )
            })}
        </List>
    )

};

export function AttributeCard() {
}