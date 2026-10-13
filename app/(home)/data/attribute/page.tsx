import { Attributes_type, countAttribute, getAttributes } from "@/action/attribute.action";
import LayoutSubPageData from "@/app/(home)/data/sub.page.data.layout";
import SearchBox from "@/components/shared/search/search.box.component";
import ListAttribute from "./list.attribute.component";
import CreateAttributeButton from "./create.attribute.component";
type prop = {
    params: Promise<{
        search: string
    }>
}
export default async function AttributePage({ params }: prop) {
    const { search } = await params
    const listAttribute: Attributes_type[] = await getAttributes(search)
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
                    <ListAttribute attributes={listAttribute} />
                }
            />

        </LayoutSubPageData >
    )

};
