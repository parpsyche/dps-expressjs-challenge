import db from '../services/db.service';

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

export default { getAll };
