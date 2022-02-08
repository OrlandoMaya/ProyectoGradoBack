const { response } = require('express');
const Usuario = require('../models/usuario.model');
const bcryptjs = require('bcryptjs');

const usuariosGet = async(req, res = reponse) => {

    const { limit = 20, from = 0 } = req.query;

    const resp = await Promise.all([
        Usuario.countDocuments(),
        Usuario.find()
        .skip(Number(from))
        .limit(Number(limit))
    ])

    const [total, users] = resp;

    res.json({
        total,
        users
    })
}

const usuarioGet = async(req, res = reponse) => {

    const { id } = req.params;
    console.log(id)

    const user = await Usuario.findById(id)

    res.json({
        user
    })
}

const usuarioPost = async(req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const user = new Usuario({ nombre, correo, password, rol });
    console.log(user);

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    res.json({
        msg: "Aqui esta",
        user
    })
}

const usuarioPut = async(req, res = response) => {
    const { id } = req.params;
    const body = req.body;
    const mantenimiento = await Usuario.findByIdAndUpdate(id, body);
    res.json({
        mantenimiento
    })
}

const usuarioDelete = async(req, res = response) => {
    const { id } = req.params;
    const mantenimiento = await Usuario.findByIdAndDelete(id);
    res.json({
        mantenimiento
    })
}

module.exports = {
    usuarioGet,
    usuariosGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete

}