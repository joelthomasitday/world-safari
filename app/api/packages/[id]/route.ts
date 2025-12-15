import { connectDB } from '@/lib/mongodb'
import Package from '@/models/Package'
import { NextResponse } from 'next/server'
import { isValidObjectId } from '@/lib/utils/slug'

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await connectDB()
    
    // Support both _id (legacy) and slug (SEO-friendly) lookups
    // If param is a valid ObjectId format, try to fetch by _id first
    // Otherwise, fetch by slug
    let pkg;
    if (isValidObjectId(id)) {
      // Try by ID first (backward compatibility)
      pkg = await Package.findById(id)
    }
    
    // If not found by ID or param is not an ObjectId, try by slug
    if (!pkg) {
      pkg = await Package.findOne({ slug: id })
    }
    
    if (!pkg) {
      return NextResponse.json({ error: 'Package not found' }, { status: 404 })
    }
    
    return NextResponse.json(pkg)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await req.json()
    await connectDB()
    const updated = await Package.findByIdAndUpdate(id, body, { new: true })
    return NextResponse.json(updated)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await connectDB()
    await Package.findByIdAndDelete(id)
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
