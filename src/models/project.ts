import db from '../services/db.service';

interface Project {
	id: string;
	name: string;
	description: string;
}

function getAll() {
	return db.query('SELECT * FROM projects') as Project[];
}

export default { getAll };
