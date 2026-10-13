import { IconButton, Tooltip } from "@mui/material"
import EditDocumentIcon from '@mui/icons-material/EditDocument';

export default function ButtonEdit() {

    return (
        <Tooltip title="แก้ไขรายการ" >
            <IconButton>
                <EditDocumentIcon />
            </IconButton>
        </Tooltip >
    )
};
