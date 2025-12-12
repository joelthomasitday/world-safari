import { NextRequest, NextResponse } from 'next/server'
import { verifyTokenEdge } from '@/utils/jwt-edge'

const PROTECTED_ROUTES = ['/api/packages', '/api/inquiries']

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const method = request.method

  // Define protection rules
  const isPackages = path.startsWith('/api/packages')
  const isInquiries = path.startsWith('/api/inquiries')

  // Rule 1: Packages - GET is public, others (POST, PUT, DELETE) are protected
  if (isPackages && method === 'GET') {
    return NextResponse.next()
  }

  // Rule 2: Inquiries - POST is public, others (GET, PUT, DELETE) are protected
  if (isInquiries && method === 'POST') {
    return NextResponse.next()
  }

  // If it's not one of the public exceptions above, strictly check for token
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const token = authHeader.split(' ')[1]
  try {
    await verifyTokenEdge(token)
    return NextResponse.next()
  } catch (err) {
    return NextResponse.json({ error: 'Invalid Token' }, { status: 401 })
  }
}

export const config = {
  matcher: ['/api/packages/:path*', '/api/inquiries/:path*'],
}
