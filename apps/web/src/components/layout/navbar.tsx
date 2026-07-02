import UserMenu from '@/components/layout/userMenu'
import Link from 'next/link'
import Logo from '../ui/logo'

export default function Navbar() {
  return (
    <header className="flex items-center justify-between px-12 py-8 w-full">
      <Link
        href="/"
        className="flex items-center gap-5 outline-none rounded-field focus-visible:ring-2 focus-visible:ring-accent/40"
      >
        <Logo textClassName="text-3xl" />
      </Link>
      <UserMenu />
    </header>
  )
}
