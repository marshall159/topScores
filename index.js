const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname));

app.get('/', function(req, res) {
	res.render('index.html');
});

app.get('/api/getScores', (req, res, next) => {
	res.send('Top five scores!');
});

app.post('/api/submitEntry', (req, res, next) => {
	res.send('Take all the points!');
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log('Server', process.pid, 'listening on port', PORT);
});

module.exports = app;
