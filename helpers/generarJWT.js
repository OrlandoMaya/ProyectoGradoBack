const jwt = require('jsonwebtoken');

const generarJWT = (uid = '',nombre='',rol='',email='') => {
    return new Promise((resolve, reject) => {
        const payload = { uid,rol,nombre,email };
        jwt.sign(payload, process.env.SECRETPRIVATEKEY, {}, (err, token) => {
            if (err) {
                reject('No se pudo generar el token')
            } else {
                resolve(token)
            }
        })
    })
}
module.exports = {
    generarJWT
}