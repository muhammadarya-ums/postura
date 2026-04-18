import React from "react"
import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, Geist } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import "@/app/globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta'
});

export const metadata: Metadata = {
  title: 'PostuRa | Smart Posture Monitoring',
  description: 'IoT-based wearable device for early detection of spinal deviation.',
  icons: {
    // Kita arahkan ke satu file saja yang pasti ada
    icon: '/postura.png', 
    shortcut: '/postura.png',
    apple: '/postura.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0A1628',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={`${plusJakartaSans.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
