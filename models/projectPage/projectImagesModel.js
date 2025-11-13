import mongoose from "mongoose";

const projectImagesSchema = new mongoose.Schema(
  {
    images: {
      type: [String], 
      required: true,
      validate: [arrayLimit, "{PATH} must have at least one image"],
    },
  },
  { timestamps: true }
);

function arrayLimit(val) {
  return val.length > 0;
}

const ProjectImages = mongoose.model("ProjectImages", projectImagesSchema);

export default ProjectImages;
