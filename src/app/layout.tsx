import "./globals.css";

import { BillingProvider } from "@/providers/billing-provider";
import { ClerkProvider } from '@clerk/nextjs'
import { DM_Sans } from "next/font/google";
import type { Metadata } from "next";
import ModalProvider from "@/providers/modal-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const font = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: 'Floww — Automate Your Work With Floww.',
    description: 'Automate Your Work With Floww.',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <ClerkProvider
            publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
        >
            <html lang="en">
                <body className={font.className}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <BillingProvider>
                            <ModalProvider>
                                {children}
                                <Toaster />
                            </ModalProvider>
                        </BillingProvider>
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider >
    );
}
