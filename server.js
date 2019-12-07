const express = require('express');
const bodyParser = require('body-parser');

const ScoresController = require('./src/scoresController');
const ValidationController = require('./src/validationController');
const ErrorHandler = require('./src/errorHandler');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname));

app.get('/', ScoresController.homePage);

app.get('/api/getScores', ScoresController.getTopScores);

app.post('/api/submitEntry', ValidationController.validateEntry, ValidationController.checkPalindrome, ScoresController.addEntry);

app.use(ErrorHandler.notFound);

app.use(ErrorHandler.serverError);

module.exports = app;
