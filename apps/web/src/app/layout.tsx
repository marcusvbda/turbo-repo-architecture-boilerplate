import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Web App',
  description: 'Next.js app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
