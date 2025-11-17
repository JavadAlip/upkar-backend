import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema(
  {
    memberImage: { type: String, required: true },
    memberName: { type: String, required: true },
    memberPosition: { type: String, required: true },
  },
  { timestamps: true }
);

const Team = mongoose.model("Team", TeamSchema);

export default Team;
