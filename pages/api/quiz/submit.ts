import { NextApiRequest, NextApiResponse } from 'next'
import { requireAuth } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const user = requireAuth(req, res)
  if (!user) return

  const { subject, topic, questionId, correct, questionText, correctAnswer, hint, timeTaken } = req.body
  const db = supabaseAdmin()

  // Check subscription + daily limit
  const { data: sub } = await db
    .from('subscriptions')
    .select('plan, status, current_period_end')
    .eq('user_id', user.userId)
    .single()

  const isPremium = sub && sub.plan !== 'free' && sub.status === 'active'

  if (!isPremium) {
    const today = new Date().toISOString().split('T')[0]
    const { data: usage } = await db
      .from('daily_usage')
      .select('questions_answered')
      .eq('user_id', user.userId)
      .eq('date', today)
      .single()

    const count = usage?.questions_answered ?? 0
    if (count >= 5) {
      return res.status(403).json({ error: 'daily_limit', message: 'Du har nått din dagliga gräns på 5 frågor. Uppgradera för obegränsad träning!' })
    }

    // Upsert daily usage
    await db.from('daily_usage').upsert(
      { user_id: user.userId, date: today, questions_answered: count + 1 },
      { onConflict: 'user_id,date' }
    )
  }

  // Save result
  await db.from('quiz_results').insert({
    user_id: user.userId,
    subject,
    topic,
    question_id: questionId,
    correct,
    time_taken_seconds: timeTaken,
  })

  // Update streak
  const today2 = new Date().toISOString().split('T')[0]
  const { data: streak } = await db.from('streaks').select('*').eq('user_id', user.userId).single()
  if (streak) {
    const lastActive = streak.last_active_date
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
    let newStreak = streak.current_streak
    if (lastActive === yesterday) newStreak += 1
    else if (lastActive !== today2) newStreak = 1
    await db.from('streaks').update({
      current_streak: newStreak,
      longest_streak: Math.max(newStreak, streak.longest_streak),
      last_active_date: today2,
    }).eq('user_id', user.userId)
  }

  // Get AI explanation
  let explanation = ''
  try {
    const msg = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 150,
      messages: [{
        role: 'user',
        content: `Du är en vänlig lärare för en elev i åk 5 i Sverige. Ge en KORT förklaring (max 2 meningar) på svenska om varför svaret på denna fråga är "${correctAnswer}". Fråga: ${questionText}. Tips: ${hint}. Var enkel, tydlig och uppmuntrande. Bara förklaringen, inget annat.`
      }]
    })
    explanation = msg.content[0].type === 'text' ? msg.content[0].text : ''
  } catch {
    explanation = `Tips: ${hint}. Rätt svar är ${correctAnswer}.`
  }

  res.json({ ok: true, explanation })
}
