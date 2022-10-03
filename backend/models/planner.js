//not needed anymore
import mongoose from "mongoose";

const plannerSchema = mongoose.Schema({
    documentId: { type: String, required: true },
    xfdf: { type: String, required: true },
    documentName: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', 
    // required: true
 },
    annotationsPerDocument: [
        {
            name: { type: String },      // for example ground floor, second floor, etc.
            url: { type: String },       //download url for the file.
            annotations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Annotation" }],
            createdAt: { type: Date, default: Date.now },

        },
    ],
    createdAt: { type: Date, default: Date.now },
});


var PlannerSchema = mongoose.model('Planner', plannerSchema);

export default PlannerSchema;

// export default mongoose.model("Planner", plannerSchema);

