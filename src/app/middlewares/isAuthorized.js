const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const Error = require('./Errors');

const IsAuthorized = (req, res, next) => { 
	
	if (typeof req.headers['x-access-token'] !== "undefined" || req.cookies['x-access-token'] !== "undefined") {
		// retrieve the authorization header and parse out the
		// JWT using the split function
		let token =  req.cookies['x-access-token'] && req.cookies['x-access-token'].split(" ")[1] || req.cookies['x-access-token'];
		
		const privateKey = fs.readFileSync(path.resolve(__dirname, '../../../public/private.pem'), 'utf8');
		// Here we validate that the JSON Web Token is valid and has been 
		// created using the same private pass phrase
		jwt.verify(token, privateKey, { algorithm: "HS256" }, (err, decoded) => {
			
			// if there has been an error...
			if (err) {  
				res.clearCookie("x-access-token");
				// shut them out!
				return Error(res, 401);
				
			}
			// if the JWT is valid, allow them to hit
			// the intended endpoint
			return next();
		});
	} else {
		res.clearCookie("x-access-token");
		return Error(res, 401);
	}
};
module.exports = IsAuthorized;