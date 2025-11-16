  import mongoose from "mongoose";

  const iconSchema = new mongoose.Schema({
    icon: { type: String, required: true },
    heading: { type: String, required: true },
    subheading: { type: String, required: true },
  });

  const plotLayoutSchema = new mongoose.Schema(
    {
      mainImage: { type: String, required: true },
      icons: [iconSchema], // multiple icons with heading & subheading
    },
    { timestamps: true }
  );

  const PlotLayout = mongoose.model("PlotLayout", plotLayoutSchema);
  export default PlotLayout;
