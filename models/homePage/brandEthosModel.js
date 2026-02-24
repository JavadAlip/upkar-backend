import mongoose from 'mongoose';

const brandEthosSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const BrandEthos =
  mongoose.models.BrandEthos || mongoose.model('BrandEthos', brandEthosSchema);

export default BrandEthos;
