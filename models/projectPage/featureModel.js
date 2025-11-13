import mongoose from "mongoose";

const iconSchema = new mongoose.Schema({
  icon: { type: String }, 
  iconTitle: { type: String },
});

const featureSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    mainImage: {
      type: String,
      required: true,
    },
    icons: {
      type: [iconSchema],
      validate: [arrayLimit, "{PATH} exceeds the limit of 3"],
    },
  },
  { timestamps: true }
);

function arrayLimit(val) {
  return val.length <= 3;
}

const Feature = mongoose.model("Feature", featureSchema);
export default Feature;
  