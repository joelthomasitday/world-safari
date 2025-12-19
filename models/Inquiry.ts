import mongoose from 'mongoose'

const InquirySchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  travelDates: {
    startDate: Date,
    endDate: Date,
  },
  numberOfPeople: Number,
  message: String,
  handled: { type: Boolean, default: false },
}, { timestamps: true })

export default mongoose.models.Inquiry || mongoose.model('Inquiry', InquirySchema)
