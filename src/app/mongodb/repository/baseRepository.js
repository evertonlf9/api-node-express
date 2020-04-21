//https://docs.mongodb.com/manual/tutorial/query-documents/
class BaseRepository {

    static getAll(db, query) {

        return new Promise((resolve, reject) => db
            .find({...query.find})
            .countDocuments((err, totalDocuments) => {
                if (err) reject(err);                
                
                db.find({...query.find})
                .lean()
                .limit(parseInt(query.limit))
                .skip(query.page * query.limit)
                .sort(query.sort)             
                .exec((err, result)  => {
                    if (err) reject(err);
                    resolve({result: result, total: totalDocuments, pages: Math.round(totalDocuments/query.limit)})
                })
        }));
    }

    static findById(db, id) {
        return new Promise((resolve, reject) => db
            .findById(id).lean()
            .exec((err, result)  => {
                if (err) reject(err);
                resolve({result: result})
        }))   
    }
    
    static save(db, document) {
        const newDB = new db(document);
        return new Promise((resolve, reject) => newDB
            .save((err, result)  => {
                if (err) reject(err);
                resolve({result: result})
        }));
    }

    static insertOne(db, documents) {
        return new Promise((resolve, reject) => db
            .insertMany(documents)
            .exec((err, result)  => {
                if (err) reject(err);
                resolve({result: result})
        }));
    }

    static insertMany(db, documents) {
        return new Promise((resolve, reject) => db
            .insertMany(documents)
            .exec((err, result)  => {
                if (err) reject(err);
                resolve({result: result})
        }));
    }

    static update(db, document, id) {
        return new Promise((resolve, reject) => db
            .update({_id: id}, {$set: document})
            .exec((err, result)  => {
                if (err) reject(err);
                resolve({result: result})
        }));
    }

    static updateOne(db, document, id) {
        return new Promise((resolve, reject) => db
            .updateOne({_id: id}, {$set: document})
            .exec((err, result)  => {
                if (err) reject(err);
                resolve({result: result})
        }));
    }

    static updateMany(db, document, query) {
        return new Promise((resolve, reject) => db
            .updateMany(
                query, //{ "qty": { $lt: 50 } }  atualizar todos os documentos onde qtyé menor que 50
                {
                    $set: document,
                    $currentDate: { lastModified: true }
                }
            )
            .exec((err, result)  => {
                if (err) reject(err);
                resolve({result: result})
        }));
    }

    static replaceOne(db, document, query) {
        return new Promise((resolve, reject) => db
            .replaceOne(
                { item: "paper" },
                { item: "paper", instock: [ { warehouse: "A", qty: 60 }, { warehouse: "B", qty: 40 } ] }
            )
            .exec((err, result)  => {
                if (err) reject(err);
                resolve({result: result})
        }));
    }

}

module.exports = BaseRepository;