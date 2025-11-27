import mongoose from 'mongoose';

const AboutMainSchema = new mongoose.Schema(
  {
    heading: { type: String },

    plotNumber: { type: String },
    plotTitle: { type: String },
    plotImage: { type: String },

    acresNumber: { type: String },
    acresTitle: { type: String },
    acresImage: { type: String },
    mainImages: [{ type: String }],

    paragraph1: { type: String },
    paragraph2: { type: String },
    paragraph3: { type: String },
  },
  { timestamps: true }
);

const AboutMain = mongoose.model('AboutMain', AboutMainSchema);

export default AboutMain;
