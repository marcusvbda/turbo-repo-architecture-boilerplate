import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './style.css'
import { headers } from 'next/headers'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'Web App',
  description: 'Next.js app',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headerList = await headers()
  const user = JSON.parse(headerList.get(`x-${process.env.SESSION_KEY}`) ?? '{}')
  console.log(user)

  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
