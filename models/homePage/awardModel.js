import mongoose from 'mongoose';

const awardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const Award = mongoose.model('Award', awardSchema);
export default Award;
