const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user.model');
const { generarJWT } = require('../helpers/generarJWT');

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        //Verificar email
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                msg: 'El correo o contraseña son incorrectos - correo'
            })
        }

        //Verificar contraseña
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'El correo o contraseña son incorrectos - password'
            })
        }

        //Generar el JWT
        const token = await generarJWT(user.id);

        res.json({
            user,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }


}

module.exports = {
    login
}