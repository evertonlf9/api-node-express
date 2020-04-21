const api = '/api/v1';
const apiNoSql = `${api}/nosql`;

const endpontis = {
    user: `${api}/user`,
    nosql: {
        user: `${apiNoSql}/user`,
    }        
}

module.exports = endpontis;