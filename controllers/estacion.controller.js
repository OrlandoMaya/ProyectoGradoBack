const { response } = require('express');
const Estacion = require('../models/estacion.model');

const estacionesGet = async(req, res = response) => {
    const estaciones = await Estacion.find()
    res.json({
        estaciones
    })
}

const estacionGet = async(req, res = response) => {
    const { id } = req.params;
    const estacion = await Estacion.findById(id);

    res.json({
        estacion
    })
}

const estacionPost = async(req, res = response) => {
    const body = req.body;
    const estacion = new Estacion(body);
    estacion.save()

    res.json({
        estacion
    })
}

const estacionPut = async(req, res = response) => {
    const { id } = req.params;
    const body = req.body;
    const estacion = await Estacion.findByIdAndUpdate(id, body);
    res.json({
        estacion
    })
}

const estacionDelete = async(req, res = response) => {
    const { id } = req.params;
    const estacion = await Estacion.findByIdAndDelete(id);
    res.json({
        estacion
    })
}

module.exports = {
    estacionDelete,
    estacionGet,
    estacionesGet,
    estacionPut,
    estacionPost
}