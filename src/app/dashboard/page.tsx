'use client'

import Link from 'next/link'

// Mock data
const MY_COURSES = [
  { slug: 'intro-solana', title: 'Introdução ao Solana', progress: 75, icon: '☀️', nextLesson: 'Criando sua primeira transação' },
  { slug: 'web3-frontend', title: 'Frontend Web3 com Next.js', progress: 30, icon: '🖥️', nextLesson: 'Conectando Wallet Adapter' },
]

const CERTIFICATES = [
  { course: 'Tokenomics & Economia Cripto', date: '2026-01-15', mint: '7xK...abc' },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🎓</span>
            <span className="font-bold text-lg">Superteam Academy</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/courses" className="text-muted-foreground hover:text-foreground">Cursos</Link>
            <Link href="/dashboard" className="font-medium text-purple-600">Dashboard</Link>
            <Link href="/leaderboard" className="text-muted-foreground hover:text-foreground">Ranking</Link>
            <div className="flex items-center gap-2 rounded-lg bg-purple-50 px-3 py-1.5">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-sm font-mono text-purple-700">7xK...abc</span>
            </div>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Cursos Ativos', value: '2', icon: '📚' },
            { label: 'Lições Completas', value: '42', icon: '✅' },
            { label: 'Certificados', value: '1', icon: '🏆' },
            { label: 'Pontos', value: '1,250', icon: '⭐' },
          ].map((s, i) => (
            <div key={i} className="rounded-xl border bg-card p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">{s.label}</span>
                <span className="text-xl">{s.icon}</span>
              </div>
              <div className="text-2xl font-bold">{s.value}</div>
            </div>
          ))}
        </div>

        {/* Active Courses */}
        <h2 className="text-xl font-bold mb-4">Meus Cursos</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {MY_COURSES.map(c => (
            <Link key={c.slug} href={`/courses/${c.slug}`} className="rounded-xl border bg-card p-6 hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{c.icon}</span>
                <h3 className="font-semibold">{c.title}</h3>
              </div>
              <div className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Progresso</span>
                  <span className="font-medium">{c.progress}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-purple-600 transition-all" style={{ width: `${c.progress}%` }} />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                Próxima lição: <span className="text-foreground">{c.nextLesson}</span>
              </p>
            </Link>
          ))}
        </div>

        {/* Certificates */}
        <h2 className="text-xl font-bold mb-4">Certificados</h2>
        <div className="space-y-3">
          {CERTIFICATES.map((cert, i) => (
            <div key={i} className="flex items-center justify-between rounded-xl border bg-card p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏆</span>
                <div>
                  <div className="font-medium">{cert.course}</div>
                  <div className="text-sm text-muted-foreground">Emitido em {cert.date}</div>
                </div>
              </div>
              <a
                href={`https://explorer.solana.com/address/${cert.mint}?cluster=devnet`}
                target="_blank"
                rel="noopener"
                className="text-sm text-purple-600 hover:underline"
              >
                Ver no Explorer →
              </a>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
