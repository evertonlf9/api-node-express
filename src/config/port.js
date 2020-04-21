module.exports = () => {
    const port = {
        CLIENT: process.env.PORT || 3000,
        SERVER: process.env.PORT || 3000
    }
    
    if (process.env.NODE_ENV === 'development') {
        port.SERVER = port.SERVER + 1;
    }

    return port
};