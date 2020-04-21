const mongoose = require('mongoose');
const dataBase = 'database_development'
const urlDataBase = 'localhost:27017';
const urlMongodb = `mongodb://${urlDataBase}/${dataBase}`;

class connectionMongoDB {

    static connect () {
        const db = mongoose.connection;

        mongoose.connect(urlMongodb, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });

        db.on('error', console.error);
        db.on('open', () => console.log("Conectado ao banco de dados mongoDB"));
    }
}

module.exports = connectionMongoDB;