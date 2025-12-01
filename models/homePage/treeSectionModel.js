import mongoose from 'mongoose';

const treeSectionSchema = new mongoose.Schema(
  {
    heading1: { type: String, required: true },
    heading2: { type: String },
    description: { type: String, required: true },
    image: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const TreeSection = mongoose.model('TreeSection', treeSectionSchema);

export default TreeSection;
