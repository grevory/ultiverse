"use client"

import { AuthProvider } from "@/contexts/AuthProvider"

export function Providers ({ children }) {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
}
