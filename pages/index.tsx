import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function AuthPage() {
  const router = useRouter()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [role, setRole] = useState<'child' | 'parent'>('child')
  const [form, setForm] = useState({ email: '', password: '', name: '', parentEmail: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handle = (k: string) => (e: any) => setForm(f => ({ ...f, [k]: e.target.value }))

  async function submit(e: any) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register'
      const body = mode === 'login'
        ? { email: form.email, password: form.password }
        : { ...form, role }

      const r = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      const data = await r.json()
      if (!r.ok) { setError(data.error); setLoading(false); return }
      router.push(data.user.role === 'parent' ? '/parent' : '/dashboard')
    } catch {
      setError('Något gick fel, försök igen')
      setLoading(false)
    }
  }

  return (
    <>
      <Head><title>Studera — Logga in</title></Head>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="text-5xl mb-3">📚</div>
            <h1 className="text-2xl font-semibold text-gray-900">Studera</h1>
            <p className="text-gray-500 text-sm mt-1">Smart studiehjälp för åk 5</p>
          </div>

          <div className="card">
            <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
              <button onClick={() => setMode('login')} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'login' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}>Logga in</button>
              <button onClick={() => setMode('register')} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'register' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}>Skapa konto</button>
            </div>

            {mode === 'register' && (
              <div className="flex bg-gray-100 rounded-xl p-1 mb-5">
                <button onClick={() => setRole('child')} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${role === 'child' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}>🧒 Elev</button>
                <button onClick={() => setRole('parent')} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${role === 'parent' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}>👨‍👩‍👧 Förälder</button>
              </div>
            )}

            <form onSubmit={submit} className="space-y-4">
              {mode === 'register' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Namn</label>
                  <input className="input" placeholder={role === 'child' ? 'Elevens namn' : 'Ditt namn'} value={form.name} onChange={handle('name')} required />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">E-post</label>
                <input className="input" type="email" placeholder="din@email.se" value={form.email} onChange={handle('email')} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lösenord</label>
                <input className="input" type="password" placeholder="Minst 6 tecken" value={form.password} onChange={handle('password')} required />
              </div>
              {mode === 'register' && role === 'child' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Förälders e-post (valfritt)</label>
                  <input className="input" type="email" placeholder="forelder@email.se" value={form.parentEmail} onChange={handle('parentEmail')} />
                  <p className="text-xs text-gray-400 mt-1">Länka ditt konto till din förälders konto</p>
                </div>
              )}

              {error && <div className="bg-red-50 text-red-700 text-sm rounded-xl px-4 py-3">{error}</div>}

              <button type="submit" disabled={loading} className="btn-primary w-full">
                {loading ? 'Laddar...' : mode === 'login' ? 'Logga in' : 'Skapa konto'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
