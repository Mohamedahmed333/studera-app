import { useRouter } from 'next/router'
import Head from 'next/head'
import { useEffect, useState, useRef } from 'react'
import { getRandomQuestions, getSubject, Question } from '../../../lib/questions'

type Phase = 'loading' | 'question' | 'answered' | 'result'

export default function QuizPage() {
  const router = useRouter()
  const { subject, topic } = router.query as { subject: string; topic: string }
  const [questions, setQuestions] = useState<Question[]>([])
  const [idx, setIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [chosen, setChosen] = useState<number | null>(null)
  const [phase, setPhase] = useState<Phase>('loading')
  const [explanation, setExplanation] = useState('')
  const [loadingAI, setLoadingAI] = useState(false)
  const [error, setError] = useState('')
  const startTime = useRef(Date.now())

  const s = subject ? getSubject(subject) : null

  useEffect(() => {
    if (!subject || !topic) return
    const qs = getRandomQuestions(subject, topic, 5)
    setQuestions(qs)
    setPhase(qs.length > 0 ? 'question' : 'result')
    startTime.current = Date.now()
  }, [subject, topic])

  async function selectAnswer(optIdx: number) {
    if (phase !== 'question') return
    setChosen(optIdx)
    setPhase('answered')

    const q = questions[idx]
    const correct = optIdx === q.ans
    if (correct) setScore(s => s + 1)

    setLoadingAI(true)
    setExplanation('')

    try {
      const r = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject,
          topic,
          questionId: q.id,
          correct,
          questionText: q.q,
          correctAnswer: q.opts[q.ans],
          hint: q.hint,
          timeTaken: Math.round((Date.now() - startTime.current) / 1000),
        })
      })
      const data = await r.json()
      if (r.status === 403 && data.error === 'daily_limit') {
        setError(data.message)
        setExplanation(data.message)
      } else {
        setExplanation(data.explanation || `Tips: ${q.hint}`)
      }
    } catch {
      setExplanation(`Tips: ${q.hint}`)
    }
    setLoadingAI(false)
    startTime.current = Date.now()
  }

  function next() {
    if (idx + 1 >= questions.length) {
      setPhase('result')
    } else {
      setIdx(i => i + 1)
      setChosen(null)
      setPhase('question')
      setExplanation('')
    }
  }

  if (!s || phase === 'loading') return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-gray-400">Laddar frågor...</div>
    </div>
  )

  const q = questions[idx]
  const total = questions.length
  const pct = Math.round((score / total) * 100)
  const letters = ['A', 'B', 'C', 'D']

  // RESULT SCREEN
  if (phase === 'result') {
    return (
      <>
        <Head><title>Studera — Resultat</title></Head>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center">
            <div className="text-6xl mb-4">
              {pct >= 80 ? '🎉' : pct >= 60 ? '👍' : '💪'}
            </div>
            <div className="text-5xl font-semibold mb-2" style={{ color: s.color }}>{score}/{total}</div>
            <p className="text-gray-500 mb-2">{pct}% rätt i {topic}</p>
            <p className="text-gray-700 font-medium mb-8">
              {pct >= 80 ? 'Utmärkt jobbat!' : pct >= 60 ? 'Bra, fortsätt öva!' : 'Öva mer — du lär dig!'}
            </p>
            <div className="flex gap-3">
              <button onClick={() => router.push(`/subject/${subject}`)} className="btn-secondary flex-1">← Tillbaka</button>
              <button onClick={() => { setIdx(0); setScore(0); setChosen(null); setPhase('question'); setQuestions(getRandomQuestions(subject, topic, 5)) }} className="btn-primary flex-1">🔁 Igen</button>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Head><title>Studera — {topic}</title></Head>
      <div className="min-h-screen bg-gray-50">
        {/* Top bar */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
          <button onClick={() => router.push(`/subject/${subject}`)} className="text-gray-400 text-lg">✕</button>
          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all" style={{ width: `${(idx / total) * 100}%`, backgroundColor: s.color }} />
          </div>
          <div className="text-sm font-medium" style={{ color: s.color }}>{score} rätt</div>
        </div>

        <div className="max-w-lg mx-auto p-4 space-y-4">
          {/* Question counter */}
          <div className="text-xs text-gray-400 text-center">Fråga {idx + 1} av {total} · {topic}</div>

          {/* Question */}
          <div className="card">
            <div className="inline-block text-xs font-medium px-3 py-1 rounded-full mb-4" style={{ background: s.bg, color: s.color }}>
              {s.emoji} {s.label}
            </div>
            <p className="text-base font-medium text-gray-900 leading-relaxed">{q.q}</p>
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {q.opts.map((opt, i) => {
              let cls = 'card cursor-pointer flex items-center gap-3 transition-colors hover:border-purple-mid '
              if (phase === 'answered') {
                if (i === q.ans) cls += 'border-teal-DEFAULT bg-teal-light '
                else if (i === chosen) cls += 'border-coral-DEFAULT bg-coral-light '
                else cls += 'opacity-50 '
              }
              return (
                <div key={i} className={cls} onClick={() => phase === 'question' && selectAnswer(i)}>
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-semibold flex-shrink-0 transition-colors
                    ${phase === 'answered' && i === q.ans ? 'bg-teal-DEFAULT border-teal-DEFAULT text-white' : ''}
                    ${phase === 'answered' && i === chosen && i !== q.ans ? 'bg-coral-DEFAULT border-coral-DEFAULT text-white' : ''}
                    ${phase !== 'answered' ? 'border-gray-200 text-gray-600' : ''}
                  `}>
                    {letters[i]}
                  </div>
                  <span className="text-sm text-gray-800">{opt}</span>
                </div>
              )
            })}
          </div>

          {/* AI Explanation */}
          {phase === 'answered' && (
            <div className="card" style={{ background: '#EEEDFE', borderColor: '#AFA9EC' }}>
              <div className="flex items-center gap-2 mb-2">
                <span>🤖</span>
                <span className="text-sm font-medium" style={{ color: '#534AB7' }}>AI-förklaring</span>
              </div>
              {loadingAI ? (
                <div className="flex gap-1.5">
                  {[0,1,2].map(i => (
                    <div key={i} className="w-2 h-2 rounded-full bg-purple-mid animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-700 leading-relaxed">{explanation}</p>
              )}
            </div>
          )}

          {/* Next button */}
          {phase === 'answered' && (
            <button onClick={next} disabled={loadingAI} className="btn-primary w-full">
              {idx + 1 < total ? 'Nästa fråga →' : 'Se resultat →'}
            </button>
          )}
        </div>
      </div>
    </>
  )
}
