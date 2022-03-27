const { Schema, model } = require('mongoose');


const MantenimientoSchema = Schema({
    fecha:{
        type: Date,
        required: [true, 'La fecha de inicio es obligatoria']
    },
    observaciones:{
        type:String,
        emun:['Operando','Desactivado','Fallando']
    },
    idEstacion:{
        type:Schema.Types.ObjectId,
        ref: 'Estacion',
        required:true
    },
    idUsuario:{
        type:Schema.Types.ObjectId,
        ref: 'Usuario',
        required:true
    }
    
})

MantenimientoSchema.methods.toJSON = function() {
    const { __v, _id, ...mantenimiento } = this.toObject();
    mantenimiento.uid = _id;
    return mantenimiento;
}

module.exports = model('Mantenimiento', MantenimientoSchema);