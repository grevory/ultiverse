import { Providers } from "@/app/providers"

export default function SigninLayout({ children }) {
    return (
        <Providers>
            <h1>Ultiverse</h1>
            {children}
        </Providers>
    )
}
