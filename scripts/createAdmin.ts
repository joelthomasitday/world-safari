

import { connectDB } from '../lib/mongodb'
import Admin from '../models/Admin'
import bcrypt from 'bcryptjs'

async function createAdmin() {
  try {
    console.log('Connecting to DB...');
    await connectDB()
    console.log('Connected. creating admin...');
    
    // Check if admin exists
    const existing = await Admin.findOne({ email: 'admin@wsafari.com' });
    if (existing) {
        console.log('Admin already exists.');
        process.exit(0);
    }

    const hashedPassword = await bcrypt.hash('yourpassword', 10)
    const admin = await Admin.create({ email: 'admin@wsafari.com', password: hashedPassword })
    console.log('Admin created:', admin)
    process.exit(0)
  } catch (err) {
    console.error('Error creating admin:', err)
    process.exit(1)
  }
}

createAdmin()
