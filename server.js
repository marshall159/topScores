const express = require('express');
const bodyParser = require('body-parser');

const ScoresController = require('./src/scoresController');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname));

app.get('/', ScoresController.homePage);

app.get('/api/getScores', ScoresController.getTopScores);

app.post('/api/submitEntry', ScoresController.validateEntry, ScoresController.addEntry);

module.exports = app;
