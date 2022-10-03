import express from 'express';
import mongoose from 'mongoose';
import DocumentModel from "../models/document.js";
import project from '../models/project.js';
import ProjectModel from "../models/project.js";
const router = express.Router();
// addDocument()  
// change in projectClass as well
// deleteDocument()
// updateDocument()
// xfdf, author, createdAt, project (for id)
export const createDocument = async (req, res) => {
    const documentDetails = req.body;
    const newDocument = new DocumentModel({ ...documentDetails, author: req.userId, createdAt: new Date().toISOString() });

    try {
        //error: on update it removes the annotions
        //         const updatedPost = { projectDetails.collaborators };
        // //id, updatedPost, new:true
        // await ProjectModel.findByIdAndUpdate(documentDetails.project, updatedPost, { new: true });


        // finding the relevant project 
        // const projectDetails = await ProjectModel.findById(documentDetails.project);
        // const anotPerDoc = projectDetails.documentsPerDocument.documents;
        // console.log(projectDetails);
        // "documentsPerDocument": [{"name":"fake","documents":["abc","sdsa","Ferere"]}]
        try {
            // creating an document in document table
            await newDocument.save();
            // //working for collabs
            //             ProjectModel.findByIdAndUpdate(
            //                 documentDetails.project,
            //                 {$push: {"collaborators": newDocument._id}},
            //                 {safe: true, upsert: true, new : true},
            //                 function(err, model) {
            //                     if (err) {
            //                         console.log(err)
            //                     }
            //                     else {
            //                         console.log("Updated item : ", model);
            //                     }

            //                 }
            //             );
            ProjectModel.findByIdAndUpdate(
                documentDetails.project,
                { $push: { "documents": newDocument._id } },
                { safe: true, upsert: true, new: true },
                function (err, model) {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        console.log("Updated item : ", model);
                    }

                }
            );
            // pushing document data inside project table
            // projectDetails.collaborators.push(newDocument._id);
            // await projectDetails.documentsPerDocument.documents.push(newDocument._id)   
            // anotPerDoc.documents.push(newDocument._id);

            // updating project data
            // const updatedProject = await ProjectModel.findByIdAndUpdate(documentDetails.project, projectDetails, { new: true });
            res.status(201).json(newDocument /*&& updatedProject*/);
        } catch (error) {
            res.status(409).json({ message: error.message });
        }
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
export const updateDocument = async (req, res) => {
    const { id } = req.params;
    const { name, document } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No document with id: ${id}`);
    const updatedDocument = { name, document, _id: id };
    await DocumentModel.findByIdAndUpdate(id, updatedDocument, { new: true });

    res.json(updatedDocument);
}

export const getDocumentById = async (req, res) => {
    const { id } = req.params;
    try {
        const document = await DocumentModel.findById(id);
        res.status(200).json(document);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deleteDocument = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No document with id: ${id}`);

    await DocumentModel.findByIdAndRemove(id); //remove from project table as well

    res.json({ message: "Document deleted successfully." });
}

export const addAnnotation = async (req, res) => {
    const { id } = req.params;
    const { newAnnotation } = req.body;
    console.log(req.body)
    console.log(id)
    console.log(req.params)

    // if (!req.userId) {
    //     return res.json({ message: "Unauthenticated" });
    // }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No document with id: ${id}`);

    const document = await DocumentModel.findById(id);
console.log(document)
    document.annotation.push(newAnnotation);


    const updatedDocument = await DocumentModel.findByIdAndUpdate(id, document, { new: true });

    res.status(200).json(updatedDocument);

}



export default router;