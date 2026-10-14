import { Grid } from "@mui/material";
import CardData from "./card.data.component";
import { master_data_count } from "@/action/masterdata.action";

export type card_data = {
    title: string
    subtitle: string
    path: string
}
type prop = {
    count: master_data_count
}

export default function ListData({ count }: prop) {

    const data: card_data[] = [
        {
            title: "สินค้า",
            subtitle: `${count.amount_product} รายการ`,
            path: "/data/product"
        },
        {
            title: "วัตถุดิบ",
            subtitle: `${count.amount_material} รายการ`,
            path: "/data/materials"
        },
        {
            title: "หน่วย",
            subtitle: `${count.amount_unit} รายการ`,
            path: "/data/unit"
        },
        {
            title: "คุณสมบัติ",
            subtitle: `${count.amount_attribute} รายการ`,
            path: "/data/attribute"
        },
        {
            title: "ประเภทการจัดเก็บ",
            subtitle: `${count.amount_warehouse_type} รายการ`,
            path: "/data/warehouse-type"
        },
        {
            title: "ซัพพลายเออร์",
            subtitle: `${count.amount_supplier} รายการ`,
            path: "/data/supplier"
        },

    ]

    return (
        <Grid
            container
            spacing={2}
            sx={{
                overflowX:
                {
                    xs: "auto"
                },
            }}
        >
            {data.map((item, key) =>
                <Grid
                    component={Grid}
                    key={key}
                    size={{
                        md: 3,
                        sm: 4,
                        xs: 6
                    }}
                >
                    <CardData item={item} />
                </Grid>
            )}
        </Grid>
    )
};
