import { connectDB } from '@/lib/mongodb'
import PageContent from '@/models/PageContent'
import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await connectDB()
    const content = await PageContent.findById(id)
    if (!content) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(content)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await req.json()
    const { title, subtitle, bodyText, mediaUrl } = body
    
    await connectDB()
    
    const update: any = {
      title,
      subtitle,
      bodyText,
      mediaUrl
    }

    const updated = await PageContent.findByIdAndUpdate(
      id, 
      { 
        $set: update,
        $unset: { content: "" }
      }, 
      { new: true }
    )

    if (updated) {
      revalidatePath('/')
      if (updated.pageKey) revalidatePath(`/${updated.pageKey}`)
    }

    return NextResponse.json(updated)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await connectDB()
    await PageContent.findByIdAndDelete(id)
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
