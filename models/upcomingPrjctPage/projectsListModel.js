import mongoose from 'mongoose';

const upcomingProjectsListSchema = new mongoose.Schema(
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

const UpcomingProjectsList =
  mongoose.models.UpcomingProjectsList ||
  mongoose.model('UpcomingProjectsList', upcomingProjectsListSchema);

export default UpcomingProjectsList;
