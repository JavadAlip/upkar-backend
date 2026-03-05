import mongoose from 'mongoose';

const readMoreSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: true,
      trim: true,
    },
    mainImage: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model('ReadMore', readMoreSchema);
