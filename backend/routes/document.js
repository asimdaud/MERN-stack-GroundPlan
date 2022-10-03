import express from 'express';

import {
  createDocument,
  getDocumentById,
  updateDocument,
  deleteDocument,
  addAnnotation
} from '../controllers/document.js';

const router = express.Router();
import auth from "../middleware/auth.js";

// router.get('/:id', getDocument);
// router.get('/', getXfdfs);

router.post('/',
  // auth,
  createDocument);

router.patch('/:id/addAnnotation',
  // auth,
  addAnnotation);



export default router;