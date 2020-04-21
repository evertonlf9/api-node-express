const router = require('express').Router();
const UserValidator = require('../validators/user');

const routerModule = () => {
    
    router.get('/query',UserValidator.Query().validations, UserValidator.Query().handler);


    router.get('/',UserValidator.GetUsers().validations, UserValidator.GetUsers().handler);
    router.get('/:id', UserValidator.GetById().validations, UserValidator.GetById().handler);
    router.post('/', UserValidator.Insert().validations, UserValidator.Insert().handler);
    router.put('/:id', UserValidator.Update().validations, UserValidator.Update().handler);
    router.patch('/:id', UserValidator.UpdatetRegisterUser().validations, UserValidator.UpdatetRegisterUser().handler); 
    // router.delete('/', RouterUser.delteUser);

    return router;
}

module.exports = routerModule();