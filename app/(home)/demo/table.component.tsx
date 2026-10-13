"use client"
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import FormDemo from "./form.demo.component";
import useDialog from "@/hooks/dialog.hook";

const rows = [
    { id: 1, name: 'Data Grid', description: 'the Community version' },
    { id: 2, name: 'Data Grid Pro', description: 'the Pro version' },
    { id: 3, name: 'Data Grid Premium', description: 'the Premium version' },
];

const columns = [
    { field: 'name', headerName: 'Product Name', width: 200, rowHeader: true },
    { field: 'description', headerName: 'Description', width: 300 },
];
export default function TableComponent() {
    const { isOpen, on } = useDialog()
    return (
        <Box>
            <Button
                variant="contained"
                onClick={on.toggle}
            >
                edit
            </Button>
            <DataGrid
                rows={rows}
                columns={columns}
                onRowClick={on.toggle}
            />
            <FormDemo
                open={isOpen}
                onToggle={on.toggle}
            />
        </Box>
    )
};
