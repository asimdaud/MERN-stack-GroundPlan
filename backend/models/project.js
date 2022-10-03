import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
    id: { type: String },
    title: { type: String, required: true },
    description: { type: String },
    author: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        //  required: true
    },
    documents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }],
    collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    privacy: { type: String, enum: ['Shared', 'Private'], default: 'Shared' },
    createdAt: { type: Date, default: Date.now },
    // annotationsPerDocument: [
    //     {
    //         name: { type: String },      // for example ground floor, second floor, etc.
    //         url: { type: String },       //download url for the file.
    //         annotations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Annotation" }], //    , "annotationsPerDocument": [{"name":"fake","annotations":["abc","sdsa","Ferere"]}]
    //         createdAt: { type: Date, default: Date.now },
    //     },
    // ],
});

export default mongoose.model("Project", projectSchema);