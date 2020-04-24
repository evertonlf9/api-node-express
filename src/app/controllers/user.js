const { QueryTypes } = require('sequelize');
const UserRepository = require('../repository/user');
const operatorsAliases = require('../../config/operatorsAliases.config');

class UserController  {
    
    /**
     * @api {get} /api/v1/user QueryUser
     * @apiName QueryUser
     * @apiGroup User
     *
     * @apiParam {Number} page current page.
     * @apiParam {Number} size number of elements per page.
     * @apiParam {String} orderby sort by fields in ascending or descending order ex: name,asc.
     *
     * @apiSuccess {NUmber} id User identifier.
     * @apiSuccess {String} firstname Firstname of the User.
     * @apiSuccess {String} lastname  Lastname of the User.
     * @apiSuccess {String} email  Email of the User.
     * @apiSuccess {String} CPF  CPF of the User.
     * @apiSuccess {String} RG  RG of the User.
     * @apiSuccess {String} username  Username of the User.
     * @apiSuccess {String} password  Password of the User.
     * 
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "id": 1,
     *       "first_name": "John", 
     *       "last_name": "Doe", 
     *       "rg": "45.987.632-5", 
     *       "cpf":"589.652.324-52", 
     *       "email": "teste@mail.com", 
     *       "login": "clauid.ferraz", 
     *       "password": "dsjsdkf#4kgdkg"
     *     }
     * 
     * @apiError UserNotFound The id of the User was not found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "UserNotFound"
     *     }
     */
    static query (req, res)  {
        let field = 'id', order = 'ASC';
        if(req.query.orderby && req.query.orderby !== "") {
            const orderBy = req.query.orderby.split(',');
            field = orderBy[0];
            order = orderBy[1].toUpperCase();
        }

        const paginate = `LIMIT ${(parseInt(req.query.page) * parseInt(req.query.size) || 0)}, ${parseInt(req.query.size) || 100}`;
        const orderBy = `ORDER BY User.${field} ${order}`;
        const fields = 'id, first_name, last_name, email, rg, cpf, login, password';

        const where = `WHERE (User.first_name LIKE 'Schmidt' OR User.last_name LIKE '${req.query.search}')`;
        const sql = `SELECT ${fields} FROM Users AS User ${ (req.query.search && req.query.search !== '') ? where : ''.trim()} ${orderBy} ${paginate}`;
        const queryTypes = { nest: true, type: QueryTypes.SELECT };
        const sqlCount = "select count(*) from Users";

        UserRepository.query(sql, queryTypes, sqlCount)
        .then((registers) => res.json(registers))
        .catch((error) => res.json(error)); 
    }

    /**
     * @api {get} /api/v1/user GetUsers
     * @apiName GetUsers
     * @apiGroup User
     *
     * @apiParam {Number} page Current page.
     * @apiParam {Number} size Number of elements per page.
     * @apiParam {String} orderby Sort by fields in ascending or descending order ex: name,asc.
     * @apiParam {String} search Search parameter.
     *
     * @apiSuccess {NUmber} id User identifier.
     * @apiSuccess {String} firstname Firstname of the User.
     * @apiSuccess {String} lastname  Lastname of the User.
     * @apiSuccess {String} email  Email of the User.
     * @apiSuccess {String} CPF  CPF of the User.
     * @apiSuccess {String} RG  RG of the User.
     * @apiSuccess {String} username  Username of the User.
     * @apiSuccess {String} password  Password of the User.
     * 
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "id": 1,
     *       "first_name": "John", 
     *       "last_name": "Doe", 
     *       "rg": "45.987.632-5", 
     *       "cpf":"589.652.324-52", 
     *       "email": "teste@mail.com", 
     *       "login": "clauid.ferraz", 
     *       "password": "dsjsdkf#4kgdkg"
     *     }
     * 
     * @apiError UserNotFound The id of the User was not found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "UserNotFound"
     *     }
     */
    static GetUsers (req, res)  {
        // ?page=0&size=10&search=&orderby=id,asc
        let field = 'id', order = 'ASC';
        if(req.query.orderby && req.query.orderby !== "") {
            const orderBy = req.query.orderby.split(',');
            field = orderBy[0];
            order = orderBy[1].toUpperCase();
        }

        let where = {};
        if(req.query.search && req.query.search !== '') {
            where = {
                [operatorsAliases.$or]: [
                    { first_name: {[operatorsAliases.$like]: req.query.search } },
                    { last_name: {[operatorsAliases.$like]: req.query.search } },
                ]
            }
        }

        const query = {
            attributes: ['id', 'first_name', 'last_name', 'email', 'rg', 'cpf', 'login', 'password'],
            where: where,
            limit: parseInt(req.query.size) || 100,
            offset: (parseInt(req.query.page) * parseInt(req.query.size) || 0),
            order: [[field, order]]
        }

        UserRepository.getUsers(query)
        .then((registers) => res.json(registers))
        .catch((error) => res.json(error));      
    } 
    
    /**
     * @api {get} /api/v1/user:id GetById
     * @apiName GetById
     * @apiGroup User
     *
     *  @apiParam {Number} id Users unique ID.
     *
     * @apiSuccess {NUmber} id User identifier.
     * @apiSuccess {String} firstname Firstname of the User.
     * @apiSuccess {String} lastname  Lastname of the User.
     * @apiSuccess {String} email  Email of the User.
     * @apiSuccess {String} CPF  CPF of the User.
     * @apiSuccess {String} RG  RG of the User.
     * @apiSuccess {String} username  Username of the User.
     * @apiSuccess {String} password  Password of the User.
     * 
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "id": 1,
     *       "first_name": "John", 
     *       "last_name": "Doe", 
     *       "rg": "45.987.632-5", 
     *       "cpf":"589.652.324-52", 
     *       "email": "teste@mail.com", 
     *       "login": "clauid.ferraz", 
     *       "password": "dsjsdkf#4kgdkg"
     *     }
     * 
     * @apiError UserNotFound The id of the User was not found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "UserNotFound"
     *     }
     */
    static GetById (req, res)  {
        UserRepository.getById(req.params.id)
        .then((registers) => res.json(registers))
        .catch((error) => res.json(error));
    }

    /**
     * @api {post} /api/v1/user/:id CraeateUser
     * @apiName Create
     * @apiGroup User
     *
     * @apiParam {String} firstname Firstname of the User.
     * @apiParam {String} lastname  Lastname of the User.
     * @apiParam {String} email  Email of the User.
     * @apiParam {String} CPF  CPF of the User.
     * @apiParam {String} RG  RG of the User.
     * @apiParam {String} username  Username of the User.
     * @apiParam {String} password  Password of the User.
     * 
     * @apiSuccess {NUmber} id User identifier.
     * @apiSuccess {String} firstname Firstname of the User.
     * @apiSuccess {String} lastname  Lastname of the User.
     * @apiSuccess {String} email  Email of the User.
     * @apiSuccess {String} CPF  CPF of the User.
     * @apiSuccess {String} RG  RG of the User.
     * @apiSuccess {String} username  Username of the User.
     * @apiSuccess {String} password  Password of the User.
     * 
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 201 OK
     *     {
     *       "id": 1,
     *       "first_name": "John", 
     *       "last_name": "Doe", 
     *       "rg": "45.987.632-5", 
     *       "cpf":"589.652.324-52", 
     *       "email": "teste@mail.com", 
     *       "login": "clauid.ferraz", 
     *       "password": "dsjsdkf#4kgdkg"
     *     }
     * 
     * @apiError UserNotFound The id of the User was not found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "UserNotFound"
     *     }
     */
    static createUser (req, res)  {        
        UserRepository.createUser(req.body)
        .then((registers) => res.json(registers))
        .catch((error) => res.status(201).json(error));
    }

    /**
     * @api {put} /api/v1/user/:id EditUser
     * @apiName Edit
     * @apiGroup User
     *
     * @apiParam {String} firstname Firstname of the User.
     * @apiParam {String} lastname  Lastname of the User.
     * @apiParam {String} email  Email of the User.
     * @apiParam {String} CPF  CPF of the User.
     * @apiParam {String} RG  RG of the User.
     * @apiParam {String} username  Username of the User.
     * @apiParam {String} password  Password of the User.
     * 
     * @apiSuccess {NUmber} id User identifier.
     * @apiSuccess {String} firstname Firstname of the User.
     * @apiSuccess {String} lastname  Lastname of the User.
     * @apiSuccess {String} email  Email of the User.
     * @apiSuccess {String} CPF  CPF of the User.
     * @apiSuccess {String} RG  RG of the User.
     * @apiSuccess {String} username  Username of the User.
     * @apiSuccess {String} password  Password of the User.
     */    
    static edit (req, res)  {
        const query = {where: {id:req.params.id}}
        UserRepository.update({...req.body}, query)
        .then((result) => UserController.GetById(req, res))
        .catch((error) => res.json(error));
    }

    /**
     * @api {patch} /api/v1/user/:id Update
     * @apiName Update
     * @apiGroup User
     *
     * @apiParam {String} firstname Firstname of the User.
     * @apiParam {String} lastname  Lastname of the User.
     * @apiParam {String} email  Email of the User.
     * @apiParam {String} CPF  CPF of the User.
     * @apiParam {String} RG  RG of the User.
     * @apiParam {String} username  Username of the User.
     * @apiParam {String} password  Password of the User.
     * 
     * @apiSuccess {NUmber} id User identifier.
     * @apiSuccess {String} firstname Firstname of the User.
     * @apiSuccess {String} lastname  Lastname of the User.
     * @apiSuccess {String} email  Email of the User.
     * @apiSuccess {String} CPF  CPF of the User.
     * @apiSuccess {String} RG  RG of the User.
     * @apiSuccess {String} username  Username of the User.
     * @apiSuccess {String} password  Password of the User.
     */
    static update (req, res)  {
        const query = {where: {id: req.params.id}}
        UserRepository.update({...req.body}, query)
        .then((result) => UserController.GetById(req, res))
        .catch((error) => res.json(error));
    }
}
module.exports = UserController;