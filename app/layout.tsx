import type React from "react"
import "./globals.css"
import ZapierChat from '@/components/ZapierChat'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
      <ZapierChat />
    </html>
  )
}

// Force scrolling to top on route changes
export const metadata = {
  scrollRestoration: "manual",
    generator: 'v0.dev'
}



import './globals.css'