import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { SUBJECTS } from '../lib/questions'

interface Stats {
  streak: number
  totalAnswered: number
  accuracy: number
  todayAnswered: number
  subjectStats: Record<string, { total: number; correct: number }>
  weakTopics: { key: string; pct: number }[]
}

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState<Stats | null>(null)
  const [sub, setSub] = useState<any>(null)

  useEffect(() => {
    fetch('/api/auth/me').then(r => {
      if (!r.ok) { router.push('/'); return }
      return r.json()
    }).then(d => {
      if (!d) return
      if (d.user.role === 'parent') { router.push('/parent'); return }
      setUser(d.user)
      fetch('/api/quiz/stats').then(r => r.json()).then(setStats)
      fetch('/api/stripe/status').then(r => r.json()).then(setSub).catch(() => {})
    })
  }, [])

  async function logout() {
    await fetch('/api/auth/me', { method: 'POST' })
    router.push('/')
  }

  const isPremium = sub?.plan !== 'free'
  const todayLimit = 5
  const remaining = Math.max(0, todayLimit - (stats?.todayAnswered ?? 0))

  if (!user) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-gray-400">Laddar...</div>
    </div>
  )

  return (
    <>
      <Head><title>Studera — Dashboard</title></Head>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-semibold text-gray-900">📚 Studera</h1>
            <p className="text-xs text-gray-500">Hej, {user.name}! 👋</p>
          </div>
          <div className="flex gap-2 items-center">
            {!isPremium && (
              <Link href="/upgrade" className="bg-amber-50 text-amber-700 text-xs font-medium px-3 py-1.5 rounded-lg border border-amber-200">
                ⭐ Uppgradera
              </Link>
            )}
            <button onClick={logout} className="text-gray-400 text-sm">Logga ut</button>
          </div>
        </div>

        <div className="max-w-2xl mx-auto p-4 space-y-5">
          {/* Success banner */}
          {router.query.success && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-green-800 text-sm">
              🎉 Välkommen som Premium-användare! Nu har du obegränsad träning.
            </div>
          )}

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            <div className="card text-center">
              <div className="text-2xl font-semibold text-purple-DEFAULT">🔥 {stats?.streak ?? 0}</div>
              <div className="text-xs text-gray-500 mt-1">Dagars streak</div>
            </div>
            <div className="card text-center">
              <div className="text-2xl font-semibold text-purple-DEFAULT">{stats?.accuracy ?? 0}%</div>
              <div className="text-xs text-gray-500 mt-1">Rätt svar</div>
            </div>
            <div className="card text-center">
              <div className="text-2xl font-semibold text-purple-DEFAULT">{stats?.totalAnswered ?? 0}</div>
              <div className="text-xs text-gray-500 mt-1">Totalt övat</div>
            </div>
          </div>

          {/* Freemium limit */}
          {!isPremium && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-amber-800">Dagens frågor</span>
                <span className="text-sm text-amber-700">{remaining} av {todayLimit} kvar</span>
              </div>
              <div className="h-2 bg-amber-200 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full transition-all" style={{ width: `${((todayLimit - remaining) / todayLimit) * 100}%` }} />
              </div>
              {remaining === 0 && (
                <p className="text-xs text-amber-700 mt-2">Du har nått din dagliga gräns. <Link href="/upgrade" className="font-semibold underline">Uppgradera för obegränsad träning →</Link></p>
              )}
            </div>
          )}

          {/* Weak topics */}
          {stats?.weakTopics && stats.weakTopics.length > 0 && (
            <div className="card">
              <h3 className="font-medium text-gray-900 mb-3">⚠️ Öva mer på dessa</h3>
              <div className="space-y-2">
                {stats.weakTopics.slice(0, 3).map(t => {
                  const [subKey, topic] = t.key.split(':')
                  return (
                    <Link key={t.key} href={`/quiz/${subKey}/${encodeURIComponent(topic)}`} className="flex items-center justify-between bg-red-50 rounded-xl px-4 py-3 hover:bg-red-100 transition-colors">
                      <span className="text-sm font-medium text-red-800">{topic}</span>
                      <span className="text-sm text-red-600">{t.pct}% rätt</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          {/* Subjects */}
          <div>
            <h2 className="font-semibold text-gray-900 mb-3">Välj ämne</h2>
            <div className="grid grid-cols-2 gap-3">
              {SUBJECTS.map(s => {
                const subStat = stats?.subjectStats[s.key]
                const pct = subStat && subStat.total > 0 ? Math.round((subStat.correct / subStat.total) * 100) : 0
                return (
                  <Link key={s.key} href={`/subject/${s.key}`} className="card hover:border-purple-DEFAULT transition-colors cursor-pointer">
                    <div className="text-3xl mb-3">{s.emoji}</div>
                    <h3 className="font-medium text-gray-900 text-sm">{s.label}</h3>
                    <p className="text-xs text-gray-500 mt-1">{s.topics.length} kapitel</p>
                    {subStat && subStat.total > 0 && (
                      <>
                        <div className="h-1.5 bg-gray-100 rounded-full mt-3 overflow-hidden">
                          <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: s.color }} />
                        </div>
                        <p className="text-xs mt-1" style={{ color: s.color }}>{pct}% rätt</p>
                      </>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
