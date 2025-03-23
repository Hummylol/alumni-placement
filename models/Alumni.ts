import mongoose from "mongoose";

const AlumniSchema = new mongoose.Schema({
  regNo: { type: String, required: true, unique: true },
  alumniName: { type: String, required: true },
  yearOfPassing: { type: Number, required: true },
  currentPosition: { type: String, required: true },
  companyName: { type: String, required: true },
  contact: { type: String, required: true },
  alumniEmail: { type: String, required: true },
});

export default mongoose.models.Alumni || mongoose.model("Alumni", AlumniSchema);
