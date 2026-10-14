import { Chip } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
type prop = {
    isActive: true | false
}

export default function ChipStatus({ isActive }: prop) {
    const title = isActive ? "เปิดใช้งาน" : "ปิดการใช้งาน"
    return (
        <Chip
            label={title}
            icon={isActive ? <CheckCircleIcon /> : <CancelIcon />}
            size="medium"
            variant={isActive ? "outlined" : "filled"}
            color={isActive ? "success" : "default"}
        />
    )
};
