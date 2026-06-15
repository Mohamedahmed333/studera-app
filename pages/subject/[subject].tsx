import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getSubject } from '../../lib/questions'

export default function SubjectPage() {
  const router = useRouter()
  const { subject } = router.query as { subject: string }
  const s = subject ? getSubject(subject) : null
  const [isPremium, setIsPremium] = useState(false)

  useEffect(() => {
    fetch('/api/stripe/status').then(r => r.json()).then(d => setIsPremium(d?.plan !== 'free')).catch(() => {})
  }, [])

  if (!s) return <div className="p-8 text-gray-400">Laddar...</div>

  return (
    <>
      <Head><title>Studera — {s.label}</title></Head>
      <div className="min-h-screen bg-gray-50">
        <div className="px-4 py-4 flex items-center gap-3" style={{ background: s.color }}>
          <button onClick={() => router.push('/dashboard')} className="text-white opacity-80 hover:opacity-100">
            ← Tillbaka
          </button>
          <div>
            <h1 className="text-white font-semibold text-lg">{s.emoji} {s.label}</h1>
            <p className="text-white opacity-80 text-sm">Välj ett kapitel</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto p-4 space-y-3">
          {s.topics.map(topic => {
            const locked = !topic.free && !isPremium
            return (
              <div key={topic.name}>
                {locked ? (
                  <div className="card opacity-60 cursor-not-allowed flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{topic.emoji}</span>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{topic.name} 🔒</div>
                        <div className="text-xs text-gray-500">{topic.questions.length} frågor · Kräver Premium</div>
                      </div>
                    </div>
                    <Link href="/upgrade" className="text-xs text-amber-600 font-medium bg-amber-50 px-3 py-1.5 rounded-lg">Lås upp</Link>
                  </div>
                ) : (
                  <Link href={`/quiz/${subject}/${encodeURIComponent(topic.name)}`} className="card flex items-center justify-between hover:border-purple-DEFAULT transition-colors cursor-pointer block">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{topic.emoji}</span>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{topic.name}</div>
                        <div className="text-xs text-gray-500">{topic.questions.length} frågor</div>
                      </div>
                    </div>
                    <span className="text-gray-400">→</span>
                  </Link>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
