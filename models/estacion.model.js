const { Schema, model } = require('mongoose');


const EstacionSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    inicio:{
        type: Date,
        required: [true, 'La fecha de inicio es obligatoria']
    },
    estado:{
        type:String,
        emun:['Operando','Desactivado','Fallando']
    },
    idUbicación:{
        type:Schema.Types.ObjectId,
        ref: 'Ubicacion',
        required:true
    }
    
})

module.exports = model('Estacion', EstacionSchema);