require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const methodOverride = require('method-override');
const app = express();
const port = process.env.PORT || 3000;

app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

let connection = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME
});

app.get('/', (req, res) => {
	res.send('welcome');
});
app.get('/getsql', (req, res) => {
	// find all data in database
	const query = 'SELECT * FROM Jobs';
	connection.query(query, (error, results, fields) => {
		if (error) throw error;
		res.render('jobs', { jobs: results });
	});
});

app.delete('/:id', (req, res) => {
	const query = `DELETE from Jobs WHERE id = ${req.params.id}`;
	connection.query(query, (error, results, fields) => {
		if (error) throw error;
		res.redirect('/getsql');
	});
});

app.put('/:id', (req, res) => {
	const query = `UPDATE Jobs SET applied = True WHERE id = ${req.params.id}`;
	connection.query(query, (error, results, fields) => {
		if (error) throw error;
		res.redirect('/getsql');
	});
});

app.listen(port, () => {
	console.log('running on port ', port);
});
