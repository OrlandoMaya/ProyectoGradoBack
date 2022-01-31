const { response } = require('express');
const Ubicacion = require('../models/ubicacion.model');

const ubicacionesGet = async(req, res = response) => {
    const ubicaciones = await Ubicacion.find()
    res.json({
        ubicaciones
    })
}

const ubicacionGet = async(req, res = response) => {
    const { id } = req.params;
    const ubicacion = await Ubicacion.findById(id);

    res.json({
        ubicacion
    })
}

const ubicacionPost = async(req, res = response) => {
    const body = req.body;
    const ubicacion = new Ubicacion(body);
    ubicacion.save()

    res.json({
        ubicacion
    })
}

const ubicacionPut = async(req, res = response) => {
    const { id } = req.params;
    const body = req.body;
    const ubicacion = await Ubicacion.findByIdAndUpdate(id, body);
    res.json({
        ubicacion
    })
}

const ubicacionDelete = async(req, res = response) => {
    const { id } = req.params;
    const ubicacion = await Ubicacion.findByIdAndDelete(id);
    res.json({
        ubicacion
    })
}

module.exports = {
    ubicacionDelete,
    ubicacionGet,
    ubicacionesGet,
    ubicacionPut,
    ubicacionPost
}