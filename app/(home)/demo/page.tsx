import Demo from "@/app/(home)/demo/demo.component";
import TableComponent from "@/app/(home)/demo/table.component";
import { Box, Button, Stack } from "@mui/material";

export default async function MemoPage() {
    return (
        <Box
            sx={{
                width: "full",
                padding: {
                    xs: 2,
                    md: 4
                }
            }}
        >
            <Demo />
            <TableComponent />
            <Stack
                direction={"row"}
                sx={{
                    padding: 2,
                    gap: { xs: 2, md: 1 },
                    width: "100%",
                    flexWrap: "wrap"
                }}
            >
                <Button color="error" variant="contained" >ยกเลิกรายการ</Button>
                <Button color="inherit" variant="text" >ยกเลิก</Button>
                <Button color="info" variant="contained" >ดูรายละเอียด</Button>
                <Button color="secondary" variant="contained" >รายการ</Button>
                <Button color="primary" variant="contained" >บันทึก</Button>
                <Button color="success" variant="contained" >สร้างรายการ</Button>
                <Button color="warning" variant="contained" >ระงับชั่วคราว</Button>
            </Stack>

        </Box>
    )
};