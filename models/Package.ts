import mongoose from 'mongoose'

const PackageSchema = new mongoose.Schema({
  title: String,
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

export default mongoose.models.Package || mongoose.model('Package', PackageSchema)
