import { Request, Response } from 'express';
import reportRepository from '../models/report';

function getAll(req: Request, res: Response) {
	try {
		const result = reportRepository.getAll();
		res.json({ status: 'success', data: result });
	} catch (err: unknown) {
		errorResponse(err as Error, res);
	}
}

function errorResponse(err: Error, res: Response) {
	res.status(500).json({
		status: 'error',
		message: err.message,
	});
}

export default {
	getAll,
};
