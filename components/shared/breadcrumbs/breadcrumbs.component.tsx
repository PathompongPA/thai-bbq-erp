
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Breadcrumbs,
    Link as MuiLink,
    Typography,
} from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

function formatSegment(segment: string) {
    return decodeURIComponent(segment)
        .replace(/[-_]+/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function AutoBreadcrumbs() {
    const pathname = usePathname();

    const segments = pathname.split("/").filter(Boolean);

    return (
        <Breadcrumbs
            aria-label="breadcrumb"
        // separator={<NavigateNextIcon />}
        >
            <MuiLink
                variant="caption"
                component={Link}
                href="/"
                color="primary"
                underline="always"
            >
                Home
            </MuiLink>

            {segments.map((segment, index) => {
                const href = "/" + segments.slice(0, index + 1).join("/");
                const isLast = index === segments.length - 1;
                const label = formatSegment(segment);

                return isLast ? (
                    <Typography key={href} color="text.disable" variant="caption">
                        {label}
                    </Typography>
                ) : (
                    <MuiLink
                        key={href}
                        component={Link}
                        href={href}
                        color="primary"
                        underline="always"
                        variant="caption"
                    >
                        {label}
                    </MuiLink>
                );
            })}
        </Breadcrumbs>
    );
}
