const { Schema, model } = require('mongoose');


const CiudadSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    idDepartamento:{
        type:Schema.Types.ObjectId,
        ref: 'Departamento',
        required:true
    }
    
})

module.exports = model('Ciudad', CiudadSchema);