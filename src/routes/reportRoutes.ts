import express from 'express';
import reportController from '../controllers/reportController';

const reportRouter = express.Router();

reportRouter.route('/').get(reportController.getAll);

export default reportRouter;
