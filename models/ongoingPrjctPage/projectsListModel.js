import mongoose from 'mongoose';

const ongoingProjectsListSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    projectImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const OngoingProjectsList =
  mongoose.models.OngoingProjectsList ||
  mongoose.model('OngoingProjectsList', ongoingProjectsListSchema);

export default OngoingProjectsList;
