import CreateSupplierButton from "./create.supplier.button.component";
import { getSuppliers } from "@/action/supplier.action";
import LayoutSubPageData from "../sub.page.data.layout";
import SearchBox from "@/components/shared/search/search.box.component";
import ListSupplier from "./list.supplier.component";

export default async function SupplierPage() {

    const suppliers = await getSuppliers()
    const amountResult = suppliers.length
    const title = "ซัพพลายเออร์"
    const subtitle = `ทั้งหมด ${amountResult} รายการ`


    return (
        <LayoutSubPageData
            title={title}
            subtitle={subtitle}
            buttonCreate={
                <CreateSupplierButton />
            }
        >
            <SearchBox
                amountResult={amountResult}
                ButtonCreate={
                    <CreateSupplierButton />
                }
                Results={
                    <ListSupplier
                        suppliers={suppliers}
                    />
                }
            />

        </LayoutSubPageData>
    )

};
