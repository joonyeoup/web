import "./globals.css"
import type React from "react"
import { Outfit } from "next/font/google"

const outfit = Outfit({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={outfit.className}>
      <body className="min-h-screen bg-white">{children}</body>
    </html>
  )
}

