const { response } = require('express');
const Umbrella = require('../models/umbrella.model');

const umbrellasGet = async(req, res = response) => {
    const resp = await Umbrella.find()
    res.json({
        umbrellas: resp
    })
}

const umbrellaGet = async(req, res = response) => {
    const { id } = req.params;
    const umbrella = await Umbrella.findById(id);

    res.json({
        umbrella
    })
}

const umbrellaPost = async(req, res = response) => {
    const body = req.body;
    const umbrella = new Umbrella(body);
    umbrella.save()

    res.json({
        umbrella: umbrella
    })
}

const umbrellaPut = async(req, res = response) => {
    const { id } = req.params;
    const body = req.body;
    const umbrella = await Umbrella.findByIdAndUpdate(id, body);


    res.json({
        umbrella: umbrella
    })
}

const umbrellaDelete = async(req, res = response) => {
    const { id } = req.params;
    const umbrella = await Umbrella.findByIdAndDelete(id);


    res.json({
        umbrella: umbrella
    })
}

module.exports = {
    umbrellaGet,
    umbrellasGet,
    umbrellaPost,
    umbrellaPut,
    umbrellaDelete
}