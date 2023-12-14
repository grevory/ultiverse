"use client"

import { Providers } from "@/app/providers"
import "@/assets/styles/admin.scss"
import NavBar from "@/components/NavBar/NavBar.component"
import SideBar from "@/components/NavBar/SideBar.component"
import { DRAWER_WIDTH } from "@/constants/ui.constants"
import { Box } from "@mui/material"


export default function SigninLayout({ children }: { children: React.ReactNode}) {
    return (
        <Providers>
            <NavBar title="Ultiverse" />
            <SideBar />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: 'background.default',
                    ml: `${DRAWER_WIDTH}px`,
                    mt: ['48px', '56px', '64px'],
                    p: 3,
                }}
            >
                {children}
            </Box>
        </Providers>
    )
}
