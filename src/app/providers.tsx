"use client"

import UserProvider from "@/contexts/userContext"
import ThemeRegistry from '@/contexts/ThemeRegistry/ThemeRegistry';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <UserProvider>
            <ThemeRegistry>
                {children}
            </ThemeRegistry>
        </UserProvider>
    );
}
