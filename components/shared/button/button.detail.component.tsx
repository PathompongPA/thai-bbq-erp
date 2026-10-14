import { Button } from "@mui/material";
import Link from "next/link";
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
type prop = {
    title?: string
    link?: string
}
export default function DetailButton({ title = "รายละเอียด", link = "" }: prop) {
    return (
        <Button
            href={link}
            LinkComponent={Link}
            variant="outlined"
            endIcon={<ArrowForwardOutlinedIcon />}
        >
            {title}
        </Button>
    )

};
