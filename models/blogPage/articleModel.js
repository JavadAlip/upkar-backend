import mongoose from "mongoose";

const subItemSchema = new mongoose.Schema({
  subImage: {
    type: String,
    required: true,
  },
  subHeading: {
    type: String,
    required: true,
    trim: true,
  },
  subDescription: {
    type: String,
    required: true,
    trim: true,
  },
});

const articleSchema = new mongoose.Schema(
  {
    mainImage: {
      type: String,
      required: true,
    },
    mainDescription: {
      type: String,
      required: true,
      trim: true,
    },
    subItems: [subItemSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Article", articleSchema);
