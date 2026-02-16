'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { getCourse, getTotalLessons } from '@/lib/courses-data'
import { Navbar } from '@/components/navbar'

const DIFF_COLORS: Record<string, string> = {
  BEGINNER: 'bg-green-100 text-green-700',
  INTERMEDIATE: 'bg-yellow-100 text-yellow-700',
  ADVANCED: 'bg-red-100 text-red-700',
}
const DIFF_LABELS: Record<string, string> = {
  BEGINNER: 'Iniciante',
  INTERMEDIATE: 'Intermediário',
  ADVANCED: 'Avançado',
}

export default function CourseDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const course = getCourse(slug)

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Curso não encontrado.</p>
      </div>
    )
  }

  const totalLessons = getTotalLessons(course)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-5xl">{course.icon}</span>
            <div>
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${DIFF_COLORS[course.difficulty]}`}>
                {DIFF_LABELS[course.difficulty]}
              </span>
              <span className="ml-2 text-sm text-purple-300">{course.category}</span>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">{course.title}</h1>
          <p className="text-purple-200 max-w-2xl">{course.description}</p>
          <div className="flex items-center gap-6 mt-6 text-sm text-purple-300">
            <span>{course.modules.length} módulos</span>
            <span>{totalLessons} lições</span>
            <span>{course.students} alunos</span>
            {course.tokenGated && (
              <span className="flex items-center gap-1 text-yellow-300">
                🔒 Token-gated
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Curriculum */}
      <main className="mx-auto max-w-4xl px-6 py-12">
        <h2 className="text-2xl font-bold mb-6">Currículo</h2>

        <div className="space-y-6">
          {course.modules.map((mod, mi) => (
            <div key={mod.id} className="rounded-xl border bg-white overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b flex items-center justify-between">
                <h3 className="font-semibold">
                  <span className="text-purple-600 mr-2">Módulo {mi + 1}</span>
                  {mod.titlePt || mod.title}
                </h3>
                <span className="text-sm text-gray-500">{mod.lessons.length} lições</span>
              </div>
              <ul className="divide-y">
                {mod.lessons.map((lesson, li) => (
                  <li key={lesson.id}>
                    <Link
                      href={`/courses/${slug}/lessons/${lesson.id}`}
                      className="flex items-center gap-4 px-6 py-3.5 hover:bg-purple-50 transition"
                    >
                      <span className="flex items-center justify-center h-8 w-8 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
                        {lesson.type === 'QUIZ' ? '?' : li + 1}
                      </span>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{lesson.titlePt || lesson.title}</div>
                        <div className="text-xs text-gray-500">
                          {lesson.type === 'QUIZ' ? 'Quiz' : lesson.type === 'VIDEO' ? 'Vídeo' : 'Leitura'}
                        </div>
                      </div>
                      <span className="text-gray-400">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
