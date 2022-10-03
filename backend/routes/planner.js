import express from 'express';

import {
getDocument,
createDocument,
getXfdfs
     } from '../controllers/planner.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/:id', getDocument);
router.get('/', getXfdfs);

router.post('/', 
// auth,
  createDocument);



export default router;