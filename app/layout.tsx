import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Speed Go - Ride Booking App",
  description: "Book auto and bike rides in Moradabad",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Add gomaps.pro script */}
        <script
          src="https://maps.gomaps.pro/maps/api/js?key=AlzaSy2UWMtgWKm4VZHJ5LPlSHv4Jh-0475581V&libraries=places,geometry"
          async
          defer
        ></script>
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'