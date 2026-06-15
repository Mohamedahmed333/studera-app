import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { serialize, parse } from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'

const JWT_SECRET = process.env.JWT_SECRET!
const COOKIE_NAME = 'studera_token'

export interface TokenPayload {
  userId: string
  email: string
  role: 'parent' | 'child'
  name: string
}

export function hashPassword(password: string) {
  return bcrypt.hash(password, 12)
}

export function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash)
}

export function signToken(payload: TokenPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '30d' })
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload
  } catch {
    return null
  }
}

export function setAuthCookie(res: NextApiResponse, token: string) {
  res.setHeader('Set-Cookie', serialize(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
  }))
}

export function clearAuthCookie(res: NextApiResponse) {
  res.setHeader('Set-Cookie', serialize(COOKIE_NAME, '', { maxAge: -1, path: '/' }))
}

export function getTokenFromRequest(req: NextApiRequest): TokenPayload | null {
  const cookies = parse(req.headers.cookie || '')
  const token = cookies[COOKIE_NAME]
  if (!token) return null
  return verifyToken(token)
}

export function requireAuth(req: NextApiRequest, res: NextApiResponse): TokenPayload | null {
  const user = getTokenFromRequest(req)
  if (!user) {
    res.status(401).json({ error: 'Inte inloggad' })
    return null
  }
  return user
}
