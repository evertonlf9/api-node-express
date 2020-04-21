const  express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const methodOverride = require('method-override');
const passport = require('passport');
const CORS = require('cors');
const path = require('path');

const router = require('./app/routers');
const corsOptions = require('./config/cors.config');
const connnectdb = require('./app/mongodb/connect/connnectdb');
const ValidateJWT = require('./app/middlewares/ValidateJWT');

const appModule = () => {

    const app = express();
    connnectdb.connect();

    app.use(cookieParser());

    app.use(bodyParser.json({ type: 'application/vnd.api+json', extended: true, limit: '100mb' }));
    app.use(bodyParser.urlencoded({extended: false, limit: '100mb'  }));

    app.use(methodOverride('X-HTTP-Method-Override'));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.static("doc"));
    // app.use(express.static(path.join(__dirname, 'doc')));
    // app.use('/static', express.static('doc'));

    app.use(compression());
    
    const corsMiddleware = CORS({origin: corsOptions, preflightContinue: true})
    app.use(corsMiddleware);
    app.options('*', corsMiddleware);    

    app.use((req, res, next) => {
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', false);
        // Pass to next layer of middleware
        next();
    });
    app.disable('x-powered-by');

    app.use('*/restrict/*', ValidateJWT);    
    app.use('/api/v1', router);

    app.get('/document', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../doc/index.html'));
    });

    return app;
}

module.exports = appModule();