const app = require('./app');
const http = require('http');
const port = '3000';

/*** Get port from environment and store in Express.*/
app.set('port', port);

/*** Create HTTP server.*/
const server = http.createServer(app);
server.listen(port);
