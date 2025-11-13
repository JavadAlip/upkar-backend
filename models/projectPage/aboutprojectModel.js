import mongoose from "mongoose";

const aboutProjectSchema = new mongoose.Schema(
  {
    aboutHeading: {
      type: String,
      required: true,
      trim: true,
    },
    aboutDescription: {
      type: String,
      required: true,
    },
    reRaising: {
      type: String,
      required: true,
    },
    reRadescription: {
      type: String,
      required: true,
    },
    noBrokerHeading: {
      type: String,
      required: true,
    },
    builderHeading: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const AboutProject = mongoose.model("AboutProject", aboutProjectSchema);

export default AboutProject;
