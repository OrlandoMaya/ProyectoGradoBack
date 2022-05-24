const { response } = require('express');
const { aggregate, Types } = require("mongoose");
const Control = require('../models/control.model');

const controlesGet = async(req, res = response) => {
    const controles = await Control.find()
    res.json({
        controles
    })
}

const controlGet = async(req, res = response) => {
    const { id } = req.params;
    const control = await Control.findById(id);

    res.json({
        control
    })
}

const controlesGetByStation = async(req, res = response) => {
    const { id,quantity } = req.params;
    const quantityInt=parseInt(quantity)
    const control = await Control.aggregate([
        {$match:{idEstacion:Types.ObjectId(id)}},
        {$sort: {fecha:-1}},
        {$limit: quantityInt}
    ])
    console.log(control)

    res.json({
        control
    })
}

const controlPost = async(req, res = response) => {
    const body = req.body;
    const control = new Control(body);
    control.save()

    res.json({
        control
    })
}

const controlPut = async(req, res = response) => {
    const { id } = req.params;
    const body = req.body;
    const control = await Control.findByIdAndUpdate(id, body);
    res.json({
        control
    })
}

const controlDelete = async(req, res = response) => {
    const { id } = req.params;
    const control = await Control.findByIdAndDelete(id);
    res.json({
        control
    })
}

module.exports = {
    controlDelete,
    controlGet,
    controlesGet,
    controlPut,
    controlPost,
    controlesGetByStation
}