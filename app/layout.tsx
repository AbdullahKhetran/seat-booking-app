import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '@/app/providers'
import { ColorModeScript } from '@chakra-ui/react'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Seat Booking App',
  description: 'A simple seat booking app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
