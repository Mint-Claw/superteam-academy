'use client'

import Link from 'next/link'
import { useWallet } from '@solana/wallet-adapter-react'
import { Navbar } from '@/components/navbar'

// Mock progress data — in production comes from DB/on-chain
const MY_COURSES = [
  { slug: 'intro-solana', title: 'Introdução ao Solana', progress: 75, icon: '☀️', nextLesson: 'l1-2-1', nextLessonTitle: 'Programa SPL Token' },
  { slug: 'web3-frontend', title: 'Frontend Web3 com Next.js', progress: 30, icon: '🖥️', nextLesson: 'l5-1-1', nextLessonTitle: 'Conectando Wallets' },
]

const CERTIFICATES = [
  { course: 'Tokenomics & Economia Cripto', date: '2026-01-15', mint: '7xK...abc', slug: 'tokenomics' },
]

const RECENT_ACTIVITY = [
  { action: 'Completou quiz', detail: 'Fundamentos do Solana — 100%', time: 'Há 2 horas', icon: '📝' },
  { action: 'Iniciou módulo', detail: 'Tokens & Programas', time: 'Há 3 horas', icon: '📚' },
  { action: 'Certificado emitido', detail: 'Tokenomics & Economia Cripto', time: 'Há 2 dias', icon: '🏆' },
]

export default function DashboardPage() {
  const { publicKey, connected } = useWallet()

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-12">
        {!connected ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔐</div>
            <h2 className="text-2xl font-bold mb-2">Conecte sua Wallet</h2>
            <p className="text-gray-500">Conecte sua wallet Solana para acessar seu dashboard.</p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-xl">👤</div>
              <div>
                <h1 className="text-xl font-bold">Meu Dashboard</h1>
                <p className="text-sm text-gray-500 font-mono">{publicKey?.toBase58().slice(0, 8)}...{publicKey?.toBase58().slice(-4)}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
              {[
                { label: 'Cursos Ativos', value: '2', icon: '📚' },
                { label: 'Lições Completas', value: '42', icon: '✅' },
                { label: 'Certificados', value: '1', icon: '🏆' },
                { label: 'Pontos', value: '1,250', icon: '⭐' },
              ].map((s, i) => (
                <div key={i} className="rounded-xl border bg-white p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">{s.label}</span>
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
                <div key={c.slug} className="rounded-xl border bg-white p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{c.icon}</span>
                    <Link href={`/courses/${c.slug}`} className="font-semibold hover:text-purple-600">{c.title}</Link>
                  </div>
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500">Progresso</span>
                      <span className="font-medium">{c.progress}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full rounded-full bg-purple-600 transition-all" style={{ width: `${c.progress}%` }} />
                    </div>
                  </div>
                  <Link
                    href={`/courses/${c.slug}/lessons/${c.nextLesson}`}
                    className="text-sm text-purple-600 hover:text-purple-700"
                  >
                    Continuar: {c.nextLessonTitle} →
                  </Link>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <h2 className="text-xl font-bold mb-4">Atividade Recente</h2>
            <div className="rounded-xl border bg-white divide-y mb-12">
              {RECENT_ACTIVITY.map((a, i) => (
                <div key={i} className="flex items-center gap-4 px-6 py-4">
                  <span className="text-xl">{a.icon}</span>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{a.action}</div>
                    <div className="text-xs text-gray-500">{a.detail}</div>
                  </div>
                  <span className="text-xs text-gray-400">{a.time}</span>
                </div>
              ))}
            </div>

            {/* Certificates */}
            <h2 className="text-xl font-bold mb-4">Certificados NFT</h2>
            <div className="space-y-3">
              {CERTIFICATES.map((cert, i) => (
                <div key={i} className="flex items-center justify-between rounded-xl border bg-white p-5">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🏆</span>
                    <div>
                      <div className="font-medium">{cert.course}</div>
                      <div className="text-sm text-gray-500">Emitido em {cert.date}</div>
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
          </>
        )}
      </main>
    </div>
  )
}
