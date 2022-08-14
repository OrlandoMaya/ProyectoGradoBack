const { response } = require("express");
const { findById } = require("../models/mantenimiento.model");
const Mantenimiento = require("../models/mantenimiento.model");
const Estacion = require("../models/estacion.model");

const mantenimientosGet = async (req, res = response) => {
  try {
    const mantenimientoes = await Mantenimiento.aggregate([
      {
        $lookup: {
          from: "usuarios",
          localField: "idUsuario",
          foreignField: "_id",
          as: "usuario",
        },
      },
      {
        $unwind: "$usuario",
      },
      {
        $lookup: {
          from: "estacions",
          localField: "idEstacion",
          foreignField: "_id",
          as: "estacion",
        },
      },
      {
        $unwind: "$estacion",
      },
      {
        $project: {
          uid: "$_id",
          fechaInicio: "$fechaInicio",
          fechaFin: "$fechaFin",
          estado: "$estado",
          observaciones: "$observaciones",
          estacion: "$estacion.nombre",
          usuario: "$usuario.nombre",
        },
      },
    ]);
    res.json({
      mantenimientoes,
    });
  } catch (error) {
    return res.status(400).json({
      of: false,
      body: "No se pudo obtener los registros de mantenimiento",
    });
  }
};

const mantenimientoGet = async (req, res = response) => {
  try {
    const { id } = req.params;
    const mantenimiento = await Mantenimiento.aggregate([
      {
        $lookup: {
          from: "usuarios",
          localField: "idUsuario",
          foreignField: "_id",
          as: "usuario",
        },
      },
      {
        $unwind: "$usuario",
      },
      {
        $lookup: {
          from: "estacions",
          localField: "idEstacion",
          foreignField: "_id",
          as: "estacion",
        },
      },
      {
        $unwind: "$estacion",
      },
      {
        $project: {
          uid: "$_id",
          fechaInicio: "$fechaInicio",
          fechaFin: "$fechaFin",
          estado: "$estado",
          observaciones: "$observaciones",
          estacion: "$estacion.nombre",
          usuario: "$usuario.nombre",
        },
      },
    ]);

    res.json({
      mantenimiento,
    });
  } catch (error) {
    return res.status(400).json({
      of: false,
      body: "No se pudo obtener el registro de mantenimiento",
    });
  }
};

const mantenimientoPost = async (req, res = response) => {
  try {
    const body = req.body;
    console.log(body);
    const mantenimiento = new Mantenimiento(body);
    mantenimiento.save();
    const estacion = await Estacion.findById(body.idEstacion)
    updateRegla(estacion.ruleId, false);
    res.json({
      mantenimiento,
    });
    
  } catch (error) {
    return res.status(400).json({
      of: false,
      body: "No se pudo crear el registro de mantenimiento",
    });
  }
};

const mantenimientoPut = async (req, res = response) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const mantenimiento = await Mantenimiento.findByIdAndUpdate(id, body);
    const estacion = await Estacion.findById(mantenimiento.idEstacion)
    updateRegla(estacion.ruleId, true);
    res.json({
      mantenimiento,
    });
  } catch (error) {
    return res.status(400).json({
      of: false,
      body: "No se pudo actualizar el registro de mantenimiento",
    });
  }
};

const mantenimientoDelete = async (req, res = response) => {
  try {
    const { id } = req.params;
    const mantenimiento = await Mantenimiento.findByIdAndDelete(id);
    res.json({
      mantenimiento,
    });
  } catch (error) {
    return res.status(400).json({
      of: false,
      body: "No se pudo eliminar el registro de mantenimiento",
    });
  }
};

module.exports = {
  mantenimientoDelete,
  mantenimientoGet,
  mantenimientosGet,
  mantenimientoPut,
  mantenimientoPost,
};
