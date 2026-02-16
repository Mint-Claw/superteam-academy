'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { getLesson, getCourse, getAllLessonsFlat } from '@/lib/courses-data'
import { Navbar } from '@/components/navbar'
import type { QuizQuestion } from '@/lib/courses-data'

function QuizComponent({ questions }: { questions: QuizQuestion[] }) {
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [submitted, setSubmitted] = useState(false)

  const score = questions.reduce((acc, q, i) => acc + (answers[i] === q.answer ? 1 : 0), 0)
  const pct = Math.round((score / questions.length) * 100)
  const passed = pct >= 70

  return (
    <div className="space-y-8">
      {questions.map((q, qi) => (
        <div key={qi} className="rounded-xl border p-6 bg-white">
          <p className="font-semibold mb-4">
            {qi + 1}. {q.question}
          </p>
          <div className="space-y-2">
            {q.options.map((opt, oi) => {
              const selected = answers[qi] === oi
              const isCorrect = submitted && oi === q.answer
              const isWrong = submitted && selected && oi !== q.answer

              return (
                <button
                  key={oi}
                  onClick={() => !submitted && setAnswers(prev => ({ ...prev, [qi]: oi }))}
                  disabled={submitted}
                  className={`w-full text-left rounded-lg border px-4 py-3 text-sm transition ${
                    isCorrect
                      ? 'border-green-500 bg-green-50 text-green-800'
                      : isWrong
                      ? 'border-red-500 bg-red-50 text-red-800'
                      : selected
                      ? 'border-purple-500 bg-purple-50 text-purple-800'
                      : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                  }`}
                >
                  <span className="font-medium mr-2">{String.fromCharCode(65 + oi)}.</span>
                  {opt}
                </button>
              )
            })}
          </div>
        </div>
      ))}

      {!submitted ? (
        <button
          onClick={() => setSubmitted(true)}
          disabled={Object.keys(answers).length < questions.length}
          className="w-full rounded-xl bg-purple-600 text-white py-3 font-semibold hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Enviar Respostas
        </button>
      ) : (
        <div className={`rounded-xl p-6 text-center ${passed ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border`}>
          <div className="text-4xl mb-2">{passed ? '🎉' : '📖'}</div>
          <p className="text-xl font-bold">
            {score}/{questions.length} ({pct}%)
          </p>
          <p className="text-sm text-gray-600 mt-1">
            {passed ? 'Parabéns! Você passou no quiz.' : 'Você precisa de pelo menos 70% para passar. Revise o conteúdo e tente novamente.'}
          </p>
          {passed && (
            <div className="mt-4 text-sm text-green-700">
              ✅ Progresso salvo on-chain (checkpoint)
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function MarkdownContent({ content }: { content: string }) {
  // Simple markdown renderer — in production use react-markdown
  const html = content
    .replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold mt-6 mb-2">$1</h3>')
    .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mt-8 mb-3">$1</h2>')
    .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mt-8 mb-4">$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/`{3}(\w*)\n([\s\S]*?)```/g, '<pre class="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto my-4 text-sm"><code>$2</code></pre>')
    .replace(/`([^`]+)`/g, '<code class="bg-gray-100 text-purple-700 px-1.5 py-0.5 rounded text-sm">$1</code>')
    .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-purple-300 pl-4 py-1 my-4 text-gray-700 bg-purple-50 rounded-r">$1</blockquote>')
    .replace(/^- (.*$)/gm, '<li class="ml-4 list-disc text-gray-700">$1</li>')
    .replace(/^\d+\. (.*$)/gm, '<li class="ml-4 list-decimal text-gray-700">$1</li>')
    .replace(/\n{2,}/g, '<br/><br/>')
    .replace(/\|(.+)\|/g, (match) => {
      const cells = match.split('|').filter(Boolean).map(c => c.trim())
      if (cells.every(c => /^[-]+$/.test(c))) return ''
      return `<tr>${cells.map(c => `<td class="border px-3 py-2 text-sm">${c}</td>`).join('')}</tr>`
    })

  return (
    <div
      className="prose prose-purple max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

export default function LessonPage() {
  const { slug, lessonId } = useParams<{ slug: string; lessonId: string }>()
  const data = getLesson(slug, lessonId)

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Lição não encontrada.</p>
      </div>
    )
  }

  const { course, lesson, module: mod } = data
  const allLessons = getAllLessonsFlat(course)
  const currentIdx = allLessons.findIndex(l => l.id === lessonId)
  const prevLesson = currentIdx > 0 ? allLessons[currentIdx - 1] : null
  const nextLesson = currentIdx < allLessons.length - 1 ? allLessons[currentIdx + 1] : null

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Breadcrumb */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-4xl px-6 py-3 text-sm text-gray-500 flex items-center gap-2">
          <Link href="/courses" className="hover:text-purple-600">Cursos</Link>
          <span>/</span>
          <Link href={`/courses/${slug}`} className="hover:text-purple-600">{course.title}</Link>
          <span>/</span>
          <span className="text-gray-900">{lesson.titlePt || lesson.title}</span>
        </div>
      </div>

      <main className="mx-auto max-w-4xl px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="text-sm text-purple-600 font-medium mb-1">{mod.titlePt || mod.title}</div>
          <h1 className="text-2xl font-bold">{lesson.titlePt || lesson.title}</h1>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
            <span>Lição {currentIdx + 1} de {allLessons.length}</span>
            <span className="flex items-center gap-1">
              {lesson.type === 'QUIZ' ? '📝 Quiz' : lesson.type === 'VIDEO' ? '🎬 Vídeo' : '📖 Leitura'}
            </span>
          </div>
        </div>

        {/* Content */}
        {lesson.type === 'QUIZ' && lesson.quiz ? (
          <QuizComponent questions={lesson.quiz} />
        ) : (
          <div className="rounded-xl border bg-white p-8">
            <MarkdownContent content={lesson.content} />
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10 pt-6 border-t">
          {prevLesson ? (
            <Link
              href={`/courses/${slug}/lessons/${prevLesson.id}`}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-purple-600 transition"
            >
              ← {prevLesson.titlePt || prevLesson.title}
            </Link>
          ) : (
            <div />
          )}
          {nextLesson ? (
            <Link
              href={`/courses/${slug}/lessons/${nextLesson.id}`}
              className="flex items-center gap-2 text-sm font-medium text-purple-600 hover:text-purple-700 transition"
            >
              {nextLesson.titlePt || nextLesson.title} →
            </Link>
          ) : (
            <Link
              href={`/courses/${slug}`}
              className="flex items-center gap-2 text-sm font-medium text-green-600 hover:text-green-700 transition"
            >
              ✅ Concluir Curso
            </Link>
          )}
        </div>
      </main>
    </div>
  )
}
