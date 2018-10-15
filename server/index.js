const express = require('express');
var bodyParser = require('body-parser');
var env = require('./env.js').setup();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

var db;

// RESTful API call handling
//=====================================

//this just returns all users
app.get('/users', (req, res) => {
	var cursor = db.collection('users').find().toArray( function(err, results) {
		console.log(results);
		res.send(results);
	});
});

//unfinished
app.get('/users/:username', (req, res) => {
	var cursor = db.collection('users').find({ 'username': [req.body] }).toArray(
	function(err, results) {
		console.log(results);
		res.send(results);
	});
});

// MongoDB connection & server start
//=====================================
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb+srv://diagram_server:M6qcdfrqt3jjv4Uq@cluster0-k8yai.mongodb.net/test?retryWrites=true', { useNewUrlParser: true }, (err, client) => {
	if (err) return console.log(err);
	db = client.db('DiaGramDB');
	app.listen(env.PORT, () => {
		console.log(`Diagram API server listening on port ${env.PORT}!`);
	});
});