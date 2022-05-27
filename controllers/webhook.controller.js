const { response } = require("express");
const Usuario = require("../models/usuario.model");
const bcryptjs = require("bcryptjs");
const axios = require("axios");
const { ignore } = require("nodemon/lib/rules");
const Control =require("../models/control.model");
const Estacion = require("../models/estacion.model");

const auth = {
  auth: {
    username: "admin",
    password: "public",
  },
};

global.saverResource = null;
global.alarmResource = null;

const saveInfo = async (req, res = response) => {
try{
  req.body.payload=req.body.payload.replaceAll("\'","\"")
  console.log(req.body)
  if(req.headers.token!="fl0wr1v3r"){
    req.sendStatus(401);
    return
  }
  const data = req.body;
  const topic = req.body.topic.split("/")[1];
  const estacion = await Estacion.findOne({topic})
  const controlInfo=JSON.parse(data.payload);
  const control = await Control.create({
    humedad:controlInfo.Hum,
    temperatura:controlInfo.Temp,
    nivelCauce:controlInfo.NivelAgua,
    velocidadCauce:controlInfo.VelAgua,
    precipitacion:controlInfo.Prec,
    fecha:controlInfo.Fecha,
    precipitacion:controlInfo.Prec,
    idEstacion:estacion._id
  })
  
  res.json(control);
}catch (error) {
  console.log("Error creating resources");
  console.log(error);
}
};

//RECURSOS

async function createResources() {
  try {
    const resource1 = {
      type: "web_hook",
      config: {
        url: "http://localhost:3000/api/webhook/saver-webhook",
        method: "POST",
      },
      description: "saver-webhook",
    };
    const resource2 = {
      type: "web_hook",
      config: {
        url: "http://localhost:3000/api/webhook/saver-webhook",
        method: "POST",
      },
      description: "alarm-webhook",
    };
    const info1 = await axios.post(
      `${process.env.EMQXURL}resources/`,
      resource1,
      auth
    );
    if (info1.status === 200) {
      console.log("Saver resource created!".green);
    }
    const info2 = await axios.post(
      `${process.env.EMQXURL}resources/`,
      resource2,
      auth
    );
    if (info2.status === 200) {
      console.log("Alarm resource created!".green);
    }

    setTimeout(() => {
      console.log("***** Emqx WH resources created! :) *****".green);
      getRecursos();
    }, 1000);
  } catch (error) {
    console.log("Error creating resources");
    console.log(error);
  }
}

async function getRecursos() {
  try {
    const info = await axios.get(`${process.env.EMQXURL}resources/`, auth);
    const size = info.data.data.length;
    if (info.status == 200) {
      if (size == 0) {
        console.log("creating");
        createResources();
      } else if (size == 2) {
        info.data.data.forEach((resource) => {
          if (resource.description == "alarm-webhook") {
            global.alarmResource = resource;
          }
          if (resource.description == "saver-webhook") {
            global.saverResource = resource;
          }
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
}

const getRecurso = async (req, res = response) => {};

const postRecurso = async (req, res = response) => {};

const updateRecurso = async (req, res = response) => {};

const deleteRecurso = async (req, res = response) => {};

//REGLAS

async function getReglas() {
  try {
    const info = await axios.get(`${process.env.EMQXURL}rules/`, newRule, auth);
    return info.data.data;
  } catch (error) {
    console.log(error);
  }
}

async function getRegla(id) {
  try {
    const info = await axios.get(
      `${process.env.EMQXURL}rules/${id}`,
      newRule,
      auth
    );
    return info.data.data;
  } catch (error) {
    console.log(error);
  }
}

async function postRegla(req) {
  try {
    const topic = `flowriver/${req.body.topic}`;
    const rawsql = `SELECT topic, payload FROM "${topic}"`;
    const newRule = {
      rawsql,
      actions: [
        {
          name: "data_to_webserver",
          params: {
            $resource: global.saverResource.id,
            headers: { "content-type": "application/json", "token": "fl0wr1v3r" },
          },
        },
      ],
      description: "SAVER-RULE",
      enabled: req.body.enabled,
    };
    const info = await axios.post(
      `${process.env.EMQXURL}rules/`,
      newRule,
      auth
    );
    return info.data.data;
  } catch (error) {
    console.log(error);
  }
}
async function updateRegla(id, status) {
  try {
    const newRule = {
      enabled: status,
    };
    const info = await axios.put(
      `${process.env.EMQXURL}rules/${id}`,
      newRule,
      auth
    );
    return info.data.data;
  } catch (error) {
    console.log(error);
  }
}
async function deleteRegla(id) {
  const info = await axios.delete(`${process.env.EMQXURL}rules/${id}`, auth);
  return info.data.data;
}

setTimeout(() => {
  getRecursos();
}, 1000);

module.exports = {
  saveInfo,
  getRecurso,
  getRecursos,
  postRecurso,
  updateRecurso,
  deleteRecurso,
  getRegla,
  getReglas,
  postRegla,
  updateRegla,
  deleteRegla,
};
