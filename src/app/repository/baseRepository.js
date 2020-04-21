class BaseRepository {

    static findAll(table, query) {
        return new Promise((resolve, reject) => table
            .findAll(query )
            .then((result) => resolve(result))
            .catch((err) => reject(err))
        )  
    }

    static findOne(table, query) {
        return new Promise((resolve, reject) => table
            .findOne(query )
            .then((result) => resolve(result))
            .catch((err) => reject(err))
        )  
    }

    static getAll(table, query) {
        return new Promise((resolve, reject) => table
            .findAndCountAll(query )
            .then((result) => resolve(result))
            .catch((err) => reject(err))
        )  
    }

    static getById(table, id) {
        return new Promise((resolve, reject) => table
            .findByPk(id)
            .then((result) => resolve(result))
            .catch((err) => reject(err))
        )  
    }

    static create(table, params) {
        return new Promise((resolve, reject) => table
            .create(params)
            .then((data) => resolve(data))
            .catch((err) => reject(err))
        )  
    }

    static update(table, params, query) {
        return new Promise((resolve, reject) => table
            .update(params, query)
            .then((result) => resolve(result))
            .catch((err) => reject(err))
        )  
    }

    static async query(table, sql, QueryTypes = {}, sqlCount = '', QueryTypesCount = {}) { 
        try {
            const results = await table.sequelize.query(sql, QueryTypes);

            if(sqlCount !== '') {
                const count = await table.sequelize.query(sqlCount, QueryTypesCount)
                return {count: count[0]['count(*)'], rows: results,}
            }

            return {rows: results}
        }catch(e) {
            return {error: e};
        }
    }
}
module.exports = BaseRepository;