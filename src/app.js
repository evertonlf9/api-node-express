const  express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const methodOverride = require('method-override');
const fs = require('fs')
const passport = require('passport');
const CORS = require('cors');
const path = require('path');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const csrf = require('csurf');
const uuid = require('uuid');

const router = require('./app/routers');
const corsOptions = require('./config/cors.config');
const connnectdb = require('./app/mongodb/connect/connnectdb');
const isAuthorized = require('./app/middlewares/isAuthorized');
const Auth = require('./app/middlewares/Auth');

const useDomainForCookies = process.env.DOMAIN || false
const host = process.env.HOST || 'localhost'

const privateKey = fs.readFileSync(path.resolve(__dirname, '../public/private.pem'), 'utf8');
const csrfProtection = csrf({
    cookie: {
      key: '_csrf',
      sameSite: true,
      httpOnly: true,
      domain: useDomainForCookies ? host : undefined
    }
  })

const appModule = () => {

    const app = express();
    connnectdb.connect();

    if (process.env.NODE_ENV !== 'test') {
        app.use(session({
            // name: uuid.v4(),
            name: "SESSION_ID",
            secret: privateKey,
            resave: false,
            saveUninitialized: true,
            unset: 'destroy',
            store: new FileStore({
                path: path.resolve(__dirname, '../tmp')
            }),
            cookie: {
                sameSite: true,
                domain: useDomainForCookies ? host : undefined
            }
        }));
    }

    app.use(cookieParser());

    app.use(bodyParser.urlencoded({extended: false, limit: '100mb'}));
    app.use(bodyParser.json({ extended: true, limit: '100mb' }));

    app.use(methodOverride('X-HTTP-Method-Override'));
    app.use(express.static(path.join(__dirname, 'public')));
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
    
    app.post('/api/authenticate', Auth);

    app.get('/api/document', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../doc/index.html'));
    });

    app.get('/teste2', (req, res) => {
        res.send(`
          <h1>Hello World</h1>
          <form action="/entry" method="POST">
            <div>
              <label for="message">Enter a message</label>
              <input id="message" name="message" type="text" />
            </div>
            <input type="submit" value="Submit" />
          </form>
        `);
      });

    app.get('/teste', csrfProtection, (req, res) => {
        res.send(`
          <h1>Hello World</h1>
          <form action="/entry" method="POST">
            <div>
              <label for="message">Enter a message</label>
              <input id="message" name="message" type="text" />
            </div>
            <input type="submit" value="Submit" />
            <input type="hidden" name="_csrf" value="${req.csrfToken()}" />
          </form>
        `);
      });
      
      app.post('/entry', csrfProtection, (req, res) => {
        console.log(`Message received: ${req.body.message}`);
        res.send(`CSRF token used: ${req.body._csrf}, Message received: ${req.body.message}`);
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

    return app;
}

module.exports = appModule();