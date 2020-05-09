const router = require('express').Router();
const UserValidator = require('../validators/user');

const routerModule = () => {
    router.get('/', UserValidator.getAll().validations, UserValidator.getAll().handler);
    router.get('/:id',  UserValidator.getById().validations, UserValidator.getById().handler);
    router.post('/',  UserValidator.create().validations, UserValidator.create().handler);
    router.put('/:id', UserValidator.update().validations, UserValidator.update().handler);

    return router;
}

module.exports = routerModule();