import { getProduct, getProductAttribute } from "@/action/item.action";
import LayoutSubPageData from "../../sub.page.data.layout";
import SearchBox from "@/components/shared/search/search.box.component";
import CreateItemVariantButton from "./create.variant.item.button";

type param = Promise<{
    id: number
    search: string
}>

type prop = {
    params: param
}

export default async function ProductIdPage({ params }: prop) {
    const { id, search } = await params
    const product = await getProduct(id, search)
    const productAttribute = await getProductAttribute(id)
    const amountVariant = Number(product?._count.variants)
    const title = `${product?.code} - ${product?.name} `
    const subtitle = `รุ่นย่อย ${product?._count.variants} รายการ`

    return (
        <LayoutSubPageData
            title={title}
            subtitle={subtitle}
            buttonCreate={
                <CreateItemVariantButton
                    attributes={productAttribute}
                    itemId={product?.id}
                    itemName={product?.name}
                />
            }
        >
            <SearchBox
                amountResult={amountVariant}
                ButtonCreate={
                    <CreateItemVariantButton
                        attributes={productAttribute}
                        itemId={product?.id}
                        itemName={product?.name}
                    />
                }
                Results={
                    <></>
                    // <ListVariantItems variants={product?.variants} />
                }

            >

            </SearchBox>

        </LayoutSubPageData>

    )

};
