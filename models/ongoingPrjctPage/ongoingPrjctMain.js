import mongoose from "mongoose";

const ongoingProjectMainSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    mainImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const OngoingProjectMain = mongoose.models.OngoingProjectMain || mongoose.model("OngoingProjectMain", ongoingProjectMainSchema);

export default OngoingProjectMain;
