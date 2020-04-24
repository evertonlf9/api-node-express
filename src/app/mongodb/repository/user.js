const BaseRepository = require('./baseRepository');
const User = require('../models/user');

class UserRepository {


    static getAll(query) {
        return new Promise((resolve, reject) => 
            BaseRepository
                .getAll(User, query)
                .then((result)=> resolve(result))
                .catch((error)=> reject(error)))  
    }

    static getById(id) {
        return new Promise((resolve, reject) => 
            BaseRepository
                .findById(User, id)
                .then((result)=> resolve(result))
                .catch((error)=> reject(error)))  
    }
    
    static save(params) {
        return new Promise((resolve, reject) => 
            BaseRepository
                .save(User, params)
                .then((result)=> resolve(result))
                .catch((error)=> reject(error)))  
    }

    static update(params, id) {
        return new Promise((resolve, reject) => 
            BaseRepository
                .update(User, params, id)
                .then((result)=> resolve(result))
                .catch((error)=> reject(error)))  
    }
}
module.exports = UserRepository;