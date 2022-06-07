const { response } = require("express");
const { aggregate, Types } = require("mongoose");
const Control = require("../models/control.model");

const controlesGet = async (req, res = response) => {
  try {
    const controles = await Control.find();
    res.json({
      controles,
    });
  } catch (error) {
    return res.status(400).json({
      of: false,
      body: "No se pudo obtener los datos",
    });
  }
};

const controlGet = async (req, res = response) => {
  try {
    const { id } = req.params;
    const control = await Control.findById(id);

    res.json({
      control,
    });
  } catch (error) {
    return res.status(400).json({
      of: false,
      body: "No se pudo obtener los datos",
    });
  }
};

const controlesGetByStation = async (req, res = response) => {
  try {
    const { id, quantity } = req.params;
    const quantityInt = parseInt(quantity);
    const control = await Control.aggregate([
      { $match: { idEstacion: Types.ObjectId(id) } },
      { $sort: { fecha: -1 } },
      { $limit: quantityInt },
    ]);
    console.log(control);

    res.json({
      control,
    });
  } catch (error) {
    return res.status(400).json({
      of: false,
      body: "No se pudo obtener los datos",
    });
  }
};

const controlPost = async (req, res = response) => {
  try {
    const body = req.body;
    const control = new Control(body);
    control.save();

    res.json({
      control,
    });
  } catch (error) {
    return res.status(400).json({
      of: false,
      body: "No se pudo actualizar los datos",
    });
  }
};

const controlPut = async (req, res = response) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const control = await Control.findByIdAndUpdate(id, body);
    res.json({
      control,
    });
  } catch (error) {
    return res.status(400).json({
      of: false,
      body: "No se pudo actualizar los datos",
    });
  }
};

const controlDelete = async (req, res = response) => {
  try {
    const { id } = req.params;
    const control = await Control.findByIdAndDelete(id);
    res.json({
      control,
    });
  } catch (error) {
    return res.status(400).json({
      of: false,
      body: "No se pudo eliminar los datos",
    });
  }
};

module.exports = {
  controlDelete,
  controlGet,
  controlesGet,
  controlPut,
  controlPost,
  controlesGetByStation,
};
