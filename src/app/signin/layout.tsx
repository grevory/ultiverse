"use client"

import { Providers } from "@/app/providers"
import "@/assets/styles/admin.scss"


export default function SigninLayout({ children }: { children: React.ReactNode}) {
    return (
        <Providers>
            <h1>Ultiverse</h1>
            {children}
        </Providers>
    )
}
