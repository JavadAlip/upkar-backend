import mongoose from 'mongoose';

const quoteCertificateSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const QuoteCertificate = mongoose.models.QuoteCertificate || mongoose.model('QuoteCertificate', quoteCertificateSchema);

export default QuoteCertificate;
