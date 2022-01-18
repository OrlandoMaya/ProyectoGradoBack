const { Schema, model } = require('mongoose');


const UbicacionSchema = Schema({
    latitud: {
        type: Number,
        required: [true, 'La latitud es obligatoria']
    },
    longitud:{
        type: Number,
        required: [true, 'La longitud es obligatoria']
    },
    
    idCiudad:{
        type:Schema.Types.ObjectId,
        ref: 'Ciudad',
        required:true
    }
    
})

module.exports = model('Ubicacion', UbicacionSchema);