import { Stack } from "@mui/material";
import ListData from "@/components/data/list.data.component";
import { countMasterdata } from "@/action/masterdata.action";
import HeaderSession from "@/components/shared/session/header.session.component";

export default async function DataPage() {
    const title = "ระบบข้อมูลหลัก"
    const subtitle = "จัดการข้อมูลพื้นฐานที่ใช้ร่วมกันในระบบ"
    return (
        <Stack sx={{ height: "100%" }} spacing={2}>
            <HeaderSession
                title={title}
                subTitle={subtitle}
            />
            <ListData count={await countMasterdata()} />
        </Stack>
    )
};
