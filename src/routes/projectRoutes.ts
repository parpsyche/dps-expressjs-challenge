import express from 'express';
import projectController from '../controllers/projectController';

const projectRouter = express.Router();

projectRouter.route('/').get(projectController.getAll);

export default projectRouter;
