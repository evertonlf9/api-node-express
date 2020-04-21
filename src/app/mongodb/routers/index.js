const routers = require('express').Router();
const RouterUser = require('./user');

const routerdb = () => {    
    routers.use('/user', RouterUser);

    routers.use((req, res, next) => {
        res.status(200).send({ errors: [{ code: "page_not_found", message: "404 - Not found" }]});
    });
    
    return routers
}

module.exports = routerdb();