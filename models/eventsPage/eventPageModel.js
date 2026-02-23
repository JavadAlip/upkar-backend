import mongoose from 'mongoose';

const eventPageSchema = new mongoose.Schema(
  {
    mainTitle: { type: String, required: true },
    mainDescription: { type: String, required: true },
    mainImage: { type: String, required: true },

    subTitle: { type: String, required: true },
    subDescription: { type: String, required: true },
    subImage: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.model('EventPage', eventPageSchema);
