const express = require('express');
const bodyParser = require('body-parser');

const ScoresController = require('./src/scoresController');
const ErrorHandler = require('./src/errorHandler');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname));

app.get('/', ScoresController.homePage);

app.get('/api/getScores', ScoresController.getTopScores);

app.post('/api/submitEntry', ScoresController.validateEntry, ScoresController.checkPalindrome, ScoresController.addEntry);

app.use(ErrorHandler);

module.exports = app;
