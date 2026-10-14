"use client"

import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { ITEM_VARIANTS } from "@/action/item.action";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Link from "next/link";

type prop = {
    item_variant: ITEM_VARIANTS[]
}

export default function ListProducts({ item_variant: items }: prop) {
    return (

        <TableContainer >

            <Table stickyHeader>

                <TableHead>
                    <TableRow>
                        <TableCell>สินค้า</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {items.map((_item, key) => {
                        return <TableRow key={key} hover>
                            <TableCell>
                                <Typography color="textDisabled" variant="overline">{_item.code ?? `[ ${_item.code} ]`} </Typography>
                                <Typography color="textPrimary" variant="h6">{_item.name ?? " - "} </Typography>
                                <Typography color="textSecondary" variant="subtitle1"> {_item.name_en ?? `${_item.name_en}`} </Typography>
                                <Typography color="textSecondary" variant="overline">
                                    {_item.day_of_inventory &&
                                        `อายุในการเก็บ ${_item.day_of_inventory} วัน `}
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <IconButton LinkComponent={Link} href={`/data/product/${_item.id}`}>
                                    <OpenInNewIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>;
                    }
                    )}
                </TableBody>

            </Table>
        </TableContainer>

    )

};

{/* <TablePagination
                page={1}
                rowsPerPage={5}
                onPageChange={() => { }}
                count={items.length}
                labelRowsPerPage="รายการต่อหน้า"

            /> */}