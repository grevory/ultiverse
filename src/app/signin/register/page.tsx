"use client"

import { useAuth } from "@/contexts/AuthProvider"

export default function RegisterPage () {
    const {user} = useAuth();
    console.log(111, user);

    return (
        <h2>Hello {user ? (user.displayName || user.email) : "World"}</h2>
    );
}