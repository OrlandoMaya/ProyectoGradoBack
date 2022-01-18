const { response } = require('express');
const Combo = require('../models/combo.model');

const combosGet = async(req, res = response) => {
    const combos = await Combo.find()
    res.json({
        combos
    })
}

const comboGet = async(req, res = response) => {

    const { id } = req.params;
    const combo = await Combo.findById(id)
    res.json({
        combo
    })
}

module.exports = {
    comboGet,
    combosGet
}