import { Box, Button, Stack, Typography } from "@mui/material";
import { getItem } from "@/action/item.action";
import { getVariant, } from "@/action/product.variant.action";
import Session from "@/components/shared/session/session.component";
import ChipToggleActive from "@/components/shared/button/chip/chip.toggle.active.button";
import { toggleActiveVariant } from "@/action/item.variant.action";
import HeaderSession from "@/components/shared/session/header.session.component";
import EditItemVariant from "./edit.variant.item.button";
import { getVariantAttribute } from "@/action/variant.attribuite.action";
import { getItemAttributes } from "@/action/item.attribute.action";
import SubSession from "@/components/shared/session/sub.session.component";

type prop = {
    params: Promise<{
        id: string
        variantId: string
    }>
}

export default async function ProductVariantPage({ params }: prop) {
    const { variantId, id } = await params

    const item = await getItem(Number(id))
    const variant = await getVariant(Number(variantId))
    const itemAttributes = await getItemAttributes(Number(id))
    const variantAttributes = await getVariantAttribute(Number(variantId))

    console.log("variant :  ", variant);
    const title = `${variant?.sku} `
    const subtitle = `${item?.name}`
    return (
        <Box>

            <HeaderSession
                title={title}
                subTitle={subtitle}
                button={
                    <ChipToggleActive
                        id={Number(variantId)}
                        name="variantId"
                        isActive={variant?.isActive}
                        onSubmit={toggleActiveVariant}
                    />
                }
            />


            <Session
                columns={{ xs: 1, md: 2 }}
                title="ข้อมูลทั่วไป"
                button={
                    <EditItemVariant
                        itemVariant={variant}
                        itemId={item?.id}
                        itemName={item?.name}
                        itemAttributes={itemAttributes}
                        variantAttribute={variantAttributes}
                    />
                }
            >

                <SubSession >
                    {variantAttributes.map((_attribute, key) => (
                        <Stack direction={"row"} spacing={1} key={key}>
                            <Typography variant="subtitle2" color="textSecondary" >{_attribute.attribute?.name} :  </Typography>
                            <Typography variant="subtitle2" color="textPrimary" > {_attribute.value} </Typography>
                        </Stack>
                    ))}
                </SubSession>

                <SubSession>
                    <Stack direction={"row"} spacing={1} >
                        <Typography variant="subtitle2" color="textSecondary" >ราคา :  </Typography>
                        <Typography variant="subtitle2" color="textPrimary" >{variant?.price}</Typography>
                    </Stack>
                    <Stack direction={"row"} spacing={1} >
                        <Typography variant="subtitle2" color="textSecondary" >สต๊อกขั้นต่ำ :  </Typography>
                        <Typography variant="subtitle2" color="textPrimary" >{variant?.minimum_stock}</Typography>
                    </Stack>
                </SubSession>

            </Session>

            <Session title="ข้อมูลเพิ่มเติม" >
                <Button>asdf</Button>
            </Session>


        </Box>
    )

};
