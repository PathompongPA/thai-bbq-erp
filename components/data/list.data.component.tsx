import { Grid } from "@mui/material";
import CardData from "./card.data.component";
import { master_data_count } from "@/action/masterdata.action";
import WidgetsIcon from '@mui/icons-material/Widgets';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import CategoryIcon from '@mui/icons-material/Category';
import ShelvesIcon from '@mui/icons-material/Shelves';
import HandshakeIcon from '@mui/icons-material/Handshake';

export type card_data = {
    title: string
    subtitle: string
    path: string
    icon?: React.ReactNode
}
type prop = {
    count: master_data_count
}

export default function ListData({ count }: prop) {

    const data: card_data[] = [
        {
            title: "สินค้า",
            subtitle: `${count.amount_product} รายการ`,
            path: "/data/product",
            icon: <WidgetsIcon />
        },
        {
            title: "วัตถุดิบ",
            subtitle: `${count.amount_material} รายการ`,
            path: "/data/materials",
            icon: <SoupKitchenIcon />
        },
        {
            title: "หน่วย",
            subtitle: `${count.amount_unit} รายการ`,
            path: "/data/unit",
            icon: <SquareFootIcon />
        },
        {
            title: "คุณสมบัติ",
            subtitle: `${count.amount_attribute} รายการ`,
            path: "/data/attribute",
            icon: <CategoryIcon />
        },
        {
            title: "ประเภทการจัดเก็บ",
            subtitle: `${count.amount_warehouse_type} รายการ`,
            path: "/data/warehouse-type",
            icon: <ShelvesIcon />
        },
        {
            title: "ซัพพลายเออร์",
            subtitle: `${count.amount_supplier} รายการ`,
            path: "/data/supplier",
            icon: <HandshakeIcon />
        },

    ]

    return (
        <Grid
            size={1}
            container
            spacing={2}
            sx={{
                overflowX: {
                    xs: "auto"
                },
            }}
            columns={{
                xs: 2,
                md: 5
            }}
        >
            {data.map((item, key) =>
                <Grid
                    component={Grid}
                    key={key}
                    size={1}
                >
                    <CardData item={item} />
                </Grid>
            )}
        </Grid>
    )
};
