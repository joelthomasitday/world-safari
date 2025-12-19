import mongoose from 'mongoose'

const SettingsSchema = new mongoose.Schema({
  // Contact Information
  companyName: { type: String, default: 'World Safari Tours' },
  address: { type: String, default: '' },
  phone: { type: String, default: '' },
  email: { type: String, default: '' },
  website: { type: String, default: '' },
  whatsappNumber: { type: String, default: '' },
  
  // Business Hours
  businessHoursWeekday: { type: String, default: '9:00 AM - 6:00 PM' },
  businessHoursWeekend: { type: String, default: '10:00 AM - 2:00 PM' },
  
  // Contact Form Settings
  contactFormTitle: { type: String, default: 'Send Us a Message' },
  contactFormSubtitle: { type: String, default: 'Tell us about your dream trip, and we\'ll make it happen.' },
  
  // Social Media
  facebookUrl: { type: String, default: '' },
  instagramUrl: { type: String, default: '' },
  twitterUrl: { type: String, default: '' },
  youtubeUrl: { type: String, default: '' },
  
  // Map
  mapEmbedUrl: { type: String, default: '' },
}, { timestamps: true })

export default mongoose.models.Settings || mongoose.model('Settings', SettingsSchema)
