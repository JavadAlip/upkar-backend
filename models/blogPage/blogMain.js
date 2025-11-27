import mongoose from 'mongoose';

const blogMainSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: true,
      trim: true,
    },
    heading1: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    mainImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('BlogMain', blogMainSchema);
