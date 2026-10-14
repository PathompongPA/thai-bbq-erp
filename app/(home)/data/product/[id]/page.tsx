import { getProduct } from "@/action/item.action";
import { Box, Link, Stack, Typography } from "@mui/material";
import { getSupplier, getSuppliers } from "@/action/supplier.action";
import { getWarehouseType, getWarehouseTypes } from "@/action/warehouse.type.action";
import ListVariantItems from "./list.variant.item.component";
import { getItemVariants } from "@/action/item.variant.action";
import CreateItemVariantButton from "./create.variant.item.button";
import { getAllAttribute } from "@/action/attribute.action";
import Session from "@/components/shared/session/session.component";
import SubSession from "@/components/shared/session/sub.session.component";
import HeaderSession from "@/components/shared/session/header.session.component";
import EditProductButton from "./edit.item.button";
import { getItemTypes } from "@/action/item.type.action";
import AttributesItem from "./list.attribute.component";
import { getItemAttributes } from "@/action/item.attribute.action";

type param = Promise<{
    id: number
    search: string
}>

type prop = {
    params: param
}

export default async function ProductIdPage({ params }: prop) {
    const { id } = await params
    const product = await getProduct(Number(id))
    const supplier = await getSupplier(Number(product?.supplierId))
    const suppliers = await getSuppliers()
    const warehouse_types = await getWarehouseTypes()
    const warehouse_type = await getWarehouseType(Number(product?.warehouse_typeId))

    const name = product?.name

    const item_variant = await getItemVariants(Number(product?.id))
    const attribute = await getAllAttribute()
    const attributeItem = await getItemAttributes(Number(id))
    const item_types = await getItemTypes()
    const itemAttributes = await getItemAttributes(Number(product?.id))
    return (
        <Box>
            <HeaderSession
                title={name}
                subTitle={product?.name_en}
            />

            <Session
                columns={{ sm: 1, md: 3 }}
                title="ข้อมูลทั่วไป"
                button={
                    <EditProductButton
                        item={product}
                        itemTypes={item_types}
                        attribute={attribute}
                        warehouse_type={warehouse_types}
                        suppliers={suppliers}
                    />
                }
            >
                <SubSession>
                    <Stack direction={"row"} spacing={1}>
                        <Typography variant="subtitle2" color="textSecondary"> รหัสสินค้า :  </Typography>
                        <Typography variant="subtitle2" color="textPrimary"> {product?.code} </Typography>
                    </Stack>

                    <Stack direction="row" spacing={1}>
                        <Typography variant="subtitle2" color="textSecondary"> ชื่อภาษาไทย : </Typography>
                        <Typography variant="subtitle2" color="textPrimary"> {product?.name} </Typography>
                    </Stack>

                    <Stack direction="row" spacing={1}>
                        <Typography variant="subtitle2" color="textSecondary"> ชื่อภาษาอังกฤษ : </Typography>
                        <Typography variant="subtitle2" color="textPrimary"> {product?.name_en} </Typography>
                    </Stack>
                </SubSession>

                <SubSession>
                    <Stack direction="row" spacing={1}>
                        <Typography variant="subtitle2" color="textSecondary"> อายุในการเก็บ : </Typography>
                        <Typography variant="subtitle2" color="textPrimary"> {product?.day_of_inventory} วัน </Typography>
                    </Stack>

                    <Stack direction="row" spacing={1}>
                        <Typography variant="subtitle2" color="textSecondary"> ประเภทการจัดเก็บ : </Typography>
                        <Link href={`/data/warehouse-type/${warehouse_type?.id}`} variant="subtitle2" color="primary" >{warehouse_type?.name}</Link>
                    </Stack>
                </SubSession>

                <SubSession>
                    <Stack direction="row" spacing={1}>
                        <Typography variant="subtitle2" color="textSecondary"> แหล่งที่มา : </Typography>
                        <Link href={`/data/warehouse-type/${supplier?.id}`} variant="subtitle2" color="primary" >{supplier?.name}</Link>
                    </Stack>
                </SubSession>
            </Session>

            <Session title="ข้อมูลที่จัดเก็บ">
                <AttributesItem attributes={attributeItem} />

            </Session>

            <Session
                button={<CreateItemVariantButton
                    itemId={product?.id}
                    itemName={product?.name}
                    itemAttribute={itemAttributes}
                />

                }
                title="รูปแบบสินค้า"
            >
                <ListVariantItems
                    item={product}
                    itemVariants={item_variant}
                    itemAttributes={itemAttributes}
                />
            </Session>
        </Box>
    )

};
