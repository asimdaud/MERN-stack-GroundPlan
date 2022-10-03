import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  id: { type: String },
  name: { type: String, required:  true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dob: {type: Date},
  country:  { type: String},
  gender: {type: String, enum: ["Male", "Female"]},
  projects_created: [{ type: mongoose.Schema.Types.ObjectId, ref: "Planner" }],
  projects_shared: [{ type: mongoose.Schema.Types.ObjectId, ref: "Planner" }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);