import mongoose from 'mongoose';

const certificationSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  icon: {
    type: String, 
    required: true,
  },
}, { timestamps: true });

const Certification = mongoose.model('Certification', certificationSchema);
export default Certification;
    