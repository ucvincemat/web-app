const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const db = new sqlite3.Database('database.db', (err) => {
	if (err) {
		console.error('Error opening database:', err.message);
	} else {
		console.log('Connected to SQLite database.');
	}
});

const initializeSQL = fs.readFileSync('./init.sql', 'utf-8');
db.exec(initializeSQL, (err) => {
	if (err) {
		console.error('Error initializing database:', err.message);
	} else {
		console.log('Database initialized successfully.');
	}
});

module.exports = db;