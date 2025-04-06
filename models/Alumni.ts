import mongoose from "mongoose";

const AlumniSchema = new mongoose.Schema({
  regNo: { type: String, required: true, unique: true },
  alumniName: { type: String, required: true },
  ug: { type: String, required: true },
  pg: { type: String },
  batchFrom: { type: Number, required: true },
  batchTo: { type: Number, required: true },
  alumniEmail: { type: String, required: true },
  contact: { type: String, required: true },
  address: { type: String, required: true },
  occupation: { type: String, required: true },
  organisation: { type: String, required: true },
  jobLocation: { type: String, required: true },
  webpage: { type: String },
  linkedin: { type: String },
  facebook: { type: String },
  twitter: { type: String },
  youtube: { type: String },
  otherSocial: { type: String },
  interactWithJuniors: { type: Boolean, default: false },
  attendMeet: { type: Boolean, default: false },
  contributeScheme: { type: Boolean, default: false },
  imageUrl: { type: String }
});

export default mongoose.models.Alumni || mongoose.model("Alumni", AlumniSchema);
