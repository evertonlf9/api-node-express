const corsList = ['http://localhost:63342', 'http://localhost:4200']; // lista de exeção do cors
module.exports = {
    origin: function (origin, callback) {
        if (corsList.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback('error')
        }
    }
};