"use client"

import { Button, IconButton, InputAdornment, Stack, TextField } from "@mui/material"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import SearchIcon from "@mui/icons-material/Search"
import { useEffect, useState } from "react";
import EmptyResult from "./empty.result.search.component";
import NotFoundResult from "./not.found.result.component";
import ReplayIcon from '@mui/icons-material/Replay';

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

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setState(searchParams.get("search") ?? "");
    }, [searchParams]);
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
            spacing={3}
        >

            <Stack direction={"row"} spacing={2}>

                <TextField
                    fullWidth
                    size="small"
                    value={state}
                    name="search"
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
                                search &&
                                <InputAdornment position="end">
                                    <IconButton onClick={clearSearch}>
                                        <ReplayIcon />
                                    </IconButton>
                                </InputAdornment>
                            )
                        },
                    }}
                />

                <Button
                    variant="outlined"
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
