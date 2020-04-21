const  https = require('https');
const  fs = require('fs');
const  app = require('./src/app');
const  port = require('./src/config/port');
const nodeApiDocGenerator = require('node-api-doc-generator');

nodeApiDocGenerator(app,'http://localhost',port().SERVER);

if (process.env.SSL_ENABLED === 'true') {

    const sslOptions = {
        key: fs.readFileSync(process.env.NODE_KEY),
        cert: fs.readFileSync(process.env.NODE_EXTRA_CA_CERTS)
    };

    https.createServer(sslOptions, app).listen(port().SERVER);
}else {
    app.listen(port().SERVER, (error, port) => {
        console.log(`Servidor rodando na porta 3000`);
    });
}