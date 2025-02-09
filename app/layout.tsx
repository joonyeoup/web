import "./globals.css"
import type React from "react"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white flex justify-center">
        <div className="w-full">{children}</div>
      </body>
    </html>
  )
}

