import { connectDB } from '@/lib/mongodb'
import Settings from '@/models/Settings'
import { NextResponse } from 'next/server'
import mongoose from 'mongoose'

export async function GET() {
  try {
    await connectDB()
    
    // Get the single settings document (or create default if doesn't exist)
    let settings = await Settings.findOne()
    
    if (!settings) {
      settings = await Settings.create({})
    }
    
    return NextResponse.json(settings)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    await connectDB()
    
    // Use raw collection for reliable updates
    const collection = mongoose.connection.collection('settings')
    
    // Find the existing settings or create new
    const existing = await collection.findOne({})
    
    if (existing) {
      await collection.updateOne(
        { _id: existing._id },
        { $set: { ...body, updatedAt: new Date() } }
      )
    } else {
      await collection.insertOne({
        ...body,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    
    const updated = await collection.findOne({})
    return NextResponse.json(updated)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
