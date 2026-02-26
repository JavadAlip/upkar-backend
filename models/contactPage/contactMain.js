import mongoose from 'mongoose';

const contactMainSchema = new mongoose.Schema(
  {
    mainImage: {
      type: String,
      required: true,
    },
    heading: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model('ContactMain', contactMainSchema);
