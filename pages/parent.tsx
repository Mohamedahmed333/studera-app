import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

interface Child {
  id: string
  name: string
  email: string
}

interface Stats {
  streak: number
  accuracy: number
  totalAnswered: number
  weekResults: number
  weakTopics: { key: string; pct: number }[]
  dailyActivity: { date: string; total: number; correct: number }[]
}

export default function ParentDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [children, setChildren] = useState<Child[]>([])
  const [selected, setSelected] = useState<string | null>(null)
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch('/api/auth/me').then(r => {
      if (!r.ok) { router.push('/'); return }
      return r.json()
    }).then(d => {
      if (!d) return
      if (d.user.role !== 'parent') { router.push('/dashboard'); return }
      setUser(d.user)
      fetch('/api/parent/children').then(r => r.json()).then(d => {
        setChildren(d.children || [])
        if (d.children?.length > 0) selectChild(d.children[0].id)
      })
    })
  }, [])

  async function selectChild(id: string) {
    setSelected(id)
    setLoading(true)
    const r = await fetch(`/api/quiz/stats?userId=${id}`)
    const data = await r.json()
    setStats(data)
    setLoading(false)
  }

  async function logout() {
    await fetch('/api/auth/me', { method: 'POST' })
    router.push('/')
  }

  const days = ['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön']
  const maxActivity = Math.max(...(stats?.dailyActivity?.map(d => d.total) || [1]), 1)

  if (!user) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="text-gray-400">Laddar...</div></div>

  return (
    <>
      <Head><title>Studera — Föräldrapanel</title></Head>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200 px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="font-semibold text-gray-900">📊 Föräldrapanel</h1>
            <p className="text-xs text-gray-500">Hej, {user.name}</p>
          </div>
          <button onClick={logout} className="text-gray-400 text-sm">Logga ut</button>
        </div>

        <div className="max-w-2xl mx-auto p-4 space-y-5">
          {children.length === 0 ? (
            <div className="card text-center py-8">
              <div className="text-4xl mb-3">👧</div>
              <h3 className="font-medium text-gray-900 mb-2">Inga barn kopplade</h3>
              <p className="text-sm text-gray-500">Be ditt barn skapa ett konto och ange din e-postadress</p>
            </div>
          ) : (
            <>
              {/* Child selector */}
              {children.length > 1 && (
                <div className="flex gap-2">
                  {children.map(c => (
                    <button key={c.id} onClick={() => selectChild(c.id)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${selected === c.id ? 'bg-purple-DEFAULT text-white' : 'bg-white border border-gray-200 text-gray-700'}`}>
                      {c.name}
                    </button>
                  ))}
                </div>
              )}

              {loading ? (
                <div className="text-center text-gray-400 py-8">Laddar statistik...</div>
              ) : stats ? (
                <>
                  {/* Overview */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="card text-center">
                      <div className="text-3xl font-semibold text-purple-DEFAULT">🔥 {stats.streak}</div>
                      <div className="text-xs text-gray-500 mt-1">Dagars streak</div>
                    </div>
                    <div className="card text-center">
                      <div className="text-3xl font-semibold text-purple-DEFAULT">{stats.accuracy}%</div>
                      <div className="text-xs text-gray-500 mt-1">Rätt svar totalt</div>
                    </div>
                    <div className="card text-center">
                      <div className="text-3xl font-semibold text-purple-DEFAULT">{stats.weekResults}</div>
                      <div className="text-xs text-gray-500 mt-1">Frågor denna vecka</div>
                    </div>
                    <div className="card text-center">
                      <div className="text-3xl font-semibold text-purple-DEFAULT">{stats.totalAnswered}</div>
                      <div className="text-xs text-gray-500 mt-1">Totalt övat</div>
                    </div>
                  </div>

                  {/* Daily activity chart */}
                  <div className="card">
                    <h3 className="font-medium text-gray-900 mb-4">Aktivitet senaste 7 dagarna</h3>
                    <div className="flex items-end gap-2 h-24">
                      {stats.dailyActivity.map((d, i) => {
                        const height = maxActivity > 0 ? (d.total / maxActivity) * 100 : 0
                        const date = new Date(d.date)
                        const dayLabel = days[date.getDay() === 0 ? 6 : date.getDay() - 1]
                        return (
                          <div key={i} className="flex-1 flex flex-col items-center gap-1">
                            <div className="w-full rounded-t-sm transition-all" style={{
                              height: `${Math.max(height, d.total > 0 ? 10 : 2)}%`,
                              background: d.total > 0 ? '#534AB7' : '#E5E7EB'
                            }} />
                            <span className="text-xs text-gray-400">{dayLabel}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Weak topics */}
                  {stats.weakTopics.length > 0 && (
                    <div className="card">
                      <h3 className="font-medium text-gray-900 mb-3">⚠️ Svaga områden</h3>
                      <p className="text-xs text-gray-500 mb-3">Kapitel med under 60% rätt svar — stöd ditt barn här</p>
                      <div className="space-y-2">
                        {stats.weakTopics.map(t => {
                          const [, topic] = t.key.split(':')
                          return (
                            <div key={t.key} className="flex items-center justify-between bg-red-50 rounded-xl px-4 py-3">
                              <span className="text-sm text-red-800">{topic}</span>
                              <span className="text-sm font-medium text-red-600">{t.pct}% rätt</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {stats.weakTopics.length === 0 && stats.totalAnswered > 5 && (
                    <div className="card bg-green-50 border-green-200 text-center py-6">
                      <div className="text-3xl mb-2">🌟</div>
                      <p className="text-green-800 font-medium">Inga svaga områden!</p>
                      <p className="text-green-600 text-sm mt-1">Ditt barn presterar bra i alla ämnen</p>
                    </div>
                  )}
                </>
              ) : null}
            </>
          )}
        </div>
      </div>
    </>
  )
}
