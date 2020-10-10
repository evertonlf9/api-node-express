const  express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const methodOverride = require('method-override');
const fs = require('fs')

const CORS = require('cors');
const path = require('path');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const csrf = require('csurf');

// const uuid = require('uuid');
// const passport = require('passport');

const router = require('./app/routers');
const corsOptions = require('./config/cors.config');
const isAuthorized = require('./app/middlewares/isAuthorized');
const Auth = require('./app/middlewares/Auth');

const app = express();
const useDomainForCookies = process.env.DOMAIN || false
const host = process.env.HOST || 'localhost'

const store = new FileStore({
    path: path.resolve(__dirname, '../tmp')
});

const privateKey = fs.readFileSync(path.resolve(__dirname, '../public/private.pem'), 'utf8');
const csrfProtection = csrf({
    cookie: {
      key: '_csrf',
      sameSite: true,
      httpOnly: true,
      domain: useDomainForCookies ? host : undefined
    }
  })

class AppModule {
    
    constructor() {
        this.initialize();
        app.getStore = this.getStore;
        return app;
    }

    getStore() {
        return store;
    }

    initialize() {        
        this.configs();
    }

    configs() {
        if (process.env.NODE_ENV !== 'test') {
            app.use(session({
                // name: uuid.v4(),
                name: "SESSION_ID",
                secret: privateKey,
                resave: false,
                saveUninitialized: true,
                unset: 'destroy',
                store: store,
                cookie: {
                    sameSite: true,
                    domain: useDomainForCookies ? host : undefined
                }
            }));
        }
    
        app.use(cookieParser());
    
        app.use(bodyParser.urlencoded({extended: true, limit: '100mb'}));
        app.use(bodyParser.json({ extended: true, limit: '100mb' }));

        app.use(methodOverride('X-HTTP-Method-Override'));
        
        app.use(express.static('public'));
        app.use(express.static("doc"));
    
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
        this.routers();
    }

    routers () {
        app.post('/api/authenticate', Auth);
        
        app.get('/login', (req, res) => {
            res.sendFile(path.resolve(__dirname, '../public/index.html'));
        });

        app.get('/teste', (req, res) => {
            res.sendFile(path.resolve(__dirname, '../public/teste.html'));
        });

        app.get('/users', (req, res) => {
            res.sendFile(path.resolve(__dirname, '../public/users.html'));
        });

        app.get('/', (req, res) => {
            res.json({ message: 'Node BFF' }); 
        });
    
        if (process.env.NODE_ENV !== 'test') {
            app.use(isAuthorized);  
            app.use('/api/v1', csrfProtection, router);
        }
    
        if (process.env.NODE_ENV === 'test') {
            app.use('/api/v1', router);
        }
    
        app.use((req, res) => {
            res.status(404).json({error: 'Not found'});
        });
    }
}
module.exports = new AppModule();