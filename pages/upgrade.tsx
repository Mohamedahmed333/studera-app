import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Upgrade() {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)

  async function checkout(plan: 'monthly' | 'yearly') {
    setLoading(plan)
    try {
      const r = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan })
      })
      const data = await r.json()
      if (data.url) window.location.href = data.url
    } catch {
      setLoading(null)
    }
  }

  return (
    <>
      <Head><title>Studera — Uppgradera</title></Head>
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-md mx-auto pt-8">
          <button onClick={() => router.back()} className="text-gray-400 text-sm mb-6">← Tillbaka</button>

          <div className="text-center mb-8">
            <div className="text-4xl mb-3">⭐</div>
            <h1 className="text-2xl font-semibold text-gray-900">Studera Premium</h1>
            <p className="text-gray-500 mt-2">Obegränsad träning för bättre betyg</p>
          </div>

          {/* Features */}
          <div className="card mb-6">
            <ul className="space-y-3">
              {[
                '✅ Obegränsade frågor varje dag',
                '✅ Alla ämnen och kapitel upplåsta',
                '✅ AI-förklaring för varje svar',
                '✅ Föräldrarapport varje vecka',
                '✅ Träning inför Nationella provet',
                '✅ Detaljerad statistik och framsteg',
              ].map(f => (
                <li key={f} className="text-sm text-gray-700">{f}</li>
              ))}
            </ul>
          </div>

          {/* Plans */}
          <div className="space-y-3 mb-6">
            <div className="card border-2 border-purple-DEFAULT relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-DEFAULT text-white text-xs font-medium px-3 py-1 rounded-full">
                Populärast — Spara 41%
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold text-gray-900">Årsabonnemang</div>
                  <div className="text-xs text-gray-500 mt-0.5">699 kr/år · bara 58 kr/månad</div>
                </div>
                <button onClick={() => checkout('yearly')} disabled={loading === 'yearly'} className="btn-primary text-sm px-4 py-2">
                  {loading === 'yearly' ? '...' : 'Välj'}
                </button>
              </div>
            </div>

            <div className="card">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold text-gray-900">Månadsabonnemang</div>
                  <div className="text-xs text-gray-500 mt-0.5">99 kr/månad · avsluta när som helst</div>
                </div>
                <button onClick={() => checkout('monthly')} disabled={loading === 'monthly'} className="btn-secondary text-sm px-4 py-2">
                  {loading === 'monthly' ? '...' : 'Välj'}
                </button>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-400 text-center">
            Säker betalning via Stripe · Avsluta när som helst · Inga dolda avgifter
          </p>
        </div>
      </div>
    </>
  )
}
