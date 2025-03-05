import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Kantumruy_Pro } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const kantumruyPro = Kantumruy_Pro({ subsets: ["khmer"], fallback: ['san-serif'] })

export const metadata: Metadata = {
  title: "Invoice Generator",
  description: "Generate professional invoices easily",
  icons: "https://img.icons8.com/dusk/64/invoice.png"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={kantumruyPro.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

