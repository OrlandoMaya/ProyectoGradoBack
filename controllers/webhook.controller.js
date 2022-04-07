const { response } = require('express');
const Usuario = require('../models/usuario.model');
const bcryptjs = require('bcryptjs');

const getInfoInConsole = async(req, res = response) => {

    const data=req.body;
    console.log(data)

    res.json({})
}



module.exports = {
    getInfoInConsole
}