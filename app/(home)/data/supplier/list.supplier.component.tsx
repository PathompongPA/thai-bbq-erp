import { supplier } from "@/generated/prisma/client";
import { IconButton, List, ListItemButton, ListItemText, Tooltip } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
type prop = {
    suppliers: supplier[]
}

export default function ListSupplier({ suppliers }: prop) {
    return (
        <List>
            {suppliers.map((_supplier, key) =>
                <ListItemButton key={key} title={_supplier.name} >
                    <ListItemText
                        primary={_supplier.name}
                        secondary={"รายละเอียด"}
                    />

                    <Tooltip title="แก้ไขรายการ" >
                        <IconButton>
                            <EditDocumentIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="ลบรายการ">
                        <IconButton >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>

                </ListItemButton>
            )}
        </List>
    )

};
