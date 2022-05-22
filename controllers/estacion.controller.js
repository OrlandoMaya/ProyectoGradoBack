const { response } = require("express");
const Estacion = require("../models/estacion.model");
const { postRegla, updateRegla, deleteRegla } = require("./webhook.controller");
const { ubicacionPost } = require("./ubicacion.controller");
const Departamento = require("../models/departamento.model");
const { aggregate, Types } = require("mongoose");

const estacionesGet = async (req, res = response) => {
  const estaciones = await Estacion.aggregate([
    {
      $lookup: {
        from: "ubicacions",
        localField: "idUbicacion",
        foreignField: "_id",
        as: "ubicacion",
      },
    },
    {
      $unwind: "$ubicacion",
    },
    {
      $lookup: {
        from: "ciudads",
        localField: "ubicacion.idCiudad",
        foreignField: "_id",
        as: "ciudad",
      },
    },
    {
      $unwind: "$ciudad",
    },
    {
      $lookup: {
        from: "departamentos",
        localField: "ciudad.idDepartamento",
        foreignField: "_id",
        as: "departamento",
      },
    },
    {
      $unwind: "$departamento",
    },

    {
      $project: {
        _id: "$_id",
        nombre: "$nombre",
        topic:"$topic",
        longitud: "$ubicacion.longitud",
        latitud: "$ubicacion.latitud",
        ciudad: "$ciudad.nombre",
        departamento: "$departamento.nombre",
        estado:"$estado"
      },
    },
  ]);
  res.json({
    estaciones,
  });
};

const estacionGet = async (req, res = response) => {
  const { id } = req.params;
  const estacion = await Estacion.aggregate([
    { $match: { _id: Types.ObjectId(id) } },
    {
      $lookup: {
        from: "ubicacions",
        localField: "idUbicacion",
        foreignField: "_id",
        as: "ubicacion",
      },
    },
    {
      $unwind: "$ubicacion",
    },
    {
      $lookup: {
        from: "ciudads",
        localField: "ubicacion.idCiudad",
        foreignField: "_id",
        as: "ciudad",
      },
    },
    {
      $unwind: "$ciudad",
    },
    {
      $lookup: {
        from: "departamentos",
        localField: "ciudad.idDepartamento",
        foreignField: "_id",
        as: "departamento",
      },
    },
    {
      $unwind: "$departamento",
    },

    {
      $project: {
        _id: "$_id",
        nombre: "$nombre",
        topic:"$topic",
        longitud: "$ubicacion.longitud",
        latitud: "$ubicacion.latitud",
        ciudad: "$ciudad.nombre",
        departamento: "$departamento.nombre",
        estado:"$estado"
      },
    },
  ]);
  // const estacion = await Estacion.findById(id);

  res.json({
    estacion,
  });
};

const estacionPost = async (req, res = response) => {
  try {
    const body = req.body;
    const estacion = new Estacion(body);
    req.body.enabled = estacion.enabled;
    const ubicacion = await ubicacionPost(req, res);
    const regla = await postRegla(req, res);
    estacion.idUbicacion = ubicacion._id;
    estacion.ruleId = regla.id;
    console.log(estacion);
    estacion.save();

    res.json({
      estacion,
    });
  } catch (e) {
    res.json({
      error: "Topic duplicado",
    });
  }
};

const estacionPut = async (req, res = response) => {
  const { id } = req.params;
  const body = req.body;
  const estacion = await Estacion.findByIdAndUpdate(id, body);
  updateRegla(estacion.ruleId, body.enabled);
  res.json({
    estacion,
  });
};

const estacionDelete = async (req, res = response) => {
  const { id } = req.params;
  const estacion = await Estacion.findByIdAndDelete(id);
  deleteRegla(estacion.ruleId);
  res.json({
    estacion,
  });
};

module.exports = {
  estacionDelete,
  estacionGet,
  estacionesGet,
  estacionPut,
  estacionPost,
};
