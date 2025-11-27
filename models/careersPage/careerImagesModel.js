import mongoose from 'mongoose';

const careerImagesSchema = new mongoose.Schema(
  {
    images: {
      type: [String],
      required: true,
      validate: [arrayLimit, '{PATH} must have at least one image'],
    },
  },
  { timestamps: true }
);

function arrayLimit(val) {
  return val.length > 0;
}

const CareerImages = mongoose.model('CareerImages', careerImagesSchema);

export default CareerImages;
