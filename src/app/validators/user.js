const { check, body, param, query, validationResult } = require('express-validator'); 
const RouterUser = require('../controllers/user');
const Errors = require('../middlewares/Errors');
//https://express-validator.github.io/docs/
//https://express-validator.github.io/docs/custom-validators-sanitizers.html
//https://express-validator.github.io/docs/check-api.html

class UserValidator {
    
    static Insert() {
        return {
            validations: [
                body('first_name')
                    .not().isEmpty()
                    .isString()
                    .trim()
                    .isLength({ min: 3, max: 255 }),
                body('last_name')
                    .not().isEmpty()
                    .isString()
                    .trim()
                    .isLength({ min: 3, max: 255 }),
                body('cpf')
                    .trim()
                    .isLength({ min: 14, max: 14 }),
                body('rg')
                    .not().isEmpty()
                    .isString()
                    .trim()
                    .isLength({ min: 12, max: 12 }),
                body('login')
                    .not().isEmpty()
                    .isString()
                    .trim()
                    .isLength({ min: 3, max: 255 }),
                body('email')
                    .isEmail()
                    .normalizeEmail(),
                body('password')
                    .not().isEmpty()
                    .isLength({ min: 5, max: 255 })
            ],
            handler: async (req, res) => {

                const errors = validationResult(req);
                if (!errors.isEmpty())
                    return Error(res, 422, errors.array());
        
                RouterUser.createUser(req, res);
            },
        }
    }

    static GetById() {
        return {
            validations: [
                param('id')
                .not().isEmpty()
                .isNumeric()
            ],
            handler: async (req, res) => {
                const errors = validationResult(req);
                if (!errors.isEmpty())
                    return Error(res, 422, errors.array());
        
                RouterUser.GetById(req, res);
            },
        }
    }

    static GetUsers() {
        return {
            validations: [
                query('page').if(query('page').exists())
                .isNumeric(),
                query('size').if(query('size').exists())
                .isNumeric(),
                query('search').if(query('search').exists())
                .isString()
                .trim()
                .isLength({ min: 0, max: 255 })
            ],
            handler: async (req, res) => {
                const errors = validationResult(req);
                if (!errors.isEmpty())
                    return Error(res, 422, errors.array());
        
                RouterUser.GetUsers(req, res);
            },
        }
    }

    static Query() {
        return {
            validations: [
                query('page').if(query('page').exists())
                .isNumeric(),
                query('size').if(query('size').exists())
                .isNumeric(),
                query('search').if(query('search').exists())
                .isString()
                .trim()
                .isLength({ min: 0, max: 255 })
            ],
            handler: async (req, res) => {
                const errors = validationResult(req);
                if (!errors.isEmpty())
                    return Error(res, 422, errors.array());
        
                RouterUser.query(req, res);
            },
        }
    }

    static Update() {
        return {
            validations: [
                body('first_name')
                    .not().isEmpty()
                    .isString()
                    .trim()
                    .isLength({ min: 3, max: 255 }),
                body('last_name')
                    .not().isEmpty()
                    .isString()
                    .trim()
                    .isLength({ min: 3, max: 255 }),
                body('cpf')
                    .trim()
                    .isLength({ min: 14, max: 14 }),
                body('rg')
                    .not().isEmpty()
                    .isString()
                    .trim()
                    .isLength({ min: 12, max: 12 }),
                body('login')
                    .not().isEmpty()
                    .isString()
                    .trim()
                    .isLength({ min: 3, max: 255 }),
                body('email')
                    .isEmail()
                    .normalizeEmail(),
                body('password')
                    .not().isEmpty()
                    .isLength({ min: 5, max: 255 })
            ],
            handler: async (req, res) => {
                const errors = validationResult(req);
                if (!errors.isEmpty())
                    return Error(res, 422, errors.array());
        
                RouterUser.edit(req, res);
            },
        }
    }

    static UpdatetRegisterUser() {
        return {
            validations: [
                    body('first_name').if(body('first_name').exists())
                        .not().isEmpty()
                        .isString()
                        .trim()
                        .isLength({ min: 3, max: 255 }),
                    body('last_name').if(body('last_name').exists())
                        .not().isEmpty()
                        .isString()
                        .trim()
                        .isLength({ min: 3, max: 255 }),
                    body('cpf').if(body('cpf').exists())
                        .trim()
                        .isLength({ min: 14, max: 14 }),
                    body('rg').if(body('rg').exists())
                        .not().isEmpty()
                        .isString()
                        .trim()
                        .isLength({ min: 12, max: 12 }),
                    body('login').if(body('login').exists())
                        .not().isEmpty()
                        .isString()
                        .trim()
                        .isLength({ min: 3, max: 255 }),
                    body('email').if(body('email').exists())
                        .isEmail()
                        .normalizeEmail(),
                    body('password').if(body('password').exists())
                        .not().isEmpty()
                        .isLength({ min: 5, max: 255 })
            ],
            handler: async (req, res) => {
                const errors = validationResult(req);                
                if (!errors.isEmpty())
                    return Error(res, 422, errors.array());
        
                RouterUser.update(req, res);
            },
        }
    }
}

module.exports = UserValidator;
//custom validator
// body('passwordConfirmation').custom((value, { req }) => {
//     if (value !== req.body.password) {
//       throw new Error('Password confirmation does not match password');
//     }    
//     // Indicates the success of this synchronous custom validator
//     return true;
// })