'use client'

import { Navbar } from '@/components/navbar'

const LEADERBOARD = [
  { rank: 1, name: 'CryptoMaster.sol', wallet: '7xK...abc', points: 4250, courses: 5, certs: 4, badge: '🏆' },
  { rank: 2, name: 'SolDev_Ana', wallet: '3mN...def', points: 3800, courses: 4, certs: 3, badge: '🥈' },
  { rank: 3, name: 'Web3Builder', wallet: '9pQ...ghi', points: 3200, courses: 4, certs: 3, badge: '🥉' },
  { rank: 4, name: 'AnchorPro', wallet: '5kR...jkl', points: 2900, courses: 3, certs: 2, badge: '' },
  { rank: 5, name: 'DeFiExplorer', wallet: '2wS...mno', points: 2600, courses: 3, certs: 2, badge: '' },
  { rank: 6, name: 'TokenDesigner', wallet: '8vT...pqr', points: 2100, courses: 2, certs: 2, badge: '' },
  { rank: 7, name: 'NFTArtist', wallet: '4xU...stu', points: 1800, courses: 2, certs: 1, badge: '' },
  { rank: 8, name: 'ChainLearner', wallet: '6yV...vwx', points: 1500, courses: 2, certs: 1, badge: '' },
  { rank: 9, name: 'SolanaBR', wallet: '1zW...yza', points: 1250, courses: 1, certs: 1, badge: '' },
  { rank: 10, name: 'NewbieNode', wallet: '0aX...bcd', points: 800, courses: 1, certs: 0, badge: '' },
]

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">🏅 Ranking</h1>
        <p className="text-gray-500 mb-8">Os melhores alunos da Superteam Academy.</p>

        <div className="rounded-xl border bg-white overflow-hidden">
          <div className="grid grid-cols-[60px_1fr_100px_80px_80px] gap-4 px-6 py-3 bg-gray-50 border-b text-xs font-medium text-gray-500 uppercase">
            <span>#</span>
            <span>Aluno</span>
            <span className="text-right">Pontos</span>
            <span className="text-center">Cursos</span>
            <span className="text-center">Certs</span>
          </div>
          {LEADERBOARD.map(u => (
            <div
              key={u.rank}
              className={`grid grid-cols-[60px_1fr_100px_80px_80px] gap-4 px-6 py-4 items-center border-b last:border-0 ${
                u.rank <= 3 ? 'bg-purple-50/50' : ''
              }`}
            >
              <span className="text-lg font-bold text-gray-400">
                {u.badge || u.rank}
              </span>
              <div>
                <div className="font-medium">{u.name}</div>
                <div className="text-xs text-gray-400 font-mono">{u.wallet}</div>
              </div>
              <div className="text-right font-semibold text-purple-600">{u.points.toLocaleString()}</div>
              <div className="text-center text-sm">{u.courses}</div>
              <div className="text-center text-sm">{u.certs}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          Ganhe pontos completando lições e quizzes. Certificados NFT são emitidos ao concluir cursos.
        </div>
      </main>
    </div>
  )
}
