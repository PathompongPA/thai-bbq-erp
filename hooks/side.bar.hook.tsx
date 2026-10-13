"use client"

import { useState } from "react"
export type Use_side_bar_type = {
    default_open?: boolean
}

export default function useSideBar({ default_open = true }: Use_side_bar_type) {
    const [open, setOpen] = useState(default_open)

    const on = {
        toggle: () => setOpen((state) => !state)
    }
    return {
        open,
        on
    }

};
