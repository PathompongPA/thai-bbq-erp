import { Box } from "@mui/material";

export type data_params = Promise<{
    type: string,
    item_id: number
    variant: string
}>

type props = {
    params: data_params
}

export default async function ItemIdPage({ params }: props) {
    const { item_id } = await params

    return (
        <Box>
            item id :
            {item_id}
        </Box>
    )

};
