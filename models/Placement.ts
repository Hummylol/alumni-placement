import mongoose from "mongoose";

const PlacementSchema = new mongoose.Schema({
  regNo: { type: String, required: true, unique: true },
  company: { type: String, required: true },
  studentName: { type: String, required: true },
  package: { type: Number, required: true },
  location: { type: String, required: true },
  dateOfJoining: { type: String, required: true },
  role: { type: String, required: true },
});

export default mongoose.models.Placement || mongoose.model("Placement", PlacementSchema);
