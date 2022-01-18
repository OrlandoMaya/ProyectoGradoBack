const { response } = require('express');
const CreditCard = require('../models/creditCard.model');

const creditCardsGet = async(req, res = response) => {
    const resp = await User.find()
    res.json({
        resp
    })
}

const creditCardGet = async(req, res = response) => {

    const { id } = req.query;
    const resp = await User.findById(id)

    res.json({
        resp
    })
}

const creditCardPost = async(req, res = response) => {
    const { status, number, size, idCombo, idUser } = req.body
    const creditCard = new CreditCard({ status, number, size, idCombo, idUser });
    await creditCard.save();
    res.json({
        rmsg: "Nueva tarjeta",
        creditCard
    })
}


module.exports = {
    creditCardsGet,
    creditCardGet,
    creditCardPost
}