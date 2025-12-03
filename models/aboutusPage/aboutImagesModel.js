import mongoose from 'mongoose';

const aboutImagesSchema = new mongoose.Schema(
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

const AboutImages = mongoose.model('AboutImages', aboutImagesSchema);

export default AboutImages;
