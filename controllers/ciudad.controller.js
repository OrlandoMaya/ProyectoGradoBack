const { response } = require("express");
const Ciudad = require("../models/ciudad.model");

const ciudadesGet = async (req, res = response) => {
  try {
    const ciudades = await Ciudad.find();
    res.json({
      ciudades,
    });
  } catch (error) {
    return res.status(400).json({
      of: false,
      body: "No se pudo obtener las ciudades",
    });
  }
};

const ciudadGet = async (req, res = response) => {
  try {
    const { id } = req.params;
    const ciudad = await Ciudad.findById(id);

    res.json({
      ciudad,
    });
  } catch (error) {
    return res.status(400).json({
      of: false,
      body: "No se pudo obtener la ciudad",
    });
  }
};

const ciudadPost = async (req, res = response) => {
    try{
        const body = req.body;
        const ciudad = new Ciudad(body);
        ciudad.save();
      
        res.json({
          ciudad,
        });
    }catch(error){
        return res.status(400).json({
            of:false,
            body:"No se pudo crear la ciudad"
        })
    }
};

const ciudadPut = async (req, res = response) => {
    try{
        const { id } = req.params;
        const body = req.body;
        const ciudad = await Ciudad.findByIdAndUpdate(id, body);
        res.json({
          ciudad,
        });

    }catch(error){
        return res.status(400).json({
            of:false,
            body:"No se pudo actualizar la ciudad"
        })
    }
};

const ciudadDelete = async (req, res = response) => {
    try{
        const { id } = req.params;
        const ciudad = await Ciudad.findByIdAndDelete(id);
        res.json({
          ciudad,
        });

    }catch(error){
        return res.status(400).json({
            of:false,
            body:"No se pudo eliminar la ciudad"
        })
    }
};

module.exports = {
  ciudadDelete,
  ciudadGet,
  ciudadesGet,
  ciudadPut,
  ciudadPost,
};
