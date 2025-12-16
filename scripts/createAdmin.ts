

import 'dotenv/config'
import { connectDB } from '../lib/mongodb'
import Admin from '../models/Admin'
import bcrypt from 'bcryptjs'

async function createAdmin() {
  try {
    console.log('Connecting to DB...');
    await connectDB()
    console.log('Connected. creating admin...');
    
    // Check if admin exists (old or new)
    const oldAdmin = await Admin.findOne({ email: 'admin@wsafari.com' });
    const newAdmin = await Admin.findOne({ email: 'admin@worldsafaritours' });

    const newPassword = '#@!WorldSafari2025';
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    if (newAdmin) {
        console.log('Admin with new email already exists. Updating password...');
        newAdmin.password = hashedPassword;
        await newAdmin.save();
        console.log('Admin password updated.');
    } else if (oldAdmin) {
        console.log('Found old admin email. Updating to new credentials...');
        oldAdmin.email = 'admin@worldsafaritours';
        oldAdmin.password = hashedPassword;
        await oldAdmin.save();
        console.log('Admin updated to new email and password.');
    } else {
        console.log('Creating new admin...');
        await Admin.create({ email: 'admin@worldsafaritours', password: hashedPassword });
        console.log('Admin created.');
    }
    
    process.exit(0)
  } catch (err) {
    console.error('Error creating admin:', err)
    process.exit(1)
  }
}

createAdmin()
