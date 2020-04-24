const errors = (res, status, error) => { 
    let message = {};
    switch (status) {
        case 301:
            message = { error: 'Moved Permanently!', code:'' };
        break;
        case 401:
            message = { error: 'Authentication failed, invalid access token!', code:'' };
        break;
        case 403:
            message = { error: 'Forbidden: “Você não tem autorização para visualizar este arquivo”!', code:'' };
        break;
        case 404:
            message = { error: 'Not Found!', code:'' };
        break;
        case 422:
            message = { error: 'Not Found!', code:'', typeError: error };
        break;
        case 500:
            message = {error: 'Authentication failed.', code:''};
        break;
        default:
            message = {error: 'Error.', code:'', typeError: error}
        break;
    }
    res.status(status).send(message);
    
}
module.exports = errors;