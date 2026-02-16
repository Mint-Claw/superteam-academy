import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-10 w-10 rounded-lg bg-white/20 flex items-center justify-center text-2xl">🎓</div>
            <span className="font-bold text-xl">Superteam Academy</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold max-w-3xl leading-tight">
            Aprenda Web3 no Solana.<br />
            <span className="text-purple-300">Ganhe certificados on-chain.</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-purple-200 max-w-2xl">
            A plataforma de aprendizado descentralizada da Superteam Brazil. 
            Cursos, quizzes, e certificados NFT — tudo na blockchain.
          </p>
          <div className="mt-10 flex gap-4">
            <Link href="/courses" className="inline-flex items-center rounded-xl bg-white text-purple-900 px-8 py-3.5 font-semibold hover:bg-purple-100 transition">
              Explorar Cursos
            </Link>
            <Link href="/dashboard" className="inline-flex items-center rounded-xl border-2 border-white/30 px-8 py-3.5 font-semibold hover:bg-white/10 transition">
              Meu Dashboard
            </Link>
          </div>
          
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg">
            <div>
              <div className="text-3xl font-bold">12+</div>
              <div className="text-purple-300 text-sm">Cursos</div>
            </div>
            <div>
              <div className="text-3xl font-bold">500+</div>
              <div className="text-purple-300 text-sm">Alunos</div>
            </div>
            <div>
              <div className="text-3xl font-bold">200+</div>
              <div className="text-purple-300 text-sm">Certificados</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Como Funciona</h2>
        <div className="grid sm:grid-cols-3 gap-8">
          {[
            { icon: '🔗', title: 'Conecte sua Wallet', desc: 'Use Phantom, Solflare ou qualquer wallet Solana para entrar.' },
            { icon: '📚', title: 'Aprenda no seu ritmo', desc: 'Cursos com vídeos, textos e quizzes interativos. Progresso salvo automaticamente.' },
            { icon: '🏆', title: 'Ganhe Certificados NFT', desc: 'Complete cursos e receba certificados como NFTs comprimidos na Solana.' },
          ].map((f, i) => (
            <div key={i} className="rounded-2xl border p-8 hover:shadow-lg transition">
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Course Preview */}
      <section className="bg-muted/50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Cursos em Destaque</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { title: 'Introdução ao Solana', level: 'Iniciante', modules: 8, icon: '☀️' },
              { title: 'Smart Contracts com Anchor', level: 'Intermediário', modules: 12, icon: '⚓' },
              { title: 'DeFi na Prática', level: 'Avançado', modules: 10, icon: '💰' },
            ].map((c, i) => (
              <div key={i} className="rounded-2xl bg-card border p-6 hover:shadow-lg transition cursor-pointer">
                <div className="text-3xl mb-3">{c.icon}</div>
                <h3 className="font-semibold text-lg">{c.title}</h3>
                <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                  <span className="inline-flex items-center rounded-full bg-purple-100 text-purple-700 px-2.5 py-0.5 text-xs font-medium">
                    {c.level}
                  </span>
                  <span>{c.modules} módulos</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="mx-auto max-w-6xl px-6 flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="text-lg">🎓</span>
            <span>Superteam Academy © 2026</span>
          </div>
          <div className="flex gap-6">
            <a href="https://superteam.fun" target="_blank" rel="noopener" className="hover:text-foreground transition">Superteam</a>
            <a href="https://solana.com" target="_blank" rel="noopener" className="hover:text-foreground transition">Solana</a>
            <a href="https://github.com" target="_blank" rel="noopener" className="hover:text-foreground transition">GitHub</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
