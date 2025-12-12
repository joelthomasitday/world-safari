import { connectDB } from '@/lib/mongodb'
import Package from '@/models/Package'
import { NextResponse } from 'next/server'

export async function GET() {
  await connectDB()
  const packages = await Package.find()
  return NextResponse.json(packages)
}

export async function POST(req: Request) {
  const body = await req.json()
  await connectDB()
  const newPkg = await Package.create(body)
  return NextResponse.json(newPkg)
}
