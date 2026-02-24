import mongoose from 'mongoose';

const brandMotiveSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    highlightText: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const BrandMotive =
  mongoose.models.BrandMotive ||
  mongoose.model('BrandMotive', brandMotiveSchema);

export default BrandMotive;
