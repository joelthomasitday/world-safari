import mongoose from 'mongoose'
import { generateSlug, makeSlugUnique } from '@/lib/utils/slug'

const PackageSchema = new mongoose.Schema({
  title: String,
  slug: { 
    type: String, 
    unique: true, 
    index: true,
    sparse: true // Allow null values during migration
  },
  duration: String,
  price: String,
  overview: String,
  itinerary: [String],
  inclusions: [String],
  exclusions: [String],
  visa: String,
  bestTime: String,
  images: [String],
  isActive: { type: Boolean, default: true },
}, { timestamps: true })

// Pre-save hook to auto-generate slug from title
PackageSchema.pre('save', async function() {
  // Only generate slug if:
  // 1. Document is new and has no slug, OR
  // 2. Title has been modified (and this isn't the first save)
  const needsSlug = !this.slug || (this.isModified('title') && !this.isNew);
  
  if (needsSlug && this.title) {
    const baseSlug = generateSlug(this.title);
    
    // Get all existing slugs except current document's slug
    const Package = mongoose.models.Package || mongoose.model('Package', PackageSchema);
    const existingDocs = await Package.find(
      { _id: { $ne: this._id }, slug: { $regex: `^${baseSlug}` } },
      { slug: 1 }
    ).lean();
    
    const existingSlugs = existingDocs.map((doc: any) => doc.slug).filter(Boolean);
    this.slug = makeSlugUnique(baseSlug, existingSlugs);
  }
});

export default mongoose.models.Package || mongoose.model('Package', PackageSchema)
