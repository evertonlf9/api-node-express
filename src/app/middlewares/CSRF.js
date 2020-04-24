const csrf = require('csurf'); 
// Route middlewares
const csrfProtection = csrf({ cookie: true });

const CSRF = (request, response, next) => {

    var secret = csrf.secretSync();
    var token = csrf.create(secret);
	// get headers
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.json({});
    next();
    
};

module.exports = CSRF;