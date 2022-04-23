const { response } = require('express');
const Usuario = require('../models/usuario.model');
const bcryptjs = require('bcryptjs');

const usuariosGet = async(req, res = response) => {

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

const usuarioGet = async(req, res = response) => {

    const { id } = req.params;

    const user = await Usuario.findById(id)

    res.json({
        user
    })
}

const usuarioPost = async(req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const user = new Usuario({ nombre, correo, password, rol });

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
    const usuario = await Usuario.findByIdAndUpdate(id, body);
    res.json({
        usuario
    })
}

const usuarioDelete = async(req, res = response) => {
    const { id } = req.params;
    const usuario = await Usuario.findByIdAndDelete(id);
    res.json({
        usuario
    })
}

module.exports = {
    usuarioGet,
    usuariosGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete
}