const { response } = require("express");
const Usuario = require("../models/usuario.model");
const bcryptjs = require("bcryptjs");

const usuariosGet = async (req, res = response) => {
  try {
    const { limit = 20, from = 0 } = req.query;

    const resp = await Promise.all([
      Usuario.countDocuments(),
      Usuario.find().skip(Number(from)).limit(Number(limit)),
    ]);

    const [total, users] = resp;

    res.json({
      total,
      users,
    });
  } catch (error) {
    return res.status(400).json({
      of: false,
      body: "No se pudo obtener los usuarios",
    });
  }
};

const usuarioGet = async (req, res = response) => {
  try {
    const { id } = req.params;

    const user = await Usuario.findById(id);

    res.json({
      user,
    });
  } catch (error) {
    return res.status(400).json({
      of: false,
      body: "No se pudo obtener el usuario",
    });
  }
};

const usuarioPost = async (req, res = response) => {
  try {
    const { nombre, correo, password, rol } = req.body;
    const userFinded = await Usuario.find({correo});
    if(!userFinded){
      const user = new Usuario({ nombre, correo, password, rol });

      //Encriptar la contraseña
      const salt = bcryptjs.genSaltSync();
      user.password = bcryptjs.hashSync(password, salt);
  
      await user.save();
  
      res.json({
        msg: "Aqui esta",
        user,
      });
    }else{
      return res.status(400).json({
        of: false,
        body: "Email en uso",
      });
    }
    
  } catch (error) {
    return res.status(400).json({
      of: false,
      body: "No se pudo crear el usuario",
    });
  }
};

const usuarioPut = async (req, res = response) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const usuario = await Usuario.findByIdAndUpdate(id, body);
    res.json({
      usuario,
    });
  } catch (error) {
    return res.status(400).json({
      of: false,
      body: "No se pudo actualizar el usuario",
    });
  }
};

const usuarioDelete = async (req, res = response) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByIdAndDelete(id);
    res.json({
      usuario,
    });
  } catch (error) {
    return res.status(400).json({
      of: false,
      body: "No se pudo eliminar el usuario",
    });
  }
};

module.exports = {
  usuarioGet,
  usuariosGet,
  usuarioPost,
  usuarioPut,
  usuarioDelete,
};
