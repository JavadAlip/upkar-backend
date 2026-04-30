import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Admin from '../models/adminAuth/adminModel.js';
import { uploadImageToCloudinary } from '../config/cloudinaryUpload.js';

export const createAdminOnce = async () => {
  const exists = await Admin.findOne({ name: process.env.ADMIN_NAME });
  if (exists) return;

  const hashedPassword = await bcrypt.hash('admin123', 10);

  await Admin.create({
    name: process.env.ADMIN_NAME,
    email: process.env.ADMIN_EMAIL,
    password: hashedPassword,
  });

  console.log('Admin created successfully');
};

export const adminLogin = async (req, res) => {
  try {
    const { name, password } = req.body;

    if (!name || !password)
      return res.status(400).json({ message: 'Name and password required' });

    const admin = await Admin.findOne({ name });
    if (!admin)
      return res.status(401).json({ message: 'Invalid name or password' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(401).json({ message: 'Invalid name or password' });

    const token = jwt.sign(
      { adminId: admin._id, role: 'admin' },
      process.env.JWT_SECRET,
      // { expiresIn: '30d' },
      { expiresIn: '100d' },
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      admin: {
        name: admin.name,
        email: admin.email,
        photo: admin.photo,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.adminId).select('-password');
    if (!admin) return res.status(404).json({ message: 'Admin not found' });
    res.status(200).json(admin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateAdminProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const admin = await Admin.findById(req.admin.adminId);
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    if (req.file) {
      const result = await uploadImageToCloudinary(
        req.file.buffer,
        'admin-profile',
      );
      admin.photo = result.secure_url;
    }

    if (name) admin.name = name;
    if (email) admin.email = email;

    await admin.save();

    res.status(200).json({
      message: 'Profile updated successfully',
      admin: { name: admin.name, email: admin.email, photo: admin.photo },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    if (!currentPassword || !newPassword || !confirmPassword)
      return res.status(400).json({ message: 'All password fields required' });

    const admin = await Admin.findById(req.admin.adminId);
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch)
      return res.status(401).json({ message: 'Current password is incorrect' });

    if (newPassword !== confirmPassword)
      return res.status(400).json({ message: 'Passwords do not match' });

    admin.password = await bcrypt.hash(newPassword, 10);
    await admin.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
