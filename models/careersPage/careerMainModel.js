import mongoose from 'mongoose';

const careerMainSchema = new mongoose.Schema(
  {
    careerDescription: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('CareerMain', careerMainSchema);
