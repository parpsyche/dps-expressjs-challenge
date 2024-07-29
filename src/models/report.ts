import db from '../services/db.service';
import { v4 as uuidv4 } from 'uuid';

interface Report {
	id: string;
	projectId: string;
	text: string;
}

function getAll() {
	return db.query(
		'SELECT *, (SELECT name FROM projects WHERE id=reports.projectid) AS project_name FROM reports',
	) as Report[];
}

function create(text: string, projectId: string) {
	const id = uuidv4();
	db.run(
		'INSERT INTO reports (id, text, projectid) VALUES(@id, @text, @projectId)',
		{ id, text, projectId },
	);
}

function findById(id: string) {
	const result = db.query('SELECT * FROM reports WHERE id=@id', { id });
	if (result.length === 0) {
		return null;
	}

	return result[0] as Report;
}

function findByProjectId(projectId: string) {
	return db.query('SELECT * FROM reports WHERE projectid=@projectId', {
		projectId,
	}) as Report[];
}

function remove(id: string) {
	db.run('DELETE FROM reports WHERE id=@id', { id });
}

function update(projectId: string, text: string, id: string) {
	db.run('UPDATE REPORTS SET text=@text, projectid=@projectId WHERE id=@id', {
		projectId,
		text,
		id,
	});
}

export default {
	getAll,
	create,
	findById,
	findByProjectId,
	remove,
	update,
};
