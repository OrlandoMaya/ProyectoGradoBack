const { response } = require("express");
const Departamento = require("../models/departamento.model");

const departamentosGet = async (req, res = response) => {
  try {
    const departamentos = await Departamento.find();
    res.json({
      departamentos,
    });
  } catch (error) {
    return res.status(400).json({
      of: false,
      body: "No se pudo obtener los departamentos",
    });
  }
};

const departamentoGet = async (req, res = response) => {
  try {
    const { id } = req.params;
    const departamento = await Departamento.findById(id);

    res.json({
      departamento,
    });
  } catch (error) {
    return res.status(400).json({
      of: false,
      body: "No se pudo obtener el departamento",
    });
  }
};

const departamentoPost = async (req, res = response) => {
  try {
    const body = req.body;
    const departamento = new Departamento(body);
    departamento.save();

    res.json({
      departamento,
    });
  } catch (error) {
    return res.status(400).json({
      of: false,
      body: "No se pudo crear el departamento",
    });
  }
};

const departamentoPut = async (req, res = response) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const departamento = await Departamento.findByIdAndUpdate(id, body);
    res.json({
      departamento,
    });
  } catch (error) {
    return res.status(400).json({
      of: false,
      body: "No se pudo actualizar el departamento",
    });
  }
};

const departamentoDelete = async (req, res = response) => {
  try {
    const { id } = req.params;
    const departamento = await Departamento.findByIdAndDelete(id);
    res.json({
      departamento,
    });
  } catch (error) {
    return res.status(400).json({
      of: false,
      body: "No se pudo eliminar el departamento",
    });
  }
};

module.exports = {
  departamentosGet,
  departamentoGet,
  departamentoPost,
  departamentoPut,
  departamentoDelete,
};
