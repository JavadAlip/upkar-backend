import mongoose from 'mongoose';
const locationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    embedUrl: {
      type: String,
      required: true,
      trim: true,
    },
    locationUrl: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model('Location', locationSchema);
