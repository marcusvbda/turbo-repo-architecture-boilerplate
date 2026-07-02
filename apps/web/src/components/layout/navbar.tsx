import UserMenu from '@/components/layout/userMenu'
import Link from 'next/link'

export default function Navbar() {
  return (
    <header className="flex items-center justify-between px-12 py-8 w-full">
      <Link
        href="/"
        className="flex items-center gap-5 outline-none rounded-field focus-visible:ring-2 focus-visible:ring-accent/40"
      >
        <span className="size-10 rounded-tag bg-accent" />
        <span className="text-base font-semibold tracking-[-0.02em] text-white">
          repo<span className="text-accent">.</span>
        </span>
      </Link>
      <UserMenu />
    </header>
  )
}
