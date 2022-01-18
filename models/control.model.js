const { Schema, model } = require('mongoose');


const ControlSchema = Schema({
    humedad: {
        type: Number
    },
    temperatura: {
        type: Number
    },
    nivelCauce: {
        type: Number
    },
    velocidadCauce: {
        type: Number
    },
    precicipitacion:{
        type: Number
    },
    
    idUbicación:{
        type:Schema.Types.ObjectId,
        ref: 'Estacion',
        required:true
    }
    
})

module.exports = model('Control', ControlSchema);