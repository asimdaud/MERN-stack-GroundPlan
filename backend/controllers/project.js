import express from 'express';
import mongoose from 'mongoose';
import ProjectModel from "../models/project.js";
// import UserModel from "../models/user.js";
const router = express.Router();
//create project
// with empty annotationsPerDocument, collaborators
//update project
// for every new annotation, for new document, for collaborators, and for deletion.
// updateAnnotationsPerDocument() and updateInfo(title, description, privacy, collaborators)
//deleteAannotationsPerDocument()
// auto: id, author, createdAt
//must: title, description.
//optional: collaborators,privacy, annotationPerDocument
// the structure:
// annotationsPerDocument: [
//     {
//         name: { type: String },      // for example ground floor, second floor, etc.
//         url: { type: String },       //download url for the file.
//         annotations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Annotation" }],
//         createdAt: { type: Date, default: Date.now },
//     },
// ],

export const createProject = async (req, res) => {
    const projectDetails = req.body;
    const newProject = new ProjectModel({ ...projectDetails, author: req.userId, createdAt: new Date().toISOString() })
console.log(projectDetails)
    try {
        await newProject.save();
        res.status(201).json(newProject);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateProject = async (req, res) => {
    const { id } = req.params;
    const { title, description, privacy, collaborators, annotationsPerDocument } = req.body;
    // const { documentUrl } = req.file


    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No project with id: ${id}`);

    const updatedProject = { title, description, privacy, collaborators, annotationsPerDocument, _id: id };

    await ProjectModel.findByIdAndUpdate(id, updatedProject, { new: true });

    res.json(updatedProject);
}

export const getProjectById = async (req, res) => {
    const { id } = req.params;

    try {
        const annotationsPerDocument = await ProjectModel.findById(id);

        res.status(200).json(annotationsPerDocument);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}



export default router;