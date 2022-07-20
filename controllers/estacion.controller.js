const { response } = require("express");
const Estacion = require("../models/estacion.model");
const Ubicacion = require("../models/ubicacion.model");
const Ciudad = require("../models/ciudad.model");
const Departamento = require("../models/departamento.model");
const { postRegla, updateRegla, deleteRegla } = require("./webhook.controller");
const { ubicacionPost } = require("./ubicacion.controller");
const { aggregate, Types } = require("mongoose");
const { enable } = require("express/lib/application");

const estacionesGet = async (req, res = response) => {
  try {
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
          uid: "$_id",
          nombre: "$nombre",
          topic: "$topic",
          longitud: "$ubicacion.longitud",
          latitud: "$ubicacion.latitud",
          ciudad: "$ciudad.nombre",
          departamento: "$departamento.nombre",
          enabled: "$enabled",
          nivelPrecaucion: "$nivelPrecaucion",
          nivelAlerta: "$nivelAlerta",
        },
      },
    ]);
    //Info
    res.json({
      estaciones,
    });
  } catch (error) {
    return res.status(400).json({
      of: false,
      body: "No se pudo obtener las estaciones",
    });
  }
};

const estacionGet = async (req, res = response) => {
  try {
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
          uid: "$_id",
          nombre: "$nombre",
          topic: "$topic",
          longitud: "$ubicacion.longitud",
          latitud: "$ubicacion.latitud",
          ciudad: "$ciudad.nombre",
          departamento: "$departamento.nombre",
          enabled: "$enabled",
          nivelPrecaucion: "$nivelPrecaucion",
          nivelAlerta: "$nivelAlerta",
        },
      },
    ]);
    // const estacion = await Estacion.findById(id);

    res.json({
      estacion,
    });
  } catch (error) {
    return res.status(400).json({
      of: false,
      body: "No se pudo obtener las estaciones",
    });
  }
};

const estacionGetByTopic = async (req, res = response) => {
  try {
    const { topic } = req.params;
    const estacion = await Estacion.aggregate([
      { $match: { topic } },
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
          uid: "$_id",
          nombre: "$nombre",
          topic: "$topic",
          longitud: "$ubicacion.longitud",
          latitud: "$ubicacion.latitud",
          ciudad: "$ciudad.nombre",
          departamento: "$departamento.nombre",
          enabled: "$enabled",
          nivelPrecaucion: "$nivelPrecaucion",
          nivelAlerta: "$nivelAlerta",
        },
      },
    ]);
    // const estacion = await Estacion.findById(id);

    res.json({
      estacion,
    });
  } catch (error) {
    return res.status(400).json({
      of: false,
      body: "No se pudo obtener las estaciones",
    });
  }
};

const estacionPost = async (req, res = response) => {
  try {
    const body = req.body;
    const estacionExist = Estacion.find({ topic: body.topic });
    if (!estacionExist) {
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
    } else {
      return res.status(401).json({
        of: false,
        body: "Ya existe una estacion con este topic",
      });
    }
  } catch (error) {
    return res.status(400).json({
      of: false,
      body: "No se pudo crear la estacion",
    });
  }
};

const estacionPut = async (req, res = response) => {
  // try {
    const { id } = req.params;
    const body = req.body;
    const estacion = await Estacion.findByIdAndUpdate(id, body);
    const newUbicacion={latitud:body.latitud, longitud:body.longitud, idCiudad:body.idCiudad}
    const ubicacion = await Ubicacion.findByIdAndUpdate(estacion.idUbicacion, newUbicacion);
    updateRegla(estacion.ruleId, body.enabled);
    res.json({
      estacion,
    });
  // } 
  // catch (error) {
  //   return res.status(400).json({
  //     of: false,
  //     body: "No se pudo actualizar la estacion",
  //     error
  //   });
  // }
};

const estacionDelete = async (req, res = response) => {
  try {
    const { id } = req.params;
    const estacion = await Estacion.findByIdAndDelete(id);
    deleteRegla(estacion.ruleId);
    res.json({
      estacion,
    });
  } catch (error) {
    return res.status(400).json({
      of: false,
      body: "No se pudo eliminar la estacion",
    });
  }
};

module.exports = {
  estacionDelete,
  estacionGet,
  estacionesGet,
  estacionPut,
  estacionPost,
  estacionGetByTopic,
};
