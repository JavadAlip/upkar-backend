import mongoose from "mongoose";

const ourValuesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    iconImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("OurValues", ourValuesSchema);
