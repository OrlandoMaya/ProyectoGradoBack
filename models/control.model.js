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
    precipitacion:{
        type: Number
    },
    fecha:{
        type:Date
    },
    idEstacion:{
        type:Schema.Types.ObjectId,
        ref: 'Estacion',
        required:true
    }
    
})

ControlSchema.methods.toJSON = function() {
    const { __v, _id, ...control } = this.toObject();
    control.uid = _id;
    return control;
}

module.exports = model('Control', ControlSchema);
