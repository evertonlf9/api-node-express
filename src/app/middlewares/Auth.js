const routers = require('express').Router();
const ControllerAuth = require('../controllers/auth');

const fs = require('fs')
const path = require('path');

const Auth = (req, res, next) => {
    const data = req.body;
    
    if((!data.username || !data.password) || (data.username === "" || data.password === "")) {
        return res.status(422).json({ error: '', message:"", response: []})
    }

    const privateKey = fs.readFileSync(path.resolve(__dirname, '../../../public/private.pem'), 'utf8');
    ControllerAuth(req, res, privateKey);
};

module.exports = Auth;