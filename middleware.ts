import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/utils/jwt'

const PROTECTED_ROUTES = ['/api/packages', '/api/inquiries']

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isProtected = PROTECTED_ROUTES.some((prefix) => path.startsWith(prefix))

  // Allow GET requests to pass through without token check for now (public read)
  // Only protect mutating methods (POST, PUT, DELETE, PATCH)
  if (!isProtected || request.method === 'GET') {
    return NextResponse.next()
  }

  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const token = authHeader.split(' ')[1]
  try {
    verifyToken(token)
    return NextResponse.next()
  } catch (err) {
    return NextResponse.json({ error: 'Invalid Token' }, { status: 401 })
  }
}

export const config = {
  matcher: ['/api/packages/:path*', '/api/inquiries/:path*'],
}
