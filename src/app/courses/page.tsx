'use client'

import Link from 'next/link'
import { useState } from 'react'
import { COURSES, getTotalLessons } from '@/lib/courses-data'
import { Navbar } from '@/components/navbar'

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
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">Cursos</h1>
        <p className="text-gray-500 mb-8">Explore nosso catálogo de cursos sobre Solana e Web3.</p>

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
                  filter === f.key ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
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
              className="group rounded-2xl border bg-white p-6 hover:shadow-lg hover:border-purple-200 transition"
            >
              <div className="text-4xl mb-4">{course.icon}</div>
              <h3 className="font-semibold text-lg group-hover:text-purple-600 transition">{course.title}</h3>
              <p className="text-sm text-gray-500 mt-2 line-clamp-2">{course.description}</p>
              <div className="flex items-center gap-3 mt-4 flex-wrap">
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${DIFFICULTIES[course.difficulty].color}`}>
                  {DIFFICULTIES[course.difficulty].label}
                </span>
                <span className="text-xs text-gray-500">{course.modules.length} módulos</span>
                <span className="text-xs text-gray-500">{getTotalLessons(course)} lições</span>
                <span className="text-xs text-gray-500">{course.students} alunos</span>
                {course.tokenGated && <span className="text-xs text-yellow-600">🔒 Token-gated</span>}
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            Nenhum curso encontrado. Tente alterar os filtros.
          </div>
        )}
      </main>
    </div>
  )
}
