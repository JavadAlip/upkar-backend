import mongoose from 'mongoose';

const amenitySchema = new mongoose.Schema(
  {
    icon: {
      type: String,
      required: true,
    },
    heading: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Amenity = mongoose.model('Amenity', amenitySchema);
export default Amenity;
