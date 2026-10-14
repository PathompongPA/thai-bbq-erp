import { getAllAttribute } from "@/action/attribute.action";
import { countProduct, getItemTypes, getProducts } from "@/action/item.action";
import { master_data_category } from "@/action/masterdata.action";
import { getSuppliers } from "@/action/supplier.action";
import { getWarehouseTypes } from "@/action/warehouse.type.action";
import CreateItemButton from "@/components/data/button.create.variant.component";
import ListProducts from "@/components/data/list.item.variant.component";
import SearchBox from "@/components/shared/search/search.box.component";
import LayoutSubPageData from "../sub.page.data.layout";

type Props = {
    params: Promise<{ type: master_data_category }>
    searchParams: Promise<{
        search?: string
    }>
};

export default async function productPage({ searchParams }: Props) {
    const search = (await searchParams).search ?? ""

    // const type_product = await getItemType("product")
    const products = await getProducts(search)

    const totalProduct = await countProduct()
    const title = "สินค้า"
    const subtitle = `ทั้งหมด ${totalProduct} รายการ`

    const item_type = await getItemTypes()
    const attributes = await getAllAttribute()

    const warehouse_type = await getWarehouseTypes()
    const suppliers = await getSuppliers()

    console.log("item : ", attributes);

    return (
        <LayoutSubPageData
            title={title}
            subtitle={subtitle}
            buttonCreate={
                <CreateItemButton
                    titleBtn="สินค้า"
                    warehouse_type={warehouse_type}
                    itemTypes={item_type}
                    attribute={attributes}
                    suppliers={suppliers}
                />
            }

        >
            <SearchBox
                amountResult={products.length}
                ButtonCreate={
                    <CreateItemButton
                        titleBtn={`เพิ่ม ${search}`}
                        name={search}
                        suppliers={suppliers}
                        itemTypes={item_type}
                        attribute={attributes}
                        warehouse_type={warehouse_type}
                    />
                }
                Results={
                    <ListProducts
                        item_variant={products}
                    />
                }
            />


        </LayoutSubPageData>
    )

};
