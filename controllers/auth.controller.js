const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario.model');
const { generarJWT } = require('../helpers/generarJWT');

const login = async(req, res = response) => {

    const { email, password } = req.body;
    console.log(req.body)

    try {

        //Verificar email
        const user = await Usuario.findOne({ correo:email })
        console.log(user)
        if (!user) {
            return res.status(400).json({
                msg: 'El correo o contraseña son incorrectos - correo'
            })
        }

        //Verificar contraseña
        const validPassword = bcrypt.compareSync(password, user.password);
        console.log(validPassword)
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
            msg: 'Las credenciales son incorrectas'
        })
    }


}

module.exports = {
    login
}