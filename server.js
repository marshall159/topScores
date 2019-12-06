const express = require('express');
const bodyParser = require('body-parser');

const ScoresController = require('./src/scoresController');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname));

app.get('/', function(req, res) {
	res.render('index.html');
});

app.get('/api/getScores', ScoresController.getTopScores);

app.post('/api/submitEntry', (req, res, next) => {
	res.send('hello');
});

module.exports = app;
