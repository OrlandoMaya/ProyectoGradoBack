const Role = require('../models/role.model');
const User = require('../models/user.model');

//Verificar si el rol es valido
const isRolValid = async(rol = '') => {
    const rolExists = await Role.findOne({ rol });
    if (!rolExists) {
        throw new Error(`El rol ${ rol} no esta registrado en la BD`);
    }
}

//Verificar si el correo existe
const isEmailCreated = async(email) => {

    const emailExists = await User.findOne({ email });
    if (emailExists) {
        throw new Error(`El correo ${email} ya existe.`);
        // return res.status(400).json({
        //     msg: 'Este correo ya existe.'
        // })
    }
}

module.exports = {
    isRolValid,
    isEmailCreated

}