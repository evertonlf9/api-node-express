const ValidateJWT = (request, response, next) => {

	// get headers
    const token = request.headers['authorization'];
    next();
    
	// try {
	// 	if (token && typeof token === 'string') {
	// 		const decoded = jwt.verify(token, config.JWT_SECRET);
	// 		if (decoded) {
	// 			next();
	// 		} else {
	// 			return response.status(503).send({
	// 				msg: `Invalid access token`,
	// 				code: 32487,
	// 			});
	// 		}
	// 	} else {
	// 		return response.status(503).send({
	// 			msg: `Invalid access token`,
	// 			code: 2564,
	// 		});
	// 	}
	// } catch (error) {
	// 	console.log('Error');
	// 	return response.status(500).send({
	// 		msg: `Internal Error`,
	// 		code: 16331,
	// 	});
	// }
};
module.exports = ValidateJWT;