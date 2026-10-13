"use client"

import { Button } from "@mui/material"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
type prop = {
    title?: string
}
export default function ClearSearchButton({ title = "ล้างการค้นหา" }: prop) {

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const clearSearch = () => {
        const params = new URLSearchParams(searchParams)
        params.delete("search")
        router.replace(`${pathname}?${params.toString()}`)
    }

    return (
        <Button
            onClick={clearSearch}
            variant="outlined"
        >
            {title}
        </Button>
    )
};
