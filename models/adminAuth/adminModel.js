import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    photo: { type: String },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.model('Admin', adminSchema);
