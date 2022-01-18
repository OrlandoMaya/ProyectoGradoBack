const { response, request } = require('express');
const { User } = require('./models/user');
const jwt = require('jsonwebtoken');

const validateJWT = (req = request, res = response, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay un token para autenticar'
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETPRIVATEKEY);
        req.user = User.findById(uid);
        next();
    } catch (err) {
        res.status(401).json({
            msg: 'No tiene autorización valida'
        })
    }
}

module.exports = {
    validateJWT
}