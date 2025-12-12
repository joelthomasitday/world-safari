import { connectDB } from '@/lib/mongodb'
import Admin from '@/models/Admin'
import bcrypt from 'bcryptjs'

async function createAdmin() {
  await connectDB()
  const hashedPassword = await bcrypt.hash('yourpassword', 10)
  const admin = await Admin.create({ email: 'admin@wsafari.com', password: hashedPassword })
  console.log('Admin created:', admin)
  process.exit(0)
}

createAdmin()
