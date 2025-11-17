import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    eventTitle: { type: String, required: true },
    eventDescription: { type: String, required: true },
    eventLocation: { type: String, required: true },
    eventDate: { type: Date, required: true },
    eventImage: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);
