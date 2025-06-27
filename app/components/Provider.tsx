import React from "react";
import { SessionProvider } from "next-auth/react";
// using this we can call session inside any frontend components.
import { ImageKitProvider } from "@imagekit/next";

const urlEndPoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider refetchInterval={5 * 60}>
            <ImageKitProvider urlEndpoint={urlEndPoint}>
                {children}
            </ImageKitProvider>
        </SessionProvider>
    )
}