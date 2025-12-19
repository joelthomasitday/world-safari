import { connectDB } from '@/lib/mongodb'
import PageContent from '@/models/PageContent'
import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import mongoose from 'mongoose'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const pageKey = searchParams.get('pageKey') || searchParams.get('page')
    
    await connectDB()
    
    const query = pageKey ? { pageKey } : {}
    const content = await PageContent.find(query).lean()
    
    return NextResponse.json(content)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    const { pageKey, sectionKey, title, subtitle, bodyText, mediaUrl } = body
    
    if (!pageKey || !sectionKey) {
      return NextResponse.json({ error: 'Missing pageKey or sectionKey' }, { status: 400 })
    }

    await connectDB()
    
    // Use raw MongoDB collection to avoid Mongoose caching issues
    const collection = mongoose.connection.collection('pagecontents')
    
    const update = {
      $set: {
        pageKey,
        sectionKey,
        title: title || '',
        subtitle: subtitle || '',
        bodyText: bodyText || '',
        mediaUrl: mediaUrl || '',
        updatedAt: new Date()
      },
      $unset: { content: '' },
      $setOnInsert: { createdAt: new Date() }
    }

    const result = await collection.findOneAndUpdate(
      { pageKey, sectionKey },
      update,
      { upsert: true, returnDocument: 'after' }
    )
    
    // Revalidate paths to clear cache
    revalidatePath('/')
    if (pageKey) revalidatePath(`/${pageKey}`)
    
    return NextResponse.json(result)
  } catch (err: any) {
    console.error('[page-content POST] Error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
