import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema(
  {
    projectType: {
      type: String,
      enum: ['ongoing', 'upcoming', 'completed'],
      required: true,
    },
    siteVisitDate: {
      type: Date,
      required: true,
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
    isExistingCustomer: {
      type: String,
      enum: ['yes', 'no'],
      required: true,
    },
  },
  { timestamps: true }
);

const Enquiry = mongoose.model('Enquiry', enquirySchema);
export default Enquiry;
