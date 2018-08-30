require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const app = express();

let connection = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME
});

app.get('/', (req, res) => {
	// find all data in database
	const query = 'SELECT * FROM Jobs';
	connection.query(query, (error, results, fields) => {
		if (error) throw error;
		res.send(results);
	});
});

app.listen(3000, () => {
	console.log('running on port 3000');
});
