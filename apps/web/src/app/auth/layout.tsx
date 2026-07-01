import { ReactNode } from 'react'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <section className="flex min-h-screen items-center max-w-xl mx-auto px-8 py-20">
      {children}
    </section>
  )
}
