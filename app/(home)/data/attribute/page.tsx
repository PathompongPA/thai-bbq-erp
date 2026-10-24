import { countAttribute, getAllAttribute } from "@/action/attribute.action";
import LayoutSubPageData from "@/app/(home)/data/sub.page.data.layout";
import SearchBox from "@/components/shared/search/search.box.component";
import Attributes from "./list.attribute.component";
import CreateAttributeButton from "./create.attribute.component";
import { Prisma } from "@/generated/prisma/client";
type prop = {
    params: Promise<{
        search: string
    }>
}
export default async function AttributePage({ params }: prop) {
    const { search } = await params
    const listAttribute: Prisma.AttributeGetPayload<{
        include: {
            attributeValue: true,
            item_attribute: true,
            variantAttribute: true
        }
    }>[] = await getAllAttribute(search)
    const total_attribute = await countAttribute()
    const amount_attribute = listAttribute.length
    const title = "คุณสมบัติ"
    const subtitle = `จำนวน ${total_attribute} รายการ `

    return (
        <LayoutSubPageData
            title={title}
            subtitle={subtitle}
            buttonCreate={
                <CreateAttributeButton />
            }
        >

            <SearchBox
                amountResult={amount_attribute}
                ButtonCreate={
                    <CreateAttributeButton />
                }
                Results={
                    <Attributes attributes={listAttribute} />
                }
            />

        </LayoutSubPageData >
    )

};
