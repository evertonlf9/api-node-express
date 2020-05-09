const  https = require('https');
const  fs = require('fs');
const  app = require('./src/app');
const SocketIO = require('./src/socketio');
const connnectdb = require('./src/mongodb/connect/connnectdb');

const  port = require('./src/config/port');
const nodeApiDocGenerator = require('node-api-doc-generator');

nodeApiDocGenerator(app,'http://localhost', port().SERVER);
connnectdb.connect();


if (process.env.SSL_ENABLED === 'true') {
    const sslOptions = {
        key: fs.readFileSync(process.env.NODE_KEY),
        cert: fs.readFileSync(process.env.NODE_EXTRA_CA_CERTS)
    };

    const server =  https.createServer(sslOptions, app);
    const socket = new SocketIO(server);
    server.listen(port().SERVER);

}else {
    const server = app.listen(port().SERVER, (error, port) => {
        console.log(`Servidor rodando na porta 3000`);
    });
    const socket = new SocketIO(server);
}