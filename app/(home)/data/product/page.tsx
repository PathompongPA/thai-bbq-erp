import { Attributes_type, getAttributes } from "@/action/attribute.action";
import { countProduct, getItems, getItemTypes, ITEM_VARIANTS } from "@/action/item.action";
import { master_data_category } from "@/action/masterdata.action";
import { getSuppliers } from "@/action/supplier.action";
import { getWarehouseTypes } from "@/action/warehouse.type.action";
import CreateItemButton from "@/components/data/button.create.variant.component";
import ListProducts from "@/components/data/list.item.variant.component";
import SearchBox from "@/components/shared/search/search.box.component";
import LayoutSubPageData from "../sub.page.data.layout";
import { getItemType } from "@/action/item.type.action";

type Props = {
    params: Promise<{ type: master_data_category }>
    searchParams: Promise<{
        search?: string
    }>
};

export default async function TypePage({ searchParams }: Props) {
    const search = (await searchParams).search ?? ""

    const type_product = await getItemType("product")
    const item_variants: ITEM_VARIANTS[] = await getItems(type_product?.id, search)

    const totalProduct = await countProduct()
    const title = "สินค้า"
    const subtitle = `ทั้งหมด ${totalProduct} รายการ`

    const item_type = await getItemTypes()
    const attribute: Attributes_type[] = await getAttributes()

    const warehouse_type = await getWarehouseTypes()
    const suppliers = await getSuppliers()

    return (
        <LayoutSubPageData
            title={title}
            subtitle={subtitle}
            buttonCreate={
                <CreateItemButton
                    warehouse_type={warehouse_type}
                    itemTypes={item_type}
                    attribute={attribute}
                    suppliers={suppliers}
                />
            }

        >
            <SearchBox
                amountResult={item_variants.length}
                ButtonCreate={
                    <CreateItemButton
                        titleBtn={`เพิ่ม ${search}`}
                        name={search}
                        suppliers={suppliers}
                        itemTypes={item_type}
                        attribute={attribute}
                        warehouse_type={warehouse_type}
                    />
                }
                Results={
                    <ListProducts
                        item_variant={item_variants}
                    />
                }
            />


        </LayoutSubPageData>
    )

};
