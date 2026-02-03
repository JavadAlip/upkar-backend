import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import Admin from '../models/adminAuth/adminModel.js';
import dotenv from 'dotenv';

dotenv.config();

async function resetAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');

    // Delete all existing admins
    await Admin.deleteMany({});
    console.log('All existing admins deleted');

    // Create fresh admin
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await Admin.create({
      name: 'SuperAdmin',
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
    });

    console.log('✅ Fresh admin created successfully');
    console.log('Name: SuperAdmin');
    console.log('Password: admin123');

    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

resetAdmin();
