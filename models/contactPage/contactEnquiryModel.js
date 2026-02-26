import mongoose from 'mongoose';

const contactEnquirySchema = new mongoose.Schema(
  {
    projectStatus: {
      type: String,
      enum: ['ongoing', 'upcoming', 'completed'],
      required: true,
    },

    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },

    projectName: {
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

    query: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

const ContactEnquiry = mongoose.model('ContactEnquiry', contactEnquirySchema);

export default ContactEnquiry;
