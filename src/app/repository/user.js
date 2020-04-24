const { User } = require('../models');
const db = require('../models');
const BaseRepository = require('./baseRepository');

class UserRepository {
    // https://sequelize.org/master/manual/raw-queries.html
    static query(sql, queryTypes, sqlCount, queryTypesCount) {
        return new Promise((resolve, reject) => BaseRepository
            .query(db, sql, queryTypes, sqlCount, (queryTypesCount || queryTypes)) 
            .then((result) => resolve(result))
            .catch((err) => reject(err)));
    }

    static getUsers(query) {
        return new Promise((resolve, reject) => BaseRepository
            .getAll(User, query) 
            .then((result) => resolve(result))
            .catch((err) => reject(err)));
    }
    
    static getById(id) {
        return new Promise((resolve, reject) => BaseRepository
            .getById(User, id)
            .then((result) => resolve(result))
            .catch((err) => reject(err))); 
    }

    static createUser(params) {
        return new Promise((resolve, reject) => BaseRepository
        .create(User, params)
        .then((result) => resolve(result))
        .catch((err) => reject(err)));
    }

    static update(params, query) {      
        return new Promise((resolve, reject) => BaseRepository
            .update(User, params, query) 
            .then((result) => resolve(result))
            .catch((err) => reject(err)));
    }
}
module.exports = UserRepository;