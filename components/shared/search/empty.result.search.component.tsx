import { Stack, Typography } from "@mui/material";
import ErrorIcon from '@mui/icons-material/Error';

export default function EmptyResult() {
    return (
        <Stack
            direction={"column"}
            sx={{ height: "100%", alignItems: "center", justifyContent: "center" }}
            spacing={2}
        >
            <ErrorIcon
                fontSize="large"
                color="disabled"
            />
            <Typography
                variant="h4"
                color="textDisabled"
            >
                ยังไม่มีรายการ
            </Typography>
            <Typography
                variant="h6"
                color="textDisabled"
            >
                เพิ่มรายการแรกเพื่อเริ่มต้นใช้งาน
            </Typography>
        </Stack>
    )

};
