import { NextApiRequest, NextApiResponse } from 'next'
import { requireAuth } from '../../lib/auth'
import { supabaseAdmin } from '../../lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end()

  const user = requireAuth(req, res)
  if (!user) return

  const db = supabaseAdmin()
  const targetUserId = req.query.userId as string || user.userId

  // If parent requesting child stats, verify relationship
  if (targetUserId !== user.userId) {
    if (user.role !== 'parent') return res.status(403).json({ error: 'Åtkomst nekad' })
    const { data: child } = await db.from('users').select('parent_id').eq('id', targetUserId).single()
    if (!child || child.parent_id !== user.userId) return res.status(403).json({ error: 'Åtkomst nekad' })
  }

  // Streak
  const { data: streak } = await db.from('streaks').select('*').eq('user_id', targetUserId).single()

  // Total results
  const { data: results } = await db
    .from('quiz_results')
    .select('subject, topic, correct, created_at')
    .eq('user_id', targetUserId)
    .order('created_at', { ascending: false })

  // Today's count
  const today = new Date().toISOString().split('T')[0]
  const { data: todayUsage } = await db
    .from('daily_usage')
    .select('questions_answered')
    .eq('user_id', targetUserId)
    .eq('date', today)
    .single()

  // Per-subject stats
  const subjectStats: Record<string, { total: number; correct: number }> = {}
  const weekResults = results?.filter(r => {
    const d = new Date(r.created_at)
    const weekAgo = new Date(Date.now() - 7 * 86400000)
    return d >= weekAgo
  }) || []

  results?.forEach(r => {
    if (!subjectStats[r.subject]) subjectStats[r.subject] = { total: 0, correct: 0 }
    subjectStats[r.subject].total++
    if (r.correct) subjectStats[r.subject].correct++
  })

  // Weak topics (under 60% correct)
  const topicStats: Record<string, { total: number; correct: number }> = {}
  results?.forEach(r => {
    const key = `${r.subject}:${r.topic}`
    if (!topicStats[key]) topicStats[key] = { total: 0, correct: 0 }
    topicStats[key].total++
    if (r.correct) topicStats[key].correct++
  })

  const weakTopics = Object.entries(topicStats)
    .filter(([, s]) => s.total >= 3 && (s.correct / s.total) < 0.6)
    .map(([key, s]) => ({ key, pct: Math.round((s.correct / s.total) * 100) }))

  // Daily activity for last 7 days
  const dailyActivity = []
  for (let i = 6; i >= 0; i--) {
    const date = new Date(Date.now() - i * 86400000).toISOString().split('T')[0]
    const dayResults = results?.filter(r => r.created_at.startsWith(date)) || []
    const correct = dayResults.filter(r => r.correct).length
    dailyActivity.push({ date, total: dayResults.length, correct })
  }

  const totalCorrect = results?.filter(r => r.correct).length ?? 0
  const totalAnswered = results?.length ?? 0

  res.json({
    streak: streak?.current_streak ?? 0,
    longestStreak: streak?.longest_streak ?? 0,
    totalAnswered,
    totalCorrect,
    accuracy: totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0,
    todayAnswered: todayUsage?.questions_answered ?? 0,
    subjectStats,
    weakTopics,
    weekResults: weekResults.length,
    dailyActivity,
  })
}
