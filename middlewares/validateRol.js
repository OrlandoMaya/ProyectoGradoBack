const { response, request } = require('express');
const Usuario = require('../models/usuario.model');
const jwt = require('jsonwebtoken');

const isAdminRole = (req = request, res = response, next) => {
    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se requiere verificar el rol sin validar primero el token'
        })
    }

    const {rol,nombre}=req.usuario;

    if(rol !== 'ADMIN_ROL'){
        return res.status(401).json({
            msg: `${nombre} no es administrador`
        })
    }
}

module.exports = {
    isAdminRole
}