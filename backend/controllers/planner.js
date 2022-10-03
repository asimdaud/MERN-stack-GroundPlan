import express from 'express';
// import mongoose from 'mongoose';
import PlannerModal from "../models/planner.js";
const router = express.Router();

// export const loadDocument = async (req, res) => {
//   const { documentId, xfdf, documentName } = req.body;

//   try {
//     const oldUser = await PlannerModal.findOne({ documentId });

//     if (oldUser) return res.status(400).json({ message: "Document already exists" });


//     const result = await PlannerModal.create({ documentId, xfdf, documentName });


//     res.status(201).json({ result});
//   } catch (error) {
//     res.status(500).json({ message: "Something went wrong" });

//     console.log(error);
//   }
// };

export const getDocument = async (req, res) => { 
  const { id } = req.params;

  try {
      const document = await PlannerModal.findById(id);
      
      res.status(200).json(document);
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
}

export const getXfdfs = async (req, res) => {
  // const { documentId } = req.query;
  
  try {
      // const LIMIT = 8;
      // const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
  
      // const total = await PlannerModal.countDocuments({});
      const xfdfs = await PlannerModal.find();
      
      res.json({ data: xfdfs });
  } catch (error) {    
      res.status(404).json({ message: error.message });
  }
}


export const createDocument = async (req, res) => {
  const document = req.body;
console.log(req.body)
  const newDocument = new PlannerModal({ ...document, creator: req.userId, createdAt: new Date().toISOString() })
//   annotationsPerDocument: [
//     { documentUrl: { type: [String], default: [] } },
//     { annotations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Annotation" }] }
// ],
  try {
      await newDocument.save();

      res.status(201).json(newDocument);
  } catch (error) {
      res.status(409).json({ message: error.message });
        }
}


export default router;