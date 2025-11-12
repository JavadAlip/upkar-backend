import mongoose from 'mongoose';

const visionMissionSchema = new mongoose.Schema({
  heading: { type: String, default: "Vision & Mission" },
  description: { type: String, required: true },
  missionTitle: { type: String, default: "Our Mission" },
  missionText: { type: String, required: true },
  visionTitle: { type: String, default: "Our Vision" },
  visionText: { type: String, required: true },
  image: { type: String, required: true },
  stats: [
    {
      number: { type: String, required: true },  // e.g. "50+"
      label: { type: String, required: true }    // e.g. "Years of Experience"
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

const VisionMission = mongoose.model('VisionMission', visionMissionSchema);

export default VisionMission;
