import { Paper, Stack, Typography } from "@mui/material";
import ListData from "@/components/data/list.data.component";
import { countMasterdata } from "@/action/masterdata.action";

export default async function DataPage() {
    return (
        <Stack
            component={Paper}
            direction={"column"}
            sx={{
                height: "100%",
                gap: { xs: 2 }
            }}
        >
            <Stack
                direction={"row"}
                sx={{
                    justifyContent: "space-between",
                }}
            >
                <Typography
                    variant="h4"
                >
                    ระบบข้อมูลหลัก (Master data)
                </Typography>

            </Stack>

            <ListData count={await countMasterdata()} />

        </Stack >
    )
};
