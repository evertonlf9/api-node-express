const UserRepository = require('../repository/user');

class User  {

    /**
     * @api {get} /api/v1/nosql/user GetUsers
     * @apiName GetUsers
     * @apiGroup NoSqlUser
     *
     * @apiParam {Number} page Current page.
     * @apiParam {Number} size Number of elements per page.
     * @apiParam {String} orderby Sort by fields in ascending or descending order ex: name,asc.
     * @apiParam {String} search Search parameter.
     *
     * @apiSuccess {Number} id User identifier.
     * @apiSuccess {String} email  Email of the User.
     * @apiSuccess {String} username  Username of the User.
     */
    static getAll (req, res)  {
        let params = {
            limit: req.query.size || 10,
            page: req.query.page || 0,
            find: {},
            sort: {
                username: 'asc'
            }
        }  
        
        if(req.query.search  && req.query.search !== '') {
            const regex = new RegExp(["^", req.query.search].join(""), "i");
            params = {...params, find: {username: regex }}
        }

        UserRepository.getAll(params)
        .then((resp) => res.json({ message:"", totalDocuments: resp.total, response: resp.result}))
        .catch((err) => res.json({  error: err, message:"", response: []}));
    } 

    /**
     * @api {get} /api/v1/nosql/user/:id GetById
     * @apiName GetById
     * @apiGroup NoSqlUser
     *
     * @apiParam {Number} page Current page.
     * @apiParam {Number} size Number of elements per page.
     * @apiParam {String} orderby Sort by fields in ascending or descending order ex: name,asc.
     * @apiParam {String} search Search parameter.
     *
     * @apiSuccess {Number} id User identifier.
     * @apiSuccess {String} email  Email of the User.
     * @apiSuccess {String} username  Username of the User.
     */
    static getById(req, res) {        
        UserRepository.getById(req.params.id)
        .then((resp) => res.json({ message:"", response: resp.result}))
        .catch((err) => res.json({ error: err, message:"", response: []}));
    }
    
    /**
     * @api {post} /api/v1/nosql/user CreateUser
     * @apiName CreateUser
     * @apiGroup NoSqlUser
     *
     * @apiParam {String} email  Email of the User.
     * @apiParam {String} username  Username of the User.
     *
     * @apiSuccess {Number} id User identifier.
     * @apiSuccess {String} email  Email of the User.
     * @apiSuccess {String} username  Username of the User.
     */
    static create(req, res) {  
        UserRepository.save(req.body)
        .then((resp) => res.status(201).json({ message:"", response: resp.result}))
        .catch((err) => res.json({ error: err, message:"", response: []}));
    }
    
    /**
     * @api {put} /api/v1/nosql/user/:id UpdateUser
     * @apiName UpdateUser
     * @apiGroup NoSqlUser
     *
     * @apiParam {Number} id User identifier.
     * @apiParam {String} email  Email of the User.
     * @apiParam {String} username  Username of the User.
     *
     * @apiSuccess {Number} id User identifier.
     * @apiSuccess {String} email  Email of the User.
     * @apiSuccess {String} username  Username of the User.
     */
    static update(req, res) {  
        UserRepository.update(req.body, req.params.id)
        .then((resp) => User.getById(req, res))
        .catch((err) => res.json({  error: err, message:"", response: []}))
    }
}
module.exports = User;