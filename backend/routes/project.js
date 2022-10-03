import express from 'express';

import {
createProject,
getProjectById,
updateProject
     } from '../controllers/project.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/:id', getProjectById);
// router.get('/', getXfdfs);

router.post('/',
//  auth,
   createProject);



export default router;