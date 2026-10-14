import { Box } from "@mui/material";
import LayoutSubPageData from "../sub.page.data.layout";
import SearchBox from "@/components/shared/search/search.box.component";
import { countUnit, getUnits } from "@/action/unit.action";
import CreateUnitButton from "./create.unit.button.component";
import ListUnit from "./list.unit.component";

type prop = {
    searchParams: Promise<{
        search?: string
    }>

}
export default async function UnitPage({ searchParams }: prop) {
    const { search } = await searchParams
    const units = await getUnits(search)
    const amountResult = await countUnit()
    const title = "หน่วย"
    const subtitle = `ทั้งหมด ${amountResult} รายการ`
    console.log("unit : ", units);

    return (
        <Box>
            <LayoutSubPageData
                title={title}
                subtitle={subtitle}
                buttonCreate={<CreateUnitButton />}
            >
                <SearchBox
                    amountResult={units.length}
                    Results={<ListUnit units={units} />}
                    ButtonCreate={
                        <CreateUnitButton
                            name={search}
                        />
                    }
                >
                </SearchBox>
            </LayoutSubPageData>
        </Box>
    )

};
