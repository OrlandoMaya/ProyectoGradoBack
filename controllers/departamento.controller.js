const { response } = require('express');
const Departamento = require('../models/departamento.model');

const departamentosGet = async(req, res = response) => {
    const departamentoes = await Departamento.find()
    res.json({
        departamentos
    })
}

const departamentoGet = async(req, res = response) => {
    const { id } = req.params;
    const departamento = await Departamento.findById(id);

    res.json({
        departamento
    })
}

const departamentoPost = async(req, res = response) => {
    const body = req.body;
    const departamento = new Departamento(body);
    departamento.save()

    res.json({
        departamento
    })
}

const departamentoPut = async(req, res = response) => {
    const { id } = req.params;
    const body = req.body;
    const departamento = await Departamento.findByIdAndUpdate(id, body);
    res.json({
        departamento
    })
}

const departamentoDelete = async(req, res = response) => {
    const { id } = req.params;
    const departamento = await Departamento.findByIdAndDelete(id);
    res.json({
        departamento
    })
}

module.exports = {
    departamentosGet,
    departamentoGet,
    departamentoPost,
    departamentoPut,
    departamentoDelete
}