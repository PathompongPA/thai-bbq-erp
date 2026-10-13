import { countWarehouseType, getWarehouseTypes } from "@/action/warehouse.type.action";
import CreateWarehouseTypeButton from "@/components/data/warehouse/type/button.create.warehouse.type.component";
import SearchBox from "@/components/shared/search/search.box.component";
import ListWarehouseType from "./list.warehouse.type";
import LayoutSubPageData from "../sub.page.data.layout";

type Props = {
    searchParams: Promise<{
        search?: string
    }>
}

export default async function WarehouseTypePage({ searchParams }: Props) {
    const params = await searchParams
    const search = params.search ?? ""
    const total = await countWarehouseType()
    const warehouseTypes = await getWarehouseTypes(search)
    const title = "ประเภทการจัดเก็บ"
    const sub_title = `ทั้งหมด ${total} รายการ`

    return (
        <LayoutSubPageData
            title={title}
            subtitle={sub_title}
            buttonCreate={<CreateWarehouseTypeButton />}
        >

            <SearchBox
                amountResult={warehouseTypes.length}
                Results={
                    <ListWarehouseType
                        items={warehouseTypes}
                        search={search}
                    />
                }
                ButtonCreate={
                    <CreateWarehouseTypeButton
                        name={search}
                    />
                }
            />

        </LayoutSubPageData>
    )

};
