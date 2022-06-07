const { response } = require("express");
const Ubicacion = require("../models/ubicacion.model");

const ubicacionesGet = async (req, res = response) => {
  try {
    const ubicaciones = await Ubicacion.find();
    res.json({
      ubicaciones,
    });
  } catch (error) {
    return res.status(400).json({
      of: false,
      body: "No se pudo obtener las ubicaciones",
    });
  }
};

const ubicacionGet = async (req, res = response) => {
    try {
        const { id } = req.params;
        const ubicacion = await Ubicacion.findById(id);
      
        res.json({
          ubicacion,
        });
    } catch (error) {
      return res.status(400).json({
        of: false,
        body: "No se pudo obtener la ubicacion",
      });
    }
};

const ubicacionPost = async (req, res = response) => {
    try {
        const body = req.body;
        const ubicacion = new Ubicacion(body);
        ubicacion.save();
        return ubicacion;
    } catch (error) {
      return res.status(400).json({
        of: false,
        body: "No se pudo crear la ubicacion",
      });
    }
  // res.json({
  //     ubicacion
  // })
};

const ubicacionPut = async (req, res = response) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const ubicacion = await Ubicacion.findByIdAndUpdate(id, body);
        res.json({
          ubicacion,
        });
    } catch (error) {
      return res.status(400).json({
        of: false,
        body: "No se pudo actualizar la ubicacion",
      });
    }
};

const ubicacionDelete = async (req, res = response) => {
    try {
        const { id } = req.params;
        const ubicacion = await Ubicacion.findByIdAndDelete(id);
        res.json({
          ubicacion,
        });
    } catch (error) {
      return res.status(400).json({
        of: false,
        body: "No se pudo eliminar la ubicacion",
      });
    }
};

module.exports = {
  ubicacionDelete,
  ubicacionGet,
  ubicacionesGet,
  ubicacionPut,
  ubicacionPost,
};
