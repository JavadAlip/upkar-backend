// import jwt from 'jsonwebtoken';

// export const adminLogin = (req, res) => {
//   const { username, password } = req.body;

//   const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
//   const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

//   if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
//     const token = jwt.sign(
//       { username: ADMIN_USERNAME },
//       process.env.JWT_SECRET,
//       { expiresIn: '3d' }
//     );

//     res.status(200).json({
//       message: 'Admin login successful',
//       token,
//     });
//   } else {
//     res.status(401).json({ message: 'Invalid username or password' });
//   }
// };

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Admin from '../models/adminAuth/adminModel.js';
import { sendEmail } from '../utils/sendEmail.js';
import { otpStore } from '../utils/otpStore.js';
import { uploadImageToCloudinary } from '../config/cloudinaryUpload.js';

/* =======================
   ADMIN LOGIN
======================= */
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email !== process.env.ADMIN_EMAIL) {
      return res.status(401).json({ message: 'Invalid admin email' });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(500).json({ message: 'Admin not configured' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { adminId: admin._id, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '30d' },
    );

    res.status(200).json({
      message: 'Admin login successful',
      token,
      admin: {
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        photo: admin.photo,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

/* =======================
   FORGOT PASSWORD
======================= */
// export const adminForgotPassword = async (req, res) => {
//   console.log('REQ.BODY:', req.body);
//   const { email } = req.body;

//   if (email !== process.env.ADMIN_EMAIL) {
//     return res.status(403).json({ message: 'Unauthorized email' });
//   }

//   const otp = Math.floor(100000 + Math.random() * 900000).toString();

//   otpStore.otp = otp;
//   otpStore.expiresAt = Date.now() + 5 * 60 * 1000;
//   otpStore.verified = false;

//   await sendEmail(
//     email,
//     'Upkar Admin Password Reset OTP',
//     `Your OTP is ${otp}. Valid for 5 minutes.`,
//   );

//   res.status(200).json({ message: 'OTP sent successfully' });
// };

export const adminForgotPassword = async (req, res) => {
  try {
    console.log('REQ.BODY:', req.body);
    const { email } = req.body;

    if (email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ message: 'Unauthorized email' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    otpStore.otp = otp;
    otpStore.expiresAt = Date.now() + 5 * 60 * 1000;
    otpStore.verified = false;

    await sendEmail(
      email,
      'Upkar Admin Password Reset OTP',
      `Your OTP is ${otp}. Valid for 5 minutes.`,
    );

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('FORGOT PASSWORD ERROR:', error);
    res.status(500).json({ message: 'Failed to send OTP email' });
  }
};

/* =======================
   VERIFY OTP
======================= */
export const verifyAdminOtp = (req, res) => {
  const { otp } = req.body;

  if (otpStore.otp !== otp || Date.now() > otpStore.expiresAt) {
    return res.status(400).json({ message: 'Invalid or expired OTP' });
  }

  otpStore.verified = true;

  res.status(200).json({ message: 'OTP verified successfully' });
};

/* =======================
   RESET PASSWORD
======================= */
export const adminResetPassword = async (req, res) => {
  const { newPassword, confirmPassword } = req.body;

  if (!otpStore.verified) {
    return res.status(403).json({ message: 'OTP verification required' });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await Admin.updateOne(
    { email: process.env.ADMIN_EMAIL },
    { password: hashedPassword },
    { upsert: true },
  );

  otpStore.otp = null;
  otpStore.expiresAt = null;
  otpStore.verified = false;

  res.status(200).json({ message: 'Password reset successful' });
};

/* =========================
   GET ADMIN PROFILE
========================= */
export const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findOne({
      email: process.env.ADMIN_EMAIL,
    }).select('-password');

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.status(200).json(admin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   UPDATE ADMIN PROFILE
========================= */
export const updateAdminProfile = async (req, res) => {
  try {
    const { name, phone } = req.body;

    const admin = await Admin.findOne({
      email: process.env.ADMIN_EMAIL,
    });

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // image upload (same as banner)
    if (req.file) {
      const result = await uploadImageToCloudinary(
        req.file.buffer,
        'admin-profile',
      );
      admin.photo = result.secure_url;
    }

    if (name) admin.name = name;
    if (phone) admin.phone = phone;

    await admin.save();

    res.status(200).json({
      message: 'Admin profile updated successfully',
      admin: {
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        photo: admin.photo,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
