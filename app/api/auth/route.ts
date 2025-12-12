import { login } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()
    const token = await login(email, password)
    return NextResponse.json({ token })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 401 })
  }
}
