const { check, body, param, validationResult } = require('express-validator'); 
const RouterUser = require('../controllers/user');
const Errors = require('../../app/middlewares/Errors');

class UserValidator {
    
    static create() {
        return {
            validations: [
                body('username')
                    .not().isEmpty()
                    .isString()
                    .trim()
                    .isLength({ min: 3, max: 255 }),               
                body('email')
                    .isEmail()
                    .normalizeEmail()
            ],
            handler: async (req, res) => {

                const errors = validationResult(req);
                if (!errors.isEmpty())
                    return Error(res, 422, errors.array());
        
                RouterUser.create(req, res);
            },
        }
    }

    static getById() {
        return {
            validations: [
                param('id')
                .not().isEmpty()
                .isString()
                .isLength({ min: 5, max: 255 })
            ],
            handler: async (req, res) => {
                const errors = validationResult(req);
                if (!errors.isEmpty())
                    return Error(res, 422, errors.array());
        
                RouterUser.getById(req, res);
            },
        }
    }

    static getAll() {
        return {
            validations: [
                param('page').if(param('page').exists())
                .isNumeric(),
                param('size').if(param('size').exists())
                .isNumeric(),
                param('search').if(param('search').exists())
                .not().isEmpty()
                .isString()
                .trim()
                .isLength({ min: 3, max: 255 })
            ],
            handler: async (req, res) => {
                const errors = validationResult(req);
                if (!errors.isEmpty())
                    return Error(res, 422, errors.array());
        
                RouterUser.getAll(req, res);
            },
        }
    }

    static update() {
        return {
            validations: [
                body('username')
                    .not().isEmpty()
                    .isString()
                    .trim()
                    .isLength({ min: 3, max: 255 }),
                body('email')
                    .isEmail()
                    .normalizeEmail(),
                param('id')
                    .not().isEmpty()
                    .isString()
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