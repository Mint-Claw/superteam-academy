'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

export function Navbar() {
  const pathname = usePathname()
  const { publicKey } = useWallet()

  const links = [
    { href: '/courses', label: 'Cursos' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/leaderboard', label: 'Ranking' },
  ]

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🎓</span>
          <span className="font-bold text-lg">Superteam Academy</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={pathname === l.href ? 'font-medium text-purple-600' : 'text-gray-500 hover:text-gray-900 transition'}
            >
              {l.label}
            </Link>
          ))}
          <WalletMultiButton className="!bg-purple-600 !rounded-lg !h-9 !text-sm" />
        </nav>
      </div>
    </header>
  )
}
