import mongoose from 'mongoose'

const PageContentSchema = new mongoose.Schema({
  pageKey: { type: String, required: true, index: true }, // e.g., "home"
  sectionKey: { type: String, required: true },          // e.g., "hero", "intro", "content"
  title: String,
  subtitle: String,
  bodyText: String,
  mediaUrl: String,
}, { timestamps: true })

// Ensure uniqueness of section per page if needed, but the prompt says sectionKey allowed hero, intro, content
// So probably one entry per sectionKey for a given pageKey.
PageContentSchema.index({ pageKey: 1, sectionKey: 1 }, { unique: true })

export default mongoose.models.PageContent || mongoose.model('PageContent', PageContentSchema)
