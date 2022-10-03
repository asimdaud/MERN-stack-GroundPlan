import mongoose from "mongoose";
// import PlannerSchema from "./planner";


const documentSchema = mongoose.Schema({
    id: { type: String },
    url: { type: String, required: false },       //download url for the file.
    name: { type: String },      // for example ground floor, second floor, etc.
    annotation: [{ type: String }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
    createdAt: { type: Date, default: Date.now },

});

export default mongoose.model("Document", documentSchema);