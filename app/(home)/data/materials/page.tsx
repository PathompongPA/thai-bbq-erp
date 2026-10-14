import SearchBox from "@/components/shared/search/search.box.component";
import LayoutSubPageData from "../sub.page.data.layout";
import { countMaterial, getMaterials } from "@/action/material.action";
import CreateItemButton from "@/components/data/button.create.variant.component";
import { getAttributes } from "@/action/attribute.action";
import { getWarehouseTypes } from "@/action/warehouse.type.action";
import { getSuppliers } from "@/action/supplier.action";
import { getItemTypes } from "@/action/item.action";
import ListMaterial from "./list.material.component";

type prop = {
    searchParams: Promise<{
        search: string
    }>
}

export default async function MaterialsPage({ searchParams }: prop) {
    const { search } = await searchParams

    const attributes = await getAttributes()
    const warehouse_type = await getWarehouseTypes()
    const suppliers = await getSuppliers()
    const item_types = await getItemTypes()

    const materials = await getMaterials(search)
    const totalMaterial = await countMaterial()
    const title = "วัตถุดิบ"
    const subtitle = `ทั้งหมด ${totalMaterial} รายการ `
    const amountMaterials = materials.length

    console.log("material page : ", materials);
    return (
        <LayoutSubPageData
            title={title}
            subtitle={subtitle}
            buttonCreate={
                <CreateItemButton
                    isProduct={false}
                    itemTypes={item_types}
                    attribute={attributes}
                    suppliers={suppliers}
                    warehouse_type={warehouse_type}
                />
            }
        >
            <SearchBox
                amountResult={amountMaterials}
                ButtonCreate={
                    <CreateItemButton
                        isProduct={false}
                        name={search}
                        itemTypes={item_types}
                        attribute={attributes}
                        suppliers={suppliers}
                        warehouse_type={warehouse_type}
                    />
                }
                Results={<ListMaterial materials={materials} />}
            ></SearchBox>

        </LayoutSubPageData>
    )

};
