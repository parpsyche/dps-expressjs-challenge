import express, { Express } from 'express';
import endPoints from 'express-list-endpoints';
import dotenv from 'dotenv';
import projectRoute from './routes/projectRoutes';
import reportRoute from './routes/reportRoutes';
import authMiddleware from './middleware/authMiddleware';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(authMiddleware);
app.use('/projects', projectRoute);
app.use('/reports', reportRoute);
app.get('*', (req, res) => {
	res.status(200).send(endPoints(app));
});
app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
