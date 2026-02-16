'use client'

import Link from 'next/link'
import { useState } from 'react'

// Mock data — would come from API in production
const COURSES = [
  {
    id: '1', slug: 'intro-solana', title: 'Introdução ao Solana', titleEn: 'Introduction to Solana',
    description: 'Aprenda os fundamentos do blockchain Solana, wallets, tokens e o ecossistema.',
    difficulty: 'BEGINNER', category: 'Blockchain', modules: 8, lessons: 24, students: 156, icon: '☀️',
  },
  {
    id: '2', slug: 'anchor-contracts', title: 'Smart Contracts com Anchor', titleEn: 'Smart Contracts with Anchor',
    description: 'Desenvolva smart contracts profissionais usando o framework Anchor.',
    difficulty: 'INTERMEDIATE', category: 'Development', modules: 12, lessons: 36, students: 89, icon: '⚓',
  },
  {
    id: '3', slug: 'defi-practice', title: 'DeFi na Prática', titleEn: 'DeFi in Practice',
    description: 'Construa protocolos DeFi: AMMs, lending, staking e yield farming.',
    difficulty: 'ADVANCED', category: 'DeFi', modules: 10, lessons: 30, students: 45, icon: '💰',
  },
  {
    id: '4', slug: 'nft-marketplace', title: 'NFT Marketplace do Zero', titleEn: 'NFT Marketplace from Scratch',
    description: 'Crie um marketplace de NFTs completo com Metaplex e Solana.',
    difficulty: 'INTERMEDIATE', category: 'NFT', modules: 8, lessons: 20, students: 67, icon: '🎨',
  },
  {
    id: '5', slug: 'web3-frontend', title: 'Frontend Web3 com Next.js', titleEn: 'Web3 Frontend with Next.js',
    description: 'Construa interfaces modernas para dApps com Next.js, TypeScript e wallet adapters.',
    difficulty: 'BEGINNER', category: 'Frontend', modules: 6, lessons: 18, students: 203, icon: '🖥️',
  },
  {
    id: '6', slug: 'tokenomics', title: 'Tokenomics & Economia Cripto', titleEn: 'Tokenomics & Crypto Economics',
    description: 'Entenda design de tokens, governance, incentivos e economia de protocolos.',
    difficulty: 'INTERMEDIATE', category: 'Economics', modules: 5, lessons: 15, students: 112, icon: '📊',
  },
]

const DIFFICULTIES: Record<string, { label: string; color: string }> = {
  BEGINNER: { label: 'Iniciante', color: 'bg-green-100 text-green-700' },
  INTERMEDIATE: { label: 'Intermediário', color: 'bg-yellow-100 text-yellow-700' },
  ADVANCED: { label: 'Avançado', color: 'bg-red-100 text-red-700' },
}

export default function CoursesPage() {
  const [filter, setFilter] = useState<string>('all')
  const [search, setSearch] = useState('')

  const filtered = COURSES.filter(c => {
    if (filter !== 'all' && c.difficulty !== filter) return false
    if (search && !c.title.toLowerCase().includes(search.toLowerCase()) && !c.titleEn.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🎓</span>
            <span className="font-bold text-lg">Superteam Academy</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/courses" className="font-medium text-purple-600">Cursos</Link>
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">Dashboard</Link>
            <Link href="/leaderboard" className="text-muted-foreground hover:text-foreground">Ranking</Link>
            <button className="rounded-lg bg-purple-600 text-white px-4 py-2 text-sm font-medium hover:bg-purple-700 transition">
              Conectar Wallet
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">Cursos</h1>
        <p className="text-muted-foreground mb-8">Explore nosso catálogo de cursos sobre Solana e Web3.</p>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <input
            type="text"
            placeholder="Buscar cursos..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="rounded-lg border px-4 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <div className="flex gap-2">
            {[
              { key: 'all', label: 'Todos' },
              { key: 'BEGINNER', label: 'Iniciante' },
              { key: 'INTERMEDIATE', label: 'Intermediário' },
              { key: 'ADVANCED', label: 'Avançado' },
            ].map(f => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                  filter === f.key ? 'bg-purple-600 text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(course => (
            <Link
              key={course.id}
              href={`/courses/${course.slug}`}
              className="group rounded-2xl border bg-card p-6 hover:shadow-lg hover:border-purple-200 transition"
            >
              <div className="text-4xl mb-4">{course.icon}</div>
              <h3 className="font-semibold text-lg group-hover:text-purple-600 transition">{course.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{course.description}</p>
              <div className="flex items-center gap-3 mt-4">
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${DIFFICULTIES[course.difficulty].color}`}>
                  {DIFFICULTIES[course.difficulty].label}
                </span>
                <span className="text-xs text-muted-foreground">{course.modules} módulos</span>
                <span className="text-xs text-muted-foreground">{course.students} alunos</span>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            Nenhum curso encontrado. Tente alterar os filtros.
          </div>
        )}
      </main>
    </div>
  )
}
