"use client"

import { Button, IconButton, InputAdornment, Stack, TextField } from "@mui/material"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import SearchIcon from "@mui/icons-material/Search"
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import EmptyResult from "./empty.result.search.component";
import NotFoundResult from "./not.found.result.component";

type prop = {
    ButtonCreate: React.ReactNode
    Results: React.ReactNode
    amountResult: number
}

export default function SearchBox({ amountResult, ButtonCreate, Results }: prop) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const search = searchParams.get("search") ?? ""
    const [state, setState] = useState<string>(search)

    const isNotFound = amountResult <= 0

    const onChange = (_new: string) => { setState(_new) }

    const setSearch = (value: string) => {
        const params = new URLSearchParams(searchParams)
        if (value) {
            params.set("search", value)
        } else {
            params.delete("search")
        }
        router.replace(`${pathname}?${params.toString()}`)
    }

    const clearSearch = () => {
        setState("")
        const params = new URLSearchParams(searchParams)
        params.delete("search")
        router.replace(`${pathname}?${params.toString()}`)
    }

    return (
        <Stack
            sx={{ height: "100%" }}
            direction={"column"}
            spacing={2}
        >

            <Stack direction={"row"} spacing={2}>

                <TextField
                    fullWidth
                    size="small"
                    value={state}
                    onChange={(e) => onChange(e.target.value)}
                    onBlur={() => { setSearch(state) }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            setSearch(state);
                        }
                    }}
                    placeholder="ค้นหาด้วย รหัส / ชื่อ..."
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                state &&
                                <InputAdornment position="end">
                                    <IconButton onClick={clearSearch}>
                                        <CloseIcon />
                                    </IconButton>
                                </InputAdornment>
                            )
                        },
                    }}
                />

                <Button
                    variant="contained"
                    sx={{ gap: .5 }}
                >
                    ค้นหา
                </Button>

            </Stack>

            {!isNotFound ? Results :
                search === "" ?
                    <EmptyResult /> :
                    <NotFoundResult
                        ButtonCreate={ButtonCreate}
                        Search={search}
                    />
            }

        </Stack>
    )

};
