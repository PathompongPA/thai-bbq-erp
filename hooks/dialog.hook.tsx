"use client"

import { useState } from "react"

export default function useDialog() {
    const [open, setOpen] = useState(false)
    const on =
    {
        toggle: () => setOpen(!open),
        close: () => setOpen(false),
        open: () => setOpen(true)
    }
    return { isOpen: open, on }
};
