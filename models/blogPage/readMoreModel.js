import mongoose from "mongoose";

const readMoreSchema = new mongoose.Schema(
  {
    mainImage: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("ReadMore", readMoreSchema);
