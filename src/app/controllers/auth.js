const jwt = require('jsonwebtoken');
const { QueryTypes } = require('sequelize');
const UserRepository = require('../repository/user');

/**
 * @api {post} /api/authenticate Auth
 * @apiName Authenticate
 * @apiGroup Auth
 *
 * @apiParam {String} email  Email of the User.
 * @apiParam {String} username  Username of the User.
 *
 * @apiSuccess {Number} id User identifier.
 */
const Auth = (req, res, privateKey) => {

    const fields = 'id, first_name, login, password';

    const where = `WHERE User.login = :username`;
    const sql = `SELECT ${fields} FROM Users AS User ${where}`;
    const queryTypes = { 
        nest: true, 
        replacements: { username: req.body.username }, 
        type: QueryTypes.SELECT 
    };

    UserRepository.query(sql, queryTypes)
    .then((result) => {      
        if(result.rows) {
            const data = {...result.rows[0]}; 

            if(data.password === req.body.password) {

                const token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: delete data.password
                }, 
                privateKey, 
                { algorithm: 'HS256'});
                
                res.cookie('x-access-token', token);
                // res.cookie('x-access-token', token, { httpOnly: true, secure: true }); //for https
                res.setHeader('x-access-token', `Bearer ${token}`);

                return res.send({message: "successfull authentication", response: data});            
            }
        }

        return res.json({ error: {}, message:"authentication failed", response: []})
    })
    .catch((err) => res.status(403).json({ error: err, message:"authentication failed", response: []}));
    
}
module.exports = Auth;