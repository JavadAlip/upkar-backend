import mongoose from 'mongoose';

const valueImageSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
  },
  { timestamps: true }
);

const ValueImage = mongoose.model('ValueImage', valueImageSchema);

export default ValueImage;
