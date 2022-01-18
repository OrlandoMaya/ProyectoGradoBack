const { response } = require('express');
const User = require('../models/user.model');
const bcryptjs = require('bcryptjs');

const usersGet = async(req, res = reponse) => {

    const { limit = 20, from = 0 } = req.query;

    const resp = await Promise.all([
        User.countDocuments(),
        User.find()
        .skip(Number(from))
        .limit(Number(limit))
    ])

    const [total, users] = resp;

    res.json({
        total,
        users
    })
}

const userGet = async(req, res = reponse) => {

    const { id } = req.params;
    console.log(id)

    const user = await User.findById(id)

    res.json({
        user
    })
}

const usersPost = async(req, res = response) => {

    const { name, email, password, rol } = req.body;
    const user = new User({ name, email, password, rol });
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

module.exports = {
    usersGet,
    userGet,
    usersPost
}