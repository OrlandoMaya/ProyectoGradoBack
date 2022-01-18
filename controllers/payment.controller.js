const { response } = require('express');
const Payment = require('../models/payment.model');

const paymentsGet = async(req, res = response) => {
    const resp = await Payment.find()
    res.json({
        payments: resp
    })
}

const paymentGet = async(req, res = response) => {

    const { id } = req.query;
    const resp = await Payment.findById(id)

    res.json({
        payment: resp
    })
}

const paymentPost = async(req, res = response) => {

    const body = req.body;
    const payment = new Payment(body)
    console.log("entro")
    payment.save()
    res.json({
        payment: payment
    })
}


module.exports = {
    paymentGet,
    paymentsGet,
    paymentPost
}