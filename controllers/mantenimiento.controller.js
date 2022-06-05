const { response } = require('express');
const Mantenimiento = require('../models/mantenimiento.model');

const mantenimientosGet = async(req, res = response) => {
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
              fechaFin:"$fechaFin",
              estado: "$estado",
              observaciones: "$observaciones",
              estacion: "$estacion.nombre",
              usuario: "$usuario.nombre",
            },
          },
    ])
    res.json({
        mantenimientoes
    })
}

const mantenimientoGet = async(req, res = response) => {
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
              fechaFin:"$fechaFin",
              estado: "$estado",
              observaciones: "$observaciones",
              estacion: "$estacion.nombre",
              usuario: "$usuario.nombre",
            },
          },
    ])

    res.json({
        mantenimiento
    })
}

const mantenimientoPost = async(req, res = response) => {
    const body = req.body;
    console.log(body)
    const mantenimiento = new Mantenimiento(body);
    mantenimiento.save()

    res.json({
        mantenimiento
    })
}

const mantenimientoPut = async(req, res = response) => {
    const { id } = req.params;
    const body = req.body;
    const mantenimiento = await Mantenimiento.findByIdAndUpdate(id, body);
    res.json({
        mantenimiento
    })
}

const mantenimientoDelete = async(req, res = response) => {
    const { id } = req.params;
    const mantenimiento = await Mantenimiento.findByIdAndDelete(id);
    res.json({
        mantenimiento
    })
}

module.exports = {
    mantenimientoDelete,
    mantenimientoGet,
    mantenimientosGet,
    mantenimientoPut,
    mantenimientoPost
}