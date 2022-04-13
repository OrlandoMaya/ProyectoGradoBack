const { response } = require("express");
const Usuario = require("../models/usuario.model");
const bcryptjs = require("bcryptjs");
const axios = require("axios");
const { ignore } = require("nodemon/lib/rules");

const auth = {
  auth: {
    username: "admin",
    password: "public",
  },
};

global.saverResource = null;
global.alarmResource = null;

const getInfoInConsole = async (req, res = response) => {
  const data = req.body;
  console.log(data);

  res.json({});
};

//RECURSOS

async function createResources() {
  try {
    const resource1 = {
      type: "web_hook",
      config: {
        url: "http://localhost:3000/api/webhook",
        headers: { token: "fl0wr1v3r" },
        method: "POST",
      },
      description: "saver-webhook",
    };
    const resource2 = {
      type: "web_hook",
      config: {
        url: "http://localhost:3000/api/webhook",
        headers: { token: "fl0wr1v3r" },
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

const getRecursos = async (req, res = response) => {
  const info = await axios.get(`${process.env.EMQXURL}resources/`, auth);
  const size = info.data.data.length;
  console.log(size)
  if (info.status == 200) {
    if (size == 0) {
        console.log("creating")
      createResources();
    } else if (size == 2) {
      info.data.data.forEach((resource) => {
        if (resource.description == "alarm-webhook") {
          global.alarmResource = resource;
        }
        if (resource.description == "saver-webhook") {
          global.alarmResource = resource;
        }
      });
    }
  }
};

const getRecurso = async (req, res = response) => {};

const postRecurso = async (req, res = response) => {};

const updateRecurso = async (req, res = response) => {};

const deleteRecurso = async (req, res = response) => {};

//REGLAS

const getReglas = async (req, res = response) => {};

const getRegla = async (req, res = response) => {};
const postRegla = async (req, res = response) => {};
const updateRegla = async (req, res = response) => {};
const deleteRegla = async (req, res = response) => {};

module.exports = {
  getInfoInConsole,
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
