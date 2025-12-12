import Admin from '@/models/Admin'
import bcrypt from 'bcryptjs'
import { connectDB } from './mongodb'
import { generateToken } from '@/utils/jwt'

export async function login(email: string, password: string) {
  await connectDB()
  const admin = await Admin.findOne({ email })
  if (!admin) throw new Error('Invalid email or password')

  const isMatch = await bcrypt.compare(password, admin.password)
  if (!isMatch) throw new Error('Invalid email or password')

  const token = generateToken({ id: admin._id, email: admin.email })
  return token
}
