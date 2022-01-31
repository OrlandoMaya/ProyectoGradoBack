const { response } = require('express');
const Ciudad = require('../models/ciudad.model');

const ciudadesGet = async(req, res = response) => {
    const ciudades = await Ciudad.find()
    res.json({
        ciudades
    })
}

const ciudadGet = async(req, res = response) => {
    const { id } = req.params;
    const ciudad = await Ciudad.findById(id);

    res.json({
        ciudad
    })
}

const ciudadPost = async(req, res = response) => {
    const body = req.body;
    const ciudad = new Ciudad(body);
    ciudad.save()

    res.json({
        ciudad
    })
}

const ciudadPut = async(req, res = response) => {
    const { id } = req.params;
    const body = req.body;
    const ciudad = await Ciudad.findByIdAndUpdate(id, body);
    res.json({
        ciudad
    })
}

const ciudadDelete = async(req, res = response) => {
    const { id } = req.params;
    const ciudad = await Ciudad.findByIdAndDelete(id);
    res.json({
        ciudad
    })
}

module.exports = {
    ciudadDelete,
    ciudadGet,
    ciudadesGet,
    ciudadPut,
    ciudadPost
}