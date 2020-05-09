const RouterUser = require('./user');
const RouterMongo = require('../../mongodb/routers');
const path = require('path');

const router = () => {
    const routers = require('express').Router();

    routers.use('/user', RouterUser);
    routers.use('/nosql', RouterMongo);

    routers.get('/', (req, res) => {
        res.json({ message: 'Node BFF' }); 
    });

    routers.get('/document', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../../../doc/index.html'));
    });


    routers.use((req, res, next) => {
        res.status(404).send({ errors: [{ code: "page_not_found", message: "404 - Not found" }]});
    });

    return routers
}
module.exports = router();