import { connectDB } from '@/lib/mongodb'
import Inquiry from '@/models/Inquiry'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    await connectDB()
    // Fetch all inquiries, sorted by most recent first
    const inquiries = await Inquiry.find({}).sort({ createdAt: -1 })
    return NextResponse.json(inquiries)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    await connectDB()
    const body = await req.json()
    const inquiry = await Inquiry.create(body)
    return NextResponse.json(inquiry, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
