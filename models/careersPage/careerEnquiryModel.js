import mongoose from 'mongoose';

const careerEnquirySchema = new mongoose.Schema(
  {
    serviceInterestedIn: {
      type: String,
      required: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    resumeUrl: String,
    resumeFileName: String,
    resumeMimeType: String,
  },
  { timestamps: true },
);

const CareerEnquiry = mongoose.model('CareerEnquiry', careerEnquirySchema);

export default CareerEnquiry;
