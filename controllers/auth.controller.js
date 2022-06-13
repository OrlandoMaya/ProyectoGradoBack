const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario.model');
const { generarJWT } = require('../helpers/generarJWT');

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        //Verificar email
        const user = await Usuario.findOne({ correo:email })
        if (!user) {
            return res.status(400).json({
                msg: 'El correo o contraseña son incorrectos'
            })
        }

        //Verificar contraseña
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'El correo o contraseña son incorrectos'
            })
        }

        //Generar el JWT
        const token = await generarJWT(user.id,user.nombre,user.rol,user.email);

        res.json({
            user,
            token
        })
    } catch (error) {
        res.status(500).json({
            msg: 'Las credenciales son incorrectas'
        })
    }


}

module.exports = {
    login
}