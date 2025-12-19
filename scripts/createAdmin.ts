

import 'dotenv/config'
import { connectDB } from '../lib/mongodb'
import Admin from '../models/Admin'
import bcrypt from 'bcryptjs'

async function createAdmin() {
  try {
    console.log('Connecting to DB...');
    await connectDB()
    console.log('Connected. creating admin...');
    
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@worldsafaritours';
    const adminPassword = process.env.ADMIN_PASSWORD || '#@!WorldSafari2025';
    
    if (!process.env.ADMIN_PASSWORD) {
        console.warn('Warning: Using default password as ADMIN_PASSWORD is not set in .env');
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const existingAdmin = await Admin.findOne({ email: adminEmail });

    if (existingAdmin) {
        console.log('Admin already exists. Updating password...');
        existingAdmin.password = hashedPassword;
        await existingAdmin.save();
        console.log('Admin password updated.');
    } else {
        console.log('Creating new admin...');
        await Admin.create({ email: adminEmail, password: hashedPassword });
        console.log('Admin created.');
    }
    
    process.exit(0)
  } catch (err) {
    console.error('Error creating admin:', err)
    process.exit(1)
  }
}

createAdmin()
