import db from '../services/db.service';
import { v4 as uuidv4 } from 'uuid';

const SPECIAL_REPORT_THRESHOLD = 3;
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

function specialReport() {
	const data = db.query('SELECT text FROM reports') as Report[];
	return data.filter(hasFrequentWords);
}

function hasFrequentWords(item: Report) {
	type HashType = { [key: string]: number };
	const counts: HashType = {};
	const words = item.text.split(' ');
	for (let i = 0; i < words.length; i++) {
		const word = words[i].toLowerCase();
		if (word in counts) {
			counts[word]++;
			if (counts[word] === SPECIAL_REPORT_THRESHOLD) {
				return true;
			}
			continue;
		}
		counts[word] = 1;
	}
	return false;
}

export default {
	getAll,
	create,
	findById,
	findByProjectId,
	remove,
	update,
	specialReport,
};
