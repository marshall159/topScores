const server = require('./server');

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
	console.log('Server', process.pid, 'listening on port', PORT);
});
